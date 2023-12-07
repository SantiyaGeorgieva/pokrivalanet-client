import { memo, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { saveAs } from 'file-saver';
import { Row, Col, Spinner, Button, Label, Form, FormGroup, FormFeedback, Input } from "reactstrap";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { useTranslation } from "react-i18next";
import { DayPicker } from 'react-day-picker';
import { bg, ro, enGB } from 'date-fns/locale';
import PageTitle from "../../components/PageTitle";
import Offer from "../../components/offers/Offer";
import Message from "../../components/Message";
import StraniciShtoraSkapaciKomplektOtDve from '../../images/pokrivala_za_kamioni/248156970_4411504175607542_8164656237683932178_n.jpg';
import ShtoraBezKapaciKomlektOtDve from '../../images/pokrivala_za_kamioni/66785853_1766036520166145_1529046337771798528_n.jpg';
import { linkUrl } from "../../utils";
import { tarpaulinCount } from "../../constants";

import './truckCoversCalculator.scss';

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

const TruckCoversCalculator = memo(function TruckCoversCalculator({ hideMain, isMobile, offerTitle }) {
  const { t } = useTranslation();
  const location = useLocation();
  PageTitle(t('truck_covers_calculator_page_title'));

  const [selectedDate, setSelectedDate] = useState(null);
  const lastMonth = new Date();
  const today = lastMonth.setMonth(lastMonth.getMonth() - 2);
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
  const [isLoading, setLoading] = useState(false);

  const [selectedFile, setSingleFile] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  const [offerNumber, setOfferNumber] = useState('');
  const [totalPrice, setTotalPrice] = useState('');

  useEffect(() => {
    if (location.pathname) {
      localStorage.setItem("offerTitle", titlePage);
    }

  }, [location.pathname])

  useEffect(() => {
    console.log('test', values[0] && (Object.values(values[0]).includes(null) || Object.values(values[0]) === ""));
    console.log('test2', values[0] && values[0]);
    // console.log('values.length', values[0] && Object.entries(values[0]).length);
    if (values.length > 0) {
      if (titlePage === 'card_text4') {
        if (!hasWidthError && !hasLengthError && !hasHoodError && !hasBackCoverError && !hasFallingPipeError
          && !hasFallingRightError && !hasNumberStretchesError && !hasDateManufactureError) {
          console.log('HERE1');
          setClicked(true);
          fetchOfferPrice();
          fetchOfferFile();
        }
      } else if (titlePage !== 'card_text4') {
        if (!hasLengthError && !hasDateManufactureError) {
          console.log('HERE2', hasLengthError, hasDateManufactureError);
          setClicked(true);
          fetchOfferPrice();
          fetchOfferFile();
        }
      }
    }
  }, [hasWidthError, hasLengthError, hasHoodError, hasBackCoverError, hasFallingPipeError,
    hasFallingRightError, hasNumberStretchesError, hasDateManufactureError, values])

  // console.log('titlePage', titlePage);
  useEffect(() => {
    if (values.length > 0 && titlePage === 'card_text4') {
      console.log('HEREEE1');
      values.map((value, idx) => {
        setItems([{
          'width_cover_text': value.width,
          'length_cover_text': value.length,
          'hood_text': value.hood,
          'back_cover_text': value.back_cover,
          'falling_pipe': value.falling_pipe,
          'falling_to_right': value.falling_right,
          'number_stretches': value.number_stretches,
          'date_manufacture': selectedDate?.toLocaleDateString("ro-RO"),
          "tarpaulin_type": value.tarpaulin_type
        }
        ], ...items);
      });

      longitudinalPocketCheck && setItems(prevState => [...prevState, { longitudinal_pocket: "+" }]);
      fittingLeftCheck && setItems(prevState => [...prevState, { fitting_left: "+" }]);
      fittingRightCheck && setItems(prevState => [...prevState, { fitting_right: "+" }]);
      assemblyCheck && setItems(prevState => [...prevState, { assembly: "+" }]);
    } else if (values.length > 0 && titlePage !== 'card_text4') {
      values.map((value, idx) => {
        console.log('HEREEE2');
        setItems([{
          'length_cover_text': value.length,
          'date_manufacture': selectedDate?.toLocaleDateString("ro-RO"),
        }], ...items);
      });
    }
  }, [values])

  useEffect(() => {
    if (totalPrice > 0 && Object.keys(items).length > 0 && offerNumber !== '') {
      handlePdf(`${t('file_name')}`,
        <Offer offerNo={offerNumber} title={titlePage} parametersText="offer_parameters_text2" items={items} totalPrice={totalPrice} />, items);
    }
  }, [totalPrice, offerNumber, items]);

  useEffect(() => {
    if (file !== null && totalPrice > 0) {
      setTimeout(() => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          let dataUrl = reader.result;
          fetchOffer(dataUrl);
        }
      })

      console.log('file.size', file.size)
      console.log('selectedFile.size', selectedFile.size)

      if (file.size !== selectedFile.size && file !== null) {
        fetchOfferComapedFiles(offerNumber);
      }
    }
  }, [file]);

  const getLocale = (item) => {
    if (item === 'bg') {
      return bg;
    } else if (item === 'ro') {
      return ro;
    } else {
      return enGB;
    }
  };

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
    if (day >= lastMonth) {
      setSelectedDate(day);
    }
  };

  const disabledDays = { before: lastMonth };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (titlePage === 'card_text4') {
      console.log('HERE1')
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
      } else if (fallingRight !== '') {
        setFallingRightError(false);
      }

      if (numberStretches === '') {
        setNumberStretchesError(true);
      } else if (numberStretches !== '') {
        setNumberStretchesError(false);
      }

      if (selectedDate === null) {
        setDateManufactureError(true);
      } else if (selectedDate !== null) {
        setDateManufactureError(false);
      }
    } else {
      console.log('HERE2')
      if (length === '') {
        console.log('here1');
        setLengthError(true);
      } else if (length !== '') {
        setLengthError(false);
      }

      if (selectedDate === null) {
        console.log('here2');
        setDateManufactureError(true);
      } else if (selectedDate !== null) {
        setDateManufactureError(false);
      }
    }

    if (titlePage === 'card_text4') {
      console.log('HERE1');

      if ((!hasWidthError && !hasLengthError && !hasHoodError && !hasBackCoverError && !hasFallingPipeError
        && !hasFallingRightError && !hasNumberStretchesError && !hasDateManufactureError)) {
        console.log('HERE1');
        setValues([{
          width: width,
          length: length,
          hood: hood,
          back_cover: backCover,
          falling_pipe: fallingPipe,
          falling_right: fallingRight,
          number_stretches: numberStretches,
          tarpaulin_type: tarpaulin,
          date_manufacture: selectedDate,
          fitting_right: fittingRightCheck,
          longitudinal_pocket: longitudinalPocketCheck,
          assembly: assemblyCheck
        }, ...values]);
      }
    }

    else if (titlePage !== 'card_text4') {
      console.log('HERE2');

      if (!hasLengthError && !hasDateManufactureError) {
        console.log('HERE2');
        setValues([{
          length: length,
          date_manufacture: selectedDate
        }]);
      }
    }
  }

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
    setWidth('');
    setLength('');
    setHood('');
    setBackCover('');
    setTotalPrice('');
    setFallingPipe('');
    setFallingRight('');
    setNumberStretches('');
    setDateManufacture(null);
    setLongitudinalPocketCheck(false);
    setFittingLeftCheck(false);
    setFittingRightCheck(false);
    setAssemblyCheck(false);
    setValues([]);
    setClicked(false);
    setVisible(false);
  }

  function fetchOfferPrice() {
    console.log('values', values);
    if (values) {
      const response = fetch(`${linkUrl()}/truckcovers-priceoffer`, {
        method: "POST",
        body: JSON.stringify({ values: values[0], title: titlePage }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

      }, setLoading(true)).then(
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

  async function fetchOfferFile() {
    if (selectedFile) {
      const response = await fetch(`${linkUrl()}/truckcovers-offer-file`, {
        method: "POST",
        body: JSON.stringify({ filename: fileName, type: selectedFile.type, size: selectedFile.size }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }, setLoading(true)).then(
        (response) => (response.json())
      ).then((response) => {
        if (response.status === 'success') {
          setOfferNumber(response.offerId);
        } else if (response.status === 'fail') {
          console.log("Message failed to send.", response);
        }
      });

      return response;
    }
  }

  function fetchOffer(dataUrl) {
    if (dataUrl !== '') {
      const response = fetch(`${linkUrl()}/truckcovers-offer-email`, {
        method: "POST",
        body: JSON.stringify({ filename: fileName, file: dataUrl }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }, setLoading(true)).then(
        (response) => (response.json())
      ).then((response) => {
        if (response.status === 'success') {
          setVisible(true);
        } else if (response.status === 'fail') {
          console.log("Message failed to send.", response);
        }
      });
      setLoading(false);

      return response;
    }
  }

  async function fetchOfferComapedFiles(fileId) {
    console.log('file', file);
    if (fileId !== null) {
      const response = await fetch(`${linkUrl()}/truckcovers-offer-file-edit`, {
        method: "PUT",
        body: JSON.stringify({ id: fileId, filename: fileName, type: file.type, size: file.size }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }, setLoading(true)).then(
        (response) => (response.json())
      ).then((response) => {
        if (response.status === 'success') {
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
            {t(titlePage) === `${t('card_text7')}` && <img
              key="1"
              alt="cover_scheme"
              className="w-100"
              src={StraniciShtoraSkapaciKomplektOtDve}
            />}
            {t(titlePage) === `${t('card_text8')}` && <img
              key="1"
              alt="cover_scheme"
              className="w-100"
              src={ShtoraBezKapaciKomlektOtDve}
            />}
          </Col>
          <Col md="6">
            <Form className={`${isMobile ? 'mt-3' : ''}`} onSubmit={handleSubmit} method="POST" id="form" encType="multipart/form-data">
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
                      <Col md="6" className={`${!isMobile ? '' : 'mt-2'}`}>
                        <FormGroup className="text-start mb-2">
                          <Label for="dateManufacture" className="fw-bold">{t('date_manufacture')}</Label>
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
                                selected={selectedDate}
                                onDayClick={handleDayClick}
                                disabledDays={disabledDays}
                                fromMonth={lastMonth}
                                fromDate={lastMonth}
                                todayButton="Go to Today"
                                captionLayout="dropdown"
                                fromYear={2015}
                                toYear={2035}
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
                              initialMonth={lastMonth}
                              weekStartsOn={1}
                              selected={selectedDate}
                              onDayClick={handleDayClick}
                              disabledDays={disabledDays}
                              fromMonth={lastMonth}
                              fromDate={lastMonth}
                              todayButton="Go to Today"
                              captionLayout="dropdown"
                              fromYear={2015}
                              toYear={2035}
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
                }
                {!isLoading && <Row className={`${!isMobile ? 'mt-4' : 'mt-2'}`}>
                  <Col md="12" className="text-start">
                    {t('total_price_text')} {totalPrice && <span className="fw-bold">{`${totalPrice} BGN`}</span>}
                  </Col>
                </Row>}
                {visible &&
                  <Row>
                    <Col>
                      <Message isVisible={visible} onDismiss={onDismiss} text={`${t('thank_you_message_offer')}`} />
                    </Col>
                  </Row>}
                {!isLoading ?
                  <>
                    <Row className="mt-2">
                      <Col>
                        {!clicked ?
                          <PDFDownloadLink document={
                            <Offer title={titlePage} offerNo={offerNumber} parametersText="offer_parameters_text2" items={items} totalPrice={totalPrice} />}
                            fileName={t('file_name')} className="text-decoration-none">
                            {({ blob, url, loading, error }) => {
                              if (!loading && url !== '') {
                                setSingleFile(blob);
                                setFileName(`${t('file_name')}`);
                              }
                              return loading ? <Spinner color="primary" /> :
                                <Button block type="submit" className="bc-blue d-flex mt-3">
                                  <span className={`fw-bold mx-auto text-transform ${!isMobile ? '' : 'fs-14 text-nowrap'}`}>{t('calculate_price_button')}</span>
                                </Button>
                            }}
                          </PDFDownloadLink>
                          :
                          <div className="d-flex align-items-center justify-content-between">
                            <PDFDownloadLink document={
                              <Offer title={titlePage} offerNo={offerNumber} parametersText="offer_parameters_text2" items={items} totalPrice={totalPrice} />}
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
                                  <Offer title={titlePage} offerNo={offerNumber} parametersText="offer_parameters_text2" items={items} totalPrice={totalPrice} />);
                              }}
                            >
                              <span className={`fw-bold text-transform ${!isMobile ? '' : 'fs-14 text-nowrap'}`}>{t('download_button')}</span>
                            </Button>
                          </div>
                        }
                      </Col>
                    </Row>
                    {clicked && <Row className="mt-3">
                      <Col>
                        <div className="d-flex">
                          <Button
                            type="button"
                            color="danger"
                            outline
                            block
                            onClick={clearForm}>
                            <span className={`fw-bold text-transform ${!isMobile ? '' : 'fs-14 ws-nw'}`}>{t('clear_button')}</span>
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
      </div>
    }
  </>
});

export default TruckCoversCalculator;