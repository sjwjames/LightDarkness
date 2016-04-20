/**
 * Created by sjwjames on 16/3/16.
 */
var AltarController=cc.Class.extend({
    ctor: function () {
        this._super();
    }
});

AltarController.generateAltar= function (level,space) {
    var altar=new Altar("#taichi.png",space);
    altar.setPositionX(cc.director.getVisibleOrigin().x+cc.director.getVisibleSize().width*Constants.altar[level-1].x);
    altar.setPositionY(cc.director.getVisibleOrigin().y+cc.director.getVisibleSize().height*Constants.altar[level-1].y);
    altar.setRotation(Constants.altar[level-1].angle);
    return altar;
};


