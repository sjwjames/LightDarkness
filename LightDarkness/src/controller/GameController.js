/**
 * Created by sjwjames on 16/3/16.
 */
var GameController=cc.Class.extend({
    ctor: function () {
        this._super();
    }
});

GameController.resume= function () {
  cc.eventManager.dispatchCustomEvent("gameResumed");
};