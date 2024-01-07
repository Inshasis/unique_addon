// Copyright (c) 2023, InshaSiS Technologies and contributors
// For license information, please see license.txt

frappe.ui.form.on('Delivery Note',"custom_create_variant",function(frm) {
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
                options:["Electric","Gas","Coal","Electric and Gas","Gas and Coal","Electric Gas and Coal"]
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
                    frappe.msgprint("Updated")
                }
            })
            d.hide();
        }
    });
    
    d.show();
})
