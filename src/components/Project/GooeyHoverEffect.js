import * as THREE from 'three'
import { gsap } from 'gsap'

// --- Shaders ---
const vertexShader = `
  varying vec2 v_uv;
  void main() {
    v_uv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Fragment shader: "Trippy" variant from Aqro/gooey-hover-codrops
// Mouse-following circular mask with noisy distortion
const fragmentShader = `
  // Simplex 3D Noise (inlined from glsl-noise/simplex/3d)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise3(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  uniform sampler2D u_map;
  uniform sampler2D u_hovermap;

  uniform float u_alpha;
  uniform float u_time;
  uniform float u_progressHover;
  uniform float u_progressClick;

  uniform vec2 u_res;
  uniform vec2 u_mouse;
  uniform vec2 u_ratio;
  uniform vec2 u_hoverratio;

  // Tunable uniforms (controlled via lil-gui in dev mode)
  uniform float u_circleRadius;
  uniform float u_noiseFreqHigh;
  uniform float u_noiseFreqLow;
  uniform float u_noiseAmpLow;
  uniform float u_zoomBase;
  uniform float u_zoomHover;
  uniform float u_timeSpeed;
  uniform float u_maskPow;
  uniform float u_maskScale;

  varying vec2 v_uv;

  float circle(in vec2 _st, in float _radius, in float blurriness){
      vec2 dist = _st;
      return 1. - smoothstep(_radius-(_radius*blurriness), _radius+(_radius*blurriness), dot(dist,dist)*4.0);
  }

  void main() {
    vec2 resolution = u_res * PR;
    float time = u_time * u_timeSpeed;
    float progress = u_progressClick;
    float progressHover = u_progressHover;
    vec2 uv = v_uv;
    vec2 uv_h = v_uv;

    // Screen-space coordinates for circle mask positioning
    vec2 st = gl_FragCoord.xy / resolution.xy - vec2(.5);
    st.y *= resolution.y / resolution.x;

    vec2 mouse = vec2((u_mouse.x / u_res.x) * 2. - 1.,-(u_mouse.y / u_res.y) * 2. + 1.) * -.5;
    mouse.y *= resolution.y / resolution.x;

    // Mouse-following circle mask
    vec2 cpos = st + mouse;
    float c = circle(cpos, u_circleRadius * progressHover + progress * 0.8, 2.);

    // Sinusoidal noise coordinates
    float offX = uv.x + sin(uv.y + time * 2.);
    float offY = uv.y - time * .2 - cos(time * 2.) * 0.1;
    float nc = (snoise3(vec3(offX, offY, time * .5) * u_noiseFreqHigh)) * progressHover;
    float nh = (snoise3(vec3(offX, offY, time * .5) * u_noiseFreqLow)) * u_noiseAmpLow;

    // Hover image UVs — zoom + cover-fit ratio (ratio applied in centered space)
    uv_h -= vec2(0.5);
    uv_h *= 1. - u_progressHover * u_zoomHover;
    uv_h *= u_hoverratio;
    uv_h += vec2(0.5);

    // Base image UVs — zoom + cover-fit ratio (ratio applied in centered space)
    uv -= vec2(0.5);
    uv *= 1. - u_progressHover * u_zoomBase;
    uv *= u_ratio;
    uv += vec2(0.5);

    // Sample textures: u_hovermap = clean hover target, u_map = distorted base
    vec4 image = texture2D(u_hovermap, uv_h);
    vec4 imageDistorted = texture2D(u_map, uv + vec2(nh) * progressHover);

    // Circle mask reveals hover image with noisy distortion
    float finalMask = smoothstep(.99, 1., pow(c, u_maskPow) * u_maskScale + nc * (1. - progress));
    vec4 finalImage = mix(imageDistorted, image, clamp(finalMask + progress, 0., 1.));

    gl_FragColor = vec4(finalImage.rgb, u_alpha);
  }
`

export default class GooeyHoverEffect {
    constructor(container, itemsData) {
        this.container = container
        this.itemsData = itemsData // { element, image1, image2 }
        this.meshes = []
        this.isDestroyed = false

        this.mouse = new THREE.Vector2(0, 0)
        this._boundOnMouseMove = this._onMouseMove.bind(this)
        this._boundOnResize = this._onResize.bind(this)

        this._setup()
        this._init()
        this._bindEvents()

        // Dev-only: lil-gui debug panel for shader tuning
        this._gui = null
        if (import.meta.env.DEV) {
            import('./ShaderDebugGUI.js').then(({ createShaderDebugGUI }) => {
                if (!this.isDestroyed) {
                    this._gui = createShaderDebugGUI(this.meshes)
                }
            })
        }
    }

    _setup() {
        const rect = this.container.getBoundingClientRect()
        this.width = rect.width
        this.height = rect.height

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        this.renderer.setSize(this.width, this.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.domElement.style.position = 'absolute'
        this.renderer.domElement.style.top = '0'
        this.renderer.domElement.style.left = '0'
        this.renderer.domElement.style.pointerEvents = 'none'
        this.renderer.domElement.style.zIndex = '10'
        this.container.appendChild(this.renderer.domElement)

        this.scene = new THREE.Scene()
        this.camera = new THREE.OrthographicCamera(
            this.width / -2, this.width / 2,
            this.height / 2, this.height / -2,
            1, 1000
        )
        this.camera.position.z = 1

        this.clock = new THREE.Clock()
        this.renderer.setAnimationLoop(this._render.bind(this))
    }

    _getRatio(plane, texture) {
        const planeRatio = plane.width / plane.height
        const textureRatio = texture.image.width / texture.image.height

        let ratio = new THREE.Vector2(1, 1)
        if (planeRatio > textureRatio) {
            ratio.set(1, planeRatio / textureRatio)
        } else {
            ratio.set(textureRatio / planeRatio, 1)
        }
        return ratio
    }

    _init() {
        const loader = new THREE.TextureLoader()

        this.itemsData.forEach((item) => {
            const rect = item.element.getBoundingClientRect()
            const containerRect = this.container.getBoundingClientRect()

            const geometry = new THREE.PlaneGeometry(rect.width, rect.height)
            const material = new THREE.ShaderMaterial({
                uniforms: {
                    u_alpha: { value: 1.0 },
                    u_time: { value: 0 },
                    u_mouse: { value: this.mouse },
                    u_res: { value: new THREE.Vector2(this.width, this.height) },
                    u_progressHover: { value: 0 },
                    u_progressClick: { value: 0 },
                    u_map: { value: null },
                    u_hovermap: { value: null },
                    u_ratio: { value: new THREE.Vector2(1, 1) },
                    u_hoverratio: { value: new THREE.Vector2(1, 1) },
                    // Tunable trippy shader params
                    u_circleRadius: { value: 0.02 },
                    u_noiseFreqHigh: { value: 8.0 },
                    u_noiseFreqLow: { value: 2.0 },
                    u_noiseAmpLow: { value: 0.03 },
                    u_zoomBase: { value: 0.2 },
                    u_zoomHover: { value: 0.1 },
                    u_timeSpeed: { value: 0.05 },
                    u_maskPow: { value: 2.0 },
                    u_maskScale: { value: 4.0 },
                },
                vertexShader,
                fragmentShader,
                transparent: true,
                defines: {
                    PR: window.devicePixelRatio.toFixed(1),
                },
            })

            // Load textures and set ratios
            loader.load(item.image1, (t1) => {
                material.uniforms.u_map.value = t1
                material.uniforms.u_ratio.value.copy(this._getRatio(rect, t1))
            })
            loader.load(item.image2, (t2) => {
                material.uniforms.u_hovermap.value = t2
                material.uniforms.u_hoverratio.value.copy(this._getRatio(rect, t2))
            })

            const mesh = new THREE.Mesh(geometry, material)

            // Position relative to container center
            const x = rect.left - containerRect.left + rect.width / 2 - this.width / 2
            const y = -(rect.top - containerRect.top + rect.height / 2 - this.height / 2)

            mesh.position.set(x, y, 0)
            this.scene.add(mesh)
            const meshEntry = { mesh, element: item.element, material, isHovering: false }
            this.meshes.push(meshEntry)

            // Events per item
            item.element.addEventListener('mouseenter', () => {
                meshEntry.isHovering = true
                gsap.to(material.uniforms.u_progressHover, { value: 1, duration: 0.5, ease: "power2.inOut" })
            })
            item.element.addEventListener('mouseleave', () => {
                meshEntry.isHovering = false
                gsap.to(material.uniforms.u_progressHover, { value: 0, duration: 0.5, ease: "power2.inOut" })
            })
        })
    }

    _bindEvents() {
        window.addEventListener('mousemove', this._boundOnMouseMove)
        window.addEventListener('resize', this._boundOnResize)
    }

    _onMouseMove(e) {
        const rect = this.container.getBoundingClientRect()
        gsap.to(this.mouse, {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            duration: 0.5,
            ease: "power2.out",
            overwrite: true,
        })
    }

    _onResize() {
        if (this.isDestroyed) return
        const rect = this.container.getBoundingClientRect()
        this.width = rect.width
        this.height = rect.height

        this.renderer.setSize(this.width, this.height)
        this.camera.left = this.width / -2
        this.camera.right = this.width / 2
        this.camera.top = this.height / 2
        this.camera.bottom = this.height / -2
        this.camera.updateProjectionMatrix()

        this.meshes.forEach(({ mesh, element, material }) => {
            const iRect = element.getBoundingClientRect()
            const containerRect = this.container.getBoundingClientRect()
            const x = iRect.left - containerRect.left + iRect.width / 2 - this.width / 2
            const y = -(iRect.top - containerRect.top + iRect.height / 2 - this.height / 2)
            mesh.position.set(x, y, 0)

            material.uniforms.u_res.value.set(this.width, this.height)

            // Update ratios if element size changed
            if (material.uniforms.u_map.value) {
                material.uniforms.u_ratio.value.copy(this._getRatio(iRect, material.uniforms.u_map.value))
            }
            if (material.uniforms.u_hovermap.value) {
                material.uniforms.u_hoverratio.value.copy(this._getRatio(iRect, material.uniforms.u_hovermap.value))
            }
        })
    }

    _render() {
        if (this.isDestroyed) return
        const delta = this.clock.getDelta()
        this.meshes.forEach(({ material, isHovering }) => {
            // Only advance time during hover or while leave animation is running
            if (isHovering || material.uniforms.u_progressHover.value > 0) {
                material.uniforms.u_time.value += delta
            }
        })
        this.renderer.render(this.scene, this.camera)
    }

    destroy() {
        this.isDestroyed = true
        if (this._gui) {
            this._gui.destroy()
            this._gui = null
        }
        window.removeEventListener('mousemove', this._boundOnMouseMove)
        window.removeEventListener('resize', this._boundOnResize)
        this.renderer.setAnimationLoop(null)
        if (this.renderer.domElement.parentNode) {
            this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)
        }
        this.meshes.forEach(({ mesh, material }) => {
            mesh.geometry.dispose()
            material.dispose()
        })
        this.renderer.dispose()
    }
}
