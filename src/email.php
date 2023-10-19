<?php

$receivers = array('office@viggroup-bg.com');
		require_once('./mailer/smtp.class.php');
		require_once('./mailer/phpmailer.class.php');

		$mailer = new PHPMailer;
		$mailer->PluginDir = './mailer/';
		$mailer->SetLanguage("en", 'mailer/');
		$mailer->SMTPDebug = false;
		$mailer->Mailer ='smtp';
		$mailer->CharSet = 'UTF-8';
		$mailer->SMTPAuth = true;
		$mailer->Username = 'sales@pokrivala.net';
		$mailer->Password = 'Martito71037889';
		$mailer->Host = 'mail.pokrivala.net';
		$mailer->Port = 465;
		$mailer->Sender = 'sales@pokrivala.net';
		$mailer->From = 'sales@pokrivala.net';
		$mailer->FromName = 'Pokrivala web site';

$subject = "=?UTF-8?B?".base64_encode($POST['subject'])."?=";
$message = "Съобщение от: $_POST[name] ($_POST[UserEmail])
Относно: $_POST[subject]

$_POST[message]";

$sent = false;
foreach ($receivers as $value) {
	$mailer->AddAddress($value);
	$mailer->AddReplyTo($_POST['email']);
	$mailer->Subject = $_POST['subject'];
	$mailer->Body = $message;

	 if ($mailer->Send()) {
	 	$sent = true;
	 }

	$mailer->ClearAddresses();
	$mailer->ClearReplyTos();
}

if ($sent) {
	$message_result = '<p>Благодарим Ви! Вашето съобщение беше успешно изпратено!</p>';
} else {
	$message_result = '<p>Съжаляваме, но възникна грешка и Вашето съобщение не беше изпратено!</p>';
}

// include(<Тhanks />);
include('thanks.html');
?>
