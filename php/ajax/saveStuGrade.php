<?php
require_once"../include.php";
$Inf=$_POST['data'];
$de_json = json_decode($Inf,TRUE);
//print_r($de_json);
for($i=1;$i<=count($de_json)-1;$i++){
    if($de_json[$i]["ifsubmit"]=="false")
        $de_json[$i]["ifsubmit"]=0;
    else
        $de_json[$i]['ifsubmit']=1;
    $sql="insert into judge VALUES ('{$de_json[$i]['number']}','学生','{$de_json[$i]['score']}','1','0','{$de_json[$i]['ifsubmit']}','{$de_json[0]['workTime']}')";
//    print_r($sql);
  $D->exec($sql);
}

?>