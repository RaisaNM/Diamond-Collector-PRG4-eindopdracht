import * as PIXI from 'pixi.js'
import {Game} from './game'

export class Diamond extends PIXI.Sprite {
    speed: number = 0
    game: Game

    
    //OBJECT
    constructor(texture: PIXI.Texture, game: Game){
        super(texture)
        this.game = game
        
        this.x = Math.random() * game.pixi.screen.right
        this.y = Math.random() * game.pixi.screen.bottom
        this.scale.set(-1,1)

        this.interactive = true
        this.on('pointerdown', () => this.onClick());
    }

    //Behaviour: Everytime you click on a diamond, you collect them.
    onClick(){
        console.log("Click")
        this.game.pixi.stage.removeChild(this)
    }
    
      //Behaviour: updates the movement of the diamonds
      update(delta: number) {
        this.x += this.speed*delta
        this.x += Math.sin(this.y * 0.02) * 2
        this.y += Math.sin(this.x * 0.02) * 2
    }
}