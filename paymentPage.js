
   
async function placeOrder(){
    var sumAmount=window.sessionStorage.getItem("sumAmount");
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "Authorization": "Basic cnpwX3Rlc3Rfc1JJdHJiWXdzSVNyNms6TFdpZDRVQzVlSWF4RVNRUE9hWDg1NnAz"
       }
       let bodyContent = JSON.stringify({
           "amount": sumAmount,
           "currency": "INR",
           "receipt": "qwsaq1"
       });
       let response = await fetch("https://api.razorpay.com/v1/orders", { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       let data = await response.text();
       console.log(data); 
}

placeOrder();