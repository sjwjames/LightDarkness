/**
 * Created by sjwjames on 16/3/16.
 */
var SelectScene=cc.Scene.extend({
    ctor: function () {
        this._super();
        var levelsUI=new LevelsUI();
        this.addChild(levelsUI);
    }
});