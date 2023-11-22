import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, FormFeedback, FormGroup, Input, Label, Row, Form } from "reactstrap";
import Hr from "../../../components/Hr";
import PageTitle from "../../../components/PageTitle";
import AdminPanelImage from '../../../images/admin-panel.png';
import { linkUrl } from "../../../utils";

import './register.scss';

function Register({ hideMain, isMobile }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasUsernameError, setUsernameError] = useState(false);
  const [hasPasswordError, setPasswordError] = useState(false);
  let navigate = useNavigate();

  PageTitle('Регистрация в администраторски панел | Покривала НЕТ');

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

    console.log('username, password', username, password);

    const response = await fetch(`${linkUrl()}/register`, {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      // responseType: 'json'
    }).then((response) => response.json())
      .then((responseData) => {
        console.log('responseData', responseData);
        if (responseData.statusCode === '200') {
          setUsername('');
          setPassword('');
          navigate.push("/login");
        } else if (responseData.statusCode !== '200') {
          console.log("Message failed to send.", response.json())
        }
      });

    console.log('response', response.json());
    return response.json();
  }

  return <>{!hideMain &&
    <div className={`container ${isMobile ? '' : 'my-4'}`}>
      <>
        <Row>
          <Col>
            <h6 className={`${isMobile ? 'mb-3' : 'mb-5'}`}>Моля, въведете вашите данни за регистрация в администраторския панел</h6>
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
                  onClick={() => handleSubmit}>Регистрация
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
      <Hr isMobile={isMobile} text="Регистрация" />
    </div>
  }</>

}

export default Register;