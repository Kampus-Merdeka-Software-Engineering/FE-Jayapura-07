// Fetch cart
const cart = JSON.parse(localStorage.getItem("cart")) || []
$(".cart-ammount").text(cart.length)
for(let i = 0; i < cart.length; i++)
{

    const cart_products = 
    `
    <div class="detail-produk" id="productOnCart">
        <div class="detail-produk-body">
            <div class="detail-produk-inner">
                <div class="detail-produk-component">
                    <div rowspan="3" class="close-box"><a href="#"><input type="checkbox" class="btn-box" title="close_box"></a></div>
                    <div rowspan="3"><img src=${cart[i].image} alt="" class="img-product"></div>
                </div>
            </div>
            <div class="detail-produk-inner">
                <div class="detail-produk-component">
                    <div colspan="3" height="70px" class="name-product bold">${cart[i].name}</div>
                </div>

                <div class="pilihan detail-produk-component">
                    <div height="50px">
                        <div>size</div>
                        <select title="size">
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                        </select>
                    </div>
                    <div>
                        <div>color</div>
                        <select title="color_selection" id="color-select">
                            
                        </select>
                    </div>
                    <div>
                        <div>quantity</div>
                        <div class="quantity">
                            <button id="quantity_dec_button" class="quantity_dec quantity_control">-</button>
                            <input type="text" id="quantity_input" min="1" value="${cart[i].qty}" title="total_item" class="btn-jumlah">
                            <button id="quantity_inc_button" class="quantity_inc quantity_control">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="detail-produk-head">
            <div class="bold">
                <div class="subtotal">subtotal:</div>
                <span>Rp${cart[i].price}</span>
            </div>
            <div class="close-box"  rowspan="3"><a class="btn-box bold" href="#" id="deleteProduct"><i class='fa fa-trash buang'></i></a></div>
        </div>
    </div>
    `
    $(".all-produk").append(cart_products)

    for(let j = 0; j < cart[i].color_option.length; j++)
    {
        const option = document.createElement("option")
        option.value = cart[i].color_option[j]
        option.text = cart[i].color_option[j]
        $("select#color-select").append(option)
        if(cart[i].color_selected === option.value)
        {
            option.selected = true
        }
    }
}

// Tambahkan event listener ke tombol hapus
$(".all-produk").on("click", "#deleteProduct", function() {
    const productIndex = $(this).closest(".detail-produk").index(); // Dapatkan indeks produk yang akan dihapus
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Konfirmasi sebelum menghapus
    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus item ini dari keranjang belanja?");    
    if (confirmDelete) {
        // Hapus item dari localStorage berdasarkan indeks produk
        if (productIndex >= 0 && productIndex < cart.length) {
            cart.splice(productIndex, 1); // Hapus item dari array cart
            localStorage.setItem("cart", JSON.stringify(cart)); // Simpan kembali ke localStorage
        }

        // Hapus elemen HTML dari tampilan
        $(this).closest(".detail-produk").remove();
        alert("Barang berhasil dihapus");
    }
});

// Tambahkan event listener untuk kotak centang
$(".all-produk").on("change", ".detail-produk input[type='checkbox']", function() {
    const checkedItems = $(".detail-produk input[type='checkbox']:checked").length;
    const checkoutButton = $("#tombolCheckout");

    if (checkedItems > 0) {
        checkoutButton.prop("disabled", false); // Aktifkan tombol Checkout
    } else {
        checkoutButton.prop("disabled", true); // Nonaktifkan tombol Checkout
    }
});

// Tambahkan event listener untuk tombol Checkout
$("#tombolCheckout").on("click", function() {
    const checkedItems = $(".detail-produk input[type='checkbox']:checked");

    if (checkedItems.length > 0) {
        const checkoutData = [];

        checkedItems.each(function() {
            const productIndex = $(this).closest(".detail-produk").index();
            const cart = JSON.parse(localStorage.getItem("cart")) || [];

            if (productIndex >= 0 && productIndex < cart.length) {
                const selectedProduct = cart[productIndex];

                // Ambil data dari input warna (color), ukuran (size), dan kuantitas (qty)
                const selectedColor = $(this).closest(".detail-produk").find("select#color-select").val();
                const selectedSize = $(this).closest(".detail-produk").find("select[title='size']").val();
                const selectedQty = parseInt($(this).closest(".detail-produk").find("input#quantity_input").val());
                const selectedPriceReal = selectedProduct.price_real;

                // Buat objek checkout dengan data dari input
                const checkoutItem = {
                    product_id: selectedProduct.product_id,
                    name: selectedProduct.name,
                    slug: selectedProduct.slug,
                    price_real: selectedPriceReal, // Tambahkan price_real ke objek checkout
                    price: selectedPriceReal * selectedQty,
                    size: selectedSize,
                    color_selected: selectedColor,
                    color_option: selectedProduct.color_option,
                    image: selectedProduct.image,
                    qty: selectedQty
                };

                checkoutData.push(checkoutItem);
            }
        });

        // Simpan data checkout ke localStorage dengan key checkout_tmp
        localStorage.setItem("checkout_tmp", JSON.stringify(checkoutData));

        // Redirect ke halaman checkout.html
        window.location.href = "checkout.html";
    } else {
        alert("Tidak ada barang yang dicentang untuk checkout.");
    }
});

const quantityInput = document.querySelectorAll('#quantity_input');
const quantityDec = document.querySelectorAll('#quantity_dec_button');
const quantityInc = document.querySelectorAll('#quantity_inc_button');

for(let i = 0; i < quantityInput.length; i++){
    // let q = 0;
    quantityInc[i].addEventListener('click', ()=>{
        // quantityInput[i].value = q++;
        quantityInput[i].value = parseInt(quantityInput[i].value) + 1;
    });
    quantityDec[i].addEventListener('click', ()=>{
        if(parseInt(quantityInput[i].value) > 1){
            quantityInput[i].value = parseInt(quantityInput[i].value) - 1;
        }
    });
}
