(function($){

$.fn.pagelist = function(options) {



     	   $.fn.pagelist.defaults = {
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
		     strdeletecolumns: '',
		     noofpages:10,
		     totalpages:25		 
			         
	    };
	   
		//rowColorOn: '#FFAC7F',	   
	   
	    var options = $.extend( {} , $.fn.pagelist.defaults, options);

	    var currentpage = 1 , Range = 1 ; // Range1 = 1; Range2 = options.noofpages;

	 	var liststr = '' ; //	'<div class="row">';

		//liststr =	liststr + '	<div class="col-xs-8 col-sm-8 col-md-8">';

		//liststr =	liststr + '			<div class=""> ';

		liststr =	liststr + '			<ul id="nav_list_demo_pag1" class="pagination pagination_custom" unselectable="on"  style="user-select: none;margin-top: 0px; margin-bottom:5px;" >';
		liststr =	liststr + '			<li class="toppage"><a id="toppage" href="javascript:void(0);">«</a></li>';
		liststr =	liststr + '			<li class="previouspage"><a id="previouspage" href="javascript:void(0);">‹</a></li>';

		for (var i = 1; i < options.noofpages + 1; i++) {
			//
			clsactive="";

			if (i==1)
			{ clsactive =  " active";
			}

			liststr =	liststr + '	<li class="set' + clsactive + '" id="li'+i+'"  ><a id="page'+i+'" href="javascript:void(0);">' + i + '</a></li>';
		};



		liststr =	liststr + '			<li class="nextpage"><a id="nextpage" href="javascript:void(0);">›</a></li>';
		liststr =	liststr + '			<li class="lastpage"><a id="lastpage" href="javascript:void(0);">»</a></li></ul>';

		//liststr =	liststr + '			</div>';

		//liststr =	liststr + '		</div>';

		liststr1 =	 '				<div class="row-space col-md-1 col-sm-2 col-xs-5 " id="setActDiv1">';
	
		liststr1 =	liststr1 + '			<div class="input-group"><span class="input-group-addon" title="Rows per set"><i class="glyphicon glyphicon-asterisk"></i></span><input id="rowsperset" value="'+options.rowsperset+'" type="text" class="form-control small-input" title="Rows per set" onChange="rowsperset=$(this).val();">';
		liststr1 =	liststr1 + '			</div>';

		liststr1 =	liststr1 + '	</div>';

		liststr1 =	liststr1 + '	<div class="col-md-1 col-sm-2 col-xs-5" id="setActDiv2">';

		liststr1 =	liststr1 + '			<div class="input-group"><span class="input-group-addon" title="Rows per page"><i class="glyphicon glyphicon-th-list"></i></span><input id="rowsperpage" value="15" type="text" class="form-control small-input" title="Rows per page">';
		liststr1 =	liststr1 + '			</div>';

		liststr1 =	liststr1 + '    </div>';

		liststr1 =	liststr1 + '	<div class="col-md-1 col-sm-2 col-xs-2" style="display:none;" id="setActDiv3">';

		liststr1 =	liststr1 + '			<div id="rows_info_demo_pag1" class="">151-165 of 1875 records (p.11/125)';
		liststr1 =	liststr1 + '			</div>';
		liststr1 =	liststr1 + '	</div>';


		liststr1 =	liststr1 + '	<div class="col-md-1 col-sm-2 col-xs-5" id="setActDiv4">';

		liststr1 =	liststr1 + '				<div class="input-group"><span class="input-group-addon" title="Go to page"><i class="glyphicon glyphicon-arrow-right"></i></span><input id="gotopage" type="text" class="form-control small-input" title="Go to page"> ';
		liststr1 =	liststr1 + '				</div>';		

		liststr1 =	liststr1 + '    </div>';

		/*  #rows_info_demo_pag1{
      			display: none;
    	  }*/


		//liststr =	liststr + ' </div>';  


		function checkpagerender()
		{
			
			
			change = false;	
			
			if (parseInt(currentpage) == parseInt(options.totalpages) )
			{
				Range = options.totalpages/options.noofpages;
				Range = parseInt(Range);
			}	

			if (parseInt(currentpage) == 1)
			{
				Range = 2;
			}	

			//alert(Range);

			//alert(Range  + '-' + currentpage + '-' + options.noofpages);

			currentrange = Range * options.noofpages;

			if (parseInt(currentpage) > parseInt(currentrange) )
			{
				//x = Range %  currentrange;

				//alert( x + '-' + currentpage + '-' + (currentpage - x) );
				//Range++;
				
				
				Range = currentpage/options.noofpages;

				extrarange = 0;
				
				if ( (currentpage % options.noofpages) > 0 )
				{
					extrarange = 1;
				}
				
				Range = parseInt(Range) + extrarange ; //+ (currentpage % options.noofpages) ;	

				//Range = parseInt(Range) + (currentpage % options.noofpages);
				
				//alert(Range  + '-' + currentpage + '-' + options.noofpages);

				change = true;
				//alert('in plus');

					nextset = parseInt(currentrange) + parseInt(options.noofpages);

					//alert('nextset :' + nextset + ' -  totalpages : ' + options.totalpages + '- nextset -totalpages' + (nextset > options.totalpages) )

					if ( nextset > options.totalpages )
					{
						remainingpages = nextset-options.totalpages;

						$('.set:gt('+ (remainingpages-1) +')').removeClass('set').addClass('set1').hide();
					}	
				


			}

			previousrec = parseInt(currentrange) - parseInt(options.noofpages) ;
			
			//alert('previousrec ' +  previousrec + '-- currentpage : ' + currentpage);

			if ( parseInt(previousrec) >= parseInt(currentpage) )
			{
				//Range--;
				
				Range = currentpage/options.noofpages;
				
				extrarange = 0;

				if ( (currentpage % options.noofpages) > 0 )
				{
					extrarange = 1;
				}
				
				Range = parseInt(Range) + extrarange ; //+ (currentpage % options.noofpages) ;	
				


				if (Range==0)
				{
					Range = 1;
				}	

				//alert(Range + 'in minus');

				change = true;

					$('.set1').addClass('set');

					$('.set').removeClass('set1').css({'display':'inline'});

			}	


			if (change)
			{	
				x2 = ((Range-1) * options.noofpages ) + 1 ;


				$('.set').each(function()
				{
					$(this).find('a').text(x2);
					$(this).find('a').attr('id','page'+x2);	
					
					x2++; 

				});

		 		change=false;
			}	


		};

 
	    return this.each(function() {
	        
	  		          $this = $(this);

						    //alert('in paging list');

							$this.html('');

							$('#setActDiv1,#setActDiv2,#setActDiv3,#setActDiv4').remove();

							$this.html(liststr);
							$(liststr1).insertAfter($this);

							$('.set').click(function(event){
         
								//DisplayLoad();
								
								currentpage = $(this).text();

								
								//initializedata('','');
								
								//HideLoad();
								
								$(".set").removeClass('active');
								//.css({'border' : 'solid #dddddd 1px'})
								//.css({'color' : '#0063DC'}); //#0063DC

								$(this).addClass('active');
								//.css({'color' : '#FF0084'})
								//.css({'border' : 'solid #dddddd 1px'});
								if (options.callback!='')
								{
									//alert(options.callback + '-' + currentpage);
									//setTimeout(options.callback,0);
									if (typeof(options.callback) == 'function') 
									{
										 
						        		 options.callback(currentpage,$(this).attr('id'));
						     		}
								}	
							
							});

							$('.previouspage').click(function(event)
							{
								
								if (currentpage!=1)
								{	
         							currentpage = parseInt(currentpage)  - 1;
         						}

         						checkpagerender();

         						$(".set").removeClass('active');
         						
         						$('#page'+currentpage).parent().addClass('active');

         						/*if (options.callback!='')
								{
									setTimeout(options.callback,0);
								}*/
         						if (typeof(options.callback) == 'function') 
								{

					        		 options.callback(currentpage,$(this).attr('id'));
					     		}
         					
         					});

         					$('.nextpage').click(function(event)
							{
								
         						if (currentpage < parseInt(options.totalpages) )
								{
         							currentpage = parseInt(currentpage)  + 1;
         						}

         						checkpagerender();

         						$(".set").removeClass('active');
         						
         						$('#page'+currentpage).parent().addClass('active');

         					   /* if (options.callback!='')
								{
									setTimeout(options.callback,0);
								}*/
								if (typeof(options.callback) == 'function') 
								{

					        		 options.callback(currentpage,$(this).attr('id'));
					     		}
         					});  

         					$('.toppage').click(function(event)
							{
								
								currentpage=1;

								checkpagerender();

         						$(".set").removeClass('active');
         						
         						$('#page'+currentpage).parent().addClass('active');

         						/*if (options.callback!='')
								{
									setTimeout(options.callback,0);
								}*/
								if (typeof(options.callback) == 'function') 
								{

					        		 options.callback(currentpage,$(this).attr('id'));
					     		}

         					});

         					$('.lastpage').click(function(event)
							{
         						//if (currentpage!=options.noofpages)
								//{
         							//currentpage = parseInt(currentpage)  + 1;
         						//}
         						currentpage=options.totalpages;

         						checkpagerender();

         						$(".set").removeClass('active');
         						
         						$('#page'+currentpage).parent().addClass('active');

         						/*if (options.callback!='')
								{
									setTimeout(options.callback,0);
								}*/
								if (typeof(options.callback) == 'function') 
								{

					        		 options.callback(currentpage,$(this).attr('id'));
					     		}

         					});  


         					$('#gotopage').change(function(event)
							{
								

								currentpage = $('#gotopage').val();
								
								if (parseInt(currentpage) > parseInt(options.totalpages) )
								{
									currentpage = options.totalpages;
								}	

								checkpagerender();

         						$(".set").removeClass('active');
         						
         						$('#page'+currentpage).parent().addClass('active');

         						/*if (options.callback!='')
								{
									setTimeout(options.callback,0);
								}*/
								if (typeof(options.callback) == 'function') 
								{

					        		 options.callback(currentpage,$(this).attr('id'));
					     		}

         					});


         					$('#rowsperpage').change(function(){
         						
         						if ($.trim($(this).val())!='' && $.trim($(this).val())!=0)
         						{	
         							options.recordsetcallback($(this).val()); 
         						}
         						else
         						{
         							alert('Please enter proper number between 10 - 150 ');
         							$(this).val('15');	
         						}	

         					});

	    });
 
};


})(jQuery);
