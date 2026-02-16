<?php

$companyid = stripslashes($_POST['companyid']);

$globalcompanyid = $companyid; 	
				
foreach($_POST as $column => $value)
${$column} = ($value) ;
 
$globalcompanyid = $companyid;

//include('configcompany.php');	 
////include('configdb.php');

$con = new mysqli($hostname, $username, $password, $databasename);

//echo "conneced to : " . $globalcompanyid;

$sql = stripslashes($_POST['sql']);

////$result = mysql_query($sql,$con);
$result = mysqli_query($con,$sql);

$sq = strtolower($sql);

//var_dump($sql);

//$pos = strpos($sq , 'select');

//echo $pos . ' ' . $sq;


//if (strpos($sq, 'select') == true) {

if (preg_match('/select/',$sq))			
{			
			//$count=array();
			//$count = mysql_fetch_assoc($result);
			
			if($result)
			{
			
				 	$data = array();
				  
				  	////while ($row = mysql_fetch_assoc($result)) 
				  	while ($row = mysqli_fetch_assoc($result)) 
				  	{
				   		 $data[] = $row;
				  	}
				
					//while($obj = mysql_fetch_object($result)) {
					//$arr[] = $obj;
					//}
				
					//echo '{"members":'.json_encode($arr).'}';
				
					//$data=mysql_fetch_row($result);
					//return array($data);
				
					echo json_encode($data);
			
			}
			else 
			{
				echo "No Data";
			}

     }
  
else {

		////$rc = mysql_affected_rows($con);
		$rc = mysqli_affected_rows($con);

		if ($rc)
			 {
				echo 'Records affected : ' . $rc;
 			  }

	     else  {
				echo 'failed';	
		     }
		
    }

$con->close();


?>
