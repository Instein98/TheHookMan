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
        rope:{
            default: null,
            type: cc.Node
        },
        hero:{
            default: null,
            type: cc.Node
        },
        platforms: {
            default:[],
            type: [cc.Node]
        },
        canvas: cc.Node,
        camera: cc.Node
    },

    drawCircle: function (x,y,r) {
        let graphics = this.node.getComponent(cc.Graphics);
        //console.log(this.rope.getComponent('Rope').fixedX + 'Draw!!!!!' + this.rope.fixedY);
        graphics.circle(x,y,r);
        graphics.stroke();
    },

    drawRectangle(Mx,mx,My,my){
        let graphics = this.node.getComponent(cc.Graphics);
        graphics.moveTo(Mx,My);
        graphics.lineTo(Mx,my);
        graphics.lineTo(mx,my);
        graphics.lineTo(mx,My);
        graphics.lineTo(Mx,My);
        graphics.stroke();
    },

    drawRectangle2(x1,y1,x2,y2,x3,y3,x4,y4){
        let graphics = this.node.getComponent(cc.Graphics);
        // graphics.clear();
        graphics.moveTo(x1,y1);
        graphics.lineTo(x2,y2);
        graphics.lineTo(x3,y3);
        graphics.lineTo(x4,y4);
        graphics.lineTo(x1,y1);
        graphics.stroke();
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.node.getComponent(cc.Graphics).lineWidth = 1;
        // this.drawCircle(-210,53,20);
        // this.drawRectangle(-220,-200,20,50)
    },

    start () {

    },

    update: function (dt) {
        // this.drawCircle(this.rope.getComponent('Rope').fixedX,this.rope.getComponent('Rope').fixedY,5);
        // this.drawRectangle(this.platform.getComponent('Platform').Maxx,this.platform.getComponent('Platform').Maxy,this.platform.getComponent('Platform').Maxx,this.platform.getComponent('Platform').Miny,this.platform.getComponent('Platform').Minx,this.platform.getComponent('Platform').Miny,this.platform.getComponent('Platform').Minx,this.platform.getComponent('Platform').Maxy)
        // let graphics = this.node.getComponent(cc.Graphics);
        // graphics.rect(this.Game.back01.x-this.canvas.x,this.Game.back01.y-this.canvas.y,this.Game.bgBB.xMax - this.Game.bgBB.xMin,this.Game.bgBB.yMax - this.Game.bgBB.yMin);
    },
});
