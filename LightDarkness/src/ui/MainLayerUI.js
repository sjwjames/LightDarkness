/**
 * Created by sjwjames on 16/3/16.
 */
var MainLayerUI=cc.Layer.extend({
    space:null,
    ctor: function (level) {
        this._super();
        this.initPhysics();
        try{
            var mirrors=MirrorController.generateMirrors(level,this.space);
            for(var mirror in mirrors){
                this.addChild(mirrors[mirror],2);
            }
        }
        catch (e){
            console.log(e);
        }
        var altar=new Altar("#taichi.png",this.space);
        altar.setPosition(cc.p(cc.director.getVisibleOrigin().x+cc.director.getVisibleSize().width*0.85,cc.director.getVisibleSize().height/2+cc.director.getVisibleOrigin().y));
        this.addChild(altar,2);
        this.lights=LightController.generateLight(this.space);
        for(var light in this.lights){
            var myLight=this.lights[light];
            this.addChild(myLight,2);
        }

        try{
            var listener=ListenerFactory.getTouchListener(function () {
                cc.director.resume();
            }.bind(this));
            cc.eventManager.addListener(listener,this)
        }catch (e){
            console.log(e);
        }
        this.scheduleUpdate();
    },
    initPhysics: function () {
        var visibleSize=cc.director.getVisibleSize();
        this.space=new cp.Space();
        this.setupDebugNode();
        this.space.gravity=cp.v(0,0);
        var staticBody=this.space.staticBody;
        var walls=[new cp.SegmentShape(staticBody,cp.v(0,0),cp.v(visibleSize.width,0),0),
                   new cp.SegmentShape(staticBody,cp.v(0,visibleSize.height),cp.v(visibleSize.width,visibleSize.height),0),
                   new cp.SegmentShape(staticBody,cp.v(0,0),cp.v(0,visibleSize.height),0),
                   new cp.SegmentShape(staticBody,cp.v(visibleSize.width,0),cp.v(visibleSize.width,visibleSize.height),0)
        ];
        for (var wall in walls){
            var shape=walls[wall];
            shape.setCollisionType(1);
            shape.setElasticity(1);
            shape.setFriction(0);
            this.space.addStaticShape(shape);
        }
        this.space.addCollisionHandler(3,2,this.onCollisionBegan.bind(this),this.onCollisionPre.bind(this),this.onCollisionBind.bind(this),this.onCollisionSeparate.bind(this));
        this.space.addCollisionHandler(3,1,this.onCollisionBegan.bind(this),this.onCollisionPre.bind(this),this.onCollisionBind.bind(this),this.onCollisionSeparate.bind(this));
        this.space.addCollisionHandler(3,3,this.onCollisionBegan.bind(this),this.onCollisionPre.bind(this),this.onCollisionBind.bind(this),this.onCollisionSeparate.bind(this));
        this.space.addCollisionHandler(3,4,this.onCollisionBegan.bind(this),this.onCollisionPre.bind(this),this.onCollisionBind.bind(this),this.onCollisionSeparate.bind(this));
    },
    onCollisionBegan: function (arbiter, space) {
        var shapes = arbiter.getShapes();
        var light=shapes[0];
        var shapeB = shapes[1];
        var type=shapeB.collision_type;
        switch (type){
            case 1:
                this.onWallCollision();
                break;
            case 2:
                var mirror=shapeB.data;
                mirror.judgeCollision(arbiter);
                break;
            case 3:
                this.onBallCollision();
                break;
            case 4:
                var altar=shapeB.data;
                var result=altar.judgeCollision(arbiter);
                if (result){
                    space.addPostStepCallback(function () {
                        space.removeShape(light);
                        light.data.removeFromParent();
                    });
                    if (GameStats.gameState==Constants.gameStates.idle){
                        GameStats.gameState=Constants.gameStates.oneFinish;
                    }else if(GameStats.gameState==Constants.gameStates.oneFinish){
                        GameStats.gameState=Constants.gameStates.success;
                    }
                }else{
                    cc.eventManager.dispatchCustomEvent("gameOver");
                }

                break;
            default:
                break;
        }
        return true;
    },
    onCollisionPre: function (arbiter, space) {
        return true;
    },
    onCollisionBind: function (arbiter, space) {
        return true;
    },
    onCollisionSeparate: function (arbiter, space) {

        return true;
    },

    onWallCollision:function () {
        cc.eventManager.dispatchCustomEvent("gameOver");
    },

    onBallCollision:function () {
        cc.eventManager.dispatchCustomEvent("gameOver");
    },


    setupDebugNode: function () {
        this._debugNode=new cc.PhysicsDebugNode(this.space);
        this._debugNode.visible=true;
        this.addChild(this._debugNode);
    },
    update: function (dt) {
        this._super(dt);
        var timeStep = 0.03;
        this.space.step(timeStep);
    }
});