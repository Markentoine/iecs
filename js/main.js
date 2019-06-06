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
    const contactForm = document.getElementById('contact-form');
    const form = document.getElementById('form-contact');
    const envoi = document.getElementById('envoyer');
    const message = document.getElementById('message');
    const validInputColor = '#5CDB95';
    const invalidInputColor = '#FC4445';
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
            overlay.append(mentionExplanations);
            document.body.insertBefore(overlay, footer);
            mentionExplanations.style.display = 'flex';

            const buttonRevenir = document.getElementById('revenir-site');
            buttonRevenir.onclick = helpers.revenirSite;
            logoHead.onclick = helpers.revenirSite;
            mentions.removeEventListener('click', helpers.revealMentions);
            setTimeout(() => {
                window.scroll(0, 0);
            }, 250);
        },

        revenirSite: e => {
            const overlay = document.getElementById('overlay');
            overlay.remove();
            main.style.display = 'flex';
            logoHead.onclick = () => window.scroll(0, 0);
            mentions.addEventListener('click', helpers.revealMentions);
        },

        controlInput: e => {
            const target = e.target;
            const inputValue = target.value;
            document.getElementById('errors').textContent = '';
            if (target.id === 'firstname' || target.id === 'lastname') {
                if (inputValue.match(/^[A-Za-zÀ-ÖØ-öø-ÿ\-\s]+$/)) {
                    target.style.borderColor = validInputColor;
                } else {
                    target.style.borderColor = invalidInputColor;
                }
            } else if (target.id === 'telephone') {
                if (inputValue.match(/^\+?[0-9]+$/)) {
                    target.style.borderColor = validInputColor;
                } else {
                    target.style.borderColor = invalidInputColor;
                }
            } else if (target.id === 'mail') {
                if (inputValue.match(/^.+@.+$/)) {
                    target.style.borderColor = validInputColor;
                } else {
                    target.style.borderColor = invalidInputColor;
                }
            }

        },

        controlSubmission: e => {
            e.preventDefault();
            e.stopPropagation();
            let submit = true
            const errorMessage = document.getElementById('errors');
            const elementsToCheck = [...form.elements].filter(el => {
                const fieldsToCheck = ['firstname', 'lastname', 'mail', 'telephone'];
                return !!fieldsToCheck.find(field => field === el.name)
            });
            if (message.value === '') {
                errorMessage.textContent = 'Veuillez entrer un message.';
                submit = false;
            }
            elementsToCheck.forEach(el => {
                if (el.value === '') {
                    errorMessage.textContent = 'Veuillez vérifier vos informations.'
                    el.style.borderColor = invalidInputColor;
                    submit = false;
                }
            });
            if (submit) {
                const submitEvent = new Event('submit');
                const formName = [...document.getElementsByTagName('input')].find(input => input.name === 'form-name');
                formName.value = 'contact-iecs';
                console.log('formName', formName);
                form.dispatchEvent(submitEvent);
            }
        },

        resetFormFields: form => {
            const elements = [...form.elements];
            const inputFields = elements.slice(0, elements.length - 1); // excludes the submit button
            inputFields.slice(0).forEach(el => {
                el.value = '';
            })
        },

    };

    mentionsText.remove();

    // set date
    yearEl.textContent = year;

    // mentions légales
    mentions.addEventListener('click', helpers.revealMentions);

    // control input before validation
    helpers.resetFormFields(form);
    contactForm.addEventListener('keyup', helpers.controlInput);

    // control submission of the form
    envoi.addEventListener('click', helpers.controlSubmission);
    form.addEventListener('submit');

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