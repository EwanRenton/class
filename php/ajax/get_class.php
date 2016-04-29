<?php
require_once'../include.php';

$i=select('v_tclass_teacher','Cname,Tclass_no,Tclass_specialty,Tclass_class_no,tclass_course_no',"teacher_ID={$_COOKIE['id']}",$D);
  $arr=json_encode($i);
	//print_r($i);
  echo $arr;
	
?>