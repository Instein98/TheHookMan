cc.Class({
    extends: cc.Component,

    properties: {
        rope: {
            default: null,      
            type: cc.Node, 
        },
        hero: {
            default: null,      
            type: cc.Node, 
        },
        background: {
            default: null,
            type: cc.Prefab,
        },
        gameover: cc.Prefab,
        normal_platform: cc.Prefab,
        grass_platform:cc.Prefab,
        ice_platform:cc.Prefab,
        move_platform:cc.Prefab,
        vanish_platform:cc.Prefab,
        spring_platform:cc.Prefab,
        conveyer_platform:cc.Prefab,
        rotation_platform:cc.Prefab,
        bound: cc.Prefab,
        entity: cc.Node,
        camera: cc.Node,
        graphic: cc.Node,
        back_audio:cc.Node,
        over_audio:cc.Node,
        ground_platform:cc.Node,
        labels:cc.Node,
        buttons:cc.Node,
        joysticks:cc.Node,
    },


    overSky(){
        // console.log('camera顶部： ' + (this.camera.y + 480));
        // console.log('back01顶部: ' +(this.back01.y + this.node.y + (this.bgBB.yMax - this.bgBB.yMin)));
        if(this.backPool.size()>=1){
            this.difficulty += 1;
            this.back02 = this.backPool.get();
            if(this.difficulty>=4 && this.difficulty<=8){
                this.back02.getChildByName('background').color = new cc.color(209,224,169);
            } else if (this.difficulty>=9){
                this.back02.getChildByName('background').color = new cc.color(169,206,224);
            }
            this.node.addChild(this.back02,this.back01.zIndex - 1 );
            //console.log(this.backPool.size());
            this.back02.setPosition(this.back01.x, this.back01.y + (this.bgBB.yMax - this.bgBB.yMin));
            this.back02.getChildByName("BoundL").getComponent(cc.RigidBody).syncPosition(false);
            this.back02.getChildByName("BoundR").getComponent(cc.RigidBody).syncPosition(false);
            this.spawnPlatforms(this.back02.y + (this.bgBB.yMax - this.bgBB.yMin)/2,this.back01.width * this.back01.scaleX,this.back01.height * this.back01.scaleY,this.difficulty);
            //this.graphic.getComponent('Graphic').drawRectangle(this.back01.width * this.back01.scaleX/2,-this.back01.width * this.back01.scaleX/2,Maxy,Miny);
            // console.log('camera顶部： ' + (this.camera.y + 480 -this.node.y));
            // console.log('back02顶部: '+ (this.back02.y + this.back02.height * this.back02.scaleY/2));

        } 
        else if(this.backPool.size() == 0 && this.camera.y + 480 >= this.back02.y + this.node.y + (this.bgBB.yMax - this.bgBB.yMin)/5*4){
            this.backPool.put(this.back01);
            // console.log(this.backPool.size());
            this.back01 = this.back02; 
            this.back02 = null;
            for(let i = 0; i < this.pfArray01.length; i++){
                switch (this.pfArray01[i].name) {
                    case 'P_normal':
                        this.normal_platformPool.put(this.pfArray01[i]);
                        break;
                    case 'P_move':
                        this.move_platformPool.put(this.pfArray01[i]);
                        break;
                    case 'P_rotation':
                        this.rotation_platformPool.put(this.pfArray01[i]);
                        break;
                    case 'P_vanish':
                        this.vanish_platformPool.put(this.pfArray01[i]);
                        break;
                    case 'P_conveyer':
                        this.conveyer_platformPool.put(this.pfArray01[i]);
                        break;
                    case 'P_spring':
                        this.spring_platformPool.put(this.pfArray01[i]);
                        break;
                    case 'P_grass':
                        this.grass_platformPool.put(this.pfArray01[i]);
                        break;
                    case 'P_ice':
                        this.ice_platformPool.put(this.pfArray01[i]);
                        break;
                    default:
                        break;
                }
            }
            this.pfArray01 = this.pfArray02;
            this.pfArray02 = null;
            // console.log('back01顶部: '+(this.back01.y + this.back01.height * this.back01.scaleY/2));
            // console.log('camera顶部： ' + (this.camera.y + 480 -this.node.y));
        }
    },

    createNodePool: function(){
        this.backPool = new cc.NodePool();
        this.normal_platformPool = new cc.NodePool();
        this.grass_platformPool = new cc.NodePool();
        this.ice_platformPool = new cc.NodePool();
        this.move_platformPool = new cc.NodePool();
        this.rotation_platformPool = new cc.NodePool();
        this.vanish_platformPool = new cc.NodePool();
        this.conveyer_platformPool = new cc.NodePool();
        this.spring_platformPool = new cc.NodePool();
        for (let i = 0; i < 2; i++){
            let back = cc.instantiate(this.background);
            this.backPool.put(back);
        };
        for (let i = 0; i < 20; i++){
            let platformT = cc.instantiate(this.normal_platform);
            this.normal_platformPool.put(platformT);
        }
        for (let i = 0; i < 20; i++){
            let platformT = cc.instantiate(this.grass_platform);
            this.grass_platformPool.put(platformT);
        }
        for (let i = 0; i < 20; i++){
            let platformT = cc.instantiate(this.ice_platform);
            this.ice_platformPool.put(platformT);
        }
        for (let i = 0; i < 5; i++){
            let platformT = cc.instantiate(this.move_platform);
            this.move_platformPool.put(platformT);
        }
        for (let i = 0; i < 5; i++){
            let platformT = cc.instantiate(this.rotation_platform);
            this.rotation_platformPool.put(platformT);
        }
        for (let i = 0; i < 5; i++){
            let platformT = cc.instantiate(this.vanish_platform);
            this.vanish_platformPool.put(platformT);
        }
        for (let i = 0; i < 5; i++){
            let platformT = cc.instantiate(this.conveyer_platform);
            this.conveyer_platformPool.put(platformT);
        }
        for (let i = 0; i < 5; i++){
            let platformT = cc.instantiate(this.spring_platform);
            this.spring_platformPool.put(platformT);
        }
    },

    spawnPlatforms(Cy,width,height,difficulty){ //难度系数 初始为1 为最低难度 ； Cy是相对于canvas中心的坐标
        this.pfArray = new Array();
        if(difficulty<=3){
            if(this.normal_platformPool.size()>0){
                this.pfArray[0] = this.normal_platformPool.get();
            } else {
                this.pfArray[0] = cc.instantiate(this.normal_platform);
            }
        } else if(difficulty>=4 && difficulty<=8){
            if(this.grass_platformPool.size()>0){
                this.pfArray[0] = this.grass_platformPool.get();
            } else {
                this.pfArray[0] = cc.instantiate(this.grass_platform);
            }
        } else if(difficulty>=9){
            if(this.ice_platformPool.size()>0){
                this.pfArray[0] = this.ice_platformPool.get();
            } else {
                this.pfArray[0] = cc.instantiate(this.ice_platform);
            }
    }
        // this.pfArray[0] = this.normal_platformPool.get();
        this.node.addChild(this.pfArray[0]);
        this.pfArray[0].setPosition((width-this.pfArray[0].width * this.pfArray[0].scaleX * 3)*cc.randomMinus1To1()/2,Cy-450);
        this.pfArray[0].getComponent(cc.RigidBody).syncPosition(false);
        let i = 0;
        while (this.pfArray[i].y <= Cy + height/2 - 100 ) {//可能出现被遮挡的情况
            let rand = cc.random0To1();
            i++;
            let p = Math.PI;
            let rad = 5*p/6 * cc.random0To1() + p/12;
            let distance = (this.rope.scaleY * this.rope.getComponent('Rope').maxHeight+100+difficulty*20)>550?550:(this.rope.scaleY * this.rope.getComponent('Rope').maxHeight+100+difficulty*15);
            let x = this.pfArray[i-1].x + distance * Math.cos(rad);
            let y = this.pfArray[i-1].y + distance * Math.sin(rad);
            if(x < -width/2 + this.pfArray[i-1].width * this.pfArray[i-1].scaleX/2 || x > width/2 - this.pfArray[i-1].width * this.pfArray[i-1].scaleX/2){
                x = this.pfArray[i-1].x + (this.pfArray[i-1].x - x);//容易出现bug！反向后容易超过另一个边界！
                if(x < -width/2 + this.pfArray[i-1].width * this.pfArray[i-1].scaleX/2){
                    x = -width/2 + this.pfArray[i-1].width * this.pfArray[i-1].scaleX/2;
                }else if( x > width/2 - this.pfArray[i-1].width * this.pfArray[i-1].scaleX/2){
                    x = width/2 - this.pfArray[i-1].width * this.pfArray[i-1].scaleX/2;
                }
            }
            if( y > Cy + height/2){
                y = Cy + height/2;
            }
            
            if(rand<=0.15 && difficulty>=2){
                if(this.move_platformPool.size()>0){
                    this.pfArray[i] = this.move_platformPool.get();
                } else {
                    this.pfArray[i] = cc.instantiate(this.move_platform);
                }
            } else if(rand>0.15 && rand<=0.25 && difficulty>=4){
                if(this.rotation_platformPool.size()>0){
                    this.pfArray[i] = this.rotation_platformPool.get();
                } else {
                    this.pfArray[i] = cc.instantiate(this.rotation_platform);
                }
            } else if(rand>0.25 && rand<=0.35 && difficulty>=6){
                if(this.vanish_platformPool.size()>0){
                    this.pfArray[i] = this.vanish_platformPool.get();
                } else {
                    this.pfArray[i] = cc.instantiate(this.vanish_platform);
                }
            } else if(rand>0.35 && rand<=0.5 && difficulty>=3){
                if(this.conveyer_platformPool.size()>0){
                    this.pfArray[i] = this.conveyer_platformPool.get();
                } else {
                    this.pfArray[i] = cc.instantiate(this.conveyer_platform);
                }
            } else if(rand>0.5 && rand<=0.6 && difficulty>=2){
                if(this.spring_platformPool.size()>0){
                    this.pfArray[i] = this.spring_platformPool.get();
                } else {
                    this.pfArray[i] = cc.instantiate(this.spring_platform);
                }
            } else if(difficulty<=3){
                    if(this.normal_platformPool.size()>0){
                        this.pfArray[i] = this.normal_platformPool.get();
                    } else {
                        this.pfArray[i] = cc.instantiate(this.normal_platform);
                    }
            } else if(difficulty>=4 && difficulty<=8){
                    if(this.grass_platformPool.size()>0){
                        this.pfArray[i] = this.grass_platformPool.get();
                    } else {
                        this.pfArray[i] = cc.instantiate(this.grass_platform);
                    }
            } else if(difficulty>=9){
                    if(this.ice_platformPool.size()>0){
                        this.pfArray[i] = this.ice_platformPool.get();
                    } else {
                        this.pfArray[i] = cc.instantiate(this.ice_platform);
                    }
            }
            
            // this.pfArray[i] = this.normal_platformPool.get();
            this.node.addChild(this.pfArray[i]);
            this.pfArray[i].setPosition(x,y);
            this.pfArray[i].getComponent(cc.RigidBody).syncPosition(false);
        }
        if(this.pfArray01 == null){
            this.pfArray01 = this.pfArray;
        } else {
            this.pfArray02 = this.pfArray;
        }
    },

    collisionDetect(){
        var Rope = this.rope.getComponent('Rope');
        let Rx = this.rope.height * this.rope.scaleY * Math.cos(Rope.rad) + this.rope.position.x;
        let Ry = this.rope.height * this.rope.scaleY * Math.sin(Rope.rad) + this.rope.position.y;
        let R = cc.p(Rx,Ry);
        if(this.pfArray01!==null){
            for(let i = 0; i < this.pfArray01.length ; i++){
                switch (this.pfArray01[i].name) {
                    case 'P_rotation':
                        let P_rotation = this.pfArray01[i].getComponent('P_rotation');
                        let Px = this.pfArray01[i].x+this.xOffset;
                        let Py = this.pfArray01[i].y+this.yOffset;
                        let P = cc.p(Px,Py);
                        let Rp = cc.pSub(R,P);
                        // this.graphic.getComponent('Graphic').drawRectangle2(cc.pAdd(P,P_rotation.p1).x,cc.pAdd(P,P_rotation.p1).y,cc.pAdd(P,P_rotation.p2).x,cc.pAdd(P,P_rotation.p2).y,cc.pAdd(P,P_rotation.p4).x,cc.pAdd(P,P_rotation.p4).y,cc.pAdd(P,P_rotation.p3).x,cc.pAdd(P,P_rotation.p3).y,);
                        //console.log(P_rotation.p1p2.cross(cc.pSub(Rp,P_rotation.p1)).dot(P_rotation.p4p3.cross(cc.pSub(Rp,P_rotation.p4))));
                        if(P_rotation.p1p2.cross(cc.pSub(Rp,P_rotation.p1))*P_rotation.p4p3.cross(cc.pSub(Rp,P_rotation.p4))>0 && P_rotation.p3p1.cross(cc.pSub(Rp,P_rotation.p3))*P_rotation.p2p4.cross(cc.pSub(Rp,P_rotation.p2))>0){
                            Rope.setFixed();
                            return this.pfArray01[i];
                        }
                    break;
                
                    default:
                        let Maxx = this.pfArray01[i].x + this.pfArray01[i].width/2 * this.pfArray01[i].scaleX+this.xOffset;
                        let Minx = this.pfArray01[i].x - this.pfArray01[i].width/2 * this.pfArray01[i].scaleX+this.xOffset;
                        let Maxy = this.pfArray01[i].y + this.pfArray01[i].height/2 * this.pfArray01[i].scaleY+this.yOffset;
                        let Miny = this.pfArray01[i].y - this.pfArray01[i].height/2 * this.pfArray01[i].scaleY+this.yOffset;
                        // this.graphic.getComponent('Graphic').drawRectangle(Maxx,Minx,Maxy,Miny);
                        if(Rx>Minx && Rx<Maxx && Ry>Miny && Ry<Maxy){
                            Rope.setFixed();
                            return this.pfArray01[i];
                        }
                    break;
                }
            }
        }
        if(this.pfArray02!==null){
            for(let i = 0; i < this.pfArray02.length ; i++){
                switch (this.pfArray02[i].name) {
                    case 'P_rotation':
                        let P_rotation = this.pfArray02[i].getComponent('P_rotation');
                        let Px = this.pfArray02[i].x+this.xOffset;
                        let Py = this.pfArray02[i].y+this.yOffset;
                        let P = cc.p(Px,Py);
                        let Rp = cc.pSub(R,P);
                        // this.graphic.getComponent('Graphic').drawRectangle2(cc.pAdd(P,P_rotation.p1).x,cc.pAdd(P,P_rotation.p1).y,cc.pAdd(P,P_rotation.p2).x,cc.pAdd(P,P_rotation.p2).y,cc.pAdd(P,P_rotation.p4).x,cc.pAdd(P,P_rotation.p4).y,cc.pAdd(P,P_rotation.p3).x,cc.pAdd(P,P_rotation.p3).y,);
                        //console.log(P_rotation.p1p2.cross(cc.pSub(Rp,P_rotation.p1)).dot(P_rotation.p4p3.cross(cc.pSub(Rp,P_rotation.p4))));
                        if(P_rotation.p1p2.cross(cc.pSub(Rp,P_rotation.p1))*P_rotation.p4p3.cross(cc.pSub(Rp,P_rotation.p4))>0 && P_rotation.p3p1.cross(cc.pSub(Rp,P_rotation.p3))*P_rotation.p2p4.cross(cc.pSub(Rp,P_rotation.p2))>0){
                            Rope.setFixed();
                            return this.pfArray02[i];
                        }
                    break;
                
                    default:
                        let Maxx = this.pfArray02[i].x + this.pfArray02[i].width/2 * this.pfArray02[i].scaleX+this.xOffset;
                        let Minx = this.pfArray02[i].x - this.pfArray02[i].width/2 * this.pfArray02[i].scaleX+this.xOffset;
                        let Maxy = this.pfArray02[i].y + this.pfArray02[i].height/2 * this.pfArray02[i].scaleY+this.yOffset;
                        let Miny = this.pfArray02[i].y - this.pfArray02[i].height/2 * this.pfArray02[i].scaleY+this.yOffset;
                        // this.graphic.getComponent('Graphic').drawRectangle(Maxx,Minx,Maxy,Miny);
                        if(Rx>Minx && Rx<Maxx && Ry>Miny && Ry<Maxy){
                            Rope.setFixed();
                            return this.pfArray02[i];
                        }
                    break;
                }
            }
        }
        // if(this.pfArray02!==null){ //直接复制上面的代码下来，改一下索引
        //     for(let i = 0; i < this.pfArray02.length ; i++){
        //         let Maxx = this.pfArray02[i].x + this.pfArray02[i].width/2 * this.pfArray02[i].scaleX+this.xOffset;
        //         let Minx = this.pfArray02[i].x - this.pfArray02[i].width/2 * this.pfArray02[i].scaleX+this.xOffset;
        //         let Maxy = this.pfArray02[i].y + this.pfArray02[i].height/2 * this.pfArray02[i].scaleY+this.yOffset;
        //         let Miny = this.pfArray02[i].y - this.pfArray02[i].height/2 * this.pfArray02[i].scaleY+this.yOffset;
        //         // this.graphic.getComponent('Graphic').drawRectangle(Maxx,Minx,Maxy,Miny);
        //         if(Rx>Minx && Rx<Maxx && Ry>Miny && Ry<Maxy){
        //             Rope.setFixed();
        //             //console.log('Detected!!');
        //             return this.pfArray02[i];
        //         }
        //     }
        // }
        return null;
        },

    GameOverDetect(){
        if(this.camera.getComponent('Camera').gameOver&&this.overTime==0){
            this.buttons.active = false;
            this.joysticks.active = false;
            this.labels.active = false;
            var gameover = cc.instantiate(this.gameover);
            this.camera.addChild(gameover);
            gameover.setPosition(0,0);
            gameover.getChildByName("Score").getComponent(cc.Label).string = 'Score: ' + this.score +'M';
            this.back_audio.getComponent('Audio').pause();
            this.over_audio.getComponent('Audio').play();
            this.overTime=1;
            if(this.score > cc.sys.localStorage.getItem('heighScore'))
                cc.sys.localStorage.setItem('heighScore', this.score);
            gameover.getChildByName("H_Score").getComponent(cc.Label).string = "Heighest Record:\n" + cc.sys.localStorage.getItem('heighScore') +'M';
            this.hero.getComponent('Hero').over = true;
        }
    },


    // LIFE-CYCLE CALLBACKS:
 
    onLoad:function () { 
        this.windowSize = cc.director.getWinSizeInPixels();
        cc.director.getPhysicsManager().enabled = true;
        this.Rope = this.rope.getComponent('Rope');
        // this.setListener();
        this.createNodePool();

        this.overTime=0;
        this.score = 0;
        this.difficulty = 1;
        this.back01 = this.backPool.get();
        this.bgBB = this.back01.getBoundingBox();
        this.node.addChild(this.back01);
        // this.back01.setPosition(-(this.bgBB.xMax - this.bgBB.xMin)/2,-(this.bgBB.yMax - this.bgBB.yMin)/2+90 ); //相对于Canvas的坐标！
        this.back01.setPosition(-(this.bgBB.xMax - this.bgBB.xMin)/2,this.ground_platform.y-(this.node.height)/2);
        this.back01.getChildByName("BoundL").getComponent(cc.RigidBody).syncPosition(false);
        this.back01.getChildByName("BoundR").getComponent(cc.RigidBody).syncPosition(false);
        this.spawnPlatforms(-(this.node.height)/2+680,this.camera.width,this.back01.height * this.back01.scaleY,1);

        this.xOffset = 320/640 * this.windowSize.width;
        this.yOffset = 570/1146 * this.windowSize.height;
        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        // cc.PhysicsManager.DrawBits.e_pairBit |
        // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        // cc.PhysicsManager.DrawBits.e_jointBit |
        // cc.PhysicsManager.DrawBits.e_shapeBit
        // ;
    },

    start () {

    },

    update: function (dt) {
        this.score = this.camera.getChildByName('Labels').getChildByName('Scores').getComponent('Score').score;
        this.overSky();
        this.GameOverDetect();
    },
});