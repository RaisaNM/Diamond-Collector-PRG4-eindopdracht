import * as PIXI from 'pixi.js'
import ghostImage from "./images/ghost.png"
import diamondImage from "./images/diamond.png"
import rubyImage from "./images/ruby.png"
import demonImage from "./images/demon.png"

import {Ghost} from './ghost'
import {Diamond} from './diamond'
import {Ruby} from './ruby'
import {ScoreTally} from './score'

export class Game {
    //Making a pixi-canvas
    private _pixi: PIXI.Application
    public background: PIXI.Sprite

    private loader
    
    public score: boolean = false
    private counter: number = 0
    public scoreCounter: 0
    public scoreTally: ScoreTally

    public diamonds: Diamond[] = [];

    public rubies: Ruby[] = [];
    public ghost: Ghost
   

    public get pixi(): PIXI.Application {
        return this._pixi
      }

      constructor(pixi: PIXI.Application){
        console.log("game created")
        
        this._pixi = pixi

        //Object
        this.loader = new PIXI.Loader()
        this.loader
            .add('ghostTexture', ghostImage)
            .add('diamondTexture', diamondImage)
            .add('rubyTexture', rubyImage)
            .add('demonTexture', demonImage)


        this.loader.load(() => this.doneLoading())
    }

    //BEHAVOUR 

    //Done loading the canvas it loads the textures and classes.
   public doneLoading(){
        console.log("all textures loaded!")
        //add score
        new ScoreTally
        console.log(this.scoreTally)

        //add Ghost
        this.ghost = new Ghost(  this.loader.resources["ghostTexture"].texture!, this);
        this.pixi.stage.addChild(this.ghost);
        
        //add diamonds
        for(let i = 0; i<35; i++){
            let diamond = new Diamond(this.loader.resources['diamondTexture'].texture!, this)
            this.diamonds.push(diamond)
            this.pixi.stage.addChild(diamond)
        }

        //add rubies
        for(let i = 0; i<8; i++){
            let ruby = new Ruby(this.loader.resources['rubyTexture'].texture!, this)
           
            if (Math.random() < 0.3){
                ruby = new Ruby(this.loader.resources['rubyTexture'].texture!, this)
            }
            else if (Math.random() < 0.3){
                ruby = new Ruby(this.loader.resources['demonTexture'].texture!, this)
            }
            this.rubies.push(ruby)
            this.pixi.stage.addChild(ruby)
        }
        
        this.pixi.ticker.add((delta: number) => this.update(delta))
    }

    //collision: If the ruby hits the ghost, the player dies.
    private collision(diamonds: Diamond, ghost: Ghost) {
        const bounds1 = diamonds.getBounds()
        const bounds2 = ghost.getBounds()
        // this.score++
        // console.log(this.score)

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }
    
    private collision1(rubies: Ruby, ghost: Ghost) {
        const bounds1 = rubies.getBounds()
        const bounds2 = ghost.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;

    }

    //updates the classes
    public update(delta: number){
        this.ghost.update();
        //Game still works despite the errors
        for(const ruby of this.rubies){
            ruby.update(delta)
            if (this.collision1(this.ghost, ruby)) {
                this.pixi.stage.removeChild(ghost);
             
              }
        }

        //Ghost collects diamonds + scoreboard
        for(const diamond of this.diamonds){
            diamond.update(delta)
            if (this.collision(this.ghost, diamond)&& this.score == false) {
                this.pixi.stage.removeChild(diamond);
                //Check console log for counting the scores of collecting green diamonds.
                 console.log(this.score++)
                 //TO-DO: Showing scoreboard on in the game.
    
              }
        }

        //scoreboard: able to see scoreboard in console log.
        switch(this.score == true){
            case this.counter>100:
                this.counter = 0
                this.score = false
            break
            case this.score == true && this.counter <100:
                this.counter += delta
            break

        }
    }
}



