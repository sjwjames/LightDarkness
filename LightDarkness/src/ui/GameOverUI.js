/**
 * Created by sjwjames on 16/3/16.
 */
var GameOverUI=cc.Layer.extend({
    ctor: function () {
        this._super();
        var bg=new cc.Sprite("res/ui/gameScene/bg1.png");
        bg.setPosition(cc.p(cc.director.getWinSize().width/2,cc.director.getWinSize().height/2));
        this.addChild(bg,1);
        var retryBtn=new cc.MenuItemImage("#retry.png","#retry.png",this.onRetryGame.bind(this));
        var quitBtn=new cc.MenuItemImage("#quit.png","#quit.png",this.onQuitGame.bind(this));
        var menu=new cc.Menu(retryBtn,quitBtn);
        menu.setPosition(cc.p(cc.director.getWinSize().width/2,cc.director.getWinSize().height/2));
        menu.alignItemsHorizontallyWithPadding(40);
        this.addChild(menu,2);
    },
    onRetryGame: function () {

    },
    onQuitGame: function () {

    }
});