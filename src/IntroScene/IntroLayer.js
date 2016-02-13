var IntroLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
        return true;
    },
    init: function () {
        this._super();
        var introLayer = $.create("res/IntroLayer.json");
        this.addChild(introLayer);

        $(introLayer, "#Button_Start").click(function () {
            cc.director.runScene(new GameScene());

        });
    },
    onEnter: function () {
        this._super();
    }
});


