// Takes care of the registration and login of users, which then depending on the outcome, will change the output of the website + add new functions (although very small)

document.addEventListener('DOMContentLoaded', function () {

    var currentUser = JSON.parse(sessionStorage.getItem(SS_CURRENT));
    var loginBtn = document.querySelector('.btn-login');

    if (currentUser && loginBtn) {
        var li = loginBtn.parentElement;
        li.innerHTML =
            '<div class="dropdown">' +
                '<button class="btn btn-login dropdown-toggle" data-bs-toggle="dropdown">' +
                    '<i class="bi bi-person-circle me-1"></i> ' + currentUser.name.split(' ')[0] +
                '</button>' +
                '<ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end">' +
                    '<li><span class="dropdown-item-text"><strong>' + currentUser.name + '</strong></span></li>' +
                    '<li><span class="dropdown-item-text text-muted">Plan: ' + currentUser.plan.charAt(0).toUpperCase() + currentUser.plan.slice(1) + '</span></li>' +
                    '<li><hr class="dropdown-divider"></li>' +
                    '<li><a class="dropdown-item" href="#" id="logoutBtn"><i class="bi bi-box-arrow-right me-1"></i> Logout</a></li>' +
                '</ul>' +
            '</div>';

        document.getElementById('logoutBtn').addEventListener('click', function (e) {
            e.preventDefault();
            sessionStorage.removeItem(SS_CURRENT);
            window.location.reload();
        });
    }

    var regForm = document.getElementById('regName') ? document.querySelector('.needs-validation') : null;
    if (regForm && document.getElementById('regName')) {
        var urlParams = new URLSearchParams(window.location.search);
        var planParam = urlParams.get('plan');
        if (planParam) {
            var planSelect = document.getElementById('regPlan');
            if (planSelect) planSelect.value = planParam;
        }

        regForm.addEventListener('submit', function (e) {
            e.preventDefault();
            e.stopPropagation();

            var name = document.getElementById('regName').value.trim();
            var email = document.getElementById('regEmail').value.trim();
            var phone = document.getElementById('regPhone').value.trim();
            var plan = document.getElementById('regPlan').value;
            var password = document.getElementById('regPassword').value;
            var confirm = document.getElementById('regConfirm').value;

            var confirmField = document.getElementById('regConfirm');
            if (password !== confirm) {
                confirmField.setCustomValidity('Passwords do not match');
            } else {
                confirmField.setCustomValidity('');
            }

            regForm.classList.add('was-validated');
            if (!regForm.checkValidity()) return;

            var users = JSON.parse(localStorage.getItem(LS_USERS)) || [];
            var exists = users.some(function (u) { return u.email === email; });
            if (exists) {
                showAuthAlert(regForm, 'An account with this email already exists.', 'danger');
                return;
            }

            users.push({ name: name, email: email, phone: phone, plan: plan, password: password, createdAt: new Date().toISOString() });
            localStorage.setItem(LS_USERS, JSON.stringify(users));
            sessionStorage.setItem(SS_CURRENT, JSON.stringify({ name: name, email: email, plan: plan }));
            showAuthAlert(regForm, 'Account created! Redirecting...', 'success');
            setTimeout(function () { window.location.href = 'index.html'; }, 1500);
        });

        document.getElementById('regConfirm').addEventListener('input', function () {
            this.setCustomValidity('');
        });
    }

    var loginEmail = document.getElementById('loginEmail');
    if (loginEmail) {
        var loginForm = loginEmail.closest('form');

        var remembered = localStorage.getItem(LS_REMEMBERED);
        if (remembered) {
            loginEmail.value = remembered;
            var rememberBox = document.getElementById('rememberMe');
            if (rememberBox) rememberBox.checked = true;
        }

        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            e.stopPropagation();
            loginForm.classList.add('was-validated');
            if (!loginForm.checkValidity()) return;

            var email = loginEmail.value.trim();
            var password = document.getElementById('loginPassword').value;
            var remember = document.getElementById('rememberMe').checked;

            var users = JSON.parse(localStorage.getItem(LS_USERS)) || [];
            var user = users.find(function (u) { return u.email === email && u.password === password; });

            if (!user) {
                showAuthAlert(loginForm, 'Invalid email or password.', 'danger');
                return;
            }

            sessionStorage.setItem(SS_CURRENT, JSON.stringify({ name: user.name, email: user.email, plan: user.plan }));

            if (remember) {
                localStorage.setItem(LS_REMEMBERED, email);
            } else {
                localStorage.removeItem(LS_REMEMBERED);
            }

            showAuthAlert(loginForm, 'Welcome back, ' + user.name.split(' ')[0] + '! Redirecting...', 'success');
            setTimeout(function () { window.location.href = 'index.html'; }, 1500);
        });
    }

    function showAuthAlert(form, message, type) {
        var old = form.querySelector('.auth-alert');
        if (old) old.remove();
        var div = document.createElement('div');
        div.className = 'alert alert-' + type + ' mt-3 auth-alert';
        div.textContent = message;
        form.appendChild(div);
        if (type === 'danger') {
            setTimeout(function () { div.remove(); }, 4000);
        }
    }
});
