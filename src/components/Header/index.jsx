import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import Logo from '../../images/logo.png';
import { links } from "../../constants";
import './header.scss';

function Header({ isMobile, isOpen, toggleClass }) {
  const [selectedItem, setSelectedItem] = useState(localStorage.getItem("i18nextLng"));
  const { t } = useTranslation();
  // console.log('isOpen', isOpen);

  useEffect(() => {
    if (isMobile && document.querySelectorAll('.container-fluid')[1]) {
      document.querySelectorAll('.container-fluid')[1].classList.add("px-0");
    }
  }, [isMobile, isOpen])

  return (
    <>{!isMobile ? (<div className="container-fluid px-0">
      <div className="mb-3">
        <nav className="navbar navbar-expand-lg py-0">
          <div className="container-fluid">
            <NavLink to="/" className={`navbar-brand text-start ${!isMobile ? 'ms-4' : ''}`}>
              <img src={Logo} alt="Pokrivala.net logo" className="w-50" />
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
                  <i className="fa-solid fa-location-dot my-2 px-2" />{t('city')}
                </Link>
              </Button>
              <Button color="dark" size="sm" outline className="cursor-default" href="mailto:office@pokrivala.net">
                <i className="fa-solid fa-envelope my-2 px-2" />office@pokrivala.net
              </Button>
              <Navbar expand="sm" className="py-0">
                <Nav className="ms-auto" navbar>
                  <UncontrolledDropdown setActiveFromChild className="cursor-pointer">
                    <DropdownToggle
                      caret
                      className="nav-link"
                      tag="a"
                    >
                      {selectedItem.toLocaleUpperCase()}
                    </DropdownToggle>
                    <DropdownMenu>
                      {selectedItem !== "en" && <DropdownItem
                        href="#"
                        tag="a"
                        onClick={() => {
                          i18next.changeLanguage('en');
                          setSelectedItem(localStorage.getItem("i18nextLng"));
                        }}
                      >
                        EN
                      </DropdownItem>
                      }
                      {selectedItem !== "bg" && <DropdownItem
                        href="#"
                        tag="a"
                        onClick={() => {
                          i18next.changeLanguage('bg');
                          setSelectedItem(localStorage.getItem("i18nextLng"));
                        }}
                      >
                        BG
                      </DropdownItem>}
                      {selectedItem !== "ro" && <DropdownItem
                        href="#"
                        tag="a"
                        onClick={() => {
                          i18next.changeLanguage('ro');
                          setSelectedItem(localStorage.getItem("i18nextLng"));
                        }}
                      >
                        RO
                      </DropdownItem>
                      }
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Navbar>
            </div>
          </div>
        </nav>
        <nav className="navbar navbar-expand-md navbar-dark bc-blue">
          <div className="collapse navbar-collapse align-items-center justify-content-center" id="navbarCollapse">
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
                        {t(element.name)}
                      </NavLink>
                    </Col>
                  )
                })}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>) :
      <Navbar expand="md" className={`small ${isOpen ? 'bc-blue' : ''}`}>
        {!isOpen &&
          <>
            <NavLink to="/" className="navbar-brand text-start">
              <img src={Logo} alt="Pokrivala.net logo" className="w-50" />
            </NavLink>
            <Navbar expand="sm" className="py-0 px-0 mt-5 me-2 text-end">
              <Nav className=" ms-auto" navbar>
                <UncontrolledDropdown setActiveFromChild className="cursor-notAllowed">
                  <DropdownToggle
                    caret
                    className="nav-link pointer-events-none"
                    tag="a"
                  >
                    {selectedItem.toLocaleUpperCase()}
                  </DropdownToggle>
                  <DropdownMenu>
                    {selectedItem !== "en" && <DropdownItem
                      href="#"
                      tag="a"
                      onClick={() => {
                        i18next.changeLanguage('en');
                        setSelectedItem(localStorage.getItem("i18nextLng"));
                      }}
                    >
                      EN
                    </DropdownItem>
                    }
                    {selectedItem !== "bg" && <DropdownItem
                      href="#"
                      tag="a"
                      onClick={() => {
                        i18next.changeLanguage('bg');
                        setSelectedItem(localStorage.getItem("i18nextLng"));
                      }}
                    >
                      BG
                    </DropdownItem>}
                    {selectedItem !== "ro" && <DropdownItem
                      href="#"
                      tag="a"
                      onClick={() => {
                        i18next.changeLanguage('ro');
                        setSelectedItem(localStorage.getItem("i18nextLng"));
                      }}
                    >
                      RO
                    </DropdownItem>
                    }
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Navbar>
            <div className="d-flex flex-column align-items-center text-start">
              <Row className={`${isMobile ? '' : 'my-3'}`}>
                <Col md="12" className={`${!isMobile ? '' : 'mt-3 mb-2'}`}>
                  <Button size="sm" color="dark" className="cursor-default me-2" outline>
                    <i className="fa fa-phone my-2 px-2" />+359 887 614 031
                  </Button>
                </Col>
                <Col className={`${!isMobile ? '' : 'mb-2'}`}>
                  <Button color="dark" size="sm" className="cursor-default me-2" outline>
                    <i className="fa fa-phone my-2 px-2" />+359 877 614 029
                  </Button>
                </Col>
              </Row>
            </div>
            <div className="d-flex flex-column align-items-center text-start">
              <Row>
                <Col md="12" className={`${!isMobile ? '' : 'mb-2'}`}>
                  <Button color="dark" size="sm" className="location-link me-2" outline>
                    <Link className="text-dark text-decoration-none" to="/contact">
                      <i className="fa-solid fa-location-dot my-2 px-2" />{t('city')}
                    </Link>
                  </Button>
                </Col>
                <Col className={`${!isMobile ? '' : 'mb-2'}`}>
                  <Button color="dark" size="sm" outline className="cursor-default">
                    <i className="fa-solid fa-envelope my-2 px-2" />office@pokrivala.net
                  </Button>
                </Col>
              </Row>
            </div>
            <div className="d-flex flex-column align-items-center text-start social-icons">
              <Link to="https://www.facebook.com/brezentiruse" target="_blank">
                <i className="fa-brands fa-facebook fs-4 mx-1 my-2 text-dark"></i>
              </Link>
              <Link to="https://www.facebook.com/CreativeIdeaGroup/?fref=ts" target="_blank">
                <i className="fa-brands fa-facebook fs-4 text-dark"></i>
              </Link>
            </div>
          </>
        }
        <div className={`menuToggle ${isOpen ? 'close' : ''}`} onClick={(e) => toggleClass(e)}>
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="menu" navbar>
            {links.map((element, i) => {
              return (isOpen && <NavItem
                onClick={({ target }) => {
                  target && target?.classList.toggle('active')
                  toggleClass(false);
                }}
                key={i}>
                <NavLink to={element.to}>
                  {t(element.name)}
                </NavLink>
              </NavItem>)
            })}
          </Nav>
        </Collapse>
      </Navbar >
    }
    </>
  )
};

export default Header;