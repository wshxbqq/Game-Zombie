/// <reference path="../GLOBAL_DATA.js" />
/// <reference path="../../cocos2d-js-v3.8.js" />

var GameLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

 
        this.currentDanceIndex = 0; //当前第几步舞蹈
        this.sortPool = [72,200,325,450,570];
        this.init();
        return true;
    },
    init: function () {
        window.GLOBAL_LAYER = this;
        var _this = this;
        this._super();
        var gameLayer = this.gameLayer = $.create("res/GameLayer.json");
        this.addChild(gameLayer);

        this.createDanceStep();

        this.$zombies = $(gameLayer, "#Sprite_Zombie_\\d");
        this.$player = $(gameLayer, "#Sprite_Player");
        this.$exclamatoryMark = $(gameLayer, "#Sprite_ExclamatoryMark_\\d");
        this.$exclamatoryMark.hide();
        this.$zombieLeader = $(gameLayer, "#Sprite_Leader_Zombie");
        this.$panelDance = $(gameLayer, "#Panel_Dance");
        this.$light = $(gameLayer, "#light_0");

        this.initDancePanel();

        _this.showDancePanel();
        _this.dancePanelActive = false;
        this.lightBlink();
        setTimeout(function () {
            _this.dancePanelActive = true;
            _this.zombieLeaderDance(GLOBAL_DATA.currentDance, GLOBAL_DATA.danceDis - GLOBAL_DATA.danceDisRate * GLOBAL_DATA.danceLevel, function () {
                _this.$light[0].stopAllActions();
            });

        }, 3000);
        GLOBAL_DATA.danceLevel = 0;
        
    },

    gameOver: function () {
        var _this = this;
        _this.dancePanelActive = false;
        Util.playEffic("res/chomp.mp3");
        $("#bang_\\d").show();
        setTimeout(function () {
            Util.playEffic("res/laugh.mp3");
            $("#bang_\\d").hide();
            _this.$player[0].initWithSpriteFrameName("img/slice/gameover.png");
            $("#shadow_.*?").hide();
            $("#Sprite_Zombie_\\d").each(function (n, i) {
                i.runAction(cc.moveTo(3, _this.$player[0].getPosition()));

            });

            cc.director.runScene(cc.TransitionFade.create(3, new EndScene()));

        }, 1000);
        

 

    },

 

    zombieLeaderDance: function (str,delay,cb) {
        var _this=this;
        var arr = str.match(/\d/ig);
        var animation = new cc.Animation();
        for (var i in arr) {
            var frameName = "img/slice/dancer-" + arr[i] + ".png";
            var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
            animation.addSpriteFrame(spriteFrame);

            (function (_i) {
                console.log(_i * delay);
                setTimeout(function () {
                    Util.playEffic("res/Buzzer.mp3");
                }, _i * delay*1000);
            })(i)
            
        }
        animation.setDelayPerUnit(delay);
        animation.setRestoreOriginalFrame(true);
        
        var a1 = cc.animate(animation);
        var a3 = cc.callFunc(function (d) {
            //action.getTarget().setSpriteFrame(animation.getFrames()[0].getSpriteFrame());
            cb(action.getTarget());
           
        });
        var action = cc.sequence(a1, a3);

        _this.$zombieLeader[0].runAction(action);
         
    },

 

    createDanceStep: function () { //领舞者创建连续不重复的舞步
        var danceStep = [];

        function randomStep() {
            var step = Math.random() * GLOBAL_DATA.danceKindNum | 0;
            return step;
        }

        function createStep(createIndex) {
            danceStep[createIndex] = randomStep();
            if (createIndex >= 1 && danceStep[createIndex] == danceStep[createIndex - 1]) { //连续2个舞步重复
                createStep(createIndex);
            } else {
                if (createIndex < (GLOBAL_DATA.beginDanceNum + GLOBAL_DATA.danceLevel - 1)) {
                    createStep(createIndex + 1);
                }
            }
        }

        createStep(0);
        GLOBAL_DATA.currentDance = danceStep.join("");
    },

    showCandleWithIdx: function (idx) {
        switch (idx) {
            case 6:
                $(this.gameLayer, "#Sprite_Gem_0")[0].visible = false;
                ; break;
            case 7:
                $(this.gameLayer, "#Sprite_Gem_1")[0].visible = false;
                ; break;
            case 8:
                $(this.gameLayer, "#Sprite_Gem_2")[0].visible = false;
                ; break;
            case 9:
                $(this.gameLayer, "#Sprite_Gem_3")[0].visible = false;
                ; break;
            default:
                $(this.gameLayer, "#zhuhuo_" + idx)[0].visible = true;
                ; break;
        }
 
    },

    lightBlink: function () {
        this.$light[0].stopAllActions();
        var a = cc.fadeIn(0.5);
        var a1 = cc.fadeOut(0.5);
        var seq = cc.sequence(a, a1);

        this.$light[0].runAction(cc.repeatForever(seq));
    },

    initDancePanel: function () {
        var _this = this;

        $(_this.gameLayer, "#Button_Dance_\\d").click(function (e) {
            if (!_this.dancePanelActive) {
                return false;
            }
            var str = this.getName().replace("Button_Dance_", "");
            console.log(str);

            var disDance = GLOBAL_DATA.currentDance[_this.currentDanceIndex];
            _this.$zombies.each(function (n, i) {
                i.initWithSpriteFrameName("img/slice/mummy-" + disDance + ".png");
             
            });
            _this.$player[0].initWithSpriteFrameName("img/slice/human-" + str + ".png");
 

            if (disDance == str) {
                
                _this.currentDanceIndex++;
                if (_this.currentDanceIndex >= GLOBAL_DATA.currentDance.length) {
                    _this.showCandleWithIdx(GLOBAL_DATA.danceLevel);
                    
                    GLOBAL_DATA.danceLevel++;
                    _this.createDanceStep();
                    _this.closeDancePanel();
                    _this.currentDanceIndex = 0;
                    _this.lightBlink();
                    Util.playEffic("res/bingo.mp3");

                    if (GLOBAL_DATA.danceLevel >= 9) {
                        cc.director.runScene(cc.TransitionFade.create(1, new WinScene()));
                        return;
                    }

                   
                    setTimeout(function () {
                        _this.showDancePanel();
                        _this.dancePanelActive = false;
                        setTimeout(function () {
                            _this.dancePanelActive = true;
                            _this.zombieLeaderDance(GLOBAL_DATA.currentDance, GLOBAL_DATA.danceDis - GLOBAL_DATA.danceDisRate * GLOBAL_DATA.danceLevel, function () {
                                _this.$light[0].stopAllActions();
                            });
                        }, 2000);
                    }, 1000);
                } else {
                    Util.playEffic("res/coin.mp3");
                }
            } else {
                _this.gameOver();
            }
        });

    },
    showDancePanel: function () {
        var _this = this;
        _this.sortPool = _.shuffle(_this.sortPool);
        var c = 0;
        $(_this.gameLayer, "#Button_Dance_\\d").each(function (n, i) {
            i.x = _this.sortPool[c];
            var a1 = cc.moveBy(0.2, cc.p(0, 200));
            setTimeout(function () {
                i.runAction(a1.clone());
            }, c * 100);
            c++;
        });
    },

    closeDancePanel: function () {
        var _this = this;
        var c = 0;
        $(_this.gameLayer, "#Button_Dance_\\d").each(function (n, i) {
            
            var a1 = cc.moveBy(0.2, cc.p(0, -200));
            setTimeout(function () {
                i.runAction(a1.clone());
            }, c * 100);
            c++;
             
        });  
    },

    onEnter: function () {
        this._super();
        GLOBAL_DATA.danceLevel = 0;
    }
});


