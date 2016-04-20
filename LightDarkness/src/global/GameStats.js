/**
 * Created by sjwjames on 16/3/16.
 */
var GameStats={
    lastLevel:cc.sys.localStorage.getItem("level"),
    gameState:Constants.gameStates.idle,
    currentLevel:1
};

GameStats.refresh= function () {
    GameStats.lastLevel=cc.sys.localStorage.getItem("level");
    GameStats.gameState=Constants.gameStates.idle;
};