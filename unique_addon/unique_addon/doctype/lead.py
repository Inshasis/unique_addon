# Copyright (c) 2023, InshaSiS Technologies and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class IndustrySubCategory(Document):
	pass


# Industry Wise Category Filter
@frappe.whitelist()
def fetch_industry(industry_arg):
  industry = []  
  raw_ind = frappe.db.sql("select name from `tabIndustry Category` where industry = %s", industry_arg)
  for ind in raw_ind:
       industry.append(ind[0])
  return industry


# Industry Wise Sub Category Filter
@frappe.whitelist()
def fetch_industry_sub(sub_industry):
  industry = []  
  raw_ind = frappe.db.sql("select name from `tabIndustry Sub Category` where industry_category = %s", sub_industry)
  for ind in raw_ind:
       industry.append(ind[0])
  return industry
