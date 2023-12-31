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


def validate(doc,method):
     if doc.custom_supplier_contact:
        for d in frappe.get_all('Contact Company', {'company': doc.name}, ['name']):
            if d.name:
                frappe.db.delete('Contact Company', d.name)

        for con in doc.custom_supplier_contact:
            cont = frappe.get_doc('Contact',con.supplier_contact)
            add_on_entry_child = cont.append('custom_contact_company',{})
            add_on_entry_child.company = doc.name
            add_on_entry_child.designation = con.supplier_designation
            cont.save()


    # if doc.custom_supplier_contact:
    #     for con in doc.custom_supplier_contact:
    #         if con.supplier_contact:
    #             cont = frappe.get_doc('Contact',con.supplier_contact)
    #             add_on_entry_child = cont.append('custom_contact_company',{})
    #             add_on_entry_child.company = doc.name
    #             add_on_entry_child.designation = con.supplier_designation
    #             cont.save()
