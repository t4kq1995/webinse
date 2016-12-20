$(document).ready(function() {
	/*** Globals ***/
	var USER_ID = undefined;
	var BUTTON_STATUS = 'save';
	var COLLAPSE_STATUS = 'hide';

	/*** Routing ***/
	var routing = {
		loadinfo: 'controller/Database/LoadInfo.php',
		deleteinfo: 'controller/Database/DeleteInfo.php',
		addinfo: 'controller/Database/AddInfo.php',
		editinfo: 'controller/Database/EditInfo.php'
	};

	/*** Rules ***/
	var firstNameRule = {
		required: {
			message: 'Field is required'
		},
		max: {
			max: 30,
			message: 'You need to put less than 30 symbols'
		}
	};

	var secondNameRule = {
		required: {
			message: 'Field is required'
		},
		max: {
			max: 30,
			message: 'You need to put less than 30 symbols'
		}
	};

	var emailRule = {
		required: {
			message: 'Field is required'
		},
		email: {
			message: 'Email is not a valid email address'
		}
	};

	/****************** Helpfull functions ******************/
	/*** Notification ***/
	var notifyMe = function(message, status) {
		$.notify(message, status);
	}

	/*** Add error ***/
	var addError = function(id, error) {
		var input = $(id).parent();
		var span = undefined;

		if (input.has('span').length != 0)	 {
			span = input.find('span');
		} else {
			span = $('<span/>', {
				'class': 'help-block'
			});
		}

		span.empty().append(error);

		if (input.hasClass('has-success')) {
			input.removeClass('has-success');
			input.addClass('has-error');
		} else if (!input.hasClass('has-error')) {
			input.addClass('has-error');
		}

		input.append(span);
	}

	/*** Add success ***/
	var addSuccess = function(id) {
		var input = $(id).parent();
		var span = undefined;

		if (input.has('span').length != 0)	 {
			span = input.find('span');
		} else {
			span = $('<span/>', {
				'class': 'help-block'
			});
		}

		span.empty().append('Success');

		if (input.hasClass('has-error')) {
			input.removeClass('has-error');
			input.addClass('has-success');
		} else if (!input.hasClass('has-success')) {
			input.addClass('has-success');
		}

		input.append(span);
	}

	/*** Validate ***/
	var validate = function(data) {
		var approved = true;

		/* First name validate */
		var firstNameResult = approve.value(data.first_name, firstNameRule);
		if (!firstNameResult.approved) {
			addError('#first_name', firstNameResult.errors[0]);
			approved = false;
		} else {
			addSuccess('#first_name');
		}

		/* Second name validate */
		var secondNameResult = approve.value(data.second_name, secondNameRule);
		if (!secondNameResult.approved) {
			addError('#second_name', secondNameResult.errors[0]);
			approved = false;
		} else {
			addSuccess('#second_name');
		}

		/* Email validate */
		var emailResult = approve.value(data.email, emailRule);
		if (!emailResult.approved) {
			addError('#email', emailResult.errors[0]);
			approved = false;
		} else {
			addSuccess('#email');
		}

		return approved;
	}

	/* Load data from database */
	var loadData = function(id) {
		return $.ajax({
  			type: "GET",
  			url: routing.loadinfo,
  			data: {
  				id: id
  			}
		});
	}

	/****************** Get data by ready state ******************/
	var data = loadData(undefined);

	/* Database identificator */
	var database = $('#database');

	var dataEmpty = function() {
		var tr = $('<tr/>');
		var td = $('<td/>', {
			'colspan': '3',
			'class': 'text-center'
		});
		td.append('Database is empty');
		tr.append(td);
		database.append(tr);

		/* Remove hover effect */
		$('table').removeClass('table-hover');
	}

	data.success(function(data){
		var dataLength = data.data.length;
		var columns = ['id_user', 'first_name', 'second_name', 'email'];

		if (dataLength > 0) {
			/* Add hover effect */
			$('table').addClass('table-hover');

			/* Loop for data */
			for (var i = 0; i < dataLength; i++) {
				var tr = $('<tr/>', {
					'data-id': data.data[i][columns[0]]
				});
				for (var j = 1; j < columns.length; j++) {
					var td = $('<td/>');
					td.append(data.data[i][columns[j]]);
					tr.append(td);
				}
				database.append(tr);
			}

		} else {
			/* DataBase is empty */
			dataEmpty();
		}

	});

	data.error(function(data){
		notifyMe('Error load data', 'error');
	});

	/****************** Show buttons by click ******************/
	var showButtons = function(state) {
		var edit = $('#edit');
		var del = $('#delete');

		if (state) {
			edit.removeClass('covert');
			del.removeClass('covert');
		} else {
			edit.addClass('covert');
			del.addClass('covert');
		}
	}

	$('tbody').delegate('tr', 'click', function(event) {
		if ($('table').hasClass('table-hover')) {
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				showButtons(false);
				USER_ID = undefined;
			} else {
				$('tbody > tr').each(function(event){
					if ($(this).hasClass('active')) {
						$(this).removeClass('active');
					}
				});
				$(this).addClass('active');
				showButtons(true);
				USER_ID = $(this).attr('data-id');
			}
		}
	});

	/****************** Actions ******************/

	/*** Collapse status ***/
	var changeCollapseStatus = function() {
		switch (COLLAPSE_STATUS) {
			case 'hide':
				COLLAPSE_STATUS = 'show';
				break;

			case 'show':
				COLLAPSE_STATUS = 'hide';
				break;

			default:
				break;
		}

		$('#collapseForm').collapse(COLLAPSE_STATUS);
	}

	/*** Add ***/
	var addData = function(data) {
		return $.ajax({
  			type: "POST",
  			url: routing.addinfo,
  			data: {
  				'first_name': data.first_name,
  				'second_name': data.second_name,
  				'email': data.email
  			}
		});
	}

	$('#add').bind('click', function(event) {
		event.preventDefault();
		BUTTON_STATUS = 'save';
		changeCollapseStatus();
	});

	/*** Edit ***/
	var editData = function(data) {
		return $.ajax({
  			type: "POST",
  			url: routing.editinfo,
  			data: {
  				'id': USER_ID,
  				'first_name': data.first_name,
  				'second_name': data.second_name,
  				'email': data.email
  			}
		});
	}

	$('#edit').click(function(event) {
		event.preventDefault();
		BUTTON_STATUS = 'edit';
		changeCollapseStatus();
	});

	/*** Delete ***/
	var deleteData = function() {
		return $.ajax({
  			type: "POST",
  			url: routing.deleteinfo,
  			data: {
  				'id': USER_ID
  			}
		});
	}

	$('#delete').click(function(event) {
		event.preventDefault();
		if (USER_ID != undefined) {
			answer = deleteData();

			answer.success(function(data) {
				$('tbody').find('tr[data-id = ' + USER_ID + ']').remove();
				showButtons(false);
				USER_ID = undefined;

				if ($('tbody').find('tr').length == 0) {
					dataEmpty();
				}

				notifyMe('Success', 'success');
			});

			answer.error(function(data) {
				notifyMe('Error delete data', 'error');
			});
		}
	});

	var removeValidation = function(mass) {
		mass.first_name.parent().removeClass('has-success');
		mass.first_name.parent().find('span').remove();

		mass.second_name.parent().removeClass('has-success');
		mass.second_name.parent().find('span').remove();

		mass.email.parent().removeClass('has-success');
		mass.email.parent().find('span').remove();
	}

	/*** Switch case to button status ***/
	var parseData = function(mass) {

		switch (BUTTON_STATUS) {
  			case 'save':
  				/* Button change */
  				mass.button.text('Save');

  				/* Remove class success */
  				removeValidation(mass);

  				/* Empty values */
  				mass.first_name.val('');
  				mass.second_name.val('');
  				mass.email.val('');

  				break;

  			case 'edit':
  				/* Button change */
  				mass.button.text('Edit');

  				/* Remove class success */
  				removeValidation(mass);

  				/* Values from database */
  				var answer = loadData(USER_ID);

  				answer.success(function(data) {
  					mass.first_name.val(data.data[0].first_name);
  					mass.second_name.val(data.data[0].second_name);
  					mass.email.val(data.data[0].email);
  				});

  				answer.error(function(data) {
  					notifyMe('Error load data', 'error');
  				});

  				break;

  			default:
  				break;
  		}
	}

	/*** Save state ***/
	var saveState = function(data) {
		/* Validate */
		if (validate({first_name: data.first_name.val(), second_name: data.second_name.val(), email: data.email.val()})) {
			/* Send data */
			answer = addData({
				first_name: data.first_name.val(),
				second_name: data.second_name.val(),
				email: data.email.val()
			});

			answer.success(function(answer) {
				if (database.find('td:first').text() == 'Database is empty') {
					database.empty();
					$('table').addClass('table-hover');
				}

				var tr = $('<tr/>', {
					'data-id': answer.data
				});

				var td = $('<td/>');
				td.append(data.first_name.val());
				tr.append(td);

				td = $('<td/>');
				td.append(data.second_name.val());
				tr.append(td);

				td = $('<td/>');
				td.append(data.email.val());
				tr.append(td);

				database.append(tr);

				COLLAPSE_STATUS = 'hide';
				$('#collapseForm').collapse(COLLAPSE_STATUS);

				notifyMe('Success', 'success');
			});

			answer.error(function(data) {
				notifyMe('Error add data', 'error');
			});
		}
	}

	/*** Edit state ***/
	var editState = function(data) {
		/* Validate */
		if (validate({first_name: data.first_name.val(), second_name: data.second_name.val(), email: data.email.val()})) {
			/* Send data */
			var answer = editData({
				first_name: data.first_name.val(),
				second_name: data.second_name.val(),
				email: data.email.val()
			});

			answer.success(function(answer) {
				var tr = $('tr[data-id=' + USER_ID + ']');
				tr.find('td:nth-child(1)').text(data.first_name.val());
				tr.find('td:nth-child(2)').text(data.second_name.val());
				tr.find('td:nth-child(3)').text(data.email.val());

				COLLAPSE_STATUS = 'hide';
				$('#collapseForm').collapse(COLLAPSE_STATUS);

				notifyMe('Success', 'success');
			});

			answer.error(function(data) {
				notifyMe('Error edit data', 'error');
			});
		}
	}

	/*** Button event ***/
	var buttonEvent = function(data) {
		data.button.click(function(event) {
  			event.preventDefault();

  			switch (BUTTON_STATUS) {
  				case 'save':
  					saveState(data);
  					break;

  				case 'edit':
  					editState(data);
  					break;

  				default:
  					break;
  			}
  		});
	}

	/*** Collapse form events ***/
	$('#collapseForm').on('hide.bs.collapse', function (e) {
		$('#submit').unbind('click');
	});

	$('#collapseForm').on('show.bs.collapse', function (e) {
		var data = {
			first_name: $('#first_name'),
  			second_name: $('#second_name'),
  			email: $('#email'),
  			button:  $('#submit')
		}

		/* Parse data */
  		parseData(data);

  		/* Button event */
  		buttonEvent(data);
	});

});