import React from 'react'

function Footer() {
  return (
    <div>
      <footer class="bg-blue-300 text-white py-6">
  <div class="max-w-6xl mx-auto px-4">
 
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
     
      <div>
        <h5 class="text-lg font-semibold mb-2">About Us</h5>
        <p class="text-sm">We provide the best quality pet food, toys, and accessories for your furry friends. Quality products to keep your pets happy and healthy.</p>
      </div>
      
 
      <div>
        <h5 class="text-lg font-semibold mb-2">Quick Links</h5>
        <ul>
          <li><a href="/about" class="text-sm hover:underline">About Us</a></li>
          <li><a href="/shop" class="text-sm hover:underline">Shop</a></li>
          <li><a href="/contact" class="text-sm hover:underline">Contact Us</a></li>
          <li><a href="/terms" class="text-sm hover:underline">Terms & Conditions</a></li>
        </ul>
      </div>

      
      <div>
        <h5 class="text-lg font-semibold mb-2">Contact Us</h5>
        <p class="text-sm">123 Pet Street, Pet City, ABC</p>
        <p class="text-sm">Email: support@petfood.com</p>
        <p class="text-sm">Phone: +1 234 567 890</p>
      </div>
    </div>

   
    <div class="border-t border-white mt-6 pt-4 text-center text-sm">
      <p>&copy; 2024 PetFood. All rights reserved.</p>
    </div>
  </div>
</footer>

    </div>
  )
}

export default Footer
