score = 0;
cross = true;
let isGameOver = false;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3')
setTimeout(() => {
    audio.play()
}, 1000);

const scoreCont = document.querySelector('.scoreCont');

document.onkeydown = function(e){
    console.log('key code: ', e.keyCode)

    if (isGameOver) return; 

    if(e.keyCode==38){
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(()=>{
            dino.classList.remove('animateDino')
        },700)
    }

    if(e.keyCode==39){
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left = dinoX + 120 + 'px'
    }

    if(e.keyCode==37){
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left = (dinoX - 120) + 'px'
    }
}

setInterval(()=>{
    dino = document.querySelector('.dino')
    gameOver = document.querySelector('.gameOver')
    obstacle = document.querySelector('.obstacle')

    dx = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));

    offsetX = Math.abs(dx-ox)
    offsetY = Math.abs(dy-oy)

    if(offsetX<113 && offsetY<52){
        
        gameOver.style.visibility = 'visible'
        obstacle.classList.remove('obstacleAni')
        audiogo.play()
        setTimeout(() => {
            audio.pause()
            audiogo.pause()
        }, 1000);
        isGameOver = true;
    }
    else if(cross && offsetX<145){
        score+=1
        updateScore(score)
        cross= false
        setTimeout(()=>{
            cross = true
        },1000)

        setTimeout(() => {
            // Get the current animation duration
            const aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            
            // Ensure the new duration doesn't become too small
            const newDur = Math.max(aniDur - 0.1, 1); // Minimum duration is 1 second
            
            // Apply the new animation duration
            obstacle.style.animationDuration = newDur + 's';
            
            console.log('New Obstacle Speed:', newDur); // Debug log
        }, 500);
        

        
    }

},10)

function updateScore(score){
    scoreCont.innerHTML = 'Your Score: ' + score
}