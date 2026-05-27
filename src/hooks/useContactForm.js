// hooks/useContactForm.js
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const FORM_STATUS = {
  IDLE:    'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR:   'error',
};

export function useContactForm() {
  const formRef = useRef(null);
  const [status, setStatus]   = useState(FORM_STATUS.IDLE);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(FORM_STATUS.LOADING);
    setErrorMsg('');

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });
      setStatus(FORM_STATUS.SUCCESS);
      formRef.current.reset();
      // Reset to idle after 4s
      setTimeout(() => setStatus(FORM_STATUS.IDLE), 4000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setErrorMsg('No se pudo enviar el mensaje. Inténtalo de nuevo.');
      setStatus(FORM_STATUS.ERROR);
      setTimeout(() => setStatus(FORM_STATUS.IDLE), 4000);
    }
  }

  return { formRef, status, errorMsg, handleSubmit };
}