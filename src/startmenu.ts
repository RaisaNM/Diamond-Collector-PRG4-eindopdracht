import * as PIXI from "pixi.js"
import { Button } from "./button"
import {Game} from './game'

export class Startmenu {
    private pixi: PIXI.Application
    private button: Button
    public titleText;

    constructor(){
        console.log("start menu")
        this.pixi = new PIXI.Application({ width: 800, height: 450 })
        document.body.appendChild(this.pixi.view)

        this.titleText = new PIXI.Text("DIAMOND COLLECTOR",
        {
            fontFamily : 'Arial', 
            fontSize: 50, 
            fill : 0xFFFFFF, 
            align: "left",
        })

        this.pixi.stage.addChild(this.titleText)

        this.button = new Button(
            this.pixi.screen.width/2,
            this.pixi.screen.height/2,
        )
        this.pixi.stage.addChild(this.button)
     

        this.button.on("pointerdown", () => this.onClick())
    }

    private onClick(){
        this.button.destroy()
        this.titleText.destroy()
        new Game(this.pixi)

    }
}

new Startmenu()