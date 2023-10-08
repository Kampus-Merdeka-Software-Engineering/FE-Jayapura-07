const Navbar = () => {
    return(
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                <a class="navbar-brand" href="index.html" title="logo_brand"><img class="image-logo" src="assets\brand.png" alt="" /></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarScroll">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                    <li class="nav-item"><a class="nav-link active" aria-current="page" href="store.html">All Products</a></li>
                    <li class="nav-item"><a class="nav-link active" aria-current="page" href="about.html">About Us</a></li>
                    <li class="nav-item"><a class="nav-link active" aria-current="page" href="contact.html">Contact Us</a></li>
                </ul>
                    <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    
                    <a href="keranjang.html" class="btn btn-outline-dark">
                        <i class="bi-cart-fill me-1"></i>
                        Cart
                        <span class="badge bg-dark text-white ms-1 rounded-pill">3</span>
                    </a>
                </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;