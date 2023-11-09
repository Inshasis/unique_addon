// Copyright (c) 2023, InshaSiS Technologies and contributors
// For license information, please see license.txt

frappe.ui.form.on('Lead', {
    custom_industry_5:function(frm) {
        if (! frm.doc.custom_industry_5) return;
        frappe.call({
            method:"unique_addon.unique_addon.doctype.lead.fetch_industry",
            args:{
                industry_arg:frm.doc.custom_industry_5,
            },
            callback:function(r){
                console.log(r);
                if (r.message) {
                    cur_frm.set_query("custom_industry_category_5", function(doc) {
                        return{
                            filters: [
                                ['Industry Category', 'name', 'in' , r.message]
                            ]
                        };
                    });  
                       
                }
            }
           
        });
    },
    custom_industry_category_5:function(frm) {
        if (! frm.doc.custom_industry_category_5) return;
        frappe.call({
            method:"unique_addon.unique_addon.doctype.lead.fetch_industry_sub",
            args:{
                sub_industry:frm.doc.custom_industry_category_5,
            },
            callback:function(r){
                console.log(r);
                if (r.message) {
                    cur_frm.set_query("custom_industry_sub_category_5", function(doc) {
                        return{
                            filters: [
                                ['Industry Sub Category', 'name', 'in' , r.message]
                            ]
                        };
                    });  
                       
                }
            }
           
        });
    }
});
