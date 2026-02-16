(function($){

$.fn.multicheck = function(options) {



     	   $.fn.multicheck.defaults = 
     	   {
          	 itemClass : 'items',
          	 callback:'getselecteditems()',
          	 SelectAll:'true',
          	 itemDisplayControl:null
	    	};
	   
		//rowColorOn: '#FFAC7F',	   
	   
	    var options = $.extend( {} , $.fn.multicheck.defaults, options);

	    //var currentpage = 1 , Range = 1 ; // Range1 = 1; Range2 = options.noofpages;

 
	    return this.each(function() {
	        
	  		          		$this = $(this);

						 
							$this.html('');

							//alert($this.html());

							$btngroup = $('<div class="btn-group"></div>');
                            $btnmulti = $('<button type="button" class="multiselect dropdown-toggle btn btn-default" data-toggle="dropdown" title="Select Columns" aria-expanded="true"><span class="multiselect-selected-text">Select Columns</span> <b class="caret"></b></button>');
                            $ul =  $('<ul class="multiselect-container dropdown-menu" > </ul>');
                            $limultiselect = $('<li class="multiselect-item multiselect-all"><a tabindex="0" class="multiselect-all"><label class="checkbox"><input type="checkbox" value="multiselect-all">  Select all</label></a></li>');
                            
                            li ="";

                            /*$.each( arr, function( index, value ){
							    sum += value;
							});*/

                            $.each( options.itemsarray , function(key,value)
                            {
                            	//alert(JSON.stringify(value));
                            	li = li + '<li><a tabindex="0"><label class="checkbox '+options.itemClass+'"><input type="checkbox" value="">' + value + '</label></a></li>';
                            });
                            
                            $ul.append($limultiselect);
                            $ul.append($(li));

                            $btngroup.append($btnmulti);
                            $btngroup.append($ul);

							$this.append($btngroup);


							$limultiselect.find('input:checkbox').click(function()
							{ 
					
									var chkstatus = false;
																   
									   if($(this).prop('checked')==true)
									   {
					                    chkstatus = true;
									   }
					               	   else
					                   {
					                	   chkstatus = false;	
				   	                   }

				   	                   $("."+options.itemClass).find('input:checkbox').prop('checked',chkstatus);
				   	                   
	    							   putitems();
	    							   /*if (options.callback!='')
									   {
											alert(options.callback);
											setTimeout(options.callback,0);
									   }*/	
	    					});

	    					$("."+options.itemClass).find('input:checkbox').click( function()
	    					{
								/*if (options.callback!='')
								{
									setTimeout(options.callback,0);
									//setTimeout(CustomDelFunction,0);
								}*/	
								putitems();
							});
	    });


	    function putitems()
	    {
	    	itemstring =""
	    	$("."+options.itemClass).find('input:checkbox:checked').each( function()
	    	{
	    		itemstring = itemstring + $(this).parent().text() + "," ;
	    	});

	    	if (options.itemDisplayControl!='')
	    	{
	    		$(options.itemDisplayControl).text(itemstring.slice(0,-1));	
	    		//options.stringvariable = itemstring.slice(0,-1);
	    		//alert(ColumnString);
	    	}	
	    }			
 
};


})(jQuery);
