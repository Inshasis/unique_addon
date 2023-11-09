// Copyright (c) 2023, InshaSiS Technologies and contributors
// For license information, please see license.txt

frappe.ui.form.on('Industry Sub Category', {
    industry:function(frm) {
        frm.trigger("industry_filter");
    },
    industry_filter:function(frm) {
        if (! frm.doc.industry) return;
        frappe.call({
            method:"unique_addon.unique_addon.doctype.industry_sub_category.industry_sub_category.fetch_industry",
            args:{
                industry_arg:frm.doc.industry,
            },
            callback:function(r){
                console.log(r);
                if (r.message) {
                    cur_frm.set_query("industry_category", function(doc) {
                        return{
                            filters: [
                                ['Industry Category', 'name', 'in' , r.message]
                            ]
                        };
                    });  
                       
                }
            }
           
        });
    }
});
