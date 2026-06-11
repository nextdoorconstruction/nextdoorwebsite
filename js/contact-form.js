/**
 * contact-form.js — NextDoor Constructions LLP
 *
 * Handles the contact form on contact.html:
 *  - Client-side validation
 *  - Submits to Web3Forms API
 *  - Shows success / error toast notifications
 *
 * ─────────────────────────────────────────────
 * SETUP:
 *   1. Go to https://web3forms.com/ and sign up for free.
 *   2. Get your unique Access Key from the dashboard.
 *   3. Replace the string 'YOUR_WEB3FORMS_ACCESS_KEY' below.
 * ─────────────────────────────────────────────
 */

'use strict';

// FormSubmit doesn't require an access key in the same way, we use the email directly.

/**
 * Show a toast notification.
 * @param {string} message - Message to display
 * @param {'success'|'error'} type
 */
function showToast(message, type = 'success') {
  const toast = document.getElementById('form-toast');
  if (!toast) return;

  toast.textContent = message;
  toast.className = ''; // Reset classes
  toast.style.display = ''; // Clear inline display:none
  toast.classList.add(type);

  setTimeout(() => {
    toast.style.display = 'none';
  }, 5000);
}

/**
 * Validate required form fields.
 * @param {HTMLFormElement} form
 * @returns {boolean} isValid
 */
function validateForm(form) {
  let isValid = true;

  form.querySelectorAll('[required]').forEach(field => {
    const errorEl = document.getElementById(`${field.id}-error`);

    if (!field.value.trim()) {
      field.classList.add('border-red-500');
      if (errorEl) errorEl.textContent = 'This field is required.';
      isValid = false;
    } else {
      field.classList.remove('border-red-500');
      if (errorEl) errorEl.textContent = '';
    }
  });

  // Email format check
  const emailField = form.querySelector('#contact-email');
  if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
    emailField.classList.add('border-red-500');
    const errorEl = document.getElementById('contact-email-error');
    if (errorEl) errorEl.textContent = 'Please enter a valid email address.';
    isValid = false;
  }

  return isValid;
}

/**
 * initContactForm — called from main.js on DOMContentLoaded.
 */
function initContactForm() {
  const form       = document.getElementById('contact-form');
  const submitBtn  = document.getElementById('contact-submit-btn');
  const btnText    = document.getElementById('submit-btn-text');

  if (!form) return; // Not on the contact page

  form.addEventListener('submit', (e) => {
    if (!validateForm(form)) {
      e.preventDefault(); // Stop submission if invalid
      return;
    }

    // UI: loading state
    if (btnText)   btnText.textContent = 'Sending…';
    
    // We intentionally DO NOT disable the submit button here, because disabling it 
    // instantly can cause some browsers (like Chrome/Safari) to abort the native form submission.

    // Form is valid. The browser will now submit the form natively 
    // to the action URL (Formspree) and redirect the user.
  });
}
