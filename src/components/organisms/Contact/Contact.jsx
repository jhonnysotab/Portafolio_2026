import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faHouse, faPaperPlane, faSpinner, faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import SectionHeader from '../../atoms/SectionHeader/SectionHeader';
import Button from '../../atoms/Button/Button';
import { useLanguage } from '../../../hooks/useLanguage';
import profile from '../../../data/profile.json';
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
function SubmitButton({ status, labels }) {
  const config = {
    [STATUS.IDLE]:    { icon: faPaperPlane,        text: labels.send,    spin: false },
    [STATUS.LOADING]: { icon: faSpinner,           text: labels.sending, spin: true  },
    [STATUS.SUCCESS]: { icon: faCircleCheck,       text: labels.sent,    spin: false },
    [STATUS.ERROR]:   { icon: faCircleExclamation, text: labels.error,   spin: false },
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
  const { t } = useLanguage();
  const labels = t('contact');
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
      setErrorMsg(labels.errorMsg);
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
        tag={labels.tag}
        title={labels.title}
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
            <label htmlFor="from_name" className={styles.label}>{labels.name}</label>
          </div>

          <div className={styles.group}>
            <input
              type="email"
              id="from_email"
              name="from_email"
              placeholder=" "
              required
            />
            <label htmlFor="from_email" className={styles.label}>{labels.email}</label>
          </div>

          <div className={styles.group}>
            <textarea
              id="message"
              name="message"
              placeholder=" "
              required
            />
            <label htmlFor="message" className={styles.label}>{labels.message}</label>
          </div>

          <SubmitButton status={status} labels={labels} />

          {status === STATUS.ERROR && (
            <p className={styles.errorMsg}>
              <FontAwesomeIcon icon={faCircleExclamation} />
              {errorMsg}
            </p>
          )}

        </form>

        {/* ── Redes sociales ── */}
        <div className={styles.socials}>
          <a href={profile.social.github} className={styles.socialLink} aria-label="GitHub" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href={profile.social.linkedin} className={styles.socialLink} aria-label="LinkedIn" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href={profile.social.whatsapp} className={styles.socialLink} aria-label="WhatsApp" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
          <a href={profile.social.home} className={styles.socialLink} aria-label="Home">
            <FontAwesomeIcon icon={faHouse} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Contact;
