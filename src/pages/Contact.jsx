import React, {useRef, useState} from 'react';
import Layout from '@theme/Layout';
import './Contact.css';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = (e) => {
    setIsLoading(true);
    e.preventDefault();

    emailjs.sendForm('service_g9eclm9', 'template_y162jwf', form.current, 'user_gQRV8vedyG2tqzE1V7MFi')
      .then((result) => {
          setResult(result.text);
          setIsLoading(false);
          console.log(result)
      }, (error) => {
          console.log(error.text);
    });
  };

  const formMarkup = (
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
      <input type="submit" value="Send"/>
      {isLoading ? loadingMarkup : <></>}
    </form>
  );

  const successMarkup = (
    <div className='success-container'>
      <h1 className='success-title'>🎉 Successfuly Sent 🎉</h1>
    </div>
  );

  const loadingMarkup = (
      <div className='loader'>Loading...</div>
  );
  
  return (
    <Layout>
      <div className='contact'>
        {result == 'OK' ? successMarkup : formMarkup }
      </div>
    </Layout>
  );
}

export default Contact;