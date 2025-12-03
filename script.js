
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let chance = document.querySelector("#turn");

let turnO ; //playerX playerO
let clickCount = 0; 

const winPattern=[
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [3,4,5],
  [6,7,8],
  [2,4,6]
]

const resetGame = () => {
  turnO;
  enableBoxs();
  clickCount = 0;
  firstChance();
  msgContainer.classList.add("hide");
}

const firstChance = () =>{
   let randomVar= Math.random() * 2;
   if(randomVar <= 1){
     turnO= true;
     chance.innerText = `Your Chance`;
   }
   else{
    turnO = false;
     chance.innerText = `Computer Chance`;
      setTimeout(()=>{
      if(!turnO){
      aiMove();
       box.disabled = true;
      turnO = true;
      clickCount++;
      chance.innerText = ` Your Chance`;
    }
    },1000)
  }
   }

firstChance();
//Adding Event Listener to all boxes using for each
 boxes.forEach((box) => {
  box.addEventListener("click",() =>{
    if(turnO){
      box.innerText = "O";
      turnO=false;
      clickCount++;
      chance.innerText = ` Computer Chance`;
    }
    box.disabled = true;
    checkWinner();
    checkDraw();

    setTimeout(()=>{
      if(!turnO){
      aiMove();
      turnO = true;
      clickCount++;
      chance.innerText = ` Your Chance`;
      checkWinner();
      checkDraw();
    }
    },1000)
  })
});


const aiMove = () =>{
  for(let box of boxes){
   if(box.innerText === ''){
      box.innerText = 'X';
       box.disabled = true;
      break;
   }
  }
}

const disableBoxs = () => {
  for(let box of boxes){
    box.disabled = true;
  }
}

const enableBoxs = () => {
  for(let box of boxes){
    box.disabled = false;
    box.innerText = "";
  }
}

const showWinner = (winner) =>{
  setTimeout(() =>{
    if(winner === 'O'){
  msg.innerText = `Congratulations, Winner is You`;
  msgContainer.classList.remove("hide");
  disableBoxs();
  }
  else{
     msg.innerText = `You Lose
              Better Luck Next Time`;
     msgContainer.classList.remove("hide");
     disableBoxs();
  }
  },1000);
  
}

const checkWinner = () =>{
  for (let pattern of winPattern){
   let pos1Val = boxes[pattern[0]].innerText.trim();
   let pos2Val = boxes[pattern[1]].innerText.trim();
   let pos3Val = boxes[pattern[2]].innerText.trim();
    if (pos1Val!="" && pos2Val!="" && pos3Val!="") {
      if(pos1Val===pos2Val  &&  pos2Val===pos3Val){
      showWinner(pos1Val);
      }
    }
  }
};

const checkDraw = () =>{
 if(clickCount === 9){
   msg.innerText = `Match Draw`;
  msgContainer.classList.remove("hide");
  disableBoxs();
 }
};

newBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
