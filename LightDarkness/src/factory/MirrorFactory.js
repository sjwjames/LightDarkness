/**
 * Created by sjwjames on 16/4/6.
 */
var MirrorFactory=cc.Class.extend({

});

MirrorFactory.productMirror=function (type) {
    switch (type){
        case 1:
            return new PlaidMirror("#glass1.png");
        case 2:
            return new AllWhiteMirror("#glass2.png");
        case 3:
            return new AllBlackMirror("#glass3.png");
        case 4:
            return new VerticalBAWMirror("#glass4.png");
        case 5:
            return new HorizontalBAWMirror("#glass5.png");
        default:
            return null;
    }
}