// Copyright (c) 2021, Arslan sheikh and contributors
// For license information, please see license.txt

frappe.ui.form.on('API Country List', {
	refresh: function(frm) {
		frm.add_custom_button(__('Truncate'), function(){
			console.log(frappe.db);
		});
	}
});
