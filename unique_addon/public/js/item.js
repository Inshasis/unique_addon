// Copyright (c) 2023, InshaSiS Technologies and contributors
// For license information, please see license.txt

frappe.ui.form.on('Item', {
    refresh: function(frm) {
        frm.set_df_property('item_code',  'hidden', 1);
        frm.set_df_property('naming_series','hidden', 1);
        
        if(frm.is_new() && cur_frm.doc.variant_of){
            frappe.db.get_list('Item',{ 
            fields:['custom_item_category_1','custom_dimension','custom_capacity','custom_power'], 
            filters:{ 
                'name':frm.doc.variant_of 
            } 
            }).then(function(doc){ 
                console.log(doc); 
                cur_frm.set_value("custom_item_category_1",doc[0].custom_item_category_1); 
                cur_frm.set_value("custom_dimension",doc[0].custom_dimension); 
                cur_frm.set_value("custom_capacity",doc[0].custom_capacity);
                cur_frm.set_value("custom_power",doc[0].custom_power); 
    
            });
        }
    },
    onload: function(frm) {
        frm.set_df_property('item_code',  'hidden', 1);
        frm.set_df_property('naming_series','hidden', 1);
        if(frm.is_new()){
            cur_frm.set_value('naming_series','{item_code}');
        }
    },
    setup: function(frm) {
        frm.set_df_property('item_code',  'hidden', 1);
        frm.set_df_property('naming_series','hidden', 1);
        if(frm.is_new()){
            cur_frm.set_value('naming_series','{item_code}');
        }
        
    },
    
    validate: function(frm) {
        frappe.db.get_list('Item',{ 
        fields:['item_code'], 
        filters:{ 
            'name':frm.doc.item_code 
        } 
        }).then(function(doc){ 
            console.log(doc);
            if(doc[0].item_code){
                 cur_frm.set_value('naming_series','{item_code}.-.#');
            }
            else{
                cur_frm.set_value('naming_series','{item_code}');
            }

        });
    },
    
    item_code: function(frm) {
        frappe.db.get_list('Item',{ 
        fields:['item_code'], 
        filters:{ 
            'name':frm.doc.item_code 
        } 
        }).then(function(doc){ 
            console.log(doc);
            if(doc[0].item_code){
                 cur_frm.set_value('naming_series','{item_code}.-.#');
            }
            else{
                cur_frm.set_value('naming_series','{item_code}');
            }

        });
    },
    
    
	item_name: function(frm) {
	   if(cur_frm.doc.item_name && cur_frm.doc.item_group && cur_frm.doc.custom_item_category_1 && cur_frm.doc.custom_capacity){
	        let item_group =  cur_frm.doc.item_group.split(' ').map(word => word.charAt(0)).join('');
            let item_category = cur_frm.doc.custom_item_category_abbr;
            let item_name =  cur_frm.doc.item_name.split(' ').map(word => word.charAt(0)).join('');
            let item_name1 = item_name.split('').filter(a => a.match(/[A-Z0-9]/)).join('');
            let it_nm = item_name1.slice(0, 5);
           let item_code = item_group +"-"+item_category +"-"+ cur_frm.doc.custom_capacity +"-"+ it_nm;
            if(frm.is_new()){
                cur_frm.set_value("item_code",item_code);
                cur_frm.set_value("custom_item_display",item_code);
            }
            cur_frm.set_value("custom_item_display",item_code);
	    }
	    
	    else if(cur_frm.doc.item_name && cur_frm.doc.item_group && cur_frm.doc.custom_item_category_1){
	        let item_group =  cur_frm.doc.item_group.split(' ').map(word => word.charAt(0)).join('');
            let item_category = cur_frm.doc.custom_item_category_abbr;
            let item_name =  cur_frm.doc.item_name.split(' ').map(word => word.charAt(0)).join('');
            let item_name1 = item_name.split('').filter(a => a.match(/[A-Z0-9]/)).join('');
            let it_nm = item_name1.slice(0, 5);
           let item_code = item_group +"-"+item_category +"-"+ it_nm;
            if(frm.is_new()){
                cur_frm.set_value("item_code",item_code);
                cur_frm.set_value("custom_item_display",item_code);
            }
            cur_frm.set_value("custom_item_display",item_code);
	    }
	    
	    else if(cur_frm.doc.item_name && cur_frm.doc.item_group){
	        let item_group =  cur_frm.doc.item_group.split(' ').map(word => word.charAt(0)).join('');
            // let item_name =  cur_frm.doc.item_name.split(' ').map(word => word.charAt(0)).join('');
            let item_name =  cur_frm.doc.item_name.split(' ').map(word => word.charAt(0)).join('');
            let item_name1 = item_name.split('').filter(a => a.match(/[A-Z0-9]/)).join('');
            let it_nm = item_name1.slice(0, 5);
            let item_code = item_group +"-"+it_nm;
            
            if(frm.is_new()){
                cur_frm.set_value("item_code",item_code); 
                cur_frm.set_value("custom_item_display",item_code);
            }
            cur_frm.set_value("custom_item_display",item_code);
	    }
	    else{
            // let item_name =  cur_frm.doc.item_name.split(' ').map(word => word.charAt(0)).join('');
            let item_name =  cur_frm.doc.item_name.split(' ').map(word => word.charAt(0)).join('');
            let item_name1 = item_name.split('').filter(a => a.match(/[A-Z0-9]/)).join('');
            let it_nm = item_name1.slice(0, 5);
            if(frm.is_new()){
                cur_frm.set_value("item_code",item_code);
                cur_frm.set_value("custom_item_display",item_code);
            }
            cur_frm.set_value("custom_item_display",item_code);
	    }
        
	},
	item_group: function(frm) {
	    if(cur_frm.doc.item_name && cur_frm.doc.item_group && cur_frm.doc.custom_item_category_1 && cur_frm.doc.custom_capacity){
	        let item_group =  cur_frm.doc.item_group.split(' ').map(word => word.charAt(0)).join('');
            let item_category = cur_frm.doc.custom_item_category_abbr;
            let item_name =  cur_frm.doc.item_name.split(' ').map(word => word.charAt(0)).join('');
            let item_name1 = item_name.split('').filter(a => a.match(/[A-Z0-9]/)).join('');
            let it_nm = item_name1.slice(0, 5);
            let item_code = item_group +"-"+item_category +"-"+ cur_frm.doc.custom_capacity +"-"+ it_nm;
            
            if(frm.is_new()){
                cur_frm.set_value("item_code",item_code);
                cur_frm.set_value("custom_item_display",item_code);
            }
            cur_frm.set_value("custom_item_display",item_code);
	    }
	    else if(cur_frm.doc.item_name && cur_frm.doc.item_group && cur_frm.doc.custom_item_category_1){
	        let item_group =  cur_frm.doc.item_group.split(' ').map(word => word.charAt(0)).join('');
            let item_category = cur_frm.doc.custom_item_category_abbr;
            let item_name =  cur_frm.doc.item_name.split(' ').map(word => word.charAt(0)).join('');
            let item_name1 = item_name.split('').filter(a => a.match(/[A-Z0-9]/)).join('');
            let it_nm = item_name1.slice(0, 5);
            let item_code = item_group +"-"+item_category +"-"+ it_nm;
            
            if(frm.is_new()){
                cur_frm.set_value("item_code",item_code);
                cur_frm.set_value("custom_item_display",item_code);
            }
            cur_frm.set_value("custom_item_display",item_code);
	    }
	    else if(cur_frm.doc.item_name && cur_frm.doc.item_group){
	        let item_group =  cur_frm.doc.item_group.split(' ').map(word => word.charAt(0)).join('');
            let item_name =  cur_frm.doc.item_name.split(' ').map(word => word.charAt(0)).join('');
            let item_name1 = item_name.split('').filter(a => a.match(/[A-Z0-9]/)).join('');
            let it_nm = item_name1.slice(0, 5);
            let item_code = item_group +"-"+it_nm;
            
            if(frm.is_new()){
                cur_frm.set_value("item_code",item_code);
                cur_frm.set_value("custom_item_display",item_code);
            }
            cur_frm.set_value("custom_item_display",item_code);
	    }
	    else{
	        let item_group =  cur_frm.doc.item_group.split(' ').map(word => word.charAt(0)).join('');
	        let item_name =  cur_frm.doc.item_name.split(' ').map(word => word.charAt(0)).join('');
            let item_name1 = item_name.split('').filter(a => a.match(/[A-Z0-9]/)).join('');
            let it_nm = item_name1.slice(0, 5);
            let item_code = item_group +"-"+ it_nm;
            if(frm.is_new()){
                cur_frm.set_value("item_code",item_code);
                cur_frm.set_value("custom_item_display",item_code);
            }
            cur_frm.set_value("custom_item_display",item_code);
	        
	    }
	},
	custom_item_category_1: function(frm) {
	    if(cur_frm.doc.item_name && cur_frm.doc.item_group && cur_frm.doc.custom_item_category_1 && cur_frm.doc.custom_capacity){
	        let item_group =  cur_frm.doc.item_group.split(' ').map(word => word.charAt(0)).join('');
            let item_category = cur_frm.doc.custom_item_category_abbr;
            let item_name =  cur_frm.doc.item_name.split(' ').map(word => word.charAt(0)).join('');
            let item_name1 = item_name.split('').filter(a => a.match(/[A-Z0-9]/)).join('');
            let it_nm = item_name1.slice(0, 5);
            let item_code = item_group +"-"+item_category +"-"+ cur_frm.doc.custom_capacity +"-"+ it_nm;
            
            if(frm.is_new()){
                cur_frm.set_value("item_code",item_code);
                cur_frm.set_value("custom_item_display",item_code);
            }
            cur_frm.set_value("custom_item_display",item_code);
	    }
	    
	    else if(cur_frm.doc.item_name && cur_frm.doc.item_group && cur_frm.doc.custom_item_category_1){
	        let item_group =  cur_frm.doc.item_group.split(' ').map(word => word.charAt(0)).join('');
            let item_category = cur_frm.doc.custom_item_category_abbr;
            let item_name =  cur_frm.doc.item_name.split(' ').map(word => word.charAt(0)).join('');
            let item_name1 = item_name.split('').filter(a => a.match(/[A-Z0-9]/)).join('');
            let it_nm = item_name1.slice(0, 5);
            let item_code = item_group +"-"+item_category +"-"+ it_nm;
            
            if(frm.is_new()){
                cur_frm.set_value("item_code",item_code);
                cur_frm.set_value("custom_item_display",item_code);
            }
            cur_frm.set_value("custom_item_display",item_code);
	    } 
	    
	    else if(cur_frm.doc.item_name && cur_frm.doc.item_group){
	        let item_group =  cur_frm.doc.item_group.split(' ').map(word => word.charAt(0)).join('');
            let item_name =  cur_frm.doc.item_name.split(' ').map(word => word.charAt(0)).join('');
            let item_name1 = item_name.split('').filter(a => a.match(/[A-Z0-9]/)).join('');
            let it_nm = item_name1.slice(0, 5);
            let item_code = item_group +"-"+it_nm;
            
            if(frm.is_new()){
                cur_frm.set_value("item_code",item_code);
                cur_frm.set_value("custom_item_display",item_code);
            }
            cur_frm.set_value("custom_item_display",item_code);
	    }
	    else{
	        let item_group =  cur_frm.doc.item_group.split(' ').map(word => word.charAt(0)).join('');
            let item_category = cur_frm.doc.custom_item_category_abbr;
            let item_name =  cur_frm.doc.item_name.split(' ').map(word => word.charAt(0)).join('');
            let item_name1 = item_name.split('').filter(a => a.match(/[A-Z0-9]/)).join('');
            let it_nm = item_name1.slice(0, 5);
            let item_code = item_group +"-"+item_category +"-"+ cur_frm.doc.custom_capacity +"-"+ it_nm;
            
            if(frm.is_new()){
                cur_frm.set_value("item_code",item_code);
                cur_frm.set_value("custom_item_display",item_code);
            }
            cur_frm.set_value("custom_item_display",item_code);
	    }
	},
	custom_capacity: function(frm) {
	    if(cur_frm.doc.item_name && cur_frm.doc.item_group && cur_frm.doc.custom_item_category_1 && cur_frm.doc.custom_capacity){
	        let item_group =  cur_frm.doc.item_group.split(' ').map(word => word.charAt(0)).join('');
            let item_category = cur_frm.doc.custom_item_category_abbr;
            let item_name =  cur_frm.doc.item_name.split(' ').map(word => word.charAt(0)).join('');
            let item_name1 = item_name.split('').filter(a => a.match(/[A-Z0-9]/)).join('');
            let it_nm = item_name1.slice(0, 5);
            let item_code = item_group +"-"+item_category +"-"+ it_nm;
            
            if(frm.is_new()){
                cur_frm.set_value("item_code",item_code);
                cur_frm.set_value("custom_item_display",item_code);
            }
            cur_frm.set_value("custom_item_display",item_code);
	    }
	    
	    else if(cur_frm.doc.item_name && cur_frm.doc.item_group && cur_frm.doc.custom_item_category_1){
	        let item_group =  cur_frm.doc.item_group.split(' ').map(word => word.charAt(0)).join('');
            let item_category = cur_frm.doc.custom_item_category_abbr;
            let item_name =  cur_frm.doc.item_name.split(' ').map(word => word.charAt(0)).join('');
            let item_name1 = item_name.split('').filter(a => a.match(/[A-Z0-9]/)).join('');
            let it_nm = item_name1.slice(0, 5);
            let item_code = item_group +"-"+item_category +"-"+ it_nm;
            
            if(frm.is_new()){
                cur_frm.set_value("item_code",item_code);
                cur_frm.set_value("custom_item_display",item_code);
            }
            cur_frm.set_value("custom_item_display",item_code);
	    } 
	    
	    else if(cur_frm.doc.item_name && cur_frm.doc.item_group){
	        let item_group =  cur_frm.doc.item_group.split(' ').map(word => word.charAt(0)).join('');
            let item_name =  cur_frm.doc.item_name.split(' ').map(word => word.charAt(0)).join('');
            let item_name1 = item_name.split('').filter(a => a.match(/[A-Z0-9]/)).join('');
            let it_nm = item_name1.slice(0, 5);
            let item_code = item_group +"-"+it_nm;
            
            if(frm.is_new()){
                cur_frm.set_value("item_code",item_code);
                cur_frm.set_value("custom_item_display",item_code);
            }
            cur_frm.set_value("custom_item_display",item_code);
	    }
	    else{
	        let item_group =  cur_frm.doc.item_group.split(' ').map(word => word.charAt(0)).join('');
            let item_category = cur_frm.doc.custom_item_category_abbr;
            let item_name =  cur_frm.doc.item_name.split(' ').map(word => word.charAt(0)).join('');
            let item_name1 = item_name.split('').filter(a => a.match(/[A-Z0-9]/)).join('');
            let it_nm = item_name1.slice(0, 5);
            let item_code = item_group +"-"+item_category +"-"+ cur_frm.doc.custom_capacity +"-"+ it_nm;
            
            if(frm.is_new()){
                cur_frm.set_value("item_code",item_code);
                cur_frm.set_value("custom_item_display",item_code);
            }
            cur_frm.set_value("custom_item_display",item_code);
	    }
	}
	
});


//Category Filter

frappe.ui.form.on('Item', {
	item_group: function(frm){
		frm.set_query("item_category", function(){
		    return {
		        "filters": {
		            "item_group_": frm.doc.item_group
		        }
		    };
		});
	}
});

