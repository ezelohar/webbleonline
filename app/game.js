/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 * 
 * Author: Zoran Lazic
 * 28. 02. 2014
 */

var peggle = function () {
	
	/* Game engine */
	this.game = new Phaser.Game(1024, 768, Phaser.AUTO, '', { preload: this.preload, create: this.create, update: this.update });
	
	
	/* Game Stats */
	this.numberOfShoots = 10;
	this.currentScore = 0;
	this.currentMP = 1;
	this.maxX = 1024;
	this.maxY = 768
	
	/* Game Physics */
	this.gravity = 2;
	this.firePower = 0.1;
	
	
	/* Stage Data */
	this.stage = null;
	
	
	/* Ball State */
	this.isMoving = false;
	this.specialWepon = false;
	
	
	/*Map Data*/
	this.mapID = 1;
	
	/* Elements info */
	this.elements = {
		'balls': []
	};
	this.shutter = null;
	this.elementsCount = 100;
	
	/* Load Data */
	
	/* Helpers */
	
	/* Animate request id */
}

/* Switch to phaser */

peggle.prototype.preload = function () {
	this.game.load.image('background', 'assets/images/background-1.jpg');
	this.game.load.image('ball-unhit', 'assets/images/ball-unhit-16px.png');
	this.game.load.image('ball-hit', 'assets/images/ball-hit-16px.png');
	this.game.load.image('shutter', 'assets/images/shutter-16px.png');
	this.game.load.image('arrow', 'assets/images/arrow.png');
}

peggle.prototype.create = function () {
	this.game.physics.setBoundsToWorld(true, true, true, false);
	this.game.add.sprite(0, 0, 'background');
	
	PeggleGame.shutter = this.game.add.sprite(504, 100, 'shutter');
	PeggleGame.shutter.anchor.setTo(0.5, 0.5);
	PeggleGame.shutter.collideWorldBounds = true;
	
	//Set bounce (on bounce element contiune with 90% of current speed
	PeggleGame.shutter.body.bounce.setTo(0.9, 0.9);
	
	//Set element "hitbox"
	PeggleGame.shutter.body.setCircle(8, 8, 8);
	
	//the ball slows down by itself at this rate
	PeggleGame.shutter.body.linearDamping = 1.0;
	
	//used to check if the ball has come to a hold
	PeggleGame.shutter.body.minVelocity.setTo(1, 1);

	
	PeggleGame.appendBalls();
	
	PeggleGame.createArrow();
	
	this.game.input.onUp.add(function () {
		PeggleGame.leftClick();
	});
}

peggle.prototype.update = function () {
 //mode 0 means the ball is moving
  if (PeggleGame.isMoving == true) {

    //if the ball is moving, remove all info texts if there are any

    //collide the ball with the walls
    this.game.physics.collide(PeggleGame.shutter, PeggleGame.elements.webbles, function () {
		console.log('?');
	}, null, this);

    //Check if the ball is moving so slow that we can make it stop completly and switch to swing-mode
    if (Math.abs(PeggleGame.shutter.body.velocity.x) < PeggleGame.shutter.body.minVelocity.x && Math.abs(PeggleGame.shutter.body.velocity.y) < PeggleGame.shutter.body.minVelocity.y) {
      PeggleGame.isMoving = false;
    }

  } else if (PeggleGame.isMoving == false) {
    //mode 1 is the swing mode, the ball is laying still

    //rotate the arrow according to mouse/finger position
    PeggleGame.elements.arrow.rotation = this.game.math.angleBetween(PeggleGame.shutter.body.x, PeggleGame.shutter.body.y, this.game.input.x, this.game.input.y) + Math.PI/2;

    
  }
}




peggle.prototype.appendBalls = function () {
	this.elements.webbles = this.game.add.group();
	var x, y;
	//
	for (var i = 0; i < this.elementsCount; i++) {
		
		
		
		var x = Math.floor(Math.random()* this.maxX);
		var y = Math.floor(Math.random()* this.maxY);
		
		
		
		var currentBall = this.elements.webbles.create(x, y, 'ball-unhit');
		currentBall.body.immovable = true;
	}
}

peggle.prototype.createArrow = function () {
		//create the direction arrow
	this.elements.arrow = this.game.add.sprite(0, 0, 'arrow');
	this.elements.arrow.anchor.setTo(0.5, 0.5);
	this.elements.arrow.pivot.x = 0;
	this.elements.arrow.pivot.y = +35;
	//add it as a child to the ball, so that it circles the ball
	this.shutter.addChild(this.elements.arrow);
}

peggle.prototype.removeArrow = function () {
	this.shutter.removeChild(this.elements.arrow);
	this.elements.arrow.destroy();
}


/* actions */
peggle.prototype.leftClick = function () {
	this.shutter.body.velocity = this.game.physics.accelerationFromRotation(this.elements.arrow.rotation - Math.PI/2, 300);
	this.isMoving = true;
}








/*
 * 
 * @returns {undefined}

peggle.prototype.run = function () {
	
	
//	this.render();
//	this.actions();
//	this.start();
}

peggle.prototype.render = function () {
	var self = this;
	
	// create an new instance of a pixi stage
	self.stage = new PIXI.Stage(0x777777);

	// create a renderer instance
	self.renderer = PIXI.autoDetectRenderer(1024, 768);

	// add the renderer view element to the DOM
	document.getElementById('scene').appendChild(self.renderer.view);
	
	requestAnimFrame( self.animate.bind(self) );
	
	self.appendShutter();
	self.appendBalls();
	
	
}

peggle.prototype.actions = function () {
	var self = this;
	
	addEventListener ('mousedown', function (e) {
		self.fireBall();
	}) 
}

peggle.prototype.start = function () {


}

peggle.prototype.appendShutter = function () {
	// SHUTTER
	var shutter = this.getShutter();

	// center the sprites anchor point
	shutter.anchor.x = 0.5;
	shutter.anchor.y = 0.5;

	// move the sprite t the center of the screen
	shutter.position.x = 504;
	shutter.position.y = 150;

	this.stage.addChild(shutter);
}



peggle.prototype.animate = function () {
	var self = this;
	requestAnimFrame( self.animate.bind(self) );
	
	// just for fun, lets rotate mr rabbit a little
	self.getShutter().position.y += 6;
	
	
	// render the stage   
	self.renderer.render(self.stage);
}
 */

/* Events 
peggle.prototype.fireBall = function () {
	var moving = true;
	var shutter = this.getShutter();
	
	
	
	while (moving) {
		shutter.position.y += this.firePower
		
		if (shutter.position.y >= this.maxY) {
			moving = false;
		}
	}
}

*/

/* Elements 
peggle.prototype.getShutter = function () {
	if (this.elements['shutter']) { 
		return this.elements['shutter'];
	}
	
	var texture = PIXI.Texture.fromImage("assets/images/shutter-16px.png");
	// create a new Sprite using the texture
	this.elements['shutter'] = new PIXI.Sprite(texture);
	
	return this.elements['shutter'];
}

peggle.prototype.getBall = function (item) {
	
	if (typeof item === undefined) {
		return this.elements['balls'];
	}
	
	if (this.elements['balls'][item]) {
		return this.elements['balls'][item]
	}
	
	var texture = PIXI.Texture.fromImage("assets/images/ball-unhit-16px.png");
	
	
	
	// create a new Sprite using the texture
	this.elements['balls'][item] = new PIXI.Sprite(texture);
	
	return this.elements['balls'][item]
}
*/


	


var PeggleGame = new peggle();
