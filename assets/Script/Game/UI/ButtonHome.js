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

    setListener(){
        this.node.on('touchstart', this.onTouchStart, this);
        this.node.on('touchmove', this.onTouchStart, this);
        this.node.on('touchend', this.onTouchEnd, this);
        this.node.on('touchcancel', this.onTouchEnd, this);
    },

    onTouchStart(){
        this.node.color = this.pressed;
    },

    onTouchEnd(){
        this.node.color = this.released;
        cc.director.loadScene("StartMenu-new");
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function () {
        this.pressed = cc.color(0,0,0);
        this.released = cc.color(163,163,163);
        this.node.color = this.released;
        this.setListener();
    },

    start () {

    },

    // update (dt) {},
});
