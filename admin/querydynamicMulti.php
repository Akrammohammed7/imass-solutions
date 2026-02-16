<?php

//echo "in querydynamic";

if (count($_POST))
{	 

	 	$array = array(); $result=null; $ra=0;
    
	 	foreach($_POST as $column => $value)
		${$column} = ($value) ;
	
	   //$companyid = "sms0000000001";
		
		$globalcompanyid = $companyid; 	
				
		//include('configcompany.php');	
		////include('configdb.php');	
	 	
	 	
	 	$con = new mysqli($hostname, $username, $password, $databasename);

	 	$array = json_decode($QueryArray);  //$_POST['QueryArray']);	
		
		//echo "$hostname, $username, $password, $databasename  : connection Ok";


		
		////mysql_query("start transaction;");
		$con->begin_transaction();	   

		//echo "$hostname, $username, $password, $databasename  : bigin transaction Ok";

		

	    //foreach ($array as $key => $jsons) {
	    foreach ($array as $jsons) 
	    {	
	    
	    			$ky='';
	   

	    			$TransQry= $jsons->TransQry;

	    			//echo $TransQry . "\n";
	    			
					////$result = mysql_query($TransQry,$con); 
	    			$result = mysqli_query($con,$TransQry);

					////$rc = mysql_affected_rows($con);
					
					$rc = mysqli_affected_rows($con);

					if ($rc)
					{
							$ra = $ra  + $rc;
							
			 		}
					

		}


		if( $result )
		{
			$con->commit();

		}
		else
		{
			$con->rollback();
		}	

		// close connection
		$con->close();
		
		echo 'Records affected : ' . $ra;				


	}

	// pdo solution

	//$array = $pdo->query("SELECT * FROM employee")->fetchAll(PDO::FETCH_ASSOC);
	//echo json_encode($array);
    
			/*if( $result )
		{
		  mysql_query("commit;");
		}
		else
		{
		  mysql_query("rollback;");
		}

		mysql_close($con);*/


?>


