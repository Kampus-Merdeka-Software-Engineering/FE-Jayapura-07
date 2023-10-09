var i = 0;
function buttonInc() {
    document.getElementById('quantity_input').value = ++i;
}
function buttonDec() {
    if(document.getElementById('quantity_input').value > 1){
      document.getElementById('quantity_input').value = --i;
    }
}
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const cart = JSON.parse(localStorage.getItem("cart")) || []
$(".cart-ammount").text(cart.length)
// Get Product By Slug
$.ajax({
  url: 'https://be-jayapura-07-production.up.railway.app/api/products/' + urlParams.get("slug"),
  method: "GET",
  dataType: "json",
  beforeSend: function()
  {
      $("#loading").show()
      $("#error").hide()
      $(".product").hide()
  },
  success: function(response)
  {
      $("#loading").hide()
      $("#error").hide()
      $(".product").show()
      $("input[name=product_id]").val(response.data.id)
      $("#product-image").attr("src", response.data.image)
      $("#product-name").text(response.data.name)
      $("#product-price").html(`Rp.${response.data.price}`)
      for(let i = 0; i < response.data.ProductColors.length; i++)
      {
          const option = document.createElement("option")
          option.value = response.data.ProductColors[i].color
          option.text = response.data.ProductColors[i].color
          $("#color-select").append(option)
      }
  },
  error: function()
  {
      $("#error").show()
      $("#loading").hide()

  }
})  

function addToCart(item) {
  // Mendapatkan data keranjang dari localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let productColors = []
  $("#color-select option").each(function()
  {
      productColors.push($(this).val())
  })

  // Menambahkan item ke dalam keranjang
  const newItem = {
      product_id: parseInt($("input[name=product_id]").val()),
      name: $("#product-name").text(),
      slug: urlParams.get("slug"),
      price_real: parseInt($("#product-price").text().replace("Rp.", "")),
      price: parseInt($("#product-price").text().replace("Rp.", "")) * parseInt($("input[name=qty]").val()),
      size: $("input[name=product_radio]:checked").val(),
      color_selected: $("select[name=color] option").filter(":selected").val(),
      color_option:  productColors,
      image: $("#product-image").attr("src"),
      qty: parseInt($("input[name=qty]").val())
  };

  // Cari apakah ada objek dengan slug yang sama dalam keranjang
  let itemFound = false;
  for (let i = 0; i < cart.length; i++) {
      if (cart[i].slug === newItem.slug) {
          // Jika ada, tambahkan qty ke objek yang sudah ada
          cart[i].qty += newItem.qty;
          cart[i].price += newItem.price
          itemFound = true;
          break; // Keluar dari loop karena barang sudah ditemukan
      }
  }

  // Jika barang tidak ditemukan dalam keranjang, tambahkan sebagai objek baru
  if (!itemFound) {
      cart.push(newItem);
  }

  // Menyimpan keranjang yang telah diperbarui ke localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}



console.log($("#product-name").text());
console.log(JSON.parse(localStorage.getItem("cart")).length);
