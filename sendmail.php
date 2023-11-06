<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);

	//От кого письмо
	$mail->setFrom('123@freelancervl.ru', 'Freelancervl.ru');
	//Кому отправить
	$mail->addAddress('zarodiny@yandex.ru', 'Person One');
	//Тема письма
	$mail->Subject = 'Привет!';



	//Тело письма
	$body = '<h1>Доброго времени суток!</h1>';

	if(trim(!empty($_POST['name']))){
		$body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
	}
	if(trim(!empty($_POST['email']))){
		$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
	}

	if(trim(!empty($_POST['phone']))){
		$body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
	}

	if(trim(!empty($_POST['message']))){
		$body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
	}

	// прикрепить файл
	if (!empty($_FILES['image']['tmp_name'])) {

		$filePath = __DIR__ . "/files/" . $_FILES['image']['name'];

		if (copy($_FILES['image']['tmp_name'], $filePath)) {
			$fileAttach = $filePath;
			$body.='<p>Фото в приложении</p>';
			$mail->addAttachment($fileAttach);
		}
	}

	$mail->Body = $body;

	//Отправляем
	if (!$mail->send()) {
		$message = 'Ошибка';
	} else {
		$message = 'Данные отправлены!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>