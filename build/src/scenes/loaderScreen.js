class loaderScreen extends Phaser.Scene {
  constructor() {
    super("loader");
  }

  preload() {
    //Loaders plugins
    this.load.plugin(
      "rexglowfilter2pipelineplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexglowfilter2pipelineplugin.min.js",
      true
    );

    //loaders backgrounds
    this.load.image("bg_test1", "assets/backgrounds/bg_planetAtmos.png");
    this.load.image("bg_test_nubes", "assets/backgrounds/clouds.jpg");
    this.load.image("bg_test_nubes2", "assets/backgrounds/clouds2.jpg");
    this.load.image("bg_test2", "assets/backgrounds/bg_planet2.jpg");
    this.load.image("bg_test3", "assets/backgrounds/bg_planet3.jpg");
    this.load.image("bg_test4", "assets/backgrounds/bg_planet4.jpg");

    this.load.image(
      "bg_debugroom1",
      "assets/backgrounds/DebugRoom/bg_debug_room.jpg"
    );

    //Loaders Hud Y Gui

    this.load.image("hudmenu1", "assets/hud_gui/hudMenu1.PNG");
    this.load.image("bg_minmap", "assets/backgrounds/Hud/bg_minmap.png");

    //Loaders fuentes
    this.load.bitmapFont(
      "pixelFont",
      "assets/fonts/font.png",
      "assets/fonts/font.xml"
    );
    //--------------
    //loaders Characters
    //--------------

    //Loaders Player y characters
    this.load.spritesheet(
      "playerbeta",
      "assets/characters/player/debugchar/playerbetaconcept3.png",
      {
        frameWidth: 48,
        frameHeight: 48,
      }
    );

    this.load.spritesheet(
      "enemy1",
      "assets/characters/enemys/enemy1/enemy1.png",
      {
        frameWidth: 48,
        frameHeight: 48,
      }
    );

    //--------------
    //loaders Objects
    //--------------

    this.load.spritesheet(
      "bala",
      "assets/objects/bala.png",
      {
        frameWidth: 16,
        frameHeight: 16,
      }
    );
    this.load.image("gun1", "assets/objects/gun.png");
    this.load.image("explosion", "assets/objects/boom3.png");
    this.load.image("shield", "assets/objects/shield.png");
    this.load.image("bullet2", "assets/objects/bullet2.png");

    //Loaders ships
    this.load.image("ship1", "assets/characters/ships/ship1.png");
    this.load.image("ship2", "assets/characters/ships/ship2.png");
    this.load.image("ship3", "assets/characters/ships/ship3.png");

    //Loaders Audio SFX
    this.load.audio("open1", [
      "assets/sfx_ost/hud/open01.ogg",
      "assets/sfx_ost/hud/open01.mp3",
    ]);
    this.load.audio("close1", [
      "assets/sfx_ost/hud/close01.ogg",
      "assets/sfx_ost/hud/close01.mp3",
    ]);
    this.load.audio("close2", [
      "assets/sfx_ost/hud/close02.ogg",
      "assets/sfx_ost/hud/close02.mp3",
    ]);
    this.load.audio("atras", [
      "assets/sfx_ost/hud/atras.ogg",
      "assets/sfx_ost/hud/atras.mp3",
    ]);
    this.load.audio("confirm", [
      "assets/sfx_ost/hud/confirm.ogg",
      "assets/sfx_ost/hud/confirm.mp3",
    ]);
    this.load.audio("hover", [
      "assets/sfx_ost/hud/hover.ogg",
      "assets/sfx_ost/hud/hover.mp3",
    ]);


    this.load.audio("dash", [
      "assets/sfx_ost/player/dash.ogg",
      "assets/sfx_ost/player/dash.mp3",
    ]);
    this.load.audio("salto", [
      "assets/sfx_ost/player/salto.ogg",
      "assets/sfx_ost/player/salto.mp3",
    ]);
    this.load.audio("pasos", [
      "assets/sfx_ost/player/pasos.ogg",
      "assets/sfx_ost/player/pasos.mp3",
    ]);
    this.load.audio("regen", [
      "assets/sfx_ost/player/regenerate.ogg",
      "assets/sfx_ost/player/regenerate.mp3",
    ]);
    this.load.audio("respawn", [
      "assets/sfx_ost/player/respawn.ogg",
      "assets/sfx_ost/player/respawn.mp3",
    ]);



    this.load.audio("bala1", [
      "assets/sfx_ost/bullets/disparo.ogg",
      "assets/sfx_ost/bullets/disparo.mp3",
    ]);
    this.load.audio("rifle", [
      "assets/sfx_ost/bullets/rifle.ogg",
      "assets/sfx_ost/bullets/rifle.mp3",
    ]);

    //Loaders Audio OST
    this.load.audio("ost1Menu", [
      "assets/sfx_ost/ost/CrashedShip_byTedKerr.ogg",
      "assets/sfx_ost/ost/CrashedShip_byTedKerr.mp3",
    ]);
    this.load.audio("ost2DebugRoom", [
      "assets/sfx_ost/ost/debugroomost.ogg",
      "assets/sfx_ost/ost/debugroomost.mp3",
    ]);
    this.load.audio("title", [
      "assets/sfx_ost/ost/titletheme.ogg",
      "assets/sfx_ost/ost/titletheme.mp3",
    ]);

    //Loaders Mapas
    this.load.spritesheet(
      "tiles",
      "assets/tilesets/DebugRoom/tilesetDebugLv1_2.png",
      { frameWidth: 32, frameHeight: 32 }
    );
    this.load.tilemapTiledJSON(
      "map",
      "assets/tilesets/DebugRoom/debugroomtile1.json"
    );

    const progress = this.add.graphics();
 // Mensaje de "Cargando"
 const Title = this.add.text(350, 150, "MIG PROYECT", {
  font: "54px Arial",
  fill: "#ffffff"
});
 const loadingText = this.add.text(540, 295, "Cargando...", {
  font: "24px Arial",
  fill: "#000000"
});
const Empresaname = this.add.text(440, 320, "By Skywalker1307", {
  font: "24px Arial",
  fill: "#ffffff"
});
loadingText.setOrigin(0.5);


    this.load.on("progress", function (value) {
        progress.clear();
        progress.fillStyle(0xffffff, 1);
        progress.fillRect(380, 280, 300 * value, 30);
    });
  }

  create() {
    
    
    //ANIMACIONES JUGADOR
    this.anims.create({
      key: "PlayerBetaRun",
      frames: this.anims.generateFrameNumbers("playerbeta", {
        start: 36,
        end: 45,
      }),
      frameRate: 12.5,
      repeat: 0,
    });
    this.anims.create({
      key: "PlayerBetaIdle",
      frames: this.anims.generateFrameNumbers("playerbeta", {
        start: 0,
        end: 3,
      }),
      frameRate: 4.2,
      repeat: 0,
    });
    this.anims.create({
      key: "PlayerBetaIdle2",
      frames: this.anims.generateFrameNumbers("playerbeta", {
        start: 12,
        end: 15,
      }),
      frameRate: 4.2,
      repeat: 0,
    });
    this.anims.create({
      key: "PlayerBetaIdle3",
      frames: this.anims.generateFrameNumbers("playerbeta", {
        start: 24,
        end: 27,
      }),
      frameRate: 6.25,
      repeat: 0,
    });
    this.anims.create({
      key: "PlayerBetaJumpStart",
      frames: this.anims.generateFrameNumbers("playerbeta", {
        start: 48,
        end: 58,
      }),
      frameRate: 12,
      repeat: 0,
    });
    this.anims.create({
      key: "PlayerBetaDash",
      frames: this.anims.generateFrameNumbers("playerbeta", {
        start: 36,
        end: 45,
      }),
      frameRate: 24,
      repeat: 0,
    });


    //ANIMACIONES ENEMIGOS
    this.anims.create({
      key: "enemywalk",
      frames: this.anims.generateFrameNumbers("enemy1", {
        start: 0,
        end: 0,
      }),
      frameRate: 1,
      repeat: 0,
    });

    // ANIMACIONES BALAS

    this.anims.create({
      key: "baladisparo",
      frames: this.anims.generateFrameNumbers("bala", {
        start: 0,
        end: 3,
      }),
      frameRate: 12,
      repeat: -1,
    });

    this.anims.create({
      key: "balaimpacto",
      frames: this.anims.generateFrameNumbers("bala", {
        start: 4,
        end: 7,
      }),
      frameRate: 24,
      repeat: -1,

      
    });

    this.scene.start("menu"); 
         //this.scene.start("debugRoom");   

   
  }

  update() {}
}
