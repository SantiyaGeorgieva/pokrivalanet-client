import { useState } from "react";
import { Button, Col, FormFeedback, FormGroup, Input, Label, Row, Form } from "reactstrap";
import { authService } from "../../../services/authService";
import Hr from "../../../components/Hr";
import Message from "../../../components/Message";
import PageTitle from "../../../components/PageTitle";
import AdminPanelImage from '../../../images/admin-panel.png';

import './login.scss';

const Login = ({ hideMain, setError, setVisible, setMessage, error, message, visible, isMobile }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasUsernameError, setUsernameError] = useState(false);
  const [hasPasswordError, setPasswordError] = useState(false);

  PageTitle('Вписване в админ панела | Покривала НЕТ');

  const handleLogin = async (e) => {
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

    try {
      let loginData = { username, password };
      await authService.login(loginData, setMessage);
    } catch (error) {
      setError(true);
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 2500); 
    }
  };

  return <>
    {visible && message.length > 0 ? <Message error={error} text={message} isVisible={visible} /> : null}
    {!hideMain &&
    <div className={`container ${isMobile ? '' : 'my-4'}`}>
      <Row>
        {isMobile ? <Col>
          <h6 className="fw-bold my-4">
            Моля, въведете вашите данни за вписване в админ панела
          </h6>
        </Col>
        : <Col>
          <h4 className="mt-4">
            Моля, въведете вашите данни за вписване
          </h4>
          <h4 className={`${isMobile ? '' : 'mb-5'}`}>в админ панела</h4>
        </Col>
        }
      </Row>
      <Row className={`d-flex align-items-center justify-content-center ${isMobile ? '' : 'mb-5'}`}>
        <Col md="4">
          <Form onSubmit={handleLogin} method="POST">
            <FormGroup className="text-start mb-2">
              <Label for="username">Потребителско име</Label>
              <Input type="text" name="username" onChange={e => setUsername(e.target.value)} value={username} invalid={hasUsernameError} />
              {hasUsernameError && <FormFeedback>Моля, въведете потребителско име</FormFeedback>}
            </FormGroup>
            <FormGroup className="text-start mb-2">
              <Label for="password">Парола</Label>
              <Input type="password" onChange={e => setPassword(e.target.value)} name="password" value={password} invalid={hasPasswordError} />
              {hasPasswordError && <FormFeedback>Моля, въведете парола</FormFeedback>}
            </FormGroup>
            <div className={`d-flex align-items-center justify-content-end ${isMobile ? '' : 'mt-4 mb-5'}`}>
              <Button
                type="submit"
                className={`fw-bold bc-dark-blue ${isMobile ? 'btn-sm' : ''}`}>
                  Вход
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
      <Hr isMobile={isMobile} text="Вписване" />
    </div>
  }</>
}

export default Login;