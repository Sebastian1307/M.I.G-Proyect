class MainMenu extends Phaser.Scene {
    constructor() {
        super("menu");
    }

    preload() { }

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

        const blackRectangle = this.add.rectangle(
            config.width,
            config.height / 2,
            config.width * 0.3,
            config.height,
            0x545454
        );
        blackRectangle.alpha = 0.7;
        blackRectangle.setOrigin(1, 0.5);

        const effectiveWidth = Math.min(
            config.width * 0.3,
            config.width - blackRectangle.x
        );

        const textsContainer = this.add.container(
            blackRectangle.x - (blackRectangle.displayWidth - effectiveWidth) / 2,
            blackRectangle.y
        );

        const titletext = this.add.bitmapText(
            -effectiveWidth / 4,
            -200,
            "pixelFont",
            "Proyect M.I.G",
            48
        );
        titletext.setOrigin(0.5);
        textsContainer.add(titletext);

        const debugButton = this.add.bitmapText(
            -effectiveWidth / 4,
            0,
            "pixelFont",
            "Ir a Debug Room",
            48
        );
        debugButton.setOrigin(0.5);
        textsContainer.add(debugButton);
        debugButton.setInteractive();

        const creditsbutton = this.add.bitmapText(
            -effectiveWidth / 4,
            45,
            "pixelFont",
            "Creditos",
            48
        );
        creditsbutton.setOrigin(0.5);
        textsContainer.add(creditsbutton);
        creditsbutton.setInteractive();

        const versionText = this.add.bitmapText(
            -effectiveWidth / 4,
            290,
            "pixelFont",
            "Build Version Alpha V.0.1",
            24
        );
        versionText.setOrigin(0.5);
        textsContainer.add(versionText);


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
            this.close2.play();
            this.music.pause();

            this.scene.transition({
                target: "debugRoom", // Escena de destino
                duration: 2000, // Duración de la transición en milisegundos
                moveBelow: true, // Coloca la escena de destino debajo de la actual
                onUpdate: this.transitionOut, // Callback para personalizar la transición (opcional)
            });
        });
        creditsbutton.on("pointerdown", () => {
            this.close2.play();
            this.music.pause();

            this.scene.transition({
                target: "menucredits", // Escena de destino
                duration: 1000, // Duración de la transición en milisegundos
                moveBelow: true, // Coloca la escena de destino debajo de la actual
                onUpdate: this.transitionOut, // Callback para personalizar la transición (opcional)
            });
        });
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
        this.cameras.main.setBackgroundColor(`rgba(0, 0, 0, -${progress})`);
    }
}
