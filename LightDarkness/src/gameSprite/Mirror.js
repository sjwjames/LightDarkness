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
    }
});

Mirror.width=146;
Mirror.height=32;

var AllWhiteMirror=Mirror.extend({
    ctor: function (imgURL) {
        this._super(imgURL);
    }
});

var AllBlackMirror=Mirror.extend({
    ctor: function (imgURL) {
        this._super(imgURL);
    }
});

var PlaidMirror=Mirror.extend({
    ctor: function (imgURL) {
        this._super(imgURL);
    }
});

var VerticalBAWMirror=Mirror.extend({
    ctor: function (imgURL) {
        this._super(imgURL);
    }
});

var HorizontalBAWMirror=Mirror.extend({
    ctor: function (imgURL) {
        this._super(imgURL);
    }
});