/**
 * Created by sjwjames on 16/3/16.
 */
var Mirror=cc.PhysicsSprite.extend({
    ctor: function (imgURL,space,pos,angle) {
        this._super(imgURL);
        try{
            var listener=ListenerFactory.getTouchListener(this.rotate.bind(this));
            cc.eventManager.addListener(listener,this);
        }catch (ex){
            alert(ex.message);
        }
        this._initPhysics(space,pos,angle);
        this.scheduleUpdate();
        this.lastAngle=angle;
    },
    _initPhysics:function (space,pos,angle) {
        this.body=new cp.Body(Number.MAX_VALUE, cp.momentForBox(Number.MAX_VALUE,this.width, this.height));
        this.body.setPos(cc.p(cc.director.getVisibleSize().width*pos.x+cc.director.getVisibleOrigin().x,pos.y+cc.director.getVisibleOrigin().y));
        space.addBody(this.body);
        this.shape=new cp.BoxShape(this.body,this.width,this.height);
        this.shape.setElasticity(1);
        this.shape.setFriction(0);
        this.shape.setCollisionType(2);
        space.addShape(this.shape);
        this.shape.data=this;
        this.setBody(this.body);
        this.setPosition(cc.p(cc.director.getVisibleSize().width*pos.x+cc.director.getVisibleOrigin().x,pos.y+cc.director.getVisibleOrigin().y));
        this.rotation=angle;
    },
    rotate: function (touch,event) {
        if(OnTouch.withInReach(touch,event)){
            var target = event.getCurrentTarget();
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var localP=target.convertToNodeSpace(cc.p(this.x,this.y));
            if (locationInNode.x>localP.x){
               //physicSprite无法使用runAction来变换
                this.body.setAngVel(1);
            }else {
                this.body.setAngVel(-1);
            }
        }
    },
    judgeCollision:function (arbiter) {
    },
    update:function (dt) {
        this._super(Constants.chipmunkRefresh);
        if (this.body.getAngVel()!=0){
            if(Math.abs(this.rotation-this.lastAngle)>=30){
                this.body.setAngVel(0);
                this.lastAngle=this.rotation;
            }
        }

    }
});



var AllWhiteMirror=Mirror.extend({
    ctor: function (imgURL,space,pos,angle) {
        this._super(imgURL,space,pos,angle);
    },
    judgeCollision:function (arbiter) {
        this._super(arbiter);
        var shapes = arbiter.getShapes();
        var light=shapes[0].data;
        if(light instanceof  BlackLight){
            cc.eventManager.dispatchCustomEvent("gameOver");
        }

    }
});

var AllBlackMirror=Mirror.extend({
    ctor: function (imgURL,space,pos,angle) {
        this._super(imgURL,space,pos,angle);
    },
    judgeCollision:function (arbiter) {
        this._super(arbiter);
        var shapes = arbiter.getShapes();
        var light=shapes[0].data;
        if(light instanceof  WhiteLight){
            cc.eventManager.dispatchCustomEvent("gameOver");
        }

    }
});

var PlaidMirror=Mirror.extend({
    ctor: function (imgURL,space,pos,angle) {
        this._super(imgURL,space,pos,angle);
    },
    judgeCollision:function (arbiter) {
        this._super(arbiter);
    }
});

var VerticalBAWMirror=Mirror.extend({
    ctor: function (imgURL,space,pos,angle) {
        this._super(imgURL,space,pos,angle);
    },
    judgeCollision:function (arbiter) {
        this._super(arbiter);
    }
});

var HorizontalBAWMirror=Mirror.extend({
    ctor: function (imgURL,space,pos,angle) {
        this._super(imgURL,space,pos,angle);
    },
    judgeCollision:function (arbiter) {
        this._super(arbiter);
    }
});