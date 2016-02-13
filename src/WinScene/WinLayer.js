/// <reference path="../GLOBAL_DATA.js" />
/// <reference path="../../cocos2d-js-v3.8.js" />

var WinLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

 
        this.init();
        return true;
    },
    init: function () {
        this._super();
        var winLayer = this.winLayer = $.create("res/WinLayer.json");
        this.addChild(winLayer);
        var _this = this;

        $(winLayer, "#Button_Again").click(function () {

            cc.director.runScene(cc.TransitionFade.create(1, new GameScene()));
        }); 
        
      
    },
 

    onEnter: function () {
        this._super();
        
    }
});


