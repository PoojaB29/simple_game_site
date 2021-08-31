//challange1
function ageInDays(){
    var birthYear=prompt("What year were you born ......My friend?");
    var ageInDayss=(2021 - birthYear) * 365;
    // console.log(ageInDayss);
    var h1=document.createElement('h1');
    var textAnswer=document.createTextNode('You are'+ageInDayss+'days old.');
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}
function reset(){
    
    document.getElementById('ageInDays').remove();
}
//challenge2
function generateCat(){
    var image=document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src="http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);

}
//challenge 3
function rpsGame(yourChoice) {
    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice=yourChoice.id;
    botChoice=numberToChoice(randToRpsInt());
    console.log(botChoice);
    results=decideWinner(humanChoice,botChoice);//[0,1] human lost| bot won
    console.log(results);
    message=finalMessage(results);//{'message':'You Won!','color':'green'}
    console.log(message);
    rpsFrontEnd(yourChoice.id,botChoice,message);
}
function randToRpsInt() {
    return (Math.floor(Math.random()*3));
}
function numberToChoice(number) {
    return['rock','paper','scissors'][number];
}
function decideWinner(yourChoice,botChoice) {
    var rpsDatabase={
        'rock':{'scissors':1,'rock':0.5,'paper':0},
        'paper':{'rock' : 1, 'paper':0.5,'scissors':0},
        'scissors':{'paper' : 1,'scissors': 0.5, 'rock':0}
    }
    var yourScore=rpsDatabase[yourChoice][botChoice];
    var botScore=rpsDatabase[botChoice][yourChoice];
    
    return [yourScore,botScore]
}
function finalMessage([yourScore,botScore]){
    if (yourScore === 0){
        return {'message':'You Lost','color':'red'};
    }else if(yourScore === 0.5){
        return {'message':'You Tied','color':'yellow'};

    }else{
        return {'message':'You Won','color':'green'};
    }
}
function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imagesDatabase = {
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src,

    }
    // lets remove all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] +"' height=150 width=150 style='box-shadow:0px 10px 50px blue'>";
    messageDiv.innerHTML = "<h1 style='color:"+ finalMessage['color'] + "; font-size: 60px; padding: 30px '>"+finalMessage['message']+"</h1>"
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] +"' height=150 width=150 style='box-shadow:0px 10px 50px red'>";

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);

}

// challenge 4
var all_button=document.getElementsByTagName('button');
console.log(all_button.length);
let copy_button=[];
for (let i=0;i<all_button.length;i++){
    copy_button.push(all_button[i].classList[1]);
}
console.log(copy_button);
function buttonColorChange(colorchange){
    if(colorchange.value==='red'){
        changered();
    }else if (colorchange.value==='green'){
        changegreen();
    }else if (colorchange.value==="reset"){
        colorreset();
    }else if (colorchange.value==='random'){
        colorrandom();
    }
}
function changered(){
for (let i=0;i<all_button.length;i++){
    all_button[i].classList.remove(all_button[i].classList[1]);
    all_button[i].classList.add('btn-danger');
}
    
}
function changegreen(){
    for (let i=0;i<all_button.length;i++){
        all_button[i].classList.remove(all_button[i].classList[1]);
        all_button[i].classList.add('btn-success');
    }
        
}
function colorreset(){
    for (let i=0;i<all_button.length;i++){
        all_button[i].classList.remove(all_button[i].classList[1]);
        all_button[i].classList.add(copy_button[i]);
    }
}
function colorrandom(){
    let choices=['btn-primary','btn-success','btn-warning','btn-danger'];
    for (let i=0;i<all_button.length;i++){
        let change=choices[Math.floor(Math.random()*4)];
        all_button[i].classList.remove(all_button[i].classList[1]);
        all_button[i].classList.add(change);
    }
}

//challenge 5
let blackjackGame ={
    'you': {'scoreSpan':'#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan':'#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2','3','4','5','6','7','8','9','10','J','K','Q','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand': false,
    'turnsOver': false,
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitsound =new Audio('sounds/swish.m4a');
const winsound =new Audio('sounds/cash.mp3');
const losssound =new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);


function blackjackHit(){
    // alert("Pree-iet");
    if (blackjackGame['isStand']===false){
        let card=randomCard();
        showCard(card,YOU);
        updatesScore(card,YOU);
        showscore(YOU);
        console.log(YOU['score']);
    }
}
function showCard(card,activePlayer){
    if(activePlayer['score']<=21){
        let cardImage = document.createElement('img');
        cardImage.src = `images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitsound.play();
    }
}

function blackjackDeal(){
    if (blackjackGame['turnsOver']===true){
        blackjackGame['isStand']=false;
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        for (i=0; i<yourImages.length; i++){
            yourImages[i].remove();
        }
        for (i=0; i<dealerImages.length; i++){
            dealerImages[i].remove();
        }
        YOU['score']=0;
        DEALER['score']=0;

        document.querySelector('#your-blackjack-result').textContent=0;
        document.querySelector('#your-blackjack-result').style.color='#ffffff';

        document.querySelector('#dealer-blackjack-result').textContent=0;
        document.querySelector('#dealer-blackjack-result').style.color='#ffffff';

        document.querySelector('#blackjack-result').textContent="Let's play!";
        document.querySelector('#blackjack-result').style.color="black";
        blackjackGame['turnsOver']=true;
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function updatesScore(card,activePlayer){
    if(card==='A'){
    //If adding 11 keeps me below 21 add 11 .Otherwise add 1
        if(activePlayer['score']+blackjackGame['cardsMap'][card][1] <=21){
            activePlayer['score'] +=blackjackGame['cardsMap'][card][1];
        }else{
            activePlayer['score'] +=blackjackGame['cardsMap'][card][0];
        }
    }else{
        activePlayer['score'] +=blackjackGame['cardsMap'][card];
    }
}
function showscore(activePlayer){
    if (activePlayer['score']>21){
    document.querySelector(activePlayer['scoreSpan']).textContent='BUST!';
    document.querySelector(activePlayer['scoreSpan']).style.color='red';
    }else{
        document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];

    }    
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerLogic(){
    blackjackGame['isStand']=true;
    while(DEALER['score'] < 16 && blackjackGame['isStand']===true){    
        let card=randomCard();
        showCard(card,DEALER);
        updatesScore(card,DEALER);
        showscore(DEALER);
        await sleep(1000);
    }
   
    blackjackGame['turnsOver']=true;
    let winner = computeWinner();
    showResult(winner);
}

//comppute winner and return who just won
function computeWinner(){
    let winner;

    if(YOU['score']<=21){
        //condition: higher score than dealer or when dealer bust 
        if (YOU['score'] > DEALER['score'] || (DEALER['score']>21)){
            blackjackGame['wins']++;
            winner = YOU;
        }else if(YOU['score'] < DEALER['score']){
            blackjackGame['losses']++;
            winner = DEALER;
        }else if(YOU['score'] === DEALER['score']){
            blackjackGame['draws']++; 
        }
        //condition : when you bust and dealer does'nt 
    }else if(YOU['score']>21 && DEALER['score']<=21){
        blackjackGame['losses']++;
        winner = DEALER;
    //condition : both bust
    }else if (YOU['score'] > 21 && DEALER['score'] > 21){
        blackjackGame['draws']++;
    }
    console.log('Winner is',winner);
    return winner;
}

function showResult(winner){
    let message,messagecolor;

    if (blackjackGame['turnsOver']===true){

        if (winner ===YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!';
            messageColor = 'green';
            winsound.play();
        }else if (winner === DEALER){
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You loss!';
            messageColor = 'red';
            losssound.play();
        }else{
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew!';
            messageColor = 'black';
        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}
