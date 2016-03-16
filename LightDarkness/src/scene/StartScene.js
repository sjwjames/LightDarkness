/**
 * Created by sjwjames on 16/3/16.
 */
var StartScene=cc.Scene.extend({
    ctor: function () {
        this._super();
        this.startUI=new StartUI();
        //this.anchorX=0;
        //this.anchorY=0;
        //this.startUI.anchorX=0;
        //this.startUI.anchorY=0;

        this.addChild(this.startUI);
    }
});