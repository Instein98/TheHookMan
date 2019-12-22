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
       speed: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(cc.randomMinus1To1()>0){
            this.node.getChildByName('plat').scaleX = -1;
            this.right = true;
        } else {
            this.right = false;
        }
        this.anim = this.node.getChildByName('plat').getComponent(cc.Animation);
        this.animState = this.anim.play('P_conveyer');
        this.animState.speed = this.speed;
    },

    start () {

    },

    // update (dt) {},
});
