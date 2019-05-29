'use strict'

const rellax = new Rellax('.rellax');
const year = new Date().getUTCFullYear();

document.addEventListener('DOMContentLoaded', () => {
    const windowWidth = window.innerWidth;
    const subtitle = document.getElementById("subtitle");
    const logoHead = document.getElementById("logo-head");
    const yearEl = document.getElementById("year");
    const mentions = document.getElementById('mentions');
    const mentionsText = document.getElementById('mentions-text');
    const footer = document.getElementsByTagName('footer')[0];
    const main = document.getElementsByTagName('main')[0];
    const mentionExplanations = document.getElementById('mentions-text');
    const helpers = {
        fadeOUtSubtitle: e => {
            const unitOpacity = 1 / 500;
            const opa = unitOpacity * window.scrollY;
            if (opa >= 1) {
                subtitle.style.opacity = 0;
            } else {
                subtitle.style.opacity = `${1 - opa}`;
            }
        },

        revealMentions: e => {
            main.style.display = 'none';
            const overlay = document.createElement('div');
            overlay.id = 'overlay';
            document.body.insertBefore(overlay, footer);
            overlay.append(mentionExplanations);
            mentionExplanations.style.display = 'flex';

            const buttonRevenir = document.getElementById('revenir-site');
            buttonRevenir.onclick = helpers.revenirSite;
        },

        revenirSite: e => {
            const overlay = document.getElementById('overlay');
            overlay.remove();
            main.style.display = 'flex';
        },

    };

    mentionsText.remove();

    // set date
    yearEl.textContent = year;

    // mentions légales
    mentions.onclick = helpers.revealMentions;


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

    document.onscroll = helpers.fadeOUtSubtitle;
})