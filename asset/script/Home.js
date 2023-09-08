let url="http://localhost:3000/products/allproducts"

const card= document.getElementById("cardDiv");

async function getProduct(url) {
    const response = await fetch(url);
    if(!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const result = await response.json();
    return result
}



getProduct(url).then(function (result) {
    for(let i=0;i<3;i++) {
        cetakCard(result.Data[i]);
    }
});


function cetakCard(dataProduk) {
    card.innerHTML += `<div class="col md-4">
    <div class="card" style="width: 18rem">
        <img class="card-img-top" src=${dataProduk.photo} alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">${dataProduk.nameItem}</h5>
          <p class="card-text">
            Price : ${dataProduk.price}
          </p>
          <a href="Login.html" class="btn btn-primary">BUY</a>
        </div>
      </div>
</div>`
}






