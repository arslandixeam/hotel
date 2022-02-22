frappe.listview_settings["Travelport Hotels"] = {
  add_fields: ["Status"],
  get_indicator: function (doc) {
    var colors = {
      Imported: "green",
      "Not Imported": "orange",
    };
    return [__(doc.status), colors[doc.status], "status,=," + doc.status];
  },
  onload: function (doclist) {
    console.log("working");
    const action = () => {
      const selected_docs = doclist.get_checked_items();
      // Selected Documents
      for (let doc of selected_docs) {
        console.log(doc.name);
      }
    };
    doclist.page.add_actions_menu_item(__("Send Mail"), action, false);
  },
  button: {
    show(doc) {
      return true;
    },
    get_label() {
      return __("Import");
    },
    get_description(doc) {
      return "Print {0}", [doc];
    },
    action(doc) {
      // console.log(doc);
      frappe.call({
        method: "hotel.api.create_hotel",
        args: {
          name: doc.name,
        },
        callback: (r) => {
          if (r.message == 1) {
            frappe.show_alert(
              {
                message: __("Hotel is Imported Successfully"),
                indicator: "green",
              },
              5
            );
            cur_list.refresh();
          }
        },
        error: (r) => {
          // on error
        },
      });
    },
  },
};
