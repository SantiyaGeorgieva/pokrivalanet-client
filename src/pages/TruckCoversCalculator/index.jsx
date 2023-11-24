import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { saveAs } from 'file-saver';
import { Row, Col, Spinner, Button, Label, Form, FormGroup, FormFeedback, Input } from "reactstrap";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTranslation } from "react-i18next";
import Offer from "../../components/offers/Offer";
import Message from "../../components/Message";
import CoverScheme from '../../images/cover_scheme.png';

import './truckCoversCalculator.scss';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { linkUrl } from "../../utils";
import { tarpaulinCount } from "../../constants";

function TruckCoversCalculator({ hideMain, isMobile, offerTitle }) {
  const { t } = useTranslation();
  const location = useLocation();

  const [titlePage, setTitlePage] = useState(offerTitle || localStorage.getItem('offerTitle'));
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [hood, setHood] = useState('');
  const [backCover, setBackCover] = useState('');
  const [fallingPipe, setFallingPipe] = useState('');
  const [fallingRight, setFallingRight] = useState('');
  const [numberStretches, setNumberStretches] = useState('');
  const [tarpaulin, setTarpaulin] = useState('680гр/кв.м');
  const [dateManufacture, setDateManufacture] = useState(null);

  const [longitudinalPocketCheck, setLongitudinalPocketCheck] = useState(false);
  const [fittingLeftCheck, setFittingLeftCheck] = useState(false);
  const [fittingRightCheck, setFittingRightCheck] = useState(false);
  const [assemblyCheck, setAssemblyCheck] = useState(false);

  const [values, setValues] = useState([]);
  const [items, setItems] = useState([]);
  const [hasWidthError, setWidthError] = useState(false);
  const [hasLengthError, setLengthError] = useState(false);
  const [hasHoodError, setHoodError] = useState(false);
  const [hasBackCoverError, setBackCoverError] = useState(false);
  const [hasFallingPipeError, setFallingPipeError] = useState(false);
  const [hasFallingRightError, setFallingRightError] = useState(false);
  const [hasNumberStretchesError, setNumberStretchesError] = useState(false);
  const [hasDateManufactureError, setDateManufactureError] = useState(false);

  const [clicked, setClicked] = useState(false);
  // const [checked, setChecked] = useState(false);
  const [selectedFile, setSingleFile] = useState(null);

  // const [messageOpen, setMessageOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  const [totalPrice, setTotalPrice] = useState('');

  useEffect(() => {
    if (location.pathname) {
      localStorage.setItem("offerTitle", titlePage);
    }

  }, [location.pathname])

  useEffect(() => {
    if (!hasWidthError && !hasLengthError && !hasHoodError && !hasBackCoverError && !hasFallingPipeError
      && !hasFallingRightError && !hasNumberStretchesError && !hasDateManufactureError && values.length > 0) {
      setClicked(true);
      fetchPriceOffer();
      // generatePdfDocument(`${t('file_name')}`, <Offer items={items} totalPrice={totalPrice} />);
      // handlePdf();
      // fetchOffer(selectedFile);
    } else if (!hasLengthError && !hasDateManufactureError && titlePage !== 'card4' && values.length > 0) {
      setClicked(true);
      fetchPriceOffer();
    }
  }, [hasWidthError, hasLengthError, hasHoodError, hasBackCoverError, hasFallingPipeError,
    hasFallingRightError, hasNumberStretchesError, hasDateManufactureError, values])

  useEffect(() => {
    if (values.length > 0) {
      values.map((value, idx) => {
        setItems([{
          'width_cover_text': value.width,
          'length_cover_text': value.length,
          'hood_text': value.hood,
          'back_cover_text': value.back_cover,
          'falling_pipe': value.falling_pipe,
          'falling_to_right': value.falling_right,
          'number_stretches': value.number_stretches,
          'date_manufacture': new Date(value?.date_manufacture).toLocaleDateString("ro-RO"),
          "tarpaulin_type": value.tarpaulin_type
        }
        ], ...items);
      })
    }

    longitudinalPocketCheck && setItems(prevState => [...prevState, { longitudinal_pocket: "+" }]);
    fittingLeftCheck && setItems(prevState => [...prevState, { fitting_left: "+" }]);
    fittingRightCheck && setItems(prevState => [...prevState, { fitting_right: "+" }]);
    assemblyCheck && setItems(prevState => [...prevState, { assembly: "+" }]);
  }, [values])

  const handleSubmit = (event) => {
    event.preventDefault();

    if (width === '') {
      setWidthError(true);
    } else if (width !== '') {
      setWidthError(false);
    }

    if (length === '') {
      setLengthError(true);
    } else if (length !== '') {
      setLengthError(false);
    }

    if (hood === '') {
      setHoodError(true);
    } else if (hood !== '') {
      setHoodError(false);
    }

    if (backCover === '') {
      setBackCoverError(true);
    } else if (hood !== '') {
      setBackCoverError(false);
    }

    if (fallingPipe === '') {
      setFallingPipeError(true);
    } else if (fallingPipe !== '') {
      setFallingPipeError(false);
    }

    if (fallingRight === '') {
      setFallingRightError(true);
    } else if (hood !== '') {
      setFallingRightError(false);
    }

    if (numberStretches === '') {
      setNumberStretchesError(true);
    } else if (hood !== '') {
      setNumberStretchesError(false);
    }

    if (dateManufacture === null) {
      setDateManufactureError(true);
    } else if (hood !== '') {
      setDateManufactureError(false);
    }

    setValues([{
      width: width,
      length: length,
      hood: hood,
      back_cover: backCover,
      falling_pipe: fallingPipe,
      falling_right: fallingRight,
      number_stretches: numberStretches,
      tarpaulin_type: tarpaulin,
      date_manufacture: dateManufacture,
      fitting_right: fittingRightCheck,
      longitudinal_pocket: longitudinalPocketCheck,
      assembly: assemblyCheck
    }, ...values]);
  }

  const generatePdfDocument = async (fileName, pdfDocumentComponent) => {
    const blob = await pdf(pdfDocumentComponent).toBlob();
    setSingleFile(blob);
    saveAs(blob, fileName);
    // handlePdf();
  };

  const clearForm = () => {
    setWidth('');
    setLength('');
    setHood('');
    setBackCover('');
    setTotalPrice('');
    setFallingPipe('');
    setFallingRight('');
    setNumberStretches('');
    setDateManufacture('');
    setLongitudinalPocketCheck(false);
    setFittingLeftCheck(false);
    setFittingRightCheck(false);
    setAssemblyCheck(false);
    setValues([]);
  }

  function fetchPriceOffer() {
    if (values) {
      const response = fetch(`${linkUrl()}/priceCoverOffer`, {
        method: "POST",
        body: JSON.stringify({ values: values[0], title: titlePage }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(
        (response) => (response.json())
      ).then((response) => {
        if (response.status === 'success') {
          setTotalPrice(response.result);
        } else if (response.status === 'fail') {
          console.log("Message failed to send.", response);
        }
      });

      return response;
    }
  }

  return <>
    {!hideMain &&
      <div className={`container ${isMobile ? '' : 'my-4'}`}>
        <Row className="my-5">
          <h3 className="">{t(`${titlePage}`)}</h3>
        </Row>
        <Row className="mb-5">
          <Col md="6" className={`${!isMobile ? 'text-start' : ''}`}>
            <img
              key="1"
              alt="cover_scheme"
              className="w-100"
              src={CoverScheme}
            />
          </Col>
          <Col md="6">
            <Form className={`${isMobile ? 'mt-3' : ''}`} onSubmit={handleSubmit} method="POST">
              <h4 className={`${isMobile ? 'mb-3' : 'mb-5'}`}>{t('cover_data_text')}</h4>
              <div className={`container ${isMobile ? 'mt-3' : 'mt-5'}`}>
                {titlePage === 'card_text4' ?
                  <>
                    <Row>
                      <Col md="6">
                        <FormGroup className="text-start mb-2">
                          <Label for="width" className="fw-bold">{t('width_cover_text')}</Label>
                          <Input type="number" name="width" onChange={e => setWidth(e.target.value)} value={width}
                            invalid={hasWidthError}
                          />
                          {hasWidthError && <FormFeedback>{t('has_width_cover_error')}</FormFeedback>}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="text-start mb-2">
                          <Label for="length" className="fw-bold">{t('length_cover_text')}</Label>
                          <Input type="number" onChange={e => setLength(e.target.value)} name="length" value={length} invalid={hasLengthError} />
                          {hasLengthError && <FormFeedback>{t('has_length_cover_error')}</FormFeedback>}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup className="text-start mb-2">
                          <Label for="hood" className="fw-bold">{t('hood_text')}</Label>
                          <Input type="number" onChange={e => setHood(e.target.value)} name="hood" value={hood} invalid={hasHoodError} />
                          {hasHoodError && <FormFeedback>{t('has_hood_error')}</FormFeedback>}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="text-start mb-2">
                          <Label for="backCover" className="fw-bold">{t('back_cover_text')}</Label>
                          <Input type="number" onChange={e => setBackCover(e.target.value)} name="backCover" value={backCover} invalid={hasBackCoverError} />
                          {hasBackCoverError && <FormFeedback>{t('has_back_cover_error')}</FormFeedback>}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup className="text-start mb-2">
                          <Label for="fallingPipe" className="fw-bold">{t('falling_pipe')}</Label>
                          <Input type="number" onChange={e => setFallingPipe(e.target.value)} name="fallingPipe" value={fallingPipe} invalid={hasFallingPipeError} />
                          {hasFallingPipeError && <FormFeedback>{t('has_falling_pipe_error')}</FormFeedback>}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="text-start mb-2">
                          <Label for="fallingRight" className="fw-bold">{t('falling_to_right')}</Label>
                          <Input type="number" onChange={e => setFallingRight(e.target.value)} name="fallingRight" value={fallingRight} invalid={hasFallingRightError} />
                          {hasFallingRightError && <FormFeedback>{t('has_falling_right_error')}</FormFeedback>}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup className="text-start mb-2">
                          <Label for="numberStretches" className="fw-bold">{t('number_stretches')}</Label>
                          <Input type="number" onChange={e => setNumberStretches(e.target.value)} name="numberStretches" value={numberStretches} invalid={hasNumberStretchesError} />
                          {hasNumberStretchesError && <FormFeedback>{t('has_number_stretches_error')}</FormFeedback>}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="text-start mb-2">
                          <Label for="tarpaulin" className="fw-bold">{t('tarpaulin_type')}</Label>
                          <Input
                            id="tarpaulin"
                            name="tarpaulin"
                            type="select"
                            defaultValue={tarpaulin}
                            onChange={e => setTarpaulin(e.target.value)}>
                            {tarpaulinCount.map(option => {
                              return <option key={option.id}>{t(`${option.text}`)}</option>
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <Row>
                          <Col md="12" className="text-start">
                            <FormGroup check>
                              <Input
                                id="longitudinalPocket"
                                name="longitudinalPocket"
                                type="checkbox"
                              />
                              <Label check onClick={e => setLongitudinalPocketCheck(!longitudinalPocketCheck)} for="longitudinalPocket">
                                {t('longitudinal_pocket')}
                              </Label>
                            </FormGroup>
                          </Col>
                          <Col md="12" className="text-start">
                            <FormGroup check>
                              <Input
                                id="fittingRightCheck"
                                name="fittingRightCheck"
                                type="checkbox"
                              />
                              <Label check onClick={e => setFittingRightCheck(!fittingRightCheck)} for="fittingRightCheck">
                                {t('fitting_right')}
                              </Label>
                            </FormGroup>
                          </Col>
                          <Col md="12" className="text-start">
                            <FormGroup check>
                              <Input
                                id="fittingLeftCheck"
                                name="fittingLeftCheck"
                                type="checkbox"
                              />
                              <Label check onClick={e => setFittingLeftCheck(!fittingLeftCheck)} for="fittingLeftCheck">
                                {t('fitting_left')}
                              </Label>
                            </FormGroup>
                          </Col>
                          <Col md="12" className="text-start">
                            <FormGroup check>
                              <Input
                                id="assembly"
                                name="assembly"
                                type="checkbox"
                              />
                              <Label check onClick={e => setAssemblyCheck(!assemblyCheck)} for="assembly">{t('assembly')}</Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                      <Col md="6">
                        <FormGroup className="text-start mb-2">
                          <Label for="edge" className="fw-bold">{t('date_manufacture')}</Label>
                          <div className={`datepicker ${hasDateManufactureError ? 'error' : ''}`}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker label="" value={dateManufacture} onChange={newValue => setDateManufacture(newValue)} />
                            </LocalizationProvider>
                          </div>
                          {hasDateManufactureError && <div className="date-error mt-1">{t('has_date_manufacture_error')}</div>}
                        </FormGroup>
                      </Col>
                    </Row>
                  </> :
                  <Row>
                    <Col md="6">
                      <FormGroup className="text-start mb-2">
                        <Label for="length" className="fw-bold">{t('length_cover_text')}</Label>
                        <Input type="number" onChange={e => setLength(e.target.value)} name="length" value={length} invalid={hasLengthError} />
                        {hasLengthError && <FormFeedback>{t('has_length_cover_error')}</FormFeedback>}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup className="text-start mb-2">
                        <Label for="edge" className="fw-bold">{t('date_manufacture')}</Label>
                        <div className={`datepicker ${hasDateManufactureError ? 'error' : ''}`}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="" value={dateManufacture} onChange={newValue => setDateManufacture(newValue)} />
                          </LocalizationProvider>
                        </div>
                        {hasDateManufactureError && <div className="date-error mt-1">{t('has_date_manufacture_error')}</div>}
                      </FormGroup>
                    </Col>
                  </Row>
                }
                <Row className="mt-4">
                  <Col md="12" className="text-start">
                    {t('total_price_text')} {totalPrice && <span className="fw-bold">{`${totalPrice} BGN`}</span>}
                  </Col>
                </Row>
                {visible ?
                  <Row>
                    <Col>
                      <Message isVisible={visible} onDismiss={onDismiss} text={`${t('thank_you_message_offer')}`} />
                    </Col>
                  </Row> : <></>}
                <Row className="mt-2">
                  <Col>
                    {!clicked ?
                      <PDFDownloadLink document={
                        <Offer title={offerTitle} parametersText="offer_parameters_text2" items={items} totalPrice={totalPrice} />}
                        fileName={t('file_name')} className="text-decoration-none">
                        {({ blob, url, loading, error }) => {
                          setSingleFile(url);
                          // setSingleFile(btoa(blob));
                          return loading ? 'Loading document...' :
                            <Button block type="submit" className="bc-blue d-flex mt-3">
                              <span className="fw-bold mx-auto text-transform">{t('calculate_price_button')}</span>
                            </Button>
                        }}
                      </PDFDownloadLink>
                      :
                      <div className="d-flex align-items-center justify-content-between">
                        <PDFDownloadLink document={
                          <Offer title={offerTitle} parametersText="offer_parameters_text2" items={items} totalPrice={totalPrice} />}
                          fileName={t('file_name')} className="text-decoration-none">
                          {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' :
                              <Button type="button" outline block href={url} target="_blank">
                                <span className="fw-bold mx-auto text-transform">{t('print_button')}</span>
                              </Button>
                          }
                        </PDFDownloadLink>
                        <Button
                          type="button"
                          className="bc-blue w-65"
                          onClick={() => {
                            generatePdfDocument(`${t('file_name')}`,
                              <Offer title={offerTitle} parametersText="offer_parameters_text2" items={items} totalPrice={totalPrice} />);
                          }}
                        >
                          <span className="fw-bold text-transform">{t('download_button')}</span>
                        </Button>
                      </div>
                    }
                  </Col>
                </Row>
                {clicked && <Row className="mt-4">
                  <Col>
                    <div className="d-flex">
                      <Button
                        type="button"
                        color="danger"
                        outline
                        block
                        onClick={clearForm}>
                        {t('clear_button')}
                      </Button>
                    </div>
                  </Col>
                </Row>}
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    }
  </>
}

export default TruckCoversCalculator;