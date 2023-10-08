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
      // Create a div element with the class "card"
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");

      // Set the ID of the card div
      cardDiv.id = `product_${item.id}`;

      // Create an img element and set its src attribute
      const img = document.createElement("img");
      img.src = item.image;

      // Create h3 element and set its text content to the item's title
      const title = document.createElement("h3");
      title.textContent = item.title;

      // Create p elements for category, description, price, and rating
      const category = document.createElement("p");
      category.classList.add("category");
      category.textContent = item.category;

      // const description = document.createElement("p");
      // description.classList.add("des");
      // description.textContent = item.description;

      const price = document.createElement("p");
      price.classList.add("price");
      price.textContent = `Price: $${item.price}`;

      const rating = document.createElement("p");
      rating.classList.add("rating");
      rating.textContent = `Rating: ${item.rating.rate} (${item.rating.count} reviews)`;

    //   const addToCartButton = document.createElement("button");
    //   addToCartButton.textContent = "Add to Cart";
    //   addToCartButton.onclick = () => addToCart(item.id); // Call addToCart function with product ID

      // Append the created elements to the cardDiv
      cardDiv.appendChild(img);
      cardDiv.appendChild(title);
      // cardDiv.appendChild(category);
      // cardDiv.appendChild(description);
      cardDiv.appendChild(price);
      cardDiv.appendChild(rating);
      cardDiv.onclick=()=>{
        setClicked(item.id);
      }
    //   cardDiv.appendChild(addToCartButton);
      // Append the cardDiv as a child of the showElements div
      document.getElementById("showElements").appendChild(cardDiv);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

let cartProducts = [];
bringAllCategories = () => {
  location.href="index.html";
};
showCat1 = () => {
  document.getElementById("showElements").innerHTML = "";
  document.getElementById("showElements").classList.add('display-pane');
  fetch("https://fakestoreapi.com/products/category/electronics")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      jsonData = data;
      jsonData.forEach((item) => {
        // Create a div element with the class "card"
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
  
        // Set the ID of the card div
        cardDiv.id = `product_${item.id}`;
  
        // Create an img element and set its src attribute
        const img = document.createElement("img");
        img.src = item.image;
  
        // Create h3 element and set its text content to the item's title
        const title = document.createElement("h3");
        title.textContent = item.title;
  
        // Create p elements for category, description, price, and rating
        const category = document.createElement("p");
        category.classList.add("category");
        category.textContent = item.category;
  
        const price = document.createElement("p");
        price.classList.add("price");
        price.textContent = `Price: $${item.price}`;
  
        const rating = document.createElement("p");
        rating.classList.add("rating");
        rating.textContent = `Rating: ${item.rating.rate} (${item.rating.count} reviews)`;
  
        // Append the created elements to the cardDiv
        cardDiv.appendChild(img);
        cardDiv.appendChild(title);
        cardDiv.appendChild(category);
        // cardDiv.appendChild(description);
        cardDiv.appendChild(price);
        cardDiv.appendChild(rating);
        cardDiv.onclick=()=>{
          setClicked(item.id);
        }
        document.getElementById("showElements").appendChild(cardDiv);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
showCat2 = () => {
  document.getElementById("showElements").innerHTML = "";
  fetch("https://fakestoreapi.com/products/category/jewelery")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      jsonData = data;
      jsonData.forEach((item) => {
        // Create a div element with the class "card"
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
  
        // Set the ID of the card div
        cardDiv.id = `product_${item.id}`;
  
        // Create an img element and set its src attribute
        const img = document.createElement("img");
        img.src = item.image;
  
        // Create h3 element and set its text content to the item's title
        const title = document.createElement("h3");
        title.textContent = item.title;
  
        // Create p elements for category, description, price, and rating
        const category = document.createElement("p");
        category.classList.add("category");
        category.textContent = item.category;
  
        const price = document.createElement("p");
        price.classList.add("price");
        price.textContent = `Price: $${item.price}`;
  
        const rating = document.createElement("p");
        rating.classList.add("rating");
        rating.textContent = `Rating: ${item.rating.rate} (${item.rating.count} reviews)`;
  
        // Append the created elements to the cardDiv
        cardDiv.appendChild(img);
        cardDiv.appendChild(title);
        cardDiv.appendChild(category);
        // cardDiv.appendChild(description);
        cardDiv.appendChild(price);
        cardDiv.appendChild(rating);
        cardDiv.onclick=()=>{
          setClicked(item.id);
        }
        document.getElementById("showElements").appendChild(cardDiv);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
showCat3 = () => {
  document.getElementById("showElements").innerHTML = "";
  fetch("https://fakestoreapi.com/products/category/men%27s%20clothing")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      jsonData = data;
      jsonData.forEach((item) => {
        // Create a div element with the class "card"
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
  
        // Set the ID of the card div
        cardDiv.id = `product_${item.id}`;
  
        // Create an img element and set its src attribute
        const img = document.createElement("img");
        img.src = item.image;
  
        // Create h3 element and set its text content to the item's title
        const title = document.createElement("h3");
        title.textContent = item.title;
  
        // Create p elements for category, description, price, and rating
        const category = document.createElement("p");
        category.classList.add("category");
        category.textContent = item.category;
  
        const price = document.createElement("p");
        price.classList.add("price");
        price.textContent = `Price: $${item.price}`;
  
        const rating = document.createElement("p");
        rating.classList.add("rating");
        rating.textContent = `Rating: ${item.rating.rate} (${item.rating.count} reviews)`;
  
        // Append the created elements to the cardDiv
        cardDiv.appendChild(img);
        cardDiv.appendChild(title);
        cardDiv.appendChild(category);
        // cardDiv.appendChild(description);
        cardDiv.appendChild(price);
        cardDiv.appendChild(rating);
        cardDiv.onclick=()=>{
          setClicked(item.id);
        }
        document.getElementById("showElements").appendChild(cardDiv);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
showCat4 = () => {
  document.getElementById("showElements").innerHTML = "";
  fetch("https://fakestoreapi.com/products/category/women%27s%20clothing")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) =>{
      jsonData = data;
      jsonData.forEach((item) => {
        // Create a div element with the class "card"
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
  
        // Set the ID of the card div
        cardDiv.id = `product_${item.id}`;
  
        // Create an img element and set its src attribute
        const img = document.createElement("img");
        img.src = item.image;
  
        // Create h3 element and set its text content to the item's title
        const title = document.createElement("h3");
        title.textContent = item.title;
  
        // Create p elements for category, description, price, and rating
        const category = document.createElement("p");
        category.classList.add("category");
        category.textContent = item.category;
  
        const price = document.createElement("p");
        price.classList.add("price");
        price.textContent = `Price: $${item.price}`;
  
        const rating = document.createElement("p");
        rating.classList.add("rating");
        rating.textContent = `Rating: ${item.rating.rate} (${item.rating.count} reviews)`;
  
        // Append the created elements to the cardDiv
        cardDiv.appendChild(img);
        cardDiv.appendChild(title);
        cardDiv.appendChild(category);
        // cardDiv.appendChild(description);
        cardDiv.appendChild(price);
        cardDiv.appendChild(rating);
        cardDiv.onclick=()=>{
          setClicked(item.id);
        }
        document.getElementById("showElements").appendChild(cardDiv);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// Function to add a product to the cart
function addToCart(productId) {
  cartProducts.push(productId);
  console.log("Product added to cart. Cart products:", cartProducts);
}

showCartItems = () => {
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
        // Create a div element with the class "card"
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");

        // Set the ID of the card div
        cardDiv.id = `product_${item.id}`;

        // Create an img element and set its src attribute
        const img = document.createElement("img");
        img.src = item.image;

        // Create h3 element and set its text content to the item's title
        const title = document.createElement("h3");
        title.textContent = item.title;

        // Create p elements for category, description, price, and rating
        const category = document.createElement("p");
        category.classList.add("category");
        category.textContent = item.category;

        const description = document.createElement("p");
        description.classList.add("des");
        description.textContent = item.description;

        const price = document.createElement("p");
        price.classList.add("price");
        price.textContent = `Price: $${item.price}`;

        const rating = document.createElement("p");
        rating.classList.add("rating");
        rating.textContent = `Rating: ${item.rating.rate} (${item.rating.count} reviews)`;

        // const addToCartButton = document.createElement("button");
        // addToCartButton.textContent = "Add to Cart";
        // addToCartButton.onclick = () => addToCart(item.id); // Call addToCart function with product ID

        // Append the created elements to the cardDiv
        cardDiv.appendChild(img);
        cardDiv.appendChild(title);
        cardDiv.appendChild(category);
        cardDiv.appendChild(description);
        cardDiv.appendChild(price);
        cardDiv.appendChild(rating);
        // cardDiv.appendChild(addToCartButton);
        // Append the cardDiv as a child of the showElements div
        document.getElementById("cartItems").appendChild(cardDiv);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
setClicked=(setId)=>{
    window.sessionStorage.setItem("data",setId);
    window.location.href="singleProduct.html";
}