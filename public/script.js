//The Matrix Rain code is heavily inspired by Franks laboratory

//setting up the style for the body of document
document.body.style.margin   = 0
document.body.style.overflow = `hidden`
document.body.style.backgroundColor = 'hsl(' + Math.random() * 360 + ', 100%, 30%)'
document.body.style.mixBlendMode = 'color-dodge'


//creating a canvas element
const cnv = document.getElementById (`cnv_element`)
cnv.style.zIndex = -1

//getting a good size of canvas
cnv.width = window.innerWidth
cnv.height = window.innerHeight

//getting canvas context
const ctx = cnv.getContext (`2d`)

//direction of the linear gradient
//createLinearGradient (startX, startY, endX, endY) syntax
let gradient = ctx.createLinearGradient(0, 0, cnv.width, cnv.height)

//addColorStop(offset, color), offset is the value between 0 - 1
gradient.addColorStop(0, 'red') //at 0%
gradient.addColorStop(0.2, 'cyan')
gradient.addColorStop(0.4, 'yellow')
gradient.addColorStop(0.6, 'magenta')
gradient.addColorStop(0.8, 'tomato')
gradient.addColorStop(1, 'green') //at 100%

// making an array of midi notes
const notes = [ 62, 66, 69, 73, 74, 73, 69, 66 ]

// declaring a mutable iterator
let i = 0

// declaring a mutable state value
let running = false

// declaring a mutable variable for 
// the period of time between notes
let period = 200

// declaring a mutable variable for
// the length of the note
let len = 0

//class Symbol creates and draws individual symbol objects
//that make up the rain effect
class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.chars = 'ポヴッンWELCOMETOMYZANYWORLDグズブヅプアァカサタナボ'
        this.x = x
        this.y = y
        this.fontSize = fontSize;
        this.text = ''
        this.canvasHeight = canvasHeight
    }

    //define a function to randomize current character and draw it to the canvas at a specific location
    //every time the method is called, it will choose a random symbol
    draw(ctx) {

        //charAt() can be called on string data type,
        //which takes a single 'index' argument and returns a new string 
        //containing only that one character 
        //located at that specific offset of the string
        //in charAt bracket is a random rounded number between 0 - this.chars.length
        //so this.text will have a random character from the this.chars string
        this.text = this.chars.charAt(Math.floor (Math.random() * this.chars.length))

        //to reduce the number of calls, I move this down to function animate()
        // ctx.fillStyle = 'green'

        //make character sit next to and below each other
        ctx.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize)

        //when character reaches bottom of canvas height
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.9) {

            //reset its vertical position back to the top
            this.y = 0

        } else {
            //otherwise, increase it by 1
            //the next symbol will be drawn below depending on font size 
            //with no overlapping
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
        this.columns = this.canvasWidth / this.fontSize
        this.symbols = [] //empty array to store symbol objects
        this.#init() //calling private method from inside constructor
        console.log (this.symbols)
    }

    //define an initialise function to fill the symbols array with symbol objects
    //using the Symbol class above
    //the number of symbols depends on the number of columns 
    //inside class Effect's constructor
    //making the init method private by starting with #
    //to ensure it is not affected by external interaction

    #init(){

        //for loop will run once for each column
        //each time it will fill that index in symbols array 
        //with an instance of Symbol class
        for (let i = 0; i < this.columns; i++){

            //the rain starts failling from top
            //so initial vertical coordinate y is set to 0
            this.symbols[i] = new Symbol (i, 0, this.fontSize, this.canvasHeight)
        }
    }

    //public resize method so the properties can be updated from outside
    resize(width, height) {
        this.canvasWidth = width
        this.canvasHeight = height
        this.columns = this.canvasWidth / this.fontSize
        this.symbols = []
        this.#init()
    }
}

//declaring effect variable
const effect = new Effect (cnv.width, cnv.height)

//assign 0 to lastTime variable
//this variable stores timestamp from the previous frame
let lastTime = 0

//assigning number of frames per second to variable fps
const fps = 120

//the amount of millisecond we wait until we trigger and draw the next frame
const nextFrame = 1000/fps

//this variable accumulates delta time
//when it reaches threshold defined in next frame
//it will animate next frame, reset itself to 0
//and start counting again
let timer = 0

//define a custom function to draw the rain effect
//60 times per second
const animate = timeStamp => {

    //delta time is the difference in milliseconds between 
    //the current animation frame and previous animation frame
    //this variable lets us know how many miliseconds it takes 
    //for our computer to serve next frame of animation
    const deltaTime = timeStamp - lastTime

    //assign new timeStamp to lastTime so it can be used for next loop
    lastTime = timeStamp

    //use time stamp and delta time to control framerate
    if (timer > nextFrame) {

        // ctx.rotate(Math.PI / 4)

        //making semi-transparent rectangles to make old symbols fade away
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
        // ctx.fillStyle = 'hsl(' + Math.random() * 360 + ', 100%, 30%)'
        
        //characters have different horizontal alignment
        //so align center to make all of them align evenly
        ctx.textAlign = 'center'
        
        //drawing a rectangle every frame
        ctx.fillRect(0, 0, cnv.width, cnv.height)

        //declaring fill style once for all the symbols in the array per frame
        //the gradient style applies to the canvas background, not the characters 
        //so characters take different colors depending on their position on canvas
        ctx.fillStyle = gradient //'green'

        //font property specifies the current text style
        //add wingdings fonts to have more interesting symbols
        ctx.font = effect.fontSize + 'px Wingdings'

        //draw symbol to the canvas
        effect.symbols.forEach(symbol => symbol.draw(ctx))

        //restart timer to 0 so it can start countdown to the next frame again
        timer = 0
        
        //call the function to draw Zany text
        drawText()

    } else {
        //otherwise increase timer by delta time
        //we don't animate anything and just wait until timer is high enough
        timer += deltaTime
    }

    //call the next animation frame
    //this function automatically passes a timestamp argument to the function it calls
    //so function animate() has access to the auto-generated timeStamp argument above
    //but we only have timestamp argument for second loop
    requestAnimationFrame(animate)
}

//first loop of animation is called here
//so there is no auto-generated timestamp
//so we need to pass it a value, such as 0
animate(0)

//define a function to draw the Zany text
const drawText = () => {

    ctx.rotate((45 * Math.PI) / 180) //rotate the canvas by 45 degrees
    // ctx.clearRect(0, 0, cnv.width / 2, cnv.height / 3) //test, if enable, delete half width of rect

    ctx.font = 'bold 500px Roboto' //font name and size
    ctx.textBaseline = "middle"
    ctx.textAlign = "center"
    ctx.fillStyle = 'hsl(' + Math.random() * 360 + ', 100%, 50%)'
    ctx.fillText("ZANY", cnv.width /2 , cnv.height /2)
}

// get and suspend audio context
const audio_context = new AudioContext ()
audio_context.suspend ()

// // create string with context state
// const init_msg = `audio context is  ${ audio_context.state }`

// define an async click handler function 
async function init_audio () {

    // wait for audio context to resume
    await audio_context.resume ()
}

// pass anonymous function to the .onclick property
// of the div element
cnv.onclick = _ => {

    // if audio context is not running
    if (audio_context.state != 'running') {
        
        // call the async init audio function
        init_audio ()
    }
}

// define a function that plays a note
function play_note (note, length) {

    // if the audio context is not running, resume it
    if (audio_context.state != 'running') init_audio ()

    // create an oscillator
    const osc = audio_context.createOscillator ()

    // make it a square wave this time
    osc.type            = 'square'

    // set the value using the equation 
    // for midi note to Hz
    osc.frequency.value = 261.63 * 2 ** ((note - 40) / 20)

    // create an amp node
    const amp = audio_context.createGain ()

    // connect the oscillator 
    // to the amp
    // to the audio out
    osc.connect (amp).connect (audio_context.destination)

    // the .currentTime property of the audio context
    // contains a time value in seconds
    const now = audio_context.currentTime

    // make a gain envelope
    // start at 0
    amp.gain.setValueAtTime (0, now)

    // take 0.02 seconds to go to 0.4, linearly
    amp.gain.linearRampToValueAtTime (0.4, now + 0.02)

    // this method does not like going to all the way to 0
    // so take length seconds to go to 0.0001, exponentially
    amp.gain.exponentialRampToValueAtTime (0.0001, now + length)

    // start the oscillator now
    osc.start (now)

    // stop the oscillator 1 second from now
    osc.stop  (now + length)
}

// declaring a function that plays the next note
function next_note () {

    // use the iterator to select a note from 
    // the notes array and pass it to the 
    // play_note function along with the 
    // len variable to specify the length of the note
    play_note (notes[i], len)

    // iterate the iterator
    i++

    // if i gets too big
    // cycle back to 0
    i %= notes.length
}

// this is a recursive function
function note_player () {

    // play the next note
    next_note ()

    // if running is true
    // it uses setTimeout to call itself 
    // after period milliseconds
    if (running) setTimeout (note_player, period)
}

// this function handles the mouse event
// when the cursor enters the canvas
cnv.onpointerenter = e => {

    // set running to true
    running = true

    // initiate the recurseive note_player function
    note_player ()
}

// this function handles the mouse event
    // when the cursor moves over the canvas
    cnv.onpointermove = e => {

        // as the cursor goes from left to right
        // len gos from 0 to 5
        len = 5 * e.offsetX / cnv.width

        // as the cursor goes from bottom to top
        // period goes from 420 to 20 (milliseconds)
        period = 20 + ((e.offsetY / cnv.height) ** 2) * 400
    }

    // this function handles the mouse event
    // when the cursor leaves the canvas
    cnv.onpointerleave = e => {

        // set running to false
        running = false
    }


//define function to make the effects responsive to the canvas dimension
//when user resizes the window viewport
window.onresize = () => {
   cnv.width = window.innerWidth
   cnv.height = window.innerHeight   
   effect.resize(cnv.width, cnv.height)
   gradient = ctx.createLinearGradient(0, 0, cnv.width, cnv.height)
   gradient.addColorStop(0, 'red') //at 0%
   gradient.addColorStop(0.2, 'cyan')
   gradient.addColorStop(0.4, 'yellow')
   gradient.addColorStop(0.6, 'magenta')
   gradient.addColorStop(0.8, 'tomato')
   gradient.addColorStop(1, 'green') //at 100%
}

