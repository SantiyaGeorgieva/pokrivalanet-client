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
import { useApiFetchPrice } from "../../hooks/useApiFetchPrice";
import { useApiFetchEditPrice } from "../../hooks/useApiFetchEditPrice";
import { endpoints, validateNumbersInput } from "../../utils";
import { truckGondolaReducer } from "../../reducers/truckGondolaReducer";
import { initialState } from "../../reducers/truckCalculatorReducer";
import {
  SET_ASSEMBLY_PRICE,
  SET_FITTING_PRICE,
  SET_LONGITUDIALPOCKET_PRICE,
  SET_TARPAULIN_PRICE_FIRST,
  SET_TARPAULIN_PRICE_SECOND
} from "../../actionTypes";

const TruckGondolaPanelForm = ({ isMobile }) => {
  const {
    pricedFetch,
    isPending,
    isError,
    fetchPrice
  } = useApiFetchPrice();
  const { fetchEditPrice, loadingComparedFiles } = useApiFetchEditPrice();
  const [state, dispatch] = useReducer(truckGondolaReducer, initialState);

  const { longitudinal_pocket_price, fitting_price, assembly_price, tarpaulin_price_1, tarpaulin_price_2 } = state;
  const [hasPocketPriceError, setPocketPriceError] = useState(false);
  const [hasFittingPriceError, setFittingPriceError] = useState(false);
  const [hasAssemblyPriceError, setAssemblyPriceError] = useState(false);
  const [hasTarpaulinPriceFirstError, setTarpaulinPriceFirstError] = useState(false);
  const [hasTarpaulinPriceSecondError, setTarpaulinPriceSecondError] = useState(false);
  const [mode, setMode] = useState(false);

  const longitudinalPocketPriceInputRef = useRef(null);
  const fittingPriceInputRef = useRef(null);
  const assemblyPriceInputRef = useRef(null);
  const tarpaulinPriceFirstInputRef = useRef(null);
  const tarpaulinPriceSecondInputRef = useRef(null);

  useEffect(() => {
    if (!isPending && !isError && Object.keys(pricedFetch).length > 0) {
      dispatch({
        type: SET_LONGITUDIALPOCKET_PRICE,
        value: pricedFetch.longitudinal_pocket_price
      });
      dispatch({
        type: SET_FITTING_PRICE,
        value: pricedFetch.fitting_price
      });
      dispatch({
        type: SET_ASSEMBLY_PRICE,
        value: pricedFetch.assembly_price
      });
      dispatch({
        type: SET_TARPAULIN_PRICE_FIRST,
        value: pricedFetch.tarpaulin_price_1
      });
      dispatch({
        type: SET_TARPAULIN_PRICE_SECOND,
        value: pricedFetch.tarpaulin_price_2
      });
    } else {
      fetchPrice(`${endpoints.truckGondolaPricesUrl}`);
    }
  }, [Object.keys(pricedFetch).length])

  const handleMode = () => {
    setMode(!mode);
  };

  const handlePocketPriceInput = (e) => {
    if (e.target.value === "") {
      setPocketPriceError(true);
      dispatch({ type: SET_LONGITUDIALPOCKET_PRICE, value: "" });
    } else {
      setPocketPriceError(false);
      dispatch({ type: SET_LONGITUDIALPOCKET_PRICE, value: e.target.value });
    }
  };

  const handleFittingPriceInput = (e) => {
    if (e.target.value === "") {
      setFittingPriceError(true);
      dispatch({ type: SET_FITTING_PRICE, value: "" });
    } else {
      setFittingPriceError(false);
      dispatch({ type: SET_FITTING_PRICE, value: e.target.value });
    }
  };

  const handleAssemblyPriceInput = (e) => {
    if (e.target.value === "") {
      setAssemblyPriceError(true);
      dispatch({ type: SET_ASSEMBLY_PRICE, value: "" });
    } else {
      setAssemblyPriceError(false);
      dispatch({ type: SET_ASSEMBLY_PRICE, value: e.target.value });
    }
  };

  const handleTarpaulinPriceFirstInput = (e) => {
    if (e.target.value === "") {
      setAssemblyPriceError(true);
      dispatch({ type: SET_TARPAULIN_PRICE_FIRST, value: "" });
    } else {
      setAssemblyPriceError(false);
      dispatch({ type: SET_TARPAULIN_PRICE_FIRST, value: e.target.value });
    }
  };

  const handleTarpaulinPriceSecondInput = (e) => {
    if (e.target.value === "") {
      setAssemblyPriceError(true);
      dispatch({ type: SET_TARPAULIN_PRICE_SECOND, value: "" });
    } else {
      setAssemblyPriceError(false);
      dispatch({ type: SET_TARPAULIN_PRICE_SECOND, value: e.target.value });
    }
  };

  const handleSubmit = () => {
    if (longitudinalPocketPriceInputRef.current && longitudinalPocketPriceInputRef.current.value === "") {
      setPocketPriceError(true);
    }

    if (fittingPriceInputRef.current && fittingPriceInputRef.current.value === "") {
      setFittingPriceError(true);
    }

    if (assemblyPriceInputRef.current && assemblyPriceInputRef.current.value === "") {
      setAssemblyPriceError(true);
    }

    if (tarpaulinPriceFirstInputRef.current && tarpaulinPriceFirstInputRef.current.value === "") {
      setTarpaulinPriceFirstError(true);
    }

    if (tarpaulinPriceSecondInputRef.current && tarpaulinPriceSecondInputRef.current.value === "") {
      setTarpaulinPriceSecondError(true);
    }

    if (!hasPocketPriceError && !hasFittingPriceError
      && !hasAssemblyPriceError && !hasTarpaulinPriceFirstError
      && !hasTarpaulinPriceSecondError) {
      const values = [
        {
          longitudinal_pocket_price: longitudinal_pocket_price.replaceAll(/,/g, ""),
          fitting_price: fitting_price.replaceAll(/,/g, ""),
          assembly_price: assembly_price.replaceAll(/,/g, ""),
          tarpaulin_price_1: tarpaulin_price_1.replaceAll(/,/g, ""),
          tarpaulin_price_2: tarpaulin_price_2.replaceAll(/,/g, "")
        }
      ];

      fetchEditPrice(`${endpoints.truckGondolaEditPricesUrl}`, 1, 'gondola', [...values]);
      handleMode();
    }
  };

  return !isPending && !isError && !loadingComparedFiles ? 
    (<div className={`${isMobile ? "container text-wrapper" : "w-75 mx-auto"}`}>
      <Row>
        <Col className="d-flex align-items-center">
          <h5 className={`fw-bold ${isMobile ? "mb-3" : "mt-4 mb-5"}`}>
            {mode
              ? `Моля, въведете новите цени на покривало за зърновоз или гондола`
              : `Цени на покривало за зърновоз или гондола`}
          </h5>
          {mode ? (
            <div className="d-flex align-items-center justify-content-end button-exit">
              <Button
                type="submit"
                className={`btn btn-success ${
                  isMobile ? "btn-sm me-3" : "me-2"
                }`}
                onClick={handleSubmit}
              >
                <i className="fa fa-check" aria-hidden="true"></i>
              </Button>
              <Button
                type="button"
                color="secondary"
                className={`${isMobile ? "btn-sm" : "me-3"}`}
                onClick={handleMode}
              >
                <i className="fa fa-cancel" aria-hidden="true"></i>
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              className={`button-exit bc-dark-blue ${
                isMobile ? "btn-sm" : "me-4"
              }`}
              onClick={handleMode}
            >
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </Button>
          )}
        </Col>
      </Row>
      {mode ? (
        <Row>
          <Col>
            <Form method="POST" id="form" encType="multipart/form-data">
              <FormGroup className="d-flex align-items-center text-start mb-2">
                <Label for="longitudinal_pocket_price" className="w-65">Надлъжен джоб</Label>
                <div className="d-flex align-items-center">
                  <Input
                    type="text"
                    name="longitudinal_pocket_price"
                    innerRef={longitudinalPocketPriceInputRef}
                    onBlur={e => handlePocketPriceInput(e)}
                    onChange={e => handlePocketPriceInput(e)}
                    onKeyDown={validateNumbersInput}
                    value={longitudinal_pocket_price}
                    invalid={hasPocketPriceError}
                    className="w-35 me-2"
                  />
                  {hasPocketPriceError && (
                    <FormFeedback>Моля, въведете цена за надлъжен джоб</FormFeedback>
                  )}
                </div>
              </FormGroup>
              <FormGroup className="d-flex align-items-center text-start mb-2">
                <Label for="fitting_price" className="w-65">Обков вляво/вдясно</Label>
                <div className="d-flex align-items-center">
                  <Input
                    type="text"
                    name="fitting_price"
                    onBlur={e => handleFittingPriceInput(e)}
                    onChange={e => handleFittingPriceInput(e)}
                    onKeyDown={validateNumbersInput}
                    value={fitting_price}
                    invalid={hasFittingPriceError}
                    className="w-35 me-2"
                  />
                  {hasFittingPriceError && (
                    <FormFeedback>Моля, въведете цена за обков вляво/вдясно</FormFeedback>
                  )}
                </div>
              </FormGroup>
              <FormGroup className="d-flex align-items-center text-start mb-2">
                <Label for="assembly_price" className="w-65">Монтаж</Label>
                <div className="d-flex align-items-center">
                  <Input
                    type="text"
                    name="assembly_price"
                    onBlur={e => handleAssemblyPriceInput(e)}
                    onChange={e => handleAssemblyPriceInput(e)}
                    onKeyDown={validateNumbersInput}
                    value={assembly_price}
                    invalid={hasAssemblyPriceError}
                    className="w-35 me-2"
                  />
                  {hasAssemblyPriceError && (
                    <FormFeedback>Моля, въведете цена за монтаж</FormFeedback>
                  )}
                </div>
              </FormGroup>
              <FormGroup className="d-flex align-items-center text-start mb-2">
                <Label for="tarpaulin_price_1" className="w-65">
                  Вид на брезента от 680гр/кв.м
                </Label>
                <div className="d-flex align-items-center">
                  <Input
                    type="text"
                    name="tarpaulin_price_1"
                    onBlur={e => handleTarpaulinPriceFirstInput(e)}
                    onChange={e => handleTarpaulinPriceFirstInput(e)}
                    onKeyDown={validateNumbersInput}
                    value={tarpaulin_price_1}
                    invalid={hasTarpaulinPriceFirstError}
                    className="w-35 me-2"
                  />
                  {hasTarpaulinPriceFirstError && (
                    <FormFeedback>Моля, въведете цена за вид на брезента от 680гр/кв.м</FormFeedback>
                  )}
                </div>
              </FormGroup>
              <FormGroup className="d-flex align-items-center text-start mb-2">
                <Label for="tarpaulin_price_2" className="w-65">
                  Вид на брезента от 900гр/кв.м
                </Label>
                <div className="d-flex align-items-center">
                  <Input
                    type="text"
                    name="tarpaulin_price_2"
                    onBlur={e => handleTarpaulinPriceSecondInput(e)}
                    onChange={e => handleTarpaulinPriceSecondInput(e)}
                    onKeyDown={validateNumbersInput}
                    value={tarpaulin_price_2}
                    invalid={hasTarpaulinPriceSecondError}
                    className="w-35 me-2"
                  />
                  {hasTarpaulinPriceSecondError && (
                    <FormFeedback> Моля, въведете цена за вид на брезента от 900гр/кв.м</FormFeedback>
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
              <p>Надлъжен джоб: <span className="fw-bold">{`${longitudinal_pocket_price}`} лв.</span></p>
            </Col>
          </Row>
          <Row className="text-start">
            <Col>
              <p>Обков вляво/вдясно: <span className="fw-bold">{`${fitting_price}`} лв.</span></p>
            </Col>
          </Row>
          <Row className="text-start">
            <Col>
              <p>Монтаж: <span className="fw-bold">{`${assembly_price}`} лв.</span></p>
            </Col>
          </Row>
          <Row className="text-start">
            <Col>
              <p>Вид на брезента от 680гр/кв.м: <span className="fw-bold">{`${tarpaulin_price_1}`} лв.</span></p>
            </Col>
          </Row>
          <Row className="text-start">
            <Col>
              <p>Вид на брезента от 900гр/кв.м: <span className="fw-bold">{`${tarpaulin_price_2}`} лв.</span></p>
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

export default TruckGondolaPanelForm;