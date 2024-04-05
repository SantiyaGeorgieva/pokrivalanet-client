import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Spinner,
} from "reactstrap";
import { endpoints, validateNumbersInput } from "../../utils";
import { useApiFetchPrice } from "../../hooks/useApiFetchPrice";
import { useApiFetchEditPrice } from "../../hooks/useApiFetchEditPrice";

const TruckWithoutShutterPanelForm = ({ isMobile }) => {
  const {
    pricedFetch,
    isPending,
    isError,
    setPricedFetch,
    fetchPrice
  } = useApiFetchPrice();
  const { loadingComparedFiles, fetchEditPrice } = useApiFetchEditPrice();
  const [price, setPrice] = useState(pricedFetch);
  const [hasPriceError, setPriceError] = useState(false);
  const [mode, setMode] = useState(false);

  useEffect(() => {
    if (!isPending && !isError && pricedFetch.without_shutters_price > 0) {
      setPrice({id: 1, without_shutters_price: pricedFetch.without_shutters_price});
    } else {
      fetchPrice(`${endpoints.truckWithoutShutterPriceUrl}`);
    }
  }, [pricedFetch.without_shutters_price])

  const handleMode = () => {
    setMode(!mode);
  };

  const handleSubmit = () => {
    if (price === '') {
      setPriceError(true);
    } else {
      setPriceError(false);
      fetchEditPrice(`${endpoints.truckWithoutShutterEditPriceUrl}`, 1,'without', price.replaceAll(/,/g, ""));
      setPricedFetch({id: 1, without_shutters_price: price});
      setPrice({id: 1, without_shutters_price: price});
      handleMode();
    }
  };

  return !isPending && !isError && !loadingComparedFiles ?
    (<div className={`${isMobile ? "container text-wrapper" : "w-75 mx-auto"}`}>
      <Row>
        <Col className="d-flex align-items-center">
          <h5 className={`fw-bold ${isMobile ? "mb-3" : "mt-4 mb-5"}`}>
            {mode
              ? `Моля, въведете новата цена на страници на щора без капаци комплект от две`
              : `Цена на страници на щора без капаци комплект от две`}
          </h5>
          {mode ? (
            <div className="d-flex align-items-center justify-content-end button-exit">
              <Button
                type="button"
                className={`btn btn-success ${
                  isMobile ? "btn-sm me-3" : "me-2"
                }`}
                onClick={handleSubmit}
              >
                <i className="fa fa-check" aria-hidden="true" />
              </Button>
              <Button
                type="button"
                color="secondary"
                onClick={handleMode}
                className={`${isMobile ? "btn-sm" : "me-3"}`}
              >
                <i className="fa fa-cancel" aria-hidden="true" />
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
              <i className="fa fa-pencil" aria-hidden="true" />
            </Button>
          )}
        </Col>
      </Row>
      {mode ? (
        <Row>
          <Col>
            <Form id="form" method="POST" encType="multipart/form-data" > 
              <FormGroup className="d-flex align-items-center text-start mb-2">
                <Label for="pricePlasticButtons" className="w-65 mb-0">Брезент</Label>
                <div className="d-flex align-items-center">
                  <Input
                    type="text"
                    name="without_shutters_price"
                    onChange={(e) => setPrice(e.target.value)}
                    onKeyDown={validateNumbersInput}
                    value={price.without_shutters_price}
                    invalid={hasPriceError}
                    className="w-35 me-2"
                  />
                  {hasPriceError && (
                    <FormFeedback>
                      Моля, въведете цена на брезента
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
              <p>Брезент: <span className="fw-bold">{`${price?.without_shutters_price}`} лв.</span></p>
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

export default TruckWithoutShutterPanelForm;