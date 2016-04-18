/**
 * Created by sjwjames on 16/3/16.
 */
var MirrorController=cc.Class.extend({
    ctor: function () {
        this._super();
    }
});

MirrorController.generateMirrors= function (level,space) {
    var mirrors=Constants.mirrors[level-1];
    var result=[];
    for(var mirror in mirrors){
        var productedMirror=MirrorFactory.productMirror(mirrors[mirror].type);
        if (productedMirror){
            var body=new cp.Body(Number.MAX_VALUE, cp.momentForBox(Number.MAX_VALUE, Mirror.width, Mirror.height));
            body.setPos(cc.p(cc.director.getVisibleSize().width*mirrors[mirror].x+cc.director.getVisibleOrigin().x,mirrors[mirror].y+cc.director.getVisibleOrigin().y));
            space.addBody(body);
            var shape=new cp.BoxShape(body,Mirror.width,Mirror.height);
            shape.setElasticity(1);
            shape.setFriction(0);
            shape.setCollisionType(2);
            space.addShape(shape);
            shape.data=productedMirror;
            productedMirror.setBody(body);
            productedMirror.setPosition(cc.p(cc.director.getVisibleSize().width*mirrors[mirror].x+cc.director.getVisibleOrigin().x,mirrors[mirror].y+cc.director.getVisibleOrigin().y));
            productedMirror.rotation=mirrors[mirror].angle;
            result.push(productedMirror);
        }
        else {
            throw "type of mirror is not correct";
        }
    }
    return result;
};