/**
 * Created by sjwjames on 16/3/16.
 */
var LightController=cc.Class.extend({
    ctor: function () {
        this._super();
    }
});

LightController.generateLight= function (space) {
    var result=[];
    var whiteLight=new WhiteLight(res.whiteTexture,space);
    var blackLight=new BlackLight(res.blackTexture,space);
    whiteLight.setPosition(cc.p(whiteLight.pos_x,whiteLight.pos_y));
    result.push(whiteLight,blackLight);
    return result;
};