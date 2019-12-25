// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        hero: cc.Node,
        rope: cc.Node,
        button: cc.Node,
    },

    detectBounds(){
        if(this.hero.position.y >= this.node.position.y + 240*this.yCorrectionFactor){
            this.node.setPosition(cc.p(this.node.x,this.hero.y - 240*this.yCorrectionFactor));
        } else if (this.hero.y <= this.node.y - this.yUnderBound){
            this.fall = true;
            if(this.preY - this.node.y >= this.maxFallDistance && this.rope.getComponent('Rope').isFixed()==false){
                // cc.log("this.preY - this.node.y:"+(this.preY - this.node.y));
                // cc.log("this.maxFallDistance:"+this.maxFallDistance);
                this.gameOver = true;
            } else {
                this.node.setPosition(cc.p(this.node.x,this.hero.y + this.yUnderBound));
            }
        } else {
            this.fall = false;
        }
        if(this.hero.position.x >= this.node.position.x + 160){
            this.node.setPosition(cc.p(this.hero.x-160,this.node.y));
        }else if(this.hero.position.x <= this.node.position.x - 160){
            this.node.setPosition(cc.p(this.hero.x+160,this.node.y));
        }
    },

    onLoad:function () {
        // this.windowSize = cc.director.getWinSizeInPixels();
        // this.yCorrectionFactor = this.windowSize.height/1146;
        // this.yUnderBound = this.windowSize.height/2 - (this.button.y + this.button.height*2);
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().attachDebugDrawToCamera(this.node.getComponent(cc.Camera));
        cc.director.getCollisionManager().attachDebugDrawToCamera(this.node.getComponent(cc.Camera));
        this.preY = this.node.y;
        this.up = false;
        this.gameOver = false;
        this.node.setPosition(this.node.x, this.node.y + 200);
        // this.maxFallDistance = this.rope.getComponent('Rope').maxHeight * this.rope.scaleY + this.hero.height/2;
        // cc.log("this.maxFallDistance before: " + this.maxFallDistance);
        // this.maxFallDistance /= this.yCorrectionFactor;
        // this.maxFallDistance = this.windowSize.height*2/5;
        // cc.log("this.maxFallDistance after: " + this.maxFallDistance);
        // this.xCorrectionFactor = 640/this.windowSize.width;
    },

    start () {

    },

    update: function (dt) {
        // this.detectBounds();
        // if(!this.fall){
        //     this.preY = this.node.y;
        // }
        this.node.setPosition(this.node.x, this.node.y + 200*dt);
    },
});
