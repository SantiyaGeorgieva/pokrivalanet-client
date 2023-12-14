import { memo, useEffect, useReducer, useRef, useState } from "react";
import { useLocation } from "react-router";
import { saveAs } from 'file-saver';
import { Row, Col, Spinner, Button, Label, Form, FormGroup, FormFeedback, Input } from "reactstrap";
import { BlobProvider, PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { useTranslation } from "react-i18next";
import { DayPicker } from 'react-day-picker';
import PageTitle from "../../components/PageTitle";
import Offer from "../../components/offers/Offer";
import Message from "../../components/Message";
import { useApiFetchOfferPrice } from "../../hooks/useApiFetchOfferPrice";
import { useApiFetchOfferFile } from "../../hooks/useApiFetchOfferFile";
import { useApiFetchOfferComparedFiles } from "../../hooks/useFetchOfferComparedFiles";
import { useApiFetchSendEmail } from "../../hooks/useApiFetchSendEmail";
import CoverScheme from '../../images/cover_scheme.png';
import { endpoints, getDateLocale, getLocale } from "../../utils";
import { tarpaulinCount } from "../../constants";

import { truckCalculatorReducer, initialState } from "../../components/reducers/truckCalculatorReducer";
import {
  ADD_CHECK,
  SET_ASSEMBLYCHECK,
  SET_BACKCOVER,
  SET_DATEMANUFACTURE,
  SET_FALLINGPIPE,
  SET_FALLINGRIGHT,
  SET_FITTINGLEFTCHECK,
  SET_FITTINGRIGHTCHECK,
  SET_HOOD, SET_ITEMS,
  SET_LENGTH,
  SET_LONGITUDIALPOCKETCHECK,
  SET_NUMBERSTRETCHES,
  SET_WIDTH,
  CLEAR_ALL,
  CLEAR_BACKCOVER,
  CLEAR_FALLINGPIPE,
  CLEAR_FALLINGRIGHT,
  CLEAR_HOOD,
  CLEAR_LENGHT,
  CLEAR_NUMBERSTRETCHES,
  REMOVE_CHECK,
  CLEAR_WIDTH
} from "../../actionTypes";

import './truckGondolaCalculator.scss';

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

const TruckGondolaCalculator = memo(function TruckGondolaCalculator({ hideMain, isMobile, offerTitle, selectedLanguage }) {
  const { t } = useTranslation();
  const location = useLocation();
  PageTitle(t('truck_covers_calculator_page_title'));

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

  const [items, dispatchItems] = useReducer(truckCalculatorReducer, []);
  const [state, dispatch] = useReducer(truckCalculatorReducer, initialState);

  const { width, length, hood, backCover, fallingPipe, fallingRight, numberStretches, dateManufacture, longitudinalPocketCheck, fittingLeftCheck, fittingRightCheck, assemblyCheck } = state;
  const [titlePage, setTitlePage] = useState(offerTitle || localStorage.getItem('offerTitle'));
  const [tarpaulin, setTarpaulin] = useState('680гр/кв.м');

  const [hasWidthError, setWidthError] = useState(false);
  const [hasLengthError, setLengthError] = useState(false);
  const [hasHoodError, setHoodError] = useState(false);
  const [hasBackCoverError, setBackCoverError] = useState(false);
  const [hasFallingPipeError, setFallingPipeError] = useState(false);
  const [hasFallingRightError, setFallingRightError] = useState(false);
  const [hasNumberStretchesError, setNumberStretchesError] = useState(false);
  const [hasDateManufactureError, setDateManufactureError] = useState(false);

  const [orderButtonClicked, setOrderButtonClicked] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [selectedFile, setSingleFile] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  const widthInputRef = useRef(null);
  const lengthInputRef = useRef(null);
  const hoodInputRef = useRef(null);
  const backCoverInputRef = useRef(null);
  const fallingPipeInputRef = useRef(null);
  const fallingRightInputRef = useRef(null);
  const numberStretchesInputRef = useRef(null);

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

  const { errorComparedFiles, fetchOfferComparedFiles } =
    useApiFetchOfferComparedFiles();

  const { errorSendEmail, fetchSendEmail } = useApiFetchSendEmail();

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
            title={titlePage}
            parametersText="offer_parameters_text2"
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
        await fetchOfferComparedFiles(offerNumber, fileName, file, endpoints.truckComparedFilesUrl);
        if (!errorComparedFiles) {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = async () => {
            let dataUrl = reader.result;
            await fetchSendEmail(dataUrl, fileName, endpoints.truckSendEmailUrl);
            if (!errorSendEmail) {
              setVisible(true);
            }
          };
        }
      };

      fetchData();
    }
  }, [file]);

  const hideDatePicker = () => {
    setShowDatePicker(false);
  };

  const handleDayClick = (day) => {
    setShowDatePicker(!showDatePicker);
    setSelectedDate(day);
    dispatch({ type: SET_DATEMANUFACTURE, value: day });
    setDateManufactureError(false);
  };

  const handleWidthInput = (e) => {
    if (e.target.value === "") {
      setWidthError(true);
      dispatch({ type: CLEAR_WIDTH, value: "" });
    } else {
      setWidthError(false);
      dispatch({ type: SET_WIDTH, value: e.target.value });
    }
  };

  const handleLengthInput = (e) => {
    if (e.target.value === "") {
      setLengthError(true);
      dispatch({ type: CLEAR_LENGHT, value: "" });
    } else {
      setLengthError(false);
      dispatch({ type: SET_LENGTH, value: e.target.value });
    }
  };

  const handleHoodInput = (e) => {
    if (e.target.value === "") {
      setHoodError(true);
      dispatch({ type: CLEAR_HOOD, value: "" });
    } else {
      setHoodError(false);
      dispatch({ type: SET_HOOD, value: e.target.value });
    }
  };

  const handleBackCoverInput = (e) => {
    if (e.target.value === "") {
      setBackCoverError(true);
      dispatch({ type: CLEAR_BACKCOVER, value: "" });
    } else {
      setBackCoverError(false);
      dispatch({ type: SET_BACKCOVER, value: e.target.value });
    }
  };

  const handleFallingPipeInput = (e) => {
    if (e.target.value === "") {
      setFallingPipeError(true);
      dispatch({ type: CLEAR_FALLINGPIPE, value: "" });
    } else {
      setFallingPipeError(false);
      dispatch({ type: SET_FALLINGPIPE, value: e.target.value });
    }
  };

  const handleFallingRightInput = (e) => {
    if (e.target.value === "") {
      setFallingRightError(true);
      dispatch({ type: CLEAR_FALLINGRIGHT, value: "" });
    } else {
      setFallingRightError(false);
      dispatch({ type: SET_FALLINGRIGHT, value: e.target.value });
    }
  };

  const handleNumberStretchesInput = (e) => {
    if (e.target.value === "") {
      setNumberStretchesError(true);
      dispatch({ type: CLEAR_NUMBERSTRETCHES, value: "" });
    } else {
      setNumberStretchesError(false);
      dispatch({ type: SET_NUMBERSTRETCHES, value: e.target.value });
    }
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
  }

  const handleOfferPrice = () => {
    if (widthInputRef.current && widthInputRef.current.value === "") {
      setWidthError(true);
    }

    if (lengthInputRef.current && lengthInputRef.current.value === "") {
      setLengthError(true);
    }

    if (hoodInputRef.current && hoodInputRef.current.value === "") {
      setHoodError(true);
    }

    if (backCoverInputRef.current && backCoverInputRef.current.value === "") {
      setBackCoverError(true);
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

  const handleOfferFile = async () => {
    setOrderButtonClicked(true);
    try {
      await fetchOfferPriceFile(fileName, selectedFile, endpoints.truckFileUrl);
    } catch (errorOfferFile) {
      console.log("something went wrong");
    }
  };

  const handlelongitudinalPocketCheck = (e) => {
    dispatch({ type: SET_LONGITUDIALPOCKETCHECK, payload: !longitudinalPocketCheck });
  }

  const handleFittingRightCheck = (e) => {
    dispatch({ type: SET_FITTINGRIGHTCHECK, payload: !fittingRightCheck });
  }

  const handleFittingLeftCheck = (e) => {
    dispatch({ type: SET_FITTINGLEFTCHECK, payload: !fittingLeftCheck });
  }

  const handleAssemblyCheck = (e) => {
    dispatch({ type: SET_ASSEMBLYCHECK, payload: !assemblyCheck });
  }

  return <>
    {!hideMain &&
      <div className={`container ${isMobile ? '' : 'my-4'}`}>
        <Row className="my-5">
          <h3 className="">{t(`${titlePage}`)}</h3>
        </Row>
        <Row className="mb-5">
          <Col md="6" className={`${!isMobile ? 'text-start' : ''}`}>
            {t(titlePage) === `${t('card_text4')}` && <img
              key="1"
              alt="cover_scheme"
              className="w-100"
              src={CoverScheme}
            />}
          </Col>
          <Col md="6">
            <Form className={`${isMobile ? 'mt-3' : ''}`} method="POST" id="form" encType="multipart/form-data">
              <h4 className={`${isMobile ? 'mb-3' : 'mb-5'}`}>{t('cover_data_text')}</h4>
              <div className={`container ${isMobile ? 'mt-3' : 'mt-5'}`}>
                <Row>
                  <Col md="6">
                    <FormGroup className="text-start mb-2">
                      <Label for="width" className="fw-bold">{t('width_cover_text')}</Label>
                      <Input
                        type="number"
                        name="width"
                        onChange={(e) => handleWidthInput(e)}
                        value={width}
                        innerRef={widthInputRef}
                        invalid={hasWidthError}
                        disabled={calulatedButtonClicked}
                      />
                      {hasWidthError && <FormFeedback>{t('has_width_cover_error')}</FormFeedback>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup className="text-start mb-2">
                      <Label for="length" className="fw-bold">
                        {t("length_cover_text")}
                      </Label>
                      <Input
                        type="number"
                        onChange={(e) => handleLengthInput(e)}
                        name="length"
                        value={length}
                        invalid={hasLengthError}
                        disabled={calulatedButtonClicked}
                        innerRef={lengthInputRef}
                      />
                      {hasLengthError && (
                        <FormFeedback>
                          {t("has_length_cover_error")}
                        </FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup className="text-start mb-2">
                      <Label for="hood" className="fw-bold">{t('hood_text')}</Label>
                      <Input type="number" onChange={e => handleHoodInput(e)} name="hood" value={hood} invalid={hasHoodError} disabled={calulatedButtonClicked} innerRef={hoodInputRef} />
                      {hasHoodError && <FormFeedback>{t('has_hood_error')}</FormFeedback>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup className="text-start mb-2">
                      <Label for="backCover" className="fw-bold">{t('back_cover_text')}</Label>
                      <Input type="number" onChange={e => handleBackCoverInput(e)} name="backCover" value={backCover} invalid={hasBackCoverError} disabled={calulatedButtonClicked} innerRef={backCoverInputRef} />
                      {hasBackCoverError && <FormFeedback>{t('has_back_cover_error')}</FormFeedback>}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup className="text-start mb-2">
                      <Label for="fallingPipe" className="fw-bold">{t('falling_pipe')}</Label>
                      <Input type="number" onChange={e => handleFallingPipeInput(e)} name="fallingPipe" value={fallingPipe} invalid={hasFallingPipeError} disabled={calulatedButtonClicked} innerRef={fallingPipeInputRef} />
                      {hasFallingPipeError && <FormFeedback>{t('has_falling_pipe_error')}</FormFeedback>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup className="text-start mb-2">
                      <Label for="fallingRight" className="fw-bold">{t('falling_to_right')}</Label>
                      <Input type="number" onChange={e => handleFallingRightInput(e)} name="fallingRight" value={fallingRight} invalid={hasFallingRightError} disabled={calulatedButtonClicked} innerRef={fallingRightInputRef} />
                      {hasFallingRightError && <FormFeedback>{t('has_falling_right_error')}</FormFeedback>}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup className="text-start mb-2">
                      <Label for="numberStretches" className="fw-bold">{t('number_stretches')}</Label>
                      <Input type="number" onChange={e => handleNumberStretchesInput(e)} name="numberStretches" value={numberStretches} invalid={hasNumberStretchesError} disabled={calulatedButtonClicked} innerRef={numberStretchesInputRef} />
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
                        disabled={calulatedButtonClicked}
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
                        <>
                          <Input
                            id="longitudinalPocket"
                            name="longitudinalPocket"
                            type="checkbox"
                            className="me-2"
                            checked={longitudinalPocketCheck}
                            disabled={calulatedButtonClicked}
                            onClick={(e) => handlelongitudinalPocketCheck(e)}
                          />
                          <Label className={`${calulatedButtonClicked && 'cursor-disabled'}`} for="longitudinalPocket">
                            {t('longitudinal_pocket')}
                          </Label>
                        </>
                      </Col>
                      <Col md="12" className="text-start">
                        <>
                          <Label className={`${calulatedButtonClicked && 'cursor-disabled'}`} for="fittingRightCheck">
                            <Input
                              id="fittingRightCheck"
                              name="fittingRightCheck"
                              type="checkbox"
                              className="me-2"
                              checked={fittingRightCheck}
                              disabled={calulatedButtonClicked}
                              onClick={(e) => handleFittingRightCheck(e)}
                            />
                            {t('fitting_right')}
                          </Label>
                        </>
                      </Col>
                      <Col md="12" className="text-start">
                        <>
                          <Label className={`${calulatedButtonClicked && 'cursor-disabled'}`} for="fittingLeftCheck">
                            <Input
                              id="fittingLeftCheck"
                              name="fittingLeftCheck"
                              type="checkbox"
                              className="me-2"
                              checked={fittingLeftCheck}
                              disabled={calulatedButtonClicked}
                              onClick={(e) => handleFittingLeftCheck(e)}
                            />
                            {t('fitting_left')}
                          </Label>
                        </>
                      </Col>
                      <Col md="12" className="text-start">
                        <>
                          <Label className={`${calulatedButtonClicked && 'cursor-disabled'}`} for="assembly">
                            <Input
                              id="assembly"
                              name="assembly"
                              type="checkbox"
                              className="me-2"
                              checked={assemblyCheck}
                              disabled={calulatedButtonClicked}
                              onClick={(e) => handleAssemblyCheck(e)}
                            />
                            {t('assembly')}
                          </Label>
                        </>
                      </Col>
                    </Row>
                  </Col>
                  <Col md="6">
                    <FormGroup className="text-start mb-2">
                      <Label for="date" className="fw-bold">
                        {t("date_manufacture")}
                      </Label>
                      <div
                        className={`datepicker ${hasDateManufactureError ? "error" : ""
                          }`}
                      >
                        <Input
                          type="text"
                          value={
                            dateManufacture &&
                            dateManufacture.toLocaleDateString(
                              getDateLocale(
                                localStorage.getItem("i18nextLng")
                              )
                            )
                          }
                          disabled={calulatedButtonClicked}
                          id="dateManufacture"
                          placeholder={t("date_placeholder_text")}
                          name="dateManufacture"
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
                {visible && (
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
                {!isLoading ? (
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
                            <span
                              className={`fw-bold mx-auto text-transform ${!isMobile ? "" : "fs-14 text-nowrap"
                                }`}
                            >
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
                                      title={titlePage}
                                      offerNo={offerNumber}
                                      parametersText="offer_parameters_text2"
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
                                  <span
                                    className={`fw-bold mx-auto text-transform ${!isMobile ? "" : "fs-14 text-nowrap"
                                      }`}
                                  >
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
                                    <span
                                      className={`fw-bold text-transform ${!isMobile ? "" : "fs-14 ws-nw"
                                        }`}
                                    >
                                      {t("clear_button")}
                                    </span>
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                          </>
                        )}
                        {calulatedButtonClicked && orderButtonClicked && (
                          <>
                            <div className="d-flex align-items-center justify-content-between">
                              <PDFDownloadLink
                                document={
                                  <Offer
                                    title={titlePage}
                                    offerNo={offerNumber}
                                    parametersText="offer_parameters_text2"
                                    items={items}
                                    totalPrice={totalPrice}
                                  />
                                }
                                fileName={t("file_name")}
                                className={`text-decoration-none ${!isMobile ? "" : "me-2"
                                  }`}
                              >
                                {({ blob, url, loading, error }) => (
                                  <Button
                                    type="button"
                                    outline
                                    block
                                    href={url}
                                    target="_blank"
                                  >
                                    <span
                                      className={`fw-bold mx-auto text-transform w-100 ${!isMobile ? "" : "fs-14 text-nowrap"
                                        }`}
                                    >
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
                                      title={titlePage}
                                      offerNo={offerNumber}
                                      parametersText="offer_parameters_text2"
                                      items={items}
                                      totalPrice={totalPrice}
                                    />
                                  );
                                }}
                              >
                                <span
                                  className={`fw-bold text-transform ${!isMobile ? "" : "fs-14 text-nowrap"
                                    }`}
                                >
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
                                    <span
                                      className={`fw-bold text-transform ${!isMobile ? "" : "fs-14 ws-nw"
                                        }`}
                                    >
                                      {t("clear_button")}
                                    </span>
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                          </>
                        )}
                      </Col>
                    </Row>
                  </>
                ) : (
                  <Spinner color="primary" />
                )}
              </div>
            </Form>
          </Col>
        </Row >
      </div >
    }
  </>
});

export default TruckGondolaCalculator;