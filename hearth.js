
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

function createDeck(number,isMine){
    const obj=isMine?my:rival;

    for(let i=0;i<number;i++){
        obj.deckData.push(fatoryCard(false,isMine?true:false));
       
    }

    obj.deck.innerHTML='';
    

    obj.deckData.forEach(function(data){

       makeCardForAppending(data,obj.deck,false);

        
    });
}

function createHero(isMine){
    const obj=isMine?my:rival;

    obj.heroData=fatoryCard(true,isMine?true:false);
    
    makeCardForAppending(obj.heroData,obj.hero,true);


}




function deckToField(data,isMyTurn){

    const obj=isMyTurn?my:rival;

    const index=obj.deckData.indexOf(data);
          obj.deckData.splice(index,1);
          obj.fieldData.push(data);


            obj.deck.innerHTML='';
            obj.field.innerHTML='';

            obj.fieldData.forEach(function(data){

            makeCardForAppending(data,obj.field,false);
           });

           obj.deckData.forEach(function(data){

            makeCardForAppending(data,obj.deck,false);
           });

           data.isOnField=true;
           obj.cost.textContent=obj.cost.textContent-data.cost;
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
            if(data.field===true){

            }
            else{
              deckToField(data,true);
            }
           
           createDeck(1,true);
           
        }
        else{
            if(data.isMine===true||data.isOnField===true){
                return;
            }
            const currentCost=Number(rival.cost.textContent);
            if(currentCost<data.cost){
                return;
            }
            if(data.field===true){

            }
            else{
             deckToField(data,false);   
            }

            
            createDeck(1,false);
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

    createDeck(5,false);
    createDeck(5,true);
     createHero(false);
     createHero(true);

}

init();