<?php
// var_dump( $_COOKIE);
$i=array() ;
$i['id']=$_COOKIE['id'];
$i['name']=$_COOKIE['name'];
$i['role']=$_COOKIE['role'];
$arr=json_encode($i);
echo $arr;
?>