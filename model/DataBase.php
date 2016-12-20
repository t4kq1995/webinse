<?php
	/* Create mysqli connection */
	$server = 'localhost';
	$user = 'root';
	$password = 'pro100vlad';
	$database = 'webinse';

  	$mysqli = @new mysqli($server, $user, $password, $database);

  	/* Check mysqli connection */
  	if (mysqli_connect_errno()) {
    	echo "Подключение невозможно: ".mysqli_connect_error();
  	}