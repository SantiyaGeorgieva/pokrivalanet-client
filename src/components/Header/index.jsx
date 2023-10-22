import {
  Button,
  Row,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  UncontrolledDropdown,
  Collapse,
  NavItem
} from "reactstrap";

import Logo from '../../images/logo.png'
import { Link, NavLink } from "react-router-dom";
import './header.scss';
import { useState } from "react";
import { links } from "../../constants";

function Header({ isMobile, isOpen, toggle }) {
  const [selectedItem, setSelectedItem] = useState("BG");

  const handleToggle = () => toggle();

  return (
    <>{!isMobile ? (<div className="container-fluid px-0">
      <div className="my-3">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <NavLink to="/" className="navbar-brand">
              <img src={Logo} alt="Pokrivala.net logo" />
            </NavLink>
            <div className="d-flex align-items-center justify-content-end collapse navbar-collapse" id="navbars-host">
              <div className="social-icons me-3 text-end">
                <Link to="https://www.facebook.com/brezentiruse" target="_blank">
                  <i className="fa-brands fa-facebook fs-4 mx-1 my-2 text-dark"></i>
                </Link>
                <Link to="https://www.facebook.com/CreativeIdeaGroup/?fref=ts" target="_blank">
                  <i className="fa-brands fa-facebook fs-4 text-dark"></i>
                </Link>
              </div>
              <Button size="sm" color="dark" className="cursor-default me-2" outline>
                <i className="fa fa-phone my-2 px-2" />+359 887 614 031
              </Button>
              <Button color="dark" size="sm" className="cursor-default me-2" outline>
                <i className="fa fa-phone my-2 px-2" />+359 877 614 029
              </Button>
              <Button color="dark" size="sm" className="location-link me-2" outline>
                <Link className="text-dark text-decoration-none" to="/contact">
                  <i className="fa-solid fa-location-dot my-2 px-2" />Русе
                </Link>
              </Button>
              <Button color="dark" size="sm" outline className="cursor-default">
                <i className="fa-solid fa-envelope my-2 px-2" />brezenti_ruse@abv.bg
              </Button>
              <Navbar expand="sm" className="py-0">
                <Nav className="ms-auto" navbar>
                  <UncontrolledDropdown setActiveFromChild className="cursor-notAllowed">
                    <DropdownToggle
                      caret
                      className="nav-link pointer-events-none"
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
            </div>
          </div>
        </nav>
        <nav className="navbar navbar-expand-md navbar-dark bc-blue">
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item d-flex collapse navbar-collapse" id="navbars-host">
                {links.map((element, i) => {
                  return (
                    <Col key={i}>
                      <NavLink
                        to={element.to}
                        className={({ isActive }) =>
                          isActive ? 'fw-bold' : ''
                        }
                      >
                        {element.name}
                      </NavLink>
                    </Col>
                  )
                })}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>) : <Navbar expand="md" className={`small ${isOpen ? 'bc-blue' : ''}`}>
      {!isOpen &&
        <>
          <NavLink to="/" className="navbar-brand">
            <img src={Logo} alt="Pokrivala.net logo" />
          </NavLink>
          <div className="d-flex flex-column align-items-center mx-auto">
            <Row className="my-3">
              <Col md="12">
                <Button size="sm" color="dark" className="cursor-default me-2" outline>
                  <i className="fa fa-phone my-2 px-2" />+359 887 614 031
                </Button>
                <Button color="dark" size="sm" className="cursor-default me-2" outline>
                  <i className="fa fa-phone my-2 px-2" />+359 877 614 029
                </Button>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <Button color="dark" size="sm" className="location-link me-2" outline>
                  <Link className="text-dark text-decoration-none" to="/contact">
                    <i className="fa-solid fa-location-dot my-2 px-2" />Русе
                  </Link>
                </Button>
                <Button color="dark" size="sm" outline className="cursor-default">
                  <i className="fa-solid fa-envelope my-2 px-2" />brezenti_ruse@abv.bg
                </Button>
              </Col>
            </Row>
            <div className="social-icons">
              <Link to="https://www.facebook.com/brezentiruse" target="_blank">
                <i className="fa-brands fa-facebook fs-4 mx-1 my-2 text-dark"></i>
              </Link>
              <Link to="https://www.facebook.com/CreativeIdeaGroup/?fref=ts" target="_blank">
                <i className="fa-brands fa-facebook fs-4 text-dark"></i>
              </Link>
            </div>
          </div>
        </>
      }
      <div className={`menuToggle ${isOpen ? 'close' : ''}`} onClick={toggle}>
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>
      </div>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="menu" navbar>
          {links.map((element, i) => {
            return (<NavItem
              key={i}>
              <NavLink
                to={element.to}
                className={({ isActive }) =>
                  isActive ? 'fw-bold' : ''
                }
                onClick={() => toggle()}
              >
                {element.name}
              </NavLink>
            </NavItem>)
          })}
        </Nav>
      </Collapse>
    </Navbar >
    }
    </>
  )
}

export default Header;