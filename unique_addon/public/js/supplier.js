// Copyright (c) 2023, InshaSiS Technologies and contributors
// For license information, please see license.txt

frappe.ui.form.on('Supplier', {
    custom_supplier_category:function(frm) {
        if (! frm.doc.custom_supplier_category) return;
        frappe.call({
            method:"unique_addon.unique_addon.doctype.supplier.fetch_supplier_category",
            args:{
                supplier_category:frm.doc.custom_supplier_category,
            },
            callback:function(r){
                console.log(r);
                if (r.message) {
                    cur_frm.set_query("custom_supplier_sub_category", function(doc) {
                        return{
                            filters: [
                                ['Supplier Sub Category', 'name', 'in' , r.message]
                            ]
                        };
                    });  
                       
                }
            }
           
        });
    }
});
