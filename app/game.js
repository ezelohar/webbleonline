/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 * 
 * Author: Zoran Lazic
 * 28. 02. 2014
 */

var peggle = function () {
	
	
	
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
	
	/* Load Data */
	
	/* Helpers */
	
	/* Animate request id */
	
	
	this.run();
}

peggle.prototype.run = function () {
	this.render();
	this.actions();
	this.start();
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

peggle.prototype.appendBalls = function () {

	//
	for (var i = 0; i < 10; i++) {
		var current = this.getBall(i);
		
		// center the sprites anchor point
		current.anchor.x = 0.5;
		current.anchor.y = 0.5;
		
		current.position.x = Math.floor(Math.random()* this.maxX);
		current.position.y = Math.floor(Math.random()* this.maxY);
		
		this.stage.addChild(current);
	}
}

peggle.prototype.animate = function () {
	var self = this;
	requestAnimFrame( self.animate.bind(self) );
	
	// just for fun, lets rotate mr rabbit a little
	self.getShutter().position.y += 6;
	
	
	// render the stage   
	self.renderer.render(self.stage);
}


/* Events */
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



/* Elements */
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



	


var PeggleGame = new peggle();
