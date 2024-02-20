class loaderScreen extends Phaser.Scene {
  constructor() {
    super("loader");
  }

  preload() {
    //loaders backgrounds
    this.load.image("bg_test1", "assets/backgrounds/bg_planetAtmos.png");
    this.load.image("bg_test_nubes", "assets/backgrounds/clouds.jpg");
    this.load.image("bg_test_nubes2", "assets/backgrounds/clouds2.jpg");
    this.load.image("bg_test2", "assets/backgrounds/bg_planet2.jpg");
    this.load.image("bg_test3", "assets/backgrounds/bg_planet3.jpg");
    this.load.image("bg_test4", "assets/backgrounds/bg_planet4.jpg");

    this.load.image("bg_debugroom1", "assets/backgrounds/DebugRoom/bg_debug_room.jpg");

    //Loaders Hud Y Gui

    this.load.image("hudmenu1","assets/hud_gui/hudMenu1.PNG")

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
    this.load.spritesheet("playerbeta", "assets/characters/player/debugchar/playerbeta.png", {
      frameWidth: 48,
      frameHeight: 48,
    });


    //Loaders ships
    this.load.image("ship1", "assets/characters/ships/ship1.png");
    this.load.image("ship2", "assets/characters/ships/ship2.png");
    this.load.image("ship3", "assets/characters/ships/ship3.png");


    //Loaders Audio SFX
    this.load.audio("open1",["assets/sfx_ost/hud/open01.ogg","assets/sfx_ost/hud/open01.mp3"]);
    this.load.audio("close1",["assets/sfx_ost/hud/close01.ogg","assets/sfx_ost/hud/close01.mp3"]);
    this.load.audio("close2",["assets/sfx_ost/hud/close02.ogg","assets/sfx_ost/hud/close02.mp3"]);

    //Loaders Audio OST
    this.load.audio("ost1Menu",["assets/sfx_ost/ost/CrashedShip_byTedKerr.ogg","assets/sfx_ost/ost/CrashedShip_byTedKerr.mp3"]);

    //Loaders Mapas
    this.load.spritesheet('tiles', 'assets/tilesets/DebugRoom/tilesetDebugLv1_2.png', {frameWidth: 32, frameHeight: 32});
    this.load.tilemapTiledJSON('map', 'assets/tilesets/DebugRoom/debugroomtile1.json');

  }

  create() {
    this.anims.create({
      key: "PlayerBetaRun",
      frames: this.anims.generateFrameNumbers("playerbeta", {
        start:36,
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
        end: 51,
      }),
      frameRate: 6.25,
      repeat: 0,
    });
    this.anims.create({
      key: "PlayerBetaJumpMid",
      frames: this.anims.generateFrameNumbers("playerbeta", {
        start: 60,
        end: 63,
      }),
      frameRate: 6.25,
      repeat: 0,
    });
    this.anims.create({
      key: "PlayerBetaJumpEnd",
      frames: this.anims.generateFrameNumbers("playerbeta", {
        start: 72,
        end: 73,
      }),
      frameRate: 0,
      repeat: 0,
    });
    this.anims.create({
      key: "PlayerBetaFall",
      frames: this.anims.generateFrameNumbers("playerbeta", {
        start: 84,
        end: 84,
      }),
      frameRate: 0,
      repeat: 0,
    });



    // Agrega una transición de fundido negro (fade) al cambiar de escena
    this.scene.start("menu");
  }
  transitionOut(progress) {
    // Puedes personalizar la transición aquí, por ejemplo, cambiar el color del fondo
    this.cameras.main.setBackgroundColor(`rgba(0, 0, 0, ${progress})`);
  }
  update() {}
}
