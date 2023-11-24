import { Row, Col, Spinner, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Link } from "react-router-dom";
import Hr from "../Hr";

import './cardsCover.scss';
import { useTranslation } from "react-i18next";

const CardsCover = ({ cards, handleCardTitle, isMobile }) => {
  const result = cards.map(img => img);
  const firstRow = result.slice(0, 4);
  const secondRow = result.slice(4, 8);
  const lastRow = result.slice(8, result.length);
  const { t } = useTranslation();

  return (
    <div className={`container ${isMobile ? 'px-0' : ''}`}>
      <Row className={`${!isMobile ? 'mx-1' : ''}`}>
        {firstRow.map((row, idx) => {
          return <Col md="3" key={idx} className={`${isMobile ? 'mb-3' : ''}`}>
            {!row?.src ? <Spinner className="m-5" color="primary" /> :
              <>
                {t(`${row?.subtitle}`) === 'Изчислете цена' ?
                  <Link className="text-decoration-none" to="/truck-covers/calculator" onClick={(e) => handleCardTitle(e, row?.title)}>
                    <Card className="h-100">
                      <img src={row?.src} className="gallery-image" />
                      <CardBody>
                        <CardTitle tag="h5">
                          {t(`${row?.title}`)}
                        </CardTitle>
                        <CardSubtitle
                          className="mb-2 text-muted"
                          tag="h6"
                        >
                          {t(`${row?.subtitle}`)}
                        </CardSubtitle>
                      </CardBody>
                    </Card>
                  </Link> :
                  <Card className="h-100">
                    <img src={row?.src} className="gallery-image" />
                    <CardBody>
                      <CardTitle tag="h5">
                        {t(`${row?.title}`)}
                      </CardTitle>
                      <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                      >
                        {t(`${row?.subtitle}`)}
                      </CardSubtitle>
                    </CardBody>
                  </Card>}
              </>
            }
          </Col>
        })}
      </Row>
      <Row className={`${!isMobile ? 'my-5 mx-1' : ''}`}>
        {secondRow.map((row, idx) => {
          return <Col md="3" key={idx} className={`h-100 ${isMobile ? 'mb-3' : ''}`}>
            {!row?.src ? <Spinner className="m-5" color="primary" /> :
              <>
                {t(`${row?.subtitle}`) === 'Изчислете цена' ?
                  <Link className="text-decoration-none" to="/truck-covers/calculator" onClick={(e) => handleCardTitle(e, row?.title)}>
                    <Card className="h-100">
                      <img src={row?.src} className="gallery-image" />
                      <CardBody>
                        <CardTitle tag="h5">
                          {t(`${row?.title}`)}
                        </CardTitle>
                        <CardSubtitle
                          className="mb-2 text-muted"
                          tag="h6"
                        >
                          {t(`${row?.subtitle}`)}
                        </CardSubtitle>
                      </CardBody>
                    </Card>
                  </Link> :
                  <Card className="h-100">
                    <img src={row?.src} className="gallery-image" />
                    <CardBody>
                      <CardTitle tag="h5">
                        {t(`${row?.title}`)}
                      </CardTitle>
                      <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                      >
                        {t(`${row?.subtitle}`)}
                      </CardSubtitle>
                    </CardBody>
                  </Card>}
              </>
            }
          </Col>
        })}
      </Row>
      <Hr text={`${t('truck_cover_link')}`} />
      <Row className={`${!isMobile ? 'my-3 mx-1' : ''}`}>
        {lastRow.map((row, idx) => {
          return <Col md="3" key={idx} className={`${isMobile ? 'mb-3' : ''}`}>
            {!row?.src ? <Spinner className="m-5" color="primary" /> :
              <>
                {t(`${row?.subtitle}`) === 'Изчислете цена' ?
                  <Link className="text-decoration-none" to="/truck-covers/calculator" onClick={(e) => handleCardTitle(e, row?.title)}>
                    <Card>
                      <img src={row?.src} className="gallery-image" />
                      <CardBody>
                        <CardTitle tag="h5">
                          {t(`${row?.title}`)}
                        </CardTitle>
                        <CardSubtitle
                          className="mb-2 text-muted"
                          tag="h6"
                        >
                          {t(`${row?.subtitle}`)}
                        </CardSubtitle>
                      </CardBody>
                    </Card>
                  </Link> :
                  <Card className="h-100">
                    <img src={row?.src} className="gallery-image" />
                    <CardBody>
                      <CardTitle tag="h5">
                        {t(`${row?.title}`)}
                      </CardTitle>
                      <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                      >
                        {row?.subtitle && t(`${row?.subtitle}`)}
                      </CardSubtitle>
                    </CardBody>
                  </Card>
                }
              </>
            }
          </Col>
        })}
      </Row>
    </div>
  )
}

export default CardsCover;