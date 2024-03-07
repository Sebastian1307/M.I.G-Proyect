class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
      super(scene, x, y, key);
  
      scene.add.existing(this);
      scene.physics.add.existing(this, false);
  
      
      
    }
  
    update() {
     
    }
  
  
  }
  