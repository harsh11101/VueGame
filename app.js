function randomPoint(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}
const app=Vue.createApp({
    data(){
        return{
            playerHealth:100,
            monsterHealth:100,
            winner:null,
            roundCount:0,
            battleLog:[]
        }
    },
    watch:{
        monsterHealth(value){
            if(value<=0 && this.playerHealth<=0){
                this.winner='draw';
            }
            else if(value<=0){
                this.winner='player';
            }
        },
        playerHealth(value){
            if(value<=0 && this.monsterHealth<=0){
                this.winner='draw';
            }
            else if(value<=0){
                this.winner='monster';
            }
        }
    },
    computed:{
        monsterHealthBar(){
            if(this.monsterHealth<0){
                return {'width' : '0%'};
            }
            else{
                return {'width': this.monsterHealth+'%'};
            }
        },
        playerHealthBar(){
            if(this.playerHealth<0){
                return {'width' : '0%'};
            }
            else{
                return {'width': this.playerHealth+'%'};
            }
        }
    },
    methods:{
        playerAttack(){
            if(this.roundCount % 3!==0){
                this.roundCount++;
            }
            const playerAttack=randomPoint(5,10);
            this.monsterHealth-=playerAttack;
            this.addLogMessages('Player','attack',playerAttack);
            this.monsterAttack();
        },
        monsterAttack(){
            const monsterAttack=randomPoint(10,20);
            this.playerHealth-=monsterAttack;
            this.addLogMessages('Monster','attack',monsterAttack);
        },
        specialAttack(){
            this.roundCount++;
            const playerAttack=randomPoint(20,30);
            this.monsterHealth-=playerAttack;
            this.addLogMessages('Player','special-attack',playerAttack);
            this.monsterAttack();
        },
        heal(){
            if(this.roundCount % 3!==0){
                this.roundCount++;
            }
            const healPoints=randomPoint(25,35);
            if(this.playerHealth+healPoints>=100){
                this.playerHealth=100;
            }
            else{
                this.playerHealth+=healPoints;
            }
            this.addLogMessages('Player','heal',healPoints);
            this.monsterAttack();
        },
        newGame(){
            this.playerHealth=100;
            this.monsterHealth=100;
            this.winner=null;
            this.roundCount=0;
            this.battleLog=[];
            this.battleLog=[];
        },
        surrender(){
            this.winner='monster';
        },
        addLogMessages(who,what,value){
            this.battleLog.unshift(
                {
                    actionBy:who,
                    action:what,
                    actionValue:value
                });
        }
    }
});
app.mount("#game");