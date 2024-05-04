// //setting up the style for the body of document
// document.body.style.margin   = 0
// document.body.style.overflow = `hidden`
// document.body.style.backgroundColor = 'blue'

// //creating a canvas element
// const cnv = document.getElementById (`cnv_below`)


// //getting a good size of canvas
// cnv.width = window.innerWidth
// cnv.height = window.innerHeight

// //getting canvas context
// const ctx = cnv.getContext (`2d`)

const stream = await navigator.mediaDevices.getUserMedia ({ 
    audio: false,
    video: true,
    facingMode: `user`,
 })

 const videoTracks = await stream.getVideoTracks ()
 console.log (`Using video device: ${ videoTracks[0].label }`)

 const video = document.createElement (`video`)
 video.srcObject = stream
 await video.play ()

 const cnv = document.createElement (`canvas`)
 cnv.width  = 64
 cnv.height = cnv.width * video.videoHeight / video.videoWidth

 const div = document.getElementById (`ascii_div`)
 div.style.fontFamily = `monospace`
 div.style.textAlign = `center`

 const ctx = cnv.getContext (`2d`)

 const chars = "¶Ñ@%&∆∑∫#Wß¥$£√?!†§ºªµ¢çø∂æåπ*™≤≥≈∞~,.…_¬“‘˚`˙"

 const draw_frame = async () => {

    ctx.save ()
    ctx.scale (-1, 1)
    ctx.drawImage (video, -cnv.width, 0, cnv.width, cnv.height)
    ctx.restore ()

    const pixels = await ctx.getImageData (0, 0, cnv.width, cnv.height).data

    let ascii_img = ``

    for (let y = 0; y < cnv.height; y += 2) {
       for (let x = 0; x < cnv.width; x++) {
          const i = (y * cnv.width + x) * 4
          const r = pixels[i]
          const g = pixels[i + 1]
          const b = pixels[i + 2]
          const br = (r * g * b / 16581376) ** 0.1
          const char_i = Math.floor (br * chars.length)
          ascii_img += chars[char_i]
       }
       ascii_img += `\n`
    }

    div.innerText = ascii_img

    requestAnimationFrame (draw_frame)
 }

 draw_frame ()