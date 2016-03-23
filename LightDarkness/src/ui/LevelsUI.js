/**
 * Created by sjwjames on 16/3/16.
 */
var LevelsUI=cc.Layer.extend({
    ctor: function () {
        this._super();
        var bg=new cc.Sprite(res.selectBg);
        bg.setPosition(cc.p(cc.director.getWinSize().width/2,cc.director.getWinSize().height/2));
        this.addChild(bg);
        var listView=new ccui.ListView();
        listView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        listView.setTouchEnabled(true);
        listView.setBounceEnabled(true);
        //设置listview可见区域
        listView.setContentSize(cc.size(cc.director.getWinSize().width,cc.director.getWinSize().height));
        listView.x = 100;
        listView.y = 100;
        listView.addEventListener(this._selectedItemEvent, this);
        // create model
        //var default_label =new cc.LabelTTF("第0关","Microsoft YaHei",24);
        //
        //var default_item = new ccui.Layout();
        //default_item.setTouchEnabled(true);
        //default_item.setContentSize(cc.size(300,35));
        //default_item.width = listView.width;
        //default_item.addChild(default_label);
        // set model
        //listView.setItemModel(default_item);

        for (var i = 6; i>=1; i--) {
            // add default item
            //listView.pushBackDefaultItem();

            // add custom item
            var level=new cc.Sprite("#UL"+i+".png");
            level.x=100;
            level.y=cc.director.getWinSize().height/4;
            var lblLayer=new ccui.Layout();
            lblLayer.width = cc.director.getWinSize().width/3;
            lblLayer.height = cc.director.getWinSize().height-200;
            lblLayer.addChild(level);

            listView.insertCustomItem(lblLayer);
        }
        // 设置所有item重力方向
        listView.setGravity(ccui.ListView.GRAVITY_CENTER_HORIZONTAL);

        this.addChild(listView,2);
    },
    _selectedItemEvent: function (sender, type) {
        console.log("asd");
        switch (type) {
            case ccui.ListView.EVENT_SELECTED_ITEM:
                var listViewEx = sender;
                console.log("select child index = " + listViewEx.getCurSelectedIndex());
                break;
            default:
                break;
        }
    }

});