
const rival={
    hero:document.getElementById('rival-hero'),
    deck:document.getElementById('rival-deck'),
    field:document.getElementById('rival-cards'),
    cost:document.getElementById('rival-cost'),
    deckData:[],
    heroData:[],
    fieldData:[]
},

my={
    hero:document.getElementById('my-hero'),
    deck:document.getElementById('my-deck'),
    field:document.getElementById('my-cards'),
    cost:document.getElementById('my-cost'),
    deckData:[],
    heroData:[],
    fieldData:[]
};

const turnBtn=document.getElementById('turn-btn');


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
        rival.deckData.push(fatoryCard(false,false));
       
    }

    rival.deck.innerHTML='';
    

    rival.deckData.forEach(function(data){

       makeCardForAppending(data,rival.deck,false);

        
    });
}
function createMyDeck(number){
        for(let i=0;i<number;i++){
             my.deckData.push(fatoryCard(false,true));
       
        }

        my.deck.innerHTML='';

        my.deckData.forEach(function(data){

      
            makeCardForAppending(data,my.deck,false);
    
            
        });
       

}

function createEnemyHero(){

    rival.heroData=fatoryCard(true,false);
    
    makeCardForAppending(rival.heroData,rival.hero,true);

   
}

function createMyHero(){

    my.heroData=fatoryCard(true,true);

    makeCardForAppending(my.heroData,my.hero,true);

    

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

    card.addEventListener('click',function(){

        if(turn){
            if(data.isMine===false||data.isOnField===true){
                return;
            }
            const currentCost=Number(my.cost.textContent);
            if(currentCost<data.cost){
                return;
            }
            const index=my.deckData.indexOf(data);
            my.deckData.splice(index,1);
            my.fieldData.push(data);


            my.deck.innerHTML='';
            my.field.innerHTML='';

           my.fieldData.forEach(function(data){

            makeCardForAppending(data,my.field,false);
           });

           my.deckData.forEach(function(data){

            makeCardForAppending(data,my.deck,false);
           });

           data.isOnField=true;
           my.cost.textContent=my.cost.textContent-data.cost;
           createMyDeck(1);
           
        }
        else{
            if(data.isMine===true||data.isOnField===true){
                return;
            }
            const currentCost=Number(rival.cost.textContent);
            if(currentCost<data.cost){
                return;
            }

            const index=rival.deckData.indexOf(data);
            rival.deckData.splice(index,1);
            rival.fieldData.push(data);

            rival.deck.innerHTML='';
            rival.field.innerHTML='';

            rival.fieldData.forEach(function(data){

                makeCardForAppending(data,rival.field,false);
            });

            rival.deckData.forEach(function(data){

              makeCardForAppending(data,rival.deck,false);  
            });
            
            data.isOnField=true;
    
            rival.cost.textContent=rival.cost.textContent-data.cost;
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

            my.cost.textContent=10;
        }
        else{

            rival.cost.textContent=10;
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