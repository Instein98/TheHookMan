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
 
    },

    play01(){
        if(!this.animState1.isPlaying){
            this.anim.play('MenuBackground01');
        }
    },

    play02(){
        if(!this.animState2.isPlaying){
            this.anim.play('MenuBackground02');
        }
    },

    play03(){
        if(!this.animState3.isPlaying){
            this.anim.play('MenuBackground03');
        }
    },

    play04(){
        if(!this.animState4.isPlaying){
            this.anim.play('MenuBackground04');
        }
    },

    play06(){
        if(!this.animState6.isPlaying){
            this.anim.play('MenuBackground06');
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function () {
        this.anim = this.getComponent(cc.Animation);
        this.animState3 = this.anim.play('MenuBackground03');
        this.animState4 = this.anim.play('MenuBackground04');
        this.animState6 = this.anim.play('MenuBackground06');
        this.play03();
    },

    start () {

    },

    // update (dt) {},
});
