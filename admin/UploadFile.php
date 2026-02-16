		<?php 

			//$id=1;
			$i=0; $isSpecificFileId='false';

			$id = $_POST["id"];

			foreach($_POST as $column => $value)
			${$column} = ($value) ;

			$globalcompanyid = $companyid;

			//include('configcompany.php');	 
			//include('configdb.php');
			$con = new mysqli($hostname, $username, $password, $databasename);

			if ( $documenttype == '')
			{
				$documenttype ="General";
			}

			$fid =  ($isSpecificFileId=='true') ? $id : ($id . "-%");  

			//$Delstring = " Delete from fileinfo where FileId like '" . ($id) ."-%' and DocumentType = '" . $documenttype . "'";
			
			$Delstring = " Delete from fileinfo where FileId like '" . $fid . "' and DocumentType = '" . $documenttype . "'";
			   
			//echo "$Delstring \n $databasename";
			    	
			//////mysql_query($Delstring,$con);


			if(count($_FILES) ) //& ($ImageTable==$TableName))
			{
				$image=""; $filecount=0;

				$delid =  ($isSpecificFileId=='true') ? $id . "*" : ($id . "-*");  


			   /*foreach(glob($companyid . "/uploads/" . $FolderName ."/" . $delid) as $f) 
			   {
			   	 if( $f == $companyid . "/uploads/"  . $FolderName ."/" . $delid) continue;
			    	unlink($f);
			   }*/

			    $previousfiles = glob($companyid . "/uploads/" . $FolderName ."/" . $delid);

			    if ( $previousfiles !== false )
			    {
				    $filecount = count( $previousfiles );
				    //echo $filecount;
			    }

			    $i = $filecount + 1;

				foreach ($_FILES["uploadedfiles"]["error"] as $key => $error) 
				{

				   	 if ($error == UPLOAD_ERR_OK) 
				   	 {

				      	   $name = $_FILES["uploadedfiles"]["name"][$key];
				           
				           //move_uploaded_file( $_FILES["images"]["tmp_name"][$key], "uploads/" . $_FILES['images']['name'][$key]);
				      	   	

				      	   	$basename = basename($name);

							//$basename = pathinfo($filepath, PATHINFO_BASENAME);

							$file_ext = pathinfo($name, PATHINFO_EXTENSION);
							
							//$file_ext = array_pop(explode(".", $filename));

							//echo "$basename  $file_ext $id \n" ;

							$fname =  ($isSpecificFileId=='true') ? $id : ($id . "-" . $i);  

							//echo $companyid . "/uploads/"  . $FolderName ."/" . $fname . ".$file_ext";

							move_uploaded_file( $_FILES["uploadedfiles"]["tmp_name"][$key], $companyid . "/uploads/"  . $FolderName ."/" . $fname . ".$file_ext" );  //".gif");

							$sqlinsert = " insert into fileinfo(FileId,Extension,FolderName,DocumentType) values  ('" . $fname ."','" . $file_ext . "','" . $FolderName ."','" . $documenttype . "')";
				            
							////mysql_query($sqlinsert,$con);
							mysqli_query($con,$sqlinsert);

							//echo "$sqlinsert";

				            $image=$image . $id . "-" . $i . ",";
				            
				            ++$i;
				    }
			   }

				$image = substr($image,0,-1);
				--$i;
				//echo "image uploaded successfully " . $i;
			}
			
			//echo $id;
			
			//mysql_close($con);
			$con->close();

			echo "files uploaded successfully : " . $i ; //. " -- isSpecificFileId : $isSpecificFileId" ;

		//echo json_encode($data);
		
		

		?>			