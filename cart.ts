var sum: number = 0;
let Razorpay:any;
fetch("https://fakestoreapi.com/products")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data: any[]) => {
    let x: string | null = window.sessionStorage.getItem("cartData");
    let k: any[] = JSON.parse(x || "[]");
    let cartIds: number[] = [];
    k.forEach((item: any) => {
      cartIds.push(item._id);
    });
    let jsonData = data;
    jsonData.forEach((item) => {
      const str:string|null = sessionStorage.getItem('cartQuantity');
      const parsedObject: any[] = JSON.parse(str || "[]");
      let presentQuant:number=1;
      let checker:boolean=false;
      for(var i = 0; i < parsedObject.length; i++) {
        if (parsedObject[i]._id ===item.id) {
            presentQuant=parsedObject[i].quant;
            checker=true;
            break;
        }}
      if(checker===false){
        let tempQuant={_id:item.id,quant:1};
        presentQuant=1;
        parsedObject.push(tempQuant);
      }
      sessionStorage.setItem('cartQuantity',JSON.stringify(parsedObject));
      if (cartIds.includes(item.id)) {

        const cardDiv: HTMLDivElement = document.createElement("div");
        cardDiv.classList.add("cart-card");

        cardDiv.id = `product_${item.id}`;

        const img: HTMLImageElement = document.createElement("img");
        img.src = item.image;

        const title: HTMLHeadingElement = document.createElement("h3");
        title.textContent = item.title;

        const price: HTMLParagraphElement = document.createElement("p");
        price.classList.add("price");
        price.textContent = `Price: $${item.price}`;

        const AddQuant: HTMLButtonElement = document.createElement("button");
        AddQuant.textContent = "+";
        AddQuant.onclick = () => addQuantity(item.id, item.price);

        const paraQuant: HTMLParagraphElement = document.createElement("p");
        paraQuant.id = `para-quant${item.id}`;
        paraQuant.textContent = `${presentQuant}`;

        const subQuant: HTMLButtonElement = document.createElement("button");
        subQuant.id = `sub-but${item.id}`;
        subQuant.innerText = "-";
        subQuant.onclick = () => subQuantity(item.id, item.price);

        const deleteFromCartButton: HTMLButtonElement = document.createElement("button");
        deleteFromCartButton.textContent = "Delete From Cart";
        deleteFromCartButton.onclick = () => deleteFromCart(item.id);

        sum = sum + Number(item.price)*presentQuant;
        window.sessionStorage.setItem("totalPayment", sum.toString());
        const checkOutPayment: HTMLElement | null = document.getElementById('checkOutPayment');
        if (checkOutPayment) checkOutPayment.innerText = `Proceed to pay: $${sum}`;

        cardDiv.appendChild(img);
        cardDiv.appendChild(title);
        cardDiv.appendChild(price);
        cardDiv.appendChild(subQuant);
        cardDiv.appendChild(paraQuant);
        cardDiv.appendChild(AddQuant);
        cardDiv.appendChild(deleteFromCartButton);

        document.getElementById("cartCard")?.appendChild(cardDiv);
      }
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

 function addQuantity(itemId,itemPrice){
  const str:string|null = sessionStorage.getItem('cartQuantity');
  const parsedObject: any[] = JSON.parse(str || "[]");
    let checker:boolean=false;
    for(var i = 0; i < parsedObject.length; i++) {
      if (parsedObject[i]._id ===itemId) {
          parsedObject[i].quant++;
          sum=sum+itemPrice;
          document.getElementById(`para-quant${itemId}`).innerText=`${parsedObject[i].quant}`;
          checker=true;
          break;
      }}
    window.sessionStorage.setItem("totalPayment",sum.toString());
    document.getElementById('checkOutPayment').innerText=`Proceed to pay: $${sum}`;
    sessionStorage.setItem('cartQuantity',JSON.stringify(parsedObject));
}
 function subQuantity(itemId,itemPrice){
  const str:string|null = sessionStorage.getItem('cartQuantity');
  const parsedObject: any[] = JSON.parse(str || "[]");
    let checker:boolean=false;
    for(var i = 0; i < parsedObject.length; i++) {
      if (parsedObject[i]._id ===itemId) {
          if(parsedObject[i].quant>0)
          {
            parsedObject[i].quant--;
            sum=sum-itemPrice;
            document.getElementById(`para-quant${itemId}`).innerText=`${parsedObject[i].quant}`;
          }
          checker=true;
          break;
      }}
    if(!checker){
      let tempQuant={_id:itemId,quant:1};
      parsedObject.push(tempQuant);
    }
    window.sessionStorage.setItem("totalPayment",sum.toString());
    document.getElementById('checkOutPayment').innerText=`Proceed to pay: $${sum}`;
    sessionStorage.setItem('cartQuantity',JSON.stringify(parsedObject));
  }
function deleteFromCart(itemId: number) {
  let tempData: any[] | null = JSON.parse(window.sessionStorage.getItem("cartData") || "[]");
  let updatedData: any[] = tempData.filter(function (item_f) {
    return item_f._id != itemId;
  });
  window.sessionStorage.setItem("cartData", JSON.stringify(updatedData));
  location.reload();
}

function bringHome() {
  location.href = "index.html";
}

function paymentCheckout() {
let str = parseFloat(window.sessionStorage.getItem("totalPayment"));
console.log(typeof(str));
console.log(str);
var options = {
  "key": "rzp_test_A0x90SYHBfArPO",
  "amount": str*100,
  "currency": "INR",
  "name": "Acme Corp",
  "description": "Test Transaction",
  "image": "https://example.com/your_logo",
  "order_id": null,
  "handler": function (response){
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature)
  },
  "prefill": { 
      "name": "Gaurav Kumar", //your customer's name
      "email": "gaurav.kumar@example.com", 
      "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
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
rzp1.on('payment.failed', function (response){
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