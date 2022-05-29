import * as PIXI from 'pixi.js'
import {Game} from './game'

//Ghost class, the player
export class Ghost extends PIXI.Sprite {
    //Speed
    speed: number = 0
    xspeed = 0
    yspeed = 0

    //Game
    game: Game

    //Object
    constructor(texture: PIXI.Texture, game: Game){
        super(texture)
        this.game = game
        
        //starts randomly in the screen
        this.x = Math.random() * game.pixi.screen.right
        this.y = Math.random() * game.pixi.screen.bottom
        this.scale.set(-1,1)

        //Keyboard
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }
    

    //Behaviour: Walking (If you click on the up/W, down/S, left/A or right/D buttons, the player moves)
    onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "A":
            case "ARROWLEFT":
                this.xspeed = -5
                break
            case "D":
            case "ARROWRIGHT":
                this.xspeed = 5
                break
            case "W":
            case "ARROWUP":
                this.yspeed = -5
                break
            case "S":
            case "ARROWDOWN":
                this.yspeed = 5
                break
        }
    }

    onKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                break;
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xspeed = 0
                break
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.yspeed = 0
                break
        }
    }

    //Speed
    update() {
        this.x += this.xspeed
        this.y += this.yspeed
        this.keepInScreen()
    }

    //Ghost stays on the screen even if the player goes out of screen.
    keepInScreen(){
        if (this.getBounds().left > this.game.pixi.screen.right){
            this.x = -this.getBounds().width
        }

    }
}