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
        this.gamePausedUI=new GamePauseUI();
        this.addChild(this.gamePausedUI,2);
        this.gamePausedUI.visible=false;
        cc.eventManager.addCustomListener("gamePaused",this.onGamePaused.bind(this));
        cc.eventManager.addCustomListener("gameResumed",this.onGameResumed.bind(this));
        cc.eventManager.addCustomListener("gameOver",this.onGameOver.bind(this));
    },
    onGamePaused: function () {
        cc.director.pause();
        this.gamePausedUI.visible=true;
        this.gameUI.visible=false;
        this.mainLayer.visible=false;
        var lights=this.mainLayer.lights;
        for(var light in lights){
            lights[light].body.sleep();
        }
    },
    onGameResumed: function(){
        this.gamePausedUI.visible=false;
        this.gameUI.visible=true;
        this.mainLayer.visible=true;
        cc.director.resume();
        var lights=this.mainLayer.lights;
        for(var light in lights){
            lights[light].body.activate();
        }
    },
    onGameOver:function () {
        var gameOverUI=new GameOverUI();
        this.addChild(gameOverUI,3);
    },
    onExit:function () {
        
    }

});