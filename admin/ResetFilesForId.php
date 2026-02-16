<?php 

//$id = $_POST["id"];

foreach($_POST as $column => $value)
	${$column} = ($value) ;

$globalcompanyid = $companyid;
			
//include('configdb.php');
		
$con = new mysqli($hostname, $username, $password, $databasename);


$fid =  ($isSpecificFileId=='true') ? $id : ($id . "-%"); 

$Delstring = " Delete from fileinfo where FileId like '" . $fid . "' and DocumentType = '" . $documenttype . "'";
			   			
//echo "$Delstring\n ";

//mysql_query($Delstring,$con);
$resultDel = mysqli_query($con,$Delstring);


$delid =  ($isSpecificFileId=='true') ? $id . "*" : ($id . "-*"); 

foreach(glob($companyid . "/uploads/" . $FolderName ."/" . $delid) as $f) 
{
	 if( $f == $companyid . "/uploads/"  . $FolderName ."/" . $delid) continue;
	 unlink($f);
	 //echo "$f\n";
}

$Updstring = " update $QryTable set $ImageColumn = 0 where $ReferenceColumn='$id' ";

//mysql_query($Updstring,$con);
//mysql_close($con);

$resultUpd = mysqli_query($con,$Updstring);
$con->close();

?>			