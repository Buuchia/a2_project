//The Matrix Rain code is heavily inspired by Franks laboratory

//setting up the style for the body of document
document.body.style.margin   = 0
document.body.style.overflow = `hidden`
document.body.style.backgroundColor = 'hsl(' + Math.random() * 360 + ', 100%, 30%)'

//creating a canvas element
const cnv = document.getElementById (`cnv_element`)

//
const div = document.getElementById (`ascii_div`)


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

//class Symbol creates and draws individual symbol objects
//that make up the rain effect
class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.chars = 'アァカサタナハマヤャラワガザダバパイィキシチニ☀☁❆WELCOMETOMYZANYWORLD❅❄ヒミリヰギジヂビピウゥクスツヌフムユュルLETSBEMORECHAOTICグズブヅプ♔♕♖♗♘♙エェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン'
        this.x = x
        this.y = y
        this.fontSize = fontSize;
        this.text = ''
        this.canvasHeight = canvasHeight
    }

    //define a function to randomize current character and draw it to the canvas at a specific location
    //every time the method is called, it will choose a random symbol
    draw(context) {

        //charAt() can be called on string data type,
        //which takes a single 'index' argument and returns a new string 
        //containing only that one character 
        //located at that specific offset of the string
        //in charAt bracket is a random rounded number between 0 - this.chars.length
        //so this.text will have a random character from the this.chars string
        this.text = this.chars.charAt(Math.floor (Math.random() * this.chars.length))

        //to reduce the number of calls, I move this down to function animate()
        // context.fillStyle = 'green'

        //make character sit next to and below each other
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize)

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
const fps = 30

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
        //monospace fonts have characters that occupy the same amount of horizontal space
        ctx.font = effect.fontSize + 'px monospace'

        //draw symbol to the canvas
        effect.symbols.forEach(symbol => symbol.draw(ctx))

        //restart timer to 0 so it can start countdown to the next frame again
        timer = 0

        getWebcamFeed()

        processVideo()

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

//Accessing webcam feed
//define a function to asynchronously request webcam access 
//and returns a video element if successful.
async function getWebcamFeed() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, facingMode: `user`, });
      const video = document.createElement('video');
      video.srcObject = stream;
      await video.play();
      return video;
    } catch (error) {
      console.error('Error accessing webcam:', error);
      return null; // Handle access denial or errors
    }
  }

//Processing the video
function processVideo(video, videoCanvas, ctx) {
    ctx.drawImage(video, 0, 0, videoCanvas.width, videoCanvas.height);
    //manipulate the video frame data using pixel manipulation techniques (covered later).
  }

  const imageData = ctx.getImageData(0, 0, videoCanvas.width, videoCanvas.height);

  for (let i = 0; i < imageData.data.length; i += 4) {
    const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
    imageData.data[i] = avg; // Red
    imageData.data[i + 1] = avg; // Green
    imageData.data[i + 2] = avg; // Blue
    imageData.data[i + 3] = 255; // Alpha (keep transparency)
  }

  ctx.putImageData(imageData, 0, 0);

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
