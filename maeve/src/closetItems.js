// import React, {useState,useEffect} from "react";
// import Papa from 'papaparse';

// function ClosetItems({items}){
//     const categories=['tops','bottoms','shoes','dresses'];
//     const [activeCategory, setActiveCategory]=useState(categories[0]);
//     const [filteredItems, setFilteredItems]=useState(items);

//     useEffect(()=>{
//         const filtered=items.filter(item=>item.categories ===activeCategory);
//         setFilteredItems(filtered);
//     }, [activeCategory,items]);

//     const handleCategoryClick=(category)=>{
//         setActiveCategory(categories);
//     };

//     return(
//         <div>
//             <h2>
//                 closet
//             </h2>
//             <div>

//             </div>
//         </div>
//     )
// }
