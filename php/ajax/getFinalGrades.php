<?php
/**
 * Created by PhpStorm.
 * User: Ewan
 * Date: 2015/12/3
 * Time: 10:40
 */
include "../include.php";
$inf=$_POST;
$back=select('v_assess','*',"Tclass_no='{$inf['Tclass_no']}'",$D);
foreach ($back as $a ) {
    $back1=select("v_homework1","*","Tclass_no='{$inf['Tclass_no']}' and topic_type='{$a['DD_Cexplain_name']}'",$D);
    foreach($back1 as $b){
            $back2=select("judge","*","topic_topic_no='{$b['topic_no']}'",$D);
            $count=count($back2);
            $i=0;
            foreach($back2 as $c){
                $finalGrades[$i]['judge_ID']=$c['judge_ID'];
				if(isset($finalGrades[$i]['grades'])){
                $finalGrades[$i]['grades']=$finalGrades[$i]['grades']+$c['judge_grades']*$b['topic_proportion']*$a['Cexplain_proportion']*0.0001;
				}else{
					$finalGrades[$i]['grades']=0;
					$finalGrades[$i]['grades']=$finalGrades[$i]['grades']+$c['judge_grades']*$b['topic_proportion']*$a['Cexplain_proportion']*0.0001;
				}
                $i++;
            }
    }
}
if(isset($finalGrades)){
foreach($finalGrades as $d){
    $sql="insert into finalGrades VALUES ('{$inf['Tclass_no']}','{$d['judge_ID']}','{$d['grades']}')";
    $D->exec($sql);
}
}
// require_once'get_grade.php';
$i=select('v_finalgrades','*',"Tclass_no='{$inf['Tclass_no']}'",$D);
if($i){
	$lenght=count($i);
	$i[$lenght]['havedata']=1;
$arr=json_encode($i);
echo $arr;
}else{
	
	$i=select('v_tclass_student','*',"Tclass_no='{$inf['Tclass_no']}'",$D);
		$lenght=count($i);
	$i[$lenght]['havedata']=0;
	$arr=json_encode($i);
echo $arr;
}
