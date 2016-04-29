<?php
$a=$_POST;
// print_r($a);
// var_dump( $_COOKIE);
// echo $_COOKIE['id'].'='.$_COOKIE['id'];
if($_COOKIE['id']==$_COOKIE['id']){
	// echo "11";
	setcookie("id","",time()-1);
	setcookie("name","",time()-1);
	setcookie("role","",time()-1);
}
// echo $_COOKIE['id'];
?>