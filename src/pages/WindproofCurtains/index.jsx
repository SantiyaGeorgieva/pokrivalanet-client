import { memo, useState, useForm } from "react";
// import { Link, useFormAction } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Row, Col, Form, FormFeedback, FormGroup, Input, Label, Button, Spinner } from "reactstrap";
import Gallery from "../../components/Gallery";
import Hr from "../../components/Hr";
import PageTitle from "../../components/PageTitle";
import Invoice from "../../components/reports/Invoice";
import invoice from "../../data/invoice.js";
import { windproofCurtains, windproofCurtainsOptions } from "../../constants";

import './windproofCurtains.scss';

const WindproofCurtains = memo(({ hideMain, isMobile }) => {
  PageTitle('Информация за Ветроупортни Завеси | Покривала НЕТ');
  const [width, setWidth] = useState('');
  const [hight, setHight] = useState('');
  const [description, setDescription] = useState('');
  const [zipCount, setZipCount] = useState('');
  const [knobCount, setKnobCount] = useState('');
  const [hasWidthError, setWidthError] = useState(false);
  const [hasHightError, setHeightError] = useState(false);
  const [hasZipCountError, setZipCountError] = useState(false);
  const [hasKnobsCountError, setKnobsCountError] = useState(false);
  const [optionText, setOptionText] = useState('Пластмасови въртящи копчета');
  const [values, setValues] = useState([]);
  const [errors, setErrors] = useState(true);

  const [register, handleSubmit] = useForm();
  // useEffect(() => {
  //   if (hasHightError || hasWidthError || hasKnobsCountError || hasZipCountError) {
  //     console.log('here');
  //     setErrors(true);
  //   } else if (!hasHightError && !hasWidthError && !hasKnobsCountError && !hasZipCountError) {
  //     console.log('here2');
  //     setErrors(false);
  //   }
  // }, [hasHightError, hasWidthError, hasKnobsCountError, hasZipCountError])

  const handleChange = (e) => {
    setOptionText(e.target.value);
  }

  const addInputValues = (value) => {
    let values2 = [...values, value];
    console.log('values2', values2);
    setValues(values2);
  }

  const onSubmit = (data) => {
    data.preventDefault();
    console.log('data', data);

    if (width === '') {
      console.log('1');
      setWidthError(true);
      checkErrors(hasWidthError, hasHightError, hasKnobsCountError, hasZipCountError);
      console.log('hasWidthError', hasWidthError);
    } else if (width !== '') {
      console.log('2');
      setWidthError(false);
      checkErrors(hasWidthError, hasHightError, hasKnobsCountError, hasZipCountError);
    }

    if (hight === '') {
      setHeightError(true);
      checkErrors(hasWidthError, hasHightError, hasKnobsCountError, hasZipCountError);
    } else if (hight !== '') {
      setHeightError(false);
      checkErrors(hasWidthError, hasHightError, hasKnobsCountError, hasZipCountError);
    }

    if (zipCount === '') {
      setZipCountError(true);
      checkErrors(hasWidthError, hasHightError, hasKnobsCountError, hasZipCountError);
    } else if (zipCount !== '') {
      setZipCountError(false);
      checkErrors(hasWidthError, hasHightError, hasKnobsCountError, hasZipCountError);
    }

    if (knobCount === '') {
      setKnobsCountError(true);
      checkErrors(hasWidthError, hasHightError, hasKnobsCountError, hasZipCountError);
    } else if (knobCount !== '') {
      setKnobsCountError(false);
      checkErrors(hasWidthError, hasHightError, hasKnobsCountError, hasZipCountError);
    }

    console.log('hasWidthError', hasWidthError);
    // addInputValues();
    // checkErrors(hasWidthError, hasHightError, hasKnobsCountError, hasZipCountError);
    // console.log('a', values);

    // if ((!hasHightError && !hasWidthError) || (!hasKnobsCountError && !hasZipCountError)) {
    //   console.log('HEREEEE');
    //   setErrors(false);

    // fetch('../../email.php', {
    //   method: "POST",
    //   body: JSON.stringify(values[1]),
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    // }).then(
    //   (response) => (response.json())
    // ).then((response) => {
    //   console.log('response', response);

    //   if (response.status === 'success') {
    //     console.log("Message Sent.");
    //     this.resetForm()
    //   } else if (response.status === 'fail') {
    //     console.log("Message failed to send.", response)
    //   }
    // });
    // }
  }

  const checkErrors = (widthError, hightError, knobsCountError, zipCountError) => {
    setTimeout(() => {
      if (widthError || hightError || knobsCountError || zipCountError) {
        console.log('here');
        setErrors(true);
      } else if (!widthError && !hightError && !knobsCountError && !zipCountError) {
        console.log('here2', widthError, hightError, knobsCountError, zipCountError);
        setErrors(false);
      }
    })
  };

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
          <Form className={`${isMobile ? 'mt-3' : ''}`} onSubmit={handleSubmit(onSubmit)} method="POST">
            <h4 className={`${isMobile ? 'mb-3' : 'mb-5'}`}>Данни за завесата</h4>
            <div className={`container ${isMobile ? 'mt-3' : 'mt-5'}`}>
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
                    <p>0.8 мм</p>
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
                {optionText === 'Кръгов обков' && <Row>
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
                    <Input
                      id="checkbox"
                      name="checkbox"
                      type="checkbox"
                    />
                    <Label check for="checkbox">Завесата има врата</Label>
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
              <Row className="mt-2">
                <Col>
                  <PDFDownloadLink document={<Invoice invoice={invoice} />} fileName="somename.pdf" className="text-decoration-none">
                    {({ blob, url, loading, error }) =>
                      loading ? 'Loading document...' :
                        <div className="d-flex align-items-center justify-content-between">
                          {errors ?
                            <Button block type="submit" className="bc-blue d-flex mt-3">
                              <span className="fw-bold mx-auto text-transform">Поръчай!</span>
                            </Button>
                            :
                            <>
                              <Button type="button" outline href={blob} target="_blank" className="w-50 me-5">
                                <span className="fw-bold mx-auto text-transform">Разпечатай оферта</span>
                              </Button>
                              <Button type="button" href={url} target="_blank" className="bc-blue d-flex w-50 text-end">
                                <span className="fw-bold mx-auto text-transform">Свали оферта</span>
                              </Button>
                            </>
                          }
                        </div>
                    }
                  </PDFDownloadLink>
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