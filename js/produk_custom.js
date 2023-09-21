/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init Image
5. Init Quantity


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var header = $('.header');
	var cartItems = [];


	setHeader();

	$(window).on('resize', function()
	{
		setHeader();
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	initMenu();
	initImage();
	initQuantity();

	/* 

	2. Set Header

	*/

	function setHeader()
	{
		if($(window).scrollTop() > 100)
		{
			header.addClass('scrolled');
		}
		else
		{
			header.removeClass('scrolled');
		}
	}

	/* 

	3. Init Image

	*/

	function initImage()
	{
		var images = $('.product_image_thumbnail');
		var selected = $('.product_image_large img');

		images.each(function()
		{
			var image = $(this);
			image.on('click', function()
			{
				var imagePath = new String(image.data('image'));
				selected.attr('src', imagePath);
			});
		});
	}

	/* 

	4. Init Quantity

	*/

	function initQuantity()
	{
		// Handle product quantity input
		if($('.product_quantity').length)
		{
			var input = $('#quantity_input');
			var incButton = $('#quantity_inc_button');
			var decButton = $('#quantity_dec_button');

			var originalVal;
			var endVal;

			incButton.on('click', function()
			{
				originalVal = input.val();
				endVal = parseFloat(originalVal) + 1;
				input.val(endVal);
			});

			decButton.on('click', function()
			{
				originalVal = input.val();
				if(originalVal > 0)
				{
					endVal = parseFloat(originalVal) - 1;
					input.val(endVal);
				}
			});
		}
	}

	/*

	5. Init AddtoCart

	*/

	// Data produk yang akan ditambahkan ke keranjang
	var product = {
    id: 1,
    name: "Hoodie Bagus",
    price: 189000,
    quantity: 1
	};

	// Array untuk menyimpan produk di keranjang
	var cartItems = [];

	function initAddToCart() {
    // Handle "Add to Cart" button click
    var addToCartButton = $('.button.addToCart_button');

    addToCartButton.on('click', function() {
        // Tambahkan produk ke keranjang saat tombol "Add to Cart" diklik
        addToCart(product);
    });
	}

	function addToCart(product) {
    // Cek apakah produk sudah ada di keranjang
    var existingProductIndex = cartItems.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
        // Jika produk sudah ada, tambahkan jumlahnya
        cartItems[existingProductIndex].quantity++;
    } else {
        // Jika produk belum ada, tambahkan produk baru ke keranjang
        cartItems.push({ ...product });
    }

    // Memperbarui tampilan jumlah produk di keranjang
    updateCartItemCount();
	}

	function updateCartItemCount() {
		var cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
		console.log("Jumlah produk di keranjang:", cartItemCount);
	}

	// Inisialisasi
	$(document).ready(function() {
		initAddToCart();
	});

	/*

	6. Init Buy Now

	*/

	function initBuyNow() {
		// Handle "Buy Now" button click
		var buyNowButton = $('#buynow_button');
	
		buyNowButton.on('click', function() {
			// Lakukan tindakan "Buy Now" saat tombol "Buy Now" diklik
			buyNow();
		});
	}
	
	function buyNow() {
		alert("Anda akan membeli produk: Hoodie Bagus seharga Rp. 189.000");
		// window.location.href = "halaman_pembayaran.html";
	}
	
	// Inisialisasi
	$(document).ready(function() {
		initBuyNow();
	});
	
});