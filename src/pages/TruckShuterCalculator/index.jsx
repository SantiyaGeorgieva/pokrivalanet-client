import { memo, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { saveAs } from "file-saver";
import {
  Row,
  Col,
  Spinner,
  Button,
  Label,
  Form,
  FormGroup,
  FormFeedback,
  Input,
} from "reactstrap";
import { PDFDownloadLink, pdf, BlobProvider } from "@react-pdf/renderer";
import { useTranslation } from "react-i18next";
import { DayPicker } from "react-day-picker";
import PageTitle from "../../components/PageTitle";
import Offer from "../../components/offers/Offer";
import Message from "../../components/Message";
import { useApiFetchOfferPrice } from "../../hooks/useApiFetchOfferPrice";
import { useApiFetchOfferFile } from "../../hooks/useApiFetchOfferFile";
import { useApiFetchOfferComparedFiles } from "../../hooks/useFetchOfferComparedFiles";
import { useApiFetchSendEmail } from "../../hooks/useApiFetchSendEmail";
import useNamesValidation from "../../hooks/validators/useNamesValidation";
import useEmailValidation from "../../hooks/validators/useEmailValidation";
import usePhoneValidation from "../../hooks/validators/usePhoneValidation";
import useKeysValidation from "../../hooks/validators/useKeysValidation";
import StraniciShtoraSkapaciKomplektOtDve from "../../images/pokrivala_za_kamioni/248156970_4411504175607542_8164656237683932178_n.jpg";
import ShtoraBezKapaciKomlektOtDve from "../../images/pokrivala_za_kamioni/66785853_1766036520166145_1529046337771798528_n.jpg";
import { endpoints, getDateLocale, getLocale } from "../../utils";

import "./truckShuterCalculator.scss";

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

const TruckShuterCalculator = memo(function TruckShuterCalculator({
  hideMain,
  isMobile,
  offerTitle,
  selectedLanguage,
}) {

  const { t } = useTranslation();
  PageTitle(t("truck_covers_calculator_page_title"));
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
  };

  useOutsideAlerter(wrapperRef);

  const [titlePage, setTitlePage] = useState(
    offerTitle || localStorage.getItem("offerTitle")
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const lastMonth = new Date();
  const [length, setLength] = useState("");
  const [names, setNames] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [dateManufacture, setDateManufacture] = useState(selectedDate);
  const [items, setItems] = useState([]);
  const [hasLengthError, setLengthError] = useState(false);
  const [hasDateManufactureError, setDateManufactureError] = useState(false);
  const [hasEmailError, setEmailError] = useState(false);
  const [hasNamesValidationError, setNamesValidationError] = useState(false);
  const [hasEmailValidationError, setEmailValidationError] = useState(false);
  const [hasTelephoneError, setTelephoneError] = useState(false);
  const [hasTelephoneValidationError, setTelephoneValidationError] = useState(false);
  const [hasNamesError, setNamesError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [selectedFile, setSingleFile] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
  const [orderButtonClicked, setOrderButtonClicked] = useState(false);

  const inputRef = useRef(null);
  const namesInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const telephoneInputRef = useRef(null);

  const location = useLocation();
  const [error, setError] = useState(false);

  const { namesValue, isValidNames, validateNames } = useNamesValidation();
  const { emailValue, isValidEmail, validateEmail } = useEmailValidation();
  const { phoneNumber, isValidPhoneNumber, validatePhoneNumber } = usePhoneValidation();
  const { handleKeysInput } = useKeysValidation();

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

  const { sendEmailSucceed, errorSendEmail, fetchSendEmail } = useApiFetchSendEmail();

  useEffect(() => {
    if (location.pathname) {
      localStorage.setItem("offerTitle", titlePage);
    }
  }, [location.pathname]);

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
            await fetchSendEmail(names, email, dataUrl, fileName, endpoints.truckSendEmailUrl);
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
    setDateManufacture(day);
    setDateManufactureError(false);
  };

  useEffect(() => {
    selectedDate && selectedDate.toLocaleDateString(selectedLanguage);
  }, [selectedLanguage, selectedDate]);

  const handlePdf = async (name, pdfDocumentComponent, items) => {
    setFileName(name);
    let blobConvertFile = null;
    let fileBlob = null;
    if (Object.keys(items).length > 0) {
      blobConvertFile = await pdf(pdfDocumentComponent).toBlob();
    }
    if (blobConvertFile !== null) {
      fileBlob = await new File([blobConvertFile], `${t("file_name")}`, {
        type: "application/pdf",
      });
      setFile(fileBlob);
    }
  };

  const generatePdfDocument = async (fileName, pdfDocumentComponent) => {
    setLoading(true);
    const blob = await pdf(pdfDocumentComponent).toBlob();
    setSingleFile(blob);
    saveAs(blob, fileName);
    setLoading(false);
  };

  const clearForm = () => {
    setNames("");
    setEmail("");
    setTelephone("");
    setLength("");
    setDateManufacture(null);
    setSelectedDate('');
    setFileName("");
    setTotalPrice("");
    setFile(null);
    setSingleFile(null);
    setOrderButtonClicked(false);
    setCalculatedButtonClicked(false);
    setVisible(false);
    setError(false);
  };

  const handleOfferPrice = () => {
    if (namesInputRef.current && namesInputRef.current.value === "") {
      setNamesError(true);
    }

    if (emailInputRef.current && emailInputRef.current.value === "") {
      setEmailError(true);
    }

    if (telephoneInputRef.current && telephoneInputRef.current.value === "") {
      setTelephoneError(true);
    }

    if (inputRef.current && inputRef.current.value === "") {
      setLengthError(true);
    }

    if (dateManufacture === null) {
      setDateManufactureError(true);
      return;
    }

    if (!hasNamesValidationError && !hasEmailValidationError && !hasTelephoneValidationError && !hasLengthError && !hasDateManufactureError) {
      const values = [
        {
          names: names,
          email: email,
          telephone: telephone,
          length: length,
          date_manufacture: dateManufacture,
        },
      ];
      setItems([
        {
          names: names,
          email: email,
          telephone: telephone,
          length_cover_text: length,
          date_manufacture: dateManufacture.toLocaleDateString("ro-RO"),
        },
      ]);

      fetchOfferPrice([...values], titlePage, endpoints.truckPriceUrl);
    }
  };

  const handleOfferFile = async () => {
    setOrderButtonClicked(true);
    try {
      await fetchOfferPriceFile(fileName, selectedFile, endpoints.truckFileUrl);
    } catch (errorOfferFile) {
      setError(true);
      setVisible(true);
    }
  };

  const handleNamesInput = (e) => {
    validateNames(e.target.value);

    if (e.target.value === "") {
      setNames("");
      setNamesError(true);
      setNamesValidationError(false);
    } else if (isValidNames) {
      setNames(e.target.value);
      setNamesError(false);
      setNamesValidationError(false);
    } else {
      setNames(e.target.value);
      setNamesError(false);
      setNamesValidationError(true);
    }
  };

  const handleEmailInput = (e) => {
    validateEmail(e.target.value);

    if (e.target.value === "") {
      setEmail("");
      setEmailError(true);
      setEmailValidationError(false);
    } else if (isValidEmail) {
      setEmailError(false);
      setEmailValidationError(false);
      setEmail(e.target.value);
    } else {
      setEmail(e.target.value);
      setEmailError(false);
      setEmailValidationError(true);
    }
  };

  const handleTelephoneInput = (e) => {
    validatePhoneNumber(e.target.value);

    if (e.target.value === "") {
      setTelephone("");
      setTelephoneError(true);
      setTelephoneValidationError(false);
    } else if (isValidPhoneNumber) {
      setTelephoneError(false);
      setTelephoneValidationError(false);
      setTelephone(e.target.value);
    } else {
      setTelephone(e.target.value);
      setTelephoneError(false);
      setTelephoneValidationError(true);
    }
  };

  const handleLengthInput = (e) => {
    if (e.target.value === "") {
      setLengthError(true);
      setLength("");
    } else {
      setLengthError(false);
      setLength(e.target.value);
    }
  };

  return (
    <>
      {!hideMain && (
        <div className={`container ${isMobile ? "" : "my-4"}`}>
          <Row className="my-5">
            <h3 className="">{t(`${titlePage}`)}</h3>
          </Row>
          <Row className="mb-5">
            <Col lg="4" xl="6" className={`${!isMobile ? "text-start" : ""}`}>
              {t(titlePage) === `${t("card_text7")}` && (
                <img
                  key="1"
                  alt="cover_scheme"
                  className="w-100 img-thumbnail"
                  src={StraniciShtoraSkapaciKomplektOtDve}
                />
              )}
              {t(titlePage) === `${t("card_text8")}` && (
                <img
                  key="1"
                  alt="cover_scheme"
                  className="w-100 img-thumbnail"
                  src={ShtoraBezKapaciKomlektOtDve}
                />
              )}
            </Col>
            <Col lg="8" xl="6">
              <Form
                className={`${isMobile ? "mt-3" : ""}`}
                method="POST"
                id="form"
                encType="multipart/form-data"
              >
                <h4 className={`${isMobile ? "mb-3" : "mb-5"}`}>
                  {t("cover_data_text")}
                </h4>
                <div className={`container ${isMobile ? "mt-3" : "mt-5"}`}>
                  <Row>
                    <Col md="6">
                      <FormGroup className="text-start mb-2">
                        <Label className="fw-bold" for="names">{t('names')}</Label>
                        <Input
                          type="text"
                          name="names"
                          innerRef={namesInputRef}
                          onBlur={e => handleNamesInput(e)}
                          onChange={e => handleNamesInput(e)}
                          value={names}
                          invalid={hasNamesError || hasNamesValidationError}
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
                        <Label className="fw-bold" for="telephone">{t('telephone')}</Label>
                        <Input
                          type="text"
                          name="telephone"
                          onBlur={e => handleTelephoneInput(e)}
                          onChange={e => handleTelephoneInput(e)}
                          value={telephone}
                          invalid={hasTelephoneError || hasTelephoneValidationError}
                          innerRef={telephoneInputRef}
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
                        <Label for="length" className="fw-bold">
                          {t("length_cover_text")}
                        </Label>
                        <Input
                          type="number"
                          onKeyDown={(e) => handleKeysInput(e)}
                          onKeyUp={(e) => handleKeysInput(e)}
                          onChange={(e) => handleLengthInput(e)}
                          name="length"
                          value={length}
                          invalid={hasLengthError}
                          disabled={calulatedButtonClicked}
                          innerRef={inputRef}
                        />
                        {hasLengthError && (
                          <FormFeedback>
                            {t("has_length_cover_error")}
                          </FormFeedback>
                        )}
                      </FormGroup>
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
                              selectedDate &&
                              selectedDate.toLocaleDateString(
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
                              <span
                                className={`fw-bold mx-auto text-transform ${!isMobile ? "" : "fs-14 text-nowrap"}`}>
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
                                      className={`fw-bold mx-auto text-transform ${!isMobile ? "" : "fs-14 text-nowrap"}`}>
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
                                          title={titlePage}
                                          offerNo={offerNumber}
                                          parametersText="offer_parameters_text2"
                                          items={items}
                                          totalPrice={totalPrice}
                                        />
                                      }
                                      fileName={t("file_name")}
                                      className={`text-decoration-none ${!isMobile ? "" : "me-2"}`}
                                    >
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
                                            title={titlePage}
                                            offerNo={offerNumber}
                                            parametersText="offer_parameters_text2"
                                            items={items}
                                            totalPrice={totalPrice}
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
        </div>
      )}
    </>
  );
});

export default TruckShuterCalculator;