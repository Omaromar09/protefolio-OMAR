import * as THREE from 'three';
import gsap from 'gsap';
import { photos } from './photosData.js';

export class ThreeHeroCard {
  constructor(containerElement, initialPhotoIndex = 1) {
    this.container = containerElement;
    this.currentIndex = initialPhotoIndex;
    this.isSupported = this.checkWebGLSupport();
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.cardMesh = null;
    this.textures = [];
    this.rafId = null;
    this.isTabActive = true;

    // Mouse tilt tracking
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.maxTilt = 8 * (Math.PI / 180); // 8 degrees in radians

    if (this.isSupported) {
      this.init();
    } else {
      this.initFallback();
    }
  }

  checkWebGLSupport() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  init() {
    const width = this.container.clientWidth || 360;
    const height = this.container.clientHeight || 480;

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    this.camera.position.z = 4.8;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); // Capped at 2
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.appendChild(this.renderer.domElement);

    // Lighting (Warm white key and off-white ambient reflecting the token system)
    const ambientLight = new THREE.AmbientLight(0xF4F1EC, 1.25);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xFFFBF5, 0.85);
    dirLight.position.set(2, 4, 3);
    this.scene.add(dirLight);

    // Texture Loader
    const loader = new THREE.TextureLoader();
    this.textures = photos.map(p => {
      const tex = loader.load(p.src);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      return tex;
    });

    // Create 3D Card Plane Geometry (3:4 ratio: 2.4 x 3.2)
    const geometry = new THREE.PlaneGeometry(2.35, 3.13, 32, 32);

    // Front & Back Material for 3D flip
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures[this.currentIndex],
      roughness: 0.25,
      metalness: 0.05,
      side: THREE.DoubleSide
    });

    this.cardMesh = new THREE.Mesh(geometry, this.material);
    this.scene.add(this.cardMesh);

    // Event Listeners
    this.bindEvents();

    // Start loop
    this.render();
  }

  bindEvents() {
    window.addEventListener('resize', this.onResize.bind(this));

    // Mouse movement for 3D tilt
    window.addEventListener('mousemove', (e) => {
      const rect = this.container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized coordinates -1 to +1 relative to card
      const nx = (e.clientX - centerX) / (window.innerWidth / 2);
      const ny = (e.clientY - centerY) / (window.innerHeight / 2);

      this.mouse.targetX = Math.max(-1, Math.min(1, nx)) * this.maxTilt;
      this.mouse.targetY = Math.max(-1, Math.min(1, ny)) * this.maxTilt;
    });

    // Pause rendering on tab hide
    document.addEventListener('visibilitychange', () => {
      this.isTabActive = !document.hidden;
      if (this.isTabActive && !this.rafId) {
        this.render();
      }
    });
  }

  onResize() {
    if (!this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (width === 0 || height === 0) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  flipTo(newIndex, direction = 1) {
    if (!this.cardMesh || newIndex === this.currentIndex) return;

    this.currentIndex = newIndex;
    const targetRotX = this.cardMesh.rotation.x + (direction > 0 ? Math.PI : -Math.PI);

    // GSAP flip around X-axis
    gsap.to(this.cardMesh.rotation, {
      x: targetRotX,
      duration: 0.65,
      ease: 'power3.out',
      onUpdate: () => {
        // Halfway through rotation, swap texture
        const progress = Math.abs((this.cardMesh.rotation.x % Math.PI) / Math.PI);
        if (progress > 0.45 && progress < 0.55) {
          this.material.map = this.textures[this.currentIndex];
          this.material.needsUpdate = true;
        }
      },
      onComplete: () => {
        this.material.map = this.textures[this.currentIndex];
        this.material.needsUpdate = true;
      }
    });

    // Quick scale punch for juicy tactile feel
    gsap.fromTo(this.cardMesh.scale,
      { x: 0.94, y: 0.94, z: 0.94 },
      { x: 1, y: 1, z: 1, duration: 0.5, ease: 'back.out(2)' }
    );
  }

  render() {
    if (!this.isTabActive) {
      this.rafId = null;
      return;
    }

    // Smooth lerp tilt
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;

    if (this.cardMesh) {
      this.cardMesh.rotation.y = this.mouse.x;
      // Combine base X rotation with cursor Y tilt
      const baseRotX = Math.round(this.cardMesh.rotation.x / Math.PI) * Math.PI;
      this.cardMesh.rotation.x += (baseRotX - this.mouse.y - this.cardMesh.rotation.x) * 0.08;
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }

    this.rafId = requestAnimationFrame(this.render.bind(this));
  }

  initFallback() {
    // 2D CSS Fallback for weak or unsupported devices
    console.info('Three.js fallback enabled for 2D card rendering');
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
    }
  }
}
