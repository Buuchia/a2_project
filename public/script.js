document.body.style.margin   = 0
document.body.style.overflow = `hidden`
document.body.style.backgroundColor = 'pink'

//create a canvas element
const cnv = document.getElementById (`cnv_element`)
cnv.width = window.innerWidth
cnv.height = window.innerHeight

//get canvas context
const ctx = cnv.getContext (`2d`)

//create and draw individual symbol objects
//that make up the rain effect
class Symbol {
    constructor() {

    }
    draw() {

    }
}

//Main wrapper for entire rain effect
class Effect {
    constructor(canvasWidth, canvasHeight) {

    }
    #init(){

    }
}

//define a custom function to draw the rain effect
//60 times per second

function animate(){

}

// const draw_frame = () => {
//    ctx.fillStyle = `turquoise`
//    ctx.fillRect (0, 0, innerWidth, innerHeight)

//    requestAnimationFrame (draw_frame)
// }

// draw_frame ()

// window.onresize = () => {
//    cnv.width = innerWidth
//    cnv.height = innerHeight   
// }