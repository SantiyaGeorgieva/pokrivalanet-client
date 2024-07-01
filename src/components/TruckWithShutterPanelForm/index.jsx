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
  Spinner
} from "reactstrap";
import { endpoints, validateNumbersInput } from "../../utils";
import { useApiFetchPrice } from "../../hooks/useApiFetchPrice";
import { useApiFetchEditPrice } from "../../hooks/useApiFetchEditPrice";

const TruckWithShutterPanelForm = ({ isMobile }) => {
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
    if (!isPending && !isError && pricedFetch.with_shutter_price > 0) {
      setPrice({id: 1, with_shutter_price: pricedFetch.with_shutter_price});
    } else {
      fetchPrice(`${endpoints.truckWithShutterPriceUrl}`);
    }
  }, [pricedFetch.with_shutter_price])

  const handleMode = () => {
    setMode(!mode);
  };

  const handleSubmit = () => {
    if (price === '') {
      setPriceError(true);
    } else {
      setPriceError(false);
      fetchEditPrice(`${endpoints.truckWithShutterEditPriceUrl}`, 1,'with', price.replaceAll(/,/g, ""));
      setPricedFetch({id: 1, with_shutter_price: price});
      setPrice({id: 1, with_shutter_price: price});
      handleMode();
    }
  };

  return !isPending && !isError && !loadingComparedFiles ?
    (<div className={`${isMobile ? "container text-wrapper" : "w-75 mx-auto"}`}>
      <Row>
        <Col className="d-flex align-items-center">
          <h5 className={`fw-bold ${isMobile ? "my-3 fs-6" : "mt-4 mb-5"}`}>
            {mode
              ? `Моля, въведете новата цена на страници на щора с капаци комплект от две`
              : `Цена на страници на щора с капаци комплект от две`}
          </h5>
          {mode ? (
            <div className={`d-flex align-items-center justify-content-end ${
              isMobile ? "button-edit-sm btn-sm" : "button-edit me-4"
            }`}>
              <Button
                type="button"
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
                onClick={handleMode}
                className={`${isMobile ? "btn-sm" : "me-3"}`}
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
            <Form id="form" method="POST" encType="multipart/form-data">
              <FormGroup noMargin className={`d-flex align-items-center text-start ${isMobile ? 'mb-2' : 'mb-3'}`}>
                <Label for="with_shutter_price" className="w-65 mb-0">Брезент</Label>
                <div className="d-flex align-items-center">
                  <Input
                    type="text"
                    name="with_shutter_price"
                    onChange={(e) => setPrice(e.target.value)}
                    onKeyDown={validateNumbersInput}
                    value={price.with_shutter_price}
                    invalid={hasPriceError}
                    className={`w-35 me-2 ${isMobile ? 'form-control-sm' : ''}`}
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
              <p>Брезент: <span className="fw-bold">{`${price?.with_shutter_price}`} лв.</span></p>
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

export default TruckWithShutterPanelForm;