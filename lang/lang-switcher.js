function applyLang(langObj) {
    const langCode = langObj === th ? 'th' : 'en';
    document.documentElement.lang = langCode;

    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        const key = el.getAttribute('data-i18n');
        if (!key) return;
        const val = langObj[key];
        if (typeof val === 'undefined') return;

        if (el.getAttribute('data-i18n-html') === 'true') {
            el.innerHTML = val;
            return;
        }

        el.textContent = val;
    });
}

(function initLangSwitcher(){
    console.log('lang-switcher initialized');
    console.log('en defined:', typeof en, 'th defined:', typeof th);

    // apply stored selection or default
    try {
        const stored = localStorage.getItem('site_lang');
        if (stored === 'th' && typeof th !== 'undefined') {
            applyLang(th);
            console.log('applied stored lang: th');
        } else if (stored === 'en' && typeof en !== 'undefined') {
            applyLang(en);
            console.log('applied stored lang: en');
        } else {
            if (typeof en !== 'undefined') { applyLang(en); console.log('applied default lang: en'); }
            else if (typeof th !== 'undefined') { applyLang(th); console.log('applied default lang: th'); }
        }
    } catch (err) {
        console.warn('lang restore error', err);
        if (typeof en !== 'undefined') applyLang(en);
    }

    // delegated click handler for language links
    document.addEventListener('click', function(e) {
        const link = e.target.closest('.dropdown-menu a[data-lang]');
        if (!link) return;
        e.preventDefault();
        const code = link.getAttribute('data-lang');
        console.log('lang switch click:', code);
        if (code === 'en' && typeof en !== 'undefined') applyLang(en);
        if (code === 'th' && typeof th !== 'undefined') applyLang(th);
        try { localStorage.setItem('site_lang', code); } catch (err) {}
    });
})();
