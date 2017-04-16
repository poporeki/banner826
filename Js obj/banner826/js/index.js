$(function () {
	//定义变量
	var
		$bannerList = $("#banner>li"),
		$wrap = $(".banner-wrapper"),
		$tbList = "",/*页切换按钮*/
		$tbListLi = "",
		$pBtn,/*上一页*/
		$nBtn,/*下一页*/
		_pw,
		_nw,
		_speed = 1000,/*动画速度*/
		_idx = 0,/*当前页码*/
		_reidx = 0,/*上一页码*/
		_timer = null,/*初始化定时器*/
		_sTim = null,
		_timerSpeed = 5000,/*轮播时间*/
		_calstyleNum = 0,/*轮播动画样式*/
		$funcTips = {},
		$funcAn = {};/*动画效果 */


	$funcTips.changeToggleBtn = function () {/*为当前页对应的togglebtn添加样式*/
		$tbListLi.eq(_idx)
			.addClass("clicked-tog")
			.siblings().removeClass("clicked-tog");
	}
	//初始化默认页
	$bannerList.eq(0).addClass("active");/*为默认页添加class "active"*/
	$bannerList.eq(0).stop(true, true).css({
		"left": "-100%",
	}).animate({
		"left": "0",
	}, _speed);


	//添加toggle-btns-list
	$wrap.append("<ol class='toggle-btns-list'></ol>");
	$tbList = $(".toggle-btns-list");

	//添加前后翻页按钮
	$wrap.append('<a href="##" class="prev icon-angle-left"></a>' +
							'<a href="##" class="next icon-angle-right"></a>');
	for (var i = 0; i < $bannerList.length; i++) {/*添加换页按钮*/
		$tbList.append("<li><a href='##'></a></li>");
	}
	$pBtn = $(".prev");
	$nBtn = $(".next");
	$tbListLi = $(".toggle-btns-list li");
	_pw = $pBtn.width();
	_nw = $nBtn.width();
	$pBtn.css({ "left": -_pw });
	$nBtn.css({ "right": -_nw });

	btnHover();
	$funcTips.changeToggleBtn();/*为当前页对应的togglebtn添加样式*/
	console.log($bannerList.length);/*输出banner索引*/
	_timer = setInterval(autoPlay, _timerSpeed);/*创建定时器 *autoPlay 轮播事件 *_timerSpeed 时间*/
	//向前按钮单击
	$pBtn.click(function () {
		if ($bannerList.is(":animated")) { return }/*判断$bannerList是否在动画状态*/
		clearInterval(_timer);/*清除_timer定时器*/
		_idx--;
		if (_idx < 0) {
			_idx = $bannerList.length - 1;
		}
		$bannerList.eq(_idx).addClass("active");
		$funcTips.changeToggleBtn();/*为当前页对应的togglebtn添加样式*/
		prevPage(_calstyleNum);
		_timer = setInterval(autoPlay, _timerSpeed);
		return _reidx = _idx;
	});
	//向后按钮单击事件
	$nBtn.click(function () {
		if ($bannerList.is(":animated")) { return }
		clearInterval(_timer);//清除定时器
		_idx++;/*自加*/
		if (_idx > $bannerList.length - 1) {/*判断_idx值是否大于图片数量*/
			_idx = 0;
		}
		$bannerList.eq(_idx).addClass("active");/*为当前显示的li添加类名 active*/
		$funcTips.changeToggleBtn();/*为当前页对应的togglebtn添加样式*/
		nextPage(_calstyleNum);
		_timer = setInterval(autoPlay, _timerSpeed);
		return _reidx = _idx;
	});
	//页码单击
	function tblistClick($tbListLi) {
		$tbListLi.click(function () {
			if ($bannerList.is(":animated")) { return }
			var $thisParent = $(this).parent();
			if ($thisParent.hasClass("clicked")) {
				return
			} else {
				$thisParent.addClass('clicked');
				setTimeout(function () {
					$thisParent.removeClass('clicked');
				}, _speed);
			}
			if (!$tbListLi.length == $bannerList.length) { return }
			_idx = $(this).index();
			$funcTips.changeToggleBtn();/*为当前页对应的togglebtn添加样式*/
			if (_idx > _reidx) {
				nextPage(_calstyleNum);
			} else if (_idx < _reidx) {
				prevPage(_calstyleNum);
			}
			return _reidx = _idx;
		});
	}
	//页码hover
	$tbListLi.hover(function () {
		/*移除轮播定时器*/
		tblistClick($(this));
		clearInterval(_timer);
		clearTimeout(_sTim);
	}, function () {
		/*鼠标移出后执行轮播*/
		_sTim = setTimeout(function () {
			autoPlay();
		}, _timerSpeed / 2);
	});
	//轮播 按下一页方向
	function autoPlay() {
		$nBtn.click();
	}
	//移至前一页
	function prevPage(num) {
		$funcAn.carouselStyle_horizontal._prevPage();
	}
	//移至后一页
	function nextPage(num) {

		$funcAn.carouselStyle_horizontal._nextPage();
	}

	/*$funcAnimate = {
		carouselStyle_horizontal: function () {
			
			console.log(_nextPage);
		}
	}*/
	/*水平滚动 */
	$funcAn.carouselStyle_horizontal = {
		_init: function () {

		},
		_nextPage: function () {
			$bannerList.eq(_reidx).stop(true, true).css({
				"left": "0",
				"height": "100%",
				"top": "0"
			}).animate({
				"left": "100%",
				"height": "50%",
				"top": "27.5%"
			}, _speed);
			$bannerList.eq(_idx).stop(true, true).css({
				"left": "-100%",
				"height": "50%",
				"top": "27.5%"
			}).animate({
				"left": "0",
				"height": "100%",
				"top": "0"
			}, _speed);
			$bannerList.eq(_reidx).removeClass("active");
		},
		_prevPage: function () {
			$bannerList.eq(_reidx).stop(true, true).css({
				"left": "0",
				"height": "100%",
				"top": "0"
			}).animate({
				"left": "-100%",
				"height": "50%",
				"top": "27.5%"
			}, _speed);
			$bannerList.eq(_idx).stop(true, true).css({
				"left": "100%",
				"height": "50%",
				"top": "27.5%"
			}).animate({
				"left": "0",
				"height": "100%",
				"top": "0"
			}, _speed);
			$bannerList.eq(_reidx).removeClass("active");
		}
	}

	/**
	 * 垂直滚动
	 * 
	 */
	$funcAn.carouselStyle_vertical = {
		_init: function () {

		},
		_nextPage: function () {
			$bannerList.eq(_reidx).stop(true, true).css({
				"top": "0",
				"height": "100%",
				"width": "100%"
			}).animate({
				"top": "100%",
				"height": "50%",
				"width": "50%"
			}, _speed);
			$bannerList.eq(_idx).stop(true, true).css({
				"top": "-100%",
				"height": "50%",
				"width": "50%"
			}).animate({
				"top": "0",
				"height": "100%",
				"twidth": "100%"
			}, _speed);
			$bannerList.eq(_reidx).removeClass("active");
		},
		_prevPage: function () {
			$bannerList.eq(_reidx).stop(true, true).css({
				"top": "0",
				"height": "100%",
				"width": "100%"
			}).animate({
				"top": "-100%",
				"height": "50%",
				"width": "50%"
			}, _speed);
			$bannerList.eq(_idx).stop(true, true).css({
				"top": "100%",
				"height": "50%",
				"width": "50%"
			}).animate({
				"top": "0",
				"height": "100%",
				"width": "100%"
			}, _speed);
			$bannerList.eq(_reidx).removeClass("active");
		}
	}

	/**
	 * 初始化页面
	 * 
	 * @param {any} nums 动画样式
	 */
	function init_idx(nums, bl) {


	}
	function btnHover() {
		$wrap.hover(function () {
			$pBtn.css({ "left": +_pw });
			$nBtn.css({ "right": +_nw });
		}, function () {
			$pBtn.css({ "left": -_pw });
			$nBtn.css({ "right": -_nw });
		});
	}

});