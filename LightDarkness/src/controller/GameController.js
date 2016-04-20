/**
 * Created by sjwjames on 16/3/16.
 */
var GameController=cc.Class.extend({
    ctor: function () {
        this._super();
    }
});

GameController.pause= function () {
    cc.eventManager.dispatchCustomEvent("gamePaused");
};

GameController.resume= function () {
    cc.eventManager.dispatchCustomEvent("gameResumed");
};

GameController.retry= function () {
    GameStats.refresh();
    cc.director.runScene(new GameScene(GameStats.currentLevel));
    cc.director.resume();

};

GameController.over= function () {
    cc.eventManager.dispatchCustomEvent("gameOver");
};


GameController.quit= function () {
    cc.director.end();
};

GameController.win= function () {
    cc.eventManager.dispatchCustomEvent("gameWinning");
};

GameController.next= function () {
    if (GameStats.currentLevel==Constants.levelCount){
        cc.director.runScene(new StartScene());
    }else {
        GameStats.currentLevel++;
        cc.sys.localStorage.setItem("level",GameStats.currentLevel);
        cc.director.runScene(new GameScene(GameStats.currentLevel));
    }


};