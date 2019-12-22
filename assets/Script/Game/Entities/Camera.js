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
    },

    detectBounds(){
        if(this.hero.position.y >= this.node.position.y + 240){
            this.node.setPosition(cc.p(this.node.x,this.hero.y - 240));
        } else if (this.hero.y <= this.node.y - 310){
            this.fall = true;
            if(this.preY - this.node.y >= this.maxFallDistance && this.rope.getComponent('Rope').isFixed()==false){
                this.gameOver = true;
            } else {
                this.node.setPosition(cc.p(this.node.x,this.hero.y + 310));
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
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().attachDebugDrawToCamera(this.node.getComponent(cc.Camera));
        cc.director.getCollisionManager().attachDebugDrawToCamera(this.node.getComponent(cc.Camera));
        this.preY = this.node.y;
        this.up = false;
        this.gameOver = false;
        this.maxFallDistance = this.rope.getComponent('Rope').maxHeight * this.rope.scaleY + this.hero.height/2;
    },

    start () {

    },

    update: function (dt) {
        this.detectBounds();
        if(!this.fall){
            this.preY = this.node.y;
        }
    },
});
