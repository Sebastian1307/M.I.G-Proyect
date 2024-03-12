class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, live, speed,colorID) {
    super(scene, x, y, key);

    scene.add.existing(this);
    scene.physics.add.existing(this, false);

    this.setCollideWorldBounds(true); // Colisión con los límites del mundo
    this.setImmovable(true); // Hace que el enemigo no se mueva al colisionar con otros objetos

    this.body.allowGravity = true; // Evita que la gravedad afecte al enemigo
    // Velocidad de movimiento del enemigo
    this.speed = speed;

    
    this.lives = live;

    // Estado inicial
    this.state = "moveRight";

    // Referencia al jugador
    this.player = this.scene.player;

    // Umbral de distancia para seguir al jugador
    this.followDistance = 400;

    this.body.setSize(this.width - 32, this.height);

    // Mapeo de IDs de color a colores correspondientes
    this.colorMap = {
      1: 0xff0000, // Rojo
      2: 0x00ff00, // Verde
      3: 0x0000ff, // Azul
      // Añade más colores según necesites
    };

    // Aplicar tint al enemigo según el colorID proporcionado
    if (this.colorMap.hasOwnProperty(colorID)) {
      this.setTint(this.colorMap[colorID]);
    }
    this.defaultColor = this.tint; // Guardar el color original
    this.restoreTintTimer = null;
  }

  update() {


    this.explode();

    this.play("enemywalk",true);

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
  explode(){
    //console.log("llamado explosion")
    this.play("enemyexplode",true);
  }
  

  flashColor() {
    // Cambiar temporalmente el color del enemigo
    this.setTint(0xffffff); // Color blanco, puedes ajustar este color según lo necesites

    // Restaurar el color original después de un tiempo
    this.scene.time.delayedCall(50, () => {
      this.setTint(this.defaultColor);
    });
  }


}
