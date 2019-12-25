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
        rotationSpeed: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.windowSize = cc.director.getWinSizeInPixels();
        this.xOffset = 320/640 * this.windowSize.width;
        this.yOffset = 570/1146 * this.windowSize.height;
        this.time = 0;
        this.x = this.node.x + this.xOffset;
        this.y = this.node.y + this.yOffset;
        this.Maxx = this.x + this.node.width/2;
        this.Minx = this.x - this.node.width/2;
        this.Maxy = this.y + this.node.height/2;
        this.Miny = this.y - this.node.height/2;
        this.p = cc.p(this.x,this.y);
        this.p1 = cc.pSub(cc.p(this.Minx,this.Maxy),this.p);
        this.p2 = cc.pSub(cc.p(this.Maxx,this.Maxy),this.p);
        this.p3 = cc.pSub(cc.p(this.Minx,this.Miny),this.p);
        this.p4 = cc.pSub(cc.p(this.Maxx,this.Miny),this.p);
    },

    start () {

    },

    update:function (dt) {
        this.node.rotation = this.time % 360;
        this.time += this.rotationSpeed;
        this.rad = cc.degreesToRadians(this.rotationSpeed);
        this.p1.rotateSelf(-this.rad);
        this.p2.rotateSelf(-this.rad);
        this.p3.rotateSelf(-this.rad);
        this.p4.rotateSelf(-this.rad);
        this.p1p2 = cc.pSub(this.p1,this.p2);
        this.p3p1 = cc.pSub(this.p3,this.p1);
        this.p4p3 = cc.pSub(this.p4,this.p3);
        this.p2p4 = cc.pSub(this.p2,this.p4);
    },
});
