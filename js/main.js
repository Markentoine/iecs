'use strict'
const rellax = new Rellax('.rellax');

document.addEventListener('DOMContentLoaded', () => {
    const subtitle = document.getElementById('subtitle');
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