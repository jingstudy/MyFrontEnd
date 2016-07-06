var getElementByClass=function(str){
	return document.getElementsByClassName(str)[0];
};
var moveImg=function(){
	var photo_container=getElementByClass("photo_list");
	if(photo_container){
		var ul=getElementByClass("scroll");
		var li_list=ul.getElementsByTagName("li");
		var li_len=li_list.length;
		var width=li_list[0].offsetWidth;
		var step=3*width;
		var speed=100;
		var scroll=function(){
			// var value=ul.offsetLeft-step;
			// if(value==-996){
			// 	for(var i=0;i<li_len-3;i++)
			// 		ul.appendChild(li_list[i]);
			// 	//ul.style.left="498px";
			// }else{
			// 	ul.style.left=value+"px";
			// }
			photo_container.scrollLeft+=10;
			if(photo_container.scrollLeft%width<=1){
				ul.appendChild(document.getElementsByTagName("li")[0]);
				photo_container.scrollLeft=0;
			}
			ul.style.width=width*li_len+"px";
			setTimeout(scroll, speed);
		};
		scroll();
	}
};
window.onload=function(){
	moveImg();
}
