<?php
	/* Json Header */
	header('Content-type: application/json');
	/* Include DataBase */
	require_once('../../model/DataBase.php');

	/* Get data */
	$id = $_POST["id"];

	/* Send query to DataBase */

	/* Charset */
	mysqli_set_charset($mysqli, "utf8");

	/* Form data */
	$query = "DELETE FROM `_users` WHERE `id_user` = '$id'";
	$result = mysqli_query($mysqli, $query);

	/* Return answer */
	echo json_encode(array('data' => $result));