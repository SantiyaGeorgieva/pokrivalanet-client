import React, { Component } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './slider.scss';

import { Col, Row } from "reactstrap";
import TruckCover from '../../images/pokrivala-za-kamioni.jpg';
import WindproofCurtains from '../../images/vetrouportni_zavesi.jpg';
import CurtainsCowFarms from '../../images/zavesi_za_kravefermi.jpg';
import BigCover from '../../images/golemi_pokrivala.jpg';
import PrefabricatedTents from '../../images/sglobyaemishatri.jpg';
import AwningsSunshades from '../../images/tenti_i_sennici.jpg';
import IndustrialMaterials from '../../images/industrialni_izdeliya.jpg';
import LiningsCovers from '../../images/oblicovki_i_pokrivala.jpg';
import WagonCovers from '../../images/pokrivala_za-vagoni.png';

export default class HomeSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="container my-5">
        <Slider {...settings}>
          <Row className="d-flex bc-light-gray m-0">
            <Col md="4" className="d-flex flex-column align-items-center justify-content-center text-start column-image">
              <h4 className="mb-5 ms-4">Покривала и брезенти&nbsp;&nbsp;&nbsp; за транспортни средства</h4>
              {/* <p className="ms-4 mb-0">Подсигурете надеждна защита на товарите по време на превоз.</p>
              <p className="ms-4">Заложете на висококачествения PVC материал и прецизната изработка.</p> */}
            </Col>
            <Col md="8" className="px-0">
              <img src={TruckCover} className="image" alt="Truck cover image" />
            </Col>
          </Row>
          <Row className="d-flex bc-light-gray">
            <Col md="4" className="d-flex flex-column align-items-center justify-content-center text-start column-image">
              <h4 className="mb-5">Ветроупорни завеси</h4>
            </Col>
            <Col md="8" className="px-0">
              <img src={WindproofCurtains} className="image" alt="Truck cover image" />
            </Col>
          </Row>
          <Row className="d-flex bc-light-gray">
            <Col md="4" className="d-flex flex-column align-items-center justify-content-center text-start column-image">
              <h4 className="mb-5">Тенти и сенници</h4>
            </Col>
            <Col md="8" className="px-0">
              <img src={AwningsSunshades} className="image" alt="Truck cover image" />
            </Col>
          </Row>
          <Row className="d-flex bc-light-gray">
            <Col md="4" className="d-flex flex-column align-items-center justify-content-center text-start column-image">
              <h4 className="mb-5 ms-4">Покривала за рибарници и лагуни</h4>
            </Col>
            <Col md="8" className="px-0">
              <img src={TruckCover} className="image" alt="Truck cover image" />
            </Col>
          </Row>
          <Row className="d-flex bc-light-gray">
            <Col md="4" className="d-flex flex-column align-items-center justify-content-center text-start column-image">
              <h4 className="mb-5">Завеси за кравеферми</h4>
            </Col>
            <Col md="8" className="px-0">
              <img src={CurtainsCowFarms} className="image" alt="Truck cover image" />
            </Col>
          </Row>
          <Row className="d-flex bc-light-gray">
            <Col md="4" className="d-flex flex-column align-items-center justify-content-center text-start column-image">
              <h4 className="mb-5">Индустриални изделия</h4>
            </Col>
            <Col md="8" className="px-0">
              <img src={IndustrialMaterials} className="image" alt="Truck cover image" />
            </Col>
          </Row>
          <Row className="d-flex bc-light-gray">
            <Col md="4" className="d-flex flex-column align-items-center justify-content-center text-start column-image">
              <h4 className="mb-5">Сглобяеми шатри</h4>
            </Col>
            <Col md="8" className="px-0">
              <img src={PrefabricatedTents} className="image" alt="Truck cover image" />
            </Col>
          </Row>
          <Row className="d-flex bc-light-gray">
            <Col md="4" className="d-flex flex-column align-items-center justify-content-center text-start column-image">
              <h4 className="mb-5 ms-4">Големи покривала</h4>
            </Col>
            <Col md="8" className="px-0">
              <img src={BigCover} className="image" alt="Truck cover image" />
            </Col>
          </Row>
          <Row className="d-flex bc-light-gray">
            <Col md="4" className="d-flex flex-column align-items-center justify-content-center text-start column-image">
              <h4 className="mb-5">Облицовки и покривала</h4>
            </Col>
            <Col md="8" className="px-0">
              <img src={LiningsCovers} className="image" alt="Truck cover image" />
            </Col>
          </Row>
          <Row className="d-flex bc-light-gray">
            <Col md="4" className="d-flex flex-column align-items-center justify-content-center text-start column-image">
              <h4 className="mb-5">Покривала за вагони</h4>
            </Col>
            <Col md="8" className="px-0">
              <img src={WagonCovers} className="image" alt="Truck cover image" />
            </Col>
          </Row>
        </Slider>
      </div >
    );
  }
}