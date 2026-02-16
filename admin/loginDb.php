<?php

foreach($_POST as $column => $value)
{    
		${$column} = ($value) ;
        //echo "${$column} - " . ($value) . '<br>'; 
}

$globalcompanyid = $companyid;

////include('configdb.php');

//echo "$hostname , $username , $password , $databasename ";

$con = new mysqli($hostname, $username, $password, $databasename);

$uName = $_POST['appusername'];
$pWord = $_POST['pwd']; //md5($_POST['pwd']);

$qry="";

if ($loginoption=="User")
{
    $qry = "SELECT UserId, UserName, Password,RollId,RollName,PhoneNumber,'' as TransCode FROM UserMaster WHERE UserName='" . $uName . "' AND Password='" . $pWord . "'";
}
else if ($loginoption=="AppUser")
{
    $qry = "SELECT userid as UserId, username as UserName, password as Password,rm.RollId,rm.RollName,PhoneNumber,transcode as TransCode FROM userinfo u ,RollMaster rm WHERE rm.RollName=u.RollName And UserName='" . $uName . "' AND Password='" . $pWord . "'";
}
else if (trim($loginoption)=="Student/Parent") 
{
    $qry = "SELECT userid as UserId, username as UserName, password as Password,rm.RollId,rm.RollName,PhoneNumber,transcode as TransCode FROM userinfo ,RollMaster rm WHERE rm.RollName='Student/Parent' And username='" . $uName . "' AND password='" . $pWord . "'";
}
else if (trim($loginoption)=="BusinessListingUser") 
{
    $qry = "SELECT CompanyId as UserId, CompanyName as UserName, password as Password,rm.RollId,rm.RollName,MobilePhone as PhoneNumber,'' as TransCode FROM CompanyListing ,RollMaster rm WHERE rm.RollName='BusinessListingUser' And companyid='" . $uName . "' AND password='" . $pWord . "'";
}
else if (trim($loginoption)=="Staff") 
{
    //$qry = "SELECT EmployeeCode as UserId, EmployeeName as UserName, Password ,RollId,RollName,'' as PhoneNumber,'' as TransCode FROM employeeinfo  WHERE EmployeeName='" . $uName . "' AND Password='" . $pWord . "'";
    $qry = "SELECT EmployeeCode as UserId, EmployeeName as UserName, Ref1 as Password ,Ref2 as RollId,Ref3 as RollName,'' as PhoneNumber,'' as TransCode FROM StaffMaster  WHERE EmployeeName='" . $uName . "' AND Ref1='" . $pWord . "'";
}


//echo "$qry\n";

////$res = mysql_query($qry);
////$num_row = mysql_num_rows($res);
////$row=mysql_fetch_assoc($res);

 $num_row = 0; $row = null;

if ($result=mysqli_query($con,$qry))
{
      // Return the number of rows in result set
      $num_row=mysqli_num_rows($result);
      //printf("Result set has %d rows.\n",$num_row);
      // Free result set
      $row = mysqli_fetch_assoc($result);
      mysqli_free_result($result);

}

/*$res = mysqli_query($con,$qry);
$num_row = mysqli_num_rows($res);
$row = mysqli_fetch_assoc($res);*/


//echo "numrow : $num_row";

//echo "$loginoption\n";

if( $num_row == 1 ) 
{
        session_start();	
    	//$_SESSION['username'] = $row['username'];
    	//$_SESSION['Id'] = $row['id'];
    	$_SESSION['loginStatus'] = 'true';
       //var_dump($row['username']);
    	//echo $row['RollId'];
    	$json = array();
    	$json[]= array(
         	'UserId' => $row['UserId'],
         	'RollId' => $row['RollId'],
         	'RollName' => $row['RollName'],
            'PhoneNumber' => $row['PhoneNumber'],
            'UserName' => $row['UserName'],
            'TransCode' => $row['TransCode']
         	
        );

    	echo json_encode($json) ;	

}
else 
{
    	$_SESSION['loginStatus'] = 'false';
	    echo 'false';
}

$con->close();

?>
