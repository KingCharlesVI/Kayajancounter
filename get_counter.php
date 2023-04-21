<?php
// Connect to the database
$mysqli = new mysqli('127.0.0.1:3306', 'admin', 'Kayajancounter69', 'kayajancounuter');

// Query the database for the current counter value
$result = $mysqli->query("SELECT value FROM counter WHERE name='main'");

// Fetch the result and return the value
$row = $result->fetch_assoc();
echo $row['value'];

// Close the database connection
$mysqli->close();
?>