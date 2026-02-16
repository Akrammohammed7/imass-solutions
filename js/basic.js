          //alert('b4 script');
          
    /**/
          var TransferControl1=null,TransferControl2=null;GlobalCtrl=null,globaldata=null , uploadDocType='CandidateResume',uploadFolderName='Resumes';
          var  hst , db , dusr , dp , companyid="imass",max=5,ImageCount=0,hook,gcompanyname,UserName,UserId,RollId,searchmode='Jobs',isfile=false,noofimages=0;
          var queries = [] , isSpecificFileId=false ,  ImageColumn='' , ImageTable='' , HTTPReferer='';
          


      $.ajax({
            url: 'https://imasssolutions.com/basic.php',
            type:'POST',
            cache: false,
            datatype:'json',
            data: { companyid:companyid },
            timeout:0,
            success: function(res){
              
                //alert(res + "\n"+ companyid);
              
                data1 = $.parseJSON(res);

                //alert(data1[0].data);
                
                hst = data1[0].hostname ; dusr = data1[0].username; dp = data1[0].password; db =data1[0].databasename; //apf = data1[0].apf; gcompanyname = data1[0].companyname;

                HTTPReferer = data1[0].referer ; //HTTPReferer

                $.getScript(data1[0].data, function( data, textStatus, jqxhr ) {
                  //console.log( data ); // Data returned
                  //console.log( textStatus ); // Success
                  //console.log( jqxhr.status ); // 200
                  
                  //alert( "Load was performed internal script." );
                  
                showJobs();  
                
                    
                });
                
                
                
                //startup();

            }
          });

  
             