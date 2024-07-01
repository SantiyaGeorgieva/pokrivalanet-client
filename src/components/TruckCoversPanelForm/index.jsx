import { useEffect, useReducer, useRef, useState } from "react";
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
import { initialState, truckCoversReducer } from "../../reducers/truckCoversReducer";
import {
  SET_RATCHET_COVER_PRICE,
  SET_SEMI_TRAILER_PRICE,
  SET_SEMI_TRAILER_THREE_WAY_PRICE,
  SET_SEMI_TRAILER_WITH_COVERS_PRICE,
  SET_SHADE_CEILING_PRICE,
  SET_SIMPLE_TRAILER_COVER_PRICE
} from "../../actionTypes";

const TruckCoversPanelForm = ({ isMobile }) => {
  const {
    pricedFetch,
    isPending,
    isError,
    loadingComparedFiles,
    fetchPrice
  } = useApiFetchPrice();
  const { fetchEditPrice } = useApiFetchEditPrice();
  const [state, dispatch] = useReducer(truckCoversReducer, initialState);

  const {
    shade_ceiling,
    semi_trailer,
    semi_trailer_with_covers,
    semi_trailer_three_way,
    ratchet_cover,
    simple_trailer_cover
  } = state;
  const [hasShadeCeilingPriceError, setShadeCeilingPriceError] = useState(false);
  const [hasSemiTrailerPriceError, setSemiTrailerPriceError] = useState(false);
  const [hasSemiTrailerWithCoversPriceError, setSemiTrailerWithCoversPriceError] = useState(false);
  const [hasSemiTrailerThreeWayError, setSemiTrailerThreeWayError] = useState(false);
  const [hasRatchetCoverError, setRatchetCoverError] = useState(false);
  const [hasSimpleTrailerCoverError, setSimpleTrailerCoverError] = useState(false);
  const [mode, setMode] = useState(false);

  const shadeCeilingPriceInputRef = useRef(null);
  const semiTrailerPriceInputRef = useRef(null);
  const semiTrailerWithCoversPriceInputRef = useRef(null);
  const semiTrailerThreeWayPriceInputRef = useRef(null);
  const rachetCoverInputRef = useRef(null);
  const simpleTrailerCoverInputRef = useRef(null);

  useEffect(() => {
    if (!isPending && !isError && Object.keys(pricedFetch).length > 0) {
      dispatch({
        type: SET_SHADE_CEILING_PRICE,
        value: pricedFetch.shade_ceiling
      });
      dispatch({
        type: SET_SEMI_TRAILER_PRICE,
        value: pricedFetch.semi_trailer
      });
      dispatch({
        type: SET_SEMI_TRAILER_WITH_COVERS_PRICE,
        value: pricedFetch.semi_trailer_with_covers
      });
      dispatch({
        type: SET_SEMI_TRAILER_THREE_WAY_PRICE,
        value: pricedFetch.semi_trailer_three_way
      });
      dispatch({
        type: SET_RATCHET_COVER_PRICE,
        value: pricedFetch.ratchet_cover
      });
      dispatch({
        type: SET_SIMPLE_TRAILER_COVER_PRICE,
        value: pricedFetch.simple_trailer_cover
      });
    } else {
      fetchPrice(`${endpoints.truckCoversPricesUrl}`);
    }
  }, [Object.keys(pricedFetch).length])

  const handleMode = () => {
    setMode(!mode);
  };

  const handleShadeCeilingPriceInput = (e) => {
    if (e.target.value === "") {
      setShadeCeilingPriceError(true);
      dispatch({ type: SET_SHADE_CEILING_PRICE, value: "" });
    } else {
      setShadeCeilingPriceError(false);
      dispatch({ type: SET_SHADE_CEILING_PRICE, value: e.target.value });
    }
  };

  const handleSemiTrailerPriceInput = (e) => {
    if (e.target.value === "") {
      setSemiTrailerPriceError(true);
      dispatch({ type: SET_SEMI_TRAILER_PRICE, value: "" });
    } else {
      setSemiTrailerPriceError(false);
      dispatch({ type: SET_SEMI_TRAILER_PRICE, value: e.target.value });
    }
  };

  const handleSemiTrailerWithCoversPriceInput = (e) => {
    if (e.target.value === "") {
      setSemiTrailerWithCoversPriceError(true);
      dispatch({ type: SET_SEMI_TRAILER_WITH_COVERS_PRICE, value: "" });
    } else {
      setSemiTrailerWithCoversPriceError(false);
      dispatch({ type: SET_SEMI_TRAILER_WITH_COVERS_PRICE, value: e.target.value });
    }
  };

  const handleSemiTrailerThreeWayPriceInput = (e) => {
    if (e.target.value === "") {
      setSemiTrailerThreeWayError(true);
      dispatch({ type: SET_SEMI_TRAILER_THREE_WAY_PRICE, value: "" });
    } else {
      setSemiTrailerThreeWayError(false);
      dispatch({ type: SET_SEMI_TRAILER_THREE_WAY_PRICE, value: e.target.value });
    }
  };

  const handleRatchetCoverPriceInput = (e) => {
    if (e.target.value === "") {
      setRatchetCoverError(true);
      dispatch({ type: SET_RATCHET_COVER_PRICE, value: "" });
    } else {
      setRatchetCoverError(false);
      dispatch({ type: SET_RATCHET_COVER_PRICE, value: e.target.value });
    }
  };
  
  const handleSimpleTrailerCoverPriceInput = (e) => {
    if (e.target.value === "") {
      setSimpleTrailerCoverError(true);
      dispatch({ type: SET_SIMPLE_TRAILER_COVER_PRICE, value: "" });
    } else {
      setSimpleTrailerCoverError(false);
      dispatch({ type: SET_SIMPLE_TRAILER_COVER_PRICE, value: e.target.value });
    }
  };

  const handleSubmit = () => {
    if (shadeCeilingPriceInputRef.current && shadeCeilingPriceInputRef.current.value === "") {
      setShadeCeilingPriceError(true);
    }

    if (semiTrailerPriceInputRef.current && semiTrailerPriceInputRef.current.value === "") {
      setSemiTrailerPriceError(true);
    }

    if (semiTrailerWithCoversPriceInputRef.current && semiTrailerWithCoversPriceInputRef.current.value === "") {
      setSemiTrailerWithCoversPriceError(true);
    }

    if (semiTrailerThreeWayPriceInputRef.current && semiTrailerThreeWayPriceInputRef.current.value === "") {
      setSemiTrailerThreeWayError(true);
    }

    if (rachetCoverInputRef.current && rachetCoverInputRef.current.value === "") {
      setRatchetCoverError(true);
    }

    if (simpleTrailerCoverInputRef.current && simpleTrailerCoverInputRef.current.value === "") {
      setSimpleTrailerCoverError(true);
    }

    if (!hasShadeCeilingPriceError && !hasSemiTrailerPriceError
      && !hasSemiTrailerWithCoversPriceError && !hasSemiTrailerThreeWayError
      && !hasRatchetCoverError && !hasSimpleTrailerCoverError) {
      const values = [
        {
          shade_ceiling: shade_ceiling.replaceAll(/,/g, ""),
          semi_trailer: semi_trailer.replaceAll(/,/g, ""),
          semi_trailer_with_covers: semi_trailer_with_covers.replaceAll(/,/g, ""),
          semi_trailer_three_way: semi_trailer_three_way.replaceAll(/,/g, ""),
          ratchet_cover: ratchet_cover.replaceAll(/,/g, ""),
          simple_trailer_cover: simple_trailer_cover.replaceAll(/,/g, "")
        }
      ];

      fetchEditPrice(`${endpoints.truckCoversEditPricesUrl}`, 1, 'covers', [...values]);
      handleMode();
    }
  };

  return !isPending && !isError && !loadingComparedFiles ?
    (<div className={`${isMobile ? "container text-wrapper" : "w-75 mx-auto"}`}>
      <Row>
        <Col className={`d-flex align-items-center ${isMobile ? 'justify-content-center' : ''}`}>
          <h5 className={`fw-bold ${isMobile ? "my-3 fs-6" : "mt-4 mb-5"}`}>
            {mode
              ? `Моля, въведете новите цени за покривала на камиони`
              : `Цени за покривала на камиони`}
          </h5>
          {mode ? (
            <div className={`d-flex align-items-center justify-content-end ${isMobile ? 'button-edit-sm' : 'button-edit'}`}>
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
                <Label for="shade_ceiling" className="w-65">
                  Таван на щора за полуремарке
                </Label>
                <div className="d-flex align-items-center">
                  <Input
                    type="text"
                    name="shade_ceiling"
                    innerRef={shadeCeilingPriceInputRef}
                    onBlur={(e) => handleShadeCeilingPriceInput(e)}
                    onChange={(e) => handleShadeCeilingPriceInput(e)}
                    onKeyDown={validateNumbersInput}
                    value={shade_ceiling}
                    invalid={hasShadeCeilingPriceError}
                    className={`w-35 me-2 ${isMobile ? 'form-control-sm' : ''}`}
                  /> 
                  {hasShadeCeilingPriceError && (
                    <FormFeedback>
                      Моля, въведете цена за таван на щора за полуремарке
                    </FormFeedback>
                  )}
                </div>
              </FormGroup>
              <FormGroup noMargin className={`d-flex align-items-center text-start ${isMobile ? 'mb-2' : 'mb-3'}`}>
                <Label for="semi_trailer" className="w-65">
                  Страници на щора за полуремарке - комплект от две
                </Label>
                <div className="d-flex align-items-center">
                  <Input
                    type="text"
                    name="semi_trailer"
                    innerRef={semiTrailerPriceInputRef}
                    onBlur={(e) => handleSemiTrailerPriceInput(e)}
                    onChange={(e) => handleSemiTrailerPriceInput(e)}
                    onKeyDown={validateNumbersInput}
                    value={semi_trailer}
                    invalid={hasSemiTrailerPriceError}
                    className={`w-35 me-2 ${isMobile ? 'form-control-sm' : ''}`}
                  />
                  {hasSemiTrailerPriceError && (
                    <FormFeedback>
                      Моля, въведете цена за страници на щора за полуремарке -
                      комплект от две
                    </FormFeedback>
                  )}
                </div>
              </FormGroup>
              <FormGroup noMargin className={`d-flex align-items-center text-start ${isMobile ? 'mb-2' : 'mb-3'}`}>
                <Label for="semi_trailer_with_covers" className="w-65">
                  Страници на щора за полуремарке с капаци - комплект от две
                </Label>
                <div className="d-flex align-items-center">
                  <Input
                    type="text"
                    name="semi_trailer_with_covers"
                    innerRef={semiTrailerWithCoversPriceInputRef}
                    onBlur={(e) => handleSemiTrailerWithCoversPriceInput(e)}
                    onChange={(e) => handleSemiTrailerWithCoversPriceInput(e)}
                    onKeyDown={validateNumbersInput}
                    value={semi_trailer_with_covers}
                    invalid={hasSemiTrailerWithCoversPriceError}
                    className={`w-35 me-2 ${isMobile ? 'form-control-sm' : ''}`}
                  />
                  {hasSemiTrailerWithCoversPriceError && (
                    <FormFeedback>
                      Моля, въведете цена за страници на щора за полуремарке с
                      капаци - комплект от две
                    </FormFeedback>
                  )}
                </div>
              </FormGroup>
              <FormGroup noMargin className={`d-flex align-items-center text-start ${isMobile ? 'mb-2' : 'mb-3'}`}>
                <Label for="semi_trailer_three_way" className="w-65">
                  Тристранна щора за полуремарке
                </Label>
                <div className="d-flex align-items-center">
                  <Input 
                    type="text"
                    name="semi_trailer_three_way"
                    innerRef={semiTrailerThreeWayPriceInputRef}
                    onBlur={(e) => handleSemiTrailerThreeWayPriceInput(e)}
                    onChange={(e) => handleSemiTrailerThreeWayPriceInput(e)}
                    onKeyDown={validateNumbersInput}
                    value={semi_trailer_three_way}
                    invalid={hasSemiTrailerThreeWayError}
                    className={`w-35 me-2 ${isMobile ? 'form-control-sm' : ''}`}
                  />
                  {hasSemiTrailerThreeWayError && (
                    <FormFeedback>
                      Моля, въведете цена на тристранна щора за полуремарке
                    </FormFeedback>
                  )}
                </div>
              </FormGroup>
              <FormGroup noMargin className={`d-flex align-items-center text-start ${isMobile ? 'mb-2' : 'mb-3'}`}>
                <Label for="ratchet_cover" className="w-65">
                  Обикновено покривало за тресачка
                </Label>
                <div className="d-flex align-items-center">
                  <Input
                    type="text"
                    name="ratchet_cover"
                    innerRef={rachetCoverInputRef}
                    onBlur={(e) => handleRatchetCoverPriceInput(e)}
                    onChange={(e) => handleRatchetCoverPriceInput(e)}
                    onKeyDown={validateNumbersInput}
                    value={ratchet_cover}
                    invalid={hasRatchetCoverError}
                    className={`w-35 me-2 ${isMobile ? 'form-control-sm' : ''}`}
                  />
                  {hasRatchetCoverError && (
                    <FormFeedback>
                      Моля, въведете цена на обикновено покривало за тресачка
                    </FormFeedback>
                  )}
                </div>
              </FormGroup>
              <FormGroup noMargin className={`d-flex align-items-center text-start ${isMobile ? 'mb-2' : 'mb-3'}`}>
                <Label for="simple_trailer_cover" className="w-65">
                  Обикновено покривало за камион или ремарке
                </Label>
                <div className="d-flex align-items-center">
                  <Input
                    type="text"
                    name="simple_trailer_cover"
                    innerRef={simpleTrailerCoverInputRef}
                    onBlur={(e) => handleSimpleTrailerCoverPriceInput(e)}
                    onChange={(e) => handleSimpleTrailerCoverPriceInput(e)}
                    onKeyDown={validateNumbersInput}
                    value={simple_trailer_cover}
                    invalid={hasSimpleTrailerCoverError}
                    className={`w-35 me-2 ${isMobile ? 'form-control-sm' : ''}`}
                  />
                  {hasSimpleTrailerCoverError && (
                    <FormFeedback>
                      Моля, въведете цена на обикновено покривало за камион или
                      ремарке
                    </FormFeedback>
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
              <p>Таван на щора за полуремарке:{" "}
                <span className="fw-bold">{`${shade_ceiling}`} лв.</span>
              </p>
            </Col>
          </Row>
          <Row className="text-start">
            <Col>
              <p>Страници на щора за полуремарке - комплект от две:{" "}  
                <span className="fw-bold">{`${semi_trailer}`} лв.</span>              
              </p>
            </Col>
          </Row>
          <Row className="text-start">
            <Col>
              <p>Страници на щора за полуремарке с капаци - комплект от две:{" "}
                <span className="fw-bold">{`${semi_trailer_with_covers}`} лв.</span>
              </p>
            </Col>
          </Row>
          <Row className="text-start">
            <Col>
              <p>Тристранна щора за полуремарке:{" "} 
                <span className="fw-bold">{`${semi_trailer_three_way}`} лв.</span>
              </p>
            </Col>
          </Row>
          <Row className="text-start">
            <Col>
              <p>Обикновено покривало за тресачка:{" "}
                <span className="fw-bold">{`${ratchet_cover}`} лв.</span>
              </p>
            </Col>
          </Row>
          <Row className="text-start">
            <Col>
              <p>Обикновено покривало за камион или ремарке:{" "} 
                <span className="fw-bold">{`${simple_trailer_cover}`} лв.</span>
              </p>
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

export default TruckCoversPanelForm;
