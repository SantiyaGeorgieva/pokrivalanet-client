import { Button, Col, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, Row, UncontrolledDropdown } from "reactstrap";
import Logo from '../../images/logo.png'
import { Link } from "react-router-dom";
import './header.scss';
import { useState } from "react";
import { links } from "../../constants";

function Header() {
  const [isActive, setIsActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState("BG");

  return (
    <>
      <Row className="my-4">
        <Col md="3">
          <img src={Logo} alt="Pokrivala.net logo" />
        </Col>
        <Col md="">
          <Row className="d-flex">
            <Col md="4">
              <div className="social-icons text-end">
                <Link to="https://www.facebook.com/brezentiruse" target="_blank">
                  <i className="fa-brands fa-facebook fs-4 mx-1 my-2 text-dark"></i>
                </Link>
                <Link to="https://www.facebook.com/CreativeIdeaGroup/?fref=ts" target="_blank">
                  <i className="fa-brands fa-facebook fs-4 text-dark"></i>
                </Link>
              </div>
            </Col>
            <Col md="7">
              <Button size="sm" color="dark" className="me-2" outline>
                <i className="fa fa-phone my-2 px-2" />+359 887 614 031
              </Button>
              <Button color="dark" size="sm" className="me-2" outline>
                <i className="fa fa-phone my-2 px-2" />+359 877 614 029
              </Button>
              <Button color="dark" size="sm" className="location-link me-2" outline>
                <Link className="text-dark text-decoration-none" to="/contact">
                  <i className="fa-solid fa-location-dot my-2 px-2" />Русе
                </Link>
              </Button>
              <Button color="dark" size="sm" outline>
                <i className="fa-solid fa-envelope my-2 px-2" />brezenti_ruse@abv.bg
              </Button>
            </Col>
            <Col md="1" className="d-flex align-items-center">
              <Navbar expand="sm" className="py-0">
                <Nav className="ms-auto" navbar>
                  <UncontrolledDropdown setActiveFromChild>
                    <DropdownToggle
                      caret
                      className="nav-link cursor-pointer"
                      tag="a"
                    >
                      {selectedItem}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        href="#"
                        tag="a"
                        onClick={() => { setSelectedItem('EN') }}
                      >
                        EN
                      </DropdownItem>
                      <DropdownItem
                        href="#"
                        tag="a"
                        onClick={() => { setSelectedItem('RO') }}
                      >
                        RO
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Navbar>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="container-fluid">
        <Row className="bc-blue align-items-center">
          <div className="container">
            <Row className={`align-items-center ${isActive ? 'active' : ''}`}>
              {links.map((element, i) => {
                return (
                  <Col key={i}>
                    <Link to={element.to} onClick={() => setIsActive(true)}>{element.name}</Link>
                  </Col>
                )
              })}
            </Row>
          </div>
        </Row>
      </div>
    </>
  )
}

export default Header;