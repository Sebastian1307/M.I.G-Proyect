var cursors;

class debugRoom extends Phaser.Scene {
  constructor() {
    super("debugRoom");
  }

  preload() {}

  create() {
    const config = {
      // name of the controller scheme
      name: 'WASDKeys',
  
      // if true then this control scheme will be used (only one scheme can be 'active' at one time)
      active: true,
  
      // setup controls
      controls: {
          up: 'W',
          down: 'S',
          left: 'A',
          right: 'D',
          shift: 'SHIFT',
          space: 'SPACE'
      },
  
      // optional. Pass any data you want to add to the control scheme
      data: {},
  
      // optional function to call whenever this control scheme is set to active
      // scene - (optional) the scene this function is running in
      // scheme - (optional) the control scheme object
      onActive: function(scene, scheme) {
          console.log(scheme.name + ' is active!');
      }
  }
    this.aceleracion =2,0;
    this.velocidadSalto = 450;
    this.velocidadcaminar = 220;
    
    // load the map
    const map = this.make.tilemap({ key: "map" });
    const tiles = map.addTilesetImage("tilesetDebugLv1_2", "tiles");

    // Crear las capas
    const layer3 = map.createLayer("Background", tiles, 0, 0);
    const layer4 = map.createLayer("Dangers", tiles, 0, 0);
    const layer1 = map.createLayer("MidGround", tiles, 0, 0);
    layer1.setCollisionByExclusion([-1]);

    const layer2 = map.createLayer("Foreground", tiles, 0, 0);

    // Asignar profundidades a las capas
    layer3.setDepth(0); // Fondo
    layer1.setDepth(1); // Mid

    layer4.setDepth(1); // Frente
    layer2.setDepth(2); // Frente

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
    this.background3.alpha = 0.3;
    this.background3.setTint(0x784949);
    this.background3.setDepth(4);

  

    this.player = this.physics.add.sprite(179, 1380, "playerbeta");
    

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

    this.cameras.main.setZoom(1.5, 2);
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
      this.player.x + 100,
      this.player.y +100,
      "Version Alpha 0.1.4",
      { fontSize: "16px", fill: "#ffffff" }
    );
    this.versionText.setOrigin(0.5);
    this.versionText.setDepth(3); // Asegúrate de que el texto esté delante de todo


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


    this.cameras.main.fadeIn(5000);
    this.vidas = 3;
    console.log("Cantidad de vidas:",this.vidas)
  }

  update(time, delta) {
    this.events.on("resize", () => {
      this.versionLabel.setPosition(
        this.cameras.main.width - 10,
        this.cameras.main.height - 10
      );
    });
    this.background2.tilePositionY -= 1.2;

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

    if (this.cursors.space.isDown ^ this.cursors.w.isDown ^this.cursors.up.isDown && (this.player.body.onFloor()) ) {
      this.player.play("PlayerBetaJumpStart", true);
      this.player.body.setVelocityY(-this.velocidadSalto);
    }

    //Dash
    if(this.cursors.shift.isDown && (this.cursors.shift.isUp.duration) < 600){ 
      this.player.body.acceleration = this.aceleracion;
      
   
   }
   if((this.cursors.shift.isDown.duration) > 600 ){
    this.player.body.acceleration = 0;
    console.log("Sprint deberia finalizar ")
   
   }
   this.versionText.setPosition(this.cameras.x +2, this.cameras.y );

    this.coordinatesText.setPosition(this.player.x, this.player.y - 20);
    this.coordinatesText.setText(
      `(${Math.round(this.player.x)}, ${Math.round(this.player.y)})`
    );

    if (this.player.body.y >= 1530) {
      this.lostlive(this.player,this.vidas);
    }
  }
  lostlive(player,vidas) {
    

    if (this.player.alpha < 1) {
      return;
    }

    player.disableBody(true, true);
    

    if (vidas > 0){
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
  
  backtomenu(){
    this.cameras.main.fadeOut(5000);
    this.scene.start("menu");
  }

  resetPlayer(vidas) {
    vidas += -1;
    this.vidas = vidas;
    console.log("Vida ahora:" ,vidas)
    
    var x = 179;
    var y = 1380;
    this.player.enableBody(true, x, y, true, true);

    this.player.alpha = 0.5;
    console.log("Vida: ",this.vidas);
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
