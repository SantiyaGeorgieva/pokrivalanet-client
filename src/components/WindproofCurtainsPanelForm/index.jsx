import { useState, useRef, useEffect, useReducer } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Spinner
} from "reactstrap";
import { endpoints, validateNumbersInput } from "../../utils";
import { useApiFetchPrice } from "../../hooks/useApiFetchPrice";
import { useApiFetchEditPrice } from "../../hooks/useApiFetchEditPrice";
import { initialState, windproofCurtainsReducer } from "../../reducers/windproofCurtainsReducer";
import {
  SET_THICK_FIRST_PRICE,
  SET_THICK_SECOND_PRICE,
  SET_PLASTIC_KNOBS_PRICE,
  SET_METAL_KNOBS_PRICE,
  SET_STRAP_PLATES_PRICE,
  SET_POCKETS_PRICE,
  SET_ZIP_PRICE,
  SET_KNOBS_PRICE,
  SET_CURTAIN_PRICE
} from "../../actionTypes";

const WindproofCurtainsPanelForm = ({ isMobile }) => {
  const {
    pricedFetch,
    isPending,
    isError,
    fetchPrice
  } = useApiFetchPrice();
  const { loadingComparedFiles, fetchEditPrice } = useApiFetchEditPrice();
  const [state, dispatch] = useReducer(windproofCurtainsReducer, initialState);
  const {
    price_thick_1,
    price_thick_2,
    price_plastic_knobs,
    price_metal_knobs,
    price_strap_plates,
    price_pockets,
    price_zip,
    price_knobs,
    price_curtain
  } = state;
  const [hasThickFirstPriceError, seThickFirstPriceError] = useState(false);
  const [hasThickSecondPriceError, setThickSecondPriceError] = useState(false);
  const [hasPlasticKnobsPriceError, setPlasticKnobsPriceError] = useState(false);
  const [hasMetalKnobsPriceError, setMetalKnobsPriceError] = useState(false);
  const [hasStrapPlatesPriceError, setStrapPlatesPriceError] = useState(false);
  const [hasPocketsPriceError, setPocketsPriceError] = useState(false);
  const [hasZipPriceError, setZipPriceError] = useState(false);
  const [hasKnobsPriceError, setKnobsPriceError] = useState(false);
  const [hasCurtainPriceError, setCurtainPriceError] = useState(false);
  const [mode, setMode] = useState(false);

  const thickFirstPriceInputRef = useRef(null);
  const thickSecondPriceInputRef = useRef(null);
  const plasticKnobsPriceInputRef = useRef(null);
  const metalKnobsPriceInputRef = useRef(null);
  const strapPlatesPriceInputRef = useRef(null);
  const pocketsPriceInputRef = useRef(null);
  const zipPriceInputRef = useRef(null);
  const knobsPriceInputRef = useRef(null);
  const curtainPriceInputRef = useRef(null);

  useEffect(() => {
    if (!isPending && !isError && Object.keys(pricedFetch).length > 0) {
      dispatch({
        type: SET_THICK_FIRST_PRICE,
        value: pricedFetch.price_thick_1
      });
      dispatch({
        type: SET_THICK_SECOND_PRICE,
        value: pricedFetch.price_thick_2
      });
      dispatch({
        type: SET_PLASTIC_KNOBS_PRICE,
        value: pricedFetch.price_plastic_knobs
      });
      dispatch({
        type: SET_METAL_KNOBS_PRICE,
        value: pricedFetch.price_metal_knobs
      });
      dispatch({
        type: SET_STRAP_PLATES_PRICE,
        value: pricedFetch.price_strap_plates
      });
      dispatch({
        type: SET_POCKETS_PRICE,
        value: pricedFetch.price_pockets
      });
      dispatch({
        type: SET_ZIP_PRICE,
        value: pricedFetch.price_zip
      });
      dispatch({
        type: SET_KNOBS_PRICE,
        value: pricedFetch.price_knobs
      });
      dispatch({
        type: SET_CURTAIN_PRICE,
        value: pricedFetch.price_curtain
      });
    } else {
      fetchPrice(`${endpoints.windproofPricesUrl}`);
    }
  }, [Object.keys(pricedFetch).length])

  const handleMode = () => {
    setMode(!mode);
  };

  const handleThickFirstPriceInput = (e) => {
    if (e.target.value === "") {
      seThickFirstPriceError(true);
      dispatch({ type: SET_THICK_FIRST_PRICE, value: "" });
    } else {
      seThickFirstPriceError(false);
      dispatch({ type: SET_THICK_SECOND_PRICE, value: e.target.value });
    }
  };

  const handleThickSecondPriceInput = (e) => {
    if (e.target.value === "") {
      setThickSecondPriceError(true);
      dispatch({ type: SET_PLASTIC_KNOBS_PRICE, value: "" });
    } else {
      setThickSecondPriceError(false);
      dispatch({ type: SET_THICK_SECOND_PRICE, value: e.target.value });
    }
  };

  const handlePlasticKnobsPriceInput = (e) => {
    if (e.target.value === "") {
      setPlasticKnobsPriceError(true);
      dispatch({ type: SET_PLASTIC_KNOBS_PRICE, value: "" });
    } else {
      setPlasticKnobsPriceError(false);
      dispatch({ type: SET_PLASTIC_KNOBS_PRICE, value: e.target.value });
    }
  };

  const handleMetalKnobsPriceInput = (e) => {
    if (e.target.value === "") {
      setMetalKnobsPriceError(true);
      dispatch({ type: SET_METAL_KNOBS_PRICE, value: "" });
    } else {
      setMetalKnobsPriceError(false);
      dispatch({ type: SET_METAL_KNOBS_PRICE, value: e.target.value });
    }
  };

  const handleStrapPlatesPriceInput = (e) => {
    if (e.target.value === "") {
      setStrapPlatesPriceError(true);
      dispatch({ type: SET_STRAP_PLATES_PRICE, value: "" });
    } else {
      setStrapPlatesPriceError(false);
      dispatch({ type: SET_STRAP_PLATES_PRICE, value: e.target.value });
    }
  };

  const handlePocketsPriceInput = (e) => {
    if (e.target.value === "") {
      setPocketsPriceError(true);
      dispatch({ type: SET_POCKETS_PRICE, value: "" });
    } else {
      setPocketsPriceError(false);
      dispatch({ type: SET_POCKETS_PRICE, value: e.target.value });
    }
  };

  const handleZipPriceInput = (e) => {
    if (e.target.value === "") {
      setZipPriceError(true);
      dispatch({ type: SET_ZIP_PRICE, value: "" });
    } else {
      setZipPriceError(false);
      dispatch({ type: SET_ZIP_PRICE, value: e.target.value });
    }
  };
  
  const handleKnobsPriceInput = (e) => {
    if (e.target.value === "") {
      setKnobsPriceError(true);
      dispatch({ type: SET_KNOBS_PRICE, value: "" });
    } else {
      setKnobsPriceError(false);
      dispatch({ type: SET_KNOBS_PRICE, value: e.target.value });
    }
  };

  const handleCurtainPriceInput = (e) => {
    if (e.target.value === "") {
      setCurtainPriceError(true);
      dispatch({ type: SET_CURTAIN_PRICE, value: "" });
    } else {
      setCurtainPriceError(false);
      dispatch({ type: SET_CURTAIN_PRICE, value: e.target.value });
    }
  };

  const handleSubmit = () => {
    if (thickFirstPriceInputRef.current && thickFirstPriceInputRef.current.value === "") {
      seThickFirstPriceError(true);
    }

    if (thickSecondPriceInputRef.current && thickSecondPriceInputRef.current.value === "") {
      setThickSecondPriceError(true);
    }

    if (plasticKnobsPriceInputRef.current && plasticKnobsPriceInputRef.current.value === "") {
      setPlasticKnobsPriceError(true);
    }

    if (metalKnobsPriceInputRef.current && metalKnobsPriceInputRef.current.value === "") {
      setMetalKnobsPriceError(true);
    }

    if (strapPlatesPriceInputRef.current && strapPlatesPriceInputRef.current.value === "") {
      setStrapPlatesPriceError(true);
    }

    if (pocketsPriceInputRef.current && pocketsPriceInputRef.current.value === "") {
      setPocketsPriceError(true);
    }

    if (zipPriceInputRef.current && zipPriceInputRef.current.value === "") {
      setZipPriceError(true);
    }

    if (knobsPriceInputRef.current && knobsPriceInputRef.current.value === "") {
      setKnobsPriceError(true);
    }

    if (curtainPriceInputRef.current && curtainPriceInputRef.current.value === "") {
      setCurtainPriceError(true);
    }

    if (!hasThickFirstPriceError && !hasThickSecondPriceError
      && !hasPlasticKnobsPriceError && !hasMetalKnobsPriceError
      && !hasStrapPlatesPriceError && !hasPocketsPriceError
      && !hasZipPriceError && !hasKnobsPriceError && !hasCurtainPriceError) {
      const values = [
        {
          price_thick_1: price_thick_1.replaceAll(/,/g, ""),
          price_thick_2: price_thick_2.replaceAll(/,/g, ""),
          price_plastic_knobs: price_plastic_knobs.replaceAll(/,/g, ""),
          price_metal_knobs: price_metal_knobs.replaceAll(/,/g, ""),
          price_strap_plates: price_strap_plates.replaceAll(/,/g, ""),
          price_pockets: price_pockets.replaceAll(/,/g, ""),
          price_zip: price_zip.replaceAll(/,/g, ""),
          price_knobs: price_knobs.replaceAll(/,/g, ""),
          price_curtain: price_curtain.replaceAll(/,/g, "")
        }
      ];

      fetchEditPrice(`${endpoints.windProofEditPricesUrl}`, 1, 'windproof', [...values]);
      handleMode();
    }
  };

  return !isPending && !isError && !loadingComparedFiles ?
    (<div className={`${isMobile ? "container text-wrapper" : "w-75 mx-auto"}`}>
      <Row>
        <Col className={`d-flex align-items-center ${isMobile ? 'justify-content-center' : ''}`}>
          <h5 className={`fw-bold ${isMobile ? "my-3 fs-6" : "mt-4 mb-5"}`}>
            {mode
              ? `Моля, въведете цени за ветроупорна завеса`
              : `Цени за ветроупорна завеса`}
          </h5>
          {mode ? (
            <div className={`d-flex align-items-center justify-content-end ${
              isMobile ? "button-edit-sm btn-sm" : "button-edit me-4"
            }`}>
              <Button
                type="submit"
                className={`btn btn-success me-2 ${
                  isMobile ? "btn-sm" : ""
                }`}
                onClick={handleSubmit}
              >
                <i className="fa fa-check" aria-hidden="true" />
              </Button>
              <Button
                type="button"
                color="secondary"
                className={`${isMobile ? "btn-sm" : "me-3"}`}
                onClick={handleMode}
              >
                <i className="fa fa-cancel" aria-hidden="true" />
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              className={`bc-dark-blue ${
                isMobile ? "button-edit-sm btn-sm" : "button-edit me-4"
              }`}
              onClick={handleMode}
            >
              <i className="fa fa-pencil" aria-hidden="true" />
            </Button>
          )}
        </Col>
      </Row>
      {mode ? (
        <Row>
          <Col>
            <Form method="POST" id="form" encType="multipart/form-data">
              <FormGroup noMargin className={`d-flex align-items-center text-start ${isMobile ? 'mb-2' : 'mb-3'}`}>
                <Label for="price_thick_1" className="w-65">Дебелина с 0.8 мм</Label>
                <div className="d-flex align-items-center">
                  <Input
                    type="text"
                    name="price_thick_1"
                    innerRef={thickFirstPriceInputRef}
                    onBlur={e => handleThickFirstPriceInput(e)}
                    onChange={e => handleThickFirstPriceInput(e)}
                    onKeyDown={validateNumbersInput}
                    value={price_thick_1}
                    invalid={hasThickFirstPriceError}
                    className={`w-35 me-2 ${isMobile ? 'form-control-sm' : ''}`}
                  />
                  {hasThickFirstPriceError && (
                    <FormFeedback>Моля, въведете цена за дебелина с 0.8 мм</FormFeedback>
                  )}
                </div>
              </FormGroup>
              <FormGroup noMargin className={`d-flex align-items-center text-start ${isMobile ? 'mb-2' : 'mb-3'}`}>
                <Label for="price_thick_2" className="w-65">Дебелина с 0.6 мм</Label>
                <div className="d-flex align-items-center">
                  <Input
                    type="text"
                    name="price_thick_2"
                    innerRef={thickSecondPriceInputRef}
                    onBlur={e => handleThickSecondPriceInput(e)}
                    onChange={e => handleThickSecondPriceInput(e)}
                    onKeyDown={validateNumbersInput}
                    value={price_thick_2}
                    invalid={hasThickSecondPriceError}
                    className={`w-35 me-2 ${isMobile ? 'form-control-sm' : ''}`}
                  />
                  {hasThickSecondPriceError && (
                    <FormFeedback>Моля, въведете цена за дебелина с 0.6 мм</FormFeedback>
                  )}
                </div>
              </FormGroup>
              <FormGroup noMargin className={`d-flex align-items-center text-start ${isMobile ? 'mb-2' : 'mb-3'}`}>
                <Label for="price_plastic_knobs" className="w-65">Пластмасови въртящи копчета</Label>
                <div className="d-flex align-items-center">
                  <Input
                    type="text"
                    name="price_plastic_knobs"
                    innerRef={plasticKnobsPriceInputRef}
                    onBlur={e => handlePlasticKnobsPriceInput(e)}
                    onChange={e => handlePlasticKnobsPriceInput(e)}
                    onKeyDown={validateNumbersInput}
                    value={price_plastic_knobs}
                    invalid={hasPlasticKnobsPriceError}
                    className={`w-35 me-2 ${isMobile ? 'form-control-sm' : ''}`}
                  />
                  {hasPlasticKnobsPriceError && (
                    <FormFeedback>Моля, въведете цена за пластмасови въртящи копчета</FormFeedback>
                  )}
                </div>
              </FormGroup>
              <FormGroup noMargin className={`d-flex align-items-center text-start ${isMobile ? 'mb-2' : 'mb-3'}`}>
                <Label for="price_metal_knobs" className="w-65">Кръгов обков</Label>
                <div className="d-flex align-items-center">
                  <Input
                    type="text"
                    name="price_metal_knobs"
                    innerRef={metalKnobsPriceInputRef}
                    onBlur={e => handleMetalKnobsPriceInput(e)}
                    onChange={e => handleMetalKnobsPriceInput(e)}
                    onKeyDown={validateNumbersInput}
                    value={price_metal_knobs}
                    invalid={hasMetalKnobsPriceError}
                    className={`w-35 me-2 ${isMobile ? 'form-control-sm' : ''}`}
                  />
                  {hasMetalKnobsPriceError && (
                    <FormFeedback>Моля, въведете цена за кръгов обкове</FormFeedback>
                  )}
                </div>
              </FormGroup>
              <FormGroup noMargin className={`d-flex align-items-center text-start ${isMobile ? 'mb-2' : 'mb-3'}`}>
                <Label for="price_strap_plates" className="w-65">Каишка с П-образни планки</Label>
                <div className="d-flex align-items-center">
                  <Input
                    type="text"
                    name="price_strap_plates"
                    innerRef={strapPlatesPriceInputRef}
                    onBlur={e => handleStrapPlatesPriceInput(e)}
                    onChange={e => handleStrapPlatesPriceInput(e)}
                    onKeyDown={validateNumbersInput}
                    value={price_strap_plates}
                    invalid={hasStrapPlatesPriceError}
                    className={`w-35 me-2 ${isMobile ? 'form-control-sm' : ''}`}
                  />
                  {hasStrapPlatesPriceError && (
                    <FormFeedback>Моля, въведете цена за каишка с П-образни планки</FormFeedback>
                  )}
                </div>
              </FormGroup>
              <FormGroup noMargin className={`d-flex align-items-center text-start ${isMobile ? 'mb-2' : 'mb-3'}`}>
                <Label for="price_pockets" className="w-65">Капси Ф12</Label>
                <div className="d-flex align-items-center">
                  <Input
                    type="text"
                    name="price_pockets"
                    innerRef={pocketsPriceInputRef}
                    onBlur={e => handlePocketsPriceInput(e)}
                    onChange={e => handlePocketsPriceInput(e)}
                    onKeyDown={validateNumbersInput}
                    value={price_pockets}
                    invalid={hasPocketsPriceError}
                    className={`w-35 me-2 ${isMobile ? 'form-control-sm' : ''}`}
                  />
                  {hasPocketsPriceError && (
                    <FormFeedback>Моля, въведете цена за капси Ф12</FormFeedback>
                  )}
                </div>
              </FormGroup>
              <FormGroup noMargin className={`d-flex align-items-center text-start ${isMobile ? 'mb-2' : 'mb-3'}`}>
                <Label for="price_zip" className="w-65">Цена на цип</Label>
                <div className="d-flex align-items-center">
                  <Input
                    type="text"
                    name="price_zip"
                    innerRef={zipPriceInputRef}
                    onBlur={e => handleZipPriceInput(e)}
                    onChange={e => handleZipPriceInput(e)}
                    onKeyDown={validateNumbersInput}
                    value={price_zip}
                    invalid={hasZipPriceError}
                    className={`w-35 me-2 ${isMobile ? 'form-control-sm' : ''}`}
                  />
                  {hasZipPriceError && (
                    <FormFeedback>Моля, въведете цена за цип</FormFeedback>
                  )}
                </div>
              </FormGroup>
              <FormGroup noMargin className={`d-flex align-items-center text-start ${isMobile ? 'mb-2' : 'mb-3'}`}>
                <Label for="price_knobs" className="w-65">Колани</Label>
                <div className="d-flex align-items-center">
                  <Input
                    type="text"
                    name="price_knobs"
                    innerRef={knobsPriceInputRef}
                    onBlur={e => handleKnobsPriceInput(e)}
                    onChange={e => handleKnobsPriceInput(e)}
                    onKeyDown={validateNumbersInput}
                    value={price_knobs}
                    invalid={hasKnobsPriceError}
                    className={`w-35 me-2 ${isMobile ? 'form-control-sm' : ''}`}
                  />
                  {hasKnobsPriceError && (
                    <FormFeedback> Моля, въведете цена за колани</FormFeedback>
                  )}
                </div>
              </FormGroup>
              <FormGroup noMargin className={`d-flex align-items-center text-start ${isMobile ? 'mb-2' : 'mb-3'}`}>
                <Label for="price_curtain" className="w-65">Единична завеса</Label>
                <div className="d-flex align-items-center">
                  <Input
                    type="text"
                    name="price_curtain"
                    innerRef={curtainPriceInputRef}
                    onBlur={e => handleCurtainPriceInput(e)}
                    onChange={e => handleCurtainPriceInput(e)}
                    onKeyDown={validateNumbersInput}
                    value={price_curtain}
                    invalid={hasCurtainPriceError}
                    className={`w-35 me-2 ${isMobile ? 'form-control-sm' : ''}`}
                  />
                  {hasCurtainPriceError && (
                    <FormFeedback>Моля, въведете цена за единична завеса</FormFeedback>
                  )}
                </div>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      ) : (
        <Row>
          <Row className="text-start">
            <Col>
              <p>Дебелина с 0.8 мм: <span className="fw-bold">{`${price_thick_1}`} лв.</span></p>
            </Col>
          </Row>
          <Row className="text-start">
            <Col>
              <p>Дебелина с 0.6 мм: <span className="fw-bold">{`${price_thick_2}`} лв.</span></p>
            </Col>
          </Row>
          <Row className="text-start">
            <Col>
              <p>Пластмасови въртящи копчета: <span className="fw-bold">{`${price_plastic_knobs}`} лв.</span></p>
            </Col>
          </Row>
          <Row className="text-start">
            <Col>
              <p>Кръгов обков: <span className="fw-bold">{`${price_metal_knobs}`} лв.</span></p>
            </Col>
          </Row>
          <Row className="text-start">
            <Col>
              <p>Каишка с П-образни планки: <span className="fw-bold">{`${price_strap_plates}`} лв.</span></p>
            </Col>
          </Row>
          <Row className="text-start">
            <Col>
              <p>Капси Ф12: <span className="fw-bold">{`${price_pockets}`} лв.</span></p>
            </Col>
          </Row>
          <Row className="text-start">
            <Col>
              <p>Цип: <span className="fw-bold">{`${price_zip}`} лв.</span></p>
            </Col>
          </Row>
          <Row className="text-start">
            <Col>
              <p>Колани: <span className="fw-bold">{`${price_knobs}`} лв.</span></p>
            </Col>
          </Row>
          <Row className="text-start">
            <Col>
              <p>Единична завеса: <span className="fw-bold">{`${price_curtain}`} лв.</span></p>
            </Col>
          </Row>
        </Row>
      )}
    </div>) 
  : (<Spinner
    className="spinner"
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      height: "3.5rem",
      width: "3.5rem",
      color: '#2E5994 !important'
    }}
  />);
};

export default WindproofCurtainsPanelForm;
