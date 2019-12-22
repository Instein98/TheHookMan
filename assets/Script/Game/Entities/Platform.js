

cc.Class({
    extends: cc.Component,

    properties: {
        rope:{
            default: null,
            type: cc.Node,
        }
    },

    // collisionDetect(){
    // var Rope = this.rope.getComponent('Rope');
    // // this.fixedX = this.node.height * this.node.scaleY * Math.cos(this.rad) + this.hero.position.x;
    // // this.fixedY = this.node.height * this.node.scaleY * Math.sin(this.rad) + this.hero.position.y;
    // let Rx = this.rope.height * this.rope.scaleY * Math.cos(Rope.rad) + this.rope.position.x;
    // let Ry = this.rope.height * this.rope.scaleY * Math.sin(Rope.rad) + this.rope.position.y;
    // if(Rx>this.Minx && Rx<this.Maxx && Ry>this.Miny && Ry<this.Maxy){
    //     Rope.setFixed();
    //     console.log('Detected!!');
    //     return true;
    // }
    // return false;
    // },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        // this.Maxx = this.node.x + this.node.width/2 * this.node.scaleX+320;
        // this.Minx = this.node.x - this.node.width/2 * this.node.scaleX+320;
        // this.Maxy = this.node.y + this.node.height/2 * this.node.scaleY+480;
        // this.Miny = this.node.y - this.node.height/2 * this.node.scaleY+480;
    },

    start () {

    },

    update: function (dt) {
        //this.collisionDetect();
    },
});
