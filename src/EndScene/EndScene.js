var EndScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        this.init();
        return true;
    },
    init: function () {
        this._super();
        this.endLayer = new EndLayer();
        this.addChild(this.endLayer);
        GLOBAL_DATA.danceLevel = 0;
    },
    onEnter: function () {
        this._super();
       

    }
});


