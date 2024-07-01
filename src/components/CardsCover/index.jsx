import { Row, Col, Spinner, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Hr from "../Hr";

import './cardsCover.scss';

const CardsCover = ({ cards, prices, handleCardTitle, isMobile }) => {
  const result = cards.map(img => img);
  const firstRow = isMobile ? result.slice(0, 3) : result.slice(0, 4);
  const secondRow = isMobile ? result.slice(3, 6) : result.slice(4, 8);
  const thirdRow = isMobile && result.slice(6, 9);
  const lastRow = isMobile ? result.slice(9, result.length) : result.slice(8, result.length);
  const { t } = useTranslation();

  const extractPrices = (type) => {
    switch (type) {
      case 1:
        return prices.shade_ceiling;
      case 2:
        return prices.semi_trailer;
      case 3:
        return prices.semi_trailer_with_covers;
      case 4:
        return prices.semi_trailer_three_way;
      case 5:
        return prices.ratchet_cover;
      case 6:
        return prices.simple_trailer_cover;
      default: ;
    }
  };

  return (
    <div className={`container ${isMobile ? 'px-0' : ''}`}>
      {!isMobile ?
        <>
          <Row className="mx-1">
            {firstRow.map((row, idx) => {
              return <Col md="3" key={idx} className="mb-3">
                {!row?.src ? <Spinner className="m-5" color="primary" /> :
                  <>
                    {t(`${row?.subtitle}`) === t('card_text_subtitle7') ?
                      <Link className="text-decoration-none" to="/gondola-calculator" onClick={(e) => handleCardTitle(e, row?.title)}>
                        <Card className="h-100">
                          <img src={row?.src} className="card-image" />
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
                        <img src={row?.src} className="card-image" />
                        <CardBody>
                          <CardTitle tag="h5">
                            {t(`${row?.title}`)}
                          </CardTitle>
                          <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                          >
                            {extractPrices(idx + 1)} {t(`${row?.subtitle}`)}
                          </CardSubtitle>
                        </CardBody>
                      </Card>}
                  </>
                }
              </Col>
            })}
          </Row>
          <Row className="my-5 mx-1">
            {secondRow.map((row, idx) => {
              return <Col md="3" key={idx} className="h-100">
                {!row?.src ? <Spinner className="m-5" color="primary" /> :
                  <>
                    {t(`${row?.subtitle}`) === t('card_text_subtitle7') ?
                      <Link className="text-decoration-none" to="/shutter-calculator" onClick={(e) => handleCardTitle(e, row?.title)}>
                        <Card className="h-100">
                          <img src={row?.src} className="card-image" />
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
                        <img src={row?.src} className="card-image" />
                        <CardBody>
                          <CardTitle tag="h5">
                            {t(`${row?.title}`)}
                          </CardTitle>
                          <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                          >
                            {extractPrices(idx + 4)} {t(`${row?.subtitle}`)}
                          </CardSubtitle>
                        </CardBody>
                      </Card>}
                  </>
                }
              </Col>
            })}
          </Row>
          <Hr text={`${t('truck_cover_link')}`} />
          <Row className="my-3 mx-1">
            {lastRow.map((row, idx) => {
              return <Col md="3" key={idx}>
                {!row?.src ? <Spinner className="m-5" color="primary" /> :
                  <>
                    {t(`${row?.subtitle}`) === t('card_text_subtitle7') ?
                      <Link className="text-decoration-none" onClick={(e) => handleCardTitle(e, row?.title)}>
                        <Card>
                          <img src={row?.src} className="card-image" />
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
                        <img src={row?.src} className="card-image" />
                        <CardBody>
                          <CardTitle tag="h5">
                            {t(`${row?.title}`)}
                          </CardTitle>
                          <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                          >
                            {row.key === 12 ? extractPrices(6) + ' ' + t(`${row?.subtitle}`) : null}
                          </CardSubtitle>
                        </CardBody>
                      </Card>
                    }
                  </>
                }
              </Col>
            })}
          </Row>
        </> :
        <>
          <Row>
            {firstRow.map((row, idx) => {
              return <Col md="4" key={idx} className="mb-3">
                {!row?.src ? <Spinner className="m-5" color="primary" /> :
                  <>
                    {t(`${row?.subtitle}`) === t('card_text_subtitle7') ?
                      <Link className="text-decoration-none" onClick={(e) => handleCardTitle(e, row?.title)}>
                        <Card className="h-100">
                          <img src={row?.src} className="card-image" />
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
                        <img src={row?.src} className="card-image" />
                        <CardBody>
                          <CardTitle tag="h5">
                            {t(`${row?.title}`)}
                          </CardTitle>
                          <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                          >
                            {extractPrices(idx + 1)} {t(`${row?.subtitle}`)}
                          </CardSubtitle>
                        </CardBody>
                      </Card>}
                  </>
                }
              </Col>
            })}
          </Row>
          <Row>
            {secondRow.map((row, idx) => {
              return <Col md="4" key={idx} className="h-100 mb-3">
                {!row?.src ? <Spinner className="m-5" color="primary" /> :
                  <>
                    {t(`${row?.subtitle}`) === t('card_text_subtitle7') ?
                      <Link className="text-decoration-none" to="/gondola-calculator" onClick={(e) => handleCardTitle(e, row?.title)}>
                        <Card className="h-100">
                          <img src={row?.src} className="card-image" />
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
                        <img src={row?.src} className="card-image" />
                        <CardBody>
                          <CardTitle tag="h5">
                            {t(`${row?.title}`)}
                          </CardTitle>
                          <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                          >
                            {extractPrices(idx + 4)} {t(`${row?.subtitle}`)}
                          </CardSubtitle>
                        </CardBody>
                      </Card>}
                  </>
                }
              </Col>
            })}
          </Row>
          <Row>
            {thirdRow.map((row, idx) => {
              return <Col md="4" key={idx} className={`h-100 ${idx != 2 ? 'mb-3' : ''}`}>
                {!row?.src ? <Spinner className="m-5" color="primary" /> :
                  <>
                    {t(`${row?.subtitle}`) === t('card_text_subtitle7') ?
                      <Link className="text-decoration-none" to="/shutter-calculator" onClick={(e) => handleCardTitle(e, row?.title)}>
                        <Card className="h-100">
                          <img src={row?.src} className="card-image" />
                          <CardBody>
                            <CardTitle tag="h5">
                              {t(`${row?.title}`)}
                            </CardTitle>
                            <CardSubtitle
                              className="mb-2 text-muted"
                              tag="h6"
                            >
                              {row?.subtitle ? t(`${row?.subtitle}`) : ''}
                            </CardSubtitle>
                          </CardBody>
                        </Card>
                      </Link> :
                      <Card className="h-100">
                        <img src={row?.src} className="card-image" />
                        <CardBody>
                          <CardTitle tag="h5">
                            {t(`${row?.title}`)}
                          </CardTitle>
                          <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                          >
                            {row?.subtitle ? t(`${row?.subtitle}`) : ''}
                          </CardSubtitle>
                        </CardBody>
                      </Card>}
                  </>
                }
              </Col>
            })}
          </Row>
          <Hr text={`${t('truck_cover_link')}`} />
          <Row>
            {lastRow.map((row, idx) => {
              return <Col md="4" key={idx} className="mb-3">
                {!row?.src ? <Spinner className="m-5" color="primary" /> :
                  <>
                    {t(`${row?.subtitle}`) === t('card_text_subtitle7') ?
                      <Link className="text-decoration-none" onClick={(e) => handleCardTitle(e, row?.title)}>
                        <Card>
                          <img src={row?.src} className="card-image" />
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
                        <img src={row?.src} className="card-image" />
                        <CardBody>
                          <CardTitle tag="h5">
                            {t(`${row?.title}`)}
                          </CardTitle>
                          <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                          >
                            {row.key === 12 ? extractPrices(6) + ' ' + t(`${row?.subtitle}`) : null}
                          </CardSubtitle>
                        </CardBody>
                      </Card>
                    }
                  </>
                }
              </Col>
            })}
          </Row>
        </>}
    </div>
  )
}

export default CardsCover;