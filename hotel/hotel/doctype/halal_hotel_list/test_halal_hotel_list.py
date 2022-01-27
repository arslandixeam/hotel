# Copyright (c) 2021, Arslan sheikh and Contributors
# See license.txt

import frappe
import unittest

class TestHalalHotelList(unittest.TestCase):
	def truncate_test(self):
		frappe.set_user("Administrator")
		frappe.db.truncate('Halal Hotel List')

