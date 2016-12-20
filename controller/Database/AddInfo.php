<?php
	/* Json Header */
	header('Content-type: application/json');
	/* Include DataBase */
	require_once('../../model/DataBase.php');

	/* Get data */
	$first_name = $_POST["first_name"];
	$second_name = $_POST["second_name"];
	$email = $_POST["email"];

	/* Send query to DataBase */

	/* Charset */
	mysqli_set_charset($mysqli, "utf8");

	/* Form data */
	$query = "INSERT INTO `_users` (`first_name`, `second_name`, `email`) VALUES ('$first_name', '$second_name', '$email')";
	$result = mysqli_query($mysqli, $query);
	$id_user = mysqli_insert_id($mysqli);

	/* Return answer */
	echo json_encode(array('data' => $id_user));