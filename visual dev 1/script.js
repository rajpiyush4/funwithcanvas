function main(){
    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d')
    canvas.width =window.innerWidth
    canvas.height = window.innerHeight
    let myVideo = null
    const size = 300
    
    camera()
  
    
    function draw(){
        if (myVideo!=null) {
            ctx.drawImage(myVideo,0,0)
            
        }
    }
    function animate(){
        draw()
        requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener('resize',()=>{
        canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    })


    async function camera(){
        const resolve =await navigator.mediaDevices.getUserMedia({video:true})
      
            myVideo = document.createElement('video')
            myVideo.srcObject=resolve
            myVideo.play()
      
    }
} 


