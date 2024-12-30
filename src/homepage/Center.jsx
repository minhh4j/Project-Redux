import React, { useContext, useState } from "react";
import { ProductContext } from "../Context/ProductContext";
import ProductModal from "./ProductInfoModal";

function Center() {
  const { product, addToCart, search } = useContext(ProductContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all"); 

  const filterSearch = product
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) =>
      selectedCategory === "all" ? true : item.category === selectedCategory
    );

  const handleImageClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCartClick = (item) => {
    if (!localStorage.getItem("id")) {
      console.log("Please log in to add items to your cart.");
    } else {
      addToCart(item);
      console.log(`${item.name} added to cart!`);
    }
  };

  return (
    <div className="container py-4">
      
    <div className="flex justify-center mb-4">
  {/* All Button */}
  <button
    className={`flex items-center justify-center w-16 h-16 mx-2 rounded-full shadow-md ${
      selectedCategory === "all" ? "bg-blue-600" : "bg-gray-300"
    }`}
    onClick={() => setSelectedCategory("all")}
  >
    <img
      src="https://img.freepik.com/free-photo/cat-love-being-affectionate-towards-each-other_23-2150984513.jpg?t=st=1735550783~exp=1735554383~hmac=4bd03b88f2ad1748c48520e49888de55f59cc17b567c3badda2fc780f1b80ae4&w=900" 
      alt="All"
      className="object-cover w-full h-full rounded-full"
    />
  </button>

  {/* Cat Button */}
  <button
    className={`flex items-center justify-center w-16 h-16 mx-2 rounded-full shadow-md ${
      selectedCategory === "cat" ? "bg-blue-600" : "bg-gray-300"
    }`}
    onClick={() => setSelectedCategory("cat")}
  >
    <img
      src="https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg?t=st=1735549987~exp=1735553587~hmac=c26a0ccb15950eda4dd50c45d854f1c3bed383fda8cebe3785c8c13238e7e81b&w=360" 
      alt="Cat"
      className="object-cover w-full h-full rounded-full"
    />
  </button>

  {/* Dog Button */}
  <button
    className={`flex items-center justify-center w-16 h-16 mx-2 rounded-full shadow-md ${
      selectedCategory === "dog" ? "bg-blue-600" : "bg-gray-300"
    }`}
    onClick={() => setSelectedCategory("dog")}
  >
    <img
      src="https://img.freepik.com/free-photo/cute-spitz_144627-7076.jpg?t=st=1735550719~exp=1735554319~hmac=fab93c7f811eeb1fc23b6913c78f694c409eaa017cb7f0e51262784e9d5d7d59&w=740" 
      alt="Dog"
      className="object-cover w-full h-full rounded-full"
    />
  </button>
</div>


      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {filterSearch.map((item) => (
          <div className="flex justify-center" key={item.id}>
            <div className="w-40 h-full overflow-hidden transition-all duration-300 transform rounded-lg shadow-md bg-sky-300 card hover:scale-105 hover:shadow-xl">
              <img
                src={item.image}
                alt={item.name}
                onClick={() => handleImageClick(item)}
                style={{objectFit:"cover"}}
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