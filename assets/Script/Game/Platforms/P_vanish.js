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
       fadeDuration:0,
       disappearDuration:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onPreSolve: function (contact, selfCollider, otherCollider) {
        if(this.vanish)
            contact.disabled = true;
            console.log('vanish!');
    },

    onLoad:function () {
        this.time = 0;
        this.fade = 255 / (this.fadeDuration);
        this.vanish = false;
        this.node.opacity = 0;
        this.vanish = true;
    },

    start () {

    },

    update:function (dt) {
        this.time ++;
        let state = this.time % (this.fadeDuration*2+this.disappearDuration);
        if(state>this.fadeDuration*2){
            this.node.opacity = 0;
            this.vanish = true;
        } else if (state > this.fadeDuration){
            this.vanish = false;
            this.node.opacity = 255 - (state-this.fadeDuration)*this.fade;
        } else {
            this.vanish = false;
            this.node.opacity = state * this.fade;
        }
    },
});
