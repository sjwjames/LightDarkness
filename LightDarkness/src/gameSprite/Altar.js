/**
 * Created by sjwjames on 16/3/16.
 */
var Altar=cc.PhysicsSprite.extend({
    ctor: function (imgURL,space) {
        this._super(imgURL);
        this.initPhysics(space);
    },
    initPhysics:function (space) {
        var pos_x=cc.director.getVisibleOrigin().x+cc.director.getVisibleSize().width*0.85;
        var pos_y=cc.director.getVisibleSize().height/2+cc.director.getVisibleOrigin().y;
        this.spotRadius=this.width/2*0.8;
        var body=new cp.Body(Number.MAX_VALUE, cp.momentForCircle(Number.MAX_VALUE,0,this.spotRadius,cp.v(0,0)));
        body.setPos(cc.p(pos_x,pos_y));
        space.addBody(body);
        var shape=new cp.CircleShape(body,this.spotRadius,cp.v(0,0));
        shape.setElasticity(0);
        shape.setFriction(0);
        shape.setCollisionType(4);
        shape.data=this;
        space.addShape(shape);
        this.setBody(body);

    },
    judgeCollision:function (arbiter) {
        var localP=this.convertToNodeSpace(cc.p(this.x,this.y));
        var collisionPoint = arbiter.getContactPointSet()[0].point;
        var localCollisionP=this.convertToNodeSpace(cc.p(collisionPoint.x,collisionPoint.y));
        var shapes = arbiter.getShapes();
        var light=shapes[0].data;
        if((light instanceof  WhiteLight)&&localCollisionP.x<=localP.x){
            return false;
        }else if((light instanceof  BlackLight)&&localCollisionP.x>=localP.x){
            return false;
        }else if((light instanceof  WhiteLight)&&localCollisionP.x>localP.x){
            return true;
        }else if((light instanceof  BlackLight)&&localCollisionP.x<localP.x){
            return true;
        }
        
    }
});




