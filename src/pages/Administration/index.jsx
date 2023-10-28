import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import PageTitle from "../../components/PageTitle";
import Hr from "../../components/Hr";
import AdminPanelImage from '../../images/admin-panel.png'

import './administration.scss';
import { useState } from "react";

function Administration({ hideMain, isMobile }) {
  PageTitle('Администратирски панел | Покривала НЕТ');
  const [pricePlasticButtons, setPricePlasticButtons] = useState('');
  const [priceCircularFitting, setPriceCircularFitting] = useState('');
  const [priceZip, setPriceZip] = useState('');
  const [priceWithoutCircularFitting, setPriceWithoutCircularFitting] = useState('');
  const [priceCurtain, setPriceCurtain] = useState('');

  const [hasPlasticButtonsError, setPlasticButtonsError] = useState(false);
  const [hasPriceCircularFittingError, setPriceCircularFittingError] = useState(false);
  const [hasPriceZipError, setPriceZipError] = useState(false);
  const [hasPriceWithoutCircularFittingError, setPriceWithoutCircularFittingError] = useState(false);
  const [hasPriceCurtainError, setPriceCurtainError] = useState(false);

  const [mode, setMode] = useState(false);

  const handleSubmit = (e) => {
    console.log('e', e);
  };

  const handleMode = (e) => {
    setMode(!mode);
  };

  return <>
    {!hideMain &&
      <>
        <h5 className={`${!mode ? 'mb-4' : 'mb-1'}`}>Информация за ветроупорни завеси</h5>
        {mode ?
          <div className={`${isMobile ? 'container text-wrapper' : ''}`}>
            <Row>
              <Col>
                <h6 className={`${isMobile ? 'mb-3' : 'mb-5'}`}>Моля, въведете <span className="fw-bold">цени на брой</span> за ветроупорни завеси</h6>
              </Col>
            </Row>
            <Row className={`d-flex align-items-center justify-content-center ${isMobile ? 'mb-5' : ''}`}>
              <Col md="4">
                <Form onSubmit={(e) => handleSubmit(e)} method="POST">
                  <FormGroup className="text-start mb-2">
                    <Label for="pricePlasticButtons">Цена за пластмасови въртящи копчета</Label>
                    <Input type="text" name="pricePlasticButtons" onChange={e => setPricePlasticButtons(e.target.value)} value={pricePlasticButtons} invalid={hasPlasticButtonsError} />
                    {hasPlasticButtonsError && <FormFeedback>Моля, въведете цена за пластмасови въртящи копчета</FormFeedback>}
                  </FormGroup>
                  <FormGroup className="text-start mb-2">
                    <Label for="priceCircularFitting">Цена на кръгов обков</Label>
                    <Input type="text" onChange={e => setPriceCircularFitting(e.target.value)} name="priceCircularFitting" value={priceCircularFitting} invalid={hasPriceCircularFittingError} />
                    {hasPriceCircularFittingError && <FormFeedback>Моля, въведете цена за кръгов обкове</FormFeedback>}
                  </FormGroup>
                  <FormGroup className="text-start mb-2">
                    <Label for="priceZip">Цена на цип</Label>
                    <Input type="text" onChange={e => setPriceZip(e.target.value)} name="priceZip" value={priceZip} invalid={hasPriceZipError} />
                    {hasPriceZipError && <FormFeedback>Моля, въведете цена за цип</FormFeedback>}
                  </FormGroup>
                  <FormGroup className="text-start mb-2">
                    <Label for="priceWithoutCircularFitting">Цена без обков (стационарен)</Label>
                    <Input type="text" onChange={e => setPriceWithoutCircularFitting(e.target.value)} name="priceWithoutCircularFitting" value={priceWithoutCircularFitting} invalid={hasPriceWithoutCircularFittingError} />
                    {hasPriceWithoutCircularFittingError && <FormFeedback>Моля, въведете цена без обков (стационарен)</FormFeedback>}
                  </FormGroup>
                  <FormGroup className="text-start mb-2">
                    <Label for="priceCurtain">Цена на завеса</Label>
                    <Input type="text" onChange={e => setPriceCurtain(e.target.value)} name="priceCurtain" value={priceCurtain} invalid={hasPriceCurtainError} />
                    {setPriceCurtainError && <FormFeedback>Моля, въведете цена на завеса</FormFeedback>}
                  </FormGroup>
                  <div className="d-flex align-items-center justify-content-end">
                    <Button type="submit" className={`bc-dark-blue ${isMobile ? 'btn-sm me-3' : 'me-3'}`}>Запази промени</Button>
                    <Button type="button" color="secondary" onClick={handleMode} className={`${isMobile ? 'btn-sm' : ''}`}>Откажи</Button>
                  </div>
                  <img src={AdminPanelImage} alt="Admin panel image" />
                </Form>
              </Col>
            </Row>
          </div> :
          <div className={`${isMobile ? 'container text-wrapper' : 'w-50 mx-auto'}`}>
            <Row className="text-start">
              <Col>
                <p>{`Цена за пластмасови въртящи копчета: ${pricePlasticButtons}`}</p>
              </Col>
            </Row>
            <Row className="text-start">
              <Col>
                <p>{`Цена на кръгов обков: ${priceCircularFitting}`}</p>
              </Col>
            </Row>
            <Row className="text-start">
              <Col>
                <p>{`Цена на цип: ${priceZip}`}</p>
              </Col>
            </Row>
            <Row className="text-start">
              <Col>
                <p>{`Цена без обков (стационарен): ${priceWithoutCircularFitting}`}</p>
              </Col>
            </Row>
            <Row className="text-start">
              <Col>
                <p>{`Цена за единична завеса: ${priceCurtain}`}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="d-flex align-items-center justify-content-end">
                  <Button
                    type="button"
                    className={`bc-dark-blue ${isMobile ? 'btn-sm' : 'me-3'}`}
                    onClick={handleMode}
                  >Редактирай
                  </Button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <img src={AdminPanelImage} alt="Admin panel image" />
              </Col>
            </Row>
          </div>
        }
      </>
    }
    <Hr isMobile={isMobile} text="Администраторски панел" />
  </>
}

export default Administration;