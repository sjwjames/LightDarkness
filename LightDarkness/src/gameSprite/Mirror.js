/**
 * Created by sjwjames on 16/3/16.
 */
var Mirror=cc.PhysicsSprite.extend({
    ctor: function (imgURL) {
        this._super(imgURL);
        try{
            var listener=ListenerFactory.getTouchListener(this.rotate.bind(this));
            cc.eventManager.addListener(listener,this);
        }catch (ex){
            alert(ex.message);
        }
    },
    rotate: function (touch,event) {
        if(OnTouch.withInReach(touch,event)){
            this.rotation+=30;
        }
    },
    judgeCollision:function (arbiter) {
    }
});

Mirror.width=146;
Mirror.height=32;

var AllWhiteMirror=Mirror.extend({
    ctor: function (imgURL) {
        this._super(imgURL);
    },
    judgeCollision:function (arbiter) {
        this._super(arbiter);
        var shapes = arbiter.getShapes();
        var light=shapes[0];
        if(light instanceof  BlackLight){
            cc.eventManager.dispatchCustomEvent("gameOver");
        }

    }
});

var AllBlackMirror=Mirror.extend({
    ctor: function (imgURL) {
        this._super(imgURL);
    },
    judgeCollision:function (arbiter) {
        this._super(arbiter);
        var shapes = arbiter.getShapes();
        var light=shapes[0].data;
        if(light instanceof  WhiteLight){
            cc.eventManager.dispatchCustomEvent("gameOver");
        }

    }
});

var PlaidMirror=Mirror.extend({
    ctor: function (imgURL) {
        this._super(imgURL);
    },
    judgeCollision:function (arbiter) {
        this._super(arbiter);
    }
});

var VerticalBAWMirror=Mirror.extend({
    ctor: function (imgURL) {
        this._super(imgURL);
    },
    judgeCollision:function (arbiter) {
        this._super(arbiter);
    }
});

var HorizontalBAWMirror=Mirror.extend({
    ctor: function (imgURL) {
        this._super(imgURL);
    },
    judgeCollision:function (arbiter) {
        this._super(arbiter);
    }
});