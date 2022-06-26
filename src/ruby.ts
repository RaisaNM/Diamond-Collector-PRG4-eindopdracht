import * as PIXI from 'pixi.js'
import {Game} from './game'

//Ruby's has to damage the player
export class Ruby extends PIXI.Sprite {
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
    
    //Behaviour
    public update(delta: number) {
        this.x += this.speed*delta
        this.x += Math.sin(this.y * 0.02) * 3
        this.y += Math.sin(this.x * 0.02) * 2
    }
}