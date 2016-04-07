/**
 * Created by sjwjames on 16/3/16.
 */
var GameScene=cc.Scene.extend({
    ctor: function (level) {
        this._super();
        this.gameUI=new GameUI(level);
        this.mainLayer=new MainLayerUI(level);
        this.addChild(this.gameUI,1);
        this.addChild(this.mainLayer,2);
        cc.eventManager.addCustomListener("gamePaused",this.onGamePaused.bind(this));
        cc.eventManager.addCustomListener("gameResumed",this.onGameResumed.bind(this));
    },
    onGamePaused: function () {
        cc.director.pause();
        this.gamePausedUI=new GamePauseUI();
        this.addChild(this.gamePausedUI,2);
        this.removeChild(this.gameUI);
        this.removeChild(this.mainLayer);
    },
    onGameResumed: function(){
        this.removeChild(this.gamePausedUI);
        this.addChild(this.gameUI,2);
        this.addChild(this.mainLayer,2);
        cc.director.resume();
    }

});