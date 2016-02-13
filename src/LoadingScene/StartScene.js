var StartScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        this.init();
        return true;
    },
    init: function () {
        this._super();
    },
    onEnter: function () {
        this._super();
        GLOBAL_LAYER = this;
        var startLayer = $.create("res/StartLayer.json");
        this.addChild(startLayer);
        Util.playMusic("res/bg.mp3", 1);
        $(startLayer, "#Sprite_5")[0].setLocalZOrder(99);

        
        $(startLayer, "#Sprite_\\d").each(function (n, i) {
            setTimeout(function () {
                i.runAction(cc.fadeIn(1));
            }, n * 1000);

        });


        $(startLayer, "#Sprite_8").click(function () {
            cc.director.runScene(cc.TransitionFade.create(1,new GameScene()));
        });

    }
});


