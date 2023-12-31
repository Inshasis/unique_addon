# Copyright (c) 2023, InshaSiS Technologies and contributors
# For license information, please see license.txt

import frappe

def validate(doc,method):
    if doc.custom_contact_list:
        for d in frappe.get_all('Contact Company', {'company': doc.name}, ['name']):
            if d.name:
                frappe.db.delete('Contact Company', d.name)

        for con in doc.custom_contact_list:
            cont = frappe.get_doc('Contact',con.contact)
            add_on_entry_child = cont.append('custom_contact_company',{})
            add_on_entry_child.company = doc.name
            add_on_entry_child.designation = con.designation
            cont.save()


            # check_cust = frappe.db.get_list('Contact Company', {'company':doc.name}, ['name'])
            # for d in frappe.get_all('Contact Company', {'company': doc.name}, ['name']):
            #     frappe.msgprint(str(d.name))
            # if check_cust:
            #     cc_name = frappe.db.get_value('Contact Company', {'parent':con.contact}, ['name'])
            #     if cc_name:
            #         frappe.db.delete('Contact Company', cc_name)
            #         if con.contact:
            #             cont = frappe.get_doc('Contact',con.contact)
            #             add_on_entry_child = cont.append('custom_contact_company',{})
            #             add_on_entry_child.company = doc.name
            #             add_on_entry_child.designation = con.designation
            #             cont.save()

            

                
                
                    # for d in frappe.get_all('Contact Company', {'company': doc.name}, ['name']):
                    
                    # cont = frappe.get_doc('Contact',con.contact)
                    # cont.append("custom_contact_company",{
                    #     'company':doc.name,
                    #     'designation':con.designation
                    # })
                    # cont.save()