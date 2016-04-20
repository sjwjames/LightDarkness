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
        //ヾ(｡｀Д´｡)好坑...
        //listView.addCCSEventListener(this.selectedItemEvent);
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
        GameStats.lastLevel=cc.sys.localStorage.getItem("level");
        if (!GameStats.lastLevel){
            GameStats.lastLevel=0;
        }
        for (var i = 6; i>=1; i--) {
            // add default item
            //listView.pushBackDefaultItem();

            // add custom item
            var imgUrl="#UL"+i+".png";
            if (i<=GameStats.lastLevel){
                imgUrl="#L"+i+".png";
            }

            var level=new cc.Sprite(imgUrl);
            level.setUserObject({"level":i});
            try{
                var listener=ListenerFactory.getTouchListener(this.onLevelTouchBegan.bind(this),null,this.onLevelTouchEnded.bind(this));
                cc.eventManager.addListener(listener,level);
            }catch (ex){
                alert(ex.message);
            }
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

        this.addChild(listView);
    },
    onLevelTouchBegan: function (touch,event) {
        if(OnTouch.withInReach(touch,event)){
            this.startX=touch.getLocationX();
        }
        //需要手动return true,否则不能触发后续事件
        return true;
    },
    onLevelTouchEnded: function (touch,event) {
        if(OnTouch.withInReach(touch,event)){
          if (this.startX==touch.getLocationX()){
            var target = event.getCurrentTarget();
            var userObj=target.getUserObject();
              if (GameStats.lastLevel+1<userObj.level){
                  console.log("暂时不能玩耍这个关卡");
              }else{
                  GameStats.currentLevel=userObj.level;
                  cc.director.runScene(new GameScene(userObj.level));
              }
            //cc.director.runScene();
          }
        }
    }

});

