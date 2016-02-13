/// <reference path="../GLOBAL_DATA.js" />
/// <reference path="../../cocos2d-js-v3.8.js" />

var EndLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

 
        this.init();
        return true;
    },
    init: function () {
        this._super();
        var endLayer = this.endLayer = $.create("res/EndLayer.json");
        this.addChild(endLayer);
        var _this = this;

        $(endLayer, "#Button_Again").click(function () {

            cc.director.runScene(cc.TransitionFade.create(1, new GameScene()));
        }); 
        
      
    },
 

    onEnter: function () {
        this._super();
        
    }
});


