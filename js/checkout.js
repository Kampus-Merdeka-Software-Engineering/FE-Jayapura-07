const cart = JSON.parse(localStorage.getItem("cart")) || []
        $(".cart-ammount").text(cart.length)
        const checkout_tmp = JSON.parse(localStorage.getItem("checkout_tmp")) || []
        // Definisikan fungsi checkout
        function checkout() {
            // Create data for transaction
            const transaction = {
                name: $("input[name=namaPembeli]").val(),
                phone: $("input[name=noPembeli]").val(),
                email: $("input[name=emailPembeli]").val(),
                address: $("textarea[name=alamatPembeli]").val(),
                shipping_method: $("select[name=pilih_pengiriman]").val(),
                payment_method: $("select#pilihPembayaran").val()
            }

            const transaction_details = []

            for (let i = 0; i < checkout_tmp.length; i++) {
                const item = {
                    product_id: checkout_tmp[i].product_id,
                    color: checkout_tmp[i].color_selected,
                    size: checkout_tmp[i].size,
                    qty: checkout_tmp[i].qty
                }
                transaction_details.push(item)
            }

            transaction.details = transaction_details

            // Post data to API Transaction
            $.ajax({
                url: "https://be-jayapura-07-production.up.railway.app/api/transaction",
                method: "POST",
                data: JSON.stringify(transaction),
                contentType: "application/json",
                success: function(data) {
                    // Hapus data checkout_tmp dari localStorage
                    localStorage.removeItem("checkout_tmp");

                    // Dapatkan data cart dari localStorage
                    const cart = JSON.parse(localStorage.getItem("cart")) || [];

                    // Loop melalui data checkout_tmp dan hapus objek yang dicheckout dari cart
                    for (let i = 0; i < checkout_tmp.length; i++) {
                        const productIndex = cart.findIndex(item => item.product_id === checkout_tmp[i].product_id);
                        if (productIndex !== -1) {
                            cart.splice(productIndex, 1);
                        }
                    }

                    // Simpan kembali data cart yang telah diperbarui ke localStorage
                    localStorage.setItem("cart", JSON.stringify(cart));

                    window.location.href = "halamanpembayaran.html";
                }
            });
        }
        // Fetch Checked Cart
        $(document).ready(function()
        {
            let totalHarga = 0;
            let totalBarang = checkout_tmp.length;
            for(let i = 0; i < checkout_tmp.length; i++)
            {
                const checkout_card = 
                `
                <div class="product-detail-list card"> 
                    <div class="product-picture">
                        <img src=${checkout_tmp[i].image} alt="">
                    </div>
                    <div class="side">
                        <div class="product-name">
                            ${checkout_tmp[i].name}
                        </div>
                        <div class="quantity"><span>Jumlah:</span> ${checkout_tmp[i].qty}</div>
                        <div class="product-foot">
                            <div class="harga"><span>Harga:</span> Rp. ${checkout_tmp[i].price_real}</div>
                            <div class="subtotal">
                                <span>Subtotal:</span>
                                Rp. ${checkout_tmp[i].price}
                            </div>
                        </div>
                    </div>
                </div>
                `

                $("#output_card").append(checkout_card)
                totalHarga += checkout_tmp[i].price
            }
            $(".totalBarang").text(totalBarang)
            $(".totalHarga").text(totalHarga)
            $(".totalBelanja").text(totalHarga)
        })