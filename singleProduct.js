let x = window.sessionStorage.getItem("data");
x = parseInt(x);
fetch("https://fakestoreapi.com/products")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    jsonData = data;
    jsonData.forEach((item) => {
      if (item.id == x) {
        
        var y=document.getElementById("desPro");
        y.innerText=`${item.description}`;
        y=document.getElementById("title-pro");
        y.innerText=`${item.title}`;
        y=document.getElementById("img-pro");
        y.src = item.image
        y=document.getElementById('cat-pro');
        y.innerText=item.category;
        y=document.getElementById('price-pro');
        y.innerText=`$${item.price}`;
        y=document.getElementById('rating-pro');
        y.innerText=`Rating: ${item.rating.rate} (${item.rating.count} reviews)`;
        y=document.getElementById('cartAdd');
        y.addEventListener('click',addToCart(item.id));
      }
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
// Function to add a product to the cart
addToCart = (id_details) => {
  // Retrieve existing cart data from sessionStorage
  const existingCartData = window.sessionStorage.getItem("cartData");

  // Convert existing cart data to an array or create an empty array
  const cartArray = existingCartData ? JSON.parse(existingCartData) : [];

  // Add the new product ID to the cart array
  cartArray.push({ _id: id_details });

  // Update the cart data in sessionStorage
  window.sessionStorage.setItem("cartData", JSON.stringify(cartArray));
};
