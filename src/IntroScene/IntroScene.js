var IntroScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        this.init();
        return true;
    },
    init: function () {
        this._super();
        this.introLayer = new IntroLayer();
        this.addChild(this.introLayer);
    },
    onEnter: function () {
        this._super();
        

    }
});


