# custom-autocomplete


The plugin can be used to autocomplete for 2 scenarios

1.Complete the list from server side

To initialize it 

$('#input_box').autocomplete_v1({"length": 2, 'ajax': true, 'ajax_url': 'test.php'});

2.To give a search hint,eg search for keyword bob in subject,body and etc

To initialize it 

$('#input_box').autocomplete_v1({"length": 2, 'ajax': false, "in": {"customer_id": "Customer ID", "customer_fullname": "Customer Name"}});
