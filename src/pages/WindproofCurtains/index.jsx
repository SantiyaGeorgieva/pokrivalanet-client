import { useEffect, useState } from "react";
import { saveAs } from 'file-saver';
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { Row, Col, Form, FormFeedback, FormGroup, Input, Label, Button } from "reactstrap";
import { useTranslation } from "react-i18next";
import Gallery from "../../components/Gallery";
import Hr from "../../components/Hr";
import PageTitle from "../../components/PageTitle";
import Offer from "../../components/offers/Offer.jsx";
import invoice from "../../data/invoice.js";
import { thickCount, windproofCurtains, windproofCurtainsOptions } from "../../constants";

import './windproofCurtains.scss';

const WindproofCurtains = ({ hideMain, isMobile }) => {
  const { t } = useTranslation();
  PageTitle(t('windproof_curtains_page_title'));

  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [thick, setThick] = useState('0.8');
  const [description, setDescription] = useState('');

  const [radioCheck, setRadioCheck] = useState('without_fitting');
  const [zipsCheck, setZipsCheck] = useState(false);
  const [lowerApronCheck, setLoweApronCheck] = useState(false);
  const [pipePocketCheck, setPipePocketCheck] = useState(false);
  const [knobsCheck, setKnobsCheck] = useState(false);

  const [edge, setEdge] = useState('');
  const [values, setValues] = useState([]);
  const [hasWidthError, setWidthError] = useState(false);
  const [hasHeightError, setHeightError] = useState(false);
  const [hasEdgeError, setEdgeError] = useState(false);

  const [clicked, setClicked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedFile, setSingleFile] = useState(null);

  const [messageOpen, setMessageOpen] = useState(false);

  useEffect(() => {
    // console.log(hasWidthError, hasHeightError, values.length);

    if (!hasWidthError && !hasHeightError && values.length > 0) {
      // console.log('here');
      setClicked(true);
      // const fileReader = new FileReader();
      // const a = fileReader.readAsDataURL(<Invoice invoice={invoice} />).toBlob();
      // fetchOffer(t('file_name'), selectedFile);
      // createFileForEmail();
      handlePdf();
    } else {
      // console.log('here2');
      setClicked(false);
    }
  }, [hasWidthError, hasHeightError, hasEdgeError, values])

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

    if (edge === '') {
      setEdgeError(true);
    } else if (edge !== '') {
      setEdgeError(false);
    }

    setValues([{ width: width, height: height, thick: thick, edge: edge, description: description }, ...values]);
  }

  const getPdfBlob = async () => {
    try {
      const blobPdf = await pdf(<Offer invoice={invoice} />).toBlob();
  
      return blobPdf;
    } catch (err) {
      console.log(err);
    }
  };

  const handlePdf = async () => {
    const pdf = await getPdfBlob();
    const fileName = t('file_name');
    const file = new File([pdf], fileName, {
      lastModified: (new Date()).getTime()
    }); /*create file*/

    if (file) {
      console.log('file', file);
      fetchOffer(file);
    }
  };

  function fetchOffer(document) {
    // console.log('document', document);
    console.log('values', values);
    if (document) {
      console.log('document', document);
      const response = fetch(`http://localhost:8080/offer`, {
        method: "POST",
        body: document,
        // body: JSON.stringify(document),
        // body: JSON.stringify(values[0]),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(
        (response) => (response.json())
      ).then((response) => {
        if (response.status === 'success') {
          setValues([]);
          setWidth('');
          setHeight('');
          setDescription('');
          setMessageOpen(true);
        } else if (response.status === 'fail') {
          console.log("Message failed to send.", response);
        }
      });
  
      return response;
    }
  }

  const generatePdfDocument = async (fileName, pdfDocumentComponent) => {
    const blob = await pdf(pdfDocumentComponent).toBlob();
    saveAs(blob, fileName);
  };

  return <>{!hideMain &&
    <div className={`container ${isMobile ? '' : 'my-4'}`}>
      {isMobile ? <p className="text-wrapper mb-3">
        {t('main_text2')}
      </p>
        : <p className="text-start mb-5">{t('main_text2')}</p>
      }
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
                <Col md="12" className="text-start">
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
              <Row>
                <Col md="6" className="text-start">
                  <FormGroup check>
                    <Input
                      id="curtainHaveDoor"
                      name="curtainHaveDoor"
                      type="checkbox"
                    />
                    <Label check onClick={e => setChecked(!checked)} for="curtainHaveDoor">{t('curtain_have_door')}</Label>
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
      </Row>
      <Gallery images={windproofCurtains} isMobile={isMobile} />
      <Hr isMobile={isMobile} text={`${t('windproof_curtains_link')}`} />
    </div>
  }</>
}

export default WindproofCurtains;