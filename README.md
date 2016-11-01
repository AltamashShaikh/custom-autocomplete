# custom-autocomplete


The plugin can be used to autocomplete for 2 scenarios

1.Complete the list from server side

To initialize it 

$('#input_box').autocomplete_v1({"length": 2, 'ajax': true, 'ajax_url': 'test.php'});

2.To give a search hint,eg search for keyword bob in subject,body and etc

To initialize it 

	$('#input_box').autocomplete_v1({"length": 2, 'ajax': false, "in": {"customer_id": "Customer ID", "customer_fullname": "Customer Name"}});

The plugin can be highly customizable as on select of element from list or before and after the ajax request is made 

You need to add the following method to act as a callback on select of element

	function add_hidden_options(dis,form){
	/*
	do whaterver you wanna do 
	dis variable will hold the info about the clicked or selected element and form will hold the info about the form in which the input is placed
	*/

	}

For ajax requests we can configure it before and after the request is made.

for pre-ajax request or to pass data in ajax request
pass ajax_data as true
eg
	$('#input_box').autocomplete_v1({"length": 2, 'ajax': true, 'ajax_url': 'test.php, 'ajax_data': true'});

To pass the data create the following method and return the data u want pass

	function autocomplete_get_ajax_data(dis, value) {
	/* 
	dis hold the info about the input on which custom autocomplete is initialized
	and value holds the current value entered on the input
	*/
		return {'search': value};
	}

After the ajax request is complete you need to make the li's and return it as a string,this gives you full control on how the li's should be made,however following classes should be present in each li 'list-group-item list-group-ae-item value_in cursor_hand autocomplete_li'

To make the li's after the ajax request is completed create the following method and return the list as string

		function call_auto_complete_ajax(value) {
						return '<li class="list-group-item list-group-ae-item value_in cursor_hand autocomplete_li" data-value="'+value+'">'+value+'</li>';
					}
					
And finally add the following method to capture the selected element from the list which is created

	function add_hidden_options(dis,form){
	/*
	do whaterver you wanna do 
	dis variable will hold the info about the clicked or selected element and form will hold the info about the form in which the input is placed
	*/

	}
            





