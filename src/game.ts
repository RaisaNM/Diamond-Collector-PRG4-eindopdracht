import * as PIXI from 'pixi.js'
import ghostImage from "./images/ghost.png"
import diamondImage from "./images/diamond.png"
import rubyImage from "./images/ruby.png"

import {Ghost} from './ghost'
import {Diamond} from './diamond'
import {Ruby} from './ruby'

export class Game {
    //Making a pixi-canvas
    pixi: PIXI.Application
    diamonds: Diamond[] = [];
    rubies: Ruby[] = [];
    ghost: Ghost[] = [];
    background: PIXI.Sprite
    loader

    constructor(){
        console.log("game created")
        this.pixi = new PIXI.Application({ width: 800, height: 450 })
        document.body.appendChild(this.pixi.view)

        //Object
        this.loader = new PIXI.Loader()
        this.loader
            .add('ghostTexture', ghostImage)
            .add('diamondTexture', diamondImage)
            .add('rubyTexture', rubyImage)

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

        //add rubies
        for(let i = 0; i<20; i++){
            let ruby = new Ruby(this.loader.resources['rubyTexture'].texture!, this)
            this.rubies.push(ruby)
            this.pixi.stage.addChild(ruby)
        }
        
        this.pixi.ticker.add((delta: number) => this.update(delta))
    }

    //collision: If the ruby hits the ghost, the player dies.
    collision(rubies:Ruby, ghost: Ghost) {
        const bounds1 = rubies.getBounds()
        const bounds2 = ghost.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }

    //updates the classes
    update(delta: number){
        for(const diamond of this.diamonds){
            diamond.update(delta)
        }

        for(const ruby of this.rubies){
            ruby.update(delta)
        }

        for(const ghost of this.ghost){
            ghost.update()
        }

        //Collision with rubies and ghost but doesnt work. 
        //

        // if(this.collision(this.diamond, this.ghost)){
        //     console.log("player touches enemy 💀")
        // }
    }
}
new Game()
