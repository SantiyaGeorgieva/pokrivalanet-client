import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, FormFeedback, FormGroup, Input, Label, Row, Form } from "reactstrap";
import Hr from "../../../components/Hr";
import PageTitle from "../../../components/PageTitle";
import AdminPanelImage from '../../../images/admin-panel.png';
import { linkUrl } from "../../../utils";

import './login.scss';

function Login({ hideMain, isMobile }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasUsernameError, setUsernameError] = useState(false);
  const [hasPasswordError, setPasswordError] = useState(false);
  let navigate = useNavigate();

  PageTitle('Вписване в администраторски панел | Покривала НЕТ');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === '') {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }

    if (password === '') {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    const response = await fetch(`${linkUrl()}/login`, {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      responseType: 'json'
    }).then((response) => {
      if (response.status === '200') {
        setUsername('');
        setPassword('');
        navigate.push("/admin-panel");
      } else if (response.status !== '200') {
        console.log("Message failed to send.", response)
      }
    });

    return response;
  }

  return <>{!hideMain &&
    <div className={`container ${isMobile ? '' : 'my-4'}`}>
      {isMobile ? <p className="text-wrapper mb-1">Тентите и сенниците изработени от нас са от PVC синтетичен брезент. За изработката се използва специално оборудване, с цел избягване на разместване и набръчкване.</p>
        :
        <>
          <Row>
            <Col>
              <h6 className={`${isMobile ? 'mb-3' : 'mb-5'}`}>Моля, въведете вашите данни за вписване в администраторския панел</h6>
            </Col>
          </Row>
          <Row className={`d-flex align-items-center justify-content-center ${isMobile ? 'mb-5' : ''}`}>
            <Col md="4">
              <Form onSubmit={(e) => handleSubmit(e)} method="POST">
                <FormGroup className="text-start mb-2">
                  <Label for="username">Потребителско име</Label>
                  <Input type="text" name="username" onChange={e => setUsername(e.target.value)} value={username} invalid={hasUsernameError} />
                  {hasUsernameError && <FormFeedback>Моля, въведете името си</FormFeedback>}
                </FormGroup>
                <FormGroup className="text-start mb-2">
                  <Label for="password">Парола</Label>
                  <Input type="password" onChange={e => setPassword(e.target.value)} name="password" value={password} invalid={hasPasswordError} />
                  {hasPasswordError && <FormFeedback>Моля, въведете паролата си</FormFeedback>}
                </FormGroup>
                <div className="d-flex align-items-center justify-content-end mt-4">
                  <Button
                    type="submit"
                    className={`bc-dark-blue ${isMobile ? 'btn-sm me-3' : ''}`}
                    onClick={() => handleSubmit}>Вписване
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <img src={AdminPanelImage} alt="Admin panel image" />
            </Col>
          </Row>
        </>
      }
      <Hr isMobile={isMobile} text="Вписване" />
    </div>
  }</>

}

export default Login;