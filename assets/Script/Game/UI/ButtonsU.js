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
        rope:cc.Node,
    },

    setListener(){
        this.node.on('touchstart', this.onTouchStart, this);
        this.node.on('touchmove', this.onTouchStart, this);
        this.node.on('touchend', this.onTouchEnd, this);
        this.node.on('touchcancel', this.onTouchEnd, this);
    },

    onTouchStart(){
        this.node.getChildByName('Upper').color = this.pressed;
        if(this.action == true){
            this.Rope.launch();
            this.action = false;
        }            
    },

    onTouchEnd(){
        this.node.getChildByName('Upper').color = this.released;
        this.action = true;
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad:function () {
        this.Rope = this.rope.getComponent('Rope');
        this.action = true;
        this.pressed = new cc.Color(90,90,90);
        this.released = new cc.Color(255,255,255);
        this.setListener();
    },

    start () {

    },

    // update (dt) {},
});
