# Copyright (c) 2023, InshaSiS Technologies and contributors
# For license information, please see license.txt

import frappe


# Supplier Category Wise Sub Category Filter
@frappe.whitelist()
def fetch_supplier_category(supplier_category):
  industry = []  
  raw_ind = frappe.db.sql("select name from `tabSupplier Sub Category` where supplier_category = %s", supplier_category)
  for ind in raw_ind:
       industry.append(ind[0])
  return industry
