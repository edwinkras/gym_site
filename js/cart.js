document.addEventListener('DOMContentLoaded', function () {

    function getCart() {
        return JSON.parse(localStorage.getItem(LS_CART)) || [];
    }

    function saveCart(cart) {
        localStorage.setItem(LS_CART, JSON.stringify(cart));
    }

    function updateBadge() {
        var badge = document.getElementById('cartCount');
        if (!badge) return;
        var cart = getCart();
        var count = cart.reduce(function (sum, item) { return sum + item.quantity; }, 0);
        if (count > 0) {
            badge.textContent = count;
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }
    }

    updateBadge();

    document.querySelectorAll('.btn-add-cart').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var productId = parseInt(btn.getAttribute('data-product-id'));
            var product = PRODUCTS.find(function (p) { return p.id === productId; });
            if (!product) return;

            var cart = getCart();
            var existing = cart.find(function (item) { return item.id === productId; });
            if (existing) {
                existing.quantity++;
            } else {
                cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
            }
            saveCart(cart);
            updateBadge();

            btn.textContent = 'Added!';
            btn.classList.remove('btn-cart');
            btn.classList.add('btn-success');
            setTimeout(function () {
                btn.textContent = 'Add to Cart';
                btn.classList.remove('btn-success');
                btn.classList.add('btn-cart');
            }, 1500);
        });
    });

    var cartToggle = document.getElementById('cartToggle');
    if (cartToggle) {
        cartToggle.addEventListener('click', function (e) {
            e.preventDefault();
            renderCart();
        });
    }

    function renderCart() {
        var cart = getCart();
        var body = document.getElementById('cartBody');
        var totalEl = document.getElementById('cartTotal');
        if (!body) return;

        if (cart.length === 0) {
            body.innerHTML = '<p class="text-muted text-center mt-4">Your cart is empty.</p>';
            if (totalEl) totalEl.textContent = '$0.00';
            return;
        }

        var html = '';
        var total = 0;
        cart.forEach(function (item) {
            var subtotal = item.price * item.quantity;
            total += subtotal;
            html +=
                '<div class="cart-item d-flex align-items-center mb-3 pb-3 border-bottom border-secondary">' +
                    '<img src="' + item.image + '" alt="' + item.name + '" class="rounded me-3" style="width:60px;height:60px;object-fit:cover;">' +
                    '<div class="flex-grow-1">' +
                        '<h6 class="mb-0">' + item.name + '</h6>' +
                        '<small class="text-muted">$' + item.price.toFixed(2) + ' x ' + item.quantity + '</small>' +
                    '</div>' +
                    '<div class="d-flex align-items-center gap-2">' +
                        '<button class="btn btn-sm btn-outline-light cart-qty-btn" data-id="' + item.id + '" data-action="minus">-</button>' +
                        '<span>' + item.quantity + '</span>' +
                        '<button class="btn btn-sm btn-outline-light cart-qty-btn" data-id="' + item.id + '" data-action="plus">+</button>' +
                        '<button class="btn btn-sm btn-outline-danger cart-qty-btn ms-1" data-id="' + item.id + '" data-action="remove"><i class="bi bi-trash"></i></button>' +
                    '</div>' +
                '</div>';
        });
        body.innerHTML = html;
        if (totalEl) totalEl.textContent = '$' + total.toFixed(2);

        body.querySelectorAll('.cart-qty-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var id = parseInt(btn.getAttribute('data-id'));
                var action = btn.getAttribute('data-action');
                var cart = getCart();
                var item = cart.find(function (i) { return i.id === id; });
                if (!item) return;

                if (action === 'plus') item.quantity++;
                else if (action === 'minus') { item.quantity--; if (item.quantity <= 0) cart = cart.filter(function (i) { return i.id !== id; }); }
                else if (action === 'remove') cart = cart.filter(function (i) { return i.id !== id; });

                saveCart(cart);
                updateBadge();
                renderCart();
            });
        });
    }

    var checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            var cart = getCart();
            if (cart.length === 0) return;
            var total = cart.reduce(function (sum, item) { return sum + (item.price * item.quantity); }, 0);
            document.getElementById('checkoutTotal').textContent = '$' + total.toFixed(2);
        });
    }

    var confirmOrderBtn = document.getElementById('confirmOrderBtn');
    if (confirmOrderBtn) {
        confirmOrderBtn.addEventListener('click', function () {
            var checkoutForm = document.getElementById('checkoutForm');
            checkoutForm.classList.add('was-validated');
            if (!checkoutForm.checkValidity()) return;

            localStorage.removeItem(LS_CART);
            updateBadge();

            var checkoutModal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
            if (checkoutModal) checkoutModal.hide();
            var cartOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('cartOffcanvas'));
            if (cartOffcanvas) cartOffcanvas.hide();

            showToast('Order confirmed! Thank you for shopping with Loco Gym.', 'success');
        });
    }
});
