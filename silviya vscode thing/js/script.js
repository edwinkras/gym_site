// ===== Loco Gym — JavaScript =====

// ---------- Notification Bell ----------
document.addEventListener('DOMContentLoaded', function () {

    // Toggle notification dropdown
    const bell = document.getElementById('notifBell');
    const dropdown = document.getElementById('notifDropdown');

    if (bell && dropdown) {
        bell.addEventListener('click', function (e) {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });

        document.addEventListener('click', function (e) {
            if (!dropdown.contains(e.target) && e.target !== bell) {
                dropdown.classList.remove('show');
            }
        });
    }

    // ---------- Store Cart ----------
    const cartBadge = document.getElementById('cartCount');
    let cartCount = 0;

    document.querySelectorAll('.btn-add-cart').forEach(function (btn) {
        btn.addEventListener('click', function () {
            cartCount++;
            if (cartBadge) {
                cartBadge.textContent = cartCount;
                cartBadge.style.display = 'inline-block';
            }
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

    // ---------- Busy Meter (simulated) ----------
    document.querySelectorAll('.busy-meter-bar').forEach(function (bar) {
        var level = parseInt(bar.getAttribute('data-busy'));
        bar.style.width = level + '%';
        if (level <= 40) {
            bar.classList.add('busy-low');
        } else if (level <= 70) {
            bar.classList.add('busy-medium');
        } else {
            bar.classList.add('busy-high');
        }
    });

    // ---------- Trainer Category Filter ----------
    document.querySelectorAll('.trainer-category-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.trainer-category-btn').forEach(function (b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            var category = btn.getAttribute('data-category');
            document.querySelectorAll('.trainer-item').forEach(function (card) {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ---------- Form Validation ----------
    var forms = document.querySelectorAll('.needs-validation');
    forms.forEach(function (form) {
        form.addEventListener('submit', function (e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // ---------- Location Filter ----------
    var locationFilter = document.getElementById('locationFilter');
    if (locationFilter) {
        locationFilter.addEventListener('change', function () {
            var selected = this.value;
            document.querySelectorAll('.location-item').forEach(function (loc) {
                if (selected === 'all' || loc.getAttribute('data-area') === selected) {
                    loc.style.display = 'block';
                } else {
                    loc.style.display = 'none';
                }
            });
        });
    }
});
