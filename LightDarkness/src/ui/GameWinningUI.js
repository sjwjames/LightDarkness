/**
 * Created by sjwjames on 16/3/16.
 */
var GameWinningUI=cc.Layer.extend({
    ctor: function () {
        this._super();
        var bg=new cc.Sprite("res/ui/gameScene/bg1.png");
        bg.setPosition(cc.p(cc.director.getWinSize().width/2,cc.director.getWinSize().height/2));
        this.addChild(bg,1);
        var nextBtn=new cc.MenuItemImage("#next.png","#next.png",this.onGoToNext.bind(this));
        var quitBtn=new cc.MenuItemImage("#quit.png","#quit.png",this.onQuitGame.bind(this));
        var menu=new cc.Menu(nextBtn,quitBtn);
        menu.setPosition(cc.p(cc.director.getWinSize().width/2,cc.director.getWinSize().height/4));
        menu.alignItemsHorizontallyWithPadding(500);
        this.addChild(menu,2);
        var winSprite=new cc.Sprite("#win.png");
        winSprite.setPosition(cc.p(cc.director.getWinSize().width/2,cc.director.getWinSize().height/3*2));
        this.addChild(winSprite,2);
    },
    onGoToNext: function () {
        GameController.next();
    },
    onQuitGame: function () {
        GameController.quit();
    }
});