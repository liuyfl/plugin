/*
**************
仿window弹窗放大缩小关闭拖拽双击全屏效果
*********2016-01-26*********
*/
;(function($){
	function getmaxzindex(){
		var max=0,obj=$('.wineffect');
		for(var i=0;i<obj.length;i++)
		{
			if(parseInt($(obj[i]).css('z-index'))>max)
				max=parseInt($(obj[i]).css('z-index'));
		}
		return max;
	}
	$.fn.lyfwin_effect=function(options){
		var that=this;
		var defaults={
			width:that.width()>400?that.width():'400',
			height:that.height()>300?that.height():'300',
			title:'win_effect',
		};
		var defaultoptions=$.extend({},defaults,options);
		defaultoptions['left']=that.offset().left;
		defaultoptions['top']=that.offset().top;
		defaultoptions['z-index']=parseInt(that.css('z-index'));
		defaultoptions['move']=false;
		defaultoptions['moveoptions']={};
		if($('.wineffect_minus_layer').length==0)
		{
			var layer='<div class="wineffect_minus_layer"></div>';
			$('body').append(layer);
		}
		var win_state=0,win_pre_state=false,minus_layer=false;
		var init=function(){
			var a  = '<div class="wineffect_tools"><span class="wineffect_title">'+defaultoptions['title']+'</span><div class="wineffect-tools">';
				a += '<span class="wineffect_tool wineffect-minus" data-target="minus" data-state="0"><img src="images/wineffect-tools-minus.png"></span>';
				a += '<span class="wineffect_tool wineffect-screen" data-target="screen" data-state="0"><img src="images/wineffect-tools-screen.png"></span>';
				a += '<span class="wineffect_tool wineffect-close" data-target="close" data-state="0"><img src="images/wineffect-tools-close.png"></span>';
				a += '</div></div>';
			that.addClass('wineffect');
			that.prepend(a);
			that.css('left',defaultoptions['left']+'px').css('top',defaultoptions['top']+'px');
		}
		init();
		that.on({
			mouseover:function(){
				var target=$(this).attr('data-target');
				if(target=='minus')
					$(this).find('img').attr('src','images/wineffect-tools-minus-hover.png');
				else if(target=='screen')
					$(this).find('img').attr('src','images/wineffect-tools-screen-hover.png');
				else if(target=='close')
					$(this).find('img').attr('src','images/wineffect-tools-close-hover.png');
			},
			mouseout:function(){
				var target=$(this).attr('data-target');
				if(target=='minus')
					$(this).find('img').attr('src','images/wineffect-tools-minus.png');
				else if(target=='screen')
					$(this).find('img').attr('src','images/wineffect-tools-screen.png');
				else if(target=='close')
					$(this).find('img').attr('src','images/wineffect-tools-close.png');
			}
		},'.wineffect_tool');
		that.on('click','.wineffect-minus',function(e){
			if(win_state==0||win_state==1)//normal->minus
			{
				if(win_state==1)
				{
					$('.wineffect').css('opacity','1');
				}
				that.addClass('wineffect-minus-animation').removeClass('wineffect-normal-animation');
				that.css('z-index',''+defaultoptions['z-index']+'');
				win_pre_state=win_state;
				win_state=-1;
				if(!minus_layer)
				{
					minus_layer=$('<div class="wineffect-minus-content">'+defaults['title']+'</div>');
					$('.wineffect_minus_layer').append(minus_layer[0]);
					minus_layer.bind('click',function(){
						$('.wineffect').css('z-index','inherit');
						if(win_state==-1)//minus->normal
						{
							if(win_pre_state==1)
							{
								$('.wineffect').css('opacity','0');
								that.css('opacity','1');
							}
							that.addClass('wineffect-normal-animation').removeClass('wineffect-minus-animation');
							that.css('z-index',''+getmaxzindex()+1+'');
							win_state=win_pre_state;
							win_pre_state=-1;
						}
						else if(win_state==0)//normal->minus
						{
							$('.wineffect').css('opacity','1');
							that.addClass('wineffect-minus-animation').removeClass('wineffect-normal-animation');
							that.css('z-index',''+defaultoptions['z-index']+'');
							win_state=-1;
							win_pre_state=0;
						}
						else if(win_state==1)//normal->minus
						{
							$('.wineffect').css('opacity','1');
							that.addClass('wineffect-minus-animation').removeClass('wineffect-normal-animation');
							that.css('z-index',''+defaultoptions['z-index']+'');
							win_state=-1;
							win_pre_state=1;
						}
					})
				}
			}
			if(e&&e.stopPropagation)
				e.stopPropagation();
			else
				window.event.cancelBubble=true;
		});
		that.on('click','.wineffect-screen',function(e){
			if(win_state==0)
			{
				$('.wineffect').css('opacity','0');
				that.css('width',window.innerWidth>$('body').width()?$('body').width()-6:window.innerWidth-6+'px')
					.css('height',window.innerHeight-$('.wineffect_minus_layer').height()-6+'px')
					.css('position','absolute').css('display','block')
					.css('top','0px').css('left','0px').css('opacity','1').css('z-index',''+getmaxzindex()+1+'');
				win_state=1;
				win_pre_state=0;
			}
			else if(win_state==1)
			{
				that.css('width',defaultoptions['width']+'px').css('height',defaultoptions['height']+'px').css('top',defaultoptions['top']+'px').css('left',defaultoptions['left']+'px').css('z-index',''+defaultoptions['z-index']+'');
				$('.wineffect').css('opacity','1');
				win_state=0;
				win_pre_state=1;
			}
			if(e&&e.stopPropagation)
				e.stopPropagation();
			else
				window.event.cancelBubble=true;
		});
		that.on('click','.wineffect-close',function(e){
			that.remove();
			if(minus_layer)
				minus_layer.remove();
			$('.wineffect').css('opacity','1');
			if(e&&e.stopPropagation)
				e.stopPropagation();
			else
				window.event.cancelBubble=true;
		});
		that.on({
			mousedown:function(e){
				defaultoptions['move']=true;
				var e=e||window.event;
				defaultoptions['moveoptions']['cx']=e.clientX-defaultoptions['left'];
				defaultoptions['moveoptions']['cy']=e.clientY-defaultoptions['top'];
				that.fadeTo(100,0.5);
			},
			mousemove:function(e){
				var e=e||window.event;
				if(defaultoptions['move'])
				{
					var x=e.clientX-defaultoptions['moveoptions']['cx'],
						y=e.clientY-defaultoptions['moveoptions']['cy'];
					that.css('left',x+'px').css('top',y+'px');
					defaultoptions['left']=x;
					defaultoptions['top']=y;
				}
			},
			mouseup:function(e){
				var e=e||window.event;
				defaultoptions['move']=false;
				that.fadeTo(100,1);
			}
		},'.wineffect_tools');
		that.on('dblclick','.wineffect_tools',function(e){
			that.find('.wineffect-screen').click();
		});
		$(window).resize(function(){
			if(win_state==1)
			{
				that.css('width',window.innerWidth-6+'px').css('height',window.innerHeight-$('.wineffect_minus_layer').height()-6+'px');
			}
		});
	}
})(jQuery);