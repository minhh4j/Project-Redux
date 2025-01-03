// import React, { useContext, useEffect, useState } from "react";
// import { ProductContext } from "../Context/ProductContext";
// import ProductModal from "./ProductInfoModal";
// import { useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProduct } from "../Slices/ProductSlice";
// import  { addProductToDBAndCartAsync }  from "../Slices/CartSlice";


// function Center() {
//   const { search } = useContext(ProductContext);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState("all"); 
//   const dispatch = useDispatch()
//   const {product , loading , error } = useSelector(state => state.product)

//   const filterSearch = product
//     .filter((item) =>
//       item.name.toLowerCase().includes(search.toLowerCase())
//     )
//     .filter((item) =>
//       selectedCategory === "all" ? true : item.category === selectedCategory
//     );
    
//   const handleImageClick = (product) => {
//     setSelectedProduct(product);
//   };

//   const handleCloseModal = () => {
//     setSelectedProduct(null);
//   };

//   const handleAddToCartClick = (product) => {
//     const id = localStorage.getItem('id');
//     if (!id) {
//       console.log('Please log in to add items to your cart.');
//     } else {
//       dispatch(addProductToDBAndCartAsync({ id, product }));
//       console.log(`${product.name} added to cart and database!`);
//     }
//   };
  
  
//   useEffect(() => {
//     dispatch(fetchProduct()); 
//   }, [dispatch]); 
  
  
//   // Audio setting
  
//   const cat=()=>{
//     setSelectedCategory("cat")
//     handlePlayAudio()
//   }
  
//   const audioRef = useRef(null);
  
//   const handlePlayAudio = () => {
//     if (audioRef.current) {
//       audioRef.current.play(); 
//     }
//   };
  
//   const dog = () => {
//     setSelectedCategory("dog")
//     handlePlayDog()
//   }

//   const dogreff = useRef(null);
  
//   const handlePlayDog = () => {
//     if(dogreff.current){
//       dogreff.current.play();
//     }
//   }
//   //////
  
//   if(loading){
//     return <h1>Loading...</h1>
//   }
//    if(error){
//     return <h1>error</h1>
//    }
  
//   return (
//     <div className="container py-4">
//       <h4 class="text-center text-2xl font-semibold text-gray-700"><i>"select category"</i></h4>
//       <br />
//       <br />
//     <div className="flex justify-center mb-4">
    
//   {/* All Button */}
//   <button
//     className={`flex items-center justify-center w-16 h-16 mx-2 rounded-full shadow-md hover:scale-110 hover:shadow-2xl  transition-all ${
//       selectedCategory === "all" ? "bg-blue-600" : "bg-gray-300"
//     }`}
//     onClick={() => setSelectedCategory("all")}
//   >
//     <img
//       src="https://img.freepik.com/free-photo/cat-love-being-affectionate-towards-each-other_23-2150984513.jpg?t=st=1735550783~exp=1735554383~hmac=4bd03b88f2ad1748c48520e49888de55f59cc17b567c3badda2fc780f1b80ae4&w=900" 
//       alt="All"
//       className="object-cover w-full h-full transition-all rounded-full hover:scale-110 hover:shadow-2xl"
//     />
//   </button>

//   {/* Cat Button */}
//   <button
//     className={`flex items-center justify-center w-16 h-16 mx-2 rounded-full shadow-md hover:scale-110 hover:shadow-2xl transition-all${
//       selectedCategory === "cat" ? "bg-blue-600" : "bg-gray-300"
//     }`}
//     onClick={cat}
//   >
//     <img
//       src="https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg?t=st=1735549987~exp=1735553587~hmac=c26a0ccb15950eda4dd50c45d854f1c3bed383fda8cebe3785c8c13238e7e81b&w=360" 
//       alt="Cat"
//       className="object-cover w-full h-full transition-all rounded-full hover:scale-110 hover:shadow-2xl"
//     />
//   </button>
// <audio  ref={audioRef}  src="src\assets\cat sound.wav" muted></audio>
//   {/* Dog Button */}
//   <button
//     className={`flex items-center justify-center w-16 h-16 mx-2 rounded-full shadow-md hover:scale-110 hover:shadow-2xl transition-all ${
//       selectedCategory === "dog" ? "bg-blue-600" : "bg-gray-300"
//     }`}
//     onClick={dog}
//   >
//     <img
//       src="https://img.freepik.com/free-photo/cute-spitz_144627-7076.jpg?t=st=1735550719~exp=1735554319~hmac=fab93c7f811eeb1fc23b6913c78f694c409eaa017cb7f0e51262784e9d5d7d59&w=740" 
//       alt="Dog"
//       className="object-cover w-full h-full transition-all rounded-full hover:scale-110 hover:shadow-2xl"
//     />
//   </button>
//   <audio ref={dogreff} src="src\assets\dog sound.wav" muted></audio>
// </div>


//       {/* Product Grid */}
//       <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
//         {filterSearch.map((item) => (
//           <div className="flex justify-center" key={item.id}>
//             <div className="w-40 h-full overflow-hidden transition-all duration-300 transform rounded-lg shadow-md bg-sky-300 card hover:scale-105 hover:shadow-xl">
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 onClick={() => handleImageClick(item)}
//                 style={{objectFit:"cover"}}
//               />
//               <div className="p-3 text-center">
//                 <h6 className="text-sm font-semibold">{item.name}</h6>
//                 <p className="mb-1 text-sm text-primary">₹{item.price}</p>
//                 {item.oldPrice && (
//                   <p className="text-xs text-gray-500 line-through">
//                     ₹{item.oldPrice}
//                   </p>
//                 )}
// <button
//   className="px-4 py-2 mt-2 text-xs font-semibold text-blue-600 transition border border-blue-600 rounded-full hover:bg-blue-100"
//   onClick={() => handleAddToCartClick(item)}
// >
//   Add to Cart
// </button>

//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Product Modal */}
//       {selectedProduct && (
//         <ProductModal product={selectedProduct} onClose={handleCloseModal} />
//       )}
//     </div>
//   );
// }

// export default Center;



import React, { useContext, useEffect, useState } from "react";
// import { ProductContext } from "../Context/ProductContext";
import ProductModal from "./ProductInfoModal";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../Slices/ProductSlice";
import { addProductToDBAndCartAsync } from "../Slices/CartSlice";

function Center() {
  // const { search } = useContext(ProductContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.product);

  console.log(product,"prooo");
  
  // const product }} = useSelector((state) => state.product)
  
  const searchQuery = useSelector((state) => state.search.query)
  
  // Filter the products based on search and category
  // const filterSearch = product
  //   .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
  //   .filter((item) =>
  //     selectedCategory === "all" ? true : item.category === selectedCategory
  //   );
  
  // const filteredProducts = (products || []).filter((product) =>
  //   product.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );
  
  const filteredProducts = product.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleImageClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCartClick = (product) => {
    const id = localStorage.getItem('id');
    if (!id) {
      console.log('Please log in to add items to your cart.');
    } else {
      dispatch(addProductToDBAndCartAsync({ id, product }));
      console.log(`${product.name} added to cart and database!`);
    }
  };

  // Fetch products when the component is mounted
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  // Audio settings for cat and dog sounds
  const catAudioRef = useRef(null);
  const dogAudioRef = useRef(null);

  const handlePlayAudio = (category) => {
    if (category === "cat" && catAudioRef.current) {
      catAudioRef.current.play();
    }
    if (category === "dog" && dogAudioRef.current) {
      dogAudioRef.current.play();
    }
  };

  // Category selection handlers
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    handlePlayAudio(category);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div className="container py-4">
      <h4 className="text-2xl font-semibold text-center text-gray-700">
        <i>"Select category"</i>
      </h4>
      <br />
      <br />
      <div className="flex justify-center mb-4">
        {/* All Button */}
        <button
          className={`flex items-center justify-center w-16 h-16 mx-2 rounded-full shadow-md hover:scale-110 hover:shadow-2xl transition-all ${
            selectedCategory === "all" ? "bg-blue-600" : "bg-gray-300"
          }`}
          onClick={() => handleCategoryChange("all")}
        >
          <img
            src="https://img.freepik.com/free-photo/cat-love-being-affectionate-towards-each-other_23-2150984513.jpg?t=st=1735550783~exp=1735554383~hmac=4bd03b88f2ad1748c48520e49888de55f59cc17b567c3badda2fc780f1b80ae4&w=900"
            alt="All"
            className="object-cover w-full h-full transition-all rounded-full hover:scale-110 hover:shadow-2xl"
          />
        </button>

        {/* Cat Button */}
        <button
          className={`flex items-center justify-center w-16 h-16 mx-2 rounded-full shadow-md hover:scale-110 hover:shadow-2xl transition-all ${
            selectedCategory === "cat" ? "bg-blue-600" : "bg-gray-300"
          }`}
          onClick={() => handleCategoryChange("cat")}
        >
          <img
            src="https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg?t=st=1735549987~exp=1735553587~hmac=c26a0ccb15950eda4dd50c45d854f1c3bed383fda8cebe3785c8c13238e7e81b&w=360"
            alt="Cat"
            className="object-cover w-full h-full transition-all rounded-full hover:scale-110 hover:shadow-2xl"
          />
        </button>
        <audio ref={catAudioRef} src="src/assets/cat-sound.wav"></audio>

        {/* Dog Button */}
        <button
          className={`flex items-center justify-center w-16 h-16 mx-2 rounded-full shadow-md hover:scale-110 hover:shadow-2xl transition-all ${
            selectedCategory === "dog" ? "bg-blue-600" : "bg-gray-300"
          }`}
          onClick={() => handleCategoryChange("dog")}
        >
          <img
            src="https://img.freepik.com/free-photo/cute-spitz_144627-7076.jpg?t=st=1735550719~exp=1735554319~hmac=fab93c7f811eeb1fc23b6913c78f694c409eaa017cb7f0e51262784e9d5d7d59&w=740"
            alt="Dog"
            className="object-cover w-full h-full transition-all rounded-full hover:scale-110 hover:shadow-2xl"
          />
        </button>
        <audio ref={dogAudioRef} src="src/assets/dog-sound.wav"></audio>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {filteredProducts.map((item,index) => (
          <div className="flex justify-center" key={index}>
            <div className="w-40 h-full overflow-hidden transition-all duration-300 transform rounded-lg shadow-md bg-sky-300 card hover:scale-105 hover:shadow-xl">
              <img
                src={item.image}
                alt={item.name}
                onClick={() => handleImageClick(item)}
                style={{ objectFit: "cover" }}
              />
              <div className="p-3 text-center">
                <h6 className="text-sm font-semibold">{item.name}</h6>
                <p className="mb-1 text-sm text-primary">₹{item.price}</p>
                {item.oldPrice && (
                  <p className="text-xs text-gray-500 line-through">
                    ₹{item.oldPrice}
                  </p>
                )}
                <button
                  className="px-4 py-2 mt-2 text-xs font-semibold text-blue-600 transition border border-blue-600 rounded-full hover:bg-blue-100"
                  onClick={() => handleAddToCartClick(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default Center;
