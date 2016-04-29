<?php
require_once'../include.php';
  $test=$_POST;
	$i=select('dd','DD_no,DD_Cexplain_name',"DD_Data_type='$test[dd_type]' and DD_usewhether = 1",$D);
  $arr=json_encode($i);
	//print_r($i);
  echo $arr;
	
?>