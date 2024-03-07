class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    scene.add.existing(this);
    scene.physics.add.existing(this, false);

    this.setCollideWorldBounds(true); // Colisión con los límites del mundo
    this.setImmovable(true); // Hace que el enemigo no se mueva al colisionar con otros objetos

    this.body.allowGravity = true; // Evita que la gravedad afecte al enemigo
    // Velocidad de movimiento del enemigo
    this.speed = 150;

    // Estado inicial
    this.state = "moveRight";

    // Referencia al jugador
    this.player = this.scene.player;

    // Umbral de distancia para seguir al jugador
    this.followDistance = 400;

    this.body.setSize(this.width - 32, this.height);

  }

  update() {
    switch (this.state) {
      case "moveRight":
        this.setVelocityX(this.speed);
        break;

      case "moveLeft":
        this.setVelocityX(-this.speed);
        break;
    }

   

    // Calcular la distancia entre el enemigo y el jugador
    const distance = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      this.player.x,
      this.player.y
    );

    
    // Verificar colisiones con los tiles del suelo
    const blocked = {
      left: this.body.blocked.left,
      right: this.body.blocked.right,
    };

    if (blocked.left) {
      this.state = "moveRight";
      this.flipX = false;
    } else if (blocked.right) {
      this.state = "moveLeft";
      this.flipX = true;
    }

    // Si el jugador está lo suficientemente cerca, seguirlo
    if (distance < this.followDistance) {
        if (this.player.x < this.x) {
          this.setVelocityX(-this.speed);
          this.flipX = true;
        } else {
          this.setVelocityX(this.speed);
          this.flipX = false;
        }
      }
  }
}
