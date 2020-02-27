const rivalHero=document.getElementById('rival-hero'),
myHero=document.getElementById('my-hero'),
rivalDeck=document.getElementById('rival-deck'),
myDeck=document.getElementById('my-deck');

let rivalDeckData=[],
myDeckData=[];

const myHeroData, rivalHeroData;

function Card(){//constructor of Card object
    this.att=Math.ceil(Math.random()*5);
    this.hp=Math.ceil(Math.random()*5);
    this.cost=Math.floor((this.att+this.hp)/2);
}



function createEnemyDeck(number){

    for(let i=0;i<number;i++){
        rivalDeckData.push(fatoryCard());
       
    }
}
function createMyDeck(){
        for(let i=0;i<number;i++){
             myDeckData.push(fatoryCard());
       
        }
}

function createEnemyHero(){

    rivalHeroData=fatoryCard();
}

function createMyHero(){

    myHeroData=fatoryCard();

}


function fatoryCard(){

    return new Card();
}

function init(){

    createEnemyDeck(5);
    createMyDeck(5);
    createEnemyHero();
    createMyHero();

}

init();