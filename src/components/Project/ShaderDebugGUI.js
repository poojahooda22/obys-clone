import GUI from 'lil-gui'

/**
 * Creates a lil-gui debug panel for tuning trippy shader parameters.
 * Only used in dev mode (import.meta.env.DEV).
 * @param {Array<{material: THREE.ShaderMaterial}>} meshes
 * @returns {GUI}
 */
export function createShaderDebugGUI(meshes) {
    const gui = new GUI({ title: 'Trippy Shader Tuning' })

    const ref = meshes[0]?.material.uniforms
    if (!ref) return gui

    const params = {
        circleRadius: ref.u_circleRadius.value,
        maskPow: ref.u_maskPow.value,
        maskScale: ref.u_maskScale.value,
        noiseFreqHigh: ref.u_noiseFreqHigh.value,
        noiseFreqLow: ref.u_noiseFreqLow.value,
        noiseAmpLow: ref.u_noiseAmpLow.value,
        timeSpeed: ref.u_timeSpeed.value,
        zoomBase: ref.u_zoomBase.value,
        zoomHover: ref.u_zoomHover.value,
    }

    const setAll = (key, value) => {
        meshes.forEach(({ material }) => {
            material.uniforms[key].value = value
        })
    }

    // Circle Mask folder
    const mask = gui.addFolder('Circle Mask')
    mask.add(params, 'circleRadius', 0.005, 0.1, 0.005).name('Radius').onChange(v => setAll('u_circleRadius', v))
    mask.add(params, 'maskPow', 1.0, 4.0, 0.1).name('Power Curve').onChange(v => setAll('u_maskPow', v))
    mask.add(params, 'maskScale', 1.0, 8.0, 0.5).name('Scale Factor').onChange(v => setAll('u_maskScale', v))

    // Noise folder
    const noise = gui.addFolder('Noise')
    noise.add(params, 'noiseFreqHigh', 1.0, 30.0, 0.5).name('Mask Noise Freq').onChange(v => setAll('u_noiseFreqHigh', v))
    noise.add(params, 'noiseFreqLow', 0.5, 8.0, 0.5).name('UV Distort Freq').onChange(v => setAll('u_noiseFreqLow', v))
    noise.add(params, 'noiseAmpLow', 0.0, 0.1, 0.005).name('UV Distort Amp').onChange(v => setAll('u_noiseAmpLow', v))
    noise.add(params, 'timeSpeed', 0.01, 0.2, 0.01).name('Animation Speed').onChange(v => setAll('u_timeSpeed', v))

    // Zoom folder
    const zoom = gui.addFolder('Zoom')
    zoom.add(params, 'zoomBase', 0.0, 0.5, 0.05).name('Base Zoom').onChange(v => setAll('u_zoomBase', v))
    zoom.add(params, 'zoomHover', 0.0, 0.5, 0.05).name('Hover Zoom').onChange(v => setAll('u_zoomHover', v))

    return gui
}
