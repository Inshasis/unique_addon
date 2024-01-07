// Copyright (c) 2023, InshaSiS Technologies and contributors
// For license information, please see license.txt

// frappe.ui.form.on('Industry Sub Category', {
//     industry: function(frm) {
//         if (! frm.doc.industry) return;
//         frappe.call({
//             method:"industry_category",
//             args:{
//                 industry:frm.doc.industry,
//             },
//             callback:function(r){
//                 console.log(r);
//                 if (r.message) {
//                     cur_frm.set_query("industry_sub_category", function(doc) {
//                         return{
//                             filters: [
//                                 ['', 'name', 'in' , r.message]
//                             ]
//                         };
//                     });  
                       
//                 }
//             }
           
//         });
//     }
// });