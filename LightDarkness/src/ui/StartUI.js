/**
 * Created by sjwjames on 16/3/16.
 */
var StartUI=cc.Layer.extend({
    ctor: function () {
        this._super();
        var background=new cc.Sprite(res.startBg);
        background.setPosition(cc.p(cc.director.getWinSize().width*UIConstants.startUI.bgP_x_per,cc.director.getWinSize().height*UIConstants.startUI.bgP_y_per));
        this.addChild(background,1);
        cc.spriteFrameCache.addSpriteFrames(res.fullPlist);
        var logo=new cc.Sprite("#logo.png");
        logo.setPosition(cc.p(cc.director.getWinSize().width*UIConstants.startUI.logoP_x_per,cc.director.getWinSize().height*UIConstants.startUI.logoP_y_per));
        logo.scale=UIConstants.startUI.logo_scale;
        this.addChild(logo,2);
        var startBtn=new cc.Sprite("#startbtn.png");
        startBtn.setPosition(cc.p(cc.director.getWinSize().width*UIConstants.startUI.startBtnP_x_per,cc.director.getWinSize().height*UIConstants.startUI.startBtnP_y_per));
        startBtn.scale=UIConstants.startUI.startBtn_scale;
        this.addChild(startBtn,2);
        try{
            var listener=ListenerFactory.getTouchListener(this._startGame.bind(this));
            cc.eventManager.addListener(listener,startBtn);
        }catch (ex){
           alert(ex.message);
        }
    },
    _startGame: function (touch,event) {
        if(OnTouch.withInReach(touch,event)){
            cc.director.runScene(new SelectScene());
        }

    }
});