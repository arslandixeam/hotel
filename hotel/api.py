import frappe

@frappe.whitelist()
def truncate():
	return frappe.db