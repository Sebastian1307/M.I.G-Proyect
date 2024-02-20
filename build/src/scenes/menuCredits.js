class menuCredits extends Phaser.Scene {
  constructor() {
    super("menucredits");
  }

  preload() {}

  create() {
    this.open1 = this.sound.add("open1");
    this.close1 = this.sound.add("close1");
    this.close2 = this.sound.add("close2");

    this.music = this.sound.add("ost1Menu");
    // Título 1
    const title1 = this.add
      .text(400, 100, "Hecho por:", { fontSize: "32px", fill: "#fff" })
      .setOrigin(0.5);
    const paragraph1 = this.add
      .text(400, 150, "Sebastian Beltran", { fontSize: "16px", fill: "#fff" })
      .setOrigin(0.5);

    // Título 2
    const title2 = this.add
      .text(400, 250, "Creditos de assets:", { fontSize: "32px", fill: "#fff" })
      .setOrigin(0.5);
    const paragraph2 = this.add
      .text(
        400,
        300,
        "K.L.Jonasson - Triki Minut Interactive - www.trikiminut.com",
        { fontSize: "16px", fill: "#fff" }
      )
      .setOrigin(0.5);
    const paragraph2_1 = this.add
      .text(400, 320, "Crashed Ship por TedKerr", {
        fontSize: "16px",
        fill: "#fff",
      })
      .setOrigin(0.5);

    // Título 3
    const title3 = this.add
      .text(400, 400, "Equipo:", { fontSize: "32px", fill: "#fff" })
      .setOrigin(0.5);
    const paragraph3 = this.add
      .text(
        400,
        450,
        " Yo y mis pelotas",
        { fontSize: "16px", fill: "#fff" }
      )
      .setOrigin(0.5);

    // Agregar los textos a un grupo para facilitar su manejo
    const textGroup = this.add.group([
      title1,
      paragraph1,
      paragraph2_1,
      title2,
      paragraph2,
      title3,
      paragraph3,
    ]);

    // Centrar los textos en el centro horizontal de la pantalla
    textGroup.getChildren().forEach((text) => {
      text.x = this.cameras.main.width / 2;
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
    this.tweens.add({
      targets: textGroup.getChildren(),
      y: "-=500", 
      duration: 25000, 
      repeat: -1, 
      yoyo: false, 
    });
    // Agregar el botón en la esquina inferior derecha
    const button = this.add
      .text(
        this.cameras.main.width - 20,
        this.cameras.main.height - 20,
        "Volver al menu",
        { fontSize: "16px", fill: "#fff" }
      )
      .setOrigin(1, 1);
    button.setInteractive();
    button.on("pointerover", () => {
      this.open1.play();
      button.setScale(1.1);
    });

    button.on("pointerout", () => {
      this.close1.play();
      button.setScale(1);
    });
    button.on("pointerdown", () => {
      this.music.pause();

      this.scene.start("menu");
    });
  }

  update() {}
}
