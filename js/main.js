document.addEventListener('DOMContentLoaded', function() {
	const dropdownToggles = document.querySelectorAll('.menu .dropdown > .menu-dropdown-toggle');
	if (!dropdownToggles.length) {
		return;
	}

	function closeAllDropdowns() {
		document.querySelectorAll('.menu .dropdown.is-open').forEach(function(dropdown) {
			dropdown.classList.remove('is-open');
			const toggle = dropdown.querySelector('.menu-dropdown-toggle');
			if (toggle) {
				toggle.setAttribute('aria-expanded', 'false');
			}
		});
	}

	dropdownToggles.forEach(function(toggle) {
		toggle.addEventListener('click', function(e) {
			e.preventDefault();
			const dropdown = toggle.closest('.dropdown');
			if (!dropdown) {
				return;
			}

			const willOpen = !dropdown.classList.contains('is-open');
			closeAllDropdowns();

			if (willOpen) {
				dropdown.classList.add('is-open');
				toggle.setAttribute('aria-expanded', 'true');
			}
		});
	});

	document.addEventListener('click', function(e) {
		if (!e.target.closest('.menu .dropdown')) {
			closeAllDropdowns();
		}
	});

	document.addEventListener('keydown', function(e) {
		if (e.key === 'Escape') {
			closeAllDropdowns();
		}
	});
});
