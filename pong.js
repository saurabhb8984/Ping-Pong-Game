    var speed; 
    var interval;
    var paddle;
    var ball;
    var playingArea;
    var formheight;
    var maxscore = 0;
    var dx, dy; 
    var ballX, ballY; 
    var playerY; 
    var strikes;
    var intervalId; 

    function initialize()
    {
       speed = 5;
       paddle = document.getElementById('paddle');
       ball = document.getElementById('ball');
       playingArea = document.getElementById('court');
       formheight = document.forms[0].offsetHeight - playingArea.offsetHeight;
       strikes = 0;
       document.getElementById('strikes').innerText = strikes;
       var miny = Math.ceil(-formheight);
       var maxy = Math.floor(playingArea.offsetHeight - formheight - ball.offsetHeight);
       ballX = 0;
       ballY =  Math.ceil(Math.random() * (maxy - miny)) + miny;
       playerY = (playingArea.offsetHeight / 2) - (paddle.offsetHeight / 2);
       dy = Math.random() * (1 - (-1)) + (-1);
       dx  = Math.random() * ((dy+1) - (dy)) + (dy);
       paddle.style.left = playingArea.offsetWidth - (40 + paddle.offsetWidth) + 'px';
       paddle.style.top = playerY + 'px';
       ball.style.left = ballX + 'px';
       ball.style.top = ballY + 'px';

    }


    function startGame()
    {
       playingArea.onmousemove = movePaddle;
       var speeds = document.getElementsByName("speed");
       var selectedSpeed;

       for(var i = 0; i < speeds.length; i++) {
          if(speeds[i].checked)
             selectedSpeed = speeds[i].value;
       }
        setSpeed(selectedSpeed);
        intervalId = setInterval('GameLoop()', interval);

    }

    
    function GameLoop()
    {
       ballX = ballX + speed * dx;
       ballY = ballY + speed * dy;

     
        if((ballX+ball.offsetWidth) > playingArea.offsetWidth)
       {
           if(maxscore < strikes){
               document.getElementById('score').innerText = strikes;
               maxscore = strikes;
           }
          clearInterval(intervalId);
          initialize();
          playingArea.onmousemove = '';

       }

        if(ballX < 0)
       {
          dx = -dx;
       }


       if(ballY + formheight + 5 < 0 || ((ballY + ball.offsetHeight) > playingArea.offsetHeight - formheight - 10))
          dy = -dy; // Make x direction opposite


       if((ballX + ball.offsetWidth) > paddle.offsetLeft - 6){
          if(((ballY + ball.offsetHeight ) > playerY - formheight ) && ballY < (playerY -formheight + paddle.offsetHeight)){
             dx = -dx;
              strikes = strikes +1;
              document.getElementById('strikes').innerText = strikes;
          }
       }

       ball.style.left = ballX + 'px';
       ball.style.top = ballY + 'px';

    }

    function movePaddle(e)
    {
       var y = e.clientY ;  
       if(y < (playingArea.offsetHeight - paddle.offsetHeight))
          paddle.style.top = y + 'px';
        
       playerY = y;
       
    }

    function setSpeed(inputspeed){
        if(inputspeed == 0){
            interval = 20;
        }else if(inputspeed == 1){
            interval = 7;     
        }else{
            interval = 1;
        }
    }

    function resetGame(){
        maxscore = 0;
        interval = 0;
        clearInterval(intervalId);
        initialize();
        document.getElementById('score').innerText = maxscore;

    }