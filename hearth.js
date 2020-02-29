const rivalHero=document.getElementById('rival-hero'),
myHero=document.getElementById('my-hero'),
rivalDeck=document.getElementById('rival-deck'),
myDeck=document.getElementById('my-deck');

let rivalDeckData=[],
myDeckData=[];

let myHeroData, rivalHeroData;

function Card(isHero){//constructor of Card object

    if(isHero===true){

        this.att=Math.ceil(Math.random()*2);
        this.hp=Math.ceil(Math.random()*5)+25;
        this.isHero=true;
    }
    else{
      this.att=Math.ceil(Math.random()*5);
    this.hp=Math.ceil(Math.random()*5);
    this.cost=Math.floor((this.att+this.hp)/2);  
    this.isHero=false;
    }

    
}



function createEnemyDeck(number){

    for(let i=0;i<number;i++){
        rivalDeckData.push(fatoryCard(false));
       
    }

    rivalDeckData.forEach(function(data){

       const card=makeCardForAppending(data,false);

        rivalDeck.appendChild(card);
    });
}
function createMyDeck(number){
        for(let i=0;i<number;i++){
             myDeckData.push(fatoryCard(false));
       
        }

        myDeckData.forEach(function(data){

      
            const card=makeCardForAppending(data,false);
    
            myDeck.appendChild(card);
        });
       

}

function createEnemyHero(){

    rivalHeroData=fatoryCard(true);
    
    const card=makeCardForAppending(rivalHeroData,true);

    rivalHero.appendChild(card);
}

function createMyHero(){

    myHeroData=fatoryCard(true);

    const card=makeCardForAppending(myHeroData,true);

    myHero.appendChild(card);

}

function makeCardForAppending(data,isHero){
    const card=document.querySelector('.card-hidden .card').cloneNode(true);
    card.querySelector('.card-cost').textContent=data.cost;
    card.querySelector('.card-att').textContent=data.att;
    card.querySelector('.card-hp').textContent=data.hp;
    if(isHero===true){
    
     card.querySelector('.card-cost').style.display='none';
     const name=document.createElement('div');
     name.textContent='HERO';
     card.appendChild(name);
    }
   
            

 return card;
}


function fatoryCard(isHero){

    return new Card(isHero);
}

function init(){

    createEnemyDeck(5);
    createMyDeck(5);
    createEnemyHero();
    createMyHero();

}

init();