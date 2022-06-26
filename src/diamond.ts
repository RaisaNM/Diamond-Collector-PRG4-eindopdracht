import * as PIXI from 'pixi.js'
import {Game} from './game'

export class Diamond extends PIXI.Sprite {
    private speed: number = 0
    public game: Game

    //OBJECT    
    constructor(texture: PIXI.Texture, game: Game){
        super(texture)
        this.game = game
        
        this.x = Math.random() * game.pixi.screen.right
        this.y = Math.random() * game.pixi.screen.bottom
        this.scale.set(-1,1)
    }
    
    //Behaviour: updates the movement of the diamonds
    public update(delta: number) {
        this.x += this.speed*delta
        this.x += Math.sin(this.y * 0.02) * 2
        this.y += Math.sin(this.x * 0.02) * 2
    }
}