
//var queries = new Array();

/*$( function() 
{

	alert(hst + '-' + db + '-' + dusr + '-' + '-' + dp + '-' + gcompanyname);

});
*/
	//alert('in common');

	var TransferControl1=null,TransferControl2=null;GlobalCtrl=null,globaldata=null , uploadDocType='CandidateResume',uploadFolderName='Resumes';
    var  hst , db , dusr , dp , max=5,ImageCount=0,hook,gcompanyname,UserName,UserId,RollId,searchmode='Jobs',isfile=false,noofimages=0;
    var queries = [], isSpecificFileId=false,HTTPReferer='', productcode='', AgentCode="", colquery= {}; //companyid="erp",

	//alert('in common');

	//alert(hst + '-' + db + '-' + dusr + '-' + '-' + dp + '-' + companyid + '-' + gcompanyname);

	startup();


    function loginERP()	
    {
	 	 //event.preventDefault();	
	     //Display_Load();
	     
	      //alert('in login');

	      //alert(hst + '-' + db + '-' + dusr + '-' + '-' + dp + '-' + companyid + '-' + gcompanyname);

	      $('#mainnav-menu').html('');

		  username=$("#username").val();
		  apppassword=$("#password").val();
		  
		  //companyid=$("#companycode").val();


		  if ( username =='' || password =='' || companyid =='')
		  {

		  	  alert('input not valid');
		  	  return;

		  }

		  //str="appusername="+username+"&pwd="+password+"&companyid="+companyid;

		  str="appusername="+username+"&pwd="+apppassword + "&companyid=" + companyid + "&hostname=" + hst + "&databasename=" + db + "&username="+ dusr + "&password=" + dp + "&loginoption="+$( "#logintype option:selected" ).text();

		  url ="";

		  getloginurl();

		  //url = ( username=="admin" ? "login.php" : "loginuser.php");
		  //url =  "login.php" ;

		  //alert(str + '---' + url);

		  $.ajax({
		   type: "POST",
		   url: url,
		   data: str,
		   success: function(html){ 

		   	//alert(html);	

		   	//$('#globalsearchtext').val(html);

		   	data1 = $.parseJSON(html);	

            //alert($.session.get("loginStatus") + ' in success' + ' html ' + html);

			if ( (html.toLowerCase()!='false') )    
			{	
				UserId = data1[0].UserId;
				RollId = data1[0].RollId;
				RollName = data1[0].RollName;

				hst = data1[0].hostname ; dusr = data1[0].username; dp = data1[0].password; db =data1[0].databasename; apf = data1[0].apf; gcompanyname = data1[0].companyname;

				UserName = data1[0].UserName;

/*				$('.brand-text').text(gcompanyname);	

			 	$("#statusdiv").html("right username or password");
			 	//window.location.replace("indexjquery.php");
			 	//$("#paginationdiv").load("indexjquery.html",Display_Load());

				$(".header").fadeIn('slow');
				$(".wrapper").fadeIn('slow');

				$('#login-box').parent().hide();
 				$("#statusdiv").hide();

			 	Hide_Load();

			 	getrollinfo(RollId,RollName) ;
				
				
				$('.content .nav').html('');			
				$("#logindiv").html('');
			 	
			 	$('#usernamepara').html(  username + " - " + RollName + " <small>  " + UserId  + " - " + companyid + "</small>  " ) ;
	            $('#usernameleft').text(username + " - " + RollName );
	            $('.hidden-xs').text(username);
	            $('.main-header,.main-sidebar').fadeIn();
*/
	           
				//alert('herererre');

	            initiate();

	            $('.testpopup').hide();

	            //$.getScript(apf);

		
			 	 $("html, body").animate({ scrollTop: 0 }, "slow");


			}
			else    
			{
				$("#statusdiv1").css('display', 'inline', 'important');
			 	$("#statusdiv1").html(" </br> <img src='images/alert.jpg' /> Incorrect username or password");
					}
		    } ,
			beforeSend:function()
			{
					$("#statusdiv1").css('display', 'inline', 'important');
					$("#statusdiv1").html("<img src='indicator.gif' /> Loading...")
		   	}
		   
		   
		  });

		  //Hide_Load();

		return false;
	};

function getDatasetWithCallback(callback) {

	//queries.push({"BioQry":"select * from child where ChildId='" + id + "'"});	
    //queries.push({"SponsorQry":"select * from sponsordetails where SponsorId='1'"});
    //queries.push({"TransQry":"select * from sponsortransactions where ChildId='" + id + "'"});
    
    var $QueryArray = JSON.stringify(queries);

	//var sqlqry = "select * from child" 
	
	//alert( 'in getDatasetWithCallback : \n' + HTTPReferer+"dynamicdataset.php" + '-\n' +  $QueryArray);
     
	data1;

    $.ajax({
        url: "dynamicdataset.php", //HTTPReferer+
        datatype:"json",
        type: 'POST',
        cache:false,
        timeout:30000,
        data: { QueryArray : $QueryArray , companyid:companyid , hostname:hst, databasename:db, username:dusr , password:dp },
        success: function(res) {
			  
			  //alert(' in sucess : \n ' + res);
			  //$('.popGeneric-Footer').html(res);
			  //$('#test').html(''); 	
			  data1 = $.parseJSON(res);
			  
			  //alert(res);

			  /*$.each(data1, function(idx, obj){

					$.each(obj, function(key, value){ 
				  		//alert( key + ' ' + value.replace("\\", "") );	
						$newDiv=$('<div>' + value.replace("\\", "") + '</div>');									  		
				  		$(divname).append($newDiv);			  
				   });
			             
           	  });
			 
			*/

			//alert('b4 getDatasetWithCallback callback');

			 if (typeof(callback) == 'function') 
			 {

        		 callback(data1);
     		 } 	

				           
        }
    
    });
    
    
 	return data1;

 }

function getCustomData(QArray,callback) {

	//queries.push({"BioQry":"select * from child where ChildId='" + id + "'"});	
    //queries.push({"SponsorQry":"select * from sponsordetails where SponsorId='1'"});
    //queries.push({"TransQry":"select * from sponsortransactions where ChildId='" + id + "'"});
    
    //var $QueryArray = JSON.stringify(queries);

	//var sqlqry = "select * from child" 
	
    //alert( 'in getCustomData : ' +  QArray +'\n'+ companyid+hst+db+dusr+dp + '===\n' + HTTPReferer+"dynamicdataset.php");
     
	data1;

    $.ajax({
        url: HTTPReferer+"dynamicdataset.php",
        datatype:"json",
        type: 'POST',
        cache:false,
        timeout:30000,
        data: { QueryArray : QArray , companyid:companyid , hostname:hst, databasename:db, username:dusr , password:dp },
        success: function(res) 
        {
			  //alert(res);

			  customdata = $.parseJSON(res);
			  
			/* $.each(data1, function(idx, obj){

					$.each(obj, function(key, value){ 
				  		//alert( key + ' ' + value.replace("\\", "") );	
						$newDiv=$('<div>' + value.replace("\\", "") + '</div>');									  		
				  		$(divname).append($newDiv);			  
				   });
			             
           	   });
			 
			*/

			 if (typeof(callback) == 'function') 
			 {

        		 callback(customdata);
     		 } 	

				           
        }
    
    });
    
    
 	return customdata;

 } 


function updateSelectedForm(clearform) {

					//Display_Load();
					
					var i = 0, len = 0, img, reader, file;

				
					//for ( ; i < len; i++ ) {
					
					//	file = $('#ChildImage').get(0).files[i];
					//	formdata.append("images[]", file);		
					
					//}


				   formdata = new FormData();

				   if (formdata) {
			  		
				  		   /*if($.trim(ImageColumn)!='')
						   {
						   	       len =  $('#'+ImageColumn).get(0).files.length;
						   	
								   $("input[type='file']").each( function() { 
							
								   //$("input[type='file'][id^=" + ImageColumn + "]").each( function() { 
							  
							 		// Get an array of the files for this input
					    			var files = $(this).get(0).files;
								
					    			// Loop through files
					    			for (var j=0; file = files[j]; j++) {
									//alert(file.size);
					        		// File size, in bytes
					        		var size = file.size;
					        		var name = file.name;
									formdata.append("images[]", file);
									//alert(file.name);					 
									  }   	
								});
							

							}*/	

						   len = 0;
			
						   if($.trim(ImageColumn)!='')
						   {
						   	
							   	//len =  $('#'+ImageColumn).get(0).files.length;
							   	//len = $("input[type='file']").get(0).files.length;
							   	//len = $("input:file", 'body')[0].files.length;
							   	
							   	$("input[type='file']").each( function() { 
							   		 len = len + parseInt($(this).get(0).files.length);
							   	});

						   }

						   //alert(len);

						   formdata.append("filescount", len);

			    	   	   formdata.append("ImageColumn", ImageColumn);	
					       formdata.append("ImageTable", ImageTable);

							//alert(CurrentAppinfo[0].AddReferenceKey);


							//if (CurrentAppinfo[0].AddReferenceKey!='false' && CurrentAppinfo[0].AddReferenceKey!='')
							if (AddReferenceKey!='false' && AddReferenceKey!='')
							{
								formdata.append("AddReferenceKey", true);
								//alert('in add ReferenceKey true');
							}
							else
							{
								formdata.append("AddReferenceKey", false);	
								//alert(' ReferenceKey false');
							}	



							queries=[];

				
							j =1;var colquery;

						   //alert('b4 ajax'+customqueries.length)	;

						   if (customqueries.length) {
						   
						   		queries =  $.extend({}, queries, customqueries);
						   
						   }
						   else
						   {	
						   		
								putQueries();
							
							}

								//alert( JSON.stringify(queries) );

								//formdata.append("TableName", QryTable);
								
								//alert(ImageColumn + '---' + ImageTable);
						
							formdata.append("companyid", companyid);	

							formdata.append("hostname" ,hst);
							formdata.append("databasename",db); 
							formdata.append("username",dusr); 
							formdata.append("password",$.trim(dp));

							formdata.append("masterdetail", masterdetail);	

						    var $QueryArray = JSON.stringify(queries);

							formdata.append("QueryArray", $QueryArray);

					}   


					//datatype:"json",
						//cache:false,
        				//timeout:10000,
        				//data: { QueryArray : $QueryArray  },
        			
        			/*if (companyid=='dayani')
        			{	
        				alert($QueryArray);
        			}*/

        			//alert($QueryArray);

        			//$('#finalqry').val($QueryArray);

        			url = HTTPReferer + "UpdateInfoNew.php"; 	
					
					//alert(url);

					$.ajax({
						url: url,
						type: "POST",
						data: formdata,
						processData: false,
						contentType: false,
						success: function (res) 
						{
							//alert(res);


							/*if (companyid=='dayani')
        					{
								//alert(res);
								$('#SearchAnalysis').val($QueryArray);
							}*/	

							//$('#finalqry').val(res);
							
							//$('#SearchAnalysis').val(res);


							gid = res;
							
							id = $.trim(res);

							//alert(id);

							//alert(res);

							/*
							
								if ($('#'+KeyColumn).val()!='New') {
								    $('#'+QryTable).show() ;						
								   reallocate('',res);		// re alocate WITH UPDATE	
								}

								if (RecordStatus=='Add')//else
								{  

									$('#'+KeyColumn).val(res);
									reallocate('Add',res);		// re alocate

							    }					   
								
								$("#loading").html("Data Updated ");   
								//$('#resetbtn').click();		// re set
								resetForm();		
								$('#'+QryTable)[0].reset();	// re fresh				
							
							*/	
						
							   //alert(isfile);

							   if (isfile)
							   {
					            //uploadphoto( $.trim(res) );
					        	//alert(id);
					            uploadfilecustom( id );
					            isfile = false;
					            //clearform(); 
					           }

					           setTimeout(clearform,0);

					           // if (ispicture){
					           //  uploadphoto( $.trim(res) );
					           //  //clearform(); 
					           // }

					            //if (typeof(clearform)=='function')
					            //{
					              //clearform();
					            //}

					            customqueries = [];
					            $('#FooterList').html('');
			         
			          },
			         error: function (request) {
			           // alert(request.responseText);
			           // alert(request.status);
			            if(request.status==0)
			            {
			               //alert("Please connect to the internet");

			               $.niftyNoty({
							type: 'danger',
							title: 'Hello ' + username + ',' ,
							message: ' Internet Disconnected <br> Please connect to the Internet  ' ,
							container: 'floating',
							timer: 5500,
							onHidden:function(){
		        				//test123('deliverysearch');
		    				}
		    				});

			               $('#FooterList').html("<li class='pull-right'> Internet  <span class='label label-danger'>Disconnected</span>  </li>");	
			            }

			         }   

					});

			/// end new ajax function

			//callselect($(tbl1));	
			
			//masterdetail=false;

			Hide_Load();
			
			//$("#formgen").modal('hide');
			//$(".Trangen").hide();
			$('.popGeneric').hide();

			//$("#"+QryTable).parent().parent().hide();

}



function uploadfile11111111(id) 
{

					//alert(id);

					//Display_Load();

					//alert('here');
					
					var i = 0, len = 0, img, reader, file;

				   	formdata = new FormData();

					formdata.append("companyid", companyid);	

					formdata.append("hostname" ,hst);
					formdata.append("databasename",db); 
					formdata.append("username",dusr); 
					formdata.append("password",$.trim(dp));

				    formdata.append("id", id);
				    
				    formdata.append("isSpecificFileId", isSpecificFileId);
				    
				    formdata.append("documenttype",uploadDocType);

				    formdata.append("FolderName", uploadFolderName);		

		  		   if($.trim(id)!='')
				   {
				   	       //len = $("input[type='file']").get(0).files.length ; //   $('#'+'resumefile').get(0).files.length;
				   	
				   	       //alert('in id :' + id);

				   	       nooffiles = 0 ;

						   $("input[type='file']").each( function() { 
					
							   //$("input[type='file'][id^=" + ImageColumn + "]").each( function() { 
						  
						 		// Get an array of the files for this input
				    			var files = $(this).get(0).files;
						
								//alert(files);

				    			// Loop through files
				    			for (var j=0; file = files[j]; j++) 
				    			{
		
									//alert(file.size);
					    
					        		// File size, in bytes
					        		var size = file.size
					        		var name = file.name;
								
									formdata.append("uploadedfiles[]", file);

								
									//alert('file name : ' + file.name);					 
									
									nooffiles ++;

								  }   	
						});

						//alert('nooffiles :' + nooffiles );
						

						if ( nooffiles >  0 )   
						{
							//alert(FTPReferer+"UploadFile.php");
							
							$.ajax({
								url: FTPReferer+"UploadFile.php",
								type: "POST",
								data: formdata,
								processData: false,
								contentType: false,
								success: function (res) 
								{
										alert(res);
										//$('#EmailId').val(res);
										$("input[type='file']").val('');
								}
							});
						}
					}


}


function uploadfilecustom1111111111111111(id) 
{

					//alert(id);

					//Display_Load();

					//alert('here');
					
				var i = 0, len = 0, img, reader, file;

				 if($.trim(id)!='')
				 {
				
				   	formdata = new FormData();

					formdata.append("companyid", companyid);	

					formdata.append("hostname" ,hst);
					formdata.append("databasename",db); 
					formdata.append("username",dusr); 
					formdata.append("password",$.trim(dp));

				    formdata.append("id", id);
				    
				    formdata.append("isSpecificFileId", isSpecificFileId);
				    
				    formdata.append("documenttype",uploadDocType);

				    formdata.append("FolderName", uploadFolderName);		

						//alert('nooffiles :' + nooffiles );
						
					var file = localStorage.getItem("uploadfile")						

					formdata.append("uploadedfiles[]", file);

						if ( nooffiles >  0 )   
						{
							//alert(FTPReferer+"UploadFile.php");
							
							$.ajax({
								url: FTPReferer+"UploadFile.php",
								type: "POST",
								data: formdata,
								processData: false,
								contentType: false,
								success: function (res) 
								{
										alert(res);
										$("input[type='file']").val('');
								}
							});
						}
				}


}

function intiatefileupload()
{
					var i = 0, len = 0, img, reader, file;

				   	formdata = new FormData();

					formdata.append("companyid", companyid);	

					formdata.append("hostname" ,hst);
					formdata.append("databasename",db); 
					formdata.append("username",dusr); 
					formdata.append("password",$.trim(dp));

				    formdata.append("id", id);
				    
				    formdata.append("isSpecificFileId", isSpecificFileId);
				    
				    formdata.append("documenttype",uploadDocType);

				    formdata.append("FolderName", uploadFolderName);		

		  		   if($.trim(id)!='')
				   {
				   	       //len = $("input[type='file']").get(0).files.length ; //   $('#'+'resumefile').get(0).files.length;
				   	
				   	       //alert('in id :' + id);

				   	       nooffiles = 0 ;

						   $("input[type='file']").each( function() { 
					
							   //$("input[type='file'][id^=" + ImageColumn + "]").each( function() { 
						  
						 		// Get an array of the files for this input
				    			var files = $(this).get(0).files;
						
								//alert(files);

				    			// Loop through files
				    			for (var j=0; file = files[j]; j++) 
				    			{
		
									//alert(file.size);
					    
					        		// File size, in bytes
					        		var size = file.size
					        		var name = file.name;
								
									formdata.append("uploadedfiles[]", file);

								
									//alert('file name : ' + file.name);					 
									
									nooffiles ++;

								  }   	
						});
					}	   
						sessionStorage.setItem("imagedata",JSON.stringify(colquery));   


}


function updateMulti(callback)
{

	  //alert(JSON.stringify(queries));
	  
	  var $QueryArray = JSON.stringify(queries);

	  //alert('in multi companyid : ' + companyid + '\n' + JSON.stringify($QueryArray)); //$('#statusdiv').text($QueryArray);
	  
	  url = HTTPReferer + "querydynamicMulti.php"; 	//alert(url+'\n'+companyid+hst+db+dusr+dp);

	  $.ajax({
	          url: url,  //http://celsoft.limrahsoft.com/
	          type: "POST",
	          datatype:"json",
	          data: { QueryArray : $QueryArray , companyid:companyid  , hostname:hst, databasename:db, username:dusr , password:dp },
	          cache:false,
	          timeout:30000,
	          success:function(res)
	          {
	            //alert(res);
	            
	            if (callback!='')
	            {	
	            	setTimeout(callback,0);
	          	}

	          }  
	  });   
          
}


var createcustomform = function (innerform , DesignSource , fname , ispopup)
{

	//alert(innerform + '---' + DesignSource + '----' + ispopup);

	$.ajax({
		  url: DesignSource+'.html',
		  dataType: "html",
		  success: function(data) {

		  	//alert(data);

		    if (ispopup) 
		    {
    			

			    $('.testpopup').remove();

			    formtype='form';commoncolumnshtml="";

				//223,235,246  220,233,246 223,235,247 235,244,255
				$divform = $('<div   style="width:90%;height:auto;top:40px;left:5%;position:absolute;background-color:rgb(235,243,252)" id="testmodal" />'); //align="center"
				$divform.wrap('<div class="testpopup" id="popupbg" style="z-index:'+ (currentPopupZindex + 100) +'"> </div> ');
				$headerbar= $('<div class="headerbar" id="headerbar" > <div id="logo" />  <h3>' + fname + ' </h3> </div>');

				//$closeform= $('<div class="close" id="CloseDetails" ></div> '); //onClick=$(".testpopup").hide();></div>');
				$closeform = $('<span class="pull-right"> <a class="fa fa-remove" href="javascript:;" style="margin-right:5px;font-size:12px;margin-top:-15px;background-color:#fafafa"></a> </span>	');
				$closeform.click( function () { GlobalCtrl=null;   $(".testpopup").hide();  /*formcreated=false; $("#popupbg").remove();*/ } );
				//$divform.append($closeform);

				$headerbar.append($closeform);

				$divform.append($headerbar);

				currentPopupZindex = (currentPopupZindex + 100);
			    $innerform = $( '<div name="' + fname + '" id="' + fname + '" formtype="' + formtype  + '" MasterCriteria="' + MasterCriteria  + '" ' + commoncolumnshtml + ' style="top:10px;margin:10px 20px;position:relative;overflow:auto;border: aliceblue 1px solid;"/> ');
				
				$innerform.append(data);

				$divform.append($innerform);

				$divform.append($innerform);

				$statusbar = $('<div id="statusbar" align="center"  style="margin: 10px auto 0 auto;width: 100%;background:#DDE1E4 ;border:2px solid #eeeeee; height:20px"> footer </div>');	
				$divform.append($statusbar);
		   		
		   		//$divform.resizable();//.draggable();

		   		//alert('herererer');

		   		$("body").append($divform.parent());

		   }		
   		   else
		   {
				innerform.html(data);
		   }	

		   $("html, body").animate({ scrollTop: 0 }, "slow");
			
			//alert('b4 callback');

/*			if ( typeof(callback2) == 'function') 
			{
				
				callback2(globaldata) ;
			}
			else
			{
				//callDateconstraint();
				callinitiate();
				//alert('b4 hooks');
				callhooks();
			}
*/

			callDateconstraint();
			callhooks();

		  }
	});	  

}

var createdynamicform = function (innerform , Qry,fname,ispopup) {

									//alert(innerform + '-' + Qry +'-' + fname);

									$th = Qry.substring(7,Qry.toLowerCase().lastIndexOf('from')-1).split(",");
									
								 	var i=1; var key;checkidbtn='';KeyColumnStyle='';KeyConstraint ='';DateConstraint='';

									formtype='form'; commoncolumnshtml = '' ; // ( ($.trim(commoncolumns)!='') && (fno==1) ? ' commoncolumns="' + commoncolumns + '"  ' : ' ' );
									
									$tablehtml=null; 
									 
									 $tablehtml = '<table class="specialtable" > <tr><td colspan="4">  </td></tr> <tr><td align="right" colspan="6" ></td></tr>';
									  
									 var i =1;var key;KeyColumnStyle='';KeyConstraint='';DateConstraint='';
									  	
									 //alert('herererer\n'+$th);		 
			
									 $.each($th,function(j,thd ) {  // $th.each(function () {
											
											//$thtxt = $.trim($(this).text());
											
													$thtxt = $.trim(thd);	
													key = $thtxt;
												    
												    value='';
													
													//alert(key);			
											
												   	if ($thtxt.toLowerCase().lastIndexOf(' as') > -1 )
												    {
												    	key = $.trim($thtxt.slice($thtxt.toLowerCase().lastIndexOf(' as')+3)) ;
													}
													else if ($thtxt.lastIndexOf('.') > -1 )
													{
												    	key = $thtxt.substring($thtxt.lastIndexOf('.')+1) ;
													}
													else if ($thtxt.lastIndexOf(')') > -1 )
													{
												    	key = $thtxt.substring($thtxt.lastIndexOf(')')+1) ;
													} 
													else 
													{
												    	key = $thtxt ;
													}

													

												   checkidbtn = (KeyColumn.match($.trim(key)) ? ' <input type="button" onclick=" checkid()" class="myButton" value="Check" /> ' : ' ' );	

												   KeyColumnStyle = (KeyColumn.match($.trim(key)) ? 'style="background-color:#eee;readonly:true;width:100px;"':'');

												   KeyConstraint =  ( ( (KeyColumn.indexOf(key) > -1) || ( (key.indexOf(SubKeys) > -1) && ($.trim(SubKeys)!='' ) ) ) ? ' KeyConstraint ="true" ': '' );

												   DateConstraint =  ( ( (DateColumns.search(key) > -1)  && ($.trim(DateColumns)!='' )  ) ? ' DateConstraint ="true" ': '' );

												   ReadonlyColumnsConstraint = ( ( (ReadonlyColumns.search(key) > -1)  && ($.trim(ReadonlyColumns)!='' )  ) ? ' disabled ': '' ); 

												   CriteriaConstraint =  ( (  (CriteriaColumns.indexOf(key) > -1) && ($.trim(CriteriaColumns)!='' ) )  ? ' CriteriaColumn ="true" ': '' );

												   InvisibleColumnsConstraint = ( ( (InvisibleColumns.search(key) > -1)  && ($.trim(InvisibleColumns)!='' )  ) ? ' display:none; ': '' ); 

												   hookConstraint =  ( ( (hookcolumns.indexOf(key) > -1)  && ($.trim(hookcolumns)!='' )  ) ? ' hook ="true" ': '' );

												   fkeyconstraint =' ';
												

													//alert(( $.trim(EditorColumn).search($.trim(key)) > -1 )  + '--' + key + '--' + EditorColumn );   
													

													if (Fkeys.length>0) {
														
														fkeyconstraint = ( $.inArray($.trim(key),Fkeys)!=-1 ? ' foreignkey=true ' : ' ' ) ;
													}
											
													//alert(key + ' ' + key.length + ' ' +$.inArray($.trim(key),Fkeys) + ' ' + fkeyconstraint);


													if (key != ImageColumn && ( $.trim(EditorColumn).search($.trim(key)) == -1 ) && key != 'Tags' && key != 'Comments' && key != 'UserId' && $.trim(key)!='')
													{ 
														if (i==1) {
															 ++i;			
													       $tablehtml = $tablehtml +  '<tr> <td style="'+ InvisibleColumnsConstraint +'" >' + key + '</td><td><input type="text"  name="' + key + '" id="' + key + '" value="' + value + '" ' + fkeyconstraint + KeyColumnStyle + KeyConstraint + DateConstraint + ReadonlyColumnsConstraint + CriteriaConstraint + hookConstraint +' class=".input-group.input-group-sm" /> ' +  checkidbtn + ' </td>'; 
													       }
														else {
															 $tablehtml = $tablehtml +  '<td style="' + InvisibleColumnsConstraint +'">' + key + '<td><input type="text" name="' + key + '" id="' + key + '" value="' + value + '" ' + fkeyconstraint + KeyColumnStyle + KeyConstraint + DateConstraint + ReadonlyColumnsConstraint + CriteriaConstraint + hookConstraint +' class=".input-group.input-group-sm" /></td></tr>';
															 i=1;
															}
																
													   //$( "#" + key ).val( value );
																						
													}
													else if (key == 'Comments' && $.trim(key)!='') { 
							
														$tablehtml = $tablehtml + ' <tr> <td> Offer </td> </tr> <tr> <td colspan="8">  <input type="text" name="' + key + '" id="' + key + '" value="' + value + '" ' + fkeyconstraint + ' placeholder="Comments" style="width: 97.5%" > </input>  </td></tr>';}

													else if (key == 'Tags') { 
							
														$tablehtml = $tablehtml + ' <tr> <td>' + key + '</td> </tr> <tr> <td colspan="8">  <input type="text" name="' + key + '" id="' + key + '" value="' + value + '" placeholder="Tags" style="width: 99.0%" > </input>  </td></tr>';}

													else if (key == 'Comments') { 
							
														$tablehtml = $tablehtml + ' <tr> <td> Offer </td> </tr> <tr> <td colspan="8">  <input type="text" name="' + key + '" id="' + key + '" value="' + value + '" placeholder="Comments" style="width: 99.0%" > </input>  </td></tr>';}
										
													else if ( ( $.trim(EditorColumn).search($.trim(key)) > -1 ) && ($.trim(key)!='') ) { 

														//alert(key);

														$tablehtml = $tablehtml + ' <tr> <td>' + key + '</td> </tr> <tr> <td colspan="8">  <textarea cols="68" rows="2" placeholder="Description"  maxlength="500" style="width: 99.0%;height: 50px;resize:none" name="' + key + '" id="' + key + '" >' + value + '</textarea>  </td></tr>';
														
														

															////if ($.trim(EditorColumn)!='') {	
															////	editor = $( '#' + EditorColumn ).cleditor({width:510, height:150})[0];
																//editor.focus();
															////}
									      
									      
												      //editor.clear().execCommand("inserthtml", value, null, null); 
												      
												   }
													
																					

									  	});	
									  
									  
										$tablehtml = $tablehtml + ' <tr> </tr>' ;

									    $tablehtml = $( $tablehtml + "</TABLE>");

									    //alert($tablehtml);

									    if (ispopup) {

									    	//alert(ImageColumn);
										    
										    $('.testpopup').remove();

											//223,235,246  220,233,246 223,235,247 235,244,255
											$divform = $('<div align="center"  style="width:50%;height:auto;top:40px;left:30%;position:absolute;background-color:rgb(235,243,252)" id="testmodal" />');
											$divform.wrap('<div class="testpopup" id="popupbg" style="z-index:'+ (currentPopupZindex + 100) +'"> </div> ');
											$headerbar= $('<div class="headerbar" id="headerbar" > <div id="logo" />  <h3>' + fname + ' </h3> </div>');

											//$closeform= $('<div class="close" id="CloseDetails" ></div> '); //onClick=$(".testpopup").hide();></div>');
											$closeform = $('<span class="tools pull-right"> <a class="fa fa-remove" href="javascript:;" style="margin-right:5px;background-color:#eee;padding-top:-15px;"></a> </span>	');
											$closeform.click( function () { GlobalCtrl=null;   $(".testpopup").hide();  /*formcreated=false; $("#popupbg").remove();*/ } );
											//$divform.append($closeform);

											$headerbar.append($closeform);

											$divform.append($headerbar);

											currentPopupZindex = (currentPopupZindex + 100);
										    $innerform = $( '<div name="' + fname + '" id="' + fname + '" formtype="' + formtype  + '" MasterCriteria="' + MasterCriteria  + '" ' + commoncolumnshtml + ' style="top:10px;margin:10px 20px;position:relative;overflow:auto;border: aliceblue 1px solid;"/> ');
									    
											//$innerform.append($('<div > <h4>' + fname + '</h4> </div>'));								
											
											$innerform.append($tablehtml);

											$divform.append($innerform);

											$fotorow =$('<tr> </tr>');
								
											$fototd = $('<td colspan="6" align="right" > </td>');
				
											if ( $.trim(ImageColumn)!='' ) {

											
												$choosephoto = $('<input type="button"  id="choose' + ImageColumn + '" value="Choose Fille" name="choose'+ImageColumn+'" class="myButton"  />');
												$resetphoto = $('<input type="button"  id="resetbtn1" value="reset Files" name="resetphoto1" class="myButton"  /> ');
												
												$resetphoto.click(function () {
													//$('#resetbtn').click();	
													   //alert('here');	
														//resetForm();

														///////////////////////////

														if ($.trim(ImageColumn)!='') 
														{
																					
															$("input[type='file'][id^=bkp]").remove();
															$("input[type='file']").val('');
														   	$('#'+ ImageColumn +'-list').html('');
															$('#choose'+ImageColumn).show();  
															ImageCount=0;

														}


														///////////////////////////


									
												});

												$choosephoto.click(function(e) {
											   	 //e.preventDefault();
																							   
											   	 $('#'+ImageColumn).trigger('click');   
												
												});

												$fototd.append($choosephoto);
												$fototd.append($resetphoto);

											}
																		
											$updatebtn = $('<button type="button"  id="Update' + fname + 'form" value="Update" name="Update' + fname + 'form" class="myButton"  > Update </button>');
				
											$updatebtn.click(function(e){

												e.preventDefault();
												//alert('in updatebtn ')
											   updateSelectedForm('clearformgeneral()');
												
											});

											$fototd.append($updatebtn);



											if ($.trim(isgeomap)=='true') 
											{	
													
													$.getScript("https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places");
													
													$Mapbtn = $('<input type="button"  id="Map' + fname + 'btn" value="Get Map Location" name="Map' + fname + 'btn" class="myButton"  />');
												  	
				 						         //$("#Map" + QryTable + "btn").click(function(){
													$Mapbtn.click(function () 
													{												
													 	TransferControl1 =$('#Latitude');//.draggable();
													 	TransferControl2= $("input[name=Longitude]");        
													 	$("#iframe").attr('src','testmap1.html'); 
										          	    $("#geodiv").show().draggable();
										          
										            });

													$fototd.append($Mapbtn);
													
													getmapvalues();
											}									


											$Closebtn = $('<input type="button"  id="Close' + fname + 'form" value="Close" name="Close' + fname + 'form" class="myButton"  onclick="ClosePopup();" />');

											$fototd.append($Closebtn);
											$fotorow.append($fototd);

											$refreshbtn = $('<input type="button"  id="refresh' + fname + 'form" value="refresh" name="refresh' + fname + 'form" class="myButton"  onclick="resetForm();callhooks();" />');

											$fototd.append($refreshbtn);
											$fotorow.append($fototd);

											$footertable = $('<table id="footertable"/> ')
											$footertable.append($fotorow);
											$footerdiv = $('<div id="footerdiv" style="width:94%;height:auto;margin: 30px auto 20px auto;border:#B9CBDD 1px solid;" />');
											$footerdiv.append($footertable);

											//$divform.append($innerform);	
											$divform.append($footerdiv);	
												
											if ( $.trim(ImageColumn)!='' ) 
											{
												
												$imagediv = $("<div>  </div> ");
												$imgfile =  $("<input  type='file'  id='" + ImageColumn + "' name='" + ImageColumn + "' style='display:none;width:0px:height:0px' />");
												//$("#" + ImageColumn).change( replaceMe );

												$imgfile.change( replaceMe );
																					
												$imagediv.append($imgfile);

												//input1 = $("#" + ImageColumn);
												
												//input1.change( replaceMe );k
												
												$divform.append($imagediv);

											   $imagelistdiv = $('<div id="FilesDiv" align="center"  style="margin: 30px auto 10px auto;width: 95%;border:2px solid #eeeeee; height:50px"> <ul id="' + ImageColumn + '-list" class="image-list"></ul> </div>');
											   $divform.append($imagelistdiv);
											
											}					
																
											$statusbar = $('<div id="statusbar" align="center"  style="margin: 10px auto 0 auto;width: 100%;background:#DDE1E4 ;border:2px solid #eeeeee; height:20px"> footer </div>');	
											$divform.append($statusbar);

											//$divform.resizable().draggable();

											$("body").append($divform.parent());

											//alert('in createform body' );

											//callDateconstraint();

											////
												if ($.trim(fname)!='') {	
												
													$('#'+fname).keydown( function (event) {
													  if ( event.which == 27 ) {
													     event.preventDefault();
													    $('#'+fname).parent().parent().hide();
													    //$('#popdialog').hide();
													  }
													});
													
												} 

									    	$('body').append($divform.parent());
									    	
									    	 $("#"+KeyColumn).attr('readonly',true).val('New');


									    }
									    else
									    {
									    	$(innerform).append($('<div > <span style="font-size:16px;">' + fname.toUpperCase() + '</span> </div>'));								
											$(innerform).append($tablehtml);
									    }	

									    	

										

									   	//$innerform.append($('<div > <h4>' + QryTable + '</h4> </div>'));								
										
										//$innerform.append($tablehtml);

										//

										
										//$tablehtml.append($fotorow);									
										
										callDateconstraint();

										callhooks();

										$("html, body").animate({ scrollTop: 0 }, "slow");

}

var createdynamictable = function (innerform , Qry,tname,appendOption) {

									//alert(innerform + '-' + Qry +'-' + tname);

									$th = Qry.substring(7,Qry.lastIndexOf('from')-1).split(",");
																			
									$tablehtml=null;$tableheader='';$tablerow='';$tablerowtpl=''
 
									

									 //commoncolumnshtml =( ($.trim(commoncolumns)!='') && (fno==1) ? ' commoncolumns="' + commoncolumns + '"  ' : ' ' );

								 	 //innerform = $('<div name="' + QryTable + '" id="' + QryTable + '" formtype="' + formtype + '" MasterCriteria="' + MasterCriteria + '" ' + commoncolumnshtml + ' style="top:20px;position:relative;margin:10px 20px;overflow:auto;border: aliceblue 1px solid;"/> ');

								 	 $tablehtml = '<table class="tbl1" id="' + tname + '" formtype="table" > ';
								 	 
								 	 //qth = Qry.substring(7,Qry.lastIndexOf('from')-1);
								 	 
								 	 //$th =  qth.split(",") ; //jQuery.makeArray(qth); //.split(',');
								 	 
								 	 //alert( qth + "\n" + $th );

									  var i=1; var key;checkidbtn='';KeyColumnStyle='';KeyConstraint ='';DateConstraint='';
									 
						
									  $.each($th,function(j,thd ) {  // $th.each(function () {
											
										    $thtxt = $.trim(thd); 

										    //alert($thtxt);
										    
										    if ($thtxt.toLowerCase().lastIndexOf(' as') > -1 )
										    {
										    	key = $.trim($thtxt.slice($thtxt.toLowerCase().lastIndexOf(' as')+3)) ;
											}
											else if ($thtxt.lastIndexOf('.') > -1 )
											{
										    	key = $thtxt.substring($thtxt.lastIndexOf('.')+1) ;
											}
											else if ($thtxt.lastIndexOf(')') > -1 )
											{
										    	key = $thtxt.substring($thtxt.lastIndexOf(')')+1) ;
											} 
											else 
											{
										    	key = $thtxt ;
											}
										    
										    value = (key.match(KeyColumn) ? '':'');
									
											//alert(key + ' --- '+ value);		

										    checkidbtn = (KeyColumn.match($.trim(key)) ? ' <input type="button" onclick=" checkid()" class="myButton" value="Check" /> ' : ' ' );	
										   
										    KeyColumnStyle = (KeyColumn.match($.trim(key)) ? 'style="background-color:#eee;readonly:true;width:100px;"':'');
											
			
											KeyConstraint =  ( (  (KeyColumn.indexOf(key) > -1) || ( (SubKeys.indexOf(key) > -1) && ($.trim(SubKeys)!='' ) ) ) ? ' KeyConstraint ="true" ': '' );

											CriteriaConstraint =  ( (  (CriteriaColumns.indexOf(key) > -1) && ($.trim(CriteriaColumns)!='' ) )  ? ' CriteriaColumn ="true" ': '' );

											DateConstraint =  ( ( (DateColumns.search(key) > -1)  && ($.trim(DateColumns)!='' )  ) ? ' DateConstraint ="true" ': '' );

											hookConstraint =  ( ( (hookcolumns.indexOf(key) > -1)  && ($.trim(hookcolumns)!='' )  ) ? ' hook ="true" ': '' );
											
											//alert(DateColumns + '-'+DateConstraint) ;

										    fkeyconstraint =' ';
									

											if (Fkeys.length>0) {
											
												//alert(key + '--- ' + $.inArray($.trim(key),Fkeys) );

												fkeyconstraint = ( $.inArray($.trim(key),Fkeys)!==-1 ? ' foreignkey=true ' : ' ' ) ;
											}
											
											
											ReadonlyColumns = $.trim(ReadonlyColumns);

											InvisibleColumnsConstraint = ( ( (InvisibleColumns.search(key) > -1)  && ($.trim(InvisibleColumns)!='' )  ) ? ' display:none; ': '' ); 

											ReadonlyColumnsConstraint = ( ( (ReadonlyColumns.search(key) > -1)  && ($.trim(ReadonlyColumns)!='' )  ) ? ' disabled ': '' ); 

											//alert(key + ' ' + ReadonlyColumnsConstraint + ' ' + ReadonlyColumns + ' ' + key.indexOf(ReadonlyColumns));

											$tableheader = $tableheader +  ' <th class="thflat" style="border:;'+ InvisibleColumnsConstraint +'"> ' + key + ' </th> ';
											$tablerowtpl = $tablerowtpl +  ' <td style="' + InvisibleColumnsConstraint + '"> <input type="text" style="width:100px;font-size:11px;border:none;' + InvisibleColumnsConstraint + '"  name="' + key + '" id="' + key + '-x" value="' + value + '" ' + fkeyconstraint + KeyColumnStyle + KeyConstraint + DateConstraint + hookConstraint + ReadonlyColumnsConstraint +  CriteriaConstraint + ' class=".input-group.input-group-sm" /> ' +  checkidbtn + ' </td>'; 														
											$tablerow = $tablerow +  ' <td style="' + InvisibleColumnsConstraint + '"><input type="text" style="width:100px;font-size:11px;border:none;overflow:hidden;margin:0px !important;'+ InvisibleColumnsConstraint +'"  name="' + key + '" id="' + key + '-1" value="' + value + '" ' + fkeyconstraint + KeyColumnStyle + KeyConstraint  + DateConstraint + hookConstraint +  ReadonlyColumnsConstraint +  CriteriaConstraint + ' class=".input-group.input-group-sm" /> ' +  checkidbtn + ' </td>'; 													
											
											//alert(InvisibleColumnsConstraint + '--\n' + $tablerowtpl );		
																						

									  });	
									  
									      
										$tablehtml = $tablehtml +  '<thead> <tr style="background-color:rgb(255,255,255)">' + ' <th class="thflat"> </th> ' + $tableheader + ' </tr></thead>' + '<tbody class="body_panel"> <tr datarow="true"> ' + '<td></td>' + $tablerow + '</tr>       <tr style="display:none;" totalrow="true" > </tr>    <tr style="display:none;" datarow="false" > ' + '<td></td>' + $tablerowtpl + '</tr> <tr> <td> <button class="addnewrow" onclick="addrow($(this));"> + </button></td> </tr>' ;   
									
										//alert(innerform + "\n" + $tablehtml );

									    $tablehtml = $( $tablehtml + "</TABLE>");

										if ( appendOption!='' &&  appendOption=='insertBefore' )
										{										
											thdr = $('<div > <span style="font-size:16px;">' + tname.toUpperCase() + '</span> </div>');
											thdr.insertBefore($(innerform));
											$tablehtml.insertAfter(thdr);
										}
										else if ( appendOption!='' &&  appendOption=='insertAfter' )
										{										
											thdr = $('<div > <span style="font-size:16px;">' + tname.toUpperCase() + '</span> </div>');
											thdr.insertAfter($(innerform))
											//$(innerform).append($tablehtml);
											$tablehtml.insertAfter(thdr);
										}
										else
										{
											$(innerform).append($('<div > <span style="font-size:16px;">' + tname.toUpperCase() + '</span> </div>'));								
											$(innerform).append($tablehtml);	
										}	
										
										callDateconstraint();

										//$divform.append($innerform);



}


//var createformquery = function( selector , context , tablename ) 
function createformquery ( selector , context , tname , formtype , columnmap ) 
{

    //ReferenceId=CurrentAppinfo[0].ReferenceId; MasterCriteria=CurrentAppinfo[0].MasterCriteria;KeyColumn=CurrentAppinfo[0].KeyColumn;commoncolumns=CurrentAppinfo[0].commoncolumns;
				
	//ReferenceKey='';//MainCriteria='';


	//alert( columnmap ? "full" + columnmap['Qty'] :"empty");

	//alert(selector + '---' + context + '--' + tname + '--' + formtype + '---' + ReferenceKey);

	colquery= {};Criteria="";k=1;j=1; 
	
	if (formtype == 'form')
	{

						formselector = ( context!='' ?  $(context) : $(selector).find('input:text,input:checkbox,textarea,select,radio,password,file,image') );  //$('#'+v).attr('formtype');
				
						//$('#'+v).find('input:text,textarea,select,checkbox,radio,password,file,image').each(function(){		
						//$(formselector).find('input:text,textarea,select,checkbox,radio,password,file,image').each(function(){

						//alert(formselector.children().length + selector);	

						formselector.each(function(){			


									elm = $(this);

									name = elm.attr('id'); 

									val='';

									if( elm.prop('type') == 'text' || elm.prop('type') == 'textarea')
									{	//alert(elm.attr('id')  + '..' + elm.val());
										val = elm.val();
									}
									else if (elm.prop('type') == 'select-one' )
									{
										//alert(elm.attr('id')  + '..' + elm.val());
										val = elm.find('option:selected').text();
									}
									else
									{
										//alert(elm.attr('id')  + '..' + elm.text());	
										val = elm.text();

									}

								    //alert(name + '---'+ val);

									th = name ; //$(this).attr('id');

									if (columnmap!='')
									{	
										th = ( (columnmap &&  (columnmap!='') && (typeof columnmap[th] !== "undefined") ) ?  columnmap[th] : th) ;
									}

									txt = val ; //$(this).val();
									
									//alert(th + '..' + commoncolumns + '..' + JSON.stringify(columnmap) );
									//alert('bbb');

									if ( (commoncolumns.indexOf(th)>-1) && (k==1) )
									{
										commoncolquery[th]=txt;
										//alert( 'commonquery' + ' ...' + th + '...' + txt)
									}	

									if(!elm.attr('foreignkey') &&  name!=ReferenceColumn && !elm.attr('DateConstraint') ) { 
						   			    //alert(th + ' ' + txt);					
						   				//formdata.append(name, val);
						   				colquery[th]=txt;
						   				
						   			} 
						   			else if(!elm.attr('foreignkey') &&  name!=ReferenceColumn && elm.attr('DateConstraint') ) { 

						   				txt = dateFormat(txt,'yyyy-mm-dd');
						   				colquery[th]=txt; //.format('yyyy-mm-dd');
						   				
						   				//alert( th +'...'+txt);
						   			}
						   			else if (name==ReferenceColumn && val!='New'){
						   						//alert(name + ' ' + val);
												//formdata.append(name, val);
												colquery[th]=txt;
												if (k==1){
													ReferenceId=name;
													ReferenceKey = txt;
												}
									}			
									else if (name==ReferenceColumn && val=='New'){
						   						//alert(name + ' ' + val);
												//formdata.append(name, val);
												colquery[th]=txt;
												if (k==1){
													ReferenceId=name;
													ReferenceKey = 'New';
												}			
						   			}
						   			else if ( elm.attr('type')=='checkbox' ){
											//alert(field.name + ' ' + $('#'+field.name).prop('checked')?1:0);					
											
											//formdata.append( name , $('#'+ name ).prop('checked')?1:0 );							  				
											colquery[th]=($('#'+ name ).prop('checked')?1:0);
						  				}
									//else if (name==EditorColumn && name!=''){
									//		alert(name + " : " + val);   
									//		formdata.append(name, editor.$area.val());
					   				//}	

					   				//alert('aaa');
									
									//Criteria = Criteria + (elm.attr('KeyConstraint') ? th + " = '" + txt + "\' And " : "") ;
									Criteria = Criteria + (elm.attr('CriteriaColumn') ? th + " = '" + txt + "\' And " : "") ;

									//alert(Criteria);


						});
					

					
				        Criteria = Criteria.slice(0,-4);
						

				        //alert(k + '...'+ MainCriteria + '...'+Criteria+'..'+commoncolquery);

						
						//if (k==1){

						//	MainCriteria = Criteria;
						//}
						//else
						//{
							
							Criteria = ( MainCriteria!='' ? MainCriteria  +  ( $.trim(Criteria)!='' ?  ( + ' And ' +  Criteria ) : " " ) : Criteria ) ;

						        //alert("Criteria --" + Criteria);

						//}

						//Criteria = ( MasterCriteria.toLowerCase().indexOf('where')>-1? ' and ' +   Criteria : " where " + Criteria );
						Criteria = ( " where " + Criteria );

						//alert(JSON.stringify(colquery)+ '----' + ReferenceId + '----' + ReferenceKey +'..'+"Criteria --" + Criteria + '\n'+JSON.stringify(commoncolquery));

				        if (!$.isEmptyObject(commoncolquery)) //(k!=1)
				        {
							 colquery =  $.extend({}, colquery, commoncolquery);
					 	}


				        //alert(colquery +'..'+Criteria +'..'+tname+'..'+ReferenceId+'..'+ReferenceKey);

						queries.push({TransQry:colquery,TableName:tname,ReferenceId:ReferenceId,ReferenceKey:ReferenceKey,Criteria:Criteria});	

						//alert(colquery +'..'+Criteria +'..'+tname+'..'+ReferenceId+'..'+ReferenceKey);

						//alert(JSON.stringify(queries));

			}
		else{

				//alert( tname+'--'+formtype + '-'+$('#' + tname + ' tbody tr[datarow="true"]').length );

				// table

				$('#' + tname + ' tbody tr[datarow="true"]').each(function (i, el) {		

    				var $tds = $(this).find('td'); 

    				colquery= {};Criteria="";
				     
			         $(this).find('td:gt(0)').each(function (){


			             j = $(this).index();

			             elm = $(this).find('input:text,input:checkbox,textarea,select,radio,password,file,image');
			             
			             name  = $.trim(elm.attr('name'));

			             ctrno = i + 1;

			             if ( (elm.attr('type')=='text') || (elm.attr('type')=='textarea') )
			             {
			             	txt = elm.val(); //$(this).find('input:text').val();
			             }
			             else if (elm.attr('type')=='checkbox')
			             {
			             	//alert(('#'+ name + "-"+ctrno) + '---' + $('#'+ name + "-"+ctrno ).attr('id') + '--' +  $('#'+ name + "-"+ctrno ).prop('checked'));

			             	txt = ($('#'+ name + "-"+ctrno).prop('checked')?1:0);
			             }	
			             else
			             {
			             	txt = elm.text();
			             }	


			             th = $.trim($('#' + tname + ' thead tr th').eq(j).text()); 
			             
			             //th = ( (columnmap && ( $.inArray(th,columnmap) != -1) && (columnmap!='') )?  columnmap[th] : th) ;

			             th = ( (columnmap &&  (columnmap!='') && (typeof columnmap[th] !== "undefined") ) ?  columnmap[th] : th) ;
			             
					          
			            if ( (commoncolumns.indexOf(th)>-1) && (k==1) )
						{
							commoncolquery[th]=txt;
						}

						//alert(name + '---' + txt + elm.attr('type'));

			   			if(!elm.attr('foreignkey') &&  name!=ReferenceColumn && !elm.attr('DateConstraint') ) 
			   			{ 
		   			    
		   					colquery[th]=txt;
		   					
		   					//alert(th + '-'+txt);

		   				} 
		   				else if(!elm.attr('foreignkey') &&  name!=ReferenceColumn && elm.attr('DateConstraint') ) 
		   				{ 
		   						txt = dateFormat(txt,'yyyy-mm-dd');
		   						colquery[th]=txt; //.format('yyyy-mm-dd');
		   						//alert(th + ' ' + txt);
		   						
			   		    }
			   			else if (name==RefrenceColumn && val!='New')
			   			{
			   						//alert(name + ' ' + val);
									//formdata.append(name, val);
									colquery[th]=txt;
								if (k==1){
									ReferenceId=name;
									ReferenceKey = txt;
								}
			   			}
			   			else if (name==RefernceColumn && val=='New')
			   			{
		   						//alert(name + ' ' + val);
								//formdata.append(name, val);
								colquery[th]=txt;
								if (k==1){
									ReferenceId=name;
									ReferenceKey = 'New';
								}
			   			}
			   			else if ( elm.attr('type')=='checkbox' )
			   			{
								//alert(name + ' ' + $('#'+name).prop('checked')?1:0);					
								//formdata.append( name , $('#'+ name ).prop('checked')?1:0 );							  				
								colquery[th]=($('#'+ name + ctrno ).prop('checked')?1:0);
			  			}
						//else if (name==EditorColumn && name!=''){
						//		alert(name + " : " + val);   
						//		formdata.append(name, editor.$area.val());
		   				//}

			         	//Criteria = Criteria + (elm.attr('KeyConstraint') ? th + " = '" + txt + "\' And " : "") ;
			         	
			         	Criteria = Criteria + (elm.attr('CriteriaColumn') ? th + " = '" + txt + "\' And " : "") ;

			         	
			         	//alert(Criteria);

			         });

			        Criteria = Criteria.slice(0,-4);
					
					//if (k==1){

					//	MainCriteria = Criteria;
					//}
					//else
					//{
					//	Criteria = MainCriteria + ' And ' + Criteria;
					//}

											
					if (Criteria.length > 0 ){
						
						//Criteria = ( ( MainCriteria !='' ) ? (MainCriteria  + ' And ' + Criteria) : Criteria );
						
						Criteria = ( MainCriteria!='' ? MainCriteria  +  ( $.trim(Criteria)!='' ?  ( + ' And ' +  Criteria ) : " " ) : Criteria ) ;
					}
					else if (MainCriteria.length>0){
						Criteria = MainCriteria ;	
					}	

					//alert(Criteria);

					//Criteria = ( MasterCriteria.toLowerCase().indexOf('where')>-1? ' and ' +   Criteria : " where " + Criteria );

					Criteria = ( " where " + Criteria );

			        //alert(JSON.stringify(commoncolquery));
					
		
			        if (!$.isEmptyObject(commoncolquery)) //(k!=1)
			        {
						 colquery =  $.extend({}, colquery, commoncolquery);
				 	}

				 	//alert ("\n"+JSON.stringify(colquery) + '-' + tname  + '-ReferenceId:' + ReferenceId + '-ReferenceKey:' + Referencekey + '-' + Criteria);

			        queries.push({TransQry:colquery,TableName:tname,ReferenceId:ReferenceId,ReferenceKey:ReferenceKey,Criteria:Criteria});
			        
			        //alert(JSON.stringify(queries));

			    	j++;

			});
		}						

		//alert(JSON.stringify(queries));

}




 function assignformdata(mdata1  , formtype ,  fname)
{

		//alert(JSON.stringify(mdata1));

		//$.each( mdata, function(key, obj)
		//{

			//$.each(obj,function(keyform,formvalue){

				//formtype = $('#'+$.trim(keyform)).attr('formtype');

				//alert(keyform + '----' + $('#'+$.trim(keyform)).attr('formtype'));
					
					if (formtype == 'form')
					{	
						$('#'+$.trim(fname)).find('input:text, input:password, input:file, select, textarea').val('');
					}

					i=1;noofrecords=0;rowlength=0;
						        							
					//$.each(formvalue, function(reckey,recvalue)
					$.each(mdata1, function(reckey,recvalue)	
					{
						
							//alert(JSON.stringify(recvalue));

							if (formtype == 'tableform')
							{

	    						rowlength = $('#' + fname + ' tbody tr[datarow="true"]').length;
	    						
	    						noofrecords = mdata1.length;

	    						//alert(noofrecords);
	    		
	        					if (i>rowlength) {
								
									//alert(i);

									$('#'+fname+' .addnewrow').click();

								}

							}	


							$.each(recvalue, function(key,value)
							{


	        						if ( ($.trim(fname)==$.trim(ImageTable)) && ($.trim(key)==$.trim(ImageColumn) ) ) {

	        							//if ($.trim(key)==$.trim(ImageColumn) ) {
	        							
	        								noofimages=value;
	        						}
	        						else
	        						{
	        							noofimages=0;	
	        						}	

	    							if (formtype == 'form')
	    							{


										if ( ( $.trim(EditorColumn).search($.trim(key)) == -1 ) && $.trim(key)!=ImageColumn && $.trim(key)!='' && !$( "#" + $.trim(key) ).attr('DateConstraint') ) { 
													

												if ( $( "#" + $.trim(key) ).prop('type') == 'text' ) 
												{	      
									      			//alert(key + '....'+ value);

									      			$( "#" + $.trim(key) ).val( value );
									      			
												}
												else
												{
													//alert(key + '....'+ value);

													$( "#" + $.trim(key) ).text( value );

												}	
								        }
								  		
								  		if ( ( $.trim(EditorColumn).search($.trim(key)) == -1 ) && $.trim(key)!=ImageColumn && $.trim(key)!='' && $( "#" + $.trim(key) ).attr('DateConstraint') ) {
								  			
								  			$( "#" + $.trim(key) ).datepicker({ format:datePickerFormat});

								  			//val = dateFormat(value,'dd/mmm/yyyy');
								  			val = dateFormat(value,dateFormatString);


								  			$( "#" + $.trim(key) ).datepicker('setDate',val);

								  		}	
								  		
								  		if ($.trim(key)==ImageColumn && ImageColumn!='')
								  		{
								  			noofimages = parseInt( value );
								  			//alert(key + '....'+ value);

								  		}
								  	
								  		if ( ( ( $.trim(EditorColumn).search($.trim(key)) > -1 ) && ($.trim(key)!='') ) && EditorColumn!=''){
								  			
								  			//alert(key + '....'+ value);

								  			$( "#" + $.trim(key) ).val( value );
								  			
								  			
										}
									}
									else
									{
										//alert(key + '-' + value);	

										if ( !$('#'+fname+' #'+ $.trim(key)+"-"+i).attr('DateConstraint') ) {  
											$('#'+fname+' #'+ $.trim(key)+"-"+i).val( value);
										}
										else
										{
											
											//value = dateFormat(value,'dd/mmm/yyyy');
											value = dateFormat(value,dateFormatString);

											$('#'+fname+' #'+ $.trim(key)+"-"+i).val( value);	
											$( "#" + fname+' #'+ $.trim(key)+"-"+i).datepicker('setDate',value);
										}	
									}	

							});
							
							i++;

					});
						
					
					
					if (formtype == 'tableform')
					{	

						rowlength = $('#' + keyform + ' tbody tr[datarow="true"]').length;

						if (rowlength > noofrecords)
						{
							extrarecords = rowlength-noofrecords;
							
							$extrarecords = $('#' + keyform + ' tbody tr[datarow="true"]:gt(' + (noofrecords-1) + ')'); //$('table tr:lt(6):gt(3)');
							$extrarecords.remove();


						}
					}
					
			//	});	
			
			//});


		

}

function getimages(imagedata)
{

				if (noofimages>0){
												
			     //var imgnames = value.split(",");
			     //for (var i in imgnames){
			     	
			        var j=1;
					$("#"+ImageColumn+"-list").html('');
				    $('.litem').remove();
					$('.fitem').remove();
					var $img1 =null; var $li=null;  reader =null;
					
                 
					$('#choose'+ImageColumn).hide();


					$.each(imagedata, function(reckey,recvalue)	
					{

						//alert(recvalue.FileId + '--' + recvalue.Extension);
						
						ext = recvalue.Extension;

              			$img1 = $('<img/>');
				  		 
						if ( (ext == 'jpg') || (ext == 'jpeg') || (ext == 'gif') || (ext == 'png') || (ext == 'bmp') || (ext == 'tif') )
						{
								$img1  = $("<img></img>");				
								//$img1.attr('src',e.target.result); //, file.fileName
								$img1.attr('src' , 'uploads/' + recvalue.FolderName + "/" + recvalue.FileId + '.' + ext +  '?' + new Date().getTime()); 
						}
						else
						{
								
								//$img = $('<span style="padding-right:2px" > </span>');	

								if  ( ( ext == 'doc') || ( ext == 'docx') )
								{	
									$img1 = $('<i  class="fa fa-file-word-o" style="float:left;padding-right:5px;"></i>');
									
									 
								}

								if  ( ( ext == 'pdf')  )
								{	
									$img1 = $('<i class="fa fa-file-pdf-o" style="float:left;padding-right:5px;"></i>');
									
								}
								if  ( ( ext == 'csv') || ( ext == 'xls') || ( ext == 'xlsx') )
								{	
									$img1 = $('<i class="fa fa-file-excel-o" style="float:left;padding-right:5px;"></i>');
									 
								}

								//$img.append($i);
						}

				  		 
		
					     $li=$('<li class="litem"/>');
					     $imgremove  = $('<img></img>').attr('src','images/remove.png').css('width',20).css('height',20);
						 $imgremove.click( function() { $(this).parent().remove(); });			
					     $img1.appendTo($li);
					     //$imgremove.appendTo($li);					 
						  											   
					     $li.appendTo($("#"+ImageColumn+"-list"));
					     
					     $('#'+ImageColumn).hide(); 


						/*$.each(recvalue, function(key,value)
						{ 
							alert(recvalue.FileId + '--' + recvalue.Extension);

						});*/
					
					});			
					
			       /*for ( j = 1; j <= noofimages; j++ ) 
			       { 
				       //alert($id + "-" + j);
					  
			  		  $img1 = $('<img/>');
			  		  $img1.attr('src' , 'uploads/' + $id + '-' + j + '.gif?' + new Date().getTime()); 
	
				     $li=$('<li class="litem"/>');
				     $imgremove  = $('<img></img>').attr('src','images/remove.png').css('width',20).css('height',20);
					  $imgremove.click( function() { $(this).parent().remove(); });			
				     $img1.appendTo($li);
				     //$imgremove.appendTo($li);					 
					  											   
				     $li.appendTo($("#"+ImageColumn+"-list"));
				     
				     $('#'+ImageColumn).hide(); 
			       }*/	
			     
		
			}



}


 function assignformdataMulti(mdata  , formtype ,  tname)
{

		//alert(JSON.stringify(mdata));

		$.each( mdata, function(key, obj)
		{
			

			$.each(obj,function(keyform,formvalue){

				formtype = $('#'+$.trim(keyform)).attr('formtype');

				//alert(keyform + '----' + $('#'+$.trim(keyform)).attr('formtype'));
					
					if (formtype == 'form')
					{	
						$('#'+$.trim(keyform)).find('input:text, input:password, input:file, select, textarea').val('');
					}

					i=1;noofrecords=0;rowlength=0;
						        							
					$.each(formvalue, function(reckey,recvalue)
					{
						
		
							if (formtype == 'tableform')
							{

	    						rowlength = $('#' + keyform + ' tbody tr[datarow="true"]').length;
	    						
	    						noofrecords=formvalue.length;

	    		
	        					if (i>rowlength) {
								
									//alert(i);

									$('#'+keyform+' .addnewrow').click();

								}

							}	


							$.each(recvalue, function(key,value)
							{


	        						if ( ($.trim(keyform)==$.trim(ImageTable)) && ($.trim(key)==$.trim(ImageColumn) ) ) {

	        							//if ($.trim(key)==$.trim(ImageColumn) ) {
	        							
	        								noofimages=value;
	        						}
	        						else
	        						{
	        							noofimages=0;	
	        						}	

	    							if (formtype == 'form'){


										if ( $.trim(key)!=EditorColumn && $.trim(key)!=ImageColumn && $.trim(key)!='' && !$( "#" + $.trim(key) ).attr('DateConstraint') ) { 
													

												if ( $( "#" + $.trim(key) ).prop('type') == 'text' ) 
												{	      
									      			//alert(key + '....'+ value);

									      			$( "#" + $.trim(key) ).val( value );

									      			
												}
												else
												{
													//alert(key + '....'+ value);

													$( "#" + $.trim(key) ).text( value );

												}	
								        }
								  		
								  		if ( $.trim(key)!=EditorColumn && $.trim(key)!=ImageColumn && $.trim(key)!='' && $( "#" + $.trim(key) ).attr('DateConstraint') ) {
								  			
								  			$( "#" + $.trim(key) ).datepicker({ format:datePickerFormat});

								  			//val = dateFormat(value,'dd/mmm/yyyy');
								  			val = dateFormat(value,dateFormatString);


								  			$( "#" + $.trim(key) ).datepicker('setDate',val);

								  		}	
								  		
								  		if ($.trim(key)==ImageColumn && ImageColumn!=''){
								  			noofimages = parseInt( value );
								  		}
								  	
								  		if ($.trim(key)==EditorColumn && EditorColumn!=''){
								  			

								  			$( "#" + $.trim(key) ).val( value );
								  			
								  			
										}
									}
									else
									{
										//alert(key + '-' + value);	

										if ( !$('#'+keyform+' #'+ $.trim(key)+"-"+i).attr('DateConstraint') ) {  
											$('#'+keyform+' #'+ $.trim(key)+"-"+i).val( value);
										}
										else
										{
											
											//value = dateFormat(value,'dd/mmm/yyyy');
											value = dateFormat(value,dateFormatString);

											$('#'+keyform+' #'+ $.trim(key)+"-"+i).val( value);	
											$( "#" + keyform+' #'+ $.trim(key)+"-"+i).datepicker('setDate',value);
										}	
									}	

							});
							
							i++;

					});
						
					
					
					if (formtype == 'tableform')
					{	

						rowlength = $('#' + keyform + ' tbody tr[datarow="true"]').length;

						if (rowlength > noofrecords)
						{
							extrarecords = rowlength-noofrecords;
							
							$extrarecords = $('#' + keyform + ' tbody tr[datarow="true"]:gt(' + (noofrecords-1) + ')'); //$('table tr:lt(6):gt(3)');
							$extrarecords.remove();


						}
					}
					
				});	
			
			});


		

}

function callDateconstraint(){

	//alert('in DateConstraint');

	//alert(dateFormatString);

	$('[DateConstraint]').each(function (argument) {
		 
		 //alert($(this).attr('id'));

		 $(this).addClass('input-append Date');//.attr('readonly','true');
		 
		 if (datePickerFormat!='')
		 	$(this).datepicker({ format:datePickerFormat});
		 else
		 	$(this).datepicker({ format:'dd/M/yyyy'});	
	});
	
	//alert('after DateConstraint');								
}

var ClosePopup = function () { 

$('.testpopup').hide();

};			

var callhooks = function () {

		if (hook.length>0 ) {			
											
			$.each(hook[0],function(keyh,vh){
		 		
		 		//alert(keyh + '...'+ vh);
		 		//eval(vh);
		 		setTimeout(vh,0);
		 		//if (typeof(vh) == 'function') {
						//	 call (vh);
								//callback(data1);
						//} 
		    });
		}
}

var replaceMe = function(e){

    //alert(max );

	var obj = $(this) , file;
	
	//alert($("input[type='file']").length);

	if($("input[type='file']").length > max)
	//if($("input[type='file'][id^='" + ImageColumn + "',id^='bkp']").length > max)
	{
		alert('only ' + max + ' images allowed');
		obj.val("");
		return false;
	}


				
	//$(obj).css({'position':'absolute','left':'-9999px'}).parent().prepend('<input type="file" name="'+obj.attr('name')+' multiple"/>')
	$(obj).each(function(){
	
	
		files = $(this).get(0).files; var $img ;
	
		for (var j=0; file = files[j]; j++) {
			
				//alert(file.size ); 
		   
			   //'<input type="file" name="'+ file.name + '" multiple"/>' 
					
						  
		
					//if ( (!!file.type.match(/image.*/)) && (file.size <=700*1024)  ) {
					if (  (file.size <=700*1024)  ) {
							
						

						var ext = file.name.split('.').pop();

						//alert(file.type + '--' + ext);

						if ( window.FileReader ) 
						{
							
							reader = new FileReader();
							
							reader.readAsDataURL(file);

						    reader.onloadend = function (e) { 

						    	//alert(file.name);
						    	
								if ( (ext == 'jpg') || (ext == 'jpeg') || (ext == 'gif') || (ext == 'png') || (ext == 'bmp') || (ext == 'tif') )
								{
									$img  = $("<img></img>");				
									$img.attr('src',e.target.result); //, file.fileName
								}
								else
								{
									
									//$img = $('<span style="padding-right:2px" > </span>');	

									if  ( ( ext == 'doc') || ( ext == 'docx') )
									{	
										$img = $('<i  class="fa fa-file-word-o" style="float:left;padding-right:5px;"></i>');
										
										 
									}

									if  ( ( ext == 'pdf')  )
									{	
										$img = $('<i class="fa fa-file-pdf-o" style="float:left;padding-right:5px;"></i>');
										
									}
									if  ( ( ext == 'csv') || ( ext == 'xls') || ( ext == 'xlsx') )
									{	
										$img = $('<i class="fa fa-file-excel-o" style="float:left;padding-right:5px;"></i>');
										 
									}

									//$img.append($i);
								}	
						    
						  		//$(obj).css({'position':'absolute','left':'-9999px'}).parent().prepend('<input type="file" name="'+ file.name +' multiple"/>')
	      	   


								$li = $('<li/>');
								$li.append($img);
								$imgremove  = $("<img></img>").attr('src',"images/remove.png").css('width',20).css('height',20);			   
								
										
								//$(obj).parent().addClass('fitem');
						   	    $imgremove.click(function(){
								//$('#bkp'+ImageCount).remove();
									$(obj).remove();					
									$(this).parent().remove();
							  					
								});

						   	    $li.append($imgremove);			   
								//$li.appendTo($("#"+ImageColumn+"-list"));
								//alert($li.html());
								$li.appendTo($('#' + ImageColumn + '-list'));
				
								isfile = true;

							};

							ImageCount++;

							$(obj).css({'position':'absolute','left':'-9999px','display':'none'});
							$(obj).attr('id','bkp'+ImageCount);
							//$(obj).attr('class','bkp');				
							
							$newfileinput = $(obj).clone();
							$newfileinput.attr('id',ImageColumn); //.addClass('newfitem');
							$(obj).parent().append($newfileinput);
							//$li.find("input[type='file']").change(replaceMe); 			   
							$newfileinput.change(replaceMe);
									
			  			}
				

				}
				else 
				{
						alert('file size or type doesnot match');				
				}
				
				   	
		}

		$('#'+ImageColumn).val('');
		
							
	});
}

  function replaceMeX(e)
  {

    //alert(max );

    alert('in file choose');

	var obj = $(this) , file;
	
	//alert($("input[type='file']").length);

	if($("input[type='file']").length > max)
	
	{
		alert('only ' + max + ' images allowed');
		obj.val("");
		return false;
	}


				
	
	$(obj).each(function()
	{
	
	
		files = $(this).get(0).files; var $img ;
	
		for (var j=0; file = files[j]; j++) {
			
				//alert(file.size ); 
		   
					
						  
		
					if (  (file.size <=700*1024)  ) {
							
						

						var ext = file.name.split('.').pop();

						//alert(file.type + '--' + ext);

						if ( window.FileReader ) 
						{
							
							reader = new FileReader();
							
							reader.readAsDataURL(file);

						    reader.onloadend = function (e) { 

						    	//alert(file.name);
						    	
								if ( (ext == 'jpg') || (ext == 'jpeg') || (ext == 'gif') || (ext == 'png') || (ext == 'bmp') || (ext == 'tif') )
								{
									$img  = $("<img></img>");				
									$img.attr('src',e.target.result); //, file.fileName
									
									/*try {
				                        localStorage.setItem("updloadfile", e.target.result);
				                    }
				                    catch (e) {
				                        alert("Storage failed: " + e);
				                    }*/

								}
								else
								{
									
									//$img = $('<span style="padding-right:2px" > </span>');	

									if  ( ( ext == 'doc') || ( ext == 'docx') )
									{	
										$img = $('<i  class="fa fa-file-word-o" style="float:left;padding-right:5px;"></i>');
										
										 
									}

									if  ( ( ext == 'txt')  )
									{	
										$img = $('<i class="fa fa-file-text-o" style="float:left;padding-right:5px;"></i>');
										
									}

									if  ( ( ext == 'pdf')  )
									{	
										$img = $('<i class="fa fa-file-pdf-o" style="float:left;padding-right:5px;"></i>');
										
									}

									if  ( ( ext == 'csv') || ( ext == 'xls') || ( ext == 'xlsx') )
									{	
										$img = $('<i class="fa fa-file-excel-o" style="float:left;padding-right:5px;"></i>');
										 
									}

									if  ( ( ext == 'dwg')  )
									{	
										$img = $('<img src="img/dwg.png" style="float:left;padding-right:5px;"></img>');
										 
									}

									//$img.append($i);
								}	
						    
						  		


								/*$li = $('<li/>');
								$li.append($img);
								$imgremove  = $("<img></img>").attr('src',"images/remove.png").css('width',20).css('height',20);			   
								
										
								//$(obj).parent().addClass('fitem');
						   	    $imgremove.click(function(){
								//$('#bkp'+ImageCount).remove();
									$(obj).remove();					
									$(this).parent().remove();
							  					
								});

						   	    $li.append($imgremove);			   
								//$li.appendTo($("#"+ImageColumn+"-list"));
								//alert($li.html());
								$li.appendTo($('#' + ImageColumn + '-list')); */
				
								isfile = true;

							};

							ImageCount++;

							/*$(obj).css({'position':'absolute','left':'-9999px','display':'none'});
							$(obj).attr('id','bkp'+ImageCount);
											
							
							$newfileinput = $(obj).clone();
							$newfileinput.attr('id',ImageColumn); //.addClass('newfitem');
							$(obj).parent().append($newfileinput);
							$newfileinput.change(replaceMe); */
									
			  			}
				

				}
				else 
				{
						alert('file size or type doesnot match');				
				}
				
				   	
		}

		//$('#'+ImageColumn).val('');
		
							
	});
}

function addrow(btnins){

idx =$(btnins).closest('tr').prev().index() ; //parent().parent().index();//closest('tr').index() ;

//alert(idx);

searchkey='';

$templatetr = $(btnins).closest('tr').siblings('[datarow=false]');//.prev() ; // $(btnins).parent().parent().prev(); // $(btnins).closest('tr').prev();

$rownew = $templatetr.clone();

//$rownew = $rownew.replace("-x","-"+(idx+1));
//input:not([name^=desc][name^=phone]

//$rownew.find('input:([id^-x])').each

$rownew.find('td:eq(0)').prepend('<button onClick="delrow($(this));"> X </button> ');

$rownew.insertBefore($templatetr.prev()); //$(btnins).closest('tr'));
//$($rownew).insertBefore($templatetr);

$rownew.css("display","");
$rownew.attr('datarow',"true");

$rownew.find('input[id*=-x]').each(function() {

	id = $(this).attr('id');
	id = id.replace("-x","-"+idx);
	//alert(id);
	$(this).attr('id',id) ;
	$(this).val('');

	if ($(this).attr('hook')){

		
		ln = id.indexOf("-");

		searchkey = id.slice(0, ln  );
		
	
		GlobalCtrl = idx ; //'#'+searchkey+"-"+idx;
		
		//callhookspecific(searchkey);

		//alert('in addrow before hook'+ GlobalCtrl);

		//alert(searchkey + '...'+GlobalCtrl);
		//$.when(callhookspecific(searchkey)).then(function(){
		//	alert('in addrow after hook'+ GlobalCtrl);
		//});
		callhookspecific(searchkey);


		//callhookspecific(searchkey).done(function(){

    		//GlobalCtrl=null;
    		
    		
		//});
		
		

		/*
		$.when(callhookspecific(searchkey)).done(function(){

    		//GlobalCtrl=null;
    		alert('in addrow hook'+ GlobalCtrl);
    		
		});
		
		
		if (AppInfo[0].subqueries.length){

				if ($.inArray(searchkey,AppInfo[0].subqueries.hook[0])) {
					setTimeout(vh,0);
				}
		}
		else
		{
			if ($.inArray(searchkey,AppInfo[0].hook[0])) {
					setTimeout(vh,0);
				}	
		}	
		*/



		//alert(id);
	}

	//$rownew.css("display","");
	//$rownew.attr('datarow',"true");

});

//alert($templatetr.html());

callDateconstraint();


//if (searchkey !='') {

	//vh = String(callhookspecific(searchkey));
	//vh = vh.replace("-1","-"+idx);

	//vh = callhookspecific(searchkey);

	
	
	//alert($('#'+searchkey+"-"+idx).attr('id'));


	//setTimeout(vh('#'+searchkey+"-"+idx),0);
//}

////callhooks();

//$templatetr.css("display","");

}

function delrow(btndel){

idx =$(btndel).parent().parent().index();//closest('tr').index() ;

//alert(idx);

$deletetr = $(btndel).closest('tr') ; // $(btndel).parent().parent(); // $(btnins).closest('tr').prev();

$curtbl = $deletetr.closest('table');

$deletetr.remove();

i=1;

$curtbl.find('[datarow="true"]').each(function(){
	
	$(this).find('input[id*=-]').each(function() {

		id = $(this).attr('id').slice(0,-1);
		id = id + i ; //id.replace("-x","-"+idx);
		//alert(id);
		$(this).attr('id',id) ;
	});

	i++;

});


//return;

}

 

function uploadfile(id) 
{

					//Display_Load();
					
					var i = 0, len = 0, img, reader, file;

				   	formdata = new FormData();

					formdata.append("companyid", companyid);	

					formdata.append("hostname" ,hst);
					formdata.append("databasename",db); 
					formdata.append("username",dusr); 
					formdata.append("password",$.trim(dp));

				    formdata.append("id", id);
				    
				    formdata.append("isSpecificFileId", isSpecificFileId);
				    
				   
				    formdata.append("documenttype",uploadDocType);

				    formdata.append("FolderName", uploadFolderName);		

		  		   if($.trim(id)!='')
				   {
				   	       //len = $("input[type='file']").get(0).files.length ; //   $('#'+'resumefile').get(0).files.length;
				   	
				   	       //alert('in id :' + id);

				   	       nooffiles = 0 ;

						   $("input[type='file']").each( function() { 
					
							   //$("input[type='file'][id^=" + ImageColumn + "]").each( function() { 
						  
						 		// Get an array of the files for this input
				    			var files = $(this).get(0).files;
						
								//alert(files);

				    			// Loop through files
				    			for (var j=0; file = files[j]; j++) 
				    			{
		
									//alert(file.size);
					    
					        		// File size, in bytes
					        		var size = file.size
					        		var name = file.name;
								
									formdata.append("uploadedfiles[]", file);

								
									//alert('file name : ' + file.name);					 
									
									nooffiles ++;

								  }   	
						});

						//alert('nooffiles :' + nooffiles );
						
						if ( nooffiles >  0 )   
						{
							$.ajax({
								url: FTPReferer+"UploadFile.php",
								type: "POST",
								data: formdata,
								processData: false,
								contentType: false,
								success: function (res) 
								{
										alert(res);
										//$('#EmailId').val(res);

								}
							});
						}

					}


}



var getmapvalues = function () { 

  if (isgeomap=='true') {
	
    // geo map functions 

/*		  	
        $("#Map" + QryTable + "btn").click(function(){
			 TransferControl1 =$('#Latitude');//.draggable();
			 TransferControl2= $("input[name=Longitude]");        
			 $("#iframe").attr('src','testmap1.html'); 
          $("#geodiv").show().draggable();
          
        });
*/

        $("#getmapvaluesbtn").click(function(){
 			 
			 var iframe = document.getElementById('iframe');
			 var iframe0document=iframe.contentDocument||iframe0.contentWindow.document;
   		 	 var lat1 = iframe0document.getElementById("lat1").value;
			 var lng1 = iframe0document.getElementById("lng1").value;
             TransferControl1.val(lat1);//.draggable();
			 TransferControl2.val(lng1); 
 		     $("#geodiv").hide();        			 
  			  //alert($(iframe).contents().find('input').html());// .find("input[name^=lat1]").val());
          
        });

        $("#closegeodiv").click(function(){
          $("#geodiv").hide();
        }).click();            
            
    // end geo map functions	
	
 }


}

function dateFormat(userDate,format)
{

      //var userDate = '04.11.2014';
        var from = userDate.split("/");
        //var f = new Date(from[2], from[1], from[0]);
        var f = new Date(userDate);
        var formateddatestring;
        //alert(f);
        //var formateddatestring = f.getFullYear() + "-" + f.getMonth() + "-" + f.getDate();
      if (format == 'yyyy-mm-dd'){
       		
      	  //alert(userDate + ' - ' +String($.trim(( f.getMonth() + 1 ))).length);	
       				
          formateddatestring = f.getFullYear() + "-" + ( (String($.trim(( f.getMonth() + 1 ))).length)==1 ? ( '0'+ $.trim(( f.getMonth() + 1 )) ) : $.trim(( f.getMonth() + 1 )) )      + "-" +  ( (String($.trim(( f.getDate() + 1 ))).length)==1 ? ( '0'+ $.trim(( f.getDate()  )) ) : $.trim(( f.getDate() )) )    ;// f.getDate();
      }
      else if  ( (format == 'mm-dd-yyyy') )
      {
          formateddatestring = ( (String($.trim(( f.getMonth() + 1 ))).length)==1 ? ( '0'+ $.trim(( f.getMonth() + 1 )) ) : $.trim(( f.getMonth() + 1 )) )      + "-" + ( (String($.trim(( f.getDate() + 1 ))).length)==1 ? ( '0'+ $.trim(( f.getDate()  )) ) : $.trim(( f.getDate() )) ) + "-" +  f.getFullYear() ;
      }
      else if  ( (format == 'M/dd/yyyy')  )
      {
          formateddatestring = ( (String($.trim(( f.getMonth() + 1 ))).length)==1 ? ( '0'+ $.trim(( f.getMonth() + 1 )) ) : $.trim(( f.getMonth() + 1 )) )      + "/" + ( (String($.trim(( f.getDate() + 1 ))).length)==1 ? ( '0'+ $.trim(( f.getDate()  )) ) : $.trim(( f.getDate() )) ) + "/" +  f.getFullYear() ;
      }
      else
      {
        
         
         var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
         monthNumber =  f.getMonth() + 1;
         
         day = f.getDate();
         
         //alert(String(day).length);

         //formateddatestring =  (  f.getDate() ) + "/" + months[monthNumber - 1] + "/" + f.getFullYear();
         
         formateddatestring =  ( (String($.trim(day)).length)==1 ? ( '0'+ $.trim(day) ) : $.trim(day) ) + "/" + months[monthNumber - 1] + "/" + f.getFullYear();
      }    



        //alert(formateddatestring);
        return formateddatestring;
}                     


function DateDiff(date1,date2,interval) 
{
	var second=1000, minute=second*60, hour=minute*60, day=hour*24, week=day*7;
    date1 = new Date(date1);
    date2 = new Date(date2);
    var timediff = date2 - date1;
    
    if (isNaN(timediff)) return NaN;
    switch (interval) {
        case "years": return date2.getFullYear() - date1.getFullYear();
        case "months": return (
            ( date2.getFullYear() * 12 + date2.getMonth() )
            -
            ( date1.getFullYear() * 12 + date1.getMonth() )
        );
        case "weeks"  : return Math.floor(timediff / week);
        case "days"   : return Math.floor(timediff / day); 
        case "hours"  : return Math.floor(timediff / hour); 
        case "minutes": return Math.floor(timediff / minute);
        case "seconds": return Math.floor(timediff / second);
        default: return undefined;
    }

    //var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

    //var diff =  Math.floor(( Date.parse(str2) - Date.parse(str1) ) / 86400000);
}         


Date.prototype.addDays = function(days)
{
    var dat = new Date(this.valueOf() + ( parseInt(days) * 24 * 60 * 60 * 1000 ) );

    return dat;
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}


function replaceMeX(e1)
{

    //alert(max );

  //alert('in file choose New');

  var obj = e1 , file; //$(this)
  
  //alert($("input[type='file']").length);

  if($("input[type='file']").length > max)
  
  {
    alert('only ' + max + ' images allowed');
    obj.val("");
    return false;
  }


  
  $(obj).each(function()
  {
  
  
    files = $(this).get(0).files; var $img ;
  
    for (var j=0; file = files[j]; j++) {
      
          //alert(file.size + '--' + file.name ); 
             
    
          if (  (file.size <=700*1024)  ) {
              
            var ext = file.name.split('.').pop();

            //alert(window.FileReader + '---' + file.type + '--' + ext );

            if ( window.FileReader ) 
            {
              
              reader = new FileReader();
              
              reader.readAsDataURL(file);

                reader.onloadend = function (e) { 

                  //alert('filename : ' + file.name);
                  
                if ( (ext == 'jpg') || (ext == 'jpeg') || (ext == 'gif') || (ext == 'png') || (ext == 'bmp') || (ext == 'tif') )
                {
                  $img  = $("<img></img>");       
                  $img.attr('src',e.target.result); //, file.fileName
                  
                 /* try {
                                localStorage.setItem("updloadfile", e.target.result);
                                
                            }
                            catch (e) {
                                alert("Storage failed: " + e);
                            }*/

                }
                else
                {
                  
                  //$img = $('<span style="padding-right:2px" > </span>');  

                  if  ( ( ext == 'doc') || ( ext == 'docx') )
                  { 
                    $img = $('<i  class="fa fa-file-word-o" style="float:left;padding-right:5px;"></i>');
                    
                     
                  }

                  if  ( ( ext == 'txt')  )
                  { 
                    $img = $('<i class="fa fa-file-text-o" style="float:left;padding-right:5px;"></i>');
                    
                  }

                  if  ( ( ext == 'pdf')  )
                  { 
                    $img = $('<i class="fa fa-file-pdf-o" style="float:left;padding-right:5px;"></i>');
                    
                  }

                  if  ( ( ext == 'csv') || ( ext == 'xls') || ( ext == 'xlsx') )
                  { 
                    $img = $('<i class="fa fa-file-excel-o" style="float:left;padding-right:5px;"></i>');
                     
                  }

                  if  ( ( ext == 'dwg')  )
                  { 
                    $img = $('<img src="images/dwg.png" style="float:left;padding-right:5px;"></img>');
                     
                  }

                  //$img.append($i);
                } 
                
				//alert('ext : ' + ext);                  

				//alert('#' + ImageColumn + '-list');

                $li = $('<li />');
                $li.append($img);
                $imgremove  = $("<img></img>").attr('src',"images/remove.png").css('width',20).css('height',20);         
                
                    
                //$(obj).parent().addClass('fitem');
                $imgremove.click(function(){
                //$('#bkp'+ImageCount).remove();
                  //////$(obj).remove();          
                  $(this).parent().remove();
                          
                });

                $li.append($imgremove);        
                //$li.appendTo($("#"+ImageColumn+"-list"));
                //alert($li.html());

                /////$li.appendTo($('.imageGeneric-Div')); /**/
        		$('.imageGeneric-List').html('').append($li);
                isfile = true;

              };

              ImageCount++; 

              /*$(obj).css({'position':'absolute','left':'-9999px','display':'none'});
              $(obj).attr('id','bkp'+ImageCount);
                      
              
              $newfileinput = $(obj).clone();
              $newfileinput.attr('id',ImageColumn); //.addClass('newfitem');
              $(obj).parent().append($newfileinput);
              $newfileinput.change(replaceMe); */
                  
              }
        

        }
        else 
        {
            alert('file size or type doesnot match');       
        }
        
            
    }

    //$('#'+ImageColumn).val('');
    
              
  });
}


function uploadfilecustom(id) 
{

					//alert(id);
					//Display_Load();
					
					var i = 0, len = 0, img, reader, file;nooffiles=0;

				    ///////////////////////////////////////////////

				    formdata = new FormData();

					formdata.append("companyid", companyid);	

					formdata.append("hostname" ,hst);
					formdata.append("databasename",db); 
					formdata.append("username",dusr); 
					formdata.append("password",$.trim(dp));

				    formdata.append("id", id);
				    
				    formdata.append("isSpecificFileId", isSpecificFileId);
				    
				    formdata.append("documenttype",uploadDocType);

				    formdata.append("FolderName", uploadFolderName);		

				    //alert(isSpecificFileId +'-'+uploadDocType +'-'+uploadFolderName);

				    //////////////////////////////////////////////

		  		   if($.trim(id)!='')
				   {
				   	       //len = $("input[type='file']").get(0).files.length ; //   $('#'+'resumefile').get(0).files.length;
				   	
				   	       //alert('in id :' + id);

				   	       nooffiles = 0 ;

						   $("input[type='file']").each( function() { 
					
							   //$("input[type='file'][id^=" + ImageColumn + "]").each( function() { 
						  
						 		// Get an array of the files for this input
				    			var files = $(this).get(0).files;
						
								//alert(files);

				    			// Loop through files
				    			for (var j=0; file = files[j]; j++) 
				    			{
		
									//alert(file.name + '-' +file.size);
					    
					        		// File size, in bytes
					        		var size = file.size
					        		var name = file.name;
								
									formdata.append("uploadedfiles[]", file);

									isfile=true;
								
									//alert('file name : ' + file.name);					 
									
									nooffiles ++;

					
								  }   	
						});

						//alert('nooffiles :' + nooffiles );


						/////////////file = localStorage.getItem("updloadfile");


						///////////formdata.append("uploadedfiles[]", file); 


						////$('#PlayerImage').attr('src',file);					

						//nooffiles = 1;
						
						if ( nooffiles >  0 )   
						{
							
							//alert(FTPReferer+"UploadFile.php");

							$.ajax({
								url: FTPReferer+"UploadFile.php",  //
								type: "POST",
								data: formdata,
								processData: false,
								contentType: false,
								success: function (res) 
								{
										alert(res);
										//$('#EmailId').val(res);

								}
							});
						}


					
					}


}

function RenameSpecificFile(fid,toid) 
{

					//alert(fid+'-1-'+toid);

					
					//Display_Load();
					
					var i = 0, len = 0, img, reader, file;

				    ///////////////////////////////////////////////

				    formdata = new FormData();

					formdata.append("companyid", companyid);	

					formdata.append("hostname" ,hst);
					formdata.append("databasename",db); 
					formdata.append("username",dusr); 
					formdata.append("password",$.trim(dp));

				    formdata.append("FromId", fid); formdata.append("ToId", toid);
				    
				    formdata.append("isSpecificFileId", isSpecificFileId);
				    
				    formdata.append("documenttype",uploadDocType);

				    formdata.append("FolderName", uploadFolderName);		


				    //////////////////////////////////////////////

		  		  if($.trim(fid)!='')
				   {
				   	       //len = $("input[type='file']").get(0).files.length ; //   $('#'+'resumefile').get(0).files.length;
				   	
				   	       //alert('in id :' + id);

				   	       nooffiles = 0 ;

						 /*   $("input[type='file']").each( function() { 
					
							   //$("input[type='file'][id^=" + ImageColumn + "]").each( function() { 
						  
						 		// Get an array of the files for this input
				    			var files = $(this).get(0).files;
						
								//alert(files);

				    			// Loop through files
				    			for (var j=0; file = files[j]; j++) 
				    			{
		
									//alert(file.size);
					    
					        		// File size, in bytes
					        		var size = file.size
					        		var name = file.name;
								
									formdata.append("uploadedfiles[]", file);

								
									//alert('file name : ' + file.name);					 
									
									nooffiles ++;

								  }   	
						});*/

						//alert('nooffiles :' + nooffiles );

						//alert('2');

						/////////////file = localStorage.getItem("updloadfile");

						//					alert('3');


						///////////formdata.append("uploadedfiles[]", file); 

						//					alert('4');

						//$('#PlayerImage').attr('src',file);					

						nooffiles = 1;
						
						if ( nooffiles >  0 )   
						{
							
							//alert(FTPReferer+"RenameSpecificFile.php");

							$.ajax({
								url: FTPReferer+"RenameSpecificFile.php",  //
								type: "POST",
								data: formdata,
								processData: false,
								contentType: false,
								success: function (res) 
								{
										alert(res);
										//$('#EmailId').val(res);

								}
							});
						}

											//alert('5');

					
					}


}


function startup()
{
	hst = data1[0].hostname; dusr = data1[0].username; dp = data1[0].password; db =data1[0].databasename; apf = data1[0].apf; gcompanyname = data1[0].companyname;

	HTTPReferer = data1[0].referer;  // HTTPReferer=  'https://imasssolutions.com/'; // 'http://erp.limrahsoft.com/'; 

 	//HTTPReferer= 'http://localhost:85/erp1/template/'; 

	//alert('here in common ' + HTTPReferer +'\n'+ JSON.stringify(data1));

	$.getScript('js/blogic.js');

	//alert('in startup' );

};
