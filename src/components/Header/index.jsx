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
              <Link to={`tel:${t('phone')}`}>
                <Button size="sm" color="dark" className="cursor-default me-2" outline>
                  <i className="fa fa-phone my-2 px-2" />{t('phone')}  
                </Button>
              </Link>
              <Link to={`tel:${t('phone2')}`}>
                <Button color="dark" size="sm" className="cursor-default me-2" outline>
                  <i className="fa fa-phone my-2 px-2" />{t('phone2')}
                </Button>
              </Link>
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
            <Navbar expand="sm" className={`py-0 px-0 text-end ${!isMobile ? 'mt-5 me-2' : 'mt-4 ms-5' }`}>
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

            <div className={`d-flex align-items-baseline text-start social-icons ${!isMobile ? 'flex-column' : 'mt-4'}`}>
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