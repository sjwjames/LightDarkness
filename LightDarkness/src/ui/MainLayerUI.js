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
        var altar=new Altar("#taichi.png");
        altar.setPosition(cc.p(cc.director.getVisibleOrigin().x+cc.director.getVisibleSize().width*0.85,cc.director.getVisibleSize().height/2+cc.director.getVisibleOrigin().y));
        this.addChild(altar,2);
        var lights=LightController.generateLight(this.space);
        for(var light in lights){
            var myLight=lights[light];
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
            shape.setElasticity(1);
            shape.setFriction(0);
            this.space.addStaticShape(shape);
        }
        this.space.addCollisionHandler(2,3,this.collisionBegan.bind(this),this.collisionPre.bind(this),this.collisionBind.bind(this),this.collisionSeparate.bind(this));
    },
    collisionBegan: function (ariter, space) {

        return true;
    },
    collisionPre: function (ariter, space) {
        return true;
    },
    collisionBind: function (ariter, space) {
        return true;
    },
    collisionSeparate: function (ariter, space) {
        var shapes = ariter.getShapes();
        var light = shapes[0].getBody().data;
        var mirror = shapes[1].getBody().data;

        return true;
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