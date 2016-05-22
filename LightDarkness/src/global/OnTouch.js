/**
 * Created by sjwjames on 16/3/25.
 */
var OnTouch=cc.Class.extend({

});

OnTouch.withInReach= function (touch,event) {
    var target = event.getCurrentTarget();
    var locationInNode = target.convertToNodeSpace(touch.getLocation());
    var size = target.getContentSize();
    var rect = cc.rect(0, 0, size.width, size.height);
    if (cc.rectContainsPoint(rect, locationInNode)) {       // 判断触摸点是否在按钮范围内
        return true;
    }else{
        return false;
    }
};

