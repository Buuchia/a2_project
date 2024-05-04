//setting up the style for the body of document
document.body.style.margin   = 0
document.body.style.overflow = `hidden`
document.body.style.backgroundColor = 'black'

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

    //define a function to randomize current character and draw it to the canvas at a specific location
    //every time the method is called, it will choose a random symbol
    draw(context) {

        //charAt() can be called on string data type,
        //which takes a single 'index' argument and returns a new string 
        //containing only that one character located at that specific offset of the string
        //in charAt bracket is a random number between 0 and this,chars.length, no decimal
        //so this.text will have a random character from the this.chars string
        this.text = this.chars.charAt(Math.floor (Math.random() * this.chars.length))

        context.fillStyle = '#0aff0a'

        //make character sit next to and below each other
        context.fillText(this.text, this.x * this.fontSize, this.y * fontSize)

        if (this.y * this.fontSize > this.canvasHeight) {
            this.y = 0
        } else {
            this.y += 1
        }

    }
}

//Main wrapper for entire rain effect
class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.fontSize = 25
        this.columns = this.canvasWidth / this.fontsize
        this.symbols = [] //empty array to store symbol objects
        this.#init() //calling private method
        console.log (this.symbols)
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
        for (let i = 0; i < this.columns; i++){
            this.symbols[i] = new Symbol (i, 0, this.fontSize, this.canvasHeight)
        }

    }
}

//declaring effect variable
const effect = new Effect (cnv.width, cnv.height)

//define a custom function to draw the rain effect
//60 times per second
function animate(){
    ctx.font = effect.fontSize + 'px monospace'
    effect.symbols.forEach(symbol => symbol.draw(ctx))
    requestAnimationFrame(animate)
}

animate()

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