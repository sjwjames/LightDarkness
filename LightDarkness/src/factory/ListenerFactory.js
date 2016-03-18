/**
 * Created by sjwjames on 16/3/18.
 */
var ListenerFactory=cc.Class.extend({
    ctor: function () {
    }
});


ListenerFactory.getTouchListener=(function () {
    return function () {
        var argumentLength=arguments.length;
        var myListener=cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false
        });
        if (argumentLength==0){
            throw ExceptionFactory.getNullArgumentExcption();
        }

        switch (argumentLength){
            case 1:
                myListener.onTouchBegan = arguments[0];
                break;
            case 2:
                myListener.onTouchBegan = arguments[0];
                myListener.onTouchMoved=arguments[1];
                break;
            case 3:
                myListener.onTouchBegan = arguments[0];
                myListener.onTouchMoved=arguments[1];
                myListener.onTouchEnded=arguments[2];
                break;
            case 4:
                myListener.onTouchBegan = arguments[0];
                myListener.onTouchMoved=arguments[1];
                myListener.onTouchEnded=arguments[2];
                myListener.onTouchCancelled=arguments[3];
                break;

        }
        return myListener.clone();
    }
})();