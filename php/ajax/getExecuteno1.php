<?php
/**
 * Created by PhpStorm.
 * User: Ewan
 * Date: 2015/10/8
 * Time: 21:26
 */
require_once'../include.php';
$jxbnum=$_POST;
//print_r($jxbnum);
$inf=select('v_execute','*',"Tclass_no='{$jxbnum['Tclass_no']}'",$D);

$arr=json_encode($inf);

echo $arr;
