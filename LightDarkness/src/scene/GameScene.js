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
        GameStats.gameState=Constants.gameStates.idle;
    },
    onEnter: function () {
        this._super();
        cc.eventManager.addCustomListener("gamePaused",this.onGamePaused.bind(this));
        cc.eventManager.addCustomListener("gameResumed",this.onGameResumed.bind(this));
        cc.eventManager.addCustomListener("gameOver",this.onGameOver.bind(this));
        cc.eventManager.addCustomListener("gameWinning",this.onGameWinning.bind(this));
    },
    onGamePaused: function () {
        cc.director.pause();
        this.gamePausedUI.visible=true;
        this.gameUI.visible=false;
        this.mainLayer.visible=false;
        this._stopPhysicsMotion();
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
        this.removeChild(this.mainLayer);
        var gameOverUI=new GameOverUI();
        this.addChild(gameOverUI,3);
    },
    onGameWinning: function () {
        this.removeChild(this.mainLayer);
        var gameWinUI=new GameWinningUI();
        this.addChild(gameWinUI,3);
    },
    onExit:function () {
        cc.eventManager.removeCustomListeners("gamePaused");
        cc.eventManager.removeCustomListeners("gameResumed");
        cc.eventManager.removeCustomListeners("gameOver");
        cc.eventManager.removeCustomListeners("gameWinning");
    },
    _stopPhysicsMotion: function () {
        var lights=this.mainLayer.lights;
        for(var light in lights){
            if(!lights[light].body.isSleeping()){
                lights[light].body.sleep();
            }

        }
    }

});