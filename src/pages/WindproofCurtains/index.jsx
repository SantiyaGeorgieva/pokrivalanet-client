import { memo, useEffect, useReducer, useRef, useState } from "react";
import { saveAs } from 'file-saver';
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { Row, Col, Form, FormFeedback, FormGroup, Input, Label, Button, Spinner } from "reactstrap";
import { useTranslation } from "react-i18next";
import { DayPicker } from 'react-day-picker';
import Gallery from "../../components/Gallery";
import Hr from "../../components/Hr";
import PageTitle from "../../components/PageTitle";
import Offer from "../../components/offers/Offer";
import Message from "../../components/Message";
import { thickCount, windproofCurtains, windproofCurtainsOptions } from "../../constants";
import { useApiFetchOfferPrice } from "../../hooks/useApiFetchOfferPrice";
import { linkUrl } from "../../utils";

import 'react-day-picker/dist/style.css';
import { initialState, windproofCurtainsCalculatorReducer } from "../../components/reducers/windproofCuratinsCalculatorReducer";

import './windproofCurtains.scss';
import { CLEAR_ALL } from "../../actionTypes";

const css = `
.my-selected:not([disabled]) { 
  font-weight: bold; 
  border: 1px solid currentColor;
}
.my-selected:hover:not([disabled]) { 
  border-color: blue;
  color: blue;
}
.my-today { 
  font-weight: bold;
  color: blue;
}`;

const WindproofCurtains = memo(function WindproofCurtains({ hideMain, isMobile }) {
  const { t } = useTranslation();
  PageTitle(t('windproof_curtains_page_title'));

  const [selectedDate, setSelectedDate] = useState(null);
  const lastMonth = new Date();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const wrapperRef = useRef(null);

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          hideDatePicker();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);
  const [items, dispatchItems] = useReducer(windproofCurtainsCalculatorReducer, []);
  const [state, dispatch] = useReducer(windproofCurtainsCalculatorReducer, initialState);

  const { width, height, thick, edge, description, zipsCheck, lowerApronCheck, pipePocketCheck, knobsCheck } = state;
  // const [titlePage, setTitlePage] = useState(offerTitle || localStorage.getItem('offerTitle'));
  // const [thick, setThick] = useState('0.8');
  const [dateManufacture, setDateManufacture] = useState(null);
  const [radioCheck, setRadioCheck] = useState('without_fitting');

  const [hasWidthError, setWidthError] = useState(false);
  const [hasHeightError, setHeightError] = useState(false);
  const [hasEdgeError, setEdgeError] = useState(false);
  const [hasDateManufactureError, setDateManufactureError] = useState(false);

  const [clicked, setClicked] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const [selectedFile, setSingleFile] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  const widthInputRef = useRef(null);
  const heightInputRef = useRef(null);
  const edgeInputRef = useRef(null);

  const {
    totalPrice,
    isPending,
    calulatedButtonClicked,
    setCalculatedButtonClicked,
    fetchOfferPrice,
    setTotalPrice,
  } = useApiFetchOfferPrice();

  // const { offerNumber, fetchOfferPriceFile, offerFileSucceed } =
  //   useApiFetchOfferFile();

  // const { errorComparedFiles, fetchOfferComparedFiles } =
  //   useApiFetchOfferComparedFiles();

  // const { errorSendEmail, fetchSendEmail } = useApiFetchSendEmail();

  // useEffect(() => {
  //   if (values.length > 0) {
  //     values.map((value, idx) => {
  //       console.log('value:', value);
  //       setItems([{
  //         'width_text': value.width,
  //         'height_text': value.height,
  //         'depth_text': value.thick,
  //         'edges': value.edge,
  //         'date_manufacture': selectedDate?.toLocaleDateString("ro-RO"),
  //         'hardware_text': radioCheck,
  //         'additional_description': value.description,
  //       }
  //       ], ...items);
  //     })
  //   }

  //   zipsCheck && setItems(prevState => [...prevState, { zips: "+" }]);
  //   lowerApronCheck && setItems(prevState => [...prevState, { lower_apron: "+" }]);
  //   pipePocketCheck && setItems(prevState => [...prevState, { pipe_pocket: "+" }]);
  //   knobsCheck && setItems(prevState => [...prevState, { knobs: "+" }]);
  //   checked && setItems(prevState => [...prevState, { curtain_have_door: "+" }]);

  // }, [values])

  //   handlePdf(`${t('file_name')}`,
  //     <Offer title="offer_windproof_curtain" offerNo={offerNumber} parametersText="offer_parameters_text" items={items} totalPrice={totalPrice} />, items);
  // }

  const handleInputClick = (date) => {
    if (selectedDate === '') {
      setShowDatePicker(!showDatePicker);
    } else {
      setShowDatePicker(!showDatePicker);
      setDateManufacture(selectedDate);
    }
  };

  const hideDatePicker = () => {
    setShowDatePicker(false);
  };
  const handleDayClick = (day) => {
    setSelectedDate(day);
    hideDatePicker();
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   if (width === '') {
  //     setWidthError(true);
  //   } else if (width !== '') {
  //     setWidthError(false);
  //   }

  //   if (height === '') {
  //     setHeightError(true);
  //   } else if (height !== '') {
  //     setHeightError(false);
  //   }

  //   if (edge === '') {
  //     setEdgeError(true);
  //   } else if (edge !== '') {
  //     setEdgeError(false);
  //   }

  //   if (selectedDate === null) {
  //     setDateManufactureError(true);
  //   } else if (selectedDate !== null) {
  //     setDateManufactureError(false);
  //   }

  //   setValues([{
  //     width: width,
  //     height: height,
  //     thick: thick,
  //     edge: edge,
  //     date_manufacture: selectedDate?.toLocaleDateString("ro-RO"),
  //     description: description,
  //     hardwareText: radioCheck,
  //     zips: zipsCheck,
  //     lower_apron: lowerApronCheck,
  //     pipe_pocket: pipePocketCheck,
  //     knobs: knobsCheck,
  //     curtain_have_door: checked
  //   }, ...values]);
  // }

  const handlePdf = async (name, pdfDocumentComponent, items) => {
    setFileName(name);
    setLoading(false);
    let blobConvertFile = null;
    let fileBlob = null;

    if (Object.keys(items).length > 0) {
      blobConvertFile = await pdf(pdfDocumentComponent).toBlob();
    }

    if (blobConvertFile !== null) {
      fileBlob = await new File([blobConvertFile], `${t('file_name')}`, { type: 'application/pdf' });
      setFile(fileBlob);
    }
  }

  const generatePdfDocument = async (fileName, pdfDocumentComponent) => {
    setLoading(true);
    const blob = await pdf(pdfDocumentComponent).toBlob();
    setSingleFile(blob);
    saveAs(blob, fileName);
    setLoading(false);
  };

  const clearForm = () => {
    dispatch({ type: CLEAR_ALL });
    setTotalPrice('');
    setFileName('');
    setFile(null);
    setSingleFile(null);
    setCalculatedButtonClicked(false);
    setOrderButtonClicked(false);
    setVisible(false);
    // setDateManufacture(null);
    // setSelectedDate(null);
    setTotalPrice('');
    setRadioCheck('without_fitting');

    setChecked(false);
    setVisible(false);
  }

  const handleOfferPrice = () => {
    if (widthInputRef.current && widthInputRef.current.value === "") {
      setWidthError(true);
    }

    if (heightInputRef.current && heightInputRef.current.value === "") {
      setHeightError(true);
    }

    if (edgeInputRef.current && edgeInputRef.current.value === "") {
      setEdgeError(true);
    }

    if (fallingPipeInputRef.current && fallingPipeInputRef.current.value === "") {
      setFallingPipeError(true);
    }

    if (fallingRightInputRef.current && fallingRightInputRef.current.value === "") {
      setFallingRightError(true);
    }

    if (numberStretchesInputRef.current && numberStretchesInputRef.current.value === "") {
      setNumberStretchesError(true);
    }

    if (dateManufacture === null || dateManufacture === '') {
      setDateManufactureError(true);
      return;
    }

    if (!hasWidthError && !hasLengthError && !hasHoodError && !hasBackCoverError && !hasFallingPipeError && !hasFallingRightError && !hasNumberStretchesError && !hasDateManufactureError) {
      const values = [
        {
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
        },
      ];

      const newItems = values.map((value) => ({
        width_cover_text: value.width,
        length_cover_text: value.length,
        hood_text: value.hood,
        back_cover_text: value.back_cover,
        falling_pipe: value.falling_pipe,
        falling_to_right: value.falling_right,
        number_stretches: value.number_stretches,
        date_manufacture: value.date_manufacture.toLocaleDateString("ro-RO"),
        tarpaulin_type: value.tarpaulin_type,
      }));

      dispatchItems({ type: SET_ITEMS, payload: newItems });

      dispatchItems({ type: longitudinalPocketCheck ? ADD_CHECK : REMOVE_CHECK, payload: 'longitudinal_pocket' });
      dispatchItems({ type: fittingLeftCheck ? ADD_CHECK : REMOVE_CHECK, payload: 'fitting_left' });
      dispatchItems({ type: fittingRightCheck ? ADD_CHECK : REMOVE_CHECK, payload: 'fitting_right' });
      dispatchItems({ type: assemblyCheck ? ADD_CHECK : REMOVE_CHECK, payload: 'assembly' });

      fetchOfferPrice([...values], titlePage, endpoints.truckPriceUrl);
    }
  };

  return <>{!hideMain &&
    <div className={`container ${isMobile ? '' : 'my-4'}`}>
      {isMobile ? <p className="text-wrapper mb-3">
        {t('main_text2')}
      </p>
        : <p className="text-start mb-5">{t('main_text2')}</p>
      }
      <Row className={isMobile ? 'my-4' : 'my-5'}>
        <h3 className="">{t('offer_windproof_curtain')}</h3>
      </Row>
      <Row className="mb-5">
        <Col md="6" className={`${!isMobile ? 'text-start' : ''}`}>
          {!checked ? windproofCurtainsOptions.filter(option => (option.text === radioCheck) && !option.checked === !checked).map(option => {
            return <img
              key={option.id}
              className={isMobile ? 'w-100' : 'w-75'}
              src={option.image}
            />
          })
            : windproofCurtainsOptions.filter(option => (option.text === radioCheck) && !option.checked === !checked).map(option => {
              return <img
                key={option.id}
                className={isMobile ? 'w-100' : 'w-75'}
                src={option.image}
              />
            })
          }
        </Col>
        <Col md="6">
          <Form className={`${isMobile ? 'mt-3' : ''}`} onSubmit={handleSubmit} method="POST">
            <h4 className={`${isMobile ? 'mb-3' : 'mb-5'}`}>{t('curtain_data_text')}</h4>
            <div className={`container ${isMobile ? 'mt-3' : 'mt-5'}`}>
              <Row>
                <Col md="6">
                  <FormGroup className="text-start mb-2">
                    <Label for="width" className="fw-bold">{t('width_text')}</Label>
                    <Input type="number" name="width" onChange={e => setWidth(e.target.value)} value={width}
                      invalid={hasWidthError}
                    />
                    {hasWidthError && <FormFeedback>{t('has_width_error')}</FormFeedback>}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="text-start mb-2">
                    <Label for="height" className="fw-bold">{t('height_text')}</Label>
                    <Input type="number" onChange={e => setHeight(e.target.value)} name="height" value={height} invalid={hasHeightError} />
                    {hasHeightError && <FormFeedback>{t('has_height_error')}</FormFeedback>}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup className="text-start mb-2">
                    <Label for="thick" className="fw-bold">{t('depth_text')}</Label>
                    <Input
                      id="select"
                      name="select"
                      type="select"
                      defaultValue={thick}
                      onChange={e => setThick(e.target.value)}>
                      {thickCount.map(option => {
                        return <option key={option.id}>{t(`${option.text}`)}</option>
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="text-start mb-2">
                    <Label for="edge" className="fw-bold">{t('edges')}</Label>
                    <Input type="number" onChange={e => setEdge(e.target.value)} name="edge" value={edge} invalid={hasEdgeError} />
                    {hasEdgeError && <FormFeedback>{t('has_edge_error')}</FormFeedback>}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <Row>
                    <Col md="12" className="text-start">
                      <Label for="edge" className="fw-bold">{t('hardware_text')}</Label>
                      <div className="flex">
                        <input type="radio" name="radio" id="without_fitting" defaultChecked />
                        <Label check className="mb-0" onClick={e => setRadioCheck('without_fitting')} for="without_fitting">
                          {t('without_fitting')}
                        </Label>
                      </div>
                    </Col>
                    <Col md="12" className="text-start">
                      <div className="flex">
                        <input type="radio" name="radio" id="plastic_knobs" />
                        <Label className="mb-0" onClick={e => setRadioCheck('plastic_knobs')} for="plastic_knobs">
                          {t('plastic_knobs')}
                        </Label>
                      </div>
                    </Col>
                    <Col md="12" className="text-start">
                      <div className="flex">
                        <input type="radio" name="radio" id="metal_knobs" />
                        <Label className="mb-0" onClick={e => setRadioCheck('metal_knobs')} for="metal_knobs">
                          {t('metal_knobs')}
                        </Label>
                      </div>
                    </Col>
                    <Col md="12" className="text-start">
                      <div className="flex">
                        <input type="radio" name="radio" id="strap_plates" />
                        <Label className="mb-0" onClick={e => setRadioCheck('strap_plates')} for="strap_plates">
                          {t('strap_plates')}
                        </Label>
                      </div>
                    </Col>
                    <Col md="12" className="text-start">
                      <div className="flex">
                        <input type="radio" name="radio" id="pockets" />
                        <Label className="mb-0" onClick={e => setRadioCheck('pockets')} for="pockets">
                          {t('pockets')}
                        </Label>
                      </div>
                    </Col>
                    <Col md="12" className="text-start">
                      <FormGroup check>
                        <Input
                          id="zips"
                          name="zips"
                          type="checkbox"
                        />
                        <Label check onClick={e => setZipsCheck(!zipsCheck)} for="zips">{t('zips')}</Label>
                      </FormGroup>
                    </Col>
                    <Col md="12" className="text-start">
                      <FormGroup check>
                        <Input
                          id="lowerApron"
                          name="lowerApron"
                          type="checkbox"
                        />
                        <Label check onClick={e => setLoweApronCheck(!lowerApronCheck)} for="lowerApron">{t('lower_apron')}</Label>
                      </FormGroup>
                    </Col>
                    <Col md="12" className="text-start">
                      <FormGroup check>
                        <Input
                          id="pipePocket"
                          name="pipePocket"
                          type="checkbox"
                        />
                        <Label check onClick={e => setPipePocketCheck(!pipePocketCheck)} for="pipePocket">{t('pipe_pocket')}</Label>
                      </FormGroup>
                    </Col>
                    <Col md="12" className="text-start">
                      <FormGroup check>
                        <Input
                          id="knobs"
                          name="knobs"
                          type="checkbox"
                        />
                        <Label check onClick={e => setKnobsCheck(!knobsCheck)} for="knobs">{t('knobs')}</Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Col md="12" className="text-start">
                    <FormGroup check>
                      <Input
                        id="curtainHaveDoor"
                        name="curtainHaveDoor"
                        type="checkbox"
                      />
                      <Label check onClick={e => setChecked(!checked)} for="curtainHaveDoor">{t('curtain_have_door')}</Label>
                    </FormGroup>
                  </Col>
                </Col>
                <Col md="6" className={`${!isMobile ? '' : 'mt-2'}`}>
                  <FormGroup className="text-start mb-2">
                    <Label for="date" className="fw-bold">{t('date_manufacture')}</Label>
                    <div className={`datepicker ${hasDateManufactureError ? 'error' : ''}`}>
                      <Input
                        type="text"
                        value={selectedDate === null ? null : selectedDate.toLocaleDateString("ro-RO")}
                        id="dateManufacture"
                        placeholder="Select Date"
                        name="dateManufacture"
                        onFocus={handleInputClick}
                        onChange={handleInputClick}
                      />
                    </div>
                    {showDatePicker && (
                      <div ref={wrapperRef}>
                        <style>{css}</style>
                        <DayPicker
                          locale={getLocale(localStorage.getItem("i18nextLng"))}
                          max={1}
                          mode="single"
                          initialMonth={today}
                          weekStartsOn={1}
                          fromMonth={lastMonth}
                          fromDate={lastMonth}
                          captionLayout="dropdown"
                          fromYear={2015}
                          toYear={2035}
                          selected={selectedDate}
                          onDayClick={handleDayClick}
                          onSelect={setSelectedDate}
                          modifiersClassNames={{
                            selected: 'my-selected',
                            today: 'my-today'
                          }}
                          modifiersStyles={{
                            disabled: { fontSize: '75%' }
                          }}
                        />
                      </div>)
                    }
                    {hasDateManufactureError && <div className="date-error mt-1">{t('has_date_manufacture_error')}</div>}
                  </FormGroup>
                </Col>
              </Row>
              <Row className={`${!isMobile ? 'mt-3' : ''}`}>
                <Col md="12" className="text-start">
                  <FormGroup>
                    <Input
                      type="text"
                      className="descripiton-field"
                      placeholder={`${t('additional_description')}`}
                      onChange={e => setDescription(e.target.value)}
                      name="description"
                      value={description}
                    />
                  </FormGroup>
                </Col>
              </Row>
              {!isLoading ?
                <>
                  <Row>
                    <Col md="12" className="text-start">
                      {t('total_price_text')} {totalPrice && <span className="fw-bold">{`${totalPrice} BGN`}</span>}
                    </Col>
                  </Row>
                  {visible &&
                    <Row>
                      <Col>
                        <Message isVisible={visible} onDismiss={onDismiss} text={`${t('thank_you_message_offer')}`} />
                      </Col>
                    </Row>
                  }
                  <Row className="mt-2">
                    <Col>
                      {!clicked ?
                        <PDFDownloadLink document={
                          <Offer title="offer_windproof_curtain" offerNo={offerNumber} parametersText="offer_parameters_text" items={items} totalPrice={totalPrice} />}
                          fileName={t('file_name')} className="text-decoration-none">
                          {({ blob, url, loading, error }) => {
                            if (!loading && url !== '') {
                              setSingleFile(blob);
                              setFileName(`${t('file_name')}`);
                            }
                            return loading ? <Spinner color="primary" /> :
                              <Button block type="submit" className="bc-blue d-flex mt-3">
                                <span className={`fw-bold mx-auto text-transform ${!isMobile ? '' : 'fs-14 text-nowrap'}`}>{t('order_button')}</span>
                              </Button>
                          }}
                        </PDFDownloadLink>
                        :
                        <div className="d-flex align-items-center justify-content-between">
                          <PDFDownloadLink document={
                            <Offer title="offer_windproof_curtain" offerNo={offerNumber} parametersText="offer_parameters_text" items={items} totalPrice={totalPrice} />}
                            fileName={t('file_name')} className={`text-decoration-none ${!isMobile ? '' : 'me-2'}`}>
                            {({ blob, url, loading, error }) =>
                              loading ? 'Loading document...' :
                                <Button type="button" outline block href={url} target="_blank">
                                  <span className={`fw-bold mx-auto text-transform w-100 ${!isMobile ? '' : 'fs-14 text-nowrap'}`}>{t('print_button')}</span>
                                </Button>
                            }
                          </PDFDownloadLink>
                          <Button
                            type="button"
                            className="bc-blue w-65"
                            onClick={() => {
                              generatePdfDocument(`${t('file_name')}`,
                                <Offer title="offer_windproof_curtain" parametersText="offer_parameters_text" items={items} totalPrice={totalPrice} />);
                            }}
                          >
                            <span className={`fw-bold text-transform ${!isMobile ? '' : 'fs-14 text-nowrap'}`}>{t('download_button')}</span>
                          </Button>
                        </div>
                      }
                    </Col>
                  </Row>
                  {clicked &&
                    <Row className="mt-3">
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
                    </Row>
                  }
                </> : <Spinner color="primary" />
              }
            </div>
          </Form>
        </Col>
      </Row>
      <Gallery images={windproofCurtains} isMobile={isMobile} />
      <Hr isMobile={isMobile} text={`${t('windproof_curtains_link')}`} />
    </div>
  }
  </>
});

export default WindproofCurtains;