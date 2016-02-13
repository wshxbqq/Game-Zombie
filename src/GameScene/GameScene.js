var GameScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        this.init();
        return true;
    },
    init: function () {
        this._super();
        this.gameLayer = new GameLayer();
        this.addChild(this.gameLayer);
    },
    onEnter: function () {
        this._super();
       

    }
});


