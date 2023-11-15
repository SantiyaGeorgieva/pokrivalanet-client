import { memo, useEffect, useRef, useState } from "react";
import { saveAs } from 'file-saver';
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { Row, Col, Form, FormFeedback, FormGroup, Input, Label, Button } from "reactstrap";
import { useTranslation } from "react-i18next";
import Gallery from "../../components/Gallery";
import Hr from "../../components/Hr";
import PageTitle from "../../components/PageTitle";
import invoice from "../../data/invoice.js";
import { windproofCurtains, windproofCurtainsOptions } from "../../constants";

import './windproofCurtains.scss';
import Offer from "../../components/reports/Offer.jsx";

const WindproofCurtains = ({ hideMain, isMobile, selectedItem, setSelectedItem }) => {
  const { t } = useTranslation();
  PageTitle(t('windproof_curtains_page_title'));

  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [description, setDescription] = useState('');
  const [select, setSelect] = useState(`${t('plastic_knobs')}`);
  const [zipCount, setZipCount] = useState('');
  const [knobCount, setKnobCount] = useState('');
  const [values, setValues] = useState([]);
  const [hasWidthError, setWidthError] = useState(false);
  const [hasHeightError, setHeightError] = useState(false);
  const [hasZipCountError, setZipCountError] = useState(false);
  const [hasKnobCountError, setKnobCountError] = useState(false);

  const [clicked, setClicked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedFile, setSingleFile] = useState(null);

  const [messageOpen, setMessageOpen] = useState(false);

  const selectRef = useRef(null);

  console.log(localStorage.getItem("i18nextLng"));

  useEffect(() => {
    console.log(hasWidthError, hasHeightError, values.length);

    if (!hasWidthError && !hasHeightError && values.length > 0) {
      console.log('here');
      setClicked(true);
      // const fileReader = new FileReader();
      // const a = fileReader.readAsDataURL(<Invoice invoice={invoice} />).toBlob();
      fetchOffer('PokrivalaOffer.pdf', selectedFile);
    } else {
      console.log('here2');
      setClicked(false);
    }
  }, [hasWidthError, hasHeightError, hasZipCountError, hasKnobCountError, values])

  // useEffect(() => {
  //   console.log('select', select);
  //   if (localStorage.getItem("i18nextLng") === 'bg') {
  //     setSelect("Плас")
  //   }
  // }, [localStorage.getItem("i18nextLng")]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (width === '') {
      setWidthError(true);
    } else if (width !== '') {
      setWidthError(false);
    }

    if (height === '') {
      setHeightError(true);
    } else if (height !== '') {
      setHeightError(false);
    }

    if (zipCount === '') {
      setZipCountError(true);
    } else if (zipCount !== '') {
      setZipCountError(false);
    }

    if (knobCount === '') {
      setKnobCountError(true);
    } else if (knobCount !== '') {
      setKnobCountError(false);
    }
    setValues([{ width: width, height: height, description: description, zipCount: zipCount, knobCount: knobCount }, ...values]);
  }

  function fetchOffer(fileName, document) {
    // console.log('document', document);
    const response = fetch(`http://localhost:3010/offer`, {
      method: "POST",
      body: JSON.stringify(values[0], document),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      attachments: [
        {
          filename: `${fileName}`,
          content: document,
          encoding: 'base64'
        }
      ],
    }).then(
      (response) => (response.json())
    ).then((response) => {
      if (response.status === 'success') {
        setValues([]);
        setWidth('');
        setHeight('');
        setDescription('');
        setZipCount('');
        setKnobCount('');
        setMessageOpen(true);
      } else if (response.status === 'fail') {
        console.log("Message failed to send.", response);
      }
    });

    return response;
  }

  const generatePdfDocument = async (fileName, pdfDocumentComponent) => {
    const blob = await pdf(pdfDocumentComponent).toBlob();
    saveAs(blob, fileName);
  };

  useEffect(() => {
    // console.log('test', windproofCurtainsOptions.filter(option => (t(`${option.text}`))));
    // console.log('select', select);
    // console.log('selectRef', selectRef.current.value);
  }, [localStorage.getItem("i18nextLng")])

  const handleChange = (e) => {
    console.log('e', e.target.value);
    if (localStorage.getItem("i18nextLng")) {
      setSelect(e.target.value);
    } else {
      setSelect(select);
    }
  }

  return <>{!hideMain &&
    <div className={`container ${isMobile ? '' : 'my-4'}`}>
      {isMobile ? <p className="text-wrapper mb-3">
        {t('main_text2')}
      </p>
        : <p className="text-start mb-5">{t('main_text2')}</p>
      }
      {/* <Row>
        <Col md="6" className={`${!isMobile ? 'text-start' : ''}`}>
          {!checked ? windproofCurtainsOptions.filter(option => (t(`${option.text}`) === select) && !option.checked === !checked).map(option => {
            return <img
              key={option.id}
              className={isMobile ? 'w-100' : 'w-75'}
              src={option.image}
            />
          })
            // console.log(t(`${option.text}`) === select && !option.checked === !checked),
            : windproofCurtainsOptions.filter(option => (t(`${option.text}`) === select && !option.checked === !checked)).map(option => {
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
                    <p>0.8 мм</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup className="text-start mb-2">
                    <FormGroup>
                      <Label for="select" className="fw-bold">{t('hardware_text')}</Label>
                      <Input
                        id="select"
                        name="select"
                        type="select"
                        defaultValue={select}
                        ref={selectRef}
                        onChange={e => setSelect(e.target.value)}>
                        {windproofCurtainsOptions.map(option => {
                          return !option.checked && <option key={option.id}>{t(`${option.text}`)}</option>
                        })}
                      </Input>
                    </FormGroup>
                  </FormGroup>
                </Col>
                {((select === 'Ципове' || select === 'Zips' || select === 'Fermoare') && !checked) && <Col md="6" className="text-start">
                  <Label for="zipCount">{t('count_of_zippers')}</Label>
                  <FormGroup>
                    <Input
                      type="number"
                      onChange={e => setZipCount(e.target.value)}
                      name="zipCount"
                      value={zipCount}
                      invalid={hasZipCountError}
                    />
                    {hasZipCountError && <FormFeedback>{t('has_count_of_zippers_error')}</FormFeedback>}
                  </FormGroup>
                </Col>}
                {(select === 'Кръгов обков' || select === 'Round fittings' || select === 'Garnituri rotunde') && <Row>
                  <Col md="6" className="text-start">
                    <Label for="knobCount">{t('count_of_knobs')}</Label>
                    <FormGroup>
                      <Input
                        type="number"
                        onChange={e => setSelect({ [e.target.name]: e.target.value })}
                        name="knobCount"
                        value={knobCount}
                        invalid={hasKnobCountError}
                      />
                      {hasKnobCountError && <FormFeedback>{t('has_count_of_knobs_error')}</FormFeedback>}
                    </FormGroup>
                  </Col>
                  <Col md="6" className="text-start">
                    <Label for="zipCount">{t('count_of_zippers')}</Label>
                    <FormGroup>
                      <Input
                        type="number"
                        onChange={e => setZipCount(e.target.value)}
                        name="zipCount"
                        value={zipCount}
                        invalid={hasZipCountError}
                      />
                      {hasZipCountError && <FormFeedback>{t('has_count_of_zippers_error')}</FormFeedback>}
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
                    <Label check onClick={e => setChecked(!checked)} for="checkbox">{t('curtain_have_door')}</Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="mt-3">
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
              <Row className="mt-2">
                <Col>
                  {!clicked ?
                    <PDFDownloadLink document={<Offer invoice={invoice} />} fileName={t('file_name')} className="text-decoration-none">
                      {({ blob, url, loading, error }) => {
                        setSingleFile(btoa(blob));
                        return loading ? 'Loading document...' :
                          <Button block type="submit" className="bc-blue d-flex mt-3">
                            <span className="fw-bold mx-auto text-transform">{t('order_button')}</span>
                          </Button>
                      }}
                    </PDFDownloadLink>
                    :
                    <div className="d-flex align-items-center justify-content-between">
                      <PDFDownloadLink document={<Offer invoice={invoice} />} fileName={t('file_name')} className="text-decoration-none">
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
                        onClick={() => { generatePdfDocument(`${t('file_name')}`, <Offer invoice={invoice} />); }}
                      >
                        <span className="fw-bold text-transform">{t('download_button')}</span>
                      </Button>
                    </div>
                  }
                </Col>
              </Row>
            </div>
          </Form>
        </Col>
      </Row> */}
      <Gallery images={windproofCurtains} isMobile={isMobile} />
      <Hr isMobile={isMobile} text={`${t('windproof_curtains_link')}`} />
    </div>
  }</>
}

export default WindproofCurtains;