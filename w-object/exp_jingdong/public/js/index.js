$(function () {

    cw_hover();
    my_cart_hover();
    getLeftMenu();
    carousel();
    newsTab();
    serviceTab();
});
//citylist
function cw_hover() {
    $(".dropdown").hover(function () {
        $(".cw", this).addClass("cw-hover");
        $(".dropdown-layer", this).show();
        load_cw_data();
    }, function () {
        $(".cw", this).removeClass("cw-hover");
        $(".dropdown-layer", this).hide();
    });
}
//加载城市列表
function load_cw_data() {
    var $lr = $(".navbar-header .dropdown .dropdown-layer");

    $.ajax({
        type: "get",
        url: "../data/cw-data.json",
        dataType: "json",
        beforeSend: function () {
            $lr.empty();
            $lr.append('<i style="display:block;' +
                'position:relative;' +
                'height:25px;width:25px;' +
                'margin:0 auto;' +
                'background:url(../images/index/loading.gif)"></i>');
        },
        error: function (e) {
            console.log(e);
        },
        success: function (data) {
            $lr.empty();
            if (data.data_name == "cityData") {
                console.log("成功");
            } else { return };
            $.each(data.data_content, function (key, val) {
                console.log(val.city_name);
                var addHtmls = '<div class="item">' +
                    '<a href="##" class="cn">' + val.city_name + '</a>' +
                    '</div>';
                $lr.append(addHtmls);
            });
        }
    });
}
//购物车
function my_cart_hover() {
    $(".my-cart").hover(function () {
        $(".word-icon", this).addClass("hover");
        $(".dropdown-layer", this).show();
    }, function () {
        $(".word-icon", this).removeClass("hover");
        $(".dropdown-layer", this).hide();
    });
}

//获取商品列表
function getLeftMenu() {
    $lm = $(".left-menu");
    $sm = $(".menu-content-extends");
    $.ajax({
        type: "get",
        url: "../data/menu-list-data.json",
        dataType: "json",
        async: false,
        error: function (e) {
            console.log(e);
        },
        success: function (data) {
            if (data.data_name == "left-menu") {
                console.log("成功");
            } else { return }
            //菜单内容
            $.each(data.data_content, function (key, val) {
                var addHtmls = '<li class="menu-items" data-index=' + val.menu_num + '></li>';
                $lm.find(".menu-content").append(addHtmls);
                //console.log(val.menu_num+'+'+this);
                $.each(val.menu_content, function (key, vals) {
                    //console.log(val.name);
                    console.log(val.menu_content.length);
                    if (key < val.menu_content.length - 1) {
                        $lm.find(".menu-items:last").append('<a href="' + vals.href + '" class="a-item">' + vals.name + '</a><span class="menu-line">/</span>');
                    } else {
                        $lm.find(".menu-items:last").append('<a href="' + vals.href + '" class="a-item">' + vals.name + '</a>');
                    }
                });
            });


            //二级菜单内容
            $.each(data.data_content, function (key, val) {
                if (!val.second_menu_content) { return }
                $.each(val.second_menu_content, function (key, vals) {
                    var addC = '<div id="item' + val.menu_num + '" class="item-wrap clearfix">' +
                        '<div class="details-cols-left">' +
                        '<div class="d-head"></div>' +
                        '<div class="details-items"></div>' +
                        '</div>' +
                        '<div class="details-cols-right">' +
                        '<div class="brand-img-up clearfix"></div>' +
                        '<div class="promotion-img"></div>' +
                        '</div>' +
                        '</div>';
                    $sm.append(addC);

                    if (vals.d_head_lk) {
                        $.each(vals.d_head_lk, function (key, lk) {
                            var addHtmls = '<a href="' + lk.href + '" class="details-lk">' + lk.name +
                                ' <i class="fa fa-angle-right details-lk-arrow"></i>' +
                                '</a>';
                            $sm.find(".details-cols-left:last").find(".d-head").append(addHtmls);
                        });
                    } else {
                        return console.log("null");
                    }
                    if (vals.d_body_items_lk) {
                        var $di = $(".details-items:last");
                        $.each(vals.d_body_items_lk, function (key, lk) {
                            var addHtmls = '<dl class="detail-item-dl">' +
                                '<dt class="tit"></dt>' +
                                '<dd class="con"></dd>' +
                                '</dl>';
                            $di.append(addHtmls);
                            if (lk.details_tit) {
                                $.each(lk.details_tit, function (key, dtl) {
                                    var addC = '<a href="' + dtl.href + '">' + dtl.name +
                                        '<i class="fa fa-angle-right details-lk-arrow"></i>' +
                                        '</a>'
                                    $di.find(".detail-item-dl:last").find(".tit").append(addC);
                                });
                            }
                            if (lk.details_items) {
                                $.each(lk.details_items, function (key, dis) {
                                    var addC = '<a href="' + dis.href + '">' + dis.name + '</a>';
                                    $di.find(".detail-item-dl:last").find(".con").append(addC);
                                });
                            }
                        });
                    } else {
                        return console.log("没有找到");
                    }
                    if (vals.d_img_lk) {
                        var $dcr = $(".details-cols-right:last");
                        $.each(vals.d_img_lk, function (key, lk) {
                            if (lk.brand_lk) {
                                $.each(lk.brand_lk, function (key, blk) {
                                    var addC = '<a href="' + blk.href + '" class="brand-lk">' +
                                        '<img src="' + blk.img_src + '">' +
                                        '</a>';
                                    $dcr.find(".brand-img-up:last").append(addC);
                                });
                            }
                            if (lk.promotion_lk) {
                                $.each(lk.promotion_lk, function (key, plk) {
                                    var addC = '<a href="' + plk.href + '" class="promotion-lk">' +
                                        '<img src="' + plk.img_src + '">' +
                                        '</a>';
                                    $dcr.find(".promotion-img:last").append(addC);
                                });
                            }
                        });
                    } else {
                        return console.log("没有找到")
                    }
                });
            });

        }
    });

    controlMenu();
}

//二级菜单
function controlMenu() {
    $lm = $(".left-menu");
    $miLi = $lm.find(".menu-content").find(".menu-items");
    $mce = $lm.find(".menu-content-extends");
    $iw = $mce.find(".item-wrap");
    if (!$miLi.length == $iw.length) { return }
    var idx = "";
    var reidx = "";
    /*鼠标移入 */
    $miLi.mouseenter(function () {
        $(this).addClass("hover").siblings().removeClass("hover");
        idx = $(this).index();
        $iw.eq(idx).addClass("false");
        $iw.eq(idx).css({ "display": "block" }).siblings().css({ "display": "none" });
        /*鼠标移出*/
        $(this).mouseleave(function () {
            reidx = idx;
            setTimeout(function () {
                if ($iw.eq(reidx).hasClass("false")) {
                    $miLi.eq(reidx).removeClass("hover");
                    $iw.eq(reidx).css({ "display": "none" });
                } else (console.log("不是"));
                reidx = "";
            }, 1);
        });
    });

    // $miLi.eq(idx).mouseout(function () {
    //     reidx = idx;
    //     setTimeout(function () {
    //         if ($iw.eq(reidx).hasClass("false")) {
    //             $miLi.eq(reidx).removeClass("hover");
    //             $iw.eq(reidx).css({ "display": "none" });
    //         } else (console.log("不是"));
    //         reidx = "";
    //     }, 1);
    // });
    $iw.hover(function () {
        idx = $(this).index();
        $iw.eq(idx).removeClass("false");
    }, function () {
        $miLi.eq(idx).removeClass("hover");
        $iw.eq(idx).css({ "display": "none" });
    });
}

function carousel() {
    var $cb = $(".carousel-block");
    var $cbImg = $cb.find(">img");
    var _arrImgcon = [];
    var addc = '<ul class="ul-wrap"></ul>' +
        '<div class="car-tips-wrap"></div>' +
        '<div class="car-arrow">' +
        '<a href="##" id="left-arr"><i class="fa fa-angle-left"></i></a>' +
        '<a href="##" id="right-arr"><i class="fa fa-angle-right"></i></a>' +
        '</div>';
    $cb.append(addc);
    $.each($cbImg, function (key, val) {
        _arrImgcon.push(val);
    });
    $cbImg.remove();
    var $wrap = $(".ul-wrap");
    var $tips = $(".car-tips-wrap");
    var $ca = $(".car-arrow");
    for (var i = 0; i < _arrImgcon.length; i++) {
        var addc = '<li>' +
            '<a href="' + $(_arrImgcon[i]).attr("src") + '">' +
            '<img src="' + $(_arrImgcon[i]).attr("src") + '" alt="' + $(_arrImgcon[i]).attr("alt") + '">' + $(_arrImgcon[i]).attr("alt") +
            '</a>' +
            '</li>';
        var addc2 = '<i class="car-tips"></i>';
        $wrap.append(addc);
        $tips.append(addc2);
    }
    var $li = $wrap.find('li');
    var $t = $tips.find('i');
    var idx = 0,
        reidx = idx,
        _speed = 500,
        _timSpd = 2000;
    var aniTime = setInterval(function () {
        animate();
    }, _timSpd);


    function animate() {
        if ($li.is(":animated")) {
            return
        }
        if (idx == $li.length) { idx = 0 }
        $li.eq(idx).fadeIn(_speed).siblings().fadeOut(_speed);
        $t.eq(idx).addClass('tips-active').siblings().removeClass('tips-active');
        idx++;
    }
    $tips.hover(function () {
        clearInterval(aniTime);
    }, function () {
        aniTime = setInterval(function () {
            animate();
        }, _timSpd);
    });
    $ca.find("a").hover(function () {
        clearInterval(aniTime);
    }, function () {
        aniTime = setInterval(function () {
            animate();
        }, _timSpd);
    });
    $t.hover(function () {
        var thisidx = $(this).index();
        $t.eq(thisidx).addClass('tips-active').siblings().removeClass('tips-active');
        if ($li.is(":animated")) {
            return
        }
        thisidx = $(this).index();
        $li.eq(thisidx).fadeIn(_speed).siblings().fadeOut(_speed);
    });

    $ca.find("a").on('click', function () {
        if ($(this).attr('id') == 'left-arr') {
            if (idx == 0) { idx = $li.length }
            idx--;
            $li.eq(idx).fadeIn(_speed).siblings().fadeOut(_speed);
            $t.eq(idx).addClass('tips-active').siblings().removeClass('tips-active');
        }
        if ($(this).attr('id') == 'right-arr') {
            if (idx == $li.length) { idx = 0 }
            idx++;
            $li.eq(idx).fadeIn(_speed).siblings().fadeOut(_speed);
            $t.eq(idx).addClass('tips-active').siblings().removeClass('tips-active');
        }
    });

}


function newsTab() {
    var $tHd = $('.news-tab .tab-head'),
        $tHdItems = $tHd.find('.tab-head-item'),
        $tBar = $('.news-tab .tab-head .tab-sidebar'),
        $tCnt = $('.news-tab .tab-content'),
        $nLists = $tCnt.find('.news-list'),
        $li = $nLists.find('news-item');
    /*判断标签数量和内容数量是否相等*/
    if ($tHdItems.length != $nLists.length) return console.log($tHdItems.length + "!=" + $nLists.length);
    $nLists.eq(0).siblings().hide();/*隐藏非第一个标签内容 */
    /*给标签添加hover事件*/
    $tHdItems.hover(function () {
        var _lth = $(this).index();
        /*显示标签索引的内容 */
        $nLists.eq(_lth).show().siblings().hide();
        if (_lth == 1) {
            $tBar.css({ 'left': 52 });
        } else {
            $tBar.css({ 'left': -2 });
        }
    });
}

function serviceTab() {
    var $service = $('.service'),
        $sEntry = $service.find('.service-entry'),
        $sContent = $service.find(".service-content"),
        $closeBtn = $sContent.find('#close_btn'),
        $sList = $sEntry.find('.service-list'),
        $sTHItem = $sList.find('.tab-head-item'),
        $sTCItem = $sContent.find('.tab-content-item'),
        $sLk = $sTHItem.find('.service-lk');


    $sTHItem.on('mouseenter', function () {
        var $this = $(this);
        var _idx = $(this).index();

        var $txt = $this.find('.service-txt');
        var $sibTxt = $this.siblings().find('.service-txt');
        $this.addClass('extends').siblings().removeClass('extends');
        $txt.css({ 'border-top': '2px solid #e01121' });
        $sibTxt.css({ 'border-top': '2px solid #fff' });
        $sLk.css({ 'transform': 'translate3d(0,-38px,0)' });
        $sContent.css({ 'top': '24px' });
        $sTCItem.eq(_idx).css({ 'display': 'block' }).siblings('div').css({ 'display': 'none' });


    });

    $closeBtn.on('click', function () {
        for (var i = 0; i < $sTHItem.length; i++) {
            var $target = $sTHItem.eq(i);
            if ($target.hasClass('extends')) {

                $target.removeClass('extends');
                var $txt = $target.find('.service-txt');
                $txt.css({ 'border-top': '2px solid #fff' });
                $sLk.css({ 'transform': 'translate3d(0,0,0)' });
                $sContent.css({ 'top': '210px' });
                var addLayer = '<div class="service-item-layer"></div>';
                $sTHItem.parent().append(addLayer);
                var $sitem_layer = $sList.find('.service-item-layer');
                $sitem_layer.on('mouseleave', function () {
                    $(this).remove();
                });
            }
        }
    });

}

