/**
 * 选项卡
 * 功能：选项卡切换{
 *                  普通
 *                  animate方法左右切换
 *                }
 * 结构：.tab-panel
 *          .tab-head-item
 *          .tab-head-item
 *      .tab-content-panel
 *          .tab-content-item
 *          .tab-content-item
 */



;
(function($){
    var __DEFAULT__={                                           /*默认参数 */
                headPanel:'.tab-panel',                         /*标题wrap */
                headItem:'.tab-head-item',                      /*选项卡标题 */
                contentPanel:'.tab-content-panel',              /*内容页wrap */
                contentItem:'.tab-content-item',                /*选项卡内容 */
                _speed:200,
                direction:'left'                                /*速度 */
            }
    $.fn.extend({

        /*普通切换 */
        'tabs':function(options){
            var option=$.extend({},__DEFAULT__,options);
            var $tHead=$(option.headPanel,this),
                $tContent=$(option.contentPanel,this),
                $thItem=$(option.headItem,$tHead),
                $tcItem=$(option.contentItem,$tContent);
            if(!$thItem==$tcItem) return console.log('!=');
            $tcItem.eq(0).siblings().css({'display':'none'});
            $thItem.on('mouseover',function(){
                var _idx=$(this).index();
                $tcItem.eq(_idx).css({'display':'block'})
                       .siblings().css({'display':'none'});
                $(this).addClass('clicked')
                       .siblings().removeClass('clicked');
            });
            return this;
        },

        /*横向移动切换 */
        'animateTabs':function(options){
            var option=$.extend({},__DEFAULT__,options);
            var $tHead=$(option.headPanel,this),
                $tContent=$(option.contentPanel,this),
                $thItem=$(option.headItem,$tHead),
                $tcItem=$(option.contentItem,$tContent);
                _dir=option.direction;
            if(!$thItem==$tcItem) return console.log('!=');
            $tContent.wrapAll('<div class="content-wrapper"></div');
            var _wid=0,
                _idx=0,
                _speed=option._speed,
                _awid=$tcItem.width();          
            $.each($tcItem,function(){
                _wid+=$(this).width();
            });
            $tContent.width(_wid);
            /*鼠标移入 */
            $thItem.on('mouseenter',function(){
                if($tContent.is(':animated')) return;
                var _nidx=$(this).index(),
                    _twid=parseFloat($tContent.css(_dir));
                $(this).addClass('clicked')
                       .siblings().removeClass('clicked');
                if(_nidx!=0){
                    if(_nidx>_idx||_nidx<_idx){
                        var _ix=_nidx-_idx;
                        $tContent.animate({'left':_twid-_awid*_ix},_speed);
                        _idx=_nidx;
                        return
                    }  
                }else if(_nidx==0){
                    $tContent.animate({'left':_nidx},_speed);
                    _idx=_nidx;
                    return
                }
            });
            return this;
        }
        
    });
})(jQuery);