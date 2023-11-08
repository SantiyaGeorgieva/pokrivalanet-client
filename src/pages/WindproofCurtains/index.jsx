import { memo, useEffect, useState } from "react";
import { saveAs } from 'file-saver';
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
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
  const [height, setHeight] = useState('');
  const [description, setDescription] = useState('');
  const [select, setSelect] = useState('Пластмасови въртящи копчета');
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
          {!checked ? windproofCurtainsOptions.filter(option => option.text === select && !option.checked === !checked).map(option => {
            return <img
              key={option.id}
              className={isMobile ? 'w-100' : 'w-75'}
              src={option.image}
            />
          })
            : windproofCurtainsOptions.filter(option => option.text === select && option.checked === checked).map(option => {
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
            <h4 className={`${isMobile ? 'mb-3' : 'mb-5'}`}>Данни за завесата</h4>
            <div className={`container ${isMobile ? 'mt-3' : 'mt-5'}`}>
              <Row>
                <Col md="6">
                  <FormGroup className="text-start mb-2">
                    <Label for="width" className="fw-bold">Ширина</Label>
                    <Input type="number" name="width" onChange={e => setWidth(e.target.value)} value={width}
                      invalid={hasWidthError}
                    />
                    {hasWidthError && <FormFeedback>Моля, въведете ширина.</FormFeedback>}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="text-start mb-2">
                    <Label for="height" className="fw-bold">Височина</Label>
                    <Input type="number" onChange={e => setHeight(e.target.value)} name="height" value={height} invalid={hasHeightError} />
                    {hasHeightError && <FormFeedback>Моля, въведете височина.</FormFeedback>}
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
                        defaultValue={select}
                        onChange={e => setSelect(e.target.value)}>
                        {windproofCurtainsOptions.map(option => {
                          return !option.checked && <option key={option.id}>{option.text}</option>
                        })}
                      </Input>
                    </FormGroup>
                  </FormGroup>
                </Col>
                {(select === 'Ципове' && !checked) && <Col md="6" className="text-start">
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
                {select === 'Кръгов обков' && <Row>
                  <Col md="6" className="text-start">
                    <Label for="zipCount">Брой колани</Label>
                    <FormGroup>
                      <Input
                        type="number"
                        onChange={e => setSelect({ [e.target.name]: e.target.value })}
                        name="zipCount"
                        value={knobCount}
                        invalid={hasKnobCountError}
                      />
                      {hasKnobCountError && <FormFeedback>Моля, въведете брой колани.</FormFeedback>}
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
                    <Label check onClick={e => setChecked(!checked)} for="checkbox">Завесата има врата</Label>
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
                  {!clicked ?
                    <PDFDownloadLink document={<Invoice invoice={invoice} />} fileName="PokrivalaOffer.pdf" className="text-decoration-none">
                      {({ blob, url, loading, error }) => {
                        setSingleFile(btoa(blob));
                        return loading ? 'Loading document...' :
                          <Button block type="submit" className="bc-blue d-flex mt-3">
                            <span className="fw-bold mx-auto text-transform">Поръчай!</span>
                          </Button>
                      }}
                    </PDFDownloadLink>
                    :
                    <div className="d-flex align-items-center justify-content-between">
                      <PDFDownloadLink document={<Invoice invoice={invoice} />} fileName="PokrivalaOffer.pdf" className="text-decoration-none">
                        {({ blob, url, loading, error }) =>
                          loading ? 'Loading document...' :
                            <Button type="button" outline block href={url} target="_blank">
                              <span className="fw-bold mx-auto text-transform">Разпечатай оферта</span>
                            </Button>
                        }
                      </PDFDownloadLink>
                      <Button
                        type="button"
                        className="bc-blue w-65"
                        onClick={() => { generatePdfDocument('PokrivalaOffer.pdf', <Invoice invoice={invoice} />); }}
                      >
                        <span className="fw-bold text-transform">Свали оферта</span>
                      </Button>
                    </div>
                  }
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