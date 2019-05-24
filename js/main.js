'use strict'

const rellax = new Rellax('.rellax');

document.addEventListener('DOMContentLoaded', () => {
    const windowWidth = window.innerWidth;
    const subtitle = document.getElementById('subtitle');
    const logoHead = document.getElementById("logo-head");

    // behavior for mobile devices ----------------------

    if (windowWidth <= 800) {
        const contactMail = document.getElementById('iecsFR');
        contactMail.remove();

        const icons = document.getElementsByClassName('icon-clef');
        console.log([...icons].map(e => e.firstElementChild).map(e => e.atttibutes))
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