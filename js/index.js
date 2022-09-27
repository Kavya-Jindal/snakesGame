const canvas=document.querySelector('canvas')  //selecting the element
const ctx=canvas.getContext('2d')  //kis trah ka structure bnaana hai(2d/3d)
ctx.fillStyle='blueviolet'
// ctx.fillRect(40,30,50,40) //first 2 coordinates decide the posiion and next 2 decide length and breadth
let square=40  //length breadth
var snakeCell=[[0,0]] //coordinates for position
let boxHeight=500 //background box height,width
let boxWidth=1200
let direction='right'
let gameOver=false
let foodG=generateRandomCell()
let score=0
document.addEventListener('keydown',function(e){  //koi si bhi key press krne pe
   
    if(e.key === 'ArrowRight'){
        direction='right'
    }
    else if(e.key==='ArrowLeft'){
        direction='left'
    }
    else if(e.key==='ArrowUp'){
        direction='up'
    }
    else{
        direction='down'
    }
})
function update(){
    // ctx.clearRect(0,0,boxWidth,boxHeight) //pehle width fir height
    headX=snakeCell[snakeCell.length-1][0]         //decides last coordinate of x axis
    headY=snakeCell[snakeCell.length-1][1]         //decides last coordinate of y axis
    if(direction==='right'){
         newX=headX+square //new coordinates along x axis
         newY=headY
        if(newX===boxWidth){
            gameOver=true
        }
    }
    else if(direction==='down'){
        newX=headX 
        newY=headY+square
        if(newY===boxHeight){
            gameOver=true
        }
    }
    else if(direction === 'left'){
        newX=headX-square
        newY=headY
        if(newX<0){
            gameOver=true
        }
    }
    else{
        newX=headX
        newY=headY+square
        if(newY<0){
            gameOver=true
        }
    }
    snakeCell.push([newX,newY])
    if(newX===foodG[0] && newY===foodG[1]){
        foodG=generateRandomCell()
        score+=1
    }
    
   else{ snakeCell.shift()}
} //changes in the square will be in this function
function generateRandomCell(){
    return[Math.round(Math.random()*(boxWidth-square)/square)*square,Math.round(Math.random()*(boxHeight-square)/square)*square]
}


function draw(){
    if(gameOver===true){
        clearInterval='id'
        ctx.font='80px sans-sarif'
        ctx.fillText('Game Over',100,200)
        return;
       
    }
   ctx.clearRect(0,0,boxWidth,boxHeight)
    for(let cell of snakeCell){
        ctx.fillRect(cell[0],cell[1],square,square)
        ctx.fillStyle="blueviolet"
}
ctx.fillRect(foodG[0],foodG[1],square,square)
ctx.fillStyle="blueviolet"
ctx.font='30px sans-sarif'
ctx.fillText(`Score:${score}`,30,30)
} //to draw the snake/cell
const id=setInterval(function(){
    update()
    draw()
},100)  // calls both upper functions after every 300 milliseconds for infinite time

