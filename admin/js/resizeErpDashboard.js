        /*resizeErpDashboard();
        
        $( window ).resize(function() {
                resizeErpDashboard();
        });*/

       function resizeErpDashboard()
       {
           
            mainwidth = width=$(".dashboardMain-Generic").width(); 

            //alert('mainwidth : ' + mainwidth);

            width=$(".dashboardMenu-Generic").width();


            if (width<=399) //width>=300  &&
            {
                optionwidth = (width/3);
                optionwidth=( optionwidth.toFixed(2)) -10;

                //alert('Range 1 - ' + width + '-' + optionwidth );
                
            }
            else if (width>=400  && width<=499)
            {
                optionwidth = (width/4);
                optionwidth=( optionwidth.toFixed(2)) -10;
                //alert('Range 2 - ' + width + '-' + optionwidth );

            }
            else if (width>=500 && width<=767)
            {
                optionwidth = (width/5);
                optionwidth=( optionwidth.toFixed(2)) -10;
                //alert('Range 3 - ' + width + '-' + optionwidth );
            }
            else if (width>=768 && width<=1023)
            {
                optionwidth = (width-0.25)/6;
                optionwidth=( optionwidth.toFixed(2)) -10;
                //alert('Range 4 - ' + width + '-' + optionwidth );
            }
            else if (width>=1024)
            {
                optionwidth = ( width -  0.5 )/6;
                optionwidth=( optionwidth.toFixed(2)) -10;
                //alert('Range 5 - ' + width + '-' + optionwidth );
            }

            //alert(width + '-' + optionwidth);

            $(".dbActionWrap").css("width",optionwidth+"px");
       
       }
