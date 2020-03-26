//---------Constants------------------
let gameObject = {
  playerPat : [],
  simonPat : [],
  gameOver : false,
  gameStart: true,
  color : "",
  sounds : ["https://freesound.org/people/mad-monkey/sounds/66681/"],
  squares : ["red", "blue", "yellow", "green"], //<---------- this is just a list

}


//--------apps state variables------------
const clip1 = new Audio('https://www.pacdv.com/sounds/interface_sound_effects/sound62.wav');
const clip2 = new Audio('https://www.pacdv.com/sounds/interface_sound_effects/beep-3.wav');
const clip3 = new Audio('https://www.pacdv.com/sounds/interface_sound_effects/sound39.mp3')
const clip4 = new Audio('https://www.pacdv.com/sounds/interface_sound_effects/sound12.mp3')

// function playIt() {
//   clip1.play();
// };

//---------cached element references----------

// put lines 28 - 31 into an array, replace line 9
const redButton = document.getElementById("red");
const blueButton = document.getElementById("blue");
const greenButton = document.getElementById("green");
const yellowButton = document.getElementById("yellow");
const circleDiv = document.getElementById("circle");
const startButton = document.getElementById("start-id");
const levelText = document.getElementById("level-id");
const simonSays = document.getElementById("H1")

//------------Event listeners-------------

//Id or class is the index 
//start button to initialize game
//make event listner for each button. red blue green, get listner to console log each

startButton.addEventListener('click', startGame)
circleDiv.addEventListener('click', handleChoice)

redButton.onclick = () => {
    redButton.style.backgroundColor = "aliceblue";
    clip1.play();
  setTimeout(() => {
    redButton.style.backgroundColor = "#ff0077"
  }, 100)
}

blueButton.onclick = () => {
    blueButton.style.backgroundColor = "aliceblue";
    clip2.play();
  setTimeout(() => {
    blueButton.style.backgroundColor = "#1a0be2"
  }, 100)
}

greenButton.onclick = () => {
    greenButton.style.backgroundColor = "aliceblue";
    clip3.play();
  setTimeout(() => {
    greenButton.style.backgroundColor = "#52c411"
  }, 100)
}

yellowButton.onclick = () => {
    yellowButton.style.backgroundColor = "aliceblue";
    clip4.play();
  setTimeout(() => {
    yellowButton.style.backgroundColor = "#f8ec08"
  }, 100)
}
   

//-----------Functions------------

//play audio


function init(){
    gameObject.simonPat = []
    gameObject.gameOver = true
    startButton.style.visibility ="visible";
}


function render(){
      levelText.textContent = "Points: "+ gameObject.simonPat.length;
      setTimeout(() => {
        simonSays.textContent = "Simon Says"
      }, 1000);
  if (gameObject.gameOver === false) {
      startButton.style.visibility ="hidden";
      generatePattern()
  } else {
      // init()
  }
}


function startGame(){
      gameObject.gameOver = false
      gameObject.playerPat = []
  if (gameObject.gameOver === false) {
      render()
  }
}


function handleChoice (evnt) {
      gameObject.playerPat.push(evnt.target.id)
      console.log("pushed playerPat "+gameObject.playerPat)
      checkMoves()
    if (gameObject.playerPat.length === gameObject.simonPat.length) {
        simonSays.textContent = "GoodJob!";
        render();
        gameObject.playerPat = [];
    } 
}


function generatePattern (){
    num = Math.floor(Math.random() * 4);
    gameObject.simonPat.push(gameObject.squares[num])
    console.log("gen push simonPat "+gameObject.simonPat) 
    animation()
}


function checkMoves() {
  console.log("start check")
  for (let index = 0; index < gameObject.playerPat.length; index++) {
    if  (gameObject.playerPat[index] === gameObject.simonPat[index]){
      
      } else {
      simonSays.textContent = "OMG You Lost";
      init()
    }
  }
}

function animation () {
  console.log("AnimationPattern "+gameObject.simonPat)
  
  let  i = 0
  let moves = setInterval(() => {
      lightUp(gameObject.simonPat[i]);
      i++;
      if (i > gameObject.simonPat.length) {
        clearInterval(moves);
      }
  }, 600);    
}


function lightUp(compPat) {
  if (compPat == 'green') {
    greenButton.style.backgroundColor = "aliceblue";
    clip3.play();
    setTimeout(() => {
      greenButton.style.backgroundColor = "#52c411"
    }, 100)
  } else if (compPat == 'red') {
    redButton.style.backgroundColor = "aliceblue"
    clip1.play();
    setTimeout(() => {
      redButton.style.backgroundColor = "#ff0077"
    }, 100)
  } else if (compPat == 'yellow') {
      yellowButton.style.backgroundColor = "aliceblue";
    clip4.play();
    setTimeout(() => {
      yellowButton.style.backgroundColor = "#f8ec08"
    }, 100)
  } else if (compPat == 'blue') {
      blueButton.style.backgroundColor = "aliceblue";
    clip2.play();
    setTimeout(() => {
      blueButton.style.backgroundColor = "#1a0be2"
    }, 100)
  }
}


//-------------fade in function--------------
function faded(id, time) {
  id.style.opacity = 0;

  let last = +new Date();
  let tick = function() {
    id.style.opacity = +id.style.opacity + (new Date() - last) / time;
    last = +new Date();

    if (+id.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };

  tick();
}

let id = document.getElementById("circle");
faded(id, 2000); 





