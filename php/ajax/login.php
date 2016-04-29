<?php 
require_once'../include.php';
$infor=$_POST;
// print_r($infor);
if($infor['role']=="student"){
		$sql="select * from student where student_ID='{$infor['id']}'";}
	else{
		$sql="select * from teacher where teacher_ID='{$infor['id']}'";
		$teacher=1;
	}
$back=$D->query($sql);
$back->setFetchMode(PDO::FETCH_ASSOC);
$back=$back->fetchall();
 // var_dump($back);
 if($infor['role']=='teacher'){
	 if($back){
		if($back[0]['teacher_password']==$infor['password']){
		// echo "欢迎您！".$back[0]["teacher_name"]."老师";
		setcookie("id",$infor['id'],time()+3600);
		setcookie("name",$back[0]["teacher_name"],time()+3600);
		setcookie("role",$infor['role'],time()+3600);
		$message=0;
		}else{
			// echo"密码错误,请重新登录!";
			$message=2;
		}
	}else{
		// echo "工号不存在";
		$message=1;
	}
 }else{
	 if($back){
		if($back[0]['student_password']==$infor['password']){
		// echo "欢迎你！".$back[0]["student_name"]."同学";
		setcookie("id",$infor['id'],time()+360000);
		setcookie("name",$back[0]["student_name"],time()+360000);
		setcookie("role",$infor['role'],time()+360000);
		$message=0;
		}else{
			// echo"密码错误,请重新登录!";
			$message=2;
		}
	}else{
		// echo "学号不存在";
		$message=1;
	}
 }
 // var_dump($back);
//var_dump($_COOKIE);
echo json_encode($message);
?>