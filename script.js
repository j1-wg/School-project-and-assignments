// script.js - Universal cookie and filter functions

// Helper functions for cookies
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
}

function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Filter functionality (specific to models.html)
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const carItems = document.querySelectorAll('.car-item');
    const categoryHeaders = document.querySelectorAll('h3.italianno-regular');
    const modelGrids = document.querySelectorAll('.models-grid');

    if (filterButtons.length > 0) { // Only run if elements exist (for models.html)
        // Function to apply filter
        function applyFilter(filter) {
            carItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });

            modelGrids.forEach(grid => {
                const hasVisibleItems = Array.from(grid.querySelectorAll('.car-item')).some(item => !item.classList.contains('hidden'));
                const header = grid.previousElementSibling;
                if (hasVisibleItems) {
                    grid.style.display = 'grid';
                    if (header && header.tagName === 'H3') {
                        header.style.display = 'block';
                    }
                } else {
                    grid.style.display = 'none';
                    if (header && header.tagName === 'H3') {
                        header.style.display = 'none';
                    }
                }
            });

            // Update active button
            filterButtons.forEach(btn => {
                if (btn.getAttribute('data-filter') === filter) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }

        // Load saved filter on page load
        const savedFilter = getCookie('selectedFilter') || 'all';
        applyFilter(savedFilter);

        // Handle filter button clicks
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                setCookie('selectedFilter', filter, 7);
                applyFilter(filter);
            });
        });
    }
});