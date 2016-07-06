
window.onload=updateTime(10);
function updateTime (end) {
	 // body...  
	 var time=new Date();

	 var hour=time.getHours();
	 var min=time.getMinutes();
	 var sec=time.getSeconds();
	 var clock=document.getElementsByTagName("span");
	 if (sec<10) {
	 	sec="0"+sec;
	 }
	 if (min<10) {
	 	min="0"+min;
	 }
	 if (hour<10) {
	 	hour="0"+hour;
	 }
	 
	clock[0].innerHTML=hour+":"+min+":"+sec;
	end=11;
	var h=setTimeout(updateTime, 1000); 

	 clock[1].innerHTML=end-h;
	if (end-h===0) {
		location.href="http://www.baidu.com";
	}
}