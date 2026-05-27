import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faHouse, faPaperPlane, faSpinner, faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import SectionHeader from '../../atoms/SectionHeader/SectionHeader';
import Button from '../../atoms/Button/Button';
import styles from './Contact.module.css';

// ── EmailJS config (variables en .env) ──────────────────────
const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const STATUS = {
  IDLE:    'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR:   'error',
};

// ── Subcomponente: botón con estado ─────────────────────────
function SubmitButton({ status }) {
  const config = {
    [STATUS.IDLE]:    { icon: faPaperPlane,        text: 'Enviar mensaje',  spin: false },
    [STATUS.LOADING]: { icon: faSpinner,           text: 'Enviando…',       spin: true  },
    [STATUS.SUCCESS]: { icon: faCircleCheck,       text: '¡Enviado!',       spin: false },
    [STATUS.ERROR]:   { icon: faCircleExclamation, text: 'Error al enviar', spin: false },
  };
  const { icon, text, spin } = config[status];

  return (
    <Button
      type="submit"
      variant="primary"
      disabled={status === STATUS.LOADING}
      className={styles[`btn_${status}`]}
    >
      <FontAwesomeIcon icon={icon} spin={spin} />
      {text}
    </Button>
  );
}

// ── Componente principal ─────────────────────────────────────
const Contact = () => {
  const formRef = useRef(null);
  const [status,   setStatus]   = useState(STATUS.IDLE);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(STATUS.LOADING);
    setErrorMsg('');

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });
      setStatus(STATUS.SUCCESS);
      formRef.current.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      setErrorMsg('No se pudo enviar el mensaje. Inténtalo de nuevo.');
      setStatus(STATUS.ERROR);
    } finally {
      setTimeout(() => {
        setStatus(STATUS.IDLE);
        setErrorMsg('');
      }, 4000);
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <SectionHeader
        tag="// 05. contacto"
        title="Trabajemos juntos"
      />

      <div className={`${styles.wrapper} reveal`}>

        {/* ── Formulario ── */}
        <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>

          <div className={styles.group}>
            <input
              type="text"
              id="from_name"
              name="from_name"
              placeholder=" "
              required
            />
            <label htmlFor="from_name" className={styles.label}>Nombre</label>
          </div>

          <div className={styles.group}>
            <input
              type="email"
              id="from_email"
              name="from_email"
              placeholder=" "
              required
            />
            <label htmlFor="from_email" className={styles.label}>Email</label>
          </div>

          <div className={styles.group}>
            <textarea
              id="message"
              name="message"
              placeholder=" "
              required
            />
            <label htmlFor="message" className={styles.label}>Mensaje</label>
          </div>

          <SubmitButton status={status} />

          {status === STATUS.ERROR && (
            <p className={styles.errorMsg}>
              <FontAwesomeIcon icon={faCircleExclamation} />
              {errorMsg}
            </p>
          )}

        </form>

        {/* ── Redes sociales ── */}
        <div className={styles.socials}>
          <a href="https://github.com/jhonnysotab?tab=repositories" className={styles.socialLink} aria-label="GitHub" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://www.linkedin.com/in/jhonnysotabautista/" className={styles.socialLink} aria-label="LinkedIn" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://wa.me/34614970962?text=Hola%20%F0%9F%91%8B" className={styles.socialLink} aria-label="WhatsApp" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
          <a href="#" className={styles.socialLink} aria-label="Inicio">
            <FontAwesomeIcon icon={faHouse} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Contact;