//setting up the style for the body of document
document.body.style.margin   = 0
document.body.style.overflow = `hidden`
document.body.style.backgroundColor = 'pink'

//creating a canvas element
const cnv = document.getElementById (`cnv_element`)

//getting a good size of canvas
cnv.width = window.innerWidth
cnv.height = window.innerHeight

//getting canvas context
const ctx = cnv.getContext (`2d`)

//class Symbol creates and draws individual symbol objects
//that make up the rain effect
class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.chars = 'アァカサタナハマヤャラワガザダバパイィキシチニ☀☁❆WELCOMETOMYZANYWORLD❅❄ヒミリヰギジヂビピウゥクスツヌフムユュルLETSBEMORECHAOTICグズブヅプ♔♕♖♗♘♙エェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン'
        this.x = x
        this.y = y
        this.fontSize = fontSize
        this.text = ''
        this.canvasHeight = canvasHeight

    }

    //define a function to randomize and draw current characters to the canvas at a specific location
    draw() {


    }
}

//Main wrapper for entire rain effect
class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.fontsize = 25
        this.columns = this.canvasWidth / this.fontsize
        this.symbols = [] //empty array to store symbol objects
    }

    //making the init method private by starting with #
    //to ensure it is not affected by external interaction
    //#init function fill the symbols array with symbol objects
    //using the Symbol class above
    //the number of symbols depends on the number of columns 
    //inside class Effect's constructor

    #init(){
        //for loop will run once for each column
        //each time it will fill that index in symbol array 
        //with an instance of Symbol class
        for (let i = 0; i < this.columns.length; i++){
            this.symbols[i] = new Symbol
        }

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