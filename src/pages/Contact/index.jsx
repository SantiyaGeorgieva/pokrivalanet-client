import React, { useEffect, useState, useRef } from 'react'
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import GoogleMapRuse from '../../components/GoogleMapRuse';
import Hr from '../../components/Hr';
import PageTitle from '../../components/PageTitle';
import { removeSpaces } from '../../utils';
import Message from '../../components/Message';
import ReCAPTCHA from 'react-google-recaptcha';
import { googleSecretApiKey, googleSiteKey } from '../../config/configApi';

import './contact.scss';

function Contact({ hideMain, isMobile }) {
  PageTitle('Информация за Контакти | Покривала НЕТ');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [values, setValues] = useState([]);
  const [hasNameError, setNameError] = useState(false);
  const [hasEmailError, setEmailError] = useState(false);
  const [hasSubjectError, setSubjectError] = useState(false);
  const [hasMessageError, setMessageError] = useState(false);
  const [isLoaderLoad, setLoaderLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const captchaRef = useRef(null);

  const [messageCaptcha, setMessageCaptcha] = useState('');
  const [error, setError] = useState('');

  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  useEffect(() => {
    if (!hasNameError && !hasEmailError && !hasSubjectError && !hasMessageError && messageCaptcha.length > 0) {
      setValues([{ name, email, subject, message }]);
    }
  }, [name, email, subject, message, messageCaptcha])

  const verifyToken = async (token) => {
    try {
      let response = await fetch(`http://localhost:8080/verify-token`, {
        method: 'POST',
        secret: googleSecretApiKey,
        token
      });
      return response;
    }
    catch (error) {
      console.log("error ", error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessageCaptcha('');

    let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    let nameValue = removeSpaces(name);
    let subjectValue = removeSpaces(message);
    let emailaddressVal = email;
    let token = captchaRef.current.getValue();

    if (nameValue === '') {
      setNameError(true);
    } else if (nameValue !== '') {
      setNameError(false);
      setName(nameValue);
    }

    if (subjectValue === '') {
      setSubjectError(true);
    } else if (subjectValue !== '') {
      setSubjectError(false);
    }

    if (message === '') {
      setMessageError(true);
    } else if (message !== '') {
      setMessageError(false);
    }

    if (emailaddressVal === '') {
      setEmailError(true);
    } else if (emailaddressVal !== '') {
      setEmailError(false);
    }

    if (!emailReg.test(emailaddressVal)) {
      setEmailError(true);
    }

    if (token) {
      let valid_token = await verifyToken(token);

      if (valid_token?.status === 200) {
        setMessageCaptcha('Успешно валидиране на токъна! Моля, продължете с изпращането на формата');

        if (values && values.length > 0) {
          fetchMessage();
        }
      } else {
        setError("Съжалявам! Токъна е невалиден");
      }
    } else {
      setError("Трябва да потвърдите, че не сте робот");
    }
  }

  const fetchMessage = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8080/contact', {
      method: "POST",
      body: JSON.stringify(values[0]),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      responseType: 'json'
    }).then((response) => {
      if (response.status === 200) {
        setValues([]);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setVisible(true);
        setLoading(false);
        setMessageCaptcha('');
        window.grecaptcha.reset();
      } else if (response.status === '400') {
        console.log("Message failed to send.", response)
      }
    });

    return response;
  }

  return <>
    {!hideMain && (<>
      <div className={`container ${!isMobile ? 'my-5' : ''}`}>
        <Row>
          <Col md="6">
            <div className="d-flex flex-column text-start">
              <p className="mb-1"><i className="fa-solid fa-location-dot my-2 pe-2" />гр. Русе, ул. „Тракция“ 10</p>
              <p className="mb-1"><i className="fa fa-phone my-2 pe-2" />+359 877 614 031,</p>
              <p className="mb-1"><i className="fa fa-phone my-2 pe-2" />+359 877 614 029,</p>
              <p className="mb-2"><i className="fa fa-phone my-2 pe-2" />+359 877 062 082</p>
            </div>
            {!isMobile &&
              <div className="d-flex flex-column text-start mt-3">
                <p className="mb-1"><i className="fa-solid fa-location-dot my-2 pe-2" />гр. Пловдив</p>
                <p className="mb-2"><i className="fa fa-phone my-2 pe-2" />+359 877 614 031</p>
                <p className="mb-2"><i className="fa-solid fa-envelope my-2 pe-2" />office@pokrivala.net</p>
              </div>
            }
          </Col>
          <Col md="6" className={`container ${isLoaderLoad ? 'text-end' : ''}`}>
            <GoogleMapRuse isLoaderLoad={isLoaderLoad} setLoaderLoad={setLoaderLoad} />
          </Col>
        </Row>
        {isMobile &&
          <Row>
            <Col md="6">
              <div className="d-flex flex-column text-start mt-3">
                <p className="mb-1"><i className="fa-solid fa-location-dot my-2 pe-2" />гр. Пловдив</p>
                <p className="mb-2"><i className="fa fa-phone my-2 pe-2" />+359 877 614 031</p>
                <p className="mb-2"><i className="fa-solid fa-envelope my-2 pe-2" />office@pokrivala.net</p>
              </div>
            </Col>
          </Row>
        }
        <Hr text="Контакти" />
        <Row className={`{d-flex align-items-center justify-content-center ${isMobile ? 'mb-5' : ''}`}>
          <Col md="4">
            <Form onSubmit={(e) => handleSubmit(e)} method="POST">
              <FormGroup className="text-start mb-2">
                <Label for="exampleEmail">Имена</Label>
                <Input type="text" name="name" onChange={e => setName(e.target.value)} value={name} invalid={hasNameError} />
                {hasNameError && <FormFeedback>Моля, въведете вашите имена.</FormFeedback>}
              </FormGroup>
              <FormGroup className="text-start mb-2">
                <Label for="email">Имейл</Label>
                <Input type="text" onChange={e => setEmail(e.target.value)} name="email" value={email} invalid={hasEmailError} />
                {hasEmailError && <FormFeedback>Моля, въведете вашия имейл адрес.</FormFeedback>}
              </FormGroup>
              <FormGroup className="text-start mb-2">
                <Label for="subject">Относно</Label>
                <Input type="text" onChange={e => setSubject(e.target.value)} name="subject" value={subject} invalid={hasSubjectError} />
                {hasSubjectError && <FormFeedback>Моля, въведете вашата тема.</FormFeedback>}
              </FormGroup>
              <FormGroup className="text-start mb-2">
                <Label for="exampleText">Съобщение</Label>
                <Input
                  id="exampleText"
                  name="message"
                  type="textarea"
                  value={message}
                  invalid={hasMessageError}
                  onChange={e => setMessage(e.target.value)}
                />
                {hasMessageError && <FormFeedback>Моля, въведете вашето запитване.</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <ReCAPTCHA sitekey={googleSiteKey} ref={captchaRef} />
              </FormGroup>
              {error && <p className="text-start textError fs-14">Грешка! {error}</p>}
              {messageCaptcha && <p className="text-start textSuccess fs-14">{messageCaptcha}</p>}
              <FormGroup>
                <Button type="submit" outline className="d-flex text-start mt-4" id="btn-submit" disabled={loading}>
                  {loading ? 'Изпращане...' : 'Изпрати'}
                </Button>
              </FormGroup>
              {visible ? <Message isVisible={visible} onDismiss={onDismiss} text="Благодарим Ви! Вашето запитване беше изпратено успешно. Ще се свържем с вас в най скоро време." /> : <></>}
            </Form>
          </Col>
        </Row>
      </div>
    </>)
    }
  </>
}

export default Contact;