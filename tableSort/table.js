(function init () {
	 var table=document.getElementsByTagName("table")[0];
	 var tr=table.tBodies[0].getElementsByTagName("tr");
	 var th=table.tHead.getElementsByTagName("th");
	 var td=table.tBodies[0].getElementsByTagName("td");
	 var tr_len=tr.length;
	 var td_len=td.length;
	 var th_len=th.length;
	
	 for (var i = 0; i < th_len; i++) {
	 	(function(i){   //使表头中的th可点击并绑定事件
	 		th[i].onclick=function(){
	 			sortTable(i);
	 		}
	 	})(i)	
	 }
	/*************使每个td项可编辑***************/
	 for (var i = 0; i < td_len; i++) {
	 	(function(i){
	 		td[i].onclick=function(){
	 			//背景色变白在css中已设置
	 			td[i].contentEditable="true";
	 		}
	 	})(i)
	 }
	 /***********被点击的tr改变背景色***********/
	for (var i = 0; i < tr_len; i++) {
		(function(i){
            tr[i].onclick=function(){
            	removeColor();
            	this.style.backgroundColor="#87CEFA";
            }
		})(i)
	}
	/*************tr被点击，变色之前重置颜色****************/
	function removeColor(){
		for (var i = 0; i < tr_len; i++) {
			if (i%2==0) {
				(function(i){
                    tr[i].style.backgroundColor="#f4f4f4";
				})(i)
			}else {
				(function(i){
                    tr[i].style.backgroundColor="white";
				})(i)
			}
		}
	}
	/**************点击th，对其进行排序（字母表顺序或比较函数）***************/
	function sortTable(n){
		 var rows=Array.prototype.slice.call(nowtrList,0);
		 sortRows();
		 function sortRows(){
		 	rows.sort(function(row1,row2){
		 		var cell1=row1.getElementsByTagName("td")[n];
		 		var cell2=row2.getElementsByTagName("td")[n];
		 		var text1=cell1.textContent;
		 		var text2=cell2.textContent;
		 
		 		if (text1<text2)  return -1;
		 		if(text1>text2)   return 1;
		 		else  return 0;
		 	});
		 	for (var i = 0; i < rows.length; i++) {
		 		table.tBodies[0].appendChild(rows[i]);
		 	}
		 }
	}
})()