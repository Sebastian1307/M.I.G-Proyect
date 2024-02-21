class MainMenu extends Phaser.Scene {
  constructor() {
    super("menu");
  }

  preload() {}

  create() {
    this.background = this.add.tileSprite(
      0,
      0,
      config.width,
      config.height,
      "bg_test2"
    );
    this.ship1 = this.add.sprite(-10, config.height / 2, "ship1");
    this.ship1.setScale(0.3); // Escala x0.5 y y0.5
    this.ship1.setTint(0xa0a0a0);
    this.ship2 = this.add.sprite(config.width / 2, 168, "ship2");
    this.ship2.setScale(0.3); // Escala x1.5 y y1.5
    this.ship2.setTint(0xa0a0a0);
    this.ship3 = this.add.sprite(-50, 56, "ship3");
    this.ship3.setScale(0.3); // Escala x1.5 y y1.5
    this.ship3.setTint(0xa0a0a0);

    this.background.setOrigin(0, 0);
    this.background2 = this.add.tileSprite(
      0,
      0,
      config.width,
      config.height,
      "bg_test_nubes"
    );
    this.background2.setOrigin(0, 0);
    this.background2.alpha = 0.3;
    this.background2.setTint(0xa0a0a0);

    this.background3 = this.add.tileSprite(
      0,
      0,
      config.width,
      config.height,
      "bg_test_nubes2"
    );
    this.background3.setOrigin(0, 0);
    this.background3.alpha = 0.7;
    this.background3.setTint(0x784949);

    this.open1 = this.sound.add("open1");
    this.close1 = this.sound.add("close1");
    this.close2 = this.sound.add("close2");

    this.music = this.sound.add("ost1Menu");

    this.ships = this.add.group();
    this.ships.add(this.ship1);
    this.ships.add(this.ship2);
    this.ships.add(this.ship3);

    // Dentro de la función create de tu escena
    const hudMenu = this.add.image(
      config.width - config.width * 0.35, // Alinea la esquina superior izquierda a la izquierda de la pantalla
      config.height / 2, // Posición Y centrada verticalmente
      "hudmenu1" // Nombre de la imagen cargada
    );
    hudMenu.setOrigin(0, 0.5); // Establece el origen del sprite en la esquina superior izquierda
    hudMenu.setTint(0x90EE90);
    hudMenu.alpha = 0.5;
    // Ajusta el ancho efectivo de la imagen y el alto para que ocupe toda la altura de la escena
    const effectiveWidth = config.width * 0.35; // Ancho de la imagen
    const effectiveHeight = config.height;

    // Ajusta el alto y el ancho de la imagen
    hudMenu.displayHeight = effectiveHeight;
    hudMenu.displayWidth = effectiveWidth;

    // Añade los textos directamente sobre la escena, en lugar de usar un contenedor
    const titletext = this.add.bitmapText(
      hudMenu.x + effectiveWidth / 2, // Alinea el texto al centro horizontalmente
      hudMenu.y - 200,
      "pixelFont",
      "Proyect - M.I.G",
      48
    );
    titletext.setOrigin(0.5);

    const debugButton = this.add.bitmapText(
      hudMenu.x + effectiveWidth / 2, // Alinea el texto al centro horizontalmente
      hudMenu.y,
      "pixelFont",
      "Ir a Debug Room",
      48
    );
    debugButton.setOrigin(0.5);
    debugButton.setInteractive();

    const creditsbutton = this.add.bitmapText(
      hudMenu.x + effectiveWidth / 2, // Alinea el texto al centro horizontalmente
      hudMenu.y + 45,
      "pixelFont",
      "Creditos",
      48
    );
    creditsbutton.setOrigin(0.5);
    creditsbutton.setInteractive();

    const versionText = this.add.bitmapText(
      hudMenu.x + effectiveWidth / 2, // Alinea el texto al centro horizontalmente
      hudMenu.y + 260,
      "pixelFont",
      "Build Version Alpha V.0.1.6.1",
      24
    );
    versionText.setOrigin(0.5);

    debugButton.on("pointerover", () => {
      this.open1.play();
      debugButton.setScale(1.1);
    });

    debugButton.on("pointerout", () => {
      this.close1.play();
      debugButton.setScale(1);
    });

    creditsbutton.on("pointerover", () => {
      this.open1.play();
      creditsbutton.setScale(1.1);
    });

    creditsbutton.on("pointerout", () => {
      this.close1.play();
      creditsbutton.setScale(1);
    });
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

    debugButton.on("pointerdown", () => {
      this.cameras.main.fadeOut(3000);
      this.close2.play();
      this.music.pause();
      this.scene.start("debugRoom");
    });
    creditsbutton.on("pointerdown", () => {
      this.close2.play();
      this.music.pause();

      this.cameras.main.fadeOut(1000);
      this.scene.start("menucredits");
    });

    this.cameras.main.fadeIn(1000);
  }
  moveShip(ship, speed) {
    ship.x += speed;
    if (ship.x > config.width + 30) {
      this.resetpositionship(ship);
    }
  }
  resetpositionship(ship) {
    ship.x = -20;
    var randomy = Phaser.Math.Between(0, config.height);
    ship.y = randomy;
  }
  update() {
    this.moveShip(this.ship1, 0.3);
    this.moveShip(this.ship2, 0.4);
    this.moveShip(this.ship3, 0.2);

    this.background.tilePositionX -= 0.1;
    this.background.tilePositionY -= 0.1;

    this.background2.tilePositionY -= 0.5;

    this.background3.tilePositionX -= 0.5;
  }
  transitionOut(progress) {
    this.cameras.main.fadeIn(100);
  }
}
