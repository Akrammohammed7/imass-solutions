<?php

    error_reporting(E_ALL);
    ini_set('display_errors', '1');

    //$emailto = $_POST['emailto'];  $emailfrom = $_POST['emailfrom']; 
    
    foreach($_POST as $column => $value)
    {   
        ${$column} = ($value) ;
        //echo "$column" . '--' . $value . '\n' ;
    }

    //echo "testing";  

    $body = '';
    

    //Recepient Email Address
    $to_email  = $emailto;

    //check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        $output = json_encode(array( //create JSON data
            'type'=>'error',
            'text' => 'Sorry Request must be Ajax POST'
        ));
        die($output); //exit script outputting json data
    }

    //Sanitize input data using PHP filter_var().
    //$first_name =  filter_var($_POST["first_name"], FILTER_SANITIZE_STRING);
    //$emailto   = filter_var($_POST["emailto"], FILTER_SANITIZE_EMAIL);
    ///$subject         = $_POST["subject"] ; //  "Your Email Subject Goes Here...";
   
     
    //Textbox Validation 
    if(strlen($first_name)<4){ // If length is less than 4 it will output JSON error.
        $output = json_encode(array('type'=>'error', 'text' => 'Name is too short or empty!'));
        die($output);
    }
        

    $message = "" ; // '<html><body>';
    $message .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
    $message .= "<tr style='background: #eee;'><td><strong>First Name:</strong> </td><td>" . strip_tags($_POST['first_name']) . "</td></tr>";

    $message .= "<tr><td><strong>Email Address :</strong> </td><td>" . strip_tags($_POST['emailfrom']) . "</td></tr>";
    $message .= "<tr><td><strong>Phone :</strong> </td><td>" . strip_tags($_POST['phone']) . "</td></tr>";
    
    $message .= "<tr style='background: #eee;'><td><strong>subject:</strong> </td><td>" . strip_tags($_POST['subject']) . "</td></tr>";

    $message .= "<tr><td><strong>Message :</strong> </td><td>" . strip_tags($_POST['message']) . "</td></tr>";
    $message .= "</table>";
    //$message .= "</body></html>";


    $file_attached = false;
    if(isset($_FILES['file_attach'])) //check uploaded file
    {
        //get file details we need
        $file_tmp_name    = $_FILES['file_attach']['tmp_name'];
        $file_name        = $_FILES['file_attach']['name'];
        $file_size        = $_FILES['file_attach']['size'];
        $file_type        = $_FILES['file_attach']['type'];
        $file_error       = $_FILES['file_attach']['error'];


 
        //exit script and output error if we encounter any
        if($file_error>0)
        {
            $mymsg = array(
            1=>"The uploaded file exceeds the upload_max_filesize directive in php.ini",
            2=>"The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form",
            3=>"The uploaded file was only partially uploaded",
            4=>"No file was uploaded",
            6=>"Missing a temporary folder" );
             
            $output = json_encode(array('type'=>'error', 'text' => $mymsg[$file_error]));
            die($output);
        }
         
        //read from the uploaded file & base64_encode content for the mail
        $handle = fopen($file_tmp_name, "r");
        $content = fread($handle, $file_size);
        fclose($handle);
        $encoded_content = chunk_split(base64_encode($content));
        //now we know we have the file for attachment, set $file_attached to true
        $file_attached = true;



        
    }

    
     
    if($file_attached) //continue if we have the file
    {
                        
                        // a random hash will be necessary to send mixed content
                        $separator = md5('imasssolutions.com'); //time());

                        // carriage return type (RFC)
                        $eol = "\r\n";  $boundary = md5("imasssolutions.com"); 

                       /*  

                        // main header (multipart mandatory)
                        //$headers = "From:From <". $emailfrom .">" . $eol;

                        $headers = "MIME-Version: 1.0" . $eol;
                        $headers .= "From:" . $emailfrom . "\r\n";
                        $headers .= "Reply-To: ".$emailfrom . "\r\n";
                        $headers .= "Content-Type: multipart/mixed; boundary=\"".$separator."\"".$eol;
                        ///$body .= "Content-type: text/html; charset=ISO-8859-1\n"; 
                        $headers .= "Content-Transfer-Encoding: 7bit" . $eol;
                        $headers .= "This is a MIME encoded message." . $eol;

                        // message
                        $body .= "--" . $separator . $eol;
                        $body .= "Content-type:text/html; charset=ISO-8859-1\n";
                        $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
                        $body .= $message . $eol;

                        // attachment
                        $body .= "--" . $separator . $eol;
                        /////$body  .= "Content-Type:".$file_type." ";
                        $body .= "Content-Type: application/octet-stream; name=\"" . $file_name . "\"" . $eol;
                        $body .= "Content-Transfer-Encoding: base64" . $eol;
                        $body .= "Content-Disposition: attachment; filename=\"".$file_name."\"". $eol;
                        $body .= $encoded_content . "\r\n\r\n"; // . $eol;
                        $body .= "--" . $separator . "--";

                    
                        
                       
                    $boundary = md5("imasssolutions.com"); 
                    
                    $headers = "MIME-Version: 1.0\r\n"; 
                    $headers .= "From:" . $emailfrom ."\r\n"; 
                    $headers .= "Reply-To: ". $emailfrom . "" . "\r\n";
                    ////$headers .= "Content-Type: multipart/mixed; boundary = $boundary\r\n\r\n";  

                    $headers .= "Content-Type: multipart/mixed; boundary=\"".$separator."\"".$eol;

                    $headers .= "This is a multi-part message in MIME format.\n";     

                    /////////$body = "--".$boundary."\n";
                    $body .= "Content-type: text/html; charset=ISO-8859-1\n"; // or UTF-8 //
                    $body .= "Content-Transfer-Encoding: 7bit\n\n";
                    $body .= $message."\n\n";

                    $strContent1 = $encoded_content ; // chunk_split(base64_encode(file_get_contents($file_tmp_name)));  //$encoded_content; //
                    
                    $body .= "--".$boundary."\n";
                    $body .= "Content-Type: application/octet-stream; name=\"$file_name\"\n";
                    $body .= "Content-Transfer-Encoding: base64\n";
                    $body .="X-Attachment-Id: ".rand(1000,99999)."\r\n\r\n"; 
                    $body .= "Content-Disposition: attachment; filename=\"$file_name\"\n\n";
                    //$body .=   $strContent1."\n\n";
                    $body .= $strContent1 . "\r\n\r\n";
                    $body .= "--".$boundary."--";

                    */

                        $uid = md5(uniqid(time()));
                        //$file_name = basename($file);

                        // header
                        $headers = "From: ".$first_name." <".$emailfrom.">\r\n";
                        $headers .= "Reply-To: ".$emailfrom."\r\n";
                        $headers .= "MIME-Version: 1.0\r\n";
                        $headers .= "Content-Type: multipart/mixed; boundary=\"".$uid."\"\r\n\r\n";

                        // message & attachment
                        $body = "--".$uid."\r\n";
                        $body .= "Content-type:text/html; charset=iso-8859-1\r\n";
                        $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
                        $body .= $message."\r\n\r\n";
                        
                        // attachment

                        $body .= "--".$uid."\r\n";
                        $body .= "Content-Type: application/octet-stream; name=\"".$file_name."\"\r\n";
                        $body .= "Content-Transfer-Encoding: base64\r\n";
                        $body .= "Content-Disposition: attachment; filename=\"".$file_name."\"\r\n\r\n";
                        $body .= $encoded_content . "\r\n\r\n";
                        $body .= "--".$uid."--";

        
    }
    else
    {
        
        $eol = "\r\n";
        
        //$headers = "From: Fromname <'"+ $emailfrom +"'>" . $eol;
        $headers = "From:".$emailfrom."\r\n";
        $headers .= "Reply-To: ". strip_tags($emailfrom) . "\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
        $body .= $message . $eol;

    }

    ////echo '\n' . $to_email . '\n' . $subject  . '\n' ; // . $body . '\n' . $headers;


    $send_mail = mail($to_email, $subject, $body, $headers);
 
    if(!$send_mail)
    {
        //If mail couldn't be sent output error. Check your PHP email configuration (if it ever happens)
        $output = json_encode(array('type'=>'error', 'text' => 'Could not send mail! Please check your PHP mail configuration.'));
        die($output);
    }else{
        $output = json_encode(array('type'=>'message', 'text' => 'Hi '.$first_name .' Thank you for your interest, will get back to you shortly'));
        die($output);
    }/**/

?>