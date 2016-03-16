/**
 * Created by sjwjames on 16/3/16.
 */
var StartUI=cc.Layer.extend({
    ctor: function () {
        this._super();
        var background=new cc.Sprite(res.startBg);
        background.setPosition(cc.p(cc.director.getVisibleSize().width/2,cc.director.getVisibleSize().height/2));
        this.addChild(background);
    }
});