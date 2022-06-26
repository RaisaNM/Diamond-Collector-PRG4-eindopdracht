import * as PIXI from "pixi.js"
import {Game} from './game'

//CONCEPT

export class ScoreTally extends PIXI.Graphics{
    constructor(){
        super()

        const scoreText = new PIXI.Text("Score: 0")
        scoreText.style = new PIXI.TextStyle({
            fill: 0xFFFFFF
        })

        this.addChild(scoreText)
      
    
    }
}
