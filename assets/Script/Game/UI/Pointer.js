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
        joyStick: cc.Node,
        rope: cc.Node,
        hero: cc.Node,
    },

    setPosition(){
        let dir = this.joyStick.getComponent('JoyStick').dir;
        //console.log(this.joyStick.getComponent('JoyStick').dir);
        if(dir.mag() > 0){
            this.node.position = cc.pAdd(dir.normalize().mul(85),this.hero.position);
            this.rad = Math.atan2(dir.y, dir.x); 
            this.deg = cc.radiansToDegrees(this.rad); 
            this.node.rotation = 90 - this.deg;
            if(!this.rope.getComponent('Rope').isFixed())
                this.rope.getComponent('Rope').changeDir(this.deg,this.rad);
        }else{
            this.node.position = cc.pAdd(cc.p(0,85),this.hero.position);
            this.node.rotation = 0;
            if(!this.rope.getComponent('Rope').isFixed())
                this.rope.getComponent('Rope').changeDir(90,Math.PI/2);
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function () {
 
    },

    start () {

    },

    update (dt) {
        this.joyStick.getComponent('JoyStick').boundDetect();
        this.setPosition();
    },
});
