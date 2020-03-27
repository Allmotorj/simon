//---------Constants------------------
let gameObject = {
  playerPat : [],
  simonPat : [],
  gameOver : false,
  squares : ["red", "blue", "yellow", "green"] 
}
//--------apps state variables------------
const clip1 = new Audio('https://www.pacdv.com/sounds/interface_sound_effects/sound62.wav');
const clip2 = new Audio('https://www.pacdv.com/sounds/interface_sound_effects/beep-3.wav');
const clip3 = new Audio('https://www.pacdv.com/sounds/interface_sound_effects/sound39.mp3');
const clip4 = new Audio('https://www.pacdv.com/sounds/interface_sound_effects/sound12.mp3');

//---------cached element references----------
const redButton = document.getElementById("red");
const blueButton = document.getElementById("blue");
const greenButton = document.getElementById("green");
const yellowButton = document.getElementById("yellow");
const circleDiv = document.getElementById("circle");
const startButton = document.getElementById("start-id");
const levelText = document.getElementById("level-id");
const simonSays = document.getElementById("H1");

const buttons = [
  {element: redButton, colorCode: '#ff0077', audio: clip1, color: 'red'},
  {element: blueButton, colorCode: '#1a0be2', audio: clip2, color: 'blue'},
  {element: yellowButton, colorCode: '#f8ec08', audio: clip4, color: 'yellow'},
  {element: greenButton, colorCode: '#52c411', audio: clip3, color: 'green'}
]

//-----------Functions------------
buttons.forEach((el)=> {
  el.element.onclick = () => {
    el.element.style.backgroundColor = "aliceblue";
    el.audio.play();
    setTimeout(()=> {
      el.element.style.backgroundColor = el.colorCode;
    }, 100)
  }
})

function init(){
    gameObject.simonPat = [];
    gameObject.gameOver = true;
    startButton.style.visibility ="visible";
}

function render(){
      levelText.textContent = "Points: "+ gameObject.simonPat.length;
      setTimeout(() => {
        simonSays.textContent = "Simon Says";
      }, 1000);
  if (gameObject.gameOver === false) {
      startButton.style.visibility ="hidden";
      generatePattern()
  }
}

const startGame = () =>{
      gameObject.gameOver = false;
      gameObject.playerPat = [];
  if (gameObject.gameOver === false) {
      render();
  }
}

function handleChoice (evnt) {
      gameObject.playerPat.push(evnt.target.id)
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
    animation()
}

function checkMoves() {
  for (let index = 0; index < gameObject.playerPat.length; index++) {
    if  (gameObject.playerPat[index] !== gameObject.simonPat[index]){
        simonSays.textContent = "OMG You Lost";
        init()
    }
  }
}

function animation () {
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
  buttons.forEach((el) => {
    if (compPat === el.color) {
      el.element.style.backgroundColor = "aliceblue";
      el.audio.play();
      setTimeout(()=> {
        el.element.style.backgroundColor = el.colorCode;
      }, 100)
    }
  }) 
}

//------------Event listeners-------------
startButton.addEventListener('click', startGame)
circleDiv.addEventListener('click', handleChoice)


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
