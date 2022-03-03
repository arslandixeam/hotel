// Copyright (c) 2022, Arslan sheikh and contributors
// For license information, please see license.txt

frappe.ui.form.on("Flight booking details", {
  validate: function (frm) {
    if (frm.doc.xml_response) {
      let obj = JSON.parse(frm.doc.xml_response);
      let segments = obj.book_data.Segments;
      let app_reference = frm.doc.app_reference;
      frm.doc.items = [];
      for (let row of segments) {
        console.log(row);
        let tk_no = row.Carrier + "-" + row.FlightNumber;
        var origin = row.Origin;
        var destination = row.Destination;
        let dp_time = new Date(row.DepartureTime);
        let arv_time = new Date(row.ArrivalTime);
        let airline = row["air:CodeshareInfo"]["_content"];
        let cabin = row.ClassOfService;

        frappe.db
          .get_value(
            "Flight Airport list",
            { airport_code: origin },
            "airport_name"
          )
          .then((r) => {
            if (r.message.airport_name) {
              var origin_ap = r.message.airport_name;
            }

            frappe.db
              .get_value(
                "Flight Airport list",
                { airport_code: destination },
                "airport_name"
              )
              .then((r) => {
                if (r.message.airport_name) {
                  var destination_ap = r.message.airport_name;
                }

                let itm = frm.add_child("items", {
                  airline: airline,
                  cabin: cabin,
                  airline_code: row.Carrier,
                  tk_no: tk_no,
                  departing_airport: origin_ap + "(" + origin + ")",
                  departing_time: dp_time,
                  ariving_airport: destination_ap + "(" + destination + ")",
                  ariving_time: arv_time,
                });
              });
          });
      }
    }
    if (frm.doc.attributes) {
      frm.doc.passengers = [];
      let obj = JSON.parse(frm.doc.attributes);
      for (let row of obj) {
        let itm = frm.add_child("passengers", {
          first_name: row.first_name,
          last_name: row.last_name,
          email: row.email,
          phone_code: row.phone_code,
          phone: row.phone,
          phone_number: row.phone_code + " " + row.phone,
          is_lead: row.is_lead,
          address: row.address,
          address_1: row.address1,
          country: row.country,
          passenger_type: row.passenger_type,
          gender: row.gender,
          dob: row.date_of_birth,
        });
      }
    }
  },
});
