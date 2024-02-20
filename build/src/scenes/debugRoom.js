var player;
var cursors;

class debugRoom extends Phaser.Scene {
  constructor() {
    super("debugRoom");
  }

  preload() {}

  create() {
    this.velocidadSalto = 450
    this.velocidadcaminar = 200;
    // load the map
    const map = this.make.tilemap({ key: "map" });
    const tiles = map.addTilesetImage("tilesetDebugLv1_2", "tiles");

    // Crear las capas
    const layer3 = map.createLayer("Background", tiles, 0, 0);
    const layer1 = map.createLayer("MidGround", tiles, 0, 0);
    layer1.setCollisionByExclusion([-1]);
    const layer2 = map.createLayer("Foreground", tiles, 0, 0);

    // Asignar profundidades a las capas
    layer3.setDepth(0); // Fondo
    layer1.setDepth(1); // Mid
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

    this.ship1 = this.add.sprite(-10, map.height / 2, "ship1");
    this.ship1.setScale(0.3); // Escala x0.5 y y0.5
    this.ship1.setTint(0xa0a0a0);
    this.ship1.setDepth(-1); // Fondo



    this.player = this.physics.add.sprite(100, 1400, "playerbeta");
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
      map.widthInPixels,
      map.heightInPixels + 5
    );

    this.cameras.main.setZoom(1.5, 2);
    this.cameras.main.startFollow(this.player);

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

    this.versionLabel = this.add.text(0, 0, "M.I.G Version Alpha 0.1", {
      fontSize: "24px",
      fill: "#fff",
    });
    this.versionLabel.setOrigin(1, 1); // Establecer el origen en la esquina inferior derecha
    this.versionLabel.setPosition(
      this.cameras.main.width - 10,
      this.cameras.main.height - 10
    ); // Ajustar la posición según el tamaño de la pantalla
    this.versionLabel.alpha = 1;
    this.versionLabel.setDepth(5);
  }
  update(time, delta) {
    // Actualizar la posición del texto en cada fotograma para que se mantenga en la esquina inferior derecha de la pantalla
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

    if (this.cursors.space.isDown && this.player.body.onFloor()) {
      this.player.play("PlayerBetaJumpStart", true);
      this.player.body.setVelocityY(-this.velocidadSalto);
    }
  }
}
