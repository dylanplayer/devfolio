import React, {useRef} from 'react';
import Layout from '@theme/Layout';
import './Contact.css';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_g9eclm9', 'template_l773nth', form.current, 'user_gQRV8vedyG2tqzE1V7MFi')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <Layout>
      <div className='contact'>
        <form ref={form} onSubmit={sendEmail}>
          <h1 className='form-title'>Contact</h1>
          <fieldset>
            <label>Name</label>
            <input type="text" name="user_name" />
          </fieldset>
          <fieldset>
            <label>Email</label>
            <input type="email" name="user_email" />
          </fieldset>
          <fieldset>
            <label>Message</label>
            <textarea name="message" />
          </fieldset>
          <input type="submit" value="Send" />
        </form>
      </div>
    </Layout>
  );
}

export default Contact;