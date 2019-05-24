'use strict'

let rellax = new Rellax('.rellax');

document.addEventListener('DOMContentLoaded', () => {
    const windowWidth = window.innerWidth;
    const subtitle = document.getElementById("subtitle");
    const logoHead = document.getElementById("logo-head");

    // behavior for mobile devices ----------------------

    if (windowWidth <= 800) {
        const contactMail = document.getElementById('iecsFR');
        contactMail.remove();

        // change svg icons size
        const icons = document.getElementsByClassName('icon-clef');
        [...icons].map(e => e.firstElementChild).forEach(e => {
            e.setAttribute('width', 72);
            e.setAttribute('height', 72);
        });

        //remove rellax effect
        const rellaxedEls = document.getElementsByClassName('rellax');
        [...rellaxedEls].forEach(el => {
            el.classList.remove('rellax');
            el.dataset.rellaxSpeed = ""
        });
        rellax.destroy();
    }

    logoHead.onclick = () => window.scroll(0, 0);

    // --------------------------------------------------

    const effects = {
        fadeOUtSubtitle: e => {
            const unitOpacity = 1 / 500;
            const opa = unitOpacity * window.scrollY;
            if (opa >= 1) {
                subtitle.style.opacity = 0;
            } else {
                subtitle.style.opacity = `${1 - opa}`;
            }
        },

    };



    document.onscroll = effects.fadeOUtSubtitle;
})