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
        normalHeight:0,
        rope: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update: function (dt) {
        var Rope = this.rope.getComponent('Rope');
        let Rx = this.rope.height * this.rope.scaleY * Math.cos(Rope.rad) + this.rope.position.x;
        let Ry = this.rope.height * this.rope.scaleY * Math.sin(Rope.rad) + this.rope.position.y;
        this.node.position = cc.p(Rx,Ry);
        this.node.rotation = 90 - Rope.deg;
        if(this.rope.height == 0){
            this.node.height = 0;
        } else {
            this.node.height = this.normalHeight;
        }
    },
});
