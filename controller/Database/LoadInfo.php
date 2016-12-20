<?php
	/* Json Header */
	header('Content-type: application/json');
	/* Include DataBase */
	require_once('../../model/DataBase.php');

	/* GET data */
	$id = $_GET["id"];

	/* Send query to DataBase */
	$answer = array();

	/* Charset */
	mysqli_set_charset($mysqli, "utf8");

	/* Form data */
	if ($id == null) {
		$query = "SELECT * FROM `_users`";
	} else {
		$query = "SELECT * FROM `_users` WHERE `id_user` = '$id'";
	}

	$result = mysqli_query($mysqli, $query);
	while ($data = mysqli_fetch_assoc($result)) {
		array_push($answer, $data);
	}

	/* Return answer */
	echo json_encode(array('data' => $answer));