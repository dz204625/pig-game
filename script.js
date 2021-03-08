'use strict';

//select element
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const socre0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//init function 
const init = function(){
    //starting conditions
    scores =[0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    socre0EL.textContent = 0;
    score1EL.textContent = 0;
    current0EL.textContent = 0;
    current1EL.textContent = 0;

    diceEL.classList.add('hidden');
    player0EL.classList.remove('player--winner');
    player1EL.classList.remove('player--winner');
    player0EL.classList.add('player--active');
    player1EL.classList.remove('player--active');  
}

init();

//switch player function
const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0EL.classList.toggle('player--active');
    player1EL.classList.toggle('player--active');
}

//rolling dice functionality
btnRoll.addEventListener('click',  function() {

    if(playing === true){
        //random dice roll
        const dice = Math.trunc(Math.random()*6)+1;

        //display the dice 
        diceEL.classList.remove('hidden');
        diceEL.src = `dice-${dice}.png`;

        //check if roll 1 if true, switch player
        if(dice !=1){
            //add dice to current score 
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        
        }else{
            //switch player
            switchPlayer();

        }
    }
});

//hold btn functionality
btnHold.addEventListener('click', function(){
    if(playing){
         //add current score to active score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //check if player's score si >=100
        if(scores[activePlayer] >= 15){
            playing = false;
            diceEL.classList.add('hidden');
            //finish the game
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
                
        }else{
            //switch to the next player
            switchPlayer();
        }
    }
});

//reset btn
btnNew.addEventListener('click', init);










