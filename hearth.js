const rivalHero=document.getElementById('rival-hero'),
myHero=document.getElementById('my-hero'),
rivalDeck=document.getElementById('rival-deck'),
myDeck=document.getElementById('my-deck'),
rivalField=document.getElementById('rival-cards'),
myField=document.getElementById('my-cards'),
rivalCost=document.getElementById('rival-cost'),
myCost=document.getElementById('my-cost'),
turnBtn=document.getElementById('turn-btn');

let rivalDeckData=[],
myDeckData=[];

let myHeroData, rivalHeroData;

let rivalFieldData=[],myFieldData=[];
let turn=true;

function Card(isHero,isMine){//constructor of Card object

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

   this.isMine=isMine;
   this.isOnField=false;



    
}



function createEnemyDeck(number){

    for(let i=0;i<number;i++){
        rivalDeckData.push(fatoryCard(false,false));
       
    }

    rivalDeck.innerHTML='';
    

    rivalDeckData.forEach(function(data){

       makeCardForAppending(data,rivalDeck,false);

        
    });
}
function createMyDeck(number){
        for(let i=0;i<number;i++){
             myDeckData.push(fatoryCard(false,true));
       
        }

        myDeck.innerHTML='';

        myDeckData.forEach(function(data){

      
            makeCardForAppending(data,myDeck,false);
    
            
        });
       

}

function createEnemyHero(){

    rivalHeroData=fatoryCard(true,false);
    
    makeCardForAppending(rivalHeroData,rivalHero,true);

   
}

function createMyHero(){

    myHeroData=fatoryCard(true,true);

    makeCardForAppending(myHeroData,myHero,true);

    

}

function makeCardForAppending(data,dom,isHero){
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

    card.addEventListener('click',function(card){

        if(turn){
            if(data.isMine===false||data.isOnField===true){
                return;
            }
            const currentCost=Number(myCost.textContent);
            if(currentCost<data.cost){
                return;
            }
            const index=myDeckData.indexOf(data);
            myDeckData.splice(index,1);
            myFieldData.push(data);


            myDeck.innerHTML='';
            myField.innerHTML='';

           myFieldData.forEach(function(data){

            makeCardForAppending(data,myField,false);
           });

           myDeckData.forEach(function(data){

            makeCardForAppending(data,myDeck,false);
           });

           data.isOnField=true;
           myCost.textContent=myCost.textContent-data.cost;
           createMyDeck(1);
           
        }
        else{
            if(data.isMine===true||data.isOnField===true){
                return;
            }
            const currentCost=Number(rivalCost.textContent);
            if(currentCost<data.cost){
                return;
            }

            const index=rivalDeckData.indexOf(data);
            rivalDeckData.splice(index,1);
            rivalFieldData.push(data);

            rivalDeck.innerHTML='';
            rivalField.innerHTML='';

            rivalFieldData.forEach(function(data){

                makeCardForAppending(data,rivalField,false);
            });

            rivalDeckData.forEach(function(data){

              makeCardForAppending(data,rivalDeck,false);  
            });
            
            data.isOnField=true;
    
            rivalCost.textContent=rivalCost.textContent-data.cost;
            createEnemyDeck(1);
        }

    });
   
            dom.appendChild(card);

 
}


function fatoryCard(isHero,isMine){

    return new Card(isHero,isMine);
}

function init(){

    turnBtn.addEventListener('click',function(){
        
        turn=!turn;

        if(turn){

            myCost.textContent=10;
        }
        else{

            rivalCost.textContent=10;
        }
        document.getElementById('rival').classList.toggle('turn');
        document.getElementById('my').classList.toggle('turn');


        
    });

    createEnemyDeck(5);
    createMyDeck(5);
    createEnemyHero();
    createMyHero();

}

init();