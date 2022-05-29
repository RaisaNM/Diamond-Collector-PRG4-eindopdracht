import * as PIXI from 'pixi.js'
import ghostImage from "./images/ghost.png"
import diamondImage from "./images/diamond.png"
import {Ghost} from './ghost'
import {Diamond} from './diamond'

export class Game {
    //Making a pixi-canvas
    pixi: PIXI.Application
    diamonds: Diamond[] = [];
    ghost: Ghost[] = [];
    background: PIXI.Sprite
    loader

    //Object
    constructor(){
        console.log("game created")
        this.pixi = new PIXI.Application({ width: 800, height: 450 })
        document.body.appendChild(this.pixi.view)

        // // STAP 2 - preload alle afbeeldingen
        this.loader = new PIXI.Loader()
        this.loader
            .add('ghostTexture', ghostImage)
            .add('diamondTexture', diamondImage)

        this.loader.load(() => this.doneLoading())
    }

    //BEHAVOUR 

    //Done loading the canvas it loads the textures and classes.
    doneLoading(){
        console.log("all textures loaded!")

        //add Ghost
        for(let i = 0; i<1; i++){
            let ghost = new Ghost(this.loader.resources['ghostTexture'].texture!, this)
            this.ghost.push(ghost)
            this.pixi.stage.addChild(ghost)
        }

        //add diamonds
        for(let i = 0; i<35; i++){
            let diamond = new Diamond(this.loader.resources['diamondTexture'].texture!, this)
            this.diamonds.push(diamond)
            this.pixi.stage.addChild(diamond)
        }
        
        this.pixi.ticker.add((delta: number) => this.update(delta))
    }

    //updates the classes
    update(delta: number){
        for(const diamond of this.diamonds){
            diamond.update(delta)
        }

        for(const ghost of this.ghost){
            ghost.update()
        }

    }
}
new Game()
