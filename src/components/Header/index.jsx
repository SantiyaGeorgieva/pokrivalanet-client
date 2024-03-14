import { memo, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
import { scrollToTop } from "../../utils";

import './header.scss';

const Header = memo(function Header({ isMobile, selectedItem, setSelectedItem }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navigateToContact = () => {
    navigate('/contact');
  };

  const toggleMobileMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const onEmailClick = () => {
    window.open(`mailto:${t('email_office')}`);
  }

  useEffect(() => {
    const element = window.parent.document.querySelector('.navbar-expand-sm > .container-fluid');
    if (isMobile && element) {
      element.classList.add("px-0");
    }
  }, [isMobile, isOpen])

  return (
    <>{!isMobile ? (<div className="container-fluid px-0">
      <div className="mb-3">
        <nav className="navbar navbar-expand-lg py-0">
          <div className="container-fluid">
            <NavLink onClick={scrollToTop} to="/truck-covers" className={`navbar-brand text-start ${!isMobile ? 'ms-4' : ''}`}>
              <img src={Logo} alt="Pokrivala.net logo" className="w-50" />
            </NavLink>
            <div className="d-flex align-items-center justify-content-end collapse navbar-collapse" id="navbars-host">
              <div className="social-icons me-3 text-end">
                <Link to="https://www.facebook.com/brezentiruse" aria-label="https://www.facebook.com/brezentiruse" target="_blank">
                  <i className="fa-brands fa-facebook fs-4 mx-1 my-2 text-dark"></i>
                </Link>
                <Link to="https://www.facebook.com/CreativeIdeaGroup/?fref=ts" aria-label="https://www.facebook.com/CreativeIdeaGroup/?fref=ts" target="_blank">
                  <i className="fa-brands fa-facebook fs-4 text-dark"></i>
                </Link>
              </div>
              <Button size="sm" color="dark" className="cursor-default me-2" outline>
                <i className="fa fa-phone my-2 px-2" />{t('phone')}
              </Button>
              <Button color="dark" size="sm" className="cursor-default me-2" outline>
                <i className="fa fa-phone my-2 px-2" />{t('phone2')}
              </Button>
              <Button onClick={() => { scrollToTop(); navigateToContact(); }} color="dark" size="sm" className="location-link me-2" outline>
                <Link className="text-dark text-decoration-none" to="/contact">
                  <i className="fa-solid fa-location-dot my-2 px-2" />{t('city')}
                </Link>
              </Button>
              <Button color="dark" size="sm" outline className="cursor-default" onClick={onEmailClick}>
                <i className="fa-solid fa-envelope my-2 px-2" />{t('email_office')}
              </Button>
              <Navbar expand="sm" className="py-0">
                <Nav className="ms-auto" navbar>
                  <UncontrolledDropdown setActiveFromChild className="cursor-pointer">
                    <DropdownToggle
                      caret
                      className="nav-link"
                      tag="a"
                      aria-current="page"
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
            <NavLink onClick={scrollToTop} to="/truck-covers" className="navbar-brand text-start me-0">
              <img src={Logo} alt="Pokrivala.net logo" className="w-50" />
            </NavLink>
            <Navbar expand="sm" className="py-0 px-0 mt-5 me-2 text-end">
              <Nav className=" ms-auto" navbar>
                <UncontrolledDropdown setActiveFromChild>
                  <DropdownToggle
                    caret
                    className="nav-link pointer-events-none"
                    tag="a"
                    aria-haspopup="listbox"
                  >
                    {selectedItem.toLocaleUpperCase()}
                  </DropdownToggle>
                  <DropdownMenu role="menuRole">
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
            {/* <div className="d-flex justify-content-center align-items-center text-start"> */}
            {/* <Row className={`${isMobile ? 'header-buttons flex-nowrap' : 'my-3'}`}>
                <Col sm="5" md={`${!isMobile ? '' : '5'}`} className={`${!isMobile ? '' : 'px-0'}`}>
                  <Button size="sm" color="dark" className="cursor-default me-2" outline>
                    <i className="fa fa-phone my-2 px-2" />{t('phone')}
                  </Button>
                </Col>
                <Col sm="5" md={`${!isMobile ? '' : '5'}`} className={`${!isMobile ? '' : 'px-0'}`}>
                  <Button color="dark" size="sm" className="cursor-default me-2" outline>
                    <i className="fa fa-phone my-2 px-2" />{t('phone2')}
                  </Button>
                </Col>
                <Col sm="3" md={`${!isMobile ? '' : '3'}`} className={`${!isMobile ? '' : 'px-0'}`}>
                  <Button color="dark" size="sm" className="location-link me-2" outline>
                    <Link className="text-dark text-decoration-none" to="/contact">
                      <i className="fa-solid fa-location-dot my-2 px-2" />{t('city')}
                    </Link>
                  </Button>
                </Col>
                <Col sm="4" md={`${!isMobile ? '' : '5'}`} className={`${!isMobile ? '' : 'px-0'}`}>
                  <Button color="dark" size="sm" outline className="cursor-default" onClick={onEmailClick}>
                    <i className="fa-solid fa-envelope my-2 px-2" />{t('email_office')}
                  </Button>
                </Col>
              </Row> */}

            {/* <Row className={`${isMobile ? '' : 'my-3'}`}>
                <Col md="12" className={`${!isMobile ? '' : 'mt-3 mb-2'}`}>
                  <Button size="sm" color="dark" className="cursor-default me-2" outline>
                    <i className="fa fa-phone my-2 px-2" />{t('phone')}
                  </Button>
                </Col>
                <Col className={`${!isMobile ? '' : 'mb-2'}`}>
                  <Button color="dark" size="sm" className="cursor-default me-2" outline>
                    <i className="fa fa-phone my-2 px-2" />{t('phone2')}
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
                  <Button color="dark" size="sm" outline className="cursor-default" onClick={onEmailClick}>
                    <i className="fa-solid fa-envelope my-2 px-2" />{t('email_office')}
                  </Button>
                </Col>
              </Row> */}
            {/* </div> */}
            <div className="d-flex flex-column align-items-center text-start social-icons">
              <Link to="https://www.facebook.com/brezentiruse" aria-label="https://www.facebook.com/brezentiruse" target="_blank">
                <i className="fa-brands fa-facebook fs-4 mx-1 my-2 text-dark"></i>
              </Link>
              <Link to="https://www.facebook.com/CreativeIdeaGroup/?fref=ts" aria-label="https://www.facebook.com/CreativeIdeaGroup/?fref=ts" target="_blank">
                <i className="fa-brands fa-facebook fs-4 text-dark"></i>
              </Link>
            </div>
          </>
        }
        <div className="menuToggle" onClick={toggleMobileMenu}>
          <span className={`${isOpen ? 'close-icon close' : 'hamburger-icon'}`}>
            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="menu" navbar>
            {links.map((element, i) => {
              return (isOpen && <NavItem
                onClick={({ target }) => {
                  target && target?.classList.toggle('active');
                  handleLinkClick();
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
});

export default Header;