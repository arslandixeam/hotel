import frappe
from frappe.utils import get_link_to_form

@frappe.whitelist()
def truncate():
    return frappe.db

@frappe.whitelist()
def create_hotel(name):
    doc=frappe.get_doc('Travelport Hotels',name)
    if frappe.db.exists({'doctype': 'Halal Hotel List','tp_vendor_code':doc.vendor_code,'tp_vendor_id':doc.vendor_location_id,'hotel_code':doc.hotel_code}):
        hotel=frappe.get_doc('Halal Hotel List',{'tp_vendor_code': doc.vendor_code,'tp_vendor_id': doc.vendor_location_id,'hotel_code':doc.hotel_code,})
        link_to_form = get_link_to_form("Halal Hotel List", hotel.name)
        frappe.throw(f' Halal Hotel List: {link_to_form} already Imported')

    new_doc = frappe.get_doc({
    'doctype':'Halal Hotel List',
    'tp_vendor_code': doc.vendor_code,
    'tp_vendor_id': doc.vendor_location_id,
    'hotel_code':doc.hotel_code,
    })
    new_doc.insert()
    doc.db_set('status','Imported')
    doc.save()
    if new_doc:
        return 1
