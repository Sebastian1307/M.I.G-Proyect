
var gameSettings = {};

var config = {
  type: Phaser.AUTO,
  width: 1080,
  height: 600,
  pixelArt: true,
  scene: [loaderScreen, MainMenu, debugRoom, menuCredits],
  pipeline: { ScalinePostFX },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 980 },
      debug: true,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  fullscreenTarget: "game-container", 
};

const game = new Phaser.Game(config);
