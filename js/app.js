// ===== Loco Gym — Main App Logic =====

document.addEventListener('DOMContentLoaded', function () {

    // ---------- Notification Bell ----------
    var bell = document.getElementById('notifBell');
    var notifDropdown = document.getElementById('notifDropdown');

    if (bell && notifDropdown) {
        // Render notifications dynamically
        var notifBadge = document.getElementById('notifCount');
        var notifCount = DEFAULT_NOTIFICATIONS.length;
        if (notifBadge) {
            notifBadge.textContent = notifCount;
            notifBadge.style.display = notifCount > 0 ? 'inline-block' : 'none';
        }
        var html = '<div class="notif-title">Notifications <a href="#" id="markAllRead" class="float-end" style="font-size:12px;">Clear all</a></div>';
        DEFAULT_NOTIFICATIONS.forEach(function (n) {
            html += '<div class="notif-item"><i class="bi ' + escapeHTML(n.icon) + ' me-2"></i> ' + escapeHTML(n.message) + '</div>';
        });
        notifDropdown.innerHTML = html;

        bell.addEventListener('click', function (e) {
            e.stopPropagation();
            notifDropdown.classList.toggle('show');
        });

        document.addEventListener('click', function (e) {
            if (!notifDropdown.contains(e.target) && e.target !== bell) {
                notifDropdown.classList.remove('show');
            }
        });

        // Mark all as read
        var markAll = document.getElementById('markAllRead');
        if (markAll) {
            markAll.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                notifDropdown.innerHTML = '<div class="notif-title">Notifications</div><div class="notif-item text-muted">No new notifications</div>';
                if (notifBadge) notifBadge.style.display = 'none';
            });
        }
    }

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

    // ---------- Form Validation (general) ----------
    document.querySelectorAll('.needs-validation').forEach(function (form) {
        // Skip forms already handled by auth.js
        if (form.querySelector('#regName') || form.querySelector('#loginEmail')) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            e.stopPropagation();
            form.classList.add('was-validated');

            if (form.checkValidity() && form.classList.contains('contact-form')) {
                showToast('Message sent! We\'ll get back to you within 24 hours.', 'success');
                form.reset();
                form.classList.remove('was-validated');
            }
        });
    });

    // ---------- Contact form pre-fill if logged in ----------
    var currentUser = safeJSONParse(sessionStorage.getItem(SS_CURRENT));
    if (currentUser) {
        var contactName = document.getElementById('contactName');
        var contactEmail = document.getElementById('contactEmail');
        if (contactName && !contactName.value) contactName.value = currentUser.name;
        if (contactEmail && !contactEmail.value) contactEmail.value = currentUser.email;
    }
});

// ---------- Global Toast Helper ----------
function showToast(message, type) {
    var container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
    }

    var toastEl = document.createElement('div');
    toastEl.className = 'toast align-items-center text-bg-' + (type || 'primary') + ' border-0';
    toastEl.setAttribute('role', 'alert');
    toastEl.innerHTML =
        '<div class="d-flex">' +
            '<div class="toast-body">' + escapeHTML(message) + '</div>' +
            '<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>' +
        '</div>';

    container.appendChild(toastEl);
    var toast = new bootstrap.Toast(toastEl, { delay: 4000 });
    toast.show();
    toastEl.addEventListener('hidden.bs.toast', function () { toastEl.remove(); });
}
