const cart = JSON.parse(localStorage.getItem("cart")) || []
$(".cart-ammount").text(cart.length)
$(document).ready(function()
{
    $.ajax({
        url: "https://be-jayapura-07-production.up.railway.app/api/products",
        method: "GET",
        dataType: "json",
        beforeSend: function()
        {
            $("#loading").show();
        },
        success: function(response)
        {
            $("#loading").hide()
            for(let i = 0; i < response.data.length; i++)
            {
                $(".card-list").append(
                    `<div class="col mb-5">
                        <div class="card h-100">
                            <!-- Product image-->
                            <img class="card-img-top" src=${response.data[i].image} alt="..." />
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">${response.data[i].name}</h5>
                                    <!-- Product reviews-->
                                    <div class="d-flex justify-content-center small text-warning mb-2">
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                    </div>
                                    <!-- Product price-->
                                    Rp.${response.data[i].price}.00
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="produk.html?slug=${response.data[i].slug}">View Product</a></div>
                            </div>
                        </div>
                    </div>`
                )
            }
        }
    })
})