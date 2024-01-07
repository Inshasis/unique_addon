// Copyright (c) 2023, InshaSiS Technologies and contributors
// For license information, please see license.txt

//Idustry Category Filter
frappe.ui.form.on('Customer', {
	custom_industry_type: function(frm){
		frm.set_query("custom_industry_category", function(){
		    return {
		        "filters": {
		            "industry": frm.doc.custom_industry_type
		        }
		    };
		});
	},
	custom_industry_category: function(frm){
		frm.set_query("custom_industry_sub_category", function(){
		    return {
		        "filters": {
		            "industry_category": frm.doc.custom_industry_category
		        }
		    };
		});
	}
});