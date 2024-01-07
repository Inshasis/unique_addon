// Copyright (c) 2023, InshaSiS Technologies and contributors
// For license information, please see license.txt

//Create variant
frappe.ui.form.on('Quotation',"custom_create_variant_2",function(frm) {
    let d = new frappe.ui.Dialog({
        title: 'Enter details',
        fields: [
            {
                label: 'Item Variant',
                fieldname: 'item_variant',
                fieldtype: 'Link',
                options: "Item",
                reqd:1,
                get_query: function () {
                    return {
                        doctype: 'Item',
                        filters: {
                            has_variants: 1,
                        },
                    };
                }
            },
            // {
            //     label: 'Item Name',
            //     fieldname: 'item_name',
            //     fieldtype: 'Data',
            //     default: d.get_value('item_varient')
            // },
            {
                label: 'Available Items',
                fieldname: 'available_items',
                fieldtype: 'Link',
                options: "Item",
                get_query: function () {
                    return {
                        doctype: 'Item',
                        filters: {
                            docstatus: "Varient",
                            variant_of:d.get_value('item_variant')
                        },
                    };
                }
            },
            {
                label: 'Dimension',
                fieldname: 'dimension',
                fieldtype: 'Data',
                reqd:0
            },
            {
                label: 'Capacity',
                fieldname: 'volume',
                fieldtype: 'Data',
                reqd:0
            },
            {
                label: 'Power',
                fieldname: 'power',
                fieldtype: 'Select',
                options:["","Electric","Gas","Coal","Electric and Gas","Gas and Coal","Electric Gas and Coal"]
            }
        ],
        primary_action_label: 'Submit',
        primary_action(values) {
            frappe.call({
                method:"create_varient",
                args:{
                    item:values.item_variant,
                    dimension:values.dimension,
                    volume:values.volume,
                    power: values.power
                },
                callback: function(r){
                    frappe.msgprint("Updated");
                }
            });
            d.hide();
        }
    });
    
    d.show();
});


//Enable Expired

frappe.ui.form.on('Quotation', {
	refresh(frm) {
		frm.add_custom_button(
						__("Sales Order"),
						() => make_sales_order(),
						__("Create")
		);
		
		function make_sales_order() {

		let has_alternative_item = frm.doc.items.some((item) => item.is_alternative);
		if (has_alternative_item) {
			show_alternative_items_dialog();
		} else {
			frappe.model.open_mapped_doc({
				method: "erpnext.selling.doctype.quotation.quotation.make_sales_order",
				frm: frm
			});
		}
	}
	
}
})
    
