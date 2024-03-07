class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    scene.add.existing(this);
    scene.physics.add.existing(this, false);

    this.cursors = this.scene.input.keyboard.createCursorKeys();
    for (let key of [
      "w",
      "a",
      "s",
      "d",
      "r",
      "shift",
      "space",
      "enter",
      "esc",
    ]) {
      this.cursors[key.toLowerCase()] = this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes[key.toUpperCase()]
      );
    }

    this.dashbool = true;
    this.timerdash = 700;

    this.aceleracion = 2;
    this.velocidadSalto = 450;
    this.velocidadcaminar = 220;
    this.vidas = 0;

    this.arm = this.scene.add.sprite(this.x, this.y, "gun1");

    this.arm.setDepth(1.5);
    this.arm.scale = 0.25;
    this.arm.setOrigin(0.2, 0.5);
    this.scene.input.on("pointermove", (pointer) => {
      this.arm.rotation = Phaser.Math.Angle.BetweenPoints(this.arm, {
        x: pointer.worldX,
        y: pointer.worldY,
      });
      this.flipX = pointer.worldX < this.x;
      //console.log(this.arm.rotation)
      this.arm.flipY =
        this.arm.rotation < -Math.PI / 2 || this.arm.rotation > Math.PI / 2;
    });

    this.bullets = this.scene.physics.add.group({
      allowGravity: false,
    });

    this.maxBullets = 1; // Máximo de balas permitidas
    this.currentBullets = 0; // Contador de balas disparadas
    this.disparo1 = this.scene.sound.add("bala1");
  }

  update() {
    if (this.body.y >= 1530) {
      this.lostlive(this, this.vidas);
    }

    this.movement();
    this.dash();
    this.jump();
    this.armtoplayer();

    if (this.scene.input.activePointer.isDown) {
      if (this.currentBullets < this.maxBullets) {
        this.shoot();
        this.currentBullets++;
      }
    }
  }

  armtoplayer() {
    this.arm.x = this.x;
    this.arm.y = this.y - 4.5;
  }
  movement() {
    if (
      this.cursors.left.isDown ^
      this.cursors.right.isDown ^
      (this.cursors.a.isDown ^ this.cursors.d.isDown)
    ) {
      if (this.body.onFloor()) {
        this.play("PlayerBetaRun", true);
      }

      if (this.cursors.left.isDown || this.cursors.a.isDown) {
        this.body.setVelocityX(-this.velocidadcaminar);
      } else if (this.cursors.right.isDown || this.cursors.d.isDown) {
        this.body.setVelocityX(this.velocidadcaminar);
      }
    } else if (this.body.onFloor()) {
      this.body.setVelocityX(0);
      this.play("PlayerBetaIdle3", true);
    }
  }

  dash() {
    if (this.cursors.shift.isDown && this.timerdash > 1) {
      //console.log("Posición de la cámara - X:", this.cameras.main.scrollX, "Y:", this.cameras.main.scrollY);
      if (this.flipX == false) {
        this.body.setVelocityX(this.velocidadcaminar * 2.5);
      } else {
        this.body.setVelocityX(-this.velocidadcaminar * 2.5);
      }

      this.timerdash -= 50;
      //console.log(this.timerdash)
      this.dashbool = false;
    }
    if (this.cursors.shift.isUp) {
      this.dashbool = true;
    }
    if (this.timerdash < 700 && this.dashbool == true) {
      this.timerdash += 15;
      //console.log("Recargando dash: ", this.timerdash);
    }
  }

  jump() {
    if (
      this.cursors.space.isDown ^
        this.cursors.w.isDown ^
        this.cursors.up.isDown &&
      this.body.onFloor()
    ) {
      this.play("PlayerBetaJumpStart", true);
      this.body.setVelocityY(-this.velocidadSalto);
    }
  }

  lostlive() {
    if (this.alpha < 1) {
      return;
    }

    this.disableBody(true, true);
    this.scene.cameras.main.shake(500);

    // Cambiar temporalmente el color de la pantalla a rojo durante 500ms
    this.scene.cameras.main.flash(500, 255, 0, 0);

    if (this.vidas > 0) {
      
      this.scene.time.addEvent({
        delay: 1000,
        callback: this.resetPlayer(this.vidas),
        callbackScope: this,
        loop: false,
      });
    } else {
      this.scene.time.addEvent({
        delay: 5000,
        callback: this.scene.backtomenu(),
        callbackScope: this,
        loop: false,
      });
    }
  }

  resetPlayer() {
    this.vidas += -1;
    console.log("Vida ahora:", this.vidas);

    var x = 179;
    var y = 1380;
    this.enableBody(true, x, y, true, true);

    this.alpha = 0.5;
    console.log("Vida: ", this.vidas);
    this.scene.tweens.add({
      targets: this,
      y: 1380,
      x: 179,
      ease: "Power1",
      duration: 1000,
      repeat: 0,
      onComplete: function () {
        this.alpha = 1;
      },
      callbackScope: this,
    });
  }

  shoot() {
    // Creamos una bala en la posición del jugador
    let bullet = this.bullets.create(this.arm.x, this.arm.y, "bala");
    bullet.rotation = this.arm.rotation;
    // Calculamos la velocidad de la bala en función de la rotación del brazo
    let velocityX = Math.cos(this.arm.rotation) * 600;
    let velocityY = Math.sin(this.arm.rotation) * 600;

    // Aplicamos la velocidad a la bala
    bullet.setVelocity(velocityX, velocityY);

    this.scene.time.delayedCall(250, () => {
      this.currentBullets--;
    });

    this.scene.time.delayedCall(1000, () => {
      bullet.destroy();
    });
    this.disparo1.play();
    // Añadir animación a la bala
    bullet.anims.play("baladisparo", false);
  }
}
