const selectionButtons = document.querySelectorAll('.selection');
const finalCol = document.querySelector('[data-final-column]');
const userScoreSpan = document.querySelector('[data-your-score]');
const computerScoreSpan = document.querySelector('[data-computer-score]');
const SELECTIONS = [
    {
        name: "paper",
        emoji:'🤚',
        beats: "rock"
    },
    {
        name: "scissors",
        emoji:'✌️',
        beats: "paper"
    },
    {
        name: "rock",
        emoji:'✊',
        beats: "scissors"
    }
];


selectionButtons.forEach((selectionButton) => {
    
    selectionButton.addEventListener('click',e => {
       const selectionName = selectionButton.dataset.selection;
       const selection = SELECTIONS.find( selection => selectionName === selection.name);      
       makeSelection(selection);    
    })
})

function makeSelection(selection)
{
   const computerSelection = randomSelection();
   let a = isWinner(selection,computerSelection);
   addSelectionResults(selection,computerSelection,a); 
   updateScore(a);   
}
function addSelectionResults(selection,computerSelection,a) 
{
   const divUser = document.createElement('div');
   divUser.innerText = selection.emoji;
   divUser.classList.add("result-selection");
   const divComputer = document.createElement('div');
   divComputer.innerText = computerSelection.emoji;
   divComputer.classList.add("result-selection");
   if(a==1)
   {
       divUser.classList.add('winner');
   }
   else if(a==2)
   {
       divComputer.classList.add('winner');
   }
   finalCol.after(divUser);
   divUser.after(divComputer);
}

function updateScore(a)
{
    let userScore = userScoreSpan.innerText;
    let computerScore = computerScoreSpan.innerText;

    if(a==1)
    {
        userScore++;
    }
    else if(a==2)
    {
        computerScore++;
    }
    userScoreSpan.innerText = userScore;
    computerScoreSpan.innerText = computerScore;
}


function isWinner(selection , computerSelection){
    
    if(selection.beats === computerSelection.name)
      return 1;
    if(selection.name === computerSelection.beats)
      return 2;
    return 3;   // draw both take out same tool            
}
function randomSelection(){
    let randomIndex = Math.floor( Math.random() * SELECTIONS.length);
    return SELECTIONS[randomIndex];
}