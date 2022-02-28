import frappe
from frappe.utils import get_link_to_form

@frappe.whitelist()
def truncate():
    return frappe.db

@frappe.whitelist()
def create_hotel(name):
    doc=frappe.get_doc('Travelport Hotels',name)
    if frappe.db.exists({'doctype': 'Halal Hotel List','tp_vendor_code':doc.vendor_code,'tp_vendor_id':doc.vendor_location_id,'hotel_code':doc.hotel_code}):
        hotel=frappe.get_doc('Halal Hotel List',{
            'tp_vendor_code': doc.vendor_code,
            'tp_vendor_id': doc.vendor_location_id,
            'hotel_code':doc.hotel_code,
            'latitude':doc.latitude,
            'longitude':doc.longitude,
            })
        link_to_form = get_link_to_form("Halal Hotel List", hotel.name)
        frappe.throw(f' Halal Hotel List: {link_to_form} already Imported')

    new_doc = frappe.get_doc({
    'doctype':'Halal Hotel List',
    'tp_vendor_code': doc.vendor_code,
    'tp_vendor_id': doc.vendor_location_id,
    'hotel_code':doc.hotel_code,
    'hotel_name':doc.hotel_name,
    'location_name':doc.country,
    'city':doc.city,
    'tp_city':doc.city,
    'city_code':doc.hotel_location,
    'locality':doc.country,
    'country':doc.country,
    'latitude':doc.latitude,
    'longitude':doc.longitude,
    'tp_hotel_address':doc.hotel_address,
    'tp_units':doc.units,
    'to_value':doc.value,
    'tp_direction':doc.direction,
    'tp_hotel_chain':doc.hotel_chain,
    'tp_reserve_requiremnet':doc.reserve_requirement,
    'tp_availability':doc.availability,
    'tp_reference_point':doc.reference_point,
    'tp_phones':doc.phones,
    'tp_hotel_address_1':doc.hotel_address_1,
    'tp_valid':doc.is_valid,
    })
    new_doc.insert()
    doc.db_set('status','Imported')
    doc.save()
    if new_doc:
        return 1
