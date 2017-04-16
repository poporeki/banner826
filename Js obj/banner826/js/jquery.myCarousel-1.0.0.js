;
(function (win, callback, plug) {
    return callback(win.jQuery, plug);
})(window, function ($, plug) {

    var __DEFAULTS__ = {
        'speed': '1000',
        'timerSpeed': '5000',
        'calstyleNum': '0',
        'wrap': '.banner-wrapper',
        'bannerList': '.banner>li',
        'preBtn': '.prev',
        'nextBtn': '.next'
    }

    $.fn[plug] = function (options) {

        $.extend(this, __DEFAULTS__, options);
        var _self = this,
            $this = $(_self),
            _speed = this.speed,
            bList = this.bannerList,
            preBtn = this.preBtn,
            nextBtn = this.nextBtn,
            wrapper = this.wrap,
            _idx,
            _reidx;

        __STARTS._initPage($this, bList, _speed);
    }

    var __STARTS = {
        //页面载入 起始页执行动画
        _initPage: function ($this, bList, _speed) {
            //为起始添加class "active"
            $(bList).eq(0).addClass("active");
            $(bList).eq(0).stop(true, true).css({
                "left": "-100%"
            }).animate({
                "left": "0"
            }, _speed);
            return __STARTS._addTog($this, bList);
        },

        //添加换页按钮、翻页按钮
        _addTog: function ($this, bannerList) {
            //添加toggle-btns-list
            $this.wrapAll('<div class="banner-wrapper"></div>');
            var $wrap = $this.parent('.banner-wrapper');
            $wrap.append("<ol class='toggle-btns-list'></ol>");
            $tbList = $(".toggle-btns-list");
            //添加前后翻页按钮
            $wrap.append('<a href="##" class="prev icon-angle-left"></a>' +
                '<a href="##" class="next icon-angle-right"></a>');
            //添加换页按钮
            for (var i = 0; i < $(bannerList).length; i++) {
                $tbList.append("<li><a href='##'></a></li>");
            }
            return __STARTS._bindEvents($this,bannerList);
        },

        _autoPlay: function ($this) {
            setTimeout(function () {
                if ($bList.is(":animated")) return

            }, _speed);
        },
        _bindEvents: function ($this,bList) {
            var $nBtn = $this.parent('.banner-wrapper').find('.next');
            var $pBtn = $this.parent('.banner-wrapper').find('.prev');
            $nBtn.on('click', function () {
                return __STARTS._triggerEvents.nextPage();
            });
        },
        _triggerEvents: {
            nextPage : function () {
               return  __STARTS._funcAn.carouselStyle_horizontal._nP(bList,_reidx,_idx,_speed)
            }
        },
        _funcAn: {
            carouselStyle_horizontal : {
                _init: function () {

                },
                _nP: function (bList,_reidx,_idx,_speed) {
                    $(bList).eq(_reidx).stop(true, true).css({
                        "left": "0",
                        "height": "100%",
                        "top": "0"
                    }).animate({
                        "left": "100%",
                        "height": "50%",
                        "top": "27.5%"
                    }, _speed);
                    $(bList).eq(_idx).stop(true, true).css({
                        "left": "-100%",
                        "height": "50%",
                        "top": "27.5%"
                    }).animate({
                        "left": "0",
                        "height": "100%",
                        "top": "0"
                    }, _speed);
                    $(bList).eq(_reidx).removeClass("active");
                },
                _pP: function () {
                    $(bList).eq(_reidx).stop(true, true).css({
                        "left": "0",
                        "height": "100%",
                        "top": "0"
                    }).animate({
                        "left": "-100%",
                        "height": "50%",
                        "top": "27.5%"
                    }, _speed);
                    $(bList).eq(_idx).stop(true, true).css({
                        "left": "100%",
                        "height": "50%",
                        "top": "27.5%"
                    }).animate({
                        "left": "0",
                        "height": "100%",
                        "top": "0"
                    }, _speed);
                    $(bList).eq(_reidx).removeClass("active");
                }
            },

            /**
             * 垂直滚动
             * 
             */
            carouselStyle_vertical : {
                _init: function () {

                },
                _nP: function (bList,_reidx,_idx,_speed) {
                    $(bList).eq(_reidx).stop(true, true).css({
                        "top": "0",
                        "height": "100%",
                        "width": "100%"
                    }).animate({
                        "top": "100%",
                        "height": "50%",
                        "width": "50%"
                    }, _speed);
                    $(bList).eq(_idx).stop(true, true).css({
                        "top": "-100%",
                        "height": "50%",
                        "width": "50%"
                    }).animate({
                        "top": "0",
                        "height": "100%",
                        "twidth": "100%"
                    }, _speed);
                    $(bList).eq(_reidx).removeClass("active");
                },
                _pP: function () {
                    $(bList).eq(_reidx).stop(true, true).css({
                        "top": "0",
                        "height": "100%",
                        "width": "100%"
                    }).animate({
                        "top": "-100%",
                        "height": "50%",
                        "width": "50%"
                    }, _speed);
                    $(bList).eq(_idx).stop(true, true).css({
                        "top": "100%",
                        "height": "50%",
                        "width": "50%"
                    }).animate({
                        "top": "0",
                        "height": "100%",
                        "width": "100%"
                    }, _speed);
                    $(bList).eq(_reidx).removeClass("active");
                }
            }
        }
    }
}, "mycarousel");