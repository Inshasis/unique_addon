// Copyright (c) 2023, InshaSiS Technologies and contributors
// For license information, please see license.txt

frappe.ui.form.on('Item Category', {
	item_category(frm) {
		let item_category_abb =  cur_frm.doc.item_category.split(' ').map(word => word.charAt(0)).join('');
		cur_frm.set_value("abbr",item_category_abb);
	},
// 	refresh(frm) {
// 	    if(cur_frm.doc.item_category){
// 	        let item_category_abb =  cur_frm.doc.item_category.split(' ').map(word => word.charAt(0)).join('');
// 		    cur_frm.set_value("abbr",item_category_abb);
// 	    }
// 	}
});



frappe.ui.form.on('Item Category', {
    abbr(frm) {
		frappe.db.get_list('Item Category',{ 
        fields:['abbr'], 
        filters:{ 
            'abbr':frm.doc.abbr 
        } 
        }).then(function(doc){ 
            if(doc[0].abbr === cur_frm.doc.abbr){
                var msg_content="<b style='color:red;'>" +`${cur_frm.doc.abbr}`+"</b>";
                frappe.throw("Already Use " + "<b>"+`${msg_content}`+"</b>" +" Abbreviation");
                
            }
            
            
        });
	}
	
});