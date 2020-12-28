score = 0;
cross = true;

audio = new Audio('music.mp3');
audioGo = new Audio('gameover.mp3');

setTimeout(() => {
    audio.play();
}, 800);
document.onkeydown = function (e) {
    var kC = e.keyCode;
    //console.log("The Key Code is :- ", kC)
    if (kC == 38 || kC == 87 || kC == 32) {
        //console.log("The UP key is pressed.")
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 800);
    }
    if (kC == 39 || kC == 68) {
        console.log("The LEFT key is pressed.")
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        if (dinoX <= 1220) {
            dino.style.left = dinoX + 100 + "px";
        }
        console.log("dinoLx = ", dinoX);
    }
    if (kC == 37 || kC == 65) {
        console.log("The RIGHT key is pressed.")
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        if (dinoX > 20) {
            dino.style.left = dinoX - 100 + "px";
        }
        console.log("dinoRx = ", dinoX);
    }
    if (kC == 32) {
        window.location.reload();
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');


    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    //console.log(dx,dy);
    //console.log(ox,oy);

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    //console.log(offsetX, offsetY)

    if (offsetX < 185 && offsetY < 40) {
        gameOver.innerHTML = ('Game Over - Please reload to enjoy again.');
        obstacle.classList.remove('animateObstacle');
        audioGo.play();
        setTimeout(() => {
            audioGo.pause();
            audio.pause();
            for (let i = 0; i < 500; i++) {
                task(i);
            }
            function task(i) {
                setTimeout(() => {
                    dinoT = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
                    dino.style.top = dinoT + 2 + "px";
                }, 20 * i);
            }
        }, 1000);
    }
    else if (offsetX < 185 && cross == true) {
        score += 10;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
        }, 500);
    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = ("Your Score: " + score);
}