<?php
// define('DB_HOST','localhost');
// define('DB_USER','root');
// define('DB_PWD','');
// define('DB_DBNAME','test');
// define('DB_CHARSET','utf8');
//连接数据库
// error_reporting(0);

try {

	$D = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME, DB_USER, DB_PASSWORD);
    $D->exec('SET CHARACTER SET '.DB_CHARSET);
    $D->exec('SET NAMES '.DB_CHARSET);
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}
// echo"链接数据库成功";


//插入操作
//table 表名
//data 数据
// function insert($table,$data){
	// $keys=join(",",array_keys($data));
	// $vals="'".join("','",array_values($data))."'";
	// $sql="insert {$table}($keys) values({$vals})";
	// return $D->exec($sql);
// }
//查询操作
// table 表名
//data 数据
//name 查询的字段名
//where 条件
function select($table,$name='*',$where=null,$D){
	$where=$where==null?null:"where ".$where;
	
	$sql="select {$name} from {$table} {$where}";
	// echo $sql;
	$back=$D->query($sql);
	$back->setFetchMode(PDO::FETCH_ASSOC);
	$back=$back->fetchall();
	return $back;
}
// 更新操作
// table 表名
// data 更新的数据
// where 条件 不传则为NULL
function update($table,$data,$where=null,$D){
	foreach($array as $key=>$val){
		if($str==null){
			$sep="";
		}else{
			$sep=",";
		}
		$str.=$sep.$key."='".$val."'";
	}
	$sql="update {$table} set {$str} ".($where==null?null:" where ".$where);
	$i=$D->exec($sql);
	if($i){
		return $i;
	}else{
		return false;
	}
	
}
// 删除操作
// table 表名
// where 条件 不传为null
// function delete($table,$where=null){
	// $where=$where==null?null:" where ".$where;
	// $sql="delete from {$table} {$where}";
	// $i=$D->exec($sql);
	// return $i;
	
// }
?>