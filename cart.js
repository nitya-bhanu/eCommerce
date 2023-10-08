let sum=0;
fetch("https://fakestoreapi.com/products")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    x = window.sessionStorage.getItem("cartData");
    x = JSON.parse(x);
    let cartIds = [];
    x.forEach((item) => {
      cartIds.push(item._id);
    });
    // console.log(cartIds);
    jsonData = data;
    jsonData.forEach((item) => {
      if (cartIds.includes(item.id)) {
        // console.log("item: "+item.id);
        // Create a div element with the class "card"
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("cart-card");

        // Set the ID of the card div
        cardDiv.id = `product_${item.id}`;

        // Create an img element and set its src attribute
        const img = document.createElement("img");
        img.src = item.image;

        // Create h3 element and set its text content to the item's title
        const title = document.createElement("h3");
        title.textContent = item.title;

        const price = document.createElement("p");
        price.classList.add("price");
        price.textContent = `Price: $${item.price}`;

        const deleteFromCartButton = document.createElement("button");
        deleteFromCartButton.textContent = "Delete From Cart";
        deleteFromCartButton.onclick = () => deleteFromCart(item.id); // Call addToCart function with product ID

        sum=sum+Number(item.price);
        window.sessionStorage.setItem("totalPayment",sum);
        document.getElementById('checkOutPayment').innerText=`Proceed to pay: $${sum}`;

        // Append the created elements to the cardDiv
        cardDiv.appendChild(img);
        cardDiv.appendChild(title);
        cardDiv.appendChild(price);
        cardDiv.appendChild(deleteFromCartButton);
        // Append the cardDiv as a child of the showElements div
        document.getElementById("cartCard").appendChild(cardDiv);
      }
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
  deleteFromCart=(itemId)=>{
    console.log(itemId);
    console.log(window.sessionStorage.getItem("cartData"));
    let tempData=JSON.parse(window.sessionStorage.getItem("cartData"));
    let updatedData=tempData.filter(function(item_f){
      return item_f._id!=itemId;
    })
    window.sessionStorage.setItem("cartData",JSON.stringify(updatedData));
    location.reload();
  }
  bringHome=()=>{
    location.href="index.html"
  }
  paymentCheckout=()=>{
    location.href="http://localhost:4242";
  }