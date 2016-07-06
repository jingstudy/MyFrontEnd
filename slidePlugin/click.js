function getElementByClass(className) {
	 return document.getElementsByClassName(className)[0];
}
//获取某对象下的所有img元素
function getImgsInElement(ele,nodeName){
	var elem=[],
	imgs=ele.getElementsByTagName(nodeName);
	for(var i=0;i<imgs.length;i++)
		if(imgs[i]){
			elem.push(imgs[i]);
		}
	return elem;
}
(function(){
	var pre=getElementByClass("pre");
	var next=getElementByClass("next");
	pre.onclick=function(){
		var img_container=getElementByClass("img_wrapper"),
		imgs=getImgsInElement(img_container,"img");
		img_container.insertBefore(imgs[imgs.length-1],imgs[0]);
	};
	next.onclick=function(){
		var img_container=getElementByClass("img_wrapper"),
		imgs=getImgsInElement(img_container,"img");
		img_container.appendChild(imgs[0]);
	};
})()