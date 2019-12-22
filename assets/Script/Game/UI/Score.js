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
        camera: cc.Node
    },

    setPosition(){
        this.realWidth = cc.director.getVisibleSize().width; //屏幕宽，
        this.realHeight = cc.director.getVisibleSize().height; //屏幕高
        this.node.x = -this.realWidth/2 + 50;
        this.node.y = this.realHeight/2 - 40;
    },

    updateScore(){
        if(this.camera.y - 480 > this.score){
            this.score = Math.floor(this.camera.y - 480);
        }
        this.getComponent(cc.Label).string = 'Score:'+this.score+'M';
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.setPosition();
        this.score = 0;
    },

    start () {

    },

    update:function (dt) {
        this.updateScore();
    },
});
