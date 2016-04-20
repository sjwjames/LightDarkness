/**
 * Created by sjwjames on 16/3/16.
 */
var GameUI=cc.Layer.extend({
    ctor: function (level) {
        this._super();
        var bg=new cc.Sprite("res/ui/gameScene/bg"+level+".png");
        bg.setPosition(cc.p(cc.director.getVisibleSize().width/2,cc.director.getVisibleSize().height/2));
        this.addChild(bg,1);
        var pauseBtn=new cc.Sprite("#pause.png");
        pauseBtn.setPosition(cc.p(cc.director.getVisibleSize().width-100+cc.director.getVisibleOrigin().x,cc.director.getVisibleSize().height-100));
        this.addChild(pauseBtn,2);
        try{
            var listener=ListenerFactory.getTouchListener(this.onPause.bind(this));
            cc.eventManager.addListener(listener,pauseBtn);
        }catch (ex){
            alert(ex.message);
        }
    },
    onPause: function (touch,event) {
        if(OnTouch.withInReach(touch,event)){
           GameController.pause();
        }
    }


});