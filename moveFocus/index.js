(function () {
	 /* body... */ 
	 var p=document.getElementById("pid");
	 var btn=document.getElementById("btn");
	 p.onclick=function(){
	 	btn.focus();
	 }
	 btn.onfocus=function () {
	 	 /* body... */ 
	 	 alert("按钮获得焦点");
	 }
})()