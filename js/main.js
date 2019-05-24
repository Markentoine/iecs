'use strict'
const rellax = new Rellax('.rellax');

document.addEventListener('DOMContentLoaded', () => {
    const windowWidth = window.innerWidth;
    const subtitle = document.getElementById('subtitle');
    
    if (windowWidth <= 800) {
        const contactMail = document.getElementById('iecsFR');
        contactMail.remove();
    }
    const fadeOUtSubtitle = e => {
        const unitOpacity = 1 / 500;
        const opa = unitOpacity * window.scrollY;
        console.log(opa)
        if (opa >= 1) {
            subtitle.style.opacity = 0;
        } else {
            subtitle.style.opacity = `${1 - opa}`;
        }
    }
    document.onscroll = fadeOUtSubtitle;
})