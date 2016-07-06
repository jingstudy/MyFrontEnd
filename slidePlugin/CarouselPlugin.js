function slider(options){
	this.options=this.extends(this.defaultOptions,options||{});
	this.init();
}
slider.prototype={
	defaultOptions:{
		index:'1',//从第1张图片开始轮播，索引从0开始，0为最后一张附图
		id:'1',
		selectors:{
			pannel:'pannel',
			pannel_ul:'pannel_ul',
			item:'item',
			btns:'btns',
			btn:'btn',
			btnId:{
				btn1:'1',
				btn2:'2',
				btn3:'3',
				btn4:'4'
			},
			active:'active',
			arrow:'arrow',
			aId:{
				pre:'pre',
				next:'next'
			}
		},
		interval:4000, //自动轮播间隔，单位ms
		step:70,  //滑动步长
		duration:100   //轮播动画的刷新时间
	},
	init:function(){
		this.addLiElement();
		this.setUlWidth();
		this.changeBtnColor(this.options.selectors.btnId['btn'+this.options.index]);
		this.bindAEvent();
		this.bindBtnEvent();
		this.autoSlide();
	},
	extends:function(defaultObject,userObject){
		for (var prop in userObject) {
			if(userObject[prop].toString()==='[object Object]'){
				for (var subProp in userObject[prop]) {
					defaultObject[prop][subProp]=userObject[prop][subProp];
				}
				continue;
			}
			defaultObject[prop]=userObject[prop];
		}
		return defaultObject;
	},
	getElesByClass:function(parent,className){
		var parent=parent||document;
		return parent.getElementsByClassName(className);
	},
	getEleById:function(id){
		return document.getElementById(id);
	},
	changeBtnColor:function(id){
		var btn_active=this.getEleById(id);
		var active=this.options.selectors.btn+" "+this.options.selectors.active;
		btn_active.className=active;
	},
	resetBtnColor:function(){
		var id=Math.abs(this.left/this.imgWidth);
		this.getEleById(id).className='btn';
	},
	//设置ul宽度、高度、left及position属性，使图片无缝横向连接
	//此时，已经加入了两张附图，因索引为0的图为最后一张附图，故left要设为负值
	setUlWidth:function(){
		var pannel=this.getElesByClass(null,this.options.selectors.pannel)[0],
			width=pannel.offsetWidth,
			height=pannel.offsetHeight,
			ul=this.getElesByClass(pannel,this.options.selectors.pannel_ul)[0],
			li_nums=this.getElesByClass(ul,this.options.selectors.item).length;
		
		ul.style.cssText='width:'+li_nums*width+"px;height:"+height
		+'px;position:relative;left:-'+this.options.index*width+'px';
	
	//将ul宽度、每幅图宽度、ul对象存储，后面频繁的用到	
		this.ulWidth=width*li_nums;  
		this.imgWidth=width;
		this.ul=ul;
		this.left=-this.options.index*width;
	},
	//ul中添加第一幅图与最后一幅图的附图，以完成无限滚动
	addLiElement:function(){
		var ul=this.getElesByClass(null,this.options.selectors.pannel_ul)[0],
			lis=this.getElesByClass(ul,this.options.selectors.item),
			brief_first=lis[0].cloneNode(true),  //第一图片附图
			brief_last=lis[lis.length-1].cloneNode(true); //最后一张图片附图
		
		ul.insertBefore(brief_last, lis[0]);
		ul.appendChild(brief_first);

		this.li_len=lis.length;  //加上附图后li的数量：即图片的个数+2
	},
	//dir为ul的滑动方向，左为-1，右为1,distance为滑动的距离
	slideToPos:function(dir,distance){
		var me=this;
		var	status=me.left+dir*distance;  //目标图像位置
		var locationHandle=function(){   //特殊位置处理
			//最后一张图的附图（索引0）滑动完成时，重设至最后一张（索引me.li_len-2）
			if(me.left==0){
				me.ul.style.left='-'+(me.li_len-2)*me.imgWidth+'px';
				me.left=parseInt(me.ul.style.left);
				me.changeBtnColor(Math.abs(me.left/me.imgWidth));
				return;
			}
			//第一张的附图（索引me.li_len-1）滑动完成时，重设至第一张(索引1)
			if(me.left==me.imgWidth-me.ulWidth){
				me.ul.style.left='-'+me.imgWidth+'px';
				me.left=parseInt(me.ul.style.left);
				me.changeBtnColor(Math.abs(me.left/me.imgWidth));
				return;
			}
		};
		var move=function(){
			//达到一个图片距离移动的次数就停止
			me.ul.style.left=parseInt(me.ul.style.left)+dir*me.options.step+'px';
			me.left=parseInt(me.ul.style.left);
			//判断是否已移动至目标
			if(dir==1){  
				me.ul.style.left=me.left>=status?status+'px':me.ul.style.left;
				if(me.left>=status){
					me.left=status;
					clearInterval(flag);
					locationHandle();
					me.changeBtnColor(Math.abs(me.left/me.imgWidth));
				}
			}else{
				me.ul.style.left=me.left<=status?status+'px':me.ul.style.left;
				if(me.left<=status){
					me.left=status;
					clearInterval(flag);
					locationHandle();
					me.changeBtnColor(Math.abs(me.left/me.imgWidth));
				}
			}
		};
		var flag=setInterval(move, this.options.duration);
	},
	bindAEvent:function(){
		var pre=this.getEleById(this.options.selectors.aId.pre);
		var next=this.getEleById(this.options.selectors.aId.next);
		var me=this;
		pre.onclick=function(){
			me.resetBtnColor();
			me.slideToPos(1,me.imgWidth);
		}
		next.onclick=function(){
			me.resetBtnColor();
			me.slideToPos(-1,me.imgWidth);
		}
	},
	bindBtnEvent:function(){
		var me=this;
		var btns=me.getElesByClass(null,me.options.selectors.btns)[0];
		var btn_list=me.getElesByClass(btns,me.options.selectors.btn);
		var clickMoveToPos=function(id){
			//alert('id='+id+";type="+typeof(id));
			var num=parseInt(id);
			var end=-num*me.imgWidth;   //目标元素的位置
			if(me.left<end){
				me.resetBtnColor();
				me.slideToPos(1,end-me.left);//ul向右滑动
			}else{
				me.resetBtnColor();
				me.slideToPos(-1,me.left-end);//ul向左滑动
			}
		};
		for(var i=0;i<btn_list.length;i++){
			btn_list[i].onclick=function(e){
				clickMoveToPos(this.id);
			}
		}
	},
	autoSlide:function(){
		var me=this;
		var auto=function(){
			me.resetBtnColor();
			me.slideToPos(-1,me.imgWidth);
		};
		setInterval(auto, me.options.interval);
	}
}