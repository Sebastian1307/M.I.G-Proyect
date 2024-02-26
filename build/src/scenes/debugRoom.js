var cursors;


class debugRoom extends Phaser.Scene {
  constructor() {
    super("debugRoom");
  }

  preload() { }

  create() {

    this.dashbool = true;
    this.timerdash = 700;

    (this.aceleracion = 2), 0;
    this.velocidadSalto = 450;
    this.velocidadcaminar = 220;

    // load the map
    const map = this.make.tilemap({ key: "map" });
    this.sys.animatedTiles.init(map);
    const tiles = map.addTilesetImage("tilesetDebugLv1_2", "tiles");

    // Crear las capas
    const layerminmap = map.createLayer("MAPLAYER", tiles, 0, 0);
    const layer3 = map.createLayer("Background", tiles, 0, 0);
    const layer4 = map.createLayer("Dangers", tiles, 0, 0);
    const layer1 = map.createLayer("MidGround", tiles, 0, 0);
    layer1.setCollisionByExclusion([-1]);
    const layer2 = map.createLayer("Foreground", tiles, 0, 0);

    // Asignar profundidades a las capas
    layer3.setDepth(0); // Fondo
    layer1.setDepth(1); // Mid
    layerminmap.setDepth(-5);
    layer4.setDepth(1); // Frente
    layer2.setDepth(2); // Frente

    this.cameras.main.ignore(layerminmap);

    // Crear el TileSprite del background
    this.background = this.add.tileSprite(
      0,
      0,
      map.widthInPixels, // Usar map.widthInPixels para el ancho del mapa
      map.heightInPixels, // Usar map.heightInPixels para el alto del mapa
      "bg_debugroom1"
    );

    this.background.setOrigin(0); // Asegurarse de que el origen del TileSprite esté en la esquina superior izquierda
    this.background.setScrollFactor(0); // Hacer que el TileSprite no se mueva con la cámara
    this.background.setDepth(-3); // Ajustar la profundidad para que esté detrás de todas las capas

    this.background2 = this.add.tileSprite(
      0,
      0,
      map.widthInPixels, // Usar map.widthInPixels para el ancho del mapa
      map.heightInPixels,
      "bg_test_nubes"
    );
    this.background2.setOrigin(0, 0);
    this.background2.alpha = 0.1;
    this.background2.setTint(0xa0a0a0);
    this.background2.setDepth(-2); // Ajustar la profundidad para que esté detrás de todas las capas

    this.background3 = this.add.tileSprite(
      0,
      0,
      map.widthInPixels, // Usar map.widthInPixels para el ancho del mapa
      map.heightInPixels,
      "bg_test_nubes2"
    );
    this.background3.setOrigin(0, 0);
    this.background3.alpha = 0.4;
    this.background3.setTint(0x784949);
    this.background3.setDepth(4);

    this.player = this.physics.add.sprite(179, 1380, "playerbeta");
    PhaserHealth.AddTo(this.player).setHealth(5, 0, 5);
    console.log("Player Health:", this.player.getHealth())

 

    this.player.setDepth(1); // Fondo
    this.player.setTint(0xffffff);

    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(this.player.width - 32, this.player.height);

    this.physics.add.collider(this.player, layer1);


    this.physics.world.bounds.width = layer1.width;
    this.physics.world.bounds.height = layer1.height;

    this.cameras.main.setBounds(
      0,
      0,
      map.widthInPixels + 50,
      map.heightInPixels - 42
    );

    //this.cameras.main.setZoom(1.5, 2);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    this.cursors = this.input.keyboard.createCursorKeys();
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
      this.cursors[key.toLowerCase()] = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes[key.toUpperCase()]
      );
    }

    this.coordinatesText = this.add.text(
      this.player.x,
      this.player.y - 20,
      "",
      { fontSize: "16px", fill: "#ffffff" }
    );
    this.coordinatesText.setOrigin(0.5);
    this.coordinatesText.setDepth(3); // Asegúrate de que el texto esté delante de todo

    this.versionText = this.add.text(
      this.cameras.main.scrollX + 100,
      this.cameras.main.scr2llY + 50,

      "Version Alpha V.0.1.6.1",
      { fontSize: "16px", fill: "#ffffff" }
    );

    this.versionText.setOrigin(0.5);
    this.versionText.setDepth(5); // Asegúrate de que el texto esté delante de todo

    this.LivesText = this.add.text(
      this.cameras.main.scrollX + 40,
      this.cameras.main.scrollY + 50,

      "",
      { fontSize: "16px", fill: "#ffffff" }
    );

    this.LivesText.setOrigin(0.5);
    this.LivesText.setDepth(5); // Asegúrate de que el texto esté delante de todo

    this.staminaText = this.add.text(
      this.cameras.main.scrollX + 40,
      this.cameras.main.scrollY + 70,

      "",
      { fontSize: "16px", fill: "#ffffff" }
    );

    this.staminaText.setOrigin(0.5);
    this.staminaText.setDepth(5); // Asegúrate de que el texto esté delante de todo

    this.music = this.sound.add("ost2DebugRoom");

    var musicConfig = {
      mute: false,
      volume: 0.6,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    };
    this.music.play(musicConfig);

    // Create a mini map camera
    const miniMapCam = this.cameras
      .add(this.cameras.main.scrollX + 850, 10, 200, 150)
      .setZoom(0.2);
    miniMapCam.setName("miniMap");

    // Crear el TileSprite del background
    this.bgminmap = this.add.tileSprite(
      0,
      0,
      map.widthInPixels * 2, // Usar map.widthInPixels para el ancho del mapa
      map.heightInPixels * 2, // Usar map.heightInPixels para el alto del mapa
      "bg_minmap"
    );
    this.bgminmap.alpha = 0.4;

    //this.bgminmap.setOrigin(0); // Asegurarse de que el origen del TileSprite esté en la esquina superior izquierda
    this.bgminmap.setScrollFactor(0); // Hacer que el TileSprite no se mueva con la cámara
    this.bgminmap.setDepth(-6); // Ajustar la profundidad para que esté detrás de todas las capas
    this.cameras.main.ignore(this.bgminmap);

    layerminmap.alpha = 0.9;

    var postFxPlugin = this.plugins.get('rexglowfilter2pipelineplugin');
    var postFxPipeline = postFxPlugin
      .add(layerminmap, {
        distance: 5,

        outerStrength: 4,
        innerStrength: 0,
        glowColor: 0x8eff0d,
      });


    // Follow the player with the mini map camera
    miniMapCam.startFollow(this.player, true, 0.05, 0.05);

    // Clamp mini map camera to map bounds
    miniMapCam.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    miniMapCam.ignore(layer3);
    miniMapCam.ignore(layer4);
    miniMapCam.ignore(layer1);
    miniMapCam.ignore(layer2);
    miniMapCam.ignore(this.background);
    miniMapCam.ignore(this.background2);
    miniMapCam.ignore(this.background3);
    miniMapCam.ignore(this.coordinatesText);
    miniMapCam.ignore(this.versionText);
    miniMapCam.ignore(this.LivesText);
    miniMapCam.ignore(this.staminaText);

    //---------------
    //Follower Minmap

    // Crear el seguidor (cuadrado amarillo)
    this.follower = this.add.circle(this.player.x, this.player.y, 20, 0xffff00);
    var postFxPlugin = this.plugins.get('rexglowfilter2pipelineplugin');
    var postFxPipeline = postFxPlugin
      .add(this.follower, {
        distance: 2,

        outerStrength: 4,
        innerStrength: 0,
        glowColor: 0x8eff0d,
      });

    // Ajustar el origen del seguidor en su centro
    this.follower.setOrigin(0.5);

    // Ajustar la escala del seguidor
    this.follower.setScale(1.2); // 20% más grande que el jugador

    this.cameras.main.ignore(this.follower);
    miniMapCam.ignore(this.player);

    //----------------------


    this.cameras.main.setPostPipeline(ScalinePostFX);

    const shader = this.cameras.main.getPostPipeline(ScalinePostFX);


    this.cameras.main.fadeIn(2000);
    miniMapCam.fadeIn(2000);

    this.vidas = 3;
  }

  update(time, delta) {
    //this.versionText.setScrollFactor(0);
    this.coordinatesText.setPosition(this.player.x, this.player.y - 20);
    this.versionText.setPosition(
      this.cameras.main.scrollX + 120,
      this.cameras.main.scrollY + 20
    );

    this.LivesText.setPosition(
      this.cameras.main.scrollX + 50,
      this.cameras.main.scrollY + 40
    );
    this.LivesText.setText("Vidas: " + this.vidas);

    this.staminaText.setPosition(
      this.cameras.main.scrollX + 70,
      this.cameras.main.scrollY + 55
    );
    this.staminaText.setText("Stamina: " + this.timerdash);

   
    this.follower.x = this.player.x;
    this.follower.y = this.player.y;

    this.events.on("resize", () => {
      this.versionLabel.setPosition(
        this.cameras.main.width - 10,
        this.cameras.main.height - 10
      );
    });
    this.background2.tilePositionY -= 3;

    this.background3.tilePositionX -= 0.7;

    if (
      this.cursors.left.isDown ^
      this.cursors.right.isDown ^
      (this.cursors.a.isDown ^ this.cursors.d.isDown)
    ) {
      if (this.player.body.onFloor()) {
        this.player.play("PlayerBetaRun", true);
      }
      if (this.cursors.left.isDown || this.cursors.a.isDown) {
        this.player.body.setVelocityX(-this.velocidadcaminar);
        this.player.flipX = true;
      } else if (this.cursors.right.isDown || this.cursors.d.isDown) {
        this.player.body.setVelocityX(this.velocidadcaminar);
        this.player.flipX = false;
      }
    } else if (this.player.body.onFloor()) {
      this.player.body.setVelocityX(0);
      this.player.play("PlayerBetaIdle3", true);
    }

    if (
      this.cursors.space.isDown ^
      this.cursors.w.isDown ^
      this.cursors.up.isDown &&
      this.player.body.onFloor()
    ) {
      this.player.play("PlayerBetaJumpStart", true);
      this.player.body.setVelocityY(-this.velocidadSalto);
    }

    //Dash
    if (this.cursors.shift.isDown && this.timerdash > 1) {
      //console.log("Posición de la cámara - X:", this.cameras.main.scrollX, "Y:", this.cameras.main.scrollY);
      if (this.player.flipX == false) {
        this.player.body.setVelocityX(this.velocidadcaminar * 2.5);
      } else {
        this.player.body.setVelocityX(-this.velocidadcaminar * 2.5);
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
      console.log("Recargando dash: ", this.timerdash);
    }

    this.coordinatesText.setText(
      `(${Math.round(this.player.x)}, ${Math.round(this.player.y)})`
    );

    if (this.player.body.y >= 1530) {
      this.lostlive(this.player, this.vidas);
    }
  }
  lostlive(player, vidas) {
    if (this.player.alpha < 1) {
      return;
    }

    player.disableBody(true, true);

    if (vidas > 0) {
      this.time.addEvent({
        delay: 1000,
        callback: this.resetPlayer(vidas),
        callbackScope: this,
        loop: false,
      });
    } else {
      this.time.addEvent({
        delay: 5000,
        callback: this.backtomenu,
        callbackScope: this,
        loop: false,
      });
    }
  }

  backtomenu() {
    this.cameras.main.fadeIn(5000);
    this.music.pause();
    this.scene.start("menu");
  }

  resetPlayer(vidas) {
    vidas += -1;
    this.vidas = vidas;
    console.log("Vida ahora:", vidas);

    var x = 179;
    var y = 1380;
    this.player.enableBody(true, x, y, true, true);

    this.player.alpha = 0.5;
    console.log("Vida: ", this.vidas);
    var tween = this.tweens.add({
      targets: this.player,
      y: 1380,
      x: 179,
      ease: "Power1",
      duration: 1000,
      repeat: 0,
      onComplete: function () {
        this.player.alpha = 1;
      },
      callbackScope: this,
    });
  }
}
