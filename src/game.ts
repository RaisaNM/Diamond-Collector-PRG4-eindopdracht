import * as PIXI from 'pixi.js'
import ghostImage from "./images/ghost.png"
import diamondImage from "./images/diamond.png"
import {Diamond} from './diamond'


//creating the game canvas
export class Game {
    // // STAP 1 - maak een pixi canvas
    pixi: PIXI.Application
    diamonds: Diamond[] = [];
    background: PIXI.Sprite
    loader

    //Making a pixi-canvas
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

    }
}
new Game()
