(function() {
	var canvas=document.getElementById("canvas");
	var timeid;  //定时器ID，用于结束时清楚定时器
	if(!canvas.getContext){
		alert("您的浏览器不支持canvas！");
		return;
	}
	var context=canvas.getContext("2d");
	var width=parseInt(canvas.width);
	var height=parseInt(canvas.height);
	
	//不同方对应坐标的增减向
	var dir={
		top:[0,-1],
		bottom:[0,1],
		left:[-1,0],
		right:[1,0]
	};
	var snake={
		length:4,
		body:[[0,0],[1,0],[2,0],[3,0]],
		direction:dir.right,   //默认向右走
		foodPos:[],  //食物初始位置
		size:20,        //身体每一块大小
		score:0,       //游戏得分
		scoreRate:0, //每吃一次食物得分
		interval:500,   //刷新间隔
		init:function(){
			context.fillStyle="#fff";
			context.strokeStyle="#333";
			for(var i=0;i<this.length;i++){
				context.fillRect(this.body[i][0]*this.size,this.body[i][1]*this.size,this.size,this.size);
				context.strokeRect(this.body[i][0]*this.size,this.body[i][1]*this.size,this.size,this.size);
			}
			context.fillRect(this.foodPos[0]*this.size,this.foodPos[1]*this.size,this.size,this.size);
		},
		//每次头部加上方向代码，将上次坐标赋值给身体下一节
		go:function(){
			var len=this.length,curx=this.body[len-1][0],
				cury=this.body[len-1][1],
				prex=0,prey=0;
			//头部的新位置
			this.body[len-1][0]+=this.direction[0];
			this.body[len-1][1]+=this.direction[1];
			for(var i=len-2;i>-1;i--){
				prex=this.body[i][0];
				prey=this.body[i][1];
				this.body[i][0]=curx;
				this.body[i][1]=cury;
				curx=prex;
				cury=prey;
			}
		},
		//头部坐标与食物坐标相同即吃到食物
		eatFood:function(){
			if(this.body[this.length-1][0]===this.foodPos[0]&&
				this.body[this.length-1][1]===this.foodPos[1]){
					this.length++;
					this.body.unshift([this.body[0][0],this.body[0][1]]);
					this.score+=this.scoreRate;
					this.createFood();
					document.getElementById("score").value=this.score;
			}
		},
		//食物不能在蛇身上
		createFood:function(){
			var x=Math.round((Math.random()*(width/this.size-1)+Math.random()*(width/this.size-1))/2);
			var y=Math.round((Math.random()*(height/this.size-1)+Math.random()*(height/this.size-1))/2);
			for(var i=this.length-1;i>-1;i--){
				if(this.body[i][0]===x&&this.body[i][1]===y) 
					this.createFood();
			}
			this.foodPos=[x,y];
		},
		isStop:function(){
			//判断是否超出边界
			if(this.body[this.length-1][0]<0||this.body[this.length-1][1]<0
				||this.body[this.length-1][0]>(width/this.size-1)||	
				this.body[this.length-1][1]>(height/this.size-1)){
				return true;
			}
			//判断头部是否撞上身体
			var len=this.length;
			for(var i=0;i<len-1;i++){
				if(this.body[i][0]==this.body[len-1][0]&&
					this.body[i][1]==this.body[len-1][1])
					return true;
			}
			return false;
		},
		loop:function(){
			var snk=this;
			var fn=function(){
				snk.go();
				if(snk.isStop()){
					clearTimeout(timeid);
					//clearInterval(timeid);
					document.getElementsByClassName("gameover")[0].innerHTML="gameover,<a href='snake.html'>再试一次</a>,加油^_^";
					return;
				}
				context.clearRect(0,0,width,height);
				snk.init();
				snk.eatFood();
				timeid=setTimeout(fn,snk.interval);
			};
			fn();
			//timeid=setInterval(fn, snk.interval);
		}
	};
	var changeDirection=function(event){
		switch(event.keyCode){
			case 37:
				if(snake.direction!==dir.right)
					snake.direction=dir.left;
				break;
			case 38:
				if(snake.direction!==dir.bottom)
					snake.direction=dir.top;
				break;
			case 39:
				if(snake.direction!==dir.left)
					snake.direction=dir.right;
				break;
			case 40:
				if(snake.direction!==dir.top)
					snake.direction=dir.bottom;
				break;
		}
	};
	var start=function(){
		snake.interval=parseInt(document.getElementById("speed").value);
		snake.scoreRate=(function(){
			switch(snake.interval) {
				case 500:
					return 10;
				case 200:
					return 20;
				case 100:
					return 30;
			}
		})();
		snake.createFood();
		snake.init();
		snake.loop();
	};
	document.addEventListener("keydown", changeDirection);
	document.getElementById("start").addEventListener("click",start);
})()
