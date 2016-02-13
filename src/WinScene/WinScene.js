var WinScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        this.init();
        return true;
    },
    init: function () {
        this._super();
        this.winLayer = new WinLayer();
        this.addChild(this.winLayer);
        GLOBAL_DATA.danceLevel = 0;
    },
    onEnter: function () {
        this._super();
       

    }
});


