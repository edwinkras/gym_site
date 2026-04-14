// ===== Loco Gym — Search =====

document.addEventListener('DOMContentLoaded', function () {
    var searchInput = document.getElementById('searchInput');
    var searchResults = document.getElementById('searchResults');
    if (!searchInput || !searchResults) return;

    var searchTimer = null;
    searchInput.addEventListener('input', function () {
        clearTimeout(searchTimer);
        var query = searchInput.value.trim().toLowerCase();
        if (query.length < 2) {
            searchResults.classList.remove('show');
            searchResults.innerHTML = '';
            return;
        }
        searchTimer = setTimeout(function () { performSearch(query); }, 250);
    });

    function performSearch(query) {

        var results = [];

        // Search products
        PRODUCTS.forEach(function (p) {
            if (p.name.toLowerCase().indexOf(query) !== -1 || p.description.toLowerCase().indexOf(query) !== -1 || p.category.toLowerCase().indexOf(query) !== -1) {
                results.push({ type: 'Product', icon: 'bi-cart3', name: p.name, detail: '$' + p.price.toFixed(2), link: 'store.html' });
            }
        });

        // Search trainers
        TRAINERS.forEach(function (t) {
            if (t.name.toLowerCase().indexOf(query) !== -1 || t.specialty.toLowerCase().indexOf(query) !== -1 || t.category.toLowerCase().indexOf(query) !== -1 || t.bio.toLowerCase().indexOf(query) !== -1) {
                results.push({ type: 'Trainer', icon: 'bi-person-badge', name: t.name, detail: t.specialty, link: 'trainers.html' });
            }
        });

        // Search locations
        LOCATIONS.forEach(function (l) {
            if (l.name.toLowerCase().indexOf(query) !== -1 || l.address.toLowerCase().indexOf(query) !== -1 || l.area.toLowerCase().indexOf(query) !== -1) {
                results.push({ type: 'Location', icon: 'bi-geo-alt', name: l.name, detail: l.area.charAt(0).toUpperCase() + l.area.slice(1), link: 'locations.html' });
            }
        });

        // Search memberships
        MEMBERSHIPS.forEach(function (m) {
            if (m.tier.toLowerCase().indexOf(query) !== -1 || m.features.join(' ').toLowerCase().indexOf(query) !== -1) {
                results.push({ type: 'Membership', icon: 'bi-star', name: m.tier + ' Plan', detail: '$' + m.price.toFixed(2) + '/month', link: 'memberships.html' });
            }
        });

        // Render results
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
            searchResults.classList.add('show');
            return;
        }

        var html = '';
        var shown = results.slice(0, 8);
        shown.forEach(function (r) {
            html +=
                '<a href="' + escapeHTML(r.link) + '" class="search-result-item" role="option">' +
                    '<i class="bi ' + escapeHTML(r.icon) + ' me-2"></i>' +
                    '<div class="flex-grow-1">' +
                        '<div class="search-result-name">' + escapeHTML(r.name) + '</div>' +
                        '<small class="search-result-detail">' + escapeHTML(r.detail) + '</small>' +
                    '</div>' +
                    '<span class="badge bg-secondary">' + escapeHTML(r.type) + '</span>' +
                '</a>';
        });
        if (results.length > 8) {
            html += '<div class="search-more">' + (results.length - 8) + ' more results...</div>';
        }
        searchResults.innerHTML = html;
        searchResults.classList.add('show');
    }

    // Close search results when clicking outside
    document.addEventListener('click', function (e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('show');
        }
    });

    // Close on Escape key
    searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            searchResults.classList.remove('show');
            searchInput.blur();
        }
    });

    // Prevent form submit from reloading page
    var searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
        });
    }
});
