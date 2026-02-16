(function($){

    $.fn.paginate = function(options) {
    
        var curText = '';
        var isClicked = false;
        var currentpage=0,setcount=1;
        var previousSpan;
        var rows;var cl;
		  //var no_rec_per_page=5;
			var no_pages =1;
		  //var pagestyle='digits';
		  var editmode=false;
	      var start = (new Date()).getTime();
	      var x = 0;
	      var $table;//=$('<table> </table>').attr('id','PageTbl');
	      var QryCol='';
	      var QryValue='';
	      var objectstarting = true;
		  var NavigateInterval;
		  var timer ;
		  var $pagenumbers;	
		  var CriteriaString=" ";
		  var tablename="";
		  var ColumnString='';var FinalColumnString='';var FinalQryString='';
		  var $headerdiv;
		  var $ActionDiv;
		  var $btndel;
		  //var deletemode = 'advance';
		  //var strDeleteColumns = "SponsorId,Title,FirstName";
		  var deletearray = [];var SearchColumnName1 ="";
		  var QueryList=[], NewQuery , NewQuery1;
		  
		  	  	        
	   $.fn.paginate.defaults = {
           msgConfirmDelete: 'Are you sure you want to delete selected items?',
           msgNoSelectedItems: 'You have not selected any item',
	        rowColorOdd: '#e7f5fc',
	        rowColorEven: '#ffffff',
	        rowColorOn: '#ddffff',
	        rowColorOff: '',
	        rowColorEdit: '#FFeeFF',
	        pagestyle:'digits',
			  chk:false,
		     no_rec_per_page:5,
		     performoperations:false,
		     deletemode : '',
		     strdeletecolumns: ''		 
			         
	    };
	   
		//rowColorOn: '#FFAC7F',	   
	   
	    var options = $.extend( {} , $.fn.paginate.defaults, options);

       //options.rowColorOdd='#eeeeef';  '#d9e4fb' '#c8d3e1'
       
        _paginate = this;
        var $this = null;
	
		var ListQuery = options.sqlqry;

	//Loading Image Display
	function DisplayLoad()
	{
	    $("#loading").fadeIn(100);
		$("#loading").html("<img src='indicator.gif' />");
	}
	//Hide Loading Image
	function HideLoad()
	{
		$("#loading").fadeOut('slow');
	};

	
        /**
         * Delete selected rows
         *
         */
        function deleteRows(){

      		DisplayLoad();

            var boxes = $this.find('input:checkbox.items:checked');
            //alert(boxes.children().length);
            if(!boxes.length){
                alert(options.msgNoSelectedItems);
                return false;
            }
            if(!confirm(options.msgConfirmDelete)){
                return false;
            }

	        CriteriaString = ''; var delstring="";deletearray=[];
	    
	    //alert(options.deletemode + " : " + options.strdeletecolumns);


	    ////////////////////////////////////////////////////////////////////////////////////////

	    delqueries = [];

	    				/*

	    				if (Design !='custom')
	    				{

							$.each (CurrentAppinfo[0],function(key,value){

								obj = value; //CurrentAppinfo1[key];

								 QryDel= obj.QryDel;
								 
								 if (obj.subqueries.length ) {

									$.each(obj.subqueries,function(key3,v3){
										
										 obj1 = v3;
										 QryDel= obj1.QryDel;
										 delqueries.push({delQry:QryDel});
									});
								}
								else
								{
									
									delqueries.push({delQry:QryDel});
								}	

							});
						}
						else
						{

								masterform = CurrentAppinfo[0].masterform; // $('#masterform').text();//.split(",");

								MasterCriteria=CurrentAppinfo[0].MasterCriteria;

								QDel = "Delete from " + CurrentAppinfo[0].masterform  ;

								delqueries.push({delQry:QDel});
								
								childforms = CurrentAppinfo[0].childforms.split(",");

								if ($.trim(childforms)!='' )
								{
								
									$.each(childforms,function(k,v) {
											 
											 QDel = "Delete from " + v;

											 delqueries.push({delQry:QDel});
									});	
								}		
						}

						*/

						//alert(options.strdeleteTables);

						deltables = options.strdeleteTables.split(",");

						if ($.trim(deltables)!='' )
						{
						
							$.each(deltables,function(k,v) {
									 
									 QDel = "Delete from " + v;

									 delqueries.push({delQry:QDel});
							});	
						}

					    delqueriesArray = JSON.stringify(delqueries);

	    				//alert(delqueriesArray);

	    ////////////////////////////////////////////////////////////////////////////////////////

	
      for(var i=0; i<boxes.length; i++)
      {

			if (options.deletemode == 'advance') {
				
				var delobj ={};
				//deletearray[i]=new Array();
				    
				//alert(options.strdeletecolumns);
				
				//alert($('#row_' + boxes[i].value).html());
				
				$this.find("th").each( function() {
					
					stat = $.trim(options.strdeletecolumns.toLowerCase()).indexOf( $.trim($(this).text()).toLowerCase() );
					//alert(stat + " : " + $.trim($(this).text()).toLowerCase() + " : " +  $.trim(options.strdeletecolumns.toLowerCase()));
					if ( stat >= 0 && $.trim($(this).text())!='' ) { 
					
				        	td = $('#row_' + boxes[i].value).find('td:eq(' + $.trim($(this).index()) + ')').text(); 
						   //delstring = delstring + "'" + $(this).text()  + "'" + " : " + td + ",";
						   //alert(td);
						   delobj[$.trim($(this).text())]=td;
						   //deletearray[i][$(this).text()]=td;
					}
				});	
				// [$(this).index()];
				//var delobj = JSON.parse( "{" +  delstring.substring(delstring,0,delstring.length-1) + "}" );
				
				//alert(JSON.stringify(delobj));
				
				deletearray.push ( delobj ) ;
				//alert(JSON.stringify(deletearray));	
			}
			
			else 
			{
			

	                	//$('#row_' + boxes[i].value).fadeTo(5000, 1).remove();
		                //$('#row_' + boxes[i].value).fadeTo(5000, 1).remove();
	        	        //boxes[i].parent().parent().fadeTo(5000, 1).remove();

				CriteriaString = CriteriaString + "'" +  boxes[i].value + "',";
			
			
			}
			
			$('#row_' + boxes[i].value).fadeTo(5000, 1).remove();

	    }


		if (options.deletemode == 'advance') 
		{

				//===  delete from database

				criteria1 = JSON.stringify(deletearray);

				$.ajax({
						url: options.urldelete,
						type: "POST",
						data: {
						deletemode:'advance' , delqueries:delqueriesArray , criteria:criteria1 ,referencekey:options.referencekey, companyid:options.companyid , hostname :options.hostname , username : options.username , databasename : options.databasename , password : options.password},
						cache: false,
						timeout: 10000,
        				success: function (e) 
        				{
							//alert(e);
        				
        					$('#loading').text(e).fadeIn('slow');
	        			}
        				
    				});					
		}
		else
		{
				criteria1 = " where " + options.referencekey + " IN (" + CriteriaString.slice(0,-1) + ")";

				//alert(criteria1);


				//////////////////////////////////////////////////////
				

				//////////////////////////////////////////////////

				//alert(options.CustomDelFunction);
				//alert(customfunctionDel);

				//setTimeout(options.CustomDelFunction,0);

						$.ajax({
								url: options.urldelete,
								type: "POST",
								data: {
								page:1 , delqueries:delqueriesArray , criteria:criteria1 ,referencekey:options.referencekey , customfunction: customDelString , companyid:options.companyid , hostname :options.hostname , username : options.username , databasename : options.databasename , password : options.password},
								cache: false,
								timeout: 10000,
		        				success: function (e) {
								  //alert(e);
		        				$('#loading').text(e).fadeIn('slow');
		        				}
        					});		

				/*if (options.CustomDelFunction!='')
				{	
					setTimeout(function () {

							options.customfunction;

							$.ajax({
								url: options.urldelete,
								type: "POST",
								data: {
								page:1 , delqueries:delqueriesArray , criteria:criteria1 ,referencekey:options.referencekey , customfunction: customfunctionDel , companyid:options.companyid , hostname :options.hostname , username : options.username , databasename : options.databasename , password : options.password},
								cache: false,
								timeout: 10000,
		        				success: function (e) {
								alert(e);
		        				$('#loading').text(e).fadeIn('slow');
		        				}
        					});		

						}
						,0);							
				
				}	
				else
				{		
						$.ajax({
							url: options.urldelete,
							type: "POST",
							data: {
							page:1 , delqueries:delqueriesArray , criteria:criteria1 ,referencekey:options.referencekey , customfunction: customfunctionDel , companyid:options.companyid , hostname :options.hostname , username : options.username , databasename : options.databasename , password : options.password},
							cache: false,
							timeout: 10000,
	        				success: function (e) {
							alert(e);
	        				$('#loading').text(e).fadeIn('slow');
		        				}
        				});					
				}*/
			
			}	
				//==== end delete from database

            	refreshZebra();

				if (options.pagestyle == 'navigate')
				{            
            		options.no_rec_per_page = $this.find('.ui-pg-selbox').val();
					//alert('hererer');            	
            	 }
            	else
            	{

            		options.no_rec_per_page=15;
            	}

            	pager($this.find('table'));

				HideLoad();
        }


// search values 


function searchscreen(tbl,querytext){

  //var tableRow = $('#tbl tr:has(td input[value!=""])').prevAll().length; 

  var value = ('' + querytext).toLowerCase(), row, col, r_len, c_len, td;

  curentrow = (currentpage-1)*options.no_rec_per_page;	  
  lrow = currentpage*options.no_rec_per_page-1;
  
  //alert(curentrow+ ' '+ lrow);
  
  //data = $(tbl).find('tbody tr:lt('+  (lrow+1) + '):gt('+ (curentrow) + ')');
  //data = $(tbl).find('tbody tr:lt('+  (lrow+1) + '):gt(' + curentrow + '):eq(' + curentrow + ')');
  data = $(tbl).find('tbody tr[id^=row_]').slice(curentrow,lrow+1); //:lt('+  (lrow+1) + '):gt(' + curentrow + '):eq(' + curentrow + ')');

  $(tbl).find("td").removeClass('pass');
  
  //alert(data.length + ' ' + curentrow + ' ' + lrow);   

  //data = $(tbl).find('tbody tr').find(':gt(3)'),:lt(4)');
  //data = $(tbl).find('tbody tr:nth-child(n+2)'); //.find('tbody tr:lt(4)');// .find(':gt(3)'),:lt(4)');
  
  ////data = $(tbl).find("tbody tr"); //.find("td:contains('" + value + "')");
  finaldata = data.find("td").filter(":containsi('" + value + "')");
  finaldata.addClass('pass');
  
  /* 

  clen = data.find('td').length;   

  if (value) {

    ////for (row = 0, r_len = data.length; row < r_len; row++) {

	for(i=(currentpage-1)*options.no_rec_per_page;i<=currentpage*options.no_rec_per_page-1;i++)
   {
      for (col = 0, c_len = clen; col < c_len; col++) {

		 //$(tbl).find("td:contains('" + value + "')").css({"background-color":"cyan"});

		 	//:contains('John')" ).css( "text-decoration", "underline" );
        //td = tbl('getCell', row, col);

        ////td = data.eq(row).find('td').eq(  col   );
		  td = data.eq(i).find('td').eq(  col   );
		  	
        if (('' + td.text()).toLowerCase().indexOf(value) > -1) {    

        //data[row][col])

   	       td.addClass('pass');
        }
        else {

	          td.removeClass('pass');
        }

      }
    }
  }
  else
  {
    //alert($(tbl).find("tbody tr .pass").length);

	 $(tbl).find("tbody td").removeClass('pass');	
	 //$(tbl).find("tbody tr").addClass('tbl');
	 refreshzebra();  
  }

*/


}

// end search values

		  /**
         * Refresh rows color (odd)
         *
         */
    function refreshZebra(){
	   $this.find('tr').removeClass('pass1'); 	
       $this.find('tr:odd').css('background-color', options.rowColorOdd);
       $this.find('tr:even').css('background-color', options.rowColorEven);
    } 	

	// paging with jquery ----------------------------------------

	function pager(tbl){
		
     // alert($(tbl).attr('id'));
     //var rows = $("#content table").find('tbody tr').length;
	   rows = $(tbl).find('tbody tr[id^=row_]').length;
		
		$('#sets').remove();

      $sets = $('<div id="sets" class="SetsDiv"  ></div>');	

		for(i=1;i<=setcount;i++)
		{

			$('<li class="set">'+(i)+'</li>').appendTo($sets);
		}

		$sets.appendTo($headerdiv);
		
		$('.set').click(function(event){
         
        	DisplayLoad();
			
			currentpage = $(this).text();
			
			initializedata('','');
			
			HideLoad();
			
			$(".set")
			.css({'border' : 'solid #dddddd 1px'})
			.css({'color' : '#fff'}); //#0063DC
 
			$(this)
			.css({'color' : '#FF0084'})
			.css({'border' : 'solid #dddddd 1px'});
			
		});


		
	   no_pages = Math.ceil(rows/options.no_rec_per_page) ;
		//alert(options.no_rec_per_page + ' ' + rows + ' ' + no_pages);
		
		$('#pages').remove();

      $pagenumbers = $('<div id="pages" class="PagerDiv"  ></div>');	

		for(i=0;i<no_pages;i++)
		{

			$('<li class="page">'+(i+1)+'</li>').appendTo($pagenumbers);
		}

		//$pagenumbers.insertAfter($(tabl));

		//$pagenumbers.appendTo($('#pagination'));
		//$pagenumbers.insertBefore($this);
		$pagenumbers.appendTo($headerdiv);
		
		$('.page').hover(
		function(){
			$(this).addClass('hover');
		},
		function(){
			$(this).removeClass('hover');
		}
		);

		$('.page').click(function(event){
         //alert($(this).text());
        	DisplayLoad();
			navigatepage($(this).text(),tbl);
			HideLoad();

			$(".page")
			.css({'border' : 'solid #dddddd 1px'})
			.css({'color' : '#fff'});    //'#0063DC'

			$(this)
			.css({'color' : '#FF0084'})
			.css({'border' : 'solid #dddddd 1px'});

		});
		
		$('.set').eq(currentpage-1)
		.css({'color' : '#FF0084'})
		.css({'border' : 'solid #dddddd 1px'});

   };
   
function navigatepage($pgno,tbl)
{

	currentpage=$pgno;
	
	//var chkall = tbl.find(':checkbox.selAll');
	//var chkitem = tbl.find(':checkbox.items');

	//$(tbl).find('tbody[id^=maintbody] tr[id^=row_]').hide();
	
	$(tbl).find('tbody tr[id^=row_]').hide();

	//var chkstatus = true;
	//var tr=[];
	//var tr =$(tbl).find('tbody[id^=maintbody] tr[id^=row_]');
	var tr =$(tbl).find('tbody tr[id^=row_]');

	for(i=(currentpage-1)*options.no_rec_per_page;i<=currentpage*options.no_rec_per_page-1;i++)
	{
		//alert($(tr[i]).html()); // .find('td:eq(2)').text());
		$(tr[i]).show();
		//alert(i);		
		//stat = chkitem[i].prop('checked');
		//if ( stat == false ) 
		//{
    	//	chkstatus = false;
    	//						 }
		
	}
	
	//chkall.prop('checked', chkstatus);
	


};

//End of Paging ----------------------------------------------

//interval example
function AutoNavigate()
{
	currentPg=1;
	
	if (options.AutoNavigate==true)
	{
		//startAuto();
		
		NavigateInterval = setInterval(function(){
		//$post.toggleClass("display");
		++currentPg;
		//alert(currentPg + ' ' + no_pages + (parseInt(currentPg)  > parseInt(no_pages)));
		if (parseInt(currentPg)  > parseInt(no_pages)) { currentPg=1;}
	
		navigatepage(currentPg,$this.find('table'));
	
		}, 4000);
		
		$('#loading').html('Auto scroll enabled ' ).fadeIn('slow');		
	}
	else
	{ 
		
		disableInterval(NavigateInterval);
		//stopAuto(); }
	
	}
}
	
function startAuto() {
	++currentPg;
	if (parseInt(currentPg)  > parseInt(no_pages)) { currentPg=1;}
    navigatepage(currentPg,$this.find('table'));
    timer = setTimeout(startAuto, 2000);
};

function stopAuto() {
	
    clearTimeout(timer);
	$('#loading').html('Auto scroll Disabled ').fadeIn('slow');
};

function disableInterval(intervalID){   
	clearInterval(NavigateInterval);  //window.
	$('#loading').html('Auto scroll Disabled' + intervalID).fadeIn('slow');
}

//end interval

// putitems function

		function putitemsdata(li,span){

			   var cnt=0;ColumnString="";
					
               li.each(function() {
                  	
                  	if ( (cnt!=0) && ($(this).find('.items').prop('checked')==true) )
							{
                  		ColumnString = ColumnString + $(this).text() + ',';
                  	}
                  	cnt++;
                  });
						if (ColumnString.length>0){
								ColumnString = ColumnString.slice(0,-1);
								}

                  span.text('');
                  //span.html('<strong>' + datastring + '</strong>');
                  //span.html( ' Select ' + ColumnString + ' From '+ tablename);
                  span.html( ColumnString );
   
                  if (ColumnString.length==0){
                  span.html('Select Columns');
                  }

			};

// end putitems
	
// resize 

    function resize(tabl){
   
   
   
        //$(tabl).resizable({handles: 'e' }); 

		 	$(tabl).find("th").each( function() {

				//var tableId = ("testtable2");
				
				//resetTableSizes($('#'+tableId), $(this).width(), $(this).index());
			
				$( this ).resizable({
				handles: 'e' ,	
				containment: tabl.parent(),		
				resize: function( event, ui ) {
				
					var thindex = $(this).index();  
					var newWidth= $(this).width();
					var newPos = newWidth ; 
					//resetTableSizes($('#'+tableId), newPos, thindex);
														}
				 //"n, e, s, w"			
										});
			
			});	


        }
        
       
  	function resetTableSizes (table, change, columnIndex)
	{
		//calculate new width;
		var tableId = table.attr('id'); 
		//var myWidth = $('#'+tableId+' TR TH').get(columnIndex).offsetWidth;
		//var newWidth = (myWidth+change)+'px';
		
		$('#'+tableId+' tr').each(function() 
		{
			//$('#testpara').append( 'inside para ' + $(this).index());
			$(this).find('td').eq(columnIndex).css('width',change);
			$(this).find('th').eq(columnIndex).css('width',change);
		});
		//resetSliderPositions(table);
	};



//end resize	


// call select dblclick

function callselect(tabl){

   //$(tabl).find('tbody tr').dblclick(function() {
   
   var tblp = $("#paginationdiv #content table[id^=AdminTable");   	
   	
   	currentTr = $(tblp).find('tbody tr');

	currentTr.bind('dblclick',function() {
	
		id = this.id.slice(4);	 

	    refreshZebra();

		$(this).addClass('pass1');

		$("#loading").html('Row Number : ' + parseInt($(this).index()+1)).show(); 

	    callcustom(tblp,this);   

	 	//$('body').scrollTop();
	 	//$("html, body").animate({ scrollTop: 0 }, "slow");

	});

	currentTr.doubletap(function() {
	
		id = this.id.slice(4);	 

	    refreshZebra();

		$(this).addClass('pass1');

		$("#loading").html('Row Number : ' + parseInt($(this).index()+1)).show(); 

	    callcustom(tblp,this);   
	 	//$('body').scrollTop();
	 	$("html, body").animate({ scrollTop: 0 }, "slow");
	});

}
// end select dblclick



// callcustom function

function callcustom1111(tbl,tr)
{

	//alert($(tbl).find('tr').length + ' ' + tr.id + ' in custom');

$(tbl).find('tr').each(function(){
  //alert(this.id + ' in each row');
 });

}

// end callcustom 

//check all
function checkall(tabl){

$(tabl).find(':checkbox.selAll').click(function(){


					var chkall = tabl.find(':checkbox.selAll');


           		 	var chk = $(tabl).find('input:checkbox.items');

           		 	var chkstatus=false;

                  //alert(chkall.prop('checked') + ' ' + chk.attr('id'));              		 

                	if(chkall.prop('checked')){
                  	  //$this.find('input:checkbox.items').attr('checked', 'checked');
                    	//alert($(this).find('table tbody tr').is(':hidden'));

                    		chkstatus=true;

						  	//$this.find('input:checkbox.items').prop('checked', true);

                	} else {
                	   chkstatus=false;	
                    //$this.find('input:checkbox.items').removeAttr('checked');
                    //$this.find('input:checkbox.items').prop('checked', false);
                	}

					 	for(i=(currentpage-1)*options.no_rec_per_page;i<=currentpage*options.no_rec_per_page-1;i++){
                  	  $(chk[i]).prop('checked',chkstatus);
                    	}

           		 });      				


}

// end check all

	// ---------------- Search -----------------------------------------

     function searchtable(){ 

  		$('#resetType').on('change', function () {
        $('[name*="type"]').val($(this).find('option:selected').val());       
    	});

	  }	

     function doSearch() {
				p.query = $('input[name=q]', g.sDiv).val();
				p.qtype = $('select[name=qtype]', g.sDiv).val();
				p.newp = 1;
				this.populate();	
     }


 function creationactionbar(tbl)
 {
 	
		//if ( (options.performoperations == true)  && (QryCol.length==0) ){ 
			
 		    $('#headerdiv').remove();
    		$headerdiv = $('<div id="headerdiv" class="headerdiv"/>');

			
			$('#QueryDiv').remove();
			var $QueryDiv = $('<div id="QueryDiv" class="QueryDiv"  ></div>');

			// ERP Tables

			ERPTablesDiv = '<div class="btn-group btn-group-xs bootstrap-select tb1" style="width:90px;height:20px;padding:0px;">  <button class="btn btn-default btn-active-purple dropdown-toggle" data-toggle="dropdown" type="button" aria-expanded="false" style="width:100%;   /* background-color:#e7ebee; #c8ccce;*/" id="loginoption" titel="User">UserMaster<span class="caret"></span> </button> ';
            ERPTablesDiv = ERPTablesDiv + '<ul class="dropdown-menu" id="TablesList"> ';
            ERPTablesDiv = ERPTablesDiv + '<li><a href="#">UserMaster</a></li>';
            ERPTablesDiv = ERPTablesDiv + '<li><a href="#">GLMaster</a></li>';
            ERPTablesDiv = ERPTablesDiv + '<li><a href="#">GLTransactions</a></li> </ul> </div> ';
            $(ERPTablesDiv).appendTo($QueryDiv);

			// search screen
			var $textsearch = $('<input type="text" class="tb1" id="textsearch" placeholder="Search Screen" />');
			$textsearch.appendTo($QueryDiv);

			$QueryDiv.find('#textsearch').keyup(function(event){  
				searchscreen(tbl,$(this).val());  
			});      							

  		    // search database
			var $QryCombo = $('<select class="tb1" id="QryCol" placeholder="Criteria Column" />');
			//var $ColumnList = $('<select id="ColumnList"  class="tb1"/>');
			var $dropdownList = $('<span id="testspan" />');
			//var $option1 = [['ChildId'],['ChildName']];

			var menuopt =[] ; //[[ "ChildName" ],[ "ChildAge" ], [ "Address" ], [ "ChildId"] , [ "Category"] ];
			
			$(tbl).find("th").each(function(){
				
				$option = $('<option value=> ' + $(this).text() + '</option>');
				$txt = $(this).text(); 				
				if ($.trim($txt) != ''){				
					menuopt.push($txt);
				}
				$option.appendTo($QryCombo);
				//$option1.appendTo($ColumnList);

			});
			
			//$QryCombo.appendTo($QueryDiv);			
			
			var chkallitems = $('<li><input type="checkbox" id="chkall" class="chklist" value="1"/> <strong> Select All </strong></li>'); 			
			$submenu = $("<div id='submenu' ></div>"); //.addClass('submenu');
			$submenu.append("<ul class='root'/>").css('display','none');
			$submenu.find("ul").append(chkallitems);
			$submenu.find("ul").append("<li><hr/></li>")						
			$.each( menuopt , function(i, item) {
				$submenu.find("ul").append("<li><input type='checkbox' id='items' class='items' />" + item  + "</li>")
				//alert(item);
			});             	
				
			// combo style ///////////////////////
			
			$ColumnCheckList = $('<input type="text" placeholder="Select Colums" id="testspan" /> ');
			$ColumnCheckList.css({'background': 'url(icons/arrow.png) 92px 6px no-repeat','width':'100px', 'border':'1px solid #eee','border-radius': '4px','background-color': '#fff', 'padding':'0px 4px 0px 2px'}).attr('readonly','true');
			$ColumnCheckList.click(function (e) {  
			$submenu.css({'top':e.pageY+10,'left':e.pageX-2, 'position':'absolute', 'border':'1px solid #eee', 'padding':'0px','height':'auto','width':'145px','background-color': '#fff','border-radius': '4px','box-shadow': '0 2px 8px rgba(0, 0, 0, 0.05)'});
            $submenu.show(); $submenu.focus();
			});
         
			$ColumnCheckList.appendTo($QueryDiv);

			$QryCombo.appendTo($QueryDiv);
			
			$submenu.appendTo($(document.body));

			//Mouseup textarea false
			$submenu.mouseleave(function()
			{
			$submenu.fadeOut( "slow" );
			visualstatus=0;
			putitemsdata($submenu.find("li"),$ColsQry);
			return false;
			});

			$submenu.find("li").find(':checkbox.chklist').click(function()
					
			{ 
	
					var chkstatus = false;
												   
					   if($(this).prop('checked')==true){
	                    chkstatus = true;
										                }
	               else
	                 {
	                	   chkstatus = false;	
   	                }
         	
  				 $submenu.find("li").find('.items').prop('checked', chkstatus);
										
				 putitemsdata($submenu.find("li"),$ColsQry);
 
  		    });                  

		    $submenu.find("li").find(':checkbox.items').click(function()
  		    {
                   putitemsdata($submenu.find("li"),$ColsQry); 
  		    }); 

			$ColumnCheckList.mouseup(function()
			{
				return false;
			});

	      /////// putitems  function here
			
			//  end combo style




			var $combooperator = $('<select class="tb1" id="combooperator" > <option>=</option> <option>!=</option> <option>></option> <option><</option> <option>>=</option> <option>=<</option> <option>In</option> <option>Not In</option> <option>Like</option> <option>Not Like</option> <option>Between</option> <option>Not Between</option> <option>Is</option> <option>Is Not</option> <option>Is Null</option> </select>');
			$combooperator.css({'width':'60px', 'border':'1px solid #eee','border-radius': '4px','background-color': '#fff', 'padding':'0px 0px 0px 0px'});			
			$combooperator.appendTo($QueryDiv);
			
			$combooperator.bind('change',function(event){

				if ($("#combooperator").val()=='Between') { $textsearchdatabase2.show(); }
				else { $textsearchdatabase2.hide(); }

			});

		   var $textsearchdatabase1 = $('<input type="text" class="tb1" id="textsearchdatabase1" />'); //.css({'width':'75px','background':'solid #eec','font-size': '75.5%'});
			$textsearchdatabase1.appendTo($QueryDiv);

		   var $textsearchdatabase2 = $('<input type="text" class="tb1" id="textsearchdatabase2" style="display:none" />'); //.css({'width':'75px','background':'solid #eec','font-size': '75.5%','display':'none'});
			$textsearchdatabase2.appendTo($QueryDiv);
			
			var $combocomparison = $('<select class="tb1" id="combocomparison" > <option>OR</option> <option> AND</option> </select>');
			$combocomparison.css({'width':'60px', 'border':'1px solid #eee','border-radius': '4px','background-color': '#fff', 'padding':'0px 0px 0px 0px'});
			$combocomparison.appendTo($QueryDiv);
			
		   $QuerySubDiv = $('<div id="QuerySubDiv" class="QuerySubDiv" />');

			var $AddCriteria = $('<img src="icons/add1.png" id="imgaddcriteria" />').css({'border':'2px solid #fff','float':'left','width':'20px','height':'20px'}); //.css({'margin-top':'2px','padding':'0px 2px'});
			$AddCriteria.appendTo($QuerySubDiv);
			$AddCriteria.click(function(event){
				value ="";
				//cls.indexOf('IN') > -1 ? cls.replace('IN','OUT') : cls.replace('OUT','IN');				
				if ($("#combooperator").val().indexOf('Like') > -1) { value =  " '%" + $("#textsearchdatabase1").val() + "%'"; }
			   else if ($("#combooperator").val().indexOf('Between' ) > -1) { value =  " '" + $("#textsearchdatabase1").val() + "' And '" + $("#textsearchdatabase2").val() + "'";}
				else if ( ($("#combooperator").val().indexOf('In' ) > -1) || ($("#combooperator").val().indexOf('Any') > -1) ) {value =  "(" + $("#textsearchdatabase1").val() + ")";}
				else if ($("#combooperator").val().indexOf('Is Null' ) > -1) { value =" ";}				
				else { value =  "'" + $("#textsearchdatabase1").val() + "'"; }	

				colname = $('#QryCol option:selected').text() ; //$('#columnchoice').val() ; 

		        if ( ListQuery.toLowerCase().indexOf('union') > -1 )
				{		            
	            	QueryList = ListQuery.Split("Union");

	            	//alert(QueryList);

	            }
	        	else 
	        	{
	        		QueryList[0] = ListQuery;

	        	}

		        GetColumnName(QueryList[0],colname);

		        operator = $.trim( $("#combocomparison option:selected").text() ) ;

				CriteriaString = CriteriaString + " " + SearchColumnName1  + " " + $("#combooperator").val() + value + " " + ($.trim(operator) =="OR"? "OR " : operator);
				//$('#finalqry').html(' Select ' + ColumnString + ' From ' + tablename + ' where '  + CriteriaString + ' ' );		
				$('#CriteriaQry').text(CriteriaString);
				
			});			

			var $imgClear = $('<img src="icons/refresh-icon.png" id="imgClear" />').css({'border':'2px solid #fff','float':'right','width':'20px','height':'20px'}); //'<input type="button" class="myButton" id="BTNsearchdatabase" value="Go" />');
			$imgClear.click(function () {
				$('#finalqry').val('');
				$('#ColsQry').text('');
				$('#CriteriaQry').text('');
				CriteriaString="";
			});

			$imgClear.appendTo($QuerySubDiv);

			
      	//$('#search_field').on('keyup', function (event) {      

			$('#actiondiv').remove();

			$ActionDiv = $('<div id="actiondiv" class="ActionDiv"  ></div>');

            // delete option   
			$btndel = $('<img src="icons/del.png" id="imgDel" />').css({'border':'2px solid #FFF','width':'20px','height':'20px'});
			$btndel.appendTo($ActionDiv);
			$ActionDiv.find('#imgDel').click(function(){  deleteRows();  });
			if (options.AutoNavigate ==true){				
	
				var $chkAutoNavigate = $('<input type="checkbox" class="CH1" id="chkAutoNavigate" checked>').css({'border':'2px solid #FFF','width':'17px','height':'17px'});
				$chkAutoNavigate.appendTo($ActionDiv);
				$chkAutoNavigate.click(function() {
        		if (!$(this).is(':checked')) {
					//alert('here b4 disable');
            		//stopAuto();
					disableInterval(NavigateInterval); //return confirm("Are you sure?");
        		}
				else
				{	//alert('b4 autonavigate');
					AutoNavigate();
					}
    			});
			}
			
			// add option   
			var $btnadd = $('<img src="icons/add_page.png" id="imgNew" />').css({'border':'2px solid #FFF','width':'20px','height':'20px'});
			$btnadd.appendTo($ActionDiv);
			$ActionDiv.find('#imgNew').click(function(){ addCustom($table);  });

			$ColsDiv =$("<div id='ColsDiv' class='ColsDiv'/>");
			var $ColsQry = $('<span  id="ColsQry" />').css({'word-wrap':'break-word'});
			$ColsQry.appendTo($ColsDiv);
			
			$CriteriaDiv =$("<div id='CriteriaDiv' class='CriteriaDiv'/>");

			var $CriteriaQry = $('<span id="CriteriaQry" />').css({'word-wrap':'break-word'});
			$CriteriaQry.appendTo($CriteriaDiv);
			
			var $imgDesignFinlaQry = $('<img src="icons/button-ok.png" id="imgDesignFinlaQry" />').css({'border':'2px solid #fff','float':'right','width':'20px','height':'20px'}); //'<input type="button" class="myButton" id="BTNsearchdatabase" value="Go" />');
			$imgDesignFinlaQry.click(function () {

				//QryCol = $("#QryCol option:selected").text(); 
				//QryValue = $("#textsearchdatabase").val();				
				if (ColumnString.length>0) 
				{
					
					GetColumnQryString(ListQuery, ColumnString);

					//$('#finalqry').val(' Select ' + FinalColumnString + ' From ' + tablename + ' where '  + CriteriaString.slice(0,-3) + ' ' );
					//$('#finalqry').val( FinalQryString + ( $.trim(CriteriaString).length > 0 ?  (FinalQryString.toLowerCase().indexOf('where') > -1  ? " And " : " Where ") + " (" + CriteriaString.slice(0,-3) + ')' : "" ) );

					sql1 = "" ; sql2 ="";fq="";

			        //alert(options.sqlqry.toUpperCase().indexOf('ORDER BY'));

			        sql1 = ( FinalQryString.toUpperCase().indexOf('ORDER BY') > -1  ?  FinalQryString.slice(0,FinalQryString.toUpperCase().indexOf('ORDER BY'))  : "" );

			        sql2 = ( FinalQryString.toUpperCase().indexOf('ORDER BY') > -1 ? FinalQryString.slice( FinalQryString.toUpperCase().indexOf('ORDER BY') )  : "");
			        
			        if (sql1!="" && sql2!="")
					{
						fq = sql1 + ( $.trim(CriteriaString).length > 0 ?  (options.MasterCriteria.toLowerCase().indexOf('where') > -1  ? " And " : " Where ") + " (" + CriteriaString.slice(0,-3) + ')' : "" ) + sql2 ;
					}
					else
					{
						fq = FinalQryString + ( $.trim(CriteriaString).length > 0 ?  (options.MasterCriteria.toLowerCase().indexOf('where') > -1  ? " And " : " Where ") + " (" + CriteriaString.slice(0,-3) + ')' : "" );	
					}

					$('#finalqry').val( fq );

				}
			   else{
			        //$('#finalqry').val( options.sqlqry + ( $.trim(CriteriaString).length> 0 ?  (options.sqlqry.toLowerCase().indexOf('where') > -1  ? " And " : " Where ") + " (" + CriteriaString.slice(0,-3) + ')' : "" ) );

			        sql1 = "" ; sql2 ="";fq="";

			        //alert(options.sqlqry.toUpperCase().indexOf('ORDER BY'));

			        sql1 = ( options.sqlqry.toUpperCase().indexOf('ORDER BY') > -1  ?  options.sqlqry.slice(0,options.sqlqry.toUpperCase().indexOf('ORDER BY'))  : "" );

			        sql2 = ( options.sqlqry.toUpperCase().indexOf('ORDER BY') > -1 ? options.sqlqry.slice( options.sqlqry.toUpperCase().indexOf('ORDER BY') )  : "");
			        
			        if (sql1!="" && sql2!="")
					{
						fq = sql1 + ( $.trim(CriteriaString).length> 0 ?  (options.MasterCriteria.toLowerCase().indexOf('where') > -1  ? " And " : " Where ") + " (" + CriteriaString.slice(0,-3) + ')' : "" ) + sql2 ;
					}
					else
					{
						fq = options.sqlqry + ( $.trim(CriteriaString).length> 0 ?  (options.MasterCriteria.toLowerCase().indexOf('where') > -1  ? " And " : " Where ") + " (" + CriteriaString.slice(0,-3) + ')' : "" );	
					}

					//alert(fq);

					$('#finalqry').val( fq );
			        
			        //$('#finalqry').val( options.sqlqry + ( $.trim(CriteriaString).length> 0 ?  (options.MasterCriteria.toLowerCase().indexOf('where') > -1  ? " And " : " Where ") + " (" + CriteriaString.slice(0,-3) + ')' : "" ) );
			   
			   }
		      //alert($('#finalqry').val());
			});
			
			$CriteriaEndDiv =$('<div class="CriteriaEndDiv" id="CriteriaEndDiv"/>');
			$imgDesignFinlaQry.appendTo($CriteriaEndDiv);			

			$ColsAndCriteriaDiv =$("<div id='ColsAndCriteriaDiv' class='ColsAndCriteriaDiv'/>");
			$ColsDiv.appendTo($ColsAndCriteriaDiv);
			$CriteriaDiv.appendTo($ColsAndCriteriaDiv);
			$CriteriaEndDiv.appendTo($ColsAndCriteriaDiv);			
			$FinalQryDiv =$("<div id='finalqrydiv' class='FinalQueryDiv'/>");

			var $finalqrytextdiv = $("<div id='finalqrytestdiv' class='FinalQueryTextdiv'></div>");
			var $finalqry = $('<textarea rows="2" cols="100" id="finalqry" />').css({'width':'100%', 'border':'1px solid #eef','border-radius': '2px','background-color': '#fff', 'padding':'0px 1px 0px 1px', 'resize':'none','font-size': '6.37pt'}).attr('readonly',false);
			$finalqry.appendTo($finalqrytextdiv);
			$finalqrytextdiv.appendTo($FinalQryDiv);

			var $finalqryButtondiv = $("<div id='finalqrybuttondiv' class='FinalQueryButtondiv'></div>");

			//var $BTNsearchdatabase = $('<button id="imgSearch" class="btn btn-sm btn-primary"><i class="fa fa-search"></i></button>');
			var $BTNsearchdatabase = $('<img src="icons/search.jpg" id="imgSearch" />').css({'border':'2px solid #fff','float':'right','width':'20px','height':'20px','margin-right':'0px'}); //'<input type="button" class="myButton" id="BTNsearchdatabase" value="Go" />');
			
			//$FinalQryDiv.find('#imgSearch').click(function(event){  
			$BTNsearchdatabase.click(function (event) {		
				//QryCol = $("#QryCol option:selected").text(); 
				QryValue = $finalqry.val(); 
				//initializedata(QryCol,QryValue);
				
				if (('' + QryValue).toLowerCase().indexOf('select') > -1  || $.trim(QryValue) == '' )   {
						//alert(QryValue);				
						initializedata('',QryValue); 
				   }
				else {
					QueryDb('',QryValue);
				   }			
			});   			
			
			$BTNsearchdatabase.appendTo($finalqryButtondiv);
			
			$finalqryButtondiv.appendTo($FinalQryDiv);

			/* drop down 
			

			var menuopt =[  "AdmissionNo" , "siteino" ,  "StudentName" ,  "TotalFee" ];

			$testdrop = $('<span id="testdrop"> <strong> select </strong></span>');
			$('#testdrop').addClass('account');

			$testdrop.appendTo($QueryDiv);
			alert('hdere');
			$('#testdrop').dropmenu({menuoptions: menuopt});

			alert('after');
            // end testdrop down */

			
	 		$OperationDiv = $('<div id="OperationDiv" class="OperationDiv"/>');
	 		
		    $ActionDiv.appendTo($OperationDiv);	
		    $QueryDiv.appendTo($OperationDiv);
		    $QuerySubDiv.appendTo($OperationDiv);
			
			$OperationDiv.appendTo($headerdiv);		

			$ColsAndCriteriaDiv.appendTo($headerdiv);
						
			$FinalQryDiv.appendTo($headerdiv);
						
			$headerdiv.insertBefore($this);			


		//}
		//else
		//{
		//	$('#QueryDiv').find('#textsearch').keyup(function(event){  search(tbl,$(this).val());  });      							

		//}		


 }

 function initializedata(QryCol1,QryValue1)
 {

 					var url = options.url;
   					tablename = options.tablename;
   					var sqlqry11 ="" ; // options.sqlqry;
			   		var method = "POST";
     					var action = url ; // + "?page=1";	
     					var chek = options.chk;

						criteria =' ';
					
						if (parseInt(currentpage)==0){
							currentpage=1;
						}
						
						/*
						if ( ($.trim(QryCol1).length>0) && ($.trim(QryValue1).length>0) ){
							criteria = criteria + ' where ' + QryCol1 + " like '%" + QryValue1 + "%'";
						}						
						*/
						
						if (options.userid!==''){

								usercriteria1 = (options.username.match('admin') ? "" : " userid='" + options.userid + "\'" );						
						}
						else
						{
								usercriteria1 ="";

						}
						
						//alert(usercriteria1);
						
						//if ($('#finalqry').text().length>0){
						if(QryValue1.length>0){

							SingleQuote = $.trim(QryValue1).slice($.trim(QryValue1).length-1) ;
							 //alert(SingleQuote)

							sqlqry1 = ( SingleQuote ==  "'" ?   replaceAt(QryValue1, QryValue1.length-3, "\\'")  : QryValue1 ) + ( usercriteria1.length>0 ? " And " + usercriteria1 : "") ;   //$('#finalqry').text(); //.slice(0,-4);

							currentpage = 1;
							
							criteria = CriteriaString.slice(0,-3)	;	
							
							SingleQuote = $.trim(criteria).slice($.trim(criteria).length-1) ;

							criteria = ( SingleQuote ==  "'" ? replaceAt(criteria, criteria.length-1, "\\'") : Criteria) ;
												
							
						}
						else 
						{
								sqlqry1 = options.sqlqry + ( usercriteria1.length>0 ? " Where " + usercriteria1 : "");
						}
					
						//alert( sqlqry1 + ' ' + CriteriaString.length + ' tablename: ' + tablename + ' curpage: ' + currentpage + ' url  :' + action + ' referrencekey :' + options.referencekey + ' anchorcol: ' + options.anchorcolumn + ' chk:' + chek);
											
						DisplayLoad();
						
						//alert( sqlqry1 + ' criteria ' + criteria + ' page: ' + currentpage + ' table:' + tablename + 'companyid' + options.companyid );
					

						//alert(usercriteria1 + " ------ " + sqlqry1 + '-----' + criteria);

						ListQuery = options.sqlqry;
						
						$.ajax({
						url: action,
						type: method,
						data: { page: currentpage , sqlqry: sqlqry1 , QryCriteria: criteria , QueryTable: tablename , chk:chek , referencekey: options.referencekey, anchorcolumn: options.anchorcolumn , usercriteria:usercriteria1 , MasterCriteria : options.MasterCriteria , companyid:options.companyid , hostname :options.hostname , username : options.username , databasename : options.databasename , password : options.password},
						cache: false,
						timeout: 10000,
        				success: function (res) {

        						//alert(res)

        						var data1 = jQuery.parseJSON(res);

						      //$('#loading').html('setcount ' + data1.setcount + ' criteria :' + data1.criteria + ' qry:' + data1.qry );
						        				
        						setcount = data1.setcount ; // Math.ceil(data1.totalrecordcount/15);
        						
								$('#headingspan').html('<strong>  ' + tablename + ' Info</strong>' );

        						//$tabl.wrapInner(e);	
		        				$table=$(data1.tableobject);
		        				$this.html('');
		        				$table.attr('id','AdminTable');
		        				$table.appendTo($this);

								refreshZebra();
		        				
		        				//resize($table);
								
								checkall($table);		
							
								callselect($table);
								

		   						if (objectstarting==true)
								 {
								 	
									creationactionbar($table);
									objectstarting=false;

								 }	
								 else {
										
										//$QueryDiv.find('#textsearch').keyup(function(event){
										$('#textsearch').keyup(function(event){	  
											searchscreen($table,$(this).val());  
										});      							
								 
								 }			
		
								pager($table);
								
								HideLoad();

								navigatepage('1',$this.find('table'));

								//alert(username);

								//if ($.trim(options.username)!='admin')
								if ($.trim(username)!='admin')
								{
									//$ActionDiv.find('#imgDel').attr('disabled',true);
									//$btndel.prop( "disabled", true );
									$btndel.css( "display", 'none' );
									//alert($btndel.attr('id'));
									//alert(options.username);
								}						
								else {							
									//$btndel.prop( "disabled", false );
									//alert(options.username + ' user' );
									$btndel.show(); //.css( "display", 'block' );
									//alert(options.username);
								}
								
								

								if ((options.AutoNavigate!='undefined' ) && (options.autonavigate==true))
								{
									//alert('autonavigate activated');
									AutoNavigate();
								}
								

								$("#loading").html('Total Records : ' + data1.recordcount).fadeIn(100);	
								
								

						}
						//, 
        				//error: function (request, textStatus, errorThrown) {
            		//	console.log(request, textStatus, errorThrown);}
        				});
      


/*							
						$.ajax({
						url: action,
						type: method,
						data: {
						//page:currentpage , sqlqry:sqlqry + criteria , QryCriteria:CriteriaString , QueryTable:tablename, chk:chek , referencekey:options.referencekey , anchorcolumn:options.anchorcolumn},
						page:1 , sqlqry:sqlqry + criteria, chk:chek ,referencekey:options.referencekey, anchorcolumn:options.anchorcolumn},						
						//page:currentpage , sqlqry:sqlqry + criteria , chk:chek , referencekey:options.referencekey , anchorcolumn:options.anchorcolumn},
						cache: false,
						timeout: 10000,
        				success: function (res) {
        					
		        				var data1 = jQuery.parseJSON(res);
								alert(data1);        				
		        				//setcount = Math.ceil(data1.totalrecordcount/100);
		        				//$tabl.wrapInner(e);	
		        				$('#headingspan').html('<strong>  ' + tablename + ' Details </strong>' );
		        				//$table.html(e);
		        				$table=$(data1.tableobject);
		        				$this.html('');
		        				$table.attr('id','AdminTable');
		        				$table.appendTo($this);
								refreshZebra();
		        				resize($table);
								checkall($table);		
								callselect($table);
								
		   					if (objectstarting==true)
								 {
									creationactionbar($table);
									objectstarting=false;
															 
								 }				
								
								//$this.append($table);
				
								pager($table);
								HideLoad();
								navigatepage('1',$this.find('table'));
								
								if (options.username!='admin')
								{
									//$ActionDiv.find('#imgDel').attr('disabled',true);
									//$btndel.prop( "disabled", true );
									$btndel.css( "display", 'none' );
									//alert($btndel.attr('id'));
									
								}						
								else {							
									//$btndel.prop( "disabled", false );
									//alert(options.username + ' user' );
									$btndel.SHOW(); //.css( "display", 'block' );
								}
								
								if (options.AutoNavigate==true)
								{
									//alert('autonavigate activated');
									AutoNavigate();
								}
						
						}, 
        				error: function (request, textStatus, errorThrown) {
        					alert(errorThrown);
            			console.log(request, textStatus, errorThrown);}
        				});

*/
        				 
        				/*    
 						if (QryCol) {
 					    	$("#QryCol option[value=" + QryCol + "]").attr("selected", "selected"); 					    	
 					    	$('#textsearchdatabase').val(QryValue);
						 }
						 */
						 //callcustom($this.find('table'),$table.find('tbody tr'));
						 
					//alert('in initailize');
 
 }    	

 function QueryDb(QryCol1,QryValue1)
 {

   					var url = "querydynamic.php"; //options.url;
   					tablename = options.tablename;
   					var sqlqry ="" ; // options.sqlqry;
			   		var method = "POST";
     					var action = url + "?page=1";	
     					var chek = options.chk;

						criteria =' ';
						

						if(QryValue1.length>0){
							sqlqry = QryValue1 ; 
						}
						else {
								sqlqry = options.sqlqry;
						}
											
						DisplayLoad();	
	
						$.ajax({
						url: action,
						type: method,
						data: {
						page:1 , sql:sqlqry + criteria, chk:chek ,referencekey:options.referencekey, companyid:options.companyid , hostname :options.hostname , username : options.username , databasename : options.databasename , password : options.password},
						cache: false,
						timeout: 10000,
        				success: function (e) {
        				
							$('#loading').html(e).fadeIn(200);//.fadeOut(200);        				
        				//$('#headingspan').html('<strong>  ' + tablename + ' Info</strong>' );
						
							}
						});

					   HideLoad();
					   
	}

	// end of search  ------------------


function GetColumnName(SearchQuery , columnnameparameter ){
			
			selectpos =  SearchQuery.toLowerCase().indexOf('select '); 
			
			frompos   =  SearchQuery.toLowerCase().indexOf(' from ');			
			
			colstr = SearchQuery.substring(selectpos+7,frompos);//.toLowerCase();
			
			//alert(SearchQuery + " ......... " + columnnameparameter + "............ " + colstr ) ; //+ " " + SearchColumnName1);			

			//alert( columnnameparameter + "............ " + colstr ) ; //+ " " + SearchColumnName1);			
			
			SearchColumnName1 = '';

			if ( $.trim(colstr).toLowerCase() == '*'  ) 
			{
			
					SearchColumnName1 = columnnameparameter;
			}	
			else 
			{
					
					colstrArray = colstr.split(',');

					$.each(colstrArray ,function(k,v) {

						//alert(v + '...'+ ($.trim(v).indexOf($.trim( columnnameparameter.toLowerCase() ) )) );	
						colpos = $.trim( v.toLowerCase() ).indexOf($.trim( columnnameparameter.toLowerCase() ) ); 
						if ( colpos > -1 )
						{

							//tmpcolpos = $.trim(colstr.toLowerCase()).indexOf( columnnameparameter.toLowerCase() );

							//SpacePos = ( $.trim(SearchColumnName1string).indexOf(" ") > 0 ? $.trim(SearchColumnName1string).indexOf(" ") - 1:  0)
							
							SpacePos = ( $.trim( v.toLowerCase() ).indexOf(" ") > 0 ? $.trim( v.toLowerCase() ).indexOf(" ") :  0)
	            
       						//alert(colpos +'....'+SpacePos);

		            		if (SpacePos > 0) {
				                SearchColumnName1 = $.trim(v).substring( 0, SpacePos)
							}	            
				            else{
				                SearchColumnName1 =  $.trim(v) ; // Mid($.trim(SearchColumnName1string), 1)
				            }
				            
				            //alert(SearchColumnName1);
				            
				            return false;

						}

					});

					//SearchColumnName1string = colstrArray[ jQuery.inArray( colstrArray , columnnameparameter) ];

			}
        
	}

function GetColumnQryString(SearchQuery , columnnamestring )
{
			
			selectpos =  SearchQuery.toLowerCase().indexOf('select '); 
			
			frompos   =  SearchQuery.toLowerCase().lastIndexOf(' from ');			
			
			colstr = SearchQuery.substring(selectpos+7,frompos);//.toLowerCase();
			
			FinalColumnString = '';FinalQryString='';

			if ( $.trim(colstr).toLowerCase() == '*'  ) 
			{
			
					FinalColumnString = columnnamestring;
			}	
			else 
			{
					
					colstrArray = colstr.split(',');

					columnnamearray = columnnamestring.split(',');

					$.each(colstrArray ,function(k,v) {


						$.each(columnnamearray ,function(k1,v1) {

							//alert( v.toLowerCase() + '...'+ v1.toLowerCase() +'....' +  ($.trim(v.toLowerCase()).indexOf($.trim( v1.toLowerCase() ) )) );	
						
							colpos = $.trim( v.toLowerCase() ).indexOf($.trim( v1.toLowerCase() ) ); 
							
							if ( colpos > -1 )
							{

								//tmpcolpos = $.trim(colstr.toLowerCase()).indexOf( columnnameparameter.toLowerCase() );

								//SpacePos = ( $.trim(SearchColumnName1string).indexOf(" ") > 0 ? $.trim(SearchColumnName1string).indexOf(" ") - 1:  0)
								
								SpacePos = ( $.trim( v.toLowerCase() ).indexOf(" ") > 0 ? $.trim( v.toLowerCase() ).indexOf(" ") :  0)
		            
	       						//alert(colpos +'....'+SpacePos);

			            		if (SpacePos > 0) {
					                FinalColumnString = FinalColumnString + (FinalColumnString.length>0 ? "," : "")  +  $.trim(v).substring( 0, SpacePos) 
								}	            
					            else{
					                FinalColumnString = FinalColumnString + (FinalColumnString.length>0 ? "," : "")  + $.trim(v) ; // Mid($.trim(SearchColumnName1string), 1)
					            }
					            

							}

						});


					});

			}

			FinalQryString = "Select " + FinalColumnString + " From " + SearchQuery.slice(frompos+5);
        
	}

	
	    return this.each(function() {

            $this = $(this);

					    /*
						//set array to be updated when we add or remove plugin files
 						var pluginNames = ["lettering", "fittext", "butterjam", etc.];
						//one script tag for each plugin
 						$.each(pluginNames, function(){
   						$('head').append('<script src="js/plugins/' + this + '.js"></script>');
 						});
						
						
						$.getScript("dropmenu.js");
				   	    ('head').append('<script src="dropmenu.js"></script>'); */
					
				   	    //Default Starting Page Results
   
						//$("#pagination li:first").css({'color' : '#FF0084','border' : 'none'});
						//$("#content").load("data.php?page=1", pager($('.tbl')));

						$this.html('');
   					
 						initializedata('','');

						//alert($table.html());
												
						//CreateActionbar($table);
  				
					
	      });
	      
    


    };


 /*   
 $.extend($.expr[':'], {
  'containsi': function(elem, i, match, array) 
    return (elem.textContent || elem.innerText || '').toLowerCase()
        .indexOf((match[3] || "").toLowerCase()) >= 0;
  }
*/

$.extend($.expr[':'], {
  'containsi': function(elem, i, match, array)
  {
    return (elem.textContent || elem.innerText || '').toLowerCase()
    .indexOf((match[3] || "").toLowerCase()) >= 0;
  }
});

function replaceAt(s, n, t) {
    return s.substring(0, n) + t + s.substring(n + 1);
}
	
})(jQuery);