var cursors;

class debugRoom extends Phaser.Scene {
  constructor() {
    super("debugRoom");
  }

  preload() { }

  create() {
    this.score = 0;
    // load the map
    const map = this.make.tilemap({ key: "map" });
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

    this.player = new Player(this, 179, 1380, "playerbeta");

    this.player.setDepth(1); // Fondo
    this.player.setTint(0xffffff);




    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(this.player.width - 32, this.player.height);

    this.physics.add.collider(this.player, layer1);
    this.physics.add.collider(
      this.player.bullets,
      layer1,
      this.bulletCollisionHandler,
      null,
      this
    );

    this.physics.world.bounds.width = layer1.width;
    this.physics.world.bounds.height = layer1.height;

    //---------------------
    //ENEMIGOS
    this.enemiesGroup = this.physics.add.group();
    this.enemy1 = new Enemy(this, 500, 1380, "enemy1", 3, 150, 1);
    this.enemiesGroup.add(this.enemy1);

    this.enemy2 = new Enemy(this, 550, 1380, "enemy1", 3, 150, 1);
    this.enemiesGroup.add(this.enemy2);

    this.enemy3 = new Enemy(this, 600, 1380, "enemy1", 10, 60, 2);
    this.enemiesGroup.add(this.enemy3);

    this.enemy4 = new Enemy(this, 1900, 850, "enemy1", 5, 100, 3);
    this.enemiesGroup.add(this.enemy4);

    this.physics.add.collider(this.enemiesGroup, layer1);
    this.physics.add.collider(this.enemiesGroup, this.enemiesGroup);


    this.physics.add.collider(
      this.player.bullets,
      this.enemiesGroup,
      (bullet, enemy) => {
        this.killenemy(enemy, bullet);
      },
      null,
      this
    );


    this.physics.add.collider(
      this.player,
      this.enemiesGroup,
      this.enemyhitplayer,
      null,
      this
    );

    //---------------------

    this.cameras.main.setBounds(
      0,
      0,
      map.widthInPixels + 50,
      map.heightInPixels - 42
    );

    //this.cameras.main.setZoom(1.5, 2);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

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

      "Version Alpha V.1.1",
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

    this.EnergyText = this.add.text(
      this.cameras.main.scrollX + 40,
      this.cameras.main.scrollY + 50,

      "",
      { fontSize: "16px", fill: "#ffffff" }
    );

    this.EnergyText.setOrigin(0.5);
    this.EnergyText.setDepth(5); // Asegúrate de que el texto esté delante de todo

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
      volume: 0.3,
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

    var postFxPlugin = this.plugins.get("rexglowfilter2pipelineplugin");

    var postFxPipeline = postFxPlugin.add(layerminmap, {
      distance: 4,

      outerStrength: 4,
      innerStrength: 0,
      glowColor: 0x8eff0d,
    });

    // Follow the player with the mini map camera
    miniMapCam.startFollow(this.player, true, 0.1, 0.1);

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
    miniMapCam.ignore(this.EnergyText);

    miniMapCam.ignore(this.staminaText);
    miniMapCam.ignore(this.player.bullets);

    //---------------
    //Follower Minmap

    // Crear el seguidor (cuadrado amarillo)
    this.follower = this.add.circle(this.player.x, this.player.y, 20, 0xffff00);

    var postFxPlugin = this.plugins.get("rexglowfilter2pipelineplugin");
    var postFxPipeline = postFxPlugin.add(this.follower, {
      distance: 3,

      outerStrength: 4,
      innerStrength: 0,
      glowColor: 0x48ff00,
    });

    // Ajustar el origen del seguidor en su centro
    this.follower.setOrigin(0.5);
    // Ajustar la escala del seguidor
    this.follower.setScale(1.2); // 20% más grande que el jugador

    this.cameras.main.ignore(this.follower);

    miniMapCam.ignore(this.player);
    miniMapCam.ignore(this.player.arm);

    //----------------------

    this.cameras.main.setPostPipeline(ScalinePostFX);
    this.cameras.main.setZoom(1.2)

    const shader = this.cameras.main.getPostPipeline(ScalinePostFX);

    this.cameras.main.fadeIn(2000);
    miniMapCam.fadeIn(2000);
  }

  update(time, delta) {
    this.player.update();
    this.enemiesGroup.children.iterate((enemy) => {
      enemy.update();
    });

    //this.versionText.setScrollFactor(0);
    this.coordinatesText.setPosition(this.player.x, this.player.y - 20);
    this.versionText.setPosition(
      this.cameras.main.scrollX + 190,
      this.cameras.main.scrollY + 60
    );

    this.LivesText.setPosition(
      this.cameras.main.scrollX + 140,
      this.cameras.main.scrollY + 80
    );
    this.LivesText.setText("Vidas: " + this.player.vidas);



    this.staminaText.setPosition(
      this.cameras.main.scrollX + 160,
      this.cameras.main.scrollY + 120
    );
    this.staminaText.setText("Stamina: " + this.player.timerdash);

    this.EnergyText.setPosition(
      this.cameras.main.scrollX + 150,
      this.cameras.main.scrollY + 100
    );
    this.EnergyText.setText("Energia: " + this.player.energy);

    // this.light.x = this.player.x;
    // this.light.y = this.player.y;

    this.follower.x = this.player.x;
    this.follower.y = this.player.y;

    this.events.on("resize", () => {
      this.versionLabel.setPosition(
        this.cameras.main.width - 10,
        this.cameras.main.height - 10
      );
    });

    this.background.tilePositionX = this.cameras.main.scrollX * .1;
    this.background2.tilePositionY -= 3;

    this.background3.tilePositionX -= 0.7;

    this.coordinatesText.setText(
      `(${Math.round(this.player.x)}, ${Math.round(this.player.y)})`
    );
  }
  bulletCollisionHandler(bullet) {
    // Destruye la bala
    bullet.destroy();
  }


  killenemy(enemy, bullet) {
    bullet.destroy();
    enemy.flashColor();
    enemy.lives--;
    console.log("Vida enemigo: ", enemy.lives)

    if (enemy.lives <= 0) {
      console.log("Enemy killed")
      enemy.destroy();
    }


    this.score += 5;
    console.log("Score: ", this.score);
  }



  enemyhitplayer() {
    this.cameras.main.flash(200, 0, 0, 150);
    this.player.lostenergy();
  }

  backtomenu() {
    this.cameras.main.shake(500);
    this.cameras.main.flash(500, 255, 0, 0);
    this.cameras.main.fadeOut(1000);
    this.music.stop();
    this.scene.start("menu");
  }
}
