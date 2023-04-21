<?php
// Connect to the database
$mysqli = new mysqli('127.0.0.1:3306', 'admin', 'Kayajancounter69', 'kayajancounter');

// Start a transaction to ensure consistency
$mysqli->begin_transaction();

// Query the database for the current counter value and increment it
$result = $mysqli->query("SELECT value FROM counter WHERE name='main' FOR UPDATE");
$row = $result->fetch_assoc();
$value = $row['value'] + 1;
$mysqli->query("UPDATE counter SET value=$value WHERE name='main'");

// Commit the transaction and return the new counter value
$mysqli->commit();
echo $value;

// Close the database connection
$mysqli->close();
?>