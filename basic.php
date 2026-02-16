<?php
	$referer = $_SERVER['HTTP_REFERER']; // echo 'referer :' . $referer;
	$domain = explode("/",$referer);

	//echo "<script> alert ('" . "$referer" . "'); </script>";



/*

<script type="text/javascript">

	function MyJSFunction() {
		alert("This is a commercial script, you can not copy this!");
	}	
	// Show Alert
	MyJSFunction();	

	<script type="text/javascript" src="lt.js"></script>

</script>  

	<script type="text/javascript" src="loginToggle.js"></script> */

	// Check URL ( This below url is just for demo. You need to replace it by your full url of index page before testing )
	//if ( ($referer=='https://demo.siterepo.com/free/sonhlab-protect-javascript/demo.php') ) {
	
	
		//if ( ($referer=='https://www.imasssolutions.com/') || ($referer=='https://www.imasssolutions.com/index.html') || ($referer=='https://www.imasssolutions.com/careers.html') || ($referer=='https://www.imasssolutions.com/job-details.html') || ($referer=='https://imasssolutions.com/') || ($referer=='https://imasssolutions.com/index.html') || ($referer=='https://imasssolutions.com/careers.html') || ($referer=='https://www.imasssolutions.com/job-details.html')  )  //|| ($referer=='https://www.imasssolutions.com/register.html') || ($referer=='https://www.imasssolutions.com/add-resume.html')  || ($referer=='https://www.imasssolutions.com/contact.html') || ($referer=='https://localhost:85/it-talent/htmltemplate/index.html') || ($referer=='https://localhost:85/it-talent/htmltemplate/add-resume.html')  || ($referer=='https://localhost:85/it-talent/htmltemplate/register.html') || ($referer=='https://localhost:85/it-talent/htmltemplate/') || ($referer=='https://localhost:85/it-talent/htmltemplate/job-listing.html') || ($referer=='https://localhost:85/it-talent/htmltemplate/job-details.html')  || ($referer=='https://localhost:85/it-talent/htmltemplate/add-resume.html')  ||  (strpos( $referer , 'https://www.imasssolutions.com/index.html?' ) !== false)   ||  (strpos( $referer , 'https://www.imasssolutions.com/?' ) !== false)  ||  (strpos( $referer , 'https://www.imasssolutions.com/job-listing.html?' ) !== false)  ||  (strpos( $referer , 'https://www.imasssolutions.com/contact.html?' ) !== false)  ||  (strpos( $referer , 'https://localhost:85/it-talent/htmltemplate/job-details.html?' ) !== false)   ||  (strpos( $referer , 'https://localhost:85/it-talent/htmltemplate/post-job.html?' ) !== false)  ) 
		
		if ( ($referer=='https://imasssolutions.com/') || ($referer=='https://imasssolutions.com/index.html') || ($referer=='https://imasssolutions.com/careers.html') || ($referer=='https://www.imasssolutions.com/job-details.html')  )
		{


		//$data = ' <script type="text/javascript" src="js/common.js" ></script> '; 

		$data = 'js/common.js';	
		
		/////$companyid = $_POST['companyid'];
		
		/////$globalcompanyid = $companyid;

		//////include('configcompany.php');
        
        $hostname = 'localhost';  $hst = "localhost";  $username = "u849667752_imass";    $password = "Imass@1199";   $databasename = 'u849667752_imass';   $FTPReferer = 'https://admin.imasssolutions.com/' ;  $HTTPReferer =  'https://imasssolutions.com/admin/' ;
    
    	$json = array();
		
		$json[]= array(
	     	'UserId' =>  '0' , //$row['UserId'],
	     	'RollId' => '0' ,//$row['RollId'],
	     	'RollName' => 'guest', // $row['RollName'],
	     	'hostname' => $hostname,
	     	'username' => $username,
	     	'password' => $password,
	     	'databasename' => $databasename,
	     	'apf'          => $apf,
	     	'companyname'  => $companyname,
	     	'data' =>    $data,
	     	'referer' => "$HTTPReferer"
    	);

		echo json_encode($json) ;	



		 }
		// If strange domain
		else { 
		   //echo "$referer";		
		   echo "   Sorry! You can not see this content. Please go to <a href='https://limrahsoft.com'>limrahsoft.com</a> to see it.<br />";
		 } 


 ?>