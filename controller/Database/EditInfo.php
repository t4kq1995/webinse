<?php
	/* Json Header */
	header('Content-type: application/json');
	/* Include DataBase */
	require_once('../../model/DataBase.php');

	/* Get data */
	$id = $_POST["id"];
	$first_name = $_POST["first_name"];
	$second_name = $_POST["second_name"];
	$email = $_POST["email"];

	/* Send query to DataBase */

	/* Charset */
	mysqli_set_charset($mysqli, "utf8");

	/* Form data */
	$query = "UPDATE `_users` SET `first_name` = '$first_name', `second_name` = '$second_name', `email` = '$email' WHERE `id_user` = '$id'";
	$result = mysqli_query($mysqli, $query);

	/* Return answer */
	echo json_encode(array('data' => $result));