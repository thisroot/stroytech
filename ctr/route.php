<?php



if ($_POST['form'] == 'sendMessage') {

  $requestArr = $_POST;
  $to = 'sdkomi@mail.ru';
  $email = $requestArr['email'];



  ob_start();
  
  include '../vie/contact-form.php';

    $message = ob_get_clean();

    $headers = "Content-type: text/html; charset=UTF-8 \r\n";
    $headers .= "From: Запрос с сайта <s-stroytech.com>\r\n";


    if (!mail($to, $requestArr['subject'], $message, $headers)) {
        header('Content-Type: application/json');
        echo json_encode(array('respond' => '1'));
        exit();
    }

    header('Content-Type: application/json');
    echo json_encode(array('respond' => '0', 'data' => $requestArr));
}
