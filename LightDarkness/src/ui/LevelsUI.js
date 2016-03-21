/**
 * Created by sjwjames on 16/3/16.
 */
var LevelsUI=cc.Layer.extend({
    ctor: function () {
        this._super();
        var bg=new cc.Sprite(res.selectBg);
        bg.setPosition(cc.p(cc.director.getWinSize().width/2,cc.director.getWinSize().height/2));
        this.addChild(bg);

    }
});