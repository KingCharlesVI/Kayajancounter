$(document).ready(function(){
	// When the button is clicked, increment the counter and update the database
	$('#incrementButton').on('click', function() {
		$.ajax({
			type: "POST",
			url: "increment_counter.php",
			success: function(response){
				$('#counter').text(response);
			}
		});
	});
	
	// Load the current counter value from the server and display it
	$.ajax({
		type: "GET",
		url: "get_counter.php",
		success: function(response){
			$('#counter').text(response);
		}
	});
});