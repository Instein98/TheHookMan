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
        bottom: cc.Node,
        top: cc.Node,
    },

    setPosition(){
        this.realWidth = cc.director.getVisibleSize().width; //屏幕宽，
        this.realHeight = cc.director.getVisibleSize().height; //屏幕高
        this.node.x = -this.realWidth/2 + 128;
        this.node.y = -this.realHeight/2 + 128;
    },

    setListener(){
        this.node.on('touchstart', this.onTouchStart, this);
        this.node.on('touchmove', this.onTouchStart, this);
        this.node.on('touchend', this.onTouchEnd, this);
        this.node.on('touchcancel', this.onTouchEnd, this);
        
    },

    onTouchStart(event){
        this.top.x = event.getLocationX() - 128;
        this.top.y = event.getLocationY() - 128;
        this.boundDetect();
    },

    onTouchEnd(){
        this.top.position = cc.p(0,0);
        this.dir = cc.pSub(this.top.position,this.bottom.position);
    },

    boundDetect(){
        this.dir = cc.pSub(this.top.position,this.bottom.position);
        if(this.dir.mag() >= this.bottom.width/2){
            this.top.position = this.dir.normalize().mul(this.bottom.width/2);
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function () {
        this.setListener();
        this.setPosition();

    },

    start () {

    },

    update:function (dt) {

    },
});
