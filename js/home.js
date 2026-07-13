document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('bgm');
    const soundbutton = document.querySelector('.sound');
    const transitionOverlay = document.querySelector('.transition-overlay');
    const heroSection = document.querySelector('.hero');
    const exploreButton = document.querySelector('.hero-button');
    const heroScrollButton = document.querySelector('.hero-scroll');
    const backToTopButton = document.querySelector('.section-nav-up');
    const targetSection = document.getElementById('galaxy-section');

    music.volume = 0.5; // Set the volume to 50%

    let playing = false;

    let transitionLocked = false;

    document.querySelectorAll('.navbar a[href="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });

    function setActiveSection(sectionName) {
        const showGalaxy = sectionName === 'galaxy';

        document.body.classList.toggle('is-galaxy-active', showGalaxy);

        if (heroSection) {
            heroSection.setAttribute('aria-hidden', showGalaxy ? 'true' : 'false');
        }

        if (targetSection) {
            targetSection.classList.add('is-revealed');
            targetSection.setAttribute('aria-hidden', showGalaxy ? 'false' : 'true');
        }
    }

    function playTransition(callback) {
        if (!transitionOverlay || transitionLocked) return;
        transitionLocked = true;
        transitionOverlay.classList.remove('is-hidden');
        transitionOverlay.classList.add('is-visible');

        window.setTimeout(function() {
            if (typeof callback === 'function') {
                callback();
            }
        }, 180);

        window.setTimeout(function() {
            transitionOverlay.classList.remove('is-visible');
            transitionOverlay.classList.add('is-hidden');
            transitionLocked = false;
        }, 580);
    }

    soundbutton.addEventListener('click', function(e) {
        e.preventDefault();
        if (!playing) {
            music.play().then(function() {
                soundbutton.textContent = '🔊';
                playing = true;
            }).catch(function(error) {
                console.error('Audio play error:', error);
            });
        } else {
            music.pause();
            soundbutton.textContent = '🔇';
            playing = false;
        }
    });

    function goToGalaxy(e) {
        if (e) {
            e.preventDefault();
        }

        if (!targetSection || transitionLocked || document.body.classList.contains('is-galaxy-active')) {
            return;
        }

        playTransition(function() {
            setActiveSection('galaxy');
        });
    }

    function goToHero(e) {
        if (e) {
            e.preventDefault();
        }

        if (!heroSection || transitionLocked || !document.body.classList.contains('is-galaxy-active')) {
            return;
        }

        playTransition(function() {
            setActiveSection('hero');
        });
    }

    if (exploreButton) {
        exploreButton.addEventListener('click', goToGalaxy);
    }

    if (heroScrollButton) {
        heroScrollButton.addEventListener('click', goToGalaxy);
    }

    if (backToTopButton) {
        backToTopButton.addEventListener('click', goToHero);
    }

    setActiveSection('hero');
});