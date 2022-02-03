frappe.listview_settings["Flight booking details"] = {
	
	onload: function(doclist) {
		const action = () => {
			const selected_docs = doclist.get_checked_items();
      // Selected Documents
			for (let doc of selected_docs) {
				console.log(doc.name);
			}
	
		};
		doclist.page.add_actions_menu_item(__('Send Mail'), action, false);
	},
	button: {
    show(doc) {
      return true;
    },
    get_label() {
      return __("Show Details");
    },
    get_description(doc) {
      return "Print {0}", [doc];
    },
    action(doc) {
      // Route to the Default Print Format
      //window.open();
      frappe.set_route('printview','Flight booking details',doc.name);
    },
  },
};