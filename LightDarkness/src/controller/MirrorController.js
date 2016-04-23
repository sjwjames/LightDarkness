/**
 * Created by sjwjames on 16/3/16.
 */
var MirrorController=cc.Class.extend({
    ctor: function () {
        this._super();
    }
});

MirrorController.generateMirrors= function (level,space) {
    var mirrors=Constants.mirrors[level-1];
    var result=[];
    for(var mirror in mirrors){
        var productedMirror=MirrorFactory.productMirror(mirrors[mirror].type,space,cc.p(mirrors[mirror].x,mirrors[mirror].y),mirrors[mirror].angle);
        if (productedMirror){
            result.push(productedMirror);
        }
        else {
            throw "type of mirror is not correct";
        }
    }
    return result;
};