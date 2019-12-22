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
        distance: 0,
    },

    move(){
        var dist = cc.pDistance(this.node.getPosition(),this.startPosition);
        if (this.dir == 1) {
            this.node.x += this.speed * Math.cos(this.rad);
            this.node.y += this.speed * Math.sin(this.rad);
        } else {
            this.node.x -= this.speed * Math.cos(this.rad);
            this.node.y -= this.speed * Math.sin(this.rad);
        }
        if(dist >= this.distance){
            this.dir *= -1;
            this.startPosition = this.node.getPosition();
        } 
        // else if(this.node.x>389 && this.node.x<-389){
        //     this.dir *= -1;
        //     this.startPosition = this.node.getPosition();
        // }
    },
    
    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        var p = Math.PI;
        if(this.node.x<=0){
            this.rad = p/2 * cc.randomMinus1To1();
        } else{
            this.rad =p - p/2 * cc.randomMinus1To1();
        }
        // this.rad = p * cc.random0To1();
        this.dir = 1;
        this.startPosition = this.node.getPosition();
    },

    start () {

    },

    update: function (dt) {
        this.move();
    },
});
