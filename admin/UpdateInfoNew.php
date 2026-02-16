		<?php 

		/*foreach($_POST as $column => $value)
		{
			
			${$column} = ($value) ; // clean($value);
		}*/
		

		$ImageCount=0;$keyId='';$ReferenceKey='';$previoustable='';$id='';

		/*if(count($_FILES))
		{
			$ImageCount=count($_FILES["images"]["error"]);

		}*/



		$array = array();

		$AddReferenceKey='false'; //$res=null;


		foreach($_POST as $column => $value)
		${$column} = ($value) ;

		//echo "$AddReferenceKey";
	 
		$globalcompanyid = $companyid;
		
		//include('configcompany.php');	 
		////include('configdb.php');	 
	 	$con = new mysqli($hostname, $username, $password, $databasename);

	 	$array = json_decode($QueryArray);

	 	$ImageCount= $filescount;

		//$item =  array();  //$arrayName = array('' => , );

		$data = array();

		//print_r( $array);
		//echo "in php5.4 \n";
		//echo "$masterdetail";
		
		$j = 1;

		//echo "\n AddReferenceKey : $AddReferenceKey \n ";

		////mysql_query("start transaction;");
		$con->begin_transaction();	

		//echo $AddReferenceKey;

		foreach($array as $jsons) 
		{

				//if (array_key_exists('TransQry', $jsons))
				if (property_exists( $jsons , 'TransQry'))
				{	

						//$jsons->TransQry;
						$colarray=array();
						
						//echo ($jsons->Sponsorname);
						$ReferenceId = $jsons->ReferenceId;
						
						if ($jsons->ReferenceKey!=''){
							$ReferenceKey = $jsons->ReferenceKey;
						}

						//AddReferenceKey = $jsons->AddReferenceKey;

						$Criteria = $jsons->Criteria;
						$TableName = $jsons->TableName;


						//echo 'TableName' .  $TableName . '---' .$Criteria . " ReferenceId : $ReferenceId : " . $ReferenceKey ."\n" ;

						//if ($ImageTable==$TableName) {
							//echo $TableName . 'is ImageTable';
						//}

						$TableName = $jsons->TableName;

						//echo $previoustable . ' '. $TableName;
						
						if ( ($j>1) && ($previoustable!=$TableName) && ($masterdetail=='true') ) 
						{
						    		
						    	$Delstring = " Delete from $TableName where " . $ReferenceId . " = '" . ($id) ."'";
						    	
						    	////mysql_query($Delstring,$con);
						    	$resultDel = mysqli_query($con,$Delstring);
						    	//echo $Delstring . " : " .  mysql_affected_rows() . "\n";
						}


						$sql="SELECT * FROM $TableName " . stripslashes($Criteria);

						////$result=mysql_query($sql,$con);
						
						////////$result = mysqli_query($con,$sql);
						
						$QryRows = 0 ; $insert=false; $Update="";
						
						if ($result=mysqli_query($con,$sql))
						{
							$QryRows = mysqli_num_rows($result);
						}	

						//echo "$sql\n";
						//var_dump(mysql_num_rows($result));
						

						////if(mysql_num_rows($result)>0) 
						////if (mysqli_num_rows($result)>0)
						if ($QryRows>0)
						{
									$qrystring ="";

								    foreach($jsons->TransQry as $key => $value) {

						    			//$colarray[$key] = $value; //$k .  ' ' . $v ;

						    			if ($ReferenceId != trim($key) &&  trim($key)!='ReferenceId' && ($key!=$ImageColumn) ) {
								    	//if ( ($key!='ImageColumn') ) {
						    				//echo $ReferenceId . '   ' . $key . '<br>';
						    					
						    					$colarray[$key] = $value;
						    					
						    					//if ( ($column!='Criteria') && ($column!='TableName') && ($column!='ReferenceId') && ($column!='ImageColumn') ) {

													//${$column} = ($value) ; // clean($value);

					        						$qrystring = $qrystring . 	$key . " = '" . ($value) ."',"; 
												//}

						    			}
						    		}

									if  ( ( ($j>1) && $masterdetail=='true' ) || ( ($j>1) && $AddReferenceKey=='true' )  )   //&& ($previoustable!=$TableName) ) {
						    		{
						    			$qrystring = $qrystring . 	$ReferenceId . " = '" . ($id) ."',";
						    		}

						    		/*
						    		
						    		if  ( ( $j==1) && ($AddReferenceKey=='true') ) 
						    		{
						    			$qrystring = $qrystring . 	$ReferenceId . " = '" . ($id) ."',";
						    		}
						    		
						    		*/

						    	
						    		//if(count($_FILES) && ($ImageTable==$TableName) )
									//{
									//		$ImageCount = count($_FILES);

						    		if($ImageCount > 0)
						    		{	
											$qrystring = $qrystring . 	$ImageColumn . " = '" . $ImageCount . "',";
									}

									$qrystring = substr($qrystring,0,-1) .  stripslashes($Criteria) ;

									$Update = "Update $TableName set " ;

									$Update = $Update . $qrystring;
									
									$sql = $Update;

									$insert=false;

									//echo $sql . "\n" ;


				    	}
						else
						{


								$strcols = "";
								$strvals = "'";

								foreach($jsons->TransQry as $key => $value) {

						    			//$colarray[$key] = $value; //$k .  ' ' . $v ;

						    			if ($ReferenceId != trim($key) &&  trim($key)!='ReferenceId' && ($key!='ImageColumn') ) {
									    //if ( ($key!='ImageColumn') ) {
						    	
						    				$strcols = $strcols .  $key . "," ;
											$strvals = $strvals .  $value . "','" ;

											//echo "$key - $value\n";
						    			}
						    	
						    	}					

						    	if  ( ( ($j>1) && $masterdetail=='true' ) || ( ($j>1) && $AddReferenceKey=='true' )  )  // && ($previoustable!=$TableName) ) 
						    	{
						    			$strcols = $strcols .  $ReferenceId . "," ;
						    			$strvals = $strvals .  $id . "','" ;
						    	}

						    	//echo "here ---------------------$ReferenceId : $ReferenceKey";

						    	if(( $j==1) && ($AddReferenceKey=='true'))
								{
									$strcols = $strcols .  $ReferenceId . "," ;
									$strvals = $strvals .  $ReferenceKey . "','" ;
									
									//echo "here ---------------------$ReferenceId : $ReferenceKey";
								}

								//if(count($_FILES) && ($ImageTable==$TableName))
								if(($ImageCount > 0) && ($ImageTable==$TableName))
								{
									$strcols = $strcols .  $ImageColumn . "," ;
									$strvals = $strvals .  $ImageCount . "','" ;
								}

								$strcolsheader = "insert into $TableName (";
								
								$strinsert = $strcolsheader . substr($strcols,0,-1) . ") values(" . substr($strvals,0,-2) . ")" ;
								
								$sql =$strinsert;

								//echo $sql . "\n";

								if ($j==1){
									$insert=true;
								}


						}	    		
			    		
			    		$data[] = $colarray;

			    		//echo "$sql\n";

			    		////$res = mysql_query($sql,$con);
			    		$res = mysqli_query($con,$sql);

						if (!$res)
						  {
						  die('Error: '. mysqli_error($con));
						  }

						  //echo "Database updated successfully ";


						if (($insert==true) && ($j==1) && ($AddReferenceKey=='false') )
						{
							////$id = mysql_insert_id($con);
							$id = mysqli_insert_id($con); 
							//echo "in 1st -$id" . "-" . "$insert - AddReferenceKey -" . $AddReferenceKey;
							
						}
						else if (  ($insert!=true) && ($j==1)   ) {

							$id = $ReferenceKey;
							
							//echo "in 2nd - $id" . "-" . "$insert" . "$j - AddReferenceKey -" . $AddReferenceKey;

							}
						else if (($insert==true) && ($j==1) && ($AddReferenceKey=='true') )
						{
							$id = $ReferenceKey;
							
							//echo "in 3rd - $id" . "-" . "$insert" . "$j  - AddReferenceKey -" . $AddReferenceKey;
						}	

						////////////////////////// image storage /////////////////
						
						/*if(count($_FILES) & ($ImageTable==$TableName))
						{
							$image="";$i=1;

						   foreach(glob("uploads/" . $id . "-*") as $f) {
						    if( $f == "uploads/" . $id . "-*") continue;
						    unlink($f);
							}

							foreach ($_FILES["images"]["error"] as $key => $error) {
						   	 if ($error == UPLOAD_ERR_OK) {
						      	   $name = $_FILES["images"]["name"][$key];
						        		//move_uploaded_file( $_FILES["images"]["tmp_name"][$key], "uploads/" . $_FILES['images']['name'][$key]);
						        	  move_uploaded_file( $_FILES["images"]["tmp_name"][$key], "uploads/" . $id . "-" . $i .".gif");
						           $image=$image . $id . "-" . $i . ",";
						           ++$i;
						        }
						   }

							$image = substr($image,0,-1);
							--$i;
							//echo "image uploaded successfully " . $i;
						}*/


						//////////////////////// end image storage //////////////	

						/* if ( ($AddReferenceKey!=true) && ($j==1) ) {
						
							//if ($j==1){

								$keyId =  $id;
							//}
							
							
						}	
						else if ( ($AddReferenceKey==true ) && ($j==1) ) 
						{
							$keyId = $ReferenceKey;
						}	

						echo "$keyId";
						
						*/

						$previoustable = $TableName;

						$j++;

				}
						
				/*else if (array_key_exists('FixQueries', $jsons))
				{	
						//echo "in fixquery \n";
						
						$fixquery = $jsons->FixQueries;
						//foreach($jsons->FixQueries as $item => $fixquery) 
						//{

						//foreach ($_POST['FixQueries'] as $item=>$fixquery) {
				     		// Logic here...
				     		//$itemarray = json_decode($item);

							$res = mysql_query($fixquery,$con);     		
				    	
				    		//echo "$fixquery\n";

				     		//$i++;

						//}
				}*/
		
		}	//end of No of queries

		/*
			$i=0;

		print_r( $_POST['itemrow']);

		foreach ($_POST['itemrow'] as $item=>$itemarray) {
     		// Logic here...
     		//$itemarray = json_decode($item);

			$data[$item][$i] =$itemarray;

     		echo $item . ' ' . $itemarray . "\n";

	     	//foreach($itemarray as $column=>$value)
			//{
			//	$data[$i][$column]=$value;
			//}
			

     		//$data[$i] = $itemarray->searchsponsor . '  ' . $itemarray->searchsponsorid  ; //$item['cost'] and $item['desc'] are accessible
     		
     		
     		$i++;

		}

		//echo "string";
		*/

		//if( $res1 && $res2 && $res3 )
		
		//echo "res - : $res";

		//if (isset($_POST["FixQueries"]) && !empty($_POST["FixQueries"])) 
		
		//echo array_key_exists('FixQueries', $array);
		
		

		foreach ($array  as $jsons) 
		{
				//if (array_key_exists('FixQueries', $jsons))
				if (property_exists( $jsons , 'FixQueries'))
				{	

						$fixquery = $jsons->FixQueries	;

				

					//foreach ($_POST['FixQueries'] as $item=>$fixquery) {
			     		// Logic here...
			     		//$itemarray = json_decode($item);

						////$res = mysql_query($fixquery,$con);     		
			    		$res = mysqli_query($con,$fixquery);
			    
			     		//$i++;
			    }
			
		}
	

		/*if( $res )
		{
		  mysql_query("commit;");
		}
		else
		{
		  mysql_query("rollback;");
		}

		mysql_close($con);*/
		
		if( $res )
		{
			$con->commit();

		}
		else
		{
			$con->rollback();
		}	

		//echo "Stock Added";
		// close connection
		$con->close();


		echo $id;
		
		//echo json_encode($data);

		//$result = json_encode($result);
		
		

		?>