<?php



	$TotalImages = 0;



	$i=0; $isSpecificFileId='false';



	$id = $_POST["id"];



	foreach($_POST as $column => $value)

	${$column} = ($value) ;



	$globalcompanyid = $companyid;

	

	////include('configdb.php');
	$con = new mysqli($hostname, $username, $password, $databasename);
			

	if ( $documenttype == '')

	{

		$documenttype ="General";

	}

 	////mysql_query("start transaction;");
	$con->begin_transaction();	


 	//$fid =  ($isSpecificFileId=='true') ? $id : ($id . "-%");  



 	$Delstring = " Delete from fileinfo where FileId like '" . ($FromId) ."-%' and DocumentType = '" . $documenttype . "'";

 	////mysql_query($Delstring,$con);
 	mysqli_query($con,$Delstring);

 	$TotalImages = 1; $res = null;

 	

 	$filelocation1 = $companyid . "/uploads/" . $FolderName ."/" . trim($FromId) . "-*.*" ; 	

 	

 	$files = glob($filelocation1);

 	

 	//foreach(glob(  $companyid . "/uploads/" . $FolderName ."/" . trim($singleid) . "-*" ) as $filename)

	foreach ( $files as $filename) 

	{

		 $file_ext = pathinfo($filename, PATHINFO_EXTENSION);



		 //echo "original file in loop : $filename";



    	 rename($filename, $companyid . '/uploads/' . $FolderName . '/'. $ToId . "." . $file_ext);



    	 $sqlinsert = " insert into fileinfo(FileId,Extension,FolderName,DocumentType) values  ('" .  $ToId  ."','" . $file_ext . "','" . $FolderName ."','" . $documenttype . "')";

	     

	     //echo "$sqlinsert \n";			            

		 //$res = mysql_query($sqlinsert,$con);
    	 $res = mysqli_query($con,$sqlinsert);


    	 $TotalImages = $TotalImages + 1;



 	}


 	///mysql_query("commit;");
 	//echo "res : $res \n";

 	if( $res )
	{
		$con->commit();

	}
	else
	{
		$con->rollback();
	}

	  $con->close();


    //echo "Done : " .$TotalImages ;  





?>

