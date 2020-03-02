const rivalHero=document.getElementById('rival-hero'),
myHero=document.getElementById('my-hero'),
rivalDeck=document.getElementById('rival-deck'),
myDeck=document.getElementById('my-deck'),
rivalField=document.getElementById('rival-cards'),
myField=document.getElementById('my-cards'),
rivalCost=document.getElementById('rival-cost'),
myCost=document.getElementById('my-cost');

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



    
}



function createEnemyDeck(number){

    for(let i=0;i<number;i++){
        rivalDeckData.push(fatoryCard(false,false));
       
    }

    rivalDeckData.forEach(function(data){

       makeCardForAppending(data,rivalDeck,false);

        
    });
}
function createMyDeck(number){
        for(let i=0;i<number;i++){
             myDeckData.push(fatoryCard(false,true));
       
        }

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
            if(data.isMine===false){
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

           myCost.textContent=myCost.textContent-data.cost;
           
           
        }
        else{
            if(data.isMine===true){
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
            
    
            rivalCost.textContent=rivalCost.textContent-data.cost;
        }

    });
   
            dom.appendChild(card);

 
}


function fatoryCard(isHero,isMine){

    return new Card(isHero,isMine);
}

function init(){

    createEnemyDeck(5);
    createMyDeck(5);
    createEnemyHero();
    createMyHero();

}

init();