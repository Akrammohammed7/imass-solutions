//currentitem = {productcode: productcode, productname : productname,moq:moq,qty:moq,price:price,size:size,color:color,Extension:Extension};

//cart.push(currentitem);

//cart = JSON.parse( sessionStorage.getItem('cart') );

//sessionStorage.setItem("cart",JSON.stringify(cart));

isSpecificFileId=false; uploadDocType="CandidateResume";uploadFolderName="Resumes";FTPReferer="http://erp.limrahsoft.com/"; cart=null;

//FTPReferer="http://localhost:85/erp1/template/";

//alert('in custom'+$(location).attr('path')); 

locationurl = $.trim(location.href);

//alert('in custom \n '+location.href + '\n' + 'http://localhost:85/it-talent/htmltemplate/index.html' + '\n' + (locationurl=='http://localhost:85/it-talent/htmltemplate/index.html') );



if (locationurl=='http://www.theittalent.com/' || locationurl=='http://www.theittalent.com/index.html'   || locationurl=='http://localhost:85/it-talent/htmltemplate/'  || locationurl=='http://localhost:85/it-talent/htmltemplate/index.html')
{	
	//$('#videodiv').find('.owl-stage').html('');
	InitiateHomePage();
}

if (locationurl=='http://www.theittalent.com/job-listing.html' || locationurl=='http://www.theittalent.com/job-listing.html'   || locationurl=='http://localhost:85/it-talent/htmltemplate/job-listing.html'  || locationurl=='http://localhost:85/it-talent/htmltemplate/job-listing.html')
{	

	 callsearch();

}

if (locationurl=='http://www.theittalent.com/job-details.html' || locationurl=='http://www.theittalent.com/job-details.html'   || locationurl=='http://localhost:85/it-talent/htmltemplate/job-details.html'  || locationurl=='http://localhost:85/it-talent/htmltemplate/job-details.html')
{	

	 getJobDetails();

}



//alert(locationurl.search('http://www.ytlstar.com/orderconfirm.html') );

/*if ( (locationurl=='https://www.ytlstar.com/orderconfirm.html') || (locationurl.search('https://www.ytlstar.com/orderconfirm.html') > -1 ) )
{	
	savePlayerInfo();
}*/

/*if ($.trim(location.href)=='http://www.ytlstar.com/faq.html')
{	
	savePaytmInfo();
}*/

/*function createformquery ( selector , context , tname , formtype , columnmap ) 
{
									colquery= {};Criteria="";k=1;j=1; 

									formselector = ( context!='' ?  $(context) : $(selector).find('input:text,input[type=email],input[type=date],input:checkbox,textarea,select,radio,password,file,image') ); 
							
									

									//alert(  selector + '-' + formselector.children().length);	

									formselector.each(function()
									//$(selector).find('input:text,input:checkbox,textarea,select,radio,password,file,image').each(function()
									{			
												//alert('1');

												elm = $(this); //alert(elm.attr('name'));

												th = elm.attr('name'); 
												
												txt = elm.val();

												colquery[th]=txt;
									});

									//alert(JSON.stringify(colquery));

									sessionStorage.setItem("cart",JSON.stringify(colquery));

									cart = JSON.parse( sessionStorage.getItem('cart') );

									//alert(cart);

}*/


function createformquery ( selector , context , tname , formtype , columnmap ) 
{
                                    colquery= {};Criteria="";k=1;j=1;  //alert('here');

                                    formselector = ( context!='' ?  $(context) : $(selector).find('input:text,input[type=email],input[type=password],input[type=phone],input[type=date],input[type=time],input:checkbox,textarea,select,radio,password,file,image') ); 
                            
                                    //alert(  selector + '-' + formselector.children().length); 

                                    formselector.each(function()
                                    //$(selector).find('input:text,input:checkbox,textarea,select,radio,password,file,image').each(function()
                                    {           
                                                //alert('1');

                                                elm = $(this); //alert(elm.attr('id'));

                                                th = elm.attr('id'); 
                                                
                                                if (elm.attr('id')=='Tags')
                                                {
                                                    txt = elm.find('option:selected').toArray().map(item => item.text).join();
                                                }
                                                else if (elm.attr('type')=="select" || elm.prop('type') == 'select-one')
                                                {
                                                    txt = elm.find('option:selected').text();
                                                }
                                                else
                                                {    
                                                    txt = elm.val();
                                                }


                                                colquery[th]=txt;
                                    });

                                   //alert(JSON.stringify(colquery));

                                  
                                    /////sessionStorage.setItem("cart",JSON.stringify(colquery));

                                    ////cart = JSON.parse( sessionStorage.getItem('cart') );

                                    //alert(cart);

}



function clearPostform(el)
{
    $(el).find('input:text,input[type=email],input[type=date],input[type=time],input[type=password],input[type=phone],input:checkbox,textarea,select,radio,password,file,image').val('');
	 
}

function uploadresume (argument) {
        
        // body...
        
        /*alert('here1');*/  colquery= {};

        //alert( sessionStorage.getItem("Id") + '---' +  sessionStorage.getItem("LoginType") );

        if ( sessionStorage.getItem("Id")=='' ||  sessionStorage.getItem("Id")==null)
        {
            //alert('please register or login first');
             AddReferenceKey=false;
            //return;
        }  
        else
        {
            $('#CandidateId').val(sessionStorage.getItem("Id"));  AddReferenceKey=true;

        }  
        
        createformquery('#ResumeInfo',''); //alert(JSON.stringify(colquery));

        colquery['UserId'] = UserId;

        QryTable='CandidateMaster';KeyColumn='CandidateId'; ImageColumn='ResumeFiles'; ImageTable = 'CandidateMaster';

        masterdetail=false; queries=[];commoncolumns="";commoncolquery=""; customqueries =[] ; //colquery={};

        ReferenceColumn="CandidateId"; //ReferenceId="ServiceId"; ReferenceKey = $('#ServiceId').val();

        MainCriteria ="CandidateId = '" + $('#CandidateId').val() + "'";

        queries.push({TransQry:colquery,TableName:QryTable,ReferenceId:ReferenceColumn,ReferenceKey:$('#CandidateId').val(),Criteria:" Where " + MainCriteria}); 

        //alert(JSON.stringify(queries));

        customqueries =  queries;

        updateSelectedForm('clearPostform("#ResumeInfo");');
        
        customqueries = [];

    }

function GetLoginInfo(orderid)
{

		//alert('in GetLoginInfo');

		//alert($('#idRegisterEmpL').prop('checked'));
       
        Lqueries = []; //orderid=cart['order_id'];
	   
	    u = $('#UName').val() ; p = $("#Pwd").val() ;	
	    
	   

	   if ($('#idRegisterEmpL').prop('checked')) //($('#LoginType').val()=="Agent") 
	   {	
       		$sql = " SELECT * From RecruiterMaster where ( UserName='" + u + "' Or EmailId='" + u + "') And Password='" + p + "\'" ;
       		Lqueries.push({TransQry:$sql,formattype:'json',keyname:"LoginInfo"});

       		//$sql = " SELECT * From PlayerMaster P Where AgentCode In ( Select AgentCode from SalesAgentMaster S where S.UserName='" + u + "' And S.Password='" + p + "\' )" ; // And P.AgentCode=S.AgentCode
       		//Lqueries.push({TransQry:$sql,formattype:'json',keyname:"Transactions"});
       }
       else
       {
       		$sql = " SELECT * From CandidateMaster where ( UserName='" + u + "' Or EmailId='" + u + "') And Password='" + p + "\'" ;
       		Lqueries.push({TransQry:$sql,formattype:'json',keyname:"LoginInfo"});
       }	


       
       //alert(JSON.stringify(Lqueries));

       QArray = JSON.stringify(Lqueries);

       getCustomData(QArray,putLoginInfo);  
}


function putLoginInfo(mdata)
{
	//orderid=cart['order_id'];
		
	//sessionStorage.removeItem("cart"); cart=null; //alert('Done');

	//alert(JSON.stringify(mdata));
	//orderid = mdata[0].PLayerInfo[0].RefNo;

	//alert(mdata[0].LoginInfo.length)

	if (mdata[0].LoginInfo.length>0)
	{	
		$('#LoginModal').modal('hide');

	  /*	if  ($('#agentoption').prop('checked'))  // ($('#LoginType').val()=="Agent") 
		{
			AgentCode = mdata[0].LoginInfo[0].AgentCode;
			//alert("Hello : " + mdata[0].LoginInfo[0].AgentName + " , Code : " + AgentCode + " , Login success "); 
			sessionStorage.setItem("AgentCode",AgentCode);
			//location.href ="register.html";
			 $('.agent-page').show(); $('.player-page').hide();

			 AgentName = mdata[0].LoginInfo[0].AgentName; $('.agentname').text('Agent Name : ' + AgentName); 

			 tr=""; Rs = mdata[1].Transactions; k=1;

			 $.each ( Rs,function(key,value) {

			 			tr = tr + '<tr> <td>'+k+'</td> <td>'+ Rs[key].RegistrationDate +'</td> <td>'+ Rs[key].PlayerName+'</td> <td>'+ Rs[key].Email+'</td> <td>'+ Rs[key].PhoneNumber+'</td> <td>'+ Rs[key].DateOfBirth+'</td> <td>'+ Rs[key].PlayerType+'</td> <td> '+  Rs[key].PlayerExpertise +' </td> <td>'+ Rs[key].City+'</td> <td>'+ Rs[key].State+'</td> <td>'+ Rs[key].Zip+'</td> </tr> ';
                    	k++;	
            });          

			$('.table-product tbody').html(tr); 

		}
		else
		{	
			PlayerId = mdata[0].LoginInfo[0].PlayerId; Extension = mdata[0].LoginInfo[0].Extension;  PlayerName = mdata[0].LoginInfo[0].PlayerName; 

			PlayerType = mdata[0].LoginInfo[0].PlayerType; PlayerExpertise = mdata[0].LoginInfo[0].PlayerExpertise;  DateOfBirth = mdata[0].LoginInfo[0].DateOfBirth; 

			Address = mdata[0].LoginInfo[0].Address; City = mdata[0].LoginInfo[0].City;  State = mdata[0].LoginInfo[0].State;   Zip = mdata[0].LoginInfo[0].Zip; 

			AgentCode = mdata[0].LoginInfo[0].AgentCode; //PlayerExpertise = mdata[0].LoginInfo[0].PlayerExpertise;  DateOfBirth = mdata[0].LoginInfo[0].DateOfBirth; 

			//alert(PlayerId + '-' + Extension + '-' + PlayerName + '-' + PlayerType + '-' + PlayerExpertise + '-' + DateOfBirth);

		 	$('.agent-page').hide(); $('.player-page').show();
		 	$('.player-img img').attr('src' , 'http://erp.limrahsoft.com/'+companyid+"/uploads/PlayerImages/"+PlayerId+"-1."+Extension);
		 	//alert('http://erp.limrahsoft.com/'+companyid+"/uploads/PlayerImages/"+PlayerId+"."+Extension);
		 	$('.playername').text(PlayerName); $('.playertype').text(PlayerType); $('.playerexpertise').text(PlayerExpertise);  $('.dateofbirth').text(DateOfBirth);
		 	$('.address').text(Address); $('.city').text(City); $('.state').text(State);  $('.zip').text(Zip);  $('.agentcode').text(AgentCode);

		}*/ 
		
		sessionStorage.setItem("UserName",$('#UName').val() ); sessionStorage.setItem("LoginType",  ( $('#idRegisterEmpL').prop('checked') ? 'Recruiter' : 'Candidate') );

		sessionStorage.setItem("EmailId",mdata[0].LoginInfo[0].EmailId ); 

	    //cart = JSON.parse( sessionStorage.getItem('cart') );

	    UserInfo = sessionStorage.getItem('UserName') +'-' + sessionStorage.getItem('EmailId')  + '-' +sessionStorage.getItem('LoginType');

	    if ( $('.candidate-acc').hasClass('active') ) // ($('#idRegisterEmp').prop('checked')) 
	    {	
	    	//alert(mdata[0].LoginInfo[0].CandidateId);

	    	sessionStorage.setItem("Id",mdata[0].LoginInfo[0].CandidateId );

	    	$('#UId').val(mdata[0].LoginInfo[0].CandidateId);
	    }
	    else
	    {
	    	sessionStorage.setItem("Id",mdata[0].LoginInfo[0].RecuiterId );
	    }	

	    //alert(UserInfo);

	}
	else
	{
		alert('UserName Or Password Incorrect ');
	}	
	


}

function registeruser (argument) {
        
        // body...
        
      colquery= {};

      createformquery('#userinfo',''); ImageColumn=''; ImageTable = '';//alert(JSON.stringify(colquery));

      AddReferenceKey=''; ReferenceColumn='';
      
      //alert($('.candidate-acc').hasClass('active'));

      if ( !$('.candidate-acc').hasClass('active') ) // ($('#idRegisterEmp').prop('checked')) 
      {  
        QryTable='RecruiterMaster';KeyColumn='RecruiterId'; //ImageColumn='ResumeFiles'; ImageTable = 'CandidateMaster';

        masterdetail=false; queries=[];commoncolumns="";commoncolquery=""; customqueries =[] ; //colquery={};

        ReferenceColumn="RecruiterId"; //ReferenceId="ServiceId"; ReferenceKey = $('#ServiceId').val();

        MainCriteria ="RecruiterId = '" + $('#UId').text() + "'";
      }
      else
      {
         QryTable='CandidateMaster';KeyColumn='CandidateId'; //ImageColumn='ResumeFiles'; ImageTable = 'CandidateMaster';

         masterdetail=false; queries=[];commoncolumns="";commoncolquery=""; customqueries =[] ; //colquery={};

         ReferenceColumn="CandidateId"; //ReferenceId="ServiceId"; ReferenceKey = $('#ServiceId').val();

         MainCriteria ="CandidateId = '" + $('#UId').text() + "'";
      }  

        queries.push({TransQry:colquery,TableName:QryTable,ReferenceId:ReferenceColumn,ReferenceKey:$('#UId').text(),Criteria:" Where " + MainCriteria}); 

        //alert(JSON.stringify(queries));

        customqueries =  queries;  $('#registrationform').modal('hide');

        updateSelectedForm('getNewUserId("#userinfo");');
        
        customqueries = []; 

        
}

function getNewUserId(ctrl)
{
	sessionStorage.setItem( "LoginType", ( ( !$('.candidate-acc').hasClass('active') ) ? 'Recruiter' : 'Candidate') ); 

	//alert(id);

	sessionStorage.setItem( "Id",id );   $('#UId').val(id);

	clearPostform("#userinfo");
}

function GetTransactionAccount(GLCode)
{

	       Lqueries = [];

	       $sql = " SELECT * From GLMaster where GLCode='" + GLCode + "\'" ;

	       Lqueries.push({TransQry:$sql,formattype:'json',keyname:"GLInfo"});
	       
	       //alert(JSON.stringify(Lqueries));

	       QArray = JSON.stringify(Lqueries);

	       getCustomData(QArray,putGLInfo);  
}

function putGLInfo(mdata)
{
	//alert(JSON.stringify(mdata));
}

function InitiateHomePage()
{
		   Lqueries = [];

	       $sql = " SELECT * From JobMaster Limit 0,12 " ;

	       Lqueries.push({TransQry:$sql,formattype:'json',keyname:"Jobs"});
	       
	       QArray = JSON.stringify(Lqueries);
	       
	       //alert(JSON.stringify(Lqueries));


	       getCustomData(QArray,putHomePageInfo);  
}	



function putHomePageInfo(mdata)
{

					//alert( JSON.stringify(mdata));//[0].Jobs.length) );
					// Event head Lines
					//carousel = $(".owl-carousel"); $('.letter-spacing-075').html('');
					//carousel.trigger('destroy.owl.carousel'); 
					//carousel.find('.owl-stage-outer').children().unwrap();
					//carousel.removeClass("owl-center owl-loaded owl-text-select-on");

					HeadLines=''; jobscount = mdata[0].Jobs.length; //$('#videodiv').html('');  //.find('.owl-stage') 

					i = 0;

					$.each( mdata[0].Jobs,function(key,value) 
                	{

							
					
							HeadLines = HeadLines + '<div class="job-list half-grid">';
		                      HeadLines = HeadLines + '<div class="thumb">';
		                        HeadLines = HeadLines + '<a href="#">';
		                          HeadLines = HeadLines + '<img src="images/job/company-logo-8.png" class="img-fluid" alt="">';
		                        HeadLines = HeadLines + '</a>';
		                      HeadLines = HeadLines + '</div>';
		                      HeadLines = HeadLines + '<div class="body">';
		                        HeadLines = HeadLines + '<div class="content">';
		                          HeadLines = HeadLines + '<h4><a href="job-details.html" onclick="showjobdetails(\'' + value.JobId + '\');" > '+value.Title+' </a></h4>';
		                          HeadLines = HeadLines + '<div class="info">';
		                            HeadLines = HeadLines + '<span class="company"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-briefcase"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>'+value.BusinessName+'</a></span>';
		                            HeadLines = HeadLines + '<span class="office-location"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>'+value.Location+'</a></span>';
		                            HeadLines = HeadLines + '<span class="job-type temporary"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>'+value.JobType+'</a></span>';
		                          HeadLines = HeadLines + '</div>';
		                        HeadLines = HeadLines + '</div>';
		                        HeadLines = HeadLines + '<div class="more">';
		                          HeadLines = HeadLines + '<div class="buttons">';
		                            HeadLines = HeadLines + '<a href="#" class="button">Apply Now</a>';
		                            HeadLines = HeadLines + '<a href="#" class="favourite"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></a>';
		                          HeadLines = HeadLines + '</div>';
		                          HeadLines = HeadLines + '<p class="deadline">Deadline: - - -</p>';
		                        HeadLines = HeadLines + '</div>';
		                      HeadLines = HeadLines + '</div>';
		                    HeadLines = HeadLines + '</div>';
		                    
		                    i++;

		                    if (i==6)
		                    {
		                    	$('#recent .row .col-left').html(HeadLines); HeadLines='';
		                    }


		                    if (i==12 || i==jobscount)
		                    {
		                    	$('#recent .row .col-right').html(HeadLines);  HeadLines='';
		                    }	

					});

					
					//$('#recent .row .col-lg-6').html(HeadLines); //alert(HeadLines);

					/*if (locationurl=='https://www.ytlstar.com/' || locationurl=='https://www.ytlstar.com/index.html')
					{	
						// Video string
						videolinks='';

						$.each( mdata[1].Videos,function(key,value) 
	                	{					
						  videolinks= videolinks+'<div class="embed-responsive embed-responsive-16by9">';  //alert(($.trim(value.VideoType)=='Internal') + '-' + value.VideoType);
		                      if ($.trim(value.VideoType)=='Internal')
		                      {	
		                      	videolinks= videolinks+'<video width="560" height="500" controls>';
		                      	videolinks= videolinks+'<source src="'+value.VideoLink+'" type="video/mp4">';
		                        videolinks= videolinks+'Your browser does not support video.';
		                        videolinks= videolinks+'</video>';
		                      }

		                      else
		                      {
		                      	videolinks= videolinks+'<iframe width="560" height="500" src="'+value.VideoLink+'" data-src="'+value.VideoLink+'" allowfullscreen=""></iframe>'; //<iframe width="560" height="500" src="'+value.VideoLink+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
		                      }	

		                    
		                  videolinks= videolinks+'</div>';
		                
		                });
		                  
						$('#videodiv').html(videolinks); //alert(videolinks); //.find('.owl-stage')

		                  
		                // Image string 
		                imagelinks='';

						$.each( mdata[2].Galary,function(key,value) 
	                	{ 
						  imagelinks=imagelinks+'<div class="col-6 col-sm-4 col-md-6 col-lg-4"><a class="thumbnail-creative" data-lightgallery="item" href="'+FTPReferer +'/'+companyid+'/uploads/Galary/'+value.PhotoId +'-1.'+value.FileExtension+'?' + (new Date().getTime())+'"><img src="'+FTPReferer +'/'+companyid+'/uploads/Galary/'+value.PhotoId +'-1.'+value.FileExtension+'?' + (new Date().getTime())+'" alt=""/><div class="thumbnail-creative-overlay"></div></a> </div>';

	                    });  

	                    $('.row-narrow').html(imagelinks);  //alert(imagelinks);
	                    //carousel.owlCarousel({video:true,lazyLoad:true}); //
	                    $('.videodiv').owlCarousel({video:true,lazyLoad:true,items:1,merge:true}); //,loop:true,,center:true
	                }
	                    
                    $.getScript('js/core.min.js');
                    $.getScript('js/script.js');*/
                    
/*
*/

}

function showjobdetails(jobid)
{
    sessionStorage.setItem("JobId",jobid);
    location.href = "job-details.html";
}

function savePaytmInfo()
{
							//alert('in savePaytmInfo : ' + HTTPReferer+"/PaytmIntegration/index.php");

							

							var d = new Date().getTime();

							//alert(d);

							$.ajax({
								url: HTTPReferer+"/PaytmIntegration/index.php",  //
								type: "POST",
								data: {OrderId : d}, //'ERP000001'
								cache:false,
        						timeout:30000,
								datatype:"json",
								success: function (res) 
								{
										alert(res); 

										//$('.heading-component-title').html(res);
										//$('#EmailId').val(res);
										customdata = $.parseJSON(res); Rs= customdata.txnList;

										// alert( JSON.stringify(Rs) + " \n  Orderid : " + Rs[0].merchantOrderId + " , Status : " + Rs[0].status + " , message : " + Rs[0].message );

										alert( " Orderid : " + Rs[0].merchantOrderId + " , Status : " + Rs[0].status + " , message : " + Rs[0].message );
								}
							});
}

//$("#contact_body").submit(function(e){
function SendMailwithAttachment(th)
{

    var allowed_file_size 	= "1048576"; //1 MB allowed file size 
    
	var allowed_file_types 	= ['text/plain', 'image/png', 'image/gif', 'image/jpeg', 'image/pjpeg', 'application/x-zip-compressed', 'application/pdf' , 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' , 'application/msword' , 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' , 'application/vnd.ms-excel']; //Allowed file types
	var border_color 		= "#C2C2C2"; //initial input border color
	var maximum_files 		= 2; //Maximum number of files allowed
    /////e.preventDefault(); //prevent default action 
    proceed = true; var formdata = new FormData();

  	
  	//alert('1');

    //simple input validation
    $($(th).find("input[data-required=true], textarea[data-required=true]")).each(function(){
              if(!$.trim($(this).val())){ //if this field is empty 
                  $(this).css('border-color','red'); //change border color to red   
                  proceed = false; //set do not proceed flag
              }
              //check invalid email
              var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
              if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
                  $(this).css('border-color','red'); //change border color to red   
                  proceed = false; //set do not proceed flag              
              }   
    }).on("input", function(){ //change border color to original
       $(this).css('border-color', border_color);
    });
    
    //alert('2');

    //check file size and type before upload, works in modern browsers
    if(window.File && window.FileReader && window.FileList && window.Blob)
    {
	  //alert('21');	      
      var total_files_size = 0;
      
      //alert('22 ' + $(th).find('#up-cv').get(0).files.length);

      //if(this.elements['file_attach[]'].files.length > maximum_files){
      if ( $(th).find('#up-cv').get(0).files.length > maximum_files ) {	
              alert( "Can not select more than "+maximum_files+" file(s)");
              proceed = false;      
      }
      
      //alert('23');

      //$(this.elements['file_attach[]'].files).each(function(i, ifile){
      //$(th).find('#up-cv').get(0).files.each(function(i, ifile){
      files = $(th).find('#up-cv').get(0).files;

      for (var j=0; ifile = files[j]; j++) 
	  { 					    				
      	//alert('231');
        if(ifile.value !== ""){ //continue only if file(s) are selected
                  if(allowed_file_types.indexOf(ifile.type) === -1){ //check unsupported file
                      alert( ifile.name + " is unsupported file type!");
                      proceed = false;
                  }
               total_files_size = total_files_size + ifile.size; //add file size to total size

               formdata.append("file_attach[]", ifile);
        }
        //alert('232');
      }
      //}); 

      //alert('24');
      
         if(total_files_size > allowed_file_size){ 
              alert( "Make sure total file size is less than 1 MB!");
              proceed = false;
          }
    }
    
    //alert('3');
    //if everything's ok, continue with Ajax form submit
    if(proceed){ 
    
      var post_url = 'contactformwithattachment.php' ; //$(this).attr("action"); //get form action url
      var request_method = 'post'; // $(this).attr("method"); //get form GET/POST method
      //var formdata = new FormData(this); //Creates new FormData object
      
      formdata.append("name", $('#name').val() ) ; formdata.append("email", $('#email').val() ) ; formdata.append("phone", $('#phone').val() ) ;
      formdata.append("subject", $('#subject').val() ) ; formdata.append("message", $('#message').val() ) ;	



      //alert('31');

      //alert(JSON.stringify(formdata));

      $.ajax({ //ajax form submit
        url : post_url,
        type: request_method,
        data : formdata,
        dataType : "json",
        contentType: false,
        cache: false,
        processData:false
      }).done(function(res){ //fetch server "json" messages when done
        if(res.type == "error"){
          $("#contact_results").html('<div class="error">'+ res.text +"</div>");
        }
        if(res.type == "done"){
          //alert($.parseJSON(res));
          alert(res.text);	
          $("#contact_results").html('<div class="success">'+ res.text +"</div>");
        }
      });
    
    }



}

//});

function SendTestMail() 
{
    
    //var form = $('#contactform'); // contact form
    //var submit = $('#submits'); // submit button
    //var alert1 = $('.alert'); // alert div for show alert message

        
        //formstr = "name=" + $('#name').val() + "&" +"email=" + $('#email').val() + "&" +"Message=" + $('#message').val();

        if ($('#name').val()=='' || $('#email').val() =='' || $('#phone').val()=='')
        { 
            alert('Please Enter all the values properly ! ');
            return;
        }  

        formstr = "name="+ $('#name').val() +"&email="+ $('#email').val() +"&phone="+ $('#phone').val()  +"&Message=" + $('#message').val() + "&sendto=info@theittalent.com" ;

        //alert(HTTPReferer + "contact1.php" + "\n" + formstr);

        $.ajax({
            url:  HTTPReferer + "contact1.php", // form action url
            type: 'POST', // form submit method get/post
            dataType: 'html', // request type html/json/xml
            data: formstr + "&subject=" + $('#subject').val() , // serialize form data 
            beforeSend: function() {
                //alert1.fadeOut(10000);
                //submit.html('Sending....'); // change submit button text
                //alert('Sending....');
            },
            success: function(data) {
                alert(data);
                //alert1.html(data).fadeIn().fadeOut(); // fade in response data
                //form.trigger('reset'); // reset form
                //submit.html('Send Email'); // reset submit button text
                //form.find('input:text, textarea').val('');
            },
            error: function(e) {
                console.log(e);
            }
        });
    
}

//alert('in custom');