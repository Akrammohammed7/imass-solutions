<?php

/*foreach($_POST as $column => $value)
		${$column} = ($value) ;
*/

ini_set('max_execution_time', 300);
        
$companyid='erp';
$globalcompanyid = $companyid;

$hostname =  'localhost'; $username =  'root';$password =  ''; $databasename =  'limrahsoft'; 


include('configdb.php');


    $sqlinsert = " Select * from CompanyListing where CompanyImages > 0";
    
    
    $result = mysql_query($sqlinsert,$con);
    $TotalImages =0;$fids="";
    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
        $images = $row['CompanyImages'];
       if ($images>0)
       {
            for ($x = 1; $x <= $images; $x++) {
                //echo "The number is: $x <br>";
                $fname = ($row['CompanyId'] . "-" . $x);
                $file_ext="gif";$FolderName="";$documenttype ="General";  
                $sqlinsert = " insert into fileinfo(FileId,Extension,FolderName,DocumentType) values  ('" . $fname ."','" . $file_ext . "','" . $FolderName ."','" . $documenttype . "')";
                mysql_query($sqlinsert,$con); 
                //$rc = mysql_affected_rows($con);
                $fids = $fids . $row['CompanyId'] . "\n";
                $TotalImages++;// =$TotalImages + $rc;
            }
       } 
    }  

    echo $fids; //"Done : " .$TotalImages ;  


?>
