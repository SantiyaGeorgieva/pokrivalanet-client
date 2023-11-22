import React, { useEffect, useState, useRef } from 'react'
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import GoogleMapRuse from '../../components/GoogleMapRuse';
import { useTranslation } from "react-i18next";
import ReCAPTCHA from 'react-google-recaptcha';
import Hr from '../../components/Hr';
import PageTitle from '../../components/PageTitle';
import { linkUrl, removeSpaces } from '../../utils';
import Message from '../../components/Message';

import './contact.scss';

function Contact({ hideMain, isMobile }) {
  const { t } = useTranslation();
  PageTitle(t('large_and_covers_page_title'));

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
      let response = await fetch(`${linkUrl()}/verify-token`, {
        method: 'POST',
        secret: process.env.googleSecretApiKey,
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
        setMessageCaptcha(t('message_captcha'));

        if (values && values.length > 0) {
          fetchMessage();
        }
      } else {
        setError(t('token_validation_message1'));
      }
    } else {
      setError(t('token_validation_message2'));
    }
  }

  const fetchMessage = async () => {
    setLoading(true);
    const response = await fetch(`${linkUrl()}/contact`, {
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
              <p className="mb-1"><i className="fa-solid fa-location-dot my-2 pe-2" />{`${t('addres_ruse')}`}</p>
              <p className="mb-1"><i className="fa fa-phone my-2 pe-2" />+359 877 614 031,</p>
              <p className="mb-1"><i className="fa fa-phone my-2 pe-2" />+359 877 614 029,</p>
              <p className="mb-2"><i className="fa fa-phone my-2 pe-2" />+359 877 062 082</p>
            </div>
            {!isMobile &&
              <div className="d-flex flex-column text-start mt-3">
                <p className="mb-1"><i className="fa-solid fa-location-dot my-2 pe-2" />{`${t('addres_plv')}`}</p>
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
                <p className="mb-1"><i className="fa-solid fa-location-dot my-2 pe-2" />{`${t('addres_plv')}`}</p>
                <p className="mb-2"><i className="fa fa-phone my-2 pe-2" />+359 877 614 031</p>
                <p className="mb-2"><i className="fa-solid fa-envelope my-2 pe-2" />office@pokrivala.net</p>
              </div>
            </Col>
          </Row>
        }
        <Hr text={`${t('contacts_link')}`} />
        <Row className={`{d-flex align-items-center justify-content-center ${isMobile ? 'mb-5' : ''}`}>
          <Col md="4">
            <Form onSubmit={(e) => handleSubmit(e)} method="POST">
              <FormGroup className="text-start mb-2">
                <Label for="exampleEmail">{t('names')}</Label>
                <Input type="text" name="name" onChange={e => setName(e.target.value)} value={name} invalid={hasNameError} />
                {hasNameError && <FormFeedback>{t('name_error')}</FormFeedback>}
              </FormGroup>
              <FormGroup className="text-start mb-2">
                <Label for="email">{t('email')}</Label>
                <Input type="text" onChange={e => setEmail(e.target.value)} name="email" value={email} invalid={hasEmailError} />
                {hasEmailError && <FormFeedback>{t('email_error')}</FormFeedback>}
              </FormGroup>
              <FormGroup className="text-start mb-2">
                <Label for="subject">{t('subject')}</Label>
                <Input type="text" onChange={e => setSubject(e.target.value)} name="subject" value={subject} invalid={hasSubjectError} />
                {hasSubjectError && <FormFeedback>{t('subject_error')}</FormFeedback>}
              </FormGroup>
              <FormGroup className="text-start mb-2">
                <Label for="exampleText">{t('message')}</Label>
                <Input
                  id="exampleText"
                  name="message"
                  type="textarea"
                  value={message}
                  invalid={hasMessageError}
                  onChange={e => setMessage(e.target.value)}
                />
                {hasMessageError && <FormFeedback>{t('message_error')}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <ReCAPTCHA sitekey={process.env.googleSiteKey} ref={captchaRef} />
              </FormGroup>
              {error && <p className="text-start textError fs-14">{t('error_text')} {error}</p>}
              {messageCaptcha && <p className="text-start textSuccess fs-14">{messageCaptcha}</p>}
              <FormGroup>
                <Button type="submit" outline className="d-flex text-start mt-4" id="btn-submit" disabled={loading}>
                  {loading ? t('send_button_text2') : t('send_button_text1')}
                </Button>
              </FormGroup>
              {visible ? <Message isVisible={visible} onDismiss={onDismiss} text={`${t('thank_you_message')}`} /> : <></>}
            </Form>
          </Col>
        </Row>
      </div>
    </>)
    }
  </>
}

export default Contact;