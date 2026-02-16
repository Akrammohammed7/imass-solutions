function exportdata(){

	//tableToExcel(\''+'body'+','+'export table'+'\');

	//alert($('#maindiv').html());

	tableToExcel('maindiv','export table');

}

function exportpdf(){

	
	//alert($('#maindiv').html());

	//tableToExcel('maindiv','export table');

	var doc = new jsPDF();
	
	var specialElementHandlers = {
	    '#metainfo,script,[donotprint=true]': function (element, renderer) {
	        return true;
	    }
	};

	doc.fromHTML($('.popGeneric-Body').html(), 15, 15, {
        'width': 170,
            'elementHandlers': specialElementHandlers
    });
    
    doc.save('sample-file.pdf');

}


function pdfFromHTML(divtoexport) {
	
	if (divtoexport=='')
	{
		src=$('#maindiv').html();

	}
	else
	{
		src = $(divtoexport).html();
	}	

	alert('in table exportpdf \n' + src);

	var pdf = new jsPDF('p', 'pt', 'letter')

	// source can be HTML-formatted string, or a reference
	// to an actual DOM element from which the text will be scraped.
	, source = $('#maindiv').html() /*src /* $('#maindiv').html() */

	// we support special element handlers. Register them with jQuery-style 
	// ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
	// There is no support for any other type of selectors 
	// (class, of compound) at this time.
	, specialElementHandlers = {
		// element with id of "bypass" - jQuery style selector
		'#bypassme': function(element, renderer){
			// true = "handled elsewhere, bypass text extraction"
			return true
		}
	}

	margins = {
      top: 80,
      bottom: 60,
      left: 40,
      width: 522
    };
    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case
    pdf.fromHTML(
    	source // HTML string or DOM elem ref.
    	, margins.left // x coord
    	, margins.top // y coord
    	, {
    		'width': margins.width // max width of content on PDF
    		, 'elementHandlers': specialElementHandlers
    	},
    	function (dispose) {
    	  // dispose: object with X, Y of the last line add to the PDF 
    	  //          this allow the insertion of new lines after html
          pdf.save('Test.pdf');
        },
    	margins
    )
}

var tableToExcel = ( function () {

		//alert('here');

		// example onclick="tableToExcel('testdiv', 'W3C Example Table')" //

	  	var uri = 'data:application/vnd.ms-excel;filename=exportData.xlsx;base64,'

	    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'

	    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }

	    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }

	  	return function(table, name) {

	    if (!table.nodeType) table = document.getElementById(table);

	    	table1  = $(table).clone();

	    	$(table1).find('input:text').each(function(){
				
				if ($(this).attr('donotprint') ) {
					//alert($(this).attr('id'));
					$(this).remove();

				}
				else
				{
					val = $(this).val();
					//$(this).prop('type','span');

					$( this ).replaceWith( "<span>" + val + "</span>" );
				}	
				//$(this).text(val);
			});

	   
			$(table1).find('table.tbl1 thead tr th:eq(0),table.table-mailbox thead tr th:eq(0) , table.table-mailbox thead tr td:eq(0) ,[donotprint=true],#metainfo').remove();
			
			$(table1).find('table.table-mailbox thead tr').each( function(){
				$(this).find('td:eq(0)').remove(); 
			});

			$(table1).find('table.tbl1 tbody tr,table.table-mailbox tbody tr').each( function () {
				$(this).find('td:eq(0)').remove(); 
			});	

		    var ctx = {worksheet: name || 'Worksheet10', table: $(table1).html()}   //innerHTML

		    window.location.href = uri + base64(format(template, ctx))

		  }

		} ) ();