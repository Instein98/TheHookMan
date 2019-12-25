

cc.Class({
    extends: cc.Component,

    properties: {
        jetPower: 0,
        rope: {
            default: null,
            type: cc.Node,
        }
    },

    // LIFE-CYCLE CALLBACKS:


    setListener: function(){
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
    },

    onKeyDown: function(event){
        switch(event.keyCode){
            case cc.KEY.t :
                this.jetU = true;
            break;
            case cc.KEY.a :
                this.jetL = true;
            break;
            case cc.KEY.d :
                this.jetR = true;
            break;
        }
    },

    onKeyUp: function(event){
        switch(event.keyCode){
            case cc.KEY.t :
                this.jetU = false;
            break;
            case cc.KEY.a :
                this.jetL = false;
            break;
            case cc.KEY.d :
                this.jetR = false;
            break;
        }
    },

    jetLaunch: function(dt){
        if(this.jetL == true && this.over == false){// && this.jetLOK == true
            this.node.getComponent(cc.RigidBody).applyForceToCenter(cc.p(-this.jetPower,0),true);
        }else if(this.jetR == true && this.over == false){// && this.jetROK == true
            this.node.getComponent(cc.RigidBody).applyForceToCenter(cc.p(this.jetPower,0),true);
        }
        else if(this.jetU == true){
            this.node.getComponent(cc.RigidBody).applyForceToCenter(cc.p(0,this.jetPower),true);
            //this.node.y += 500 * dt;
        }

        //this.node.getComponent(cc.RigidBody).applyForceToCenter(cc.p(0,this.node.getComponent(cc.RigidBody).getMass() * 320),true);
    },

    // onBeginContact: function (contact, selfCollider, otherCollider) {
    //     if(otherCollider.node.group == 'Grabable'){
    //         this.InAir = false;
    //     }
    // },

    onEndContact: function (contact, selfCollider, otherCollider) {
        // console.log('EndContact');
        if(otherCollider.node.group == 'Grabable'){
            this.InAir = true;
        }
        if(otherCollider.node.name == 'P_conveyer'){
            this.P_conMove = false;
        }
    },

    Anim(){
        if(this.InAir){
            if(this.Rigid.linearVelocity.dot(cc.p(0,-1))>0 && this.Rope.isFixed()==false){
                this.node.width = 55;
                this.node.height = 105;
                this.playAnim('H_fall')
            }else if(this.jetR){
                this.node.width = 75;
                this.node.height = 100;
                this.playAnim('H_inAir');
                this.anim.node.scaleX = 1;
            }else if(this.jetL){
                this.node.width = 75;
                this.node.height = 100;
                this.playAnim('H_inAir');
                this.anim.node.scaleX = -1;
            }else if(this.Rigid.linearVelocity.dot(cc.p(1,0))>20){
                this.node.width = 75;
                this.node.height = 100;
                this.playAnim('H_inAir');
                this.anim.node.scaleX = 1;
            }else{
                this.node.width = 75;
                this.node.height = 100;
                this.playAnim('H_inAir');
                this.anim.node.scaleX = -1;
            }

        }else{
            if(this.jetR){
                this.node.width = 71;
                this.node.height = 95;
                this.playAnim('H_run');
                this.anim.node.scaleX = 1;
            } else if (this.jetL) {
                this.node.width = 71;
                this.node.height = 95;
                this.playAnim('H_run');
                this.anim.node.scaleX = -1;
            } else {
                this.node.width = 43;
                this.node.height = 90;
                this.playAnim('H_idle')
            }
        }
    },

    project(a,b){ //返回 a 在 b 上的投影向量。
        return b.mul(a.dot(b) / b.dot(b));
    },

    playAnim: function(animName){
        if(!this.anim.getAnimationState(animName).isPlaying)
            this.anim.play(animName);
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        let worldManifold = contact.getWorldManifold();
        var vel1 = this.Rigid.getLinearVelocityFromWorldPoint( worldManifold.points[0] );
        var vel2 = otherCollider.body.getLinearVelocityFromWorldPoint( worldManifold.points[0] );
        var relativeVelocity = vel1.sub(vel2);
        // console.log('BeginContact');
        // console.log(relativeVelocity);
        if(otherCollider.node.group == 'Grabable'){
            this.InAir = false;
        }
        if(relativeVelocity.dot(cc.p(0,1))>2 && otherCollider.node.group == 'Grabable'){ //|| relativeVelocity.dot(cc.p(1,0))!=0 ){
            contact.disabled = true;
            this.InAir = true;
        } 
        if(this.rope.height == this.Rope.maxHeight){
            this.InAir = true;
        }
        if(otherCollider.node.name == 'P_conveyer'){
            this.conveyer = otherCollider.node;
            this.P_conMove = true;
        }  
        if(otherCollider.node.name == 'P_spring'&&this.InAir==false){
            otherCollider.node.getChildByName('plat').getComponent(cc.Animation).play();
            this.Rigid.linearVelocity = cc.p(0,1000);//为什么会同时有多个弹簧发生动画？？？ 因为回收的时候没有把状态复位。
        } 
    },

    conveyerMove(){
        if(this.P_conMove && this.InAir == false){
            console.log(this.P_conMove);
            let P_conveyer = this.conveyer.getComponent('P_conveyer');
            if(P_conveyer.right){
                this.node.x += P_conveyer.speed * 0.95;
            } else {
                this.node.x -= P_conveyer.speed * 0.95;
            }
        }
    },

    onLoad: function () {
        this.setListener();
        this.over = false;
        this.Rigid = this.node.getComponent(cc.RigidBody);
        this.Rigid.enabledContactListener = true;
        this.Rope = this.rope.getComponent('Rope');
        this.InAir = true; //根据游戏初始状态 修改！
        this.anim = this.getComponent(cc.Animation);
    },

    start () {

    },

    update:function (dt) {
        this.jetLaunch(dt);
        this.node.rotation = 0;
        this.Anim();
        this.conveyerMove();
    },
});
