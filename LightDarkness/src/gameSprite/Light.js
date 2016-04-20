/**
 * Created by sjwjames on 16/3/16.
 */
var Light=cc.PhysicsSprite.extend({
    spotRadius:10,
    pos_x:0,
    pos_y:0,
    ctor: function (imgURL,space) {
        this._super(imgURL);
        this.scale=0.5;
        this.initPhysics(space);
    },
    initPhysics: function (space) {
        this.pos_x=cc.director.getVisibleOrigin().x+50;
        this.pos_y=cc.director.getVisibleOrigin().y+cc.director.getVisibleSize().height/3*2-50;
        this.spotRadius=this.width*this.scale/2;
        this.body=new cp.Body(1, cp.momentForCircle(1,0,this.spotRadius,cp.v(0,0)));
        this.body.setPos(cc.p(this.pos_x,this.pos_y));
        this.body.setAngle(0);
        this.body.setVel(cp.v(100,0));
        space.addBody(this.body);
        this.shape=new cp.CircleShape(this.body,this.spotRadius,cp.v(0,0));
        this.shape.setElasticity(1);
        this.shape.setFriction(0);
        this.shape.setCollisionType(3);
        this.shape.data=this;
        space.addShape(this.shape);
        this.setBody(this.body);
        
    }
});

var WhiteLight=Light.extend({
    ctor: function (imgURL,space) {
        this._super(imgURL,space);
        //var particle=new cc.ParticleSystem(res.whitePlist);
        //particle.setPosition(cc.p(0,0));
        //particle.angle=180;
        //this.addChild(particle);
        this.body.setVel(cp.v(0,0));
    }
});

var BlackLight=Light.extend({
    ctor: function (imgURL,space) {
        this._super(imgURL,space);
        this.pos_y=cc.director.getVisibleOrigin().y+cc.director.getVisibleSize().height/3+50;
    }
});