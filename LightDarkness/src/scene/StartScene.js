/**
 * Created by sjwjames on 16/3/16.
 */
var StartScene=cc.Scene.extend({
    ctor: function () {
        this._super();
        this.startUI=new StartUI();
        this.addChild(this.startUI);
    },
    onEnter: function () {
        this._super();
        cc.director.resume();
        ld.showOrientationTip();
    }
});