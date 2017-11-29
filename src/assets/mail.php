<?php
  $mailToSend = 'grzegorz.stanczyk@o2.pl';
  $errors = Array();
	$return = Array();
  
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $title = $request->title;
    $from_email = $request->email;
    $message = $request->message;
    $antiSpam = $request->honey;
    $email_subject = '=?utf-8?B?'.base64_encode($title).'?=';

    if (empty($antiSpam)) {
      if (empty($title)) {
        array_push($errors, 'title');
      }
      if (!filter_var($from_email, FILTER_VALIDATE_EMAIL)) {
        array_push($errors, 'from_email');
      }
      if (empty($message)) {
        array_push($errors, 'message');
      }
      if (count($errors) > 0) {
        $return['errors'] = $errors;
      } else {
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $headers .= "From: $from_email\r\n";
        $headers .= "Reply-To: $from_email";
        $message = "
          <html>
            <head>
              <meta charset=\"utf-8\">
            </head>
            <style type='text/css'>
              body {font-family:sans-serif; color:#222; padding:20px;}
              div {margin-bottom:10px;}
              .msg-title {margin-top:30px;}
            </style>
            <body>
              <div>Title: <strong>$title</strong></div>
              <div>Email: <a href=\"mailto:$from_email\">$from_email</a></div>
              <div class=\"msg-title\"> <strong>Message:</strong></div>
              <div>$message</div>
            </body>
          </html>";
      
        if (mail($mailToSend, $email_subject, $message, $headers)) {
          $return['status'] = 'ok';
        } else {
          $return['status'] = 'error';
        }
      }
    } else {
      $return['status'] = 'ok';
    }

    header('Content-Type: application/json');
    echo json_encode($return);
  }
?>