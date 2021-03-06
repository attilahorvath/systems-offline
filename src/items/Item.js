import SpriteController from "../SpriteController";

export default class extends SpriteController {
  constructor(renderer, map, gib, particleSystem, textLayer, audio) {
    super(map);

    this.renderer = renderer;
    this.gib = gib;
    this.particleSystem = particleSystem;
    this.textLayer = textLayer;
    this.audio = audio;

    this.hitboxX = 12.0;
    this.hitboxY = 24.0;
    this.hitboxW = 40.0;
    this.hitboxH = 40.0;
  }

  update() {
    if (!(this.gib.left > this.right || this.gib.right < this.left ||
          this.gib.top > this.bottom || this.gib.bottom < this.top)) {
      this.collected();
      this.sprite.disable();

      const count = 50;

      for (let i = 0; i < count; i++) {
        const angle = (2.0 * Math.PI / count) * i;

        this.particleSystem.emitParticle(
          this.left + this.hitboxW / 2.0, this.top + this.hitboxH / 2.0,
          0.53, 0.0, 0.0,
          Math.cos(angle) * 0.2 + (Math.random() - 0.5) * 0.05,
          Math.sin(angle) * 0.2 + (Math.random() - 0.5) * 0.05,
          700.0
        );
      }
    }

    super.update();
  }
}
