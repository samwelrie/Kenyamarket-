const firebaseConfig = {
  apiKey: "AIzaSyDrq36ffLtjItRJg-UO5l4yJqtpyeCucK8",
  authDomain: "kenyamarket.firebaseapp.com",
  projectId: "kenyamarket",
  storageBucket: "kenyamarket.appspot.com"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

window.onload = function() {
  loadProducts();
};

function loadProducts() {
  const productsDiv = document.getElementById("products");
  productsDiv.innerHTML = "";

  db.collection("products").get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      
      const productHTML = `
        <div class="product">
          <h3>${data.name}</h3>
          <p>KES ${data.price}</p>
          <button class="order-btn" onclick="orderNow('${data.name}', ${data.price})">
            Order Now
          </button>
        </div>
      `;
      
      productsDiv.innerHTML += productHTML;
    });
  });
}

function orderNow(productName, price) {
  const message = `Hi, I want to order *${productName}* for KES ${price}. Please confirm.`;
  const whatsappUrl = `https://wa.me/254114908449?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
}