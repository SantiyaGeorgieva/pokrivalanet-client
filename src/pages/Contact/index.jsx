import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import CookieConsent from 'react-cookie-consent';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GoogleMapRuse from '../../components/GoogleMapRuse';
import GoogleMapSofia from '../../components/GoogleMapSofia';
import Hr from '../../components/Hr';
import PageTitle from '../../components/PageTitle';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [captchaText, setCaptchaText] = useState('');
  const [mainCaptchaText, setMainCaptchaText] = useState('');
  const [values, setValues] = useState([]);

  useEffect(() => {
    let alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
    let a, b, c, d;

    for (let i = 0; i < 4; i++) {
      a = alpha[Math.floor(Math.random() * alpha.length)];
      b = alpha[Math.floor(Math.random() * alpha.length)];
      c = alpha[Math.floor(Math.random() * alpha.length)];
      d = alpha[Math.floor(Math.random() * alpha.length)];
    }

    let code = a + '' + b + '' + '' + c + '' + d;
    document.getElementById("mainCaptcha").value = code;
    setMainCaptchaText(code);
  }, [])

  const onRefresh = () => {
    let alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
    let a, b, c, d;

    for (let i = 0; i < 4; i++) {
      a = alpha[Math.floor(Math.random() * alpha.length)];
      b = alpha[Math.floor(Math.random() * alpha.length)];
      c = alpha[Math.floor(Math.random() * alpha.length)];
      d = alpha[Math.floor(Math.random() * alpha.length)];
    }

    let code = a + '' + b + '' + '' + c + '' + d;
    document.getElementById("mainCaptcha").value = code;
    setMainCaptchaText(code);
  };

  const removeSpaces = (string) => {
    return string.split(' ').join('');
  }

  const addInputValues = (value) => {
    let values2 = [...values, value];
    console.log('values2', values2);
    setValues(values2);
  }

  const [hasNameError, setNameError] = useState(false);
  const [hasEmailError, setEmailError] = useState(false);
  const [hasSubjectError, setSubjectError] = useState(false);
  const [hasMessageError, setMessageError] = useState(false);
  const [hasTextInputError, setTextInputError] = useState(false);
  const [hasTextInputsError, setTextInputsError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    let nameValue = removeSpaces(name);
    let subjectValue = removeSpaces(message);
    let emailaddressVal = email;
    let mainCaptchaValue = removeSpaces(mainCaptchaText);
    let txtInput = removeSpaces(captchaText);

    if (nameValue === '') {
      setNameError(true);
    } else if (nameValue !== '') {
      setNameError(false);
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

    if (txtInput === '') {
      setTextInputError(true);
    } else if (txtInput !== '') {
      setTextInputError(false);
    }

    if (emailaddressVal === '') {
      setEmailError(true);
    } else if (emailaddressVal !== '') {
      setEmailError(false);
    }

    if (!emailReg.test(emailaddressVal)) {
      setEmailError(true);
    }

    if (txtInput !== '' && mainCaptchaValue !== txtInput) {
      setTextInputsError(true);
    } else if (txtInput !== '' && mainCaptchaValue === txtInput) {
      setTextInputsError(false);
    }

    addInputValues();
    console.log('a', values);

    if (!hasNameError && !hasEmailError && !hasSubjectError && !hasMessageError && !hasTextInputError && !hasTextInputsError) {
      console.log('HEREEEE');
      fetch('../../email.php', {
        method: "POST",
        body: JSON.stringify(values[1]),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(
        (response) => (response.json())
      ).then((response) => {
        console.log('response', response);

        if (response.status === 'success') {
          console.log("Message Sent.");
          this.resetForm()
        } else if (response.status === 'fail') {
          console.log("Message failed to send.", response)
        }
      });
    }
  }

  PageTitle('Информация за Контакти | Покривала НЕТ');
  return (
    <>
      <Header />
      <div className="container my-5">
        <Row>
          <Col md="6">
            <div className="d-flex flex-column text-start">
              <p className="mb-1"><i className="fa-solid fa-location-dot my-2 px-2" />гр. Русе, ул. „Тракция“ 10</p>
              <p className="mb-1"><i className="fa fa-phone my-2 px-2" />+359 877 614 031,</p>
              <p className="mb-1"><i className="fa fa-phone my-2 px-2" />+359 877 614 029,</p>
              <p className="mb-2"><i className="fa fa-phone my-2 px-2" />+359 877 062 082</p>
            </div>
            <div className="d-flex flex-column text-start mt-3">
              <p className="mb-1"><i className="fa-solid fa-location-dot my-2 px-2" />гр. Пловдив</p>
              <p className="mb-2"><i className="fa fa-phone my-2 px-2" />+359 877 614 031</p>
              <p className="mb-2"><i className="fa-solid fa-envelope my-2 px-2" />brezenti_ruse@abv.bg</p>
            </div>
          </Col>
          <Col md="6" className="text-end">
            <GoogleMapRuse />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md="6">
            <div className="d-flex flex-column text-start">
              <p className="mb-1"><i className="fa-solid fa-location-dot my-2 px-2" />гр. София</p>
              <p className="mb-2"><i className="fa fa-phone my-2 px-2" />+359 878 395 164</p>
            </div>
          </Col>
          <Col md="6" className="text-end">
            <GoogleMapSofia />
          </Col>
        </Row>
        <Hr text="Контакти" />
        <Row className="d-flex align-items-center justify-content-center">
          <Col md="4">
            <Form onSubmit={handleSubmit} method="POST">
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
              <FormGroup className="text-start mb-2" disabled>
                <div className="d-flex">
                  <Input className="bc-gray" id="mainCaptcha" name="mainCaptchaText" value={mainCaptchaText} onChange={e => setMainCaptchaText(e.target.value)} disabled />
                  <Button color="link" onClick={onRefresh}>
                    <i className="fa-solid fa-arrows-rotate ms-2 mt-2"></i>
                  </Button>
                </div>
              </FormGroup>
              <FormGroup className="text-start mb-2">
                <Input name="captchaText" value={captchaText} onChange={e => setCaptchaText(e.target.value)} id="txtInput" invalid={hasTextInputError || hasTextInputsError} />
                {hasTextInputError && <FormFeedback>Моля, въведете кода от полето.</FormFeedback>}
                {hasTextInputsError && <FormFeedback>Кодовете не съвпадат.</FormFeedback>}
              </FormGroup>
              <Button type="submit" outline className="d-flex text-start mt-4" id="btn-submit">Изпрати</Button>
            </Form>
          </Col>
        </Row>
      </div >
      <Footer />
      <CookieConsent
        location="bottom"
        buttonText="Приеми"
        cookieName="pokrivalaCookie"
        style={{ display: 'flex', alignItems: 'center', background: "#2B373B", textAlign: 'left', padding: '10px 0 10px 15px', opacity: '.85' }}
        buttonStyle={{ background: '#fff', color: "#4e503b", fontSize: "13px", fontWeight: '600', borderRadius: '30px' }}
        expires={150}
      >
        <p className="mb-0">Pokrivala използва бисквитки, за да гарантира на потребителите използването на функциите на своя сайт, като предлага по-добро потребителско изживяване.</p>
        <p className="mb-0">Продължавайки да разглеждате сайта, вие се съгласявате с използването на бисквитки.</p>
      </CookieConsent>
    </>
  )
}

export default Contact;