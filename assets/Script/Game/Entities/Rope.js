
const State = cc.Enum({
    extendS: -1,
    extendF: -1,
    shrinkS: -1,
    shrinkF: -1,
    fixed: -1
});


cc.Class({
    extends: cc.Component,

    properties: {
        Speed: 0,
        maxHeight: 0,
        minLength: 0,
        detectStep: 0,
        hero:{
            default: null,
            type: cc.Node, 
        },
        platforms: {
            default:[],
            type: [cc.Node]
        },
        canvas: cc.Node,
    },

    setListener: function(){
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
    },

    onKeyDown: function(event){
        switch(event.keyCode){
            case cc.KEY.space :
                if(this.state == State.shrinkF){
                    this.state = State.extendS;
                }else if(this.state == State.extendF){
                    this.state = State.shrinkS;
                }else if(this.state == State.fixed){
                    this.state = State.shrinkS;
                    this.fixedX = null;
                    this.fixedY = null;
                    this.changeFixPoint = 0;
                }
            break;
        }
    },

    onKeyUp: function(event){

    },

    // onCollisionEnter: function (other, self) {
    //     if(other.node.group == 'Grabable'){
    //         this.state = State.fixed;
    //         this.ps = self.world.points
    //     }
    // }, 

    launch(){
        if(this.state == State.shrinkF){
            this.state = State.extendS;
        }else if(this.state == State.extendF){
            this.state = State.shrinkS;
        }else if(this.state == State.fixed){
            this.state = State.shrinkS;
            this.fixedX = null;
            this.fixedY = null;
            this.changeFixPoint = 0;
            this.connectedPlatform = null;
        }
    },

    setFixed(){
        this.state = State.fixed;
    },

    isFixed(){
        return this.state == State.fixed;
    },

    changeDir: function(deg,rad){
        if(this.state != State.shrinkS){
            this.node.rotation = 90 - deg;
            this.deg = deg;
            this.rad = rad;
        }
    },

    fixUpdate:function (){
        if(this.state == State.fixed){
            let rigid = this.hero.getComponent(cc.RigidBody);
            this.fixedPoint = cc.p(this.fixedX,this.fixedY); //世界坐标系
            this.dir = cc.pSub(this.fixedPoint,this.hero.position); //世界坐标系
            this.rad = Math.atan2(this.dir.y, this.dir.x); //
            this.deg = cc.radiansToDegrees(this.rad); 
            this.changeDir(this.deg,this.rad);

            let Hero = this.hero.getComponent('Hero');
            this.grativity = cc.p(0,-rigid.getMass() * 320);

            //绳子没被拉到极限时
            if(this.dir.mag() <= this.node.scaleY * this.maxHeight){  
                this.node.height = this.dir.mag()/ this.node.scaleY;

            //绳子被拉到极限时
            } else{    
                this.node.height = this.maxHeight;    
                //如果脚没落地       
                if(Hero.InAir){
                    this.removeRadialV(rigid,this.dir); //去除径向速度
                    if(Hero.jetL==true){
                        this.HoriPower = cc.p(-Hero.jetPower, 0);
                    }else if(Hero.jetR==true) {
                        this.HoriPower = cc.p(Hero.jetPower, 0);
                    }else {
                        this.HoriPower = cc.p(0,0);
                    }
                    let RopeForce = cc.pAdd(this.project(this.HoriPower,this.dir), this.project(this.grativity,this.dir)).neg();
                    if(RopeForce.dot(this.dir)<=0)
                        RopeForce = cc.p(0,0);

                    //console.log('径向速度： ' + rigid.linearVelocity.dot(this.dir)/this.dir.mag());
                    this.removeRadialV(rigid,this.dir);
                    //RopeForce = RopeForce.mul(1); //绳子力量修正
                    //console.log('径向力： '+ (RopeForce.mag()-this.project(this.grativity,this.dir).mag()));
                    //console.log('距离固定点：  '+ this.dir.mag());
                    rigid.applyForceToCenter(RopeForce,true);
                    this.removeRadialV(rigid,this.dir);
                    //console.log(this.dir.dot(this.rotate90(this.dir)));
                //如果脚落地了，不在空中
                }else {
                    let RopeForce = this.dir.mul(this.dir.mag() - this.maxHeight * this.node.scaleY);
                    if(RopeForce.dot(this.dir)<=0)
                        RopeForce = cc.p(0,0);
                    rigid.applyForceToCenter(RopeForce,true);
                };
                 


                

                // let Ndir = this.dir.normalize().mul(this.maxScale * this.node.height);
                // console.log(fixedPoint.x + '  ' + fixedPoint.y);
                // this.hero.setPosition(cc.pSub(fixedPoint,Ndir));


                // if(this.deg>-90 && this.deg<90){
                //     if(rigid.linearVelocity.x <= 0){
                //         this.hero.getComponent('Hero').jetLOK = false;
                //         rigid.linearVelocity = cc.p(0,this.hero.getComponent(cc.RigidBody).linearVelocity.y);
                //         //console.log('绳子被拉到极限时 linearVelocity.x < 0');
                //     }else if(rigid.linearVelocity.x > 0.02){
                //         //console.log(rigid.linearVelocity.x);
                //         this.hero.getComponent('Hero').jetLOK = true;
                //     }
                // }
                // 需要复制一次来模拟右边移动时绳子拉长的状态，并根据绳子角度来判断哪个方向速度置零
                // 关键不是说绳子拉紧后人不能左右加速，而是说人不能离开以固定点为中心的圆圈。

                //当绳子被拉紧时，径向速度归零，径向力平衡。（应该是在空中时才这样）
            }
            ;
        }
    },

    //Used in Update
    Extend: function(dt){
        if(this.state == State.extendS){
            if(this.node.height <= this.maxHeight){
                for (let i=0;i<this.detectStep;i++){ 
                    this.node.height += this.Speed/this.detectStep;
                    if((this.connectedPlatform = this.canvas.getComponent('Game').collisionDetect()) !== null)
                        return;
                    }
            }else{
                this.state = State.shrinkS;
            }
        }
    },

    //Used in Update
    Shrink: function(dt){
        if(this.state == State.shrinkS){
            if(this.node.height > this.minLength){
                if(this.node.height - this.Speed < this.minLength){
                    this.node.height = this.minLength;
                }else{
                        this.node.height -= this.Speed;
                }
            }else{
                this.state = State.shrinkF;
            }
        }
    },
    
    fix: function(){
        if(this.state == State.fixed && this.changeFixPoint == 0){
            this.fixedX = this.node.height * this.node.scaleY * Math.cos(this.rad) + this.hero.position.x;
            this.fixedY = this.node.height * this.node.scaleY * Math.sin(this.rad) + this.hero.position.y;
            this.changeFixPoint = 1;
        }
    },

    project(a,b){ //返回 a 在 b 上的投影向量。
        return b.mul(a.dot(b) / b.dot(b));
    },

    removeRadialV(rigid,dir){
        //rigid.linearVelocity = cc.pSub(rigid.linearVelocity,this.project(rigid.linearVelocity,this.dir));
        
        if(dir.mag()- this.maxHeight * this.node.scaleY >= 0.01){
            let Ndir = dir.normalize().mul(this.maxHeight * this.node.scaleY);
            this.hero.setPosition(cc.pSub(this.fixedPoint,Ndir));
            if(rigid.linearVelocity.dot(dir) < 0){
                rigid.applyLinearImpulse(this.project(rigid.linearVelocity,dir).neg().mul(rigid.getMass()*0.5), this.hero.position);
            }; 
        }
    },

    // //此方法只生成一个垂直向量，生成的向量大小、方向随机
    // rotate90(a){
    //     let y = -a.x/a.y;
    //     return cc.p(1,y);
    // },

    specialPlatformAlgorithm(){
        if(this.isFixed()){
            switch (this.connectedPlatform.name) {
                case 'P_move':
                    let P_move = this.connectedPlatform.getComponent('P_move');
                    if (P_move.dir == 1) {
                        this.fixedX += P_move.speed * Math.cos(P_move.rad);
                        this.fixedY += P_move.speed * Math.sin(P_move.rad);
                    } else {
                        this.fixedX -= P_move.speed * Math.cos(P_move.rad);
                        this.fixedY -= P_move.speed * Math.sin(P_move.rad);
                    }
                    break;
                case 'P_conveyer':
                    let P_conveyer = this.connectedPlatform.getComponent('P_conveyer');
                    if(P_conveyer.right){
                        this.fixedX += P_conveyer.speed * 0.95;
                    } else {
                        this.fixedX -= P_conveyer.speed * 0.95;
                    }
                    if(this.fixedX - this.connectedPlatform.x>this.connectedPlatform.width/2+320||this.fixedX - this.connectedPlatform.x<-this.connectedPlatform.width/2+320){
                        this.launch();
                    }
                    break;
                case 'P_rotation':

                    let P_rotation = this.connectedPlatform.getComponent('P_rotation');
                    // let Px = this.connectedPlatform.x+320;
                    // let Py = this.connectedPlatform.y+570;
                    let Px = this.connectedPlatform.x+this.xOffset;
                    let Py = this.connectedPlatform.y+this.yOffset;
                    let P = cc.p(Px,Py);
                    let tempVec = cc.pSub(cc.p(this.fixedX,this.fixedY),P);
                    tempVec.rotateSelf(-P_rotation.rad);
                    this.fixedX = cc.pAdd(tempVec,P).x;
                    this.fixedY = cc.pAdd(tempVec,P).y;
                    break;
                case 'P_vanish':
                    let P_vanish = this.connectedPlatform.getComponent('P_vanish');
                    if(P_vanish.vanish)
                        this.launch();
                    break;
                default:
                    break;
            }
        }
    },

    onLoad: function () {
        this.setListener();
        this.state = State.shrinkF;
        this.changeFixPoint = 0;
        this.connectedPlatform = null;
        this.windowSize = cc.director.getWinSizeInPixels();
        this.xOffset = 320/640 * this.windowSize.width;
        this.yOffset = 570/1146 * this.windowSize.height;
        // this.platforms = this.Platforms.children;


        // var manager = cc.director.getCollisionManager();
        // manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true; 
    },

    start () {

    },

    update: function (dt) {
        this.Extend();
        this.Shrink();
        this.fix();
        this.specialPlatformAlgorithm();
        this.fixUpdate();
        this.node.position = this.hero.position;
    },
});
