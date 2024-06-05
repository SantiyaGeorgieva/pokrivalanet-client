import { memo, useEffect, useReducer, useRef, useState } from "react";
import { saveAs } from 'file-saver';
import { BlobProvider, PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { Row, Col, Form, FormFeedback, FormGroup, Input, Label, Button, Spinner } from "reactstrap";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { PhoneInput } from 'react-international-phone';
import { DayPicker } from 'react-day-picker';
import Gallery from "../../components/Gallery";
import Hr from "../../components/Hr";
import PageTitle from "../../components/PageTitle";
import Offer from "../../components/offers/Offer";
import Message from "../../components/Message";
import { thickCount, windproofCurtains, windproofCurtainsOptions } from "../../constants";
import { useApiFetchOfferPrice } from "../../hooks/useApiFetchOfferPrice";
import { useApiFetchOfferFile } from "../../hooks/useApiFetchOfferFile";
import { useApiFetchSendEmail } from "../../hooks/useApiFetchSendEmail";
import { useApiFetchOfferComparedFiles } from "../../hooks/useFetchOfferComparedFiles";
import useNamesValidation from "../../hooks/validators/useNamesValidation";
import useEmailValidation from "../../hooks/validators/useEmailValidation";
import usePhoneValidation from "../../hooks/validators/usePhoneValidation";
import useKeysValidation from "../../hooks/validators/useKeysValidation";
import { initialState, windproofCurtainsCalculatorReducer } from "../../reducers/windproofCuratinsCalculatorReducer";
import { getDateLocale, getLocale, endpoints } from "../../utils";

import {
  ADD_CHECK,
  CLEAR_ALL,
  CLEAR_DESCRIPTION,
  CLEAR_EDGE,
  CLEAR_EMAIL,
  CLEAR_HEIGHT,
  CLEAR_NAMES,
  CLEAR_TELEPHONE,
  CLEAR_WIDTH,
  REMOVE_CHECK,
  SET_CURTAINHAVEDOORCHECK,
  SET_DATEMANUFACTURE,
  SET_DESCRIPTION,
  SET_EDGE,
  SET_EMAIL,
  SET_HEIGHT,
  SET_ITEMS,
  SET_KNOBSCHECK,
  SET_LOWERAPRONCHECK,
  SET_NAMES,
  SET_PIPEPOCKETCHECK,
  SET_RADIOCHECK,
  SET_TELEPHONE,
  SET_THICK,
  SET_WIDTH,
  SET_ZIPSCHECK
} from "../../actionTypes";

import 'react-international-phone/style.css';
import 'react-day-picker/dist/style.css';

import './windproofCurtains.scss';

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

const WindproofCurtains = memo(function WindproofCurtains({ hideMain, isMobile, selectedLanguage }) {
  const { t } = useTranslation();
  const location = useLocation();
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
  const {
    names,
    email,
    telephone,
    width,
    height,
    thick,
    edge,
    description,
    dateManufacture,
    radioCheck,
    zipsCheck,
    lowerApronCheck,
    pipePocketCheck,
    knobsCheck,
    curtainHaveDoorCheck
  } = state;

  const [titlePage, setTitlePage] = useState(localStorage.getItem('offerTitle'));
  const [error, setError] = useState(false);

  const [hasNamesError, setNamesError] = useState(false);
  const [hasNamesValidationError, setNamesValidationError] = useState(false);
  const [hasEmailError, setEmailError] = useState(false);
  const [hasEmailValidationError, setEmailValidationError] = useState(false);
  const [hasTelephoneError, setTelephoneError] = useState(false);
  const [hasTelephoneValidationError, setTelephoneValidationError] = useState(false);

  const [hasWidthError, setWidthError] = useState(false);
  const [hasHeightError, setHeightError] = useState(false);
  const [hasEdgeError, setEdgeError] = useState(false);
  const [hasDateManufactureError, setDateManufactureError] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [orderButtonClicked, setOrderButtonClicked] = useState(false);

  const [selectedFile, setSingleFile] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  const namesInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const telephoneInputRef = useRef(null);
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

  const { offerNumber, fetchOfferPriceFile, offerFileSucceed } =
    useApiFetchOfferFile();

  const { loadingComparedFiles, errorComparedFiles, fetchOfferComparedFiles } =
    useApiFetchOfferComparedFiles();

  const { sendEmailLoading, sendEmailSucceed, errorSendEmail, fetchSendEmail } = useApiFetchSendEmail();

  const { namesValue, isValidNames, validateNames } = useNamesValidation();
  const { emailValue, isValidEmail, validateEmail } = useEmailValidation();
  const { isValidPhoneNumber, validatePhoneNumber } = usePhoneValidation();
  const { handleKeysInput } = useKeysValidation();

  useEffect(() => {
    if (location.pathname) {
      localStorage.setItem("offerTitle", titlePage);
    }

  }, [location.pathname])

  useEffect(() => {
    dateManufacture && dateManufacture.toLocaleDateString(selectedLanguage);
  }, [selectedLanguage, dateManufacture]);

  useEffect(() => {
    if (offerFileSucceed) {
      if (
        totalPrice > 0 &&
        Object.keys(items).length > 0 &&
        offerNumber !== ""
      ) {
        handlePdf(
          `${t("file_name")}`,
          <Offer
            offerNo={offerNumber}
            title="offer_windproof_curtain"
            parametersText="offer_parameters_text"
            items={items}
            totalPrice={totalPrice}
          />,
          items
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offerFileSucceed, offerNumber]);

  useEffect(() => {
    if (file !== null && totalPrice > 0) {
      const fetchData = async () => {
        await fetchOfferComparedFiles(offerNumber, fileName, file, endpoints.windproofComparedFilesUrl);
        if (!errorComparedFiles) {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = async () => {
            let dataUrl = reader.result;
            await fetchSendEmail(names, email, dataUrl, fileName, endpoints.windproofSendEmailUrl);
            if (!errorSendEmail) {
              setVisible(true);
            }
          };
        }
      };

      fetchData();
    }
  }, [file]);

  useEffect(() => {
    if (names === "" && !isValidNames) {
      setNamesError(true);
      setNamesValidationError(false);
    } else if (names !== '' && isValidNames) {
      setNamesError(false);
      setNamesValidationError(false);
    } else if (names !== '' && !isValidNames) {
      setNamesError(false);
      setNamesValidationError(true);
    }
  }, [names]);

  useEffect(() => {
    if (email === "" && !isValidEmail) {
      setEmailError(true);
      setEmailValidationError(false);
    } else if (email !== '' && isValidEmail) {
      setEmailError(false);
      setEmailValidationError(false);
    } else if (email !== '' && !isValidEmail) {
      setEmailError(false);
      setEmailValidationError(true);
    }
  }, [email]);

  useEffect(() => {
    if (telephone === "" && !isValidPhoneNumber) {
      setTelephoneError(true);
      setTelephoneValidationError(false);
    } else if (telephone !== '' && isValidPhoneNumber) {
      setTelephoneError(false);
      setTelephoneValidationError(false);
    } else if (telephone !== '' && !isValidPhoneNumber) {
      setTelephoneError(false);
      setTelephoneValidationError(true);
    }
  }, [telephone]);

  const hideDatePicker = () => {
    setShowDatePicker(false);
  };

  const handleDayClick = (day) => {
    setShowDatePicker(!showDatePicker);
    setSelectedDate(day);
    dispatch({ type: SET_DATEMANUFACTURE, value: day });
    setDateManufactureError(false);
  };

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

  const handleNamesInput = (e) => {
    e?.target?.value && validateNames(e.target.value);

    if (e.target.value === "") {
      setNamesError(true);
      dispatch({ type: CLEAR_NAMES, value: "" });
    } else if (isValidNames) {
      dispatch({ type: SET_NAMES, value: e.target.value });
    } else {
      dispatch({ type: SET_NAMES, value: e.target.value });
    }
  };

  const handleEmailInput = (e) => {
    e?.target?.value && validateEmail(e?.target?.value);

    if (e?.target?.value === "") {
      setEmailError(true);
      dispatch({ type: CLEAR_EMAIL, value: "" });
    } else if (e?.target?.value && isValidEmail) {
      dispatch({ type: SET_EMAIL, value: emailValue });
    } else if (e?.target?.value && !isValidEmail) {
      dispatch({ type: SET_EMAIL, value: e.target.value });
    }
  };

  const handleTelephoneInput = (e) => {
    e?.target?.value && validatePhoneNumber(e?.target?.value);

    if (e?.target?.value === "") {
      setTelephoneError(true);
      dispatch({ type: CLEAR_TELEPHONE, value: "" });
    } else if (e?.target?.value && isValidPhoneNumber) {
      dispatch({ type: SET_TELEPHONE, value: e?.target?.value });
    } else if (e?.target?.value && !isValidPhoneNumber) {
      dispatch({ type: SET_TELEPHONE, value: e?.target?.value });
    }
  };

  const handleWidthInput = (value) => {
    if (value === "") {
      setWidthError(true);
      dispatch({ type: CLEAR_WIDTH, value: "" });
    } else {
      setWidthError(false);
      dispatch({ type: SET_WIDTH, value: value });
    }
  };

  const handleHeightInput = (value) => {
    if (value === "") {
      setHeightError(true);
      dispatch({ type: CLEAR_HEIGHT, value: "" });
    } else {
      setHeightError(false);
      dispatch({ type: SET_HEIGHT, value: value });
    }
  };

  const handleThickInput = (value) => {
    if (value === "") {
      dispatch({ type: SET_THICK, value: "" });
    } else {
      dispatch({ type: SET_THICK, value: value });
    }
  };

  const handleEdgeInput = (value) => {
    if (value === "") {
      setEdgeError(true);
      dispatch({ type: CLEAR_EDGE, value: "" });
    } else {
      setEdgeError(false);
      dispatch({ type: SET_EDGE, value: value });
    }
  };

  const handleDescriptionInput = (value) => {
    if (value === "") {
      dispatch({ type: CLEAR_DESCRIPTION, payload: "" });
    } else {
      dispatch({ type: SET_DESCRIPTION, payload: value });
    }
  };

  const handleRadioCheck = (value) => {
    if (value === "") {
      dispatch({ type: SET_RADIOCHECK, value: "" });
    } else {
      dispatch({ type: SET_RADIOCHECK, value: value });
    }
  };

  const handleZipsCheck = (e) => {
    dispatch({ type: SET_ZIPSCHECK, payload: !zipsCheck });
  }

  const handleLoweApronCheck = (e) => {
    dispatch({ type: SET_LOWERAPRONCHECK, payload: !lowerApronCheck });
  }

  const handlePipePocketCheck = (e) => {
    dispatch({ type: SET_PIPEPOCKETCHECK, payload: !pipePocketCheck });
  }

  const handleKnobsCheck = (e) => {
    dispatch({ type: SET_KNOBSCHECK, payload: !knobsCheck });
  }

  const handleCurtainHaveDoorCheck = (e) => {
    dispatch({ type: SET_CURTAINHAVEDOORCHECK, payload: !curtainHaveDoorCheck });
  };

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
    setError(false);
  }

  const handleOfferPrice = () => {
    if (namesInputRef.current && namesInputRef.current.value === "") {
      setNamesError(true);
    }

    if (emailInputRef.current && emailInputRef.current.value === "") {
      setEmailError(true);
    }

    if (telephoneInputRef?.current && telephoneInputRef?.current?.value.length < 14) {
      setTelephoneError(true);
    }

    if (widthInputRef.current && widthInputRef.current.value === "") {
      setWidthError(true);
    }

    if (heightInputRef.current && heightInputRef.current.value === "") {
      setHeightError(true);
    }

    if (edgeInputRef.current && edgeInputRef.current.value === "") {
      setEdgeError(true);
    }

    if (dateManufacture === null || dateManufacture === '') {
      setDateManufactureError(true);
      return;
    }

    if (!hasNamesValidationError && !hasNamesValidationError
      && hasEmailError && !hasEmailValidationError 
      && !hasTelephoneError && !hasTelephoneValidationError 
      && !hasWidthError && !hasHeightError 
      && !hasEdgeError && !hasDateManufactureError) {
      const values = [
        {
          'names': names,
          'email': email,
          'telephone': telephone,
          'width': width,
          'height': height,
          'thick': thick,
          'edge': edge,
          'date_manufacture': dateManufacture,
          'hardware_text': radioCheck,
          'description': description,
          'zips': zipsCheck,
          'lower_apron': lowerApronCheck,
          'pipe_pocket': pipePocketCheck,
          'knobs': knobsCheck,
          'curtain_have_door': curtainHaveDoorCheck
        },
      ];

      const newItems = values.map((value) => ({
        names: value.names,
        email: value.email,
        telephone: value.telephone,
        width_text: value.width,
        height_text: value.height,
        depth_text: value.thick,
        edges: value.edge,
        date_manufacture: value.date_manufacture.toLocaleDateString("ro-RO"),
        hardware_text: value.hardware_text,
        additional_description: value.description
      }));

      dispatchItems({ type: SET_ITEMS, payload: newItems });

      dispatchItems({ type: zipsCheck ? ADD_CHECK : REMOVE_CHECK, payload: 'zips' });
      dispatchItems({ type: lowerApronCheck ? ADD_CHECK : REMOVE_CHECK, payload: 'lower_apron' });
      dispatchItems({ type: pipePocketCheck ? ADD_CHECK : REMOVE_CHECK, payload: 'pipe_pocket' });
      dispatchItems({ type: knobsCheck ? ADD_CHECK : REMOVE_CHECK, payload: 'knobs' });
      dispatchItems({ type: curtainHaveDoorCheck ? ADD_CHECK : REMOVE_CHECK, payload: 'curtain_have_door' });

      fetchOfferPrice([...values], titlePage, endpoints.windproofPriceUrl);
    }
  };

  const handleOfferFile = async () => {
    setOrderButtonClicked(true);
    try {
      await fetchOfferPriceFile(fileName, selectedFile, endpoints.windproofFileUrl);
    } catch (errorOfferFile) {
      setError(true);
      setVisible(true);
    }
  };

  return <>{!hideMain &&
    <div className={`container ${isMobile ? '' : 'my-4'}`}>
      {isMobile ? <p className="text-wrapper mb-3">
        {t('main_text2')}
      </p>
        : <p className="text-justify mb-5">{t('main_text2')}</p>
      }
      <Row className={isMobile ? 'my-4' : 'my-5'}>
        <h1 className="">{t('offer_windproof_curtain')}</h1>
      </Row>
      <Row className="mb-5">
        <Col lg="5" xl="6" className={`${!isMobile ? 'text-start' : ''}`}>
          {!curtainHaveDoorCheck ? windproofCurtainsOptions.filter(option => (option.text === radioCheck) && !option.checked === !curtainHaveDoorCheck).map(option => {
            return <img
              key={option.id}
              className={isMobile ? 'w-100' : 'w-75'}
              src={option.image}
            />
          })
            : windproofCurtainsOptions.filter(option => (option.text === radioCheck) && !option.checked === !curtainHaveDoorCheck).map(option => {
              return <img
                key={option.id}
                className={isMobile ? 'w-100' : 'w-75'}
                src={option.image}
              />
            })
          }
        </Col>
        <Col lg="7" xl="6">
          <Form className={`${isMobile ? 'mt-3' : ''}`} method="POST" id="form" encType="multipart/form-data">
            <h4 className={`${isMobile ? 'mb-3' : 'mb-5'}`}>{t('curtain_data_text')}</h4>
            <div className={`container ${isMobile ? 'mt-3 p-0' : 'mt-5'}`}>
              <Row>
                <Col md="6">
                  <FormGroup className="text-start mb-2">
                    <Label className="fw-bold" for="names">{t('names')}</Label>
                    <Input
                      type="text"
                      name="names"
                      value={names}
                      innerRef={namesInputRef}
                      onBlur={e => handleNamesInput(e)}
                      onChange={e => handleNamesInput(e)}
                      invalid={hasNamesError || hasNamesValidationError}
                      disabled={calulatedButtonClicked}
                    />
                    {hasNamesError && <FormFeedback>{t('name_error')}</FormFeedback>}
                    {hasNamesValidationError && <FormFeedback>{t('names_validation_error')}</FormFeedback>}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="text-start mb-2">
                    <Label className="fw-bold" for="email">{t('email')}</Label>
                    <Input
                      type="text"
                      name="email"
                      value={email}
                      onBlur={e => handleEmailInput(e)}
                      onChange={e => handleEmailInput(e)}
                      invalid={hasEmailError || hasEmailValidationError}
                      innerRef={emailInputRef}
                      disabled={calulatedButtonClicked}
                    />
                    {hasEmailError && <FormFeedback>{t('email_error')}</FormFeedback>}
                    {hasEmailValidationError && <FormFeedback>{t('email_validation_error')}</FormFeedback>}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup className="text-start mb-2">
                    <Label for="telephone" className={`fw-bold ${hasTelephoneError || hasTelephoneValidationError ? 'is-invalid' : ''}`}>
                      {t('telephone')}
                    </Label>
                    <PhoneInput
                      defaultCountry="bg"
                      name="telephone"
                      value={telephone}
                      onChange= {(e) => handleTelephoneInput(e)}
                      onBlur={(e) => handleTelephoneInput(e)}
                      className={`${hasTelephoneError || hasTelephoneValidationError ? 'is-invalid' : ''}`}
                      inputClassName={`form-control ${hasTelephoneError || hasTelephoneValidationError ? 'is-invalid' : ''}`}
                      ref={telephoneInputRef}
                      disabled={calulatedButtonClicked}
                    />
                    {hasTelephoneError && <FormFeedback>{t('telephone_error')}</FormFeedback>}
                    {hasTelephoneValidationError && <FormFeedback>{t('telephone_validation_error')}</FormFeedback>}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup className="text-start mb-2">
                    <Label for="width" className="fw-bold">{t('width_text')}</Label>
                    <Input
                      type="number"
                      disabled={calulatedButtonClicked}
                      name="width"
                      value={width}
                      onKeyDown={(e) => handleKeysInput(e)}
                      onKeyUp={(e) => handleKeysInput(e)}
                      onChange={e => handleWidthInput(e.target.value)}
                      invalid={hasWidthError}
                      innerRef={widthInputRef}
                    />
                    {hasWidthError && <FormFeedback>{t('has_width_error')}</FormFeedback>}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="text-start mb-2">
                    <Label for="height" className="fw-bold">{t('height_text')}</Label>
                    <Input type="number" disabled={calulatedButtonClicked} onChange={e => handleHeightInput(e.target.value)} name="height" value={height} invalid={hasHeightError} innerRef={heightInputRef} />
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
                      disabled={calulatedButtonClicked}
                      onKeyDown={(e) => handleKeysInput(e)}
                      onKeyUp={(e) => handleKeysInput(e)}
                      onChange={e => handleThickInput(e.target.value)}
                      className={`${calulatedButtonClicked && 'cursor-disabled'}`}>
                      {thickCount.map(option => {
                        return <option key={option.id}>{t(`${option.text}`)}</option>
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="text-start mb-2">
                    <Label for="edge" className="fw-bold" >{t('edges')}</Label>
                    <Input
                      type="number"
                      name="edge"
                      value={edge}
                      onKeyDown={(e) => handleKeysInput(e)}
                      onKeyUp={(e) => handleKeysInput(e)}
                      onChange={e => handleEdgeInput(e.target.value)}
                      invalid={hasEdgeError}
                      innerRef={edgeInputRef}
                      disabled={calulatedButtonClicked}
                    />
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
                        <Label className={`mb-0 ${calulatedButtonClicked && 'cursor-disabled'}`} for="without_fitting">
                          <Input
                            id="without_fitting"
                            name="radio"
                            type="radio"
                            defaultChecked
                            checked={radioCheck === 'without_fitting'}
                            disabled={calulatedButtonClicked}
                            onClick={(e) => handleRadioCheck('without_fitting')}
                          />
                          {t('without_fitting')}
                        </Label>
                      </div>
                    </Col>
                    <Col md="12" className="text-start">
                      <div className="flex">
                        <Label className={`mb-0 ${calulatedButtonClicked && 'cursor-disabled'}`} for="plastic_knobs">
                          <Input
                            id="plastic_knobs"
                            name="radio"
                            type="radio"
                            checked={radioCheck === 'plastic_knobs'}
                            disabled={calulatedButtonClicked}
                            onClick={(e) => handleRadioCheck('plastic_knobs')}
                          />
                          {t('plastic_knobs')}
                        </Label>
                      </div>
                    </Col>
                    <Col md="12" className="text-start">
                      <div className="flex">
                        <Label className={`mb-0 ${calulatedButtonClicked && 'cursor-disabled'}`} for="metal_knobs">
                          <Input
                            id="metal_knobs"
                            name="radio"
                            type="radio"
                            checked={radioCheck === 'metal_knobs'}
                            disabled={calulatedButtonClicked}
                            onClick={(e) => handleRadioCheck('metal_knobs')}
                          />
                          {t('metal_knobs')}
                        </Label>
                      </div>
                    </Col>
                    <Col md="12" className="text-start">
                      <div className="flex">
                        <Label className={`mb-0 ${calulatedButtonClicked && 'cursor-disabled'}`} for="strap_plates">
                          <Input
                            id="strap_plates"
                            name="radio"
                            type="radio"
                            checked={radioCheck === 'strap_plates'}
                            disabled={calulatedButtonClicked}
                            onClick={(e) => handleRadioCheck('strap_plates')}
                          />
                          {t('strap_plates')}
                        </Label>
                      </div>
                    </Col>
                    <Col md="12" className="text-start">
                      <div className="flex">
                        <Label className={`mb-0 ${calulatedButtonClicked && 'cursor-disabled'}`} for="pockets">
                          <Input
                            id="pockets"
                            name="radio"
                            type="radio"
                            checked={radioCheck === 'pockets'}
                            disabled={calulatedButtonClicked}
                            onClick={(e) => handleRadioCheck('pockets')}
                          />
                          {t('pockets')}
                        </Label>
                      </div>
                    </Col>
                    <Col md="12" className="text-start">
                      <Label className={`${calulatedButtonClicked && 'cursor-disabled'}`} for="zips">
                        <Input
                          id="zips"
                          name="zips"
                          type="checkbox"
                          className="me-2"
                          checked={zipsCheck}
                          disabled={calulatedButtonClicked}
                          onClick={(e) => handleZipsCheck(e)}
                        />
                        {t('zips')}
                      </Label>
                    </Col>
                    <Col md="12" className="text-start">
                      <Label className={`${calulatedButtonClicked && 'cursor-disabled'}`} for="lowerApron">
                        <Input
                          id="lowerApron"
                          name="lowerApron"
                          type="checkbox"
                          className="me-2"
                          checked={lowerApronCheck}
                          disabled={calulatedButtonClicked}
                          onClick={(e) => handleLoweApronCheck(e)}
                        />
                        {t('lower_apron')}
                      </Label>
                    </Col>
                    <Col md="12" className="text-start">
                      <Label className={`${calulatedButtonClicked && 'cursor-disabled'}`} for="pipePocket">
                        <Input
                          id="pipePocket"
                          name="pipePocket"
                          type="checkbox"
                          className="me-2"
                          checked={pipePocketCheck}
                          disabled={calulatedButtonClicked}
                          onClick={(e) => handlePipePocketCheck(e)}
                        />
                        {t('pipe_pocket')}
                      </Label>
                    </Col>
                    <Col md="12" className="text-start">
                      <Label className={`${calulatedButtonClicked && 'cursor-disabled'}`} for="knobs">
                        <Input
                          id="knobs"
                          name="knobs"
                          type="checkbox"
                          className="me-2"
                          checked={knobsCheck}
                          disabled={calulatedButtonClicked}
                          onClick={(e) => handleKnobsCheck(e)}
                        />
                        {t('knobs')}
                      </Label>
                    </Col>
                  </Row>
                  <Col md="12" className="text-start">
                    <Label className={`${calulatedButtonClicked && 'cursor-disabled'}`} for="curtainHaveDoor">
                      <Input
                        id="curtainHaveDoor"
                        name="curtainHaveDoor"
                        type="checkbox"
                        className="me-2"
                        checked={curtainHaveDoorCheck}
                        disabled={calulatedButtonClicked}
                        onClick={(e) => handleCurtainHaveDoorCheck(e)}
                      />
                      {t('curtain_have_door')}
                    </Label>
                  </Col>
                </Col>
                <Col md="6" className={`${!isMobile ? '' : 'mt-2'}`}>
                  <FormGroup className="text-start mb-2">
                    <Label for="date" className="fw-bold">{t('date_manufacture')}</Label>
                    <div className={`datepicker ${hasDateManufactureError ? "error" : ""}`}>
                      <Input
                        type="text"
                        id="dateManufacture"
                        name="dateManufacture"
                        placeholder={t("date_placeholder_text")}
                        value={
                          dateManufacture &&
                          dateManufacture.toLocaleDateString(
                            getDateLocale(localStorage.getItem("i18nextLng"))
                        )}
                        className={`form-control ${hasDateManufactureError ? 'is-invalid' : ''}`}
                        disabled={calulatedButtonClicked}
                        onFocus={(e) => {
                          setShowDatePicker(!showDatePicker);
                        }}
                        onChange={(e) => {
                          setShowDatePicker(!showDatePicker);
                        }}
                      />
                    </div>
                    {showDatePicker && (
                      <div ref={wrapperRef}>
                        <style>{css}</style>
                        <DayPicker
                          locale={getLocale(selectedLanguage)}
                          max={1}
                          mode="single"
                          initialMonth={lastMonth}
                          weekStartsOn={1}
                          selected={selectedDate}
                          onDayClick={handleDayClick}
                          fromMonth={lastMonth}
                          fromDate={lastMonth}
                          captionLayout="dropdown"
                          fromYear={2015}
                          toYear={2035}
                          onSelect={setSelectedDate}
                          modifiersClassNames={{
                            selected: "my-selected",
                            today: "my-today",
                          }}
                          modifiers={{
                            disabled: [
                              {
                                daysOfWeek: [0, 6],
                              },
                              {
                                before: new Date(),
                              },
                            ],
                          }}
                        />
                      </div>
                    )}
                    {hasDateManufactureError && (
                      <div className="date-error mt-1">
                        {t("has_date_manufacture_error")}
                      </div>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row className={`${!isMobile ? 'mt-3' : ''}`}>
                <Col md="12" className="text-start">
                  <FormGroup>
                    <Input
                      type="text"
                      name="description"
                      value={description}
                      placeholder={`${t('additional_description')}`}
                      className={`descripiton-field ${calulatedButtonClicked && 'cursor-disabled'}`}
                      disabled={calulatedButtonClicked}
                      onChange={e => handleDescriptionInput(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              {!isPending && totalPrice && (
                <Row className={`${!isMobile ? "mt-4" : "mt-2"}`}>
                  <Col md="12" className="text-start">
                    {t("total_price_text")}{" "}
                    {totalPrice && (
                      <span className="fw-bold">{`${totalPrice} BGN`}</span>
                    )}
                  </Col>
                </Row>
              )}
              {visible && !error && (
                <Row>
                  <Col>
                    <Message
                      isVisible={visible}
                      onDismiss={onDismiss}
                      text={`${t("thank_you_message_offer")}`}
                    />
                  </Col>
                </Row>
              )}
              {visible && error && (
                <Row>
                  <Col>
                    <Message
                      isVisible={visible}
                      onDismiss={onDismiss}
                      text={`${t("error_message")}`}
                    />
                  </Col>
                </Row>
              )}
              {!isLoading && !isPending ? (
                <>
                  <Row className="mt-2">
                    <Col>
                      {!calulatedButtonClicked && !orderButtonClicked && (
                        <Button
                          block
                          type="button"
                          className="bc-blue d-flex mt-3"
                          onClick={handleOfferPrice}
                        >
                          <span className={`fw-bold mx-auto text-transform ${!isMobile ? "" : "fs-14 text-nowrap"}`}>
                            {t("calculate_price_button")}
                          </span>
                        </Button>
                      )}
                      {calulatedButtonClicked && !orderButtonClicked && (
                        <>
                          <Row>
                            <Col>
                              <BlobProvider
                                document={
                                  <Offer
                                    title="offer_windproof_curtain"
                                    offerNo={offerNumber}
                                    parametersText="offer_parameters_text"
                                    items={items}
                                    totalPrice={totalPrice}
                                    fileName={t("file_name")}
                                    className="text-decoration-none"
                                  />
                                }
                              >
                                {({ blob, url, loading, error }) => {
                                  if (!loading && url !== "") {
                                    setSingleFile(blob);
                                    setFileName(`${t("file_name")}`);
                                  }
                                }}
                              </BlobProvider>
                              <Button
                                block
                                type="button"
                                className="bc-blue d-flex mt-3"
                                onClick={handleOfferFile}
                              >
                                <span className={`fw-bold mx-auto text-transform ${!isMobile ? "" : "fs-14 text-nowrap"}`}>
                                  {t("order_button")}
                                </span>
                              </Button>
                            </Col>
                          </Row>
                          <Row className="mt-3">
                            <Col>
                              <div className="d-flex">
                                <Button
                                  type="button"
                                  color="danger"
                                  outline
                                  block
                                  onClick={clearForm}
                                >
                                  <span className={`fw-bold text-transform ${!isMobile ? "" : "fs-14 ws-nw"}`}>
                                    {t("clear_button")}
                                  </span>
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </>
                      )}
                      {loadingComparedFiles && !sendEmailSucceed ?
                        <Spinner color="primary" /> :
                        <>
                          {calulatedButtonClicked && orderButtonClicked && (
                            <>
                              <div className="d-flex align-items-center justify-content-between">
                                <PDFDownloadLink
                                  document={
                                    <Offer
                                      title="offer_windproof_curtain"
                                      offerNo={offerNumber}
                                      parametersText="offer_parameters_text"
                                      items={items}
                                      totalPrice={totalPrice}
                                      fileName={t("file_name")}
                                      className="text-decoration-none"
                                    />
                                  }
                                  fileName={t("file_name")}
                                  className={`text-decoration-none ${!isMobile ? "" : "me-2"}`}>
                                  {({ blob, url, loading, error }) => (
                                    <Button
                                      type="button"
                                      outline
                                      block
                                      href={url}
                                      target="_blank"
                                    >
                                      <span className={`fw-bold mx-auto text-transform w-100 ${!isMobile ? "" : "fs-14 text-nowrap"}`}>
                                        {t("print_button")}
                                      </span>
                                    </Button>
                                  )}
                                </PDFDownloadLink>
                                <Button
                                  type="button"
                                  className="bc-blue w-65"
                                  onClick={() => {
                                    generatePdfDocument(
                                      `${t("file_name")}`,
                                      <Offer
                                        title="offer_windproof_curtain"
                                        offerNo={offerNumber}
                                        parametersText="offer_parameters_text"
                                        items={items}
                                        totalPrice={totalPrice}
                                        fileName={t("file_name")}
                                        className="text-decoration-none"
                                      />
                                    );
                                  }}
                                >
                                  <span className={`fw-bold text-transform ${!isMobile ? "" : "fs-14 text-nowrap"}`}>
                                    {t("download_button")}
                                  </span>
                                </Button>
                              </div>
                              <Row className="mt-3">
                                <Col>
                                  <div className="d-flex">
                                    <Button
                                      type="button"
                                      color="danger"
                                      outline
                                      block
                                      onClick={clearForm}
                                    >
                                      <span className={`fw-bold text-transform ${!isMobile ? "" : "fs-14 ws-nw"}`}>
                                        {t("clear_button")}
                                      </span>
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </>
                          )}
                        </>
                      }
                    </Col>
                  </Row>
                </>
              ) : (
                <Spinner color="primary" />
              )}
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