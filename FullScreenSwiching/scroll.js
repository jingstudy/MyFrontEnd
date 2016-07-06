(function() {
	var view=$('.view'),
	ul=view.find('ul'),
	li=ul.find('li'),
	li_len=li.length,
	width=view.width(),
	height=view.height();
	ul.css({
		'width':li_len*width+'px',
		'height':height+'px'
	});
	$(li).each(function(index){
		li.eq(index).css({
			'width':width+'px',
			'height':height+'px'
		});
	});
	var count=0;
	document.onclick=function(){
		count++;
		count=count%4;
		var flag;
		if(count<li_len){
			ul.css({
			'transition-timing-function':'linear',
			'transition-duration':'3s',
			'transform':'translateX(-'+count*width+'px)'
			});
			flag=count;
		}else{
			ul.css({
			'transition-timing-function':'linear',
			'transition-duration':'3s',
			'transform':'translateX('+(count%li_len-1)*width+'px)'
			});
			flag=count%li_len-1<0?1-count%li_len:count%li_len-1;
		}
		view.find('.pannel-nav').find('.active').attr('class','item');
		view.find('.pannel-nav').find('span').eq(flag).attr('class','active item');
	}
})()