var sum = 0;
var Razorpay;
fetch("https://fakestoreapi.com/products")
    .then(function (response) {
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
})
    .then(function (data) {
    var x = window.sessionStorage.getItem("cartData");
    var k = JSON.parse(x || "[]");
    var cartIds = [];
    k.forEach(function (item) {
        cartIds.push(item._id);
    });
    var jsonData = data;
    jsonData.forEach(function (item) {
        var _a;
        var str = sessionStorage.getItem('cartQuantity');
        var parsedObject = JSON.parse(str || "[]");
        var presentQuant = 1;
        var checker = false;
        for (var i = 0; i < parsedObject.length; i++) {
            if (parsedObject[i]._id === item.id) {
                presentQuant = parsedObject[i].quant;
                checker = true;
                break;
            }
        }
        if (checker === false) {
            var tempQuant = { _id: item.id, quant: 1 };
            presentQuant = 1;
            parsedObject.push(tempQuant);
        }
        sessionStorage.setItem('cartQuantity', JSON.stringify(parsedObject));
        if (cartIds.includes(item.id)) {
            var cardDiv = document.createElement("div");
            cardDiv.classList.add("cart-card");
            cardDiv.id = "product_".concat(item.id);
            var img = document.createElement("img");
            img.src = item.image;
            var title = document.createElement("h3");
            title.textContent = item.title;
            var price = document.createElement("p");
            price.classList.add("price");
            price.textContent = "Price: $".concat(item.price);
            var AddQuant = document.createElement("button");
            AddQuant.textContent = "+";
            AddQuant.onclick = function () { return addQuantity(item.id, item.price); };
            var paraQuant = document.createElement("p");
            paraQuant.id = "para-quant".concat(item.id);
            paraQuant.textContent = "".concat(presentQuant);
            var subQuant = document.createElement("button");
            subQuant.id = "sub-but".concat(item.id);
            subQuant.innerText = "-";
            subQuant.onclick = function () { return subQuantity(item.id, item.price); };
            var deleteFromCartButton = document.createElement("button");
            deleteFromCartButton.textContent = "Delete From Cart";
            deleteFromCartButton.onclick = function () { return deleteFromCart(item.id); };
            sum = sum + Number(item.price) * presentQuant;
            window.sessionStorage.setItem("totalPayment", sum.toString());
            var checkOutPayment = document.getElementById('checkOutPayment');
            if (checkOutPayment)
                checkOutPayment.innerText = "Proceed to pay: $".concat(sum);
            cardDiv.appendChild(img);
            cardDiv.appendChild(title);
            cardDiv.appendChild(price);
            cardDiv.appendChild(AddQuant);
            cardDiv.appendChild(paraQuant);
            cardDiv.appendChild(subQuant);
            cardDiv.appendChild(deleteFromCartButton);
            (_a = document.getElementById("cartCard")) === null || _a === void 0 ? void 0 : _a.appendChild(cardDiv);
        }
    });
})
    .catch(function (error) {
    console.error("Error:", error);
});
function addQuantity(itemId, itemPrice) {
    var str = sessionStorage.getItem('cartQuantity');
    var parsedObject = JSON.parse(str || "[]");
    var checker = false;
    for (var i = 0; i < parsedObject.length; i++) {
        if (parsedObject[i]._id === itemId) {
            parsedObject[i].quant++;
            sum = sum + itemPrice;
            document.getElementById("para-quant".concat(itemId)).innerText = "".concat(parsedObject[i].quant);
            checker = true;
            break;
        }
    }
    window.sessionStorage.setItem("totalPayment", sum.toString());
    document.getElementById('checkOutPayment').innerText = "Proceed to pay: $".concat(sum);
    sessionStorage.setItem('cartQuantity', JSON.stringify(parsedObject));
}
function subQuantity(itemId, itemPrice) {
    var str = sessionStorage.getItem('cartQuantity');
    var parsedObject = JSON.parse(str || "[]");
    var checker = false;
    for (var i = 0; i < parsedObject.length; i++) {
        if (parsedObject[i]._id === itemId) {
            if (parsedObject[i].quant > 0) {
                parsedObject[i].quant--;
                sum = sum - itemPrice;
                document.getElementById("para-quant".concat(itemId)).innerText = "".concat(parsedObject[i].quant);
            }
            checker = true;
            break;
        }
    }
    if (!checker) {
        var tempQuant = { _id: itemId, quant: 1 };
        parsedObject.push(tempQuant);
    }
    window.sessionStorage.setItem("totalPayment", sum.toString());
    document.getElementById('checkOutPayment').innerText = "Proceed to pay: $".concat(sum);
    sessionStorage.setItem('cartQuantity', JSON.stringify(parsedObject));
}
function deleteFromCart(itemId) {
    var tempData = JSON.parse(window.sessionStorage.getItem("cartData") || "[]");
    var updatedData = tempData.filter(function (item_f) {
        return item_f._id != itemId;
    });
    window.sessionStorage.setItem("cartData", JSON.stringify(updatedData));
    location.reload();
}
function bringHome() {
    location.href = "index.html";
}
function paymentCheckout() {
    var str = parseFloat(window.sessionStorage.getItem("totalPayment"));
    console.log(typeof (str));
    console.log(str);
    var options = {
        "key": "rzp_test_A0x90SYHBfArPO",
        "amount": str * 100,
        "currency": "INR",
        "name": "Acme Corp",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": null,
        "handler": function (response) {
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature);
        },
        "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
    rzp1.on('payment.failed', function (response) {
        console.log(response.error);
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
    });
}
// Thunder Client (https://www.thunderclient.com)
//   async function placeOrder(){
//     let headersList = {
//       "Content-Type": "application/json",
//       "User-Agent": "localhost:5500",
//       "Authorization": "Basic cnpwX3Rlc3Rfc1JJdHJiWXdzSVNyNms6TFdpZDRVQzVlSWF4RVNRUE9hWDg1NnAz"
//      } 
//      let bodyContent = JSON.stringify({
//          "amount": 500,
//          "currency": "INR",
//          "receipt": "qwsaq1"
//      });  
//      let response = await fetch("https://api.razorpay.com/v1/orders", { 
//        method: "POST",
//        body: bodyContent,
//        headers: headersList
//      });
//      let data = await response.text();
//      console.log(data);     
// }
// placeOrder();
