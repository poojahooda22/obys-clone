import * as THREE from 'three'
import { gsap } from 'gsap'

/**
 * Utility: remap a number from one range to another.
 */
function mapRange(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

// ─── Vertex Shader ──────────────────────────────────────────────────────────
const vertexShader = `
  uniform vec2 uOffset;
  varying vec2 vUv;

  #define M_PI 3.1415926535897932384626433832795

  vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
    position.x = position.x + (sin(uv.y * M_PI) * offset.x);
    position.y = position.y + (sin(uv.x * M_PI) * offset.y);
    return position;
  }

  void main() {
    vUv = uv + (uOffset * 2.0);
    vec3 newPosition = deformationCurve(position, uv, uOffset);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`

// ─── Fragment Shader ────────────────────────────────────────────────────────
const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uAlpha;
  varying vec2 vUv;

  vec2 scaleUV(vec2 uv, float scale) {
    float center = 0.5;
    return ((uv - center) * scale) + center;
  }

  void main() {
    vec3 color = texture2D(uTexture, scaleUV(vUv, 0.8)).rgb;
    gl_FragColor = vec4(color, uAlpha);
  }
`

// ─── MotionHoverEffect Class ────────────────────────────────────────────────
export default class MotionHoverEffect {
    /**
     * @param {HTMLElement} container  — the DOM element where the WebGL canvas is appended
     * @param {Array<{element: HTMLElement, imageSrc: string}>} items — hoverable items with their image paths
     * @param {Object} options
     * @param {number} options.strength — distortion strength (default 0.25)
     */
    constructor(container, items, options = {}) {
        this.container = container
        this.itemsData = items
        this.options = {
            strength: options.strength || 0.25,
        }

        this.mouse = new THREE.Vector2()
        this.position = new THREE.Vector3(0, 0, 0)
        this.isMouseOver = false
        this.currentItem = null
        this.isLoaded = false
        this.isDestroyed = false

        this._boundOnMouseMove = this._onMouseMove.bind(this)
        this._boundOnResize = this._onResize.bind(this)

        this._setup()
        this._loadTextures().then(() => {
            this.isLoaded = true
        })
        this._createPlane()
        this._bindEvents()
    }

    // ─── Three.js Setup ────────────────────────────────────────────────────

    _setup() {
        const { width, height } = this._viewportSize

        // Renderer — transparent, overlays the container
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        this.renderer.setSize(width, height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.domElement.style.position = 'absolute'
        this.renderer.domElement.style.top = '0'
        this.renderer.domElement.style.left = '0'
        this.renderer.domElement.style.width = '100%'
        this.renderer.domElement.style.height = '100%'
        this.renderer.domElement.style.pointerEvents = 'none'
        this.renderer.domElement.style.zIndex = '50'
        this.container.appendChild(this.renderer.domElement)

        // Scene
        this.scene = new THREE.Scene()

        // Camera — PerspectiveCamera at z=3
        this.camera = new THREE.PerspectiveCamera(
            40,
            width / height,
            0.1,
            100
        )
        this.camera.position.set(0, 0, 3)

        // Clock
        this.clock = new THREE.Clock()

        // Render loop
        this.renderer.setAnimationLoop(this._render.bind(this))
    }

    _render() {
        if (this.isDestroyed) return
        this.renderer.render(this.scene, this.camera)
    }

    // ─── Computed Properties ───────────────────────────────────────────────

    get _viewportSize() {
        return {
            width: this.container.clientWidth,
            height: this.container.clientHeight,
        }
    }

    get _viewSize() {
        // Map camera frustum to world units at z=0
        const distance = this.camera.position.z
        const vFov = (this.camera.fov * Math.PI) / 180
        const height = 2 * Math.tan(vFov / 2) * distance
        const width = height * (this._viewportSize.width / this._viewportSize.height)
        return { width, height }
    }

    // ─── Texture Loading ──────────────────────────────────────────────────

    _loadTextures() {
        const loader = new THREE.TextureLoader()
        const promises = this.itemsData.map((item, index) => {
            return new Promise((resolve) => {
                if (!item.imageSrc) {
                    resolve({ texture: null, index })
                    return
                }
                loader.load(
                    item.imageSrc,
                    (texture) => resolve({ texture, index }),
                    undefined,
                    () => {
                        console.warn(`Failed to load texture: ${item.imageSrc}`)
                        resolve({ texture: null, index })
                    }
                )
            })
        })

        return Promise.all(promises).then((results) => {
            this.items = results.map((res, i) => ({
                element: this.itemsData[i].element,
                texture: res.texture,
                index: i,
            }))
        })
    }

    // ─── Plane + Shader ───────────────────────────────────────────────────

    _createPlane() {
        this.uniforms = {
            uTexture: { value: null },
            uOffset: { value: new THREE.Vector2(0.0, 0.0) },
            uAlpha: { value: 0 },
        }

        this.geometry = new THREE.PlaneGeometry(2, 2, 32, 32)
        this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader,
            fragmentShader,
            transparent: true,
        })

        this.plane = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.plane)
    }

    // ─── Events ───────────────────────────────────────────────────────────

    _bindEvents() {
        // Global mousemove on the container
        this.container.addEventListener('mousemove', this._boundOnMouseMove, false)
        window.addEventListener('resize', this._boundOnResize, false)

        // Per-item hover events
        this.itemsData.forEach((item, index) => {
            item._onEnter = () => this._onMouseEnterItem(index)
            item._onLeave = () => this._onMouseLeaveItem()
            item.element.addEventListener('mouseenter', item._onEnter, false)
            item.element.addEventListener('mouseleave', item._onLeave, false)
        })
    }

    _onMouseMove(event) {
        const rect = this.container.getBoundingClientRect()
        // Normalized coords relative to container (-1 to 1)
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

        if (!this.isMouseOver) return

        // Map to world coordinates
        const x = mapRange(this.mouse.x, -1, 1, -this._viewSize.width / 2, this._viewSize.width / 2)
        const y = mapRange(this.mouse.y, -1, 1, -this._viewSize.height / 2, this._viewSize.height / 2)

        // Store the instant target position
        this.position.set(x, y, 0)

        // Animate plane towards the target with GSAP easing
        gsap.to(this.plane.position, {
            duration: 1,
            x: x,
            y: y,
            ease: 'power4.out',
            onUpdate: () => this._onPositionUpdate(),
        })
    }

    _onPositionUpdate() {
        // The offset = velocity (difference between animated position and target)
        const offset = this.plane.position
            .clone()
            .sub(this.position)
            .multiplyScalar(-this.options.strength)
        this.uniforms.uOffset.value.copy(offset)
    }

    _onMouseEnterItem(index) {
        if (!this.isLoaded) return
        this.isMouseOver = true

        // Fade in
        gsap.to(this.uniforms.uAlpha, {
            duration: 0.5,
            value: 1,
            ease: 'power4.out',
        })

        // Switch texture if different item
        if (!this.currentItem || this.currentItem.index !== index) {
            this._switchTarget(index)
        }
    }

    _onMouseLeaveItem() {
        this.isMouseOver = false

        // Fade out
        gsap.to(this.uniforms.uAlpha, {
            duration: 0.5,
            value: 0,
            ease: 'power4.out',
        })
    }

    _switchTarget(index) {
        if (!this.items || !this.items[index]) return
        this.currentItem = this.items[index]
        if (!this.currentItem.texture) return

        // Set the new texture
        this.uniforms.uTexture.value = this.currentItem.texture

        // Scale plane to match image aspect ratio
        const img = this.currentItem.texture.image
        if (img) {
            const imageRatio = img.width / img.height
            this.plane.scale.set(imageRatio, 1, 1)
        }
    }

    // ─── Resize ───────────────────────────────────────────────────────────

    _onResize() {
        if (this.isDestroyed) return
        const { width, height } = this._viewportSize
        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(width, height)
    }

    // ─── Cleanup ──────────────────────────────────────────────────────────

    destroy() {
        this.isDestroyed = true
        this.renderer.setAnimationLoop(null)

        // Remove event listeners
        this.container.removeEventListener('mousemove', this._boundOnMouseMove)
        window.removeEventListener('resize', this._boundOnResize)

        this.itemsData.forEach((item) => {
            if (item._onEnter) item.element.removeEventListener('mouseenter', item._onEnter)
            if (item._onLeave) item.element.removeEventListener('mouseleave', item._onLeave)
        })

        // Remove canvas
        if (this.renderer.domElement && this.renderer.domElement.parentNode) {
            this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)
        }

        // Dispose Three.js objects
        this.geometry.dispose()
        this.material.dispose()
        this.renderer.dispose()
    }
}
