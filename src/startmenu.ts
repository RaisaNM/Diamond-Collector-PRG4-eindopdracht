import * as PIXI from "pixi.js"
import { Button } from "./button"
import {Game} from './game'

export class Startmenu {
    private pixi: PIXI.Application
    private button: Button

    constructor(){
        console.log("start menu")
        this.pixi = new PIXI.Application({ width: 800, height: 450 })
        document.body.appendChild(this.pixi.view)

        this.button = new Button(
            this.pixi.screen.width/7,
            this.pixi.screen.height/3,
        )
        this.pixi.stage.addChild(this.button)

        this.button.on("pointerdown", () => this.onClick())
    }

    private onClick(){
        this.button.destroy()
        new Game(this.pixi)

    }
}

new Startmenu()