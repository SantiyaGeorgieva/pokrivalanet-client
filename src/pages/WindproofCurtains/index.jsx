import { memo, useEffect, useRef, useState } from "react";
import { Row, Col, Form, FormFeedback, FormGroup, Input, Label, Button, Spinner } from "reactstrap";
import Gallery from "../../components/Gallery";
import Hr from "../../components/Hr";
import PageTitle from "../../components/PageTitle";
import { windproofCurtains, windproofCurtainsOptions } from "../../constants";

import './windproofCurtains.scss';

const WindproofCurtains = memo(({ hideMain, isMobile }) => {
  PageTitle('Информация за Ветроупортни Завеси | Покривала НЕТ');
  const [width, setWidth] = useState('');
  const [hight, setHight] = useState('');
  const [thick, setThick] = useState('');
  const [description, setDescription] = useState('');
  const [zipCount, setZipCount] = useState('');
  const [knobCount, setKnobCount] = useState('');
  const [hasWidthError, setWidthError] = useState(false);
  const [hasHightError, setHeightError] = useState(false);
  const [hasThickError, setThickError] = useState(false);
  const [hasZipCountError, setZipCountError] = useState(false);
  const [hasKnobsCountError, setKnobsCountError] = useState(false);
  const [optionText, setOptionText] = useState('Пластмасови въртящи копчета');
  const [values, setValues] = useState([]);

  const [val, setVal] = useState('');
  const inputEl = useRef(null);
  let numReg = /^\d+$/;

  useEffect(() => {
    if (thick && thick.length === 1) {
      setThick(`${thick && thick?.length ? `${thick} мм` : ''}`);
    }
  }, [thick])

  const handleChange = (e) => {
    setOptionText(e.target.value);
  }

  const handleInputChange = e => {
    const { value, selectionEnd } = e.target;
    const rightCharsCount = value.length - selectionEnd;
    const formattedValue = parseInt(value.replace(/\D/g, ''), 10).toLocaleString();
    const newPosition = formattedValue.length - rightCharsCount;

    setVal(formattedValue);
    console.log('inputEl', inputEl?.current?.props?.value);

    setTimeout(() => {
      inputEl?.current?.props?.value && inputEl?.current?.props?.value.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  // const handleFocusThick = (e) => {
  //   const start = e.currentTarget.selectionStart;
  //   const value = e.target.value;

  //   if (!numReg.test(e.key)) {
  //     e.preventDefault();

  //     if (typeof value !== "string") return;

  //     // e.target.value = value.toUpperCase();
  //     e.currentTarget.setSelectionRange(start, start);
  //   }
  // }

  const addInputValues = (value) => {
    let values2 = [...values, value];
    console.log('values2', values2);
    setValues(values2);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (width === '') {
      setWidthError(true);
    } else if (width !== '') {
      setWidthError(false);
    }

    if (hight === '') {
      setHeightError(true);
    } else if (hight !== '') {
      setHeightError(false);
    }

    if (thick === '') {
      setThickError(true);
    } else if (thick !== '') {
      setThickError(false);
    }

    if (zipCount === '') {
      setZipCountError(true);
    } else if (zipCount !== '') {
      setZipCountError(false);
    }

    if (knobCount === '') {
      setKnobsCountError(true);
    } else if (knobCount !== '') {
      setKnobsCountError(false);
    }

    if (!numReg.test(thick)) {
      setThickError(true)
    }

    addInputValues();
    console.log('a', values);

    // if (!hasNameError && !hasEmailError && !hasSubjectError && !hasMessageError && !hasTextInputError && !hasTextInputsError) {
    //   console.log('HEREEEE');
    //   fetch('../../email.php', {
    //     method: "POST",
    //     body: JSON.stringify(values[1]),
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //   }).then(
    //     (response) => (response.json())
    //   ).then((response) => {
    //     console.log('response', response);

    //     if (response.status === 'success') {
    //       console.log("Message Sent.");
    //       this.resetForm()
    //     } else if (response.status === 'fail') {
    //       console.log("Message failed to send.", response)
    //     }
    //   });
    // }
  }

  return <>{!hideMain &&
    <div className={`container ${isMobile ? '' : 'my-4'}`}>
      {isMobile ? <p className="text-wrapper mb-3">
        Ветроупорните завеси са изключително подходящи за предпазване от климатични въздействия (дъжд, вятър, слънце).
        Подходящи са за всички открити обекти (градина, ресторант, тераса). Материалът е прозрачен, гъвкав и устойчив.
        Могат да се монтират на различни повърхности (дърво, метал, пластмаса).
      </p>
        : <>
          <p className="text-start mb-0">Ветроупорните завеси са изключително подходящи за предпазване от климатични въздействия (дъжд, вятър, слънце).</p>
          <p className="text-start mb-0">Подходящи са за всички открити обекти (градина, ресторант, тераса). Материалът е прозрачен, гъвкав и устойчив.</p>
          <p className="mb-5 text-start">Могат да се монтират на различни повърхности (дърво, метал, пластмаса).</p>
        </>
      }
      <Row>
        <Col md="6" className={`${!isMobile ? 'text-start' : ''}`}>
          {windproofCurtainsOptions.filter(option => option.text === optionText).map(option => {
            return <img
              key={option.id}
              className={isMobile ? 'w-100' : 'w-75'}
              src={option.image ? option.image : <Spinner className="m-5" color="primary" />}
            />
          })}
        </Col>
        <Col md="6">
          <Form className={`${isMobile ? 'mt-3' : ''}`} onSubmit={handleSubmit} method="POST">
            <h4 className={`${isMobile ? 'mb-3' : 'mb-5'}`}>Данни за завесата</h4>
            <div cclassName={`container ${isMobile ? 'mt-3' : 'mt-5'}`}>
              <Row>
                <Col md="6">
                  <FormGroup className="text-start mb-2">
                    <Label for="width" className="fw-bold">Ширина</Label>
                    <Input type="number" name="width" onChange={e => setWidth(e.target.value)} value={width} invalid={hasWidthError} />
                    {hasWidthError && <FormFeedback>Моля, въведете ширина.</FormFeedback>}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="text-start mb-2">
                    <Label for="hight" className="fw-bold">Височина</Label>
                    <Input type="number" onChange={e => setHight(e.target.value)} name="hight" value={hight} invalid={hasHightError} />
                    {hasHightError && <FormFeedback>Моля, въведете височина.</FormFeedback>}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup className="text-start mb-2">
                    <Label for="thick" className="fw-bold">Дебелина</Label>
                    <Input
                      type="text"
                      ref={inputEl}
                      autoFocus="autofocus"
                      name="thick"
                      value={thick}
                      onChange={e => setThick(e.target.value)}
                      invalid={hasThickError}
                    />
                    {hasThickError && <FormFeedback>Моля, въведете дебелина.</FormFeedback>}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup className="text-start mb-2">
                    <FormGroup>
                      <Label for="select" className="fw-bold">Обков</Label>
                      <Input
                        id="select"
                        name="select"
                        type="select"
                        onChange={handleChange}>
                        {windproofCurtainsOptions.map(option => {
                          return <option key={option.id}>{option.text}</option>
                        })}
                      </Input>
                    </FormGroup>
                    {hasThickError && <FormFeedback>Моля, въведете обков.</FormFeedback>}
                  </FormGroup>
                </Col>
                {optionText === 'Ципове' && <Col md="6" className="text-start">
                  <Label for="zipCount">Брой ципове</Label>
                  <FormGroup>
                    <Input
                      type="number"
                      onChange={e => setZipCount(e.target.value)}
                      name="zipCount"
                      value={zipCount}
                      invalid={hasZipCountError}
                    />
                    {hasZipCountError && <FormFeedback>Моля, въведете брой ципове.</FormFeedback>}
                  </FormGroup>
                </Col>}
                {optionText === 'Колан за закачане' && <Row>
                  <Col md="6" className="text-start">
                    <Label for="zipCount">Брой колани</Label>
                    <FormGroup>
                      <Input
                        type="number"
                        onChange={e => setKnobCount(e.target.value)}
                        name="zipCount"
                        value={knobCount}
                        invalid={hasKnobsCountError}
                      />
                      {hasKnobsCountError && <FormFeedback>Моля, въведете брой колани.</FormFeedback>}
                    </FormGroup>
                  </Col>
                  <Col md="6" className="text-start">
                    <Label for="zipCount">Брой ципове</Label>
                    <FormGroup>
                      <Input
                        type="number"
                        onChange={e => setZipCount(e.target.value)}
                        name="zipCount"
                        value={zipCount}
                        invalid={hasZipCountError}
                      />
                      {hasZipCountError && <FormFeedback>Моля, въведете брой ципове.</FormFeedback>}
                    </FormGroup>
                  </Col>
                </Row>}
              </Row>
              <Row>
                <Col md="6" className="text-start">
                  <FormGroup check>
                    <Input type="checkbox" />
                    <Label check className="fw-bold">Завесата има врата</Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md="12" className="text-start">
                  <FormGroup>
                    <Input
                      type="text"
                      className="descripiton-field"
                      placeholder="Допълнително описание"
                      onChange={e => setDescription(e.target.value)}
                      name="description"
                      value={description}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <Button block type="submit" className="bc-blue d-flex mt-3" id="btn-submit">
                    <span className="fw-bold mx-auto text-transform mx-auto">Поръчай!</span>
                  </Button>
                </Col>
              </Row>
            </div>
          </Form>
        </Col>
      </Row>
      <Hr isMobile={isMobile} text="Ветроупорни завеси" />
      <Gallery images={windproofCurtains} isMobile={isMobile} />
    </div>
  }</>
})

export default WindproofCurtains;