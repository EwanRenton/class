var userID = 0;
$(function(){
	$("#warm").html('');
	$("#denglu").click(function(){
		var d = $("#loading").serialize();
 		
		$.ajax({
			url:"./php/ajax/login.php",
			type:"POST",
			dataType:"json",
			data:d,
			cache:false,
			error:errorFunction,
			success:successFunction
		}
		);	
		
		function errorFunction(){
			// alert("232");
			$("#warm").html("</br>"+"*1请求错误");
		}
		function successFunction(data){
			var data = parseInt(data);
			if(data==1){
				$("#warm").html("*用户名错误");
				return false;
			}
			if(data==2){
				$("#warm").html("*密码错误");
				return false;
			}if(data==0){
				window.location.href="index.html";
			}
		}
	})
});

/*cookie*/
