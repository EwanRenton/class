<?php
/**
 * Created by PhpStorm.
 * User: Ewan
 * Date: 2015/11/24
 * Time: 16:52
 */
require_once "../include.php";
$Inf=$_POST['data'];
$de_json = json_decode($Inf,TRUE);
$lenght=count($de_json);
// print_r($de_json);
switch ($de_json[0]["workTime"]){
    case 1:$time="第一次";break;
    case 2:$time="第二次";break;
    case 3:$time="第三次";break;
    case 4:$time="第四次";break;
    case 5:$time="第五次";break;
    case 6:$time="第六次";break;
    case 7:$time="第七次";break;
    case 8:$time="第八次";break;
    default:
        echo "No number between 1 and 3";
}
for($i=0;$i<=$lenght-1;$i++){
    if(isset($de_json[$i]['fullmark']))
    {
        $sql="insert into topic (topic_fullmark,topic_tclass_no,topic_type,topic_times) VALUES ('{$de_json[0]['fullmark']}','{$de_json[0]['Tclass_no']}','期末考试','$time')";
        // echo $sql;
        $D->exec($sql);
        $num=select('v_homework1','*',"Tclass_no='{$de_json[$i]['Tclass_no']}' and topic_times='{$time}' and topic_type='期末考试'",$D);
        foreach ($num as $a){
            $topic_no=$a['topic_no'];
        }
        // echo $num['topic_no'];
    }else{
        $sql="insert into judge VALUES ('{$de_json[$i]['number']}','学生','{$de_json[$i]['score']}','1','0','1','$topic_no')";
        // print_r($sql);
        $D->exec($sql);
    }
}
