/// <reference path="../../cocos2d-js-v3.6.js" />
/// <reference path="../CfgPanel/CfgPanel.js" />
/// <reference path="../Util/JQ.js" />
/// <reference path="Component/Cell.js" />
/// <reference path="../Util/util.js" />
/// <reference path="Component/Ball.js" />
/// <reference path="../Util/underscore.js" />
/// <reference path="Component/Layer_GameStart.js" />
/// <reference path="Component/Hand.js" />
/// <reference path="Component/Enemy.js" />
 

var CfgPanel = {};
CfgPanel.create = function () {
    var cfgPanel = $.create("res/Layer_Cfg.json");

    var ckbMusic = $(cfgPanel, "#CheckBox_Music");
    ckbMusic.bind("select", function () {
        GLOBAL_DATA.Music = true;
        Util.playEffic("res/Audio/button.mp3");
        if (!cc.audioEngine.isMusicPlaying()) {
            Util.playMusic("res/Audio/bg.mp3", 1);
        }
        GLOBAL_DATA.save();
    }).bind("unselect", function () {
        GLOBAL_DATA.Music = false;
        Util.playEffic("res/Audio/button.mp3");
        Util.StopMusic();
        GLOBAL_DATA.save();
    })[0].setSelected(!!GLOBAL_DATA.Music);



    var ckbSound = $(cfgPanel, "#CheckBox_Sound");
    ckbSound.bind("select", function () {
        GLOBAL_DATA.Sound = true;
        Util.playEffic("res/Audio/button.mp3");
        GLOBAL_DATA.save();
    }).bind("unselect", function () {
        GLOBAL_DATA.Sound = false;
        Util.playEffic("res/Audio/button.mp3");
        GLOBAL_DATA.save();
    })[0].setSelected(!!GLOBAL_DATA.Sound);




    $(cfgPanel, "#Button_Back").click(function () {
        // cc.director.runScene(new GameScence());
        alert("Button_Back");
    });


    return cfgPanel;
}

