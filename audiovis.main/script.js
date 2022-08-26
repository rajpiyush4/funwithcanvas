function main() {
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class Bar {
        constructor(x, y, width, height, color) {
            this.x = x
            this.y = y
            this.width = width
            this.height = height
            this.color = color
        }
        update(micInput) {
            this.height=micInput * 500
        }
        draw(context) {
            context.fillStyle = this.color
            context.strokeStyle=this.color
            context.fillRect(this.x, this.y, this.width, this.height)
            // context.beginPath()
            // context.moveTo(this.x,0)
            // context.lineTo(this.x,this.height*100)
            // context.stroke()
            

        }
    }


    const microphone = new Microphone()
    let bars = []
    let barwidth=canvas.width/256

    function createBar() {
        for (let i = 0; i < 256; i++) {
            let color='hsl('+i*2+',100%,50%)'
            bars.push(new Bar(i * barwidth, canvas.height/2, 3, 20, color))
        }
    }
    createBar()
    // console.log(bars)
    var animeFrame;
    function animate() {
        if (microphone.initialized) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            const samples = microphone.getSamples()
            // console.log(samples)
            bars.forEach((bar,i) => {
                bar.draw(ctx)
                // console.log(samples[i])
                bar.update(samples[i]);
                // console.log(bar)
            })
            
        }
       animeFrame= requestAnimationFrame(animate)
    }
    animate();

    let state=true;
    onkeyup=function(e){
        let k=e.key;
        // alert(k)
        if(k=='p' ){
            if(state){
                cancelAnimationFrame(animeFrame);
                state=false;
            }
            else{
                requestAnimationFrame(animate);
                state=true;
            }
        }
    
    }
}