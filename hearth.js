
const rival={
    hero:document.getElementById('rival-hero'),
    deck:document.getElementById('rival-deck'),
    field:document.getElementById('rival-cards'),
    cost:document.getElementById('rival-cost'),
    deckData:[],
    heroData:[],
    fieldData:[],
    select:null,
    selectData:null
},

my={
    hero:document.getElementById('my-hero'),
    deck:document.getElementById('my-deck'),
    field:document.getElementById('my-cards'),
    cost:document.getElementById('my-cost'),
    deckData:[],
    heroData:[],
    fieldData:[],
    select:null,
    selectData:null
};

const turnBtn=document.getElementById('turn-btn');


let turn=true;

function Card(isHero,isMine){//constructor of Card object

    if(isHero===true){

        this.att=Math.ceil(Math.random()*2);
        this.hp=Math.ceil(Math.random()*5)+25;
        this.isHero=true;
        this.isOnField=true;
    }
    else{
      this.att=Math.ceil(Math.random()*5);
    this.hp=Math.ceil(Math.random()*5);
    this.cost=Math.floor((this.att+this.hp)/2);  
    this.isHero=false;
     this.isOnField=false;
    }

   this.isMine=isMine;
  



    
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

        
           
         turnAction(card,data,turn);
        

    });
   
            dom.appendChild(card);

 
}

function turnAction(card, data, turn){
    const ally=turn?my:rival;
    const enemy=turn?rival:my;



    if(card.classList.contains('card-turnover')){
        return;
    }

    const enemyCard=turn?!data.isMine:data.isMine;



    if(enemyCard&&ally.select&&data.isOnField){
        data.hp=data.hp-ally.selectData.att;
        
       
        if(data.hp<=0){
            const index=enemy.fieldData.indexOf(data);
            if(index>-1){
                enemy.fieldData.splice(index,1);
            }
            else if(data.isHero){
                alert('VICTORY!');
                init();
            }
        } 
        
        
        
        const obj=turn?my:rival;

        obj.field.innerHTML='';
        obj.fieldData.forEach(function(data){
            makeCardForAppending(data,obj.field,false);
        });

        obj.deck.innerHTML='';
        obj.deckData.forEach(function(data){

            makeCardForAppending(data,obj.deck,false);
        });

        obj.hero.innerHTML='';
        makeCardForAppending(obj.heroData,obj.hero,true);

    ally.select.classList.remove('card-selected');
    ally.select.classList.add('card-turnover');
    ally.select=null;
    ally.selectData=null;

    return;
    }
    else if(enemyCard){
        return;
    }

    if(data.isOnField){
        document.querySelectorAll('.card').forEach(function(card){

            card.classList.remove('card-selected');
        });
        card.classList.add('card-selected');
        ally.select=card;
        ally.selectData=data;
    }
    else if(!data.isHero){
        deckToField(data,turn);
        turn?createDeck(1,true):createDeck(1,false);
    }


 

   


}

function fatoryCard(isHero,isMine){

    return new Card(isHero,isMine);
}

function init(){
    

    my.deck.innerHTML='';
    rival.deck.innerHTML='';
    my.hero.innerHTML='';
    rival.hero.innerHTML='';
    my.field.innerHTML='';
    rival.field.innerHTML='';
    my.deckData=[];
    my.fieldData=[];
    my.heroData=[];
    rival.deckData=[],
    rival.fieldData=[],
    rival.heroData=[];
    my.cost.textContent=10;
    rival.cost.textContent=10;

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