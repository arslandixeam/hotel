frappe.listview_settings["Flight booking details"] = {
  onload: function (doclist) {
    const action = () => {
      const selected_docs = doclist.get_checked_items();
      // Selected Documents
      for (let doc of selected_docs) {
        console.log(doc.name);
      }
    };
    doclist.page.add_actions_menu_item(__("Send Mail 2"), action, false);
  },
  button: {
    show(doc) {
      return true;
    },
    get_label() {
      return __("Actions");
    },
    get_description(doc) {
      return "Print {0}", [doc];
    },
    action(doc) {
      var dialog = new frappe.ui.Dialog({
        title: __("Select action for flight no: " + doc.name),
        fields: [
          { "fieldtype": "Button", "label": __("Send Details to Customer"), "fieldname": "send_email" },
          { "fieldtype": "Column Break", "label": __(""), "fieldname": "column" },
          { "fieldtype": "Button", "label": __("View Details"), "fieldname": "print_details" }
        ]
      });

      dialog.fields_dict.send_email.input.onclick = function () {
        send_email(doc);
        dialog.hide();
      }


      dialog.fields_dict.print_details.input.onclick = function () {
        render_page("/printview?", doc)
        dialog.hide();
      }

      dialog.show();
    },
  },
};

const render_page = (method, doc) => {
  let w = window.open(
    frappe.urllib.get_full_url(
      method +
      'doctype=' +
      encodeURIComponent(cur_list.doctype) +
      '&name=' +
      encodeURIComponent(doc.name) +
      '&format=Flight Booking Details' +
      '&no_letterhead=1' +
      '&_lang=eng'
    )
  );
  if (!w) {
    frappe.msgprint(__('Please enable pop-ups'));
    return;
  }
}


const send_email = (doc) => {
  frappe.show_alert("Email Intialized.")
  frappe.call({
    method: "frappe.core.doctype.communication.email.make",
    args: {
      recipients: doc.email,
      subject: "Flight booking details: " + doc.name,
      content: '<div class="ql-editor read-mode"><p><br></p></div>',
      doctype: "Flight booking details",
      name: doc.name,
      send_email: 1,
      print_html: "",
      send_me_a_copy: 0,
      print_format: "Flight Booking Details",
      attachments: [],
      _lang: "en - US",
      read_receipt: 0,
      print_letterhead: 1,
    },
    callback() {
      frappe.show_alert("Email sent successfully.")
    },

  })
}