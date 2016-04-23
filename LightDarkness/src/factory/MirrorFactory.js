/**
 * Created by sjwjames on 16/4/6.
 */
var MirrorFactory=cc.Class.extend({

});

MirrorFactory.productMirror=function (type,space,pos,angle) {
    switch (type){
        case 1:
            return new PlaidMirror("#glass1.png",space,pos,angle);
        case 2:
            return new AllWhiteMirror("#glass2.png",space,pos,angle);
        case 3:
            return new AllBlackMirror("#glass3.png",space,pos,angle);
        case 4:
            return new VerticalBAWMirror("#glass4.png",space,pos,angle);
        case 5:
            return new HorizontalBAWMirror("#glass5.png",space,pos,angle);
        default:
            return null;
    }
}