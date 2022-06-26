import * as PIXI from "pixi.js"
import {Game} from './game'

export class Button extends PIXI.Graphics{
    constructor(x: number, y:number){
        super()
       
        this.beginFill(0x00FF00)
        this.drawRoundedRect(0, 0, 400, 100, 15)
        this.endFill()

        this.x = x - this.getBounds().width / 2
        this.y = y - this.getBounds().height / 2

        const startText = new PIXI.Text("Start Diamond Collector",
        {
            "fontFamily": "Arial Black",
        })

        startText.x = this.getBounds().width / 2
        startText.y = this.getBounds().height / 2
        startText.anchor.set(0.5)

        this.addChild(startText)

        this.buttonMode = true
        this.interactive = true
    }

}