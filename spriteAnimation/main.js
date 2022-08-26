window.onload=()=>{
    const canvas=document.getElementById("canvas1");
    const ctx=canvas.getContext("2d");
    const CANVAS_WIDTH=canvas.width=600;
    const CANVAS_HEIGHT=canvas.height=600;
    
    const playerImage = new Image();
    playerImage.src="shadow_dog.png";
    const spriteWidth=575;
    const spriteHeight=523;
    let gameFrame=0;
    const staggerFrame=5;
    const spriteAnimation=[];
    let player="run"
    const animationStates=[
        {
            name: 'idle',
            frames:7
        },
        {
            name: 'jump',
            frames: 7
        },
        {
            name:"fall",
            frames:6
        },
        {
            name:"run",
            frames:9
        },
        {
            name:"dizzy",
            frames:"11"
        },
        {
            name:"sit",
            frames:5
        },
        {
            name:"roll",
            frames:7
        },
        {
            name:"bite",
            frames:7
        },
        {
          name:"ko" , 
          frames:12
        },
        {
            name:"getHit",
            frames:4
        }


    ];

    animationStates.forEach((state,index) => {
        let frames={
            loc:[],
        }

        for (let j = 0; j < state.frames; j++) {
           let positionX=j*spriteWidth;
           let positionY=index*spriteHeight
           frames.loc.push({x:positionX,y:positionY})
            
        }
        spriteAnimation[state.name]=frames;
    });
    console.log(spriteAnimation)
    function animate(){
        ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
        let position= Math.floor(gameFrame/staggerFrame)%spriteAnimation[player].loc.length;
        let frameX=spriteWidth*position;
        let frameY=spriteAnimation[player].loc[position].y;
        // ctx.fillRect(50,50,100,100); 
        // ctx.drawImg(image,sx,sy,sw,sh,dx,dy,dw,dh);  s- cropped out area of image ,d-where to put the s in canvas
        ctx.drawImage(playerImage,frameX,frameY,spriteWidth,spriteHeight,0,0,spriteWidth,spriteHeight);
        // if (gameFrame % staggerFrame == 0) {
        //      if (frameX<6) frameX++;
        // else frameX=0;
        // }

        gameFrame++;
        requestAnimationFrame(animate);

    }
    animate();
    
}