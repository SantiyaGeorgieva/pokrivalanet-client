import PageTitle from "../../components/PageTitle";
import Hr from "../../components/Hr";
import NotFoundImage from "../../images/404.png";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

import './notFound.scss';

function NotFound({ hideMain, isMobile }) {
  PageTitle('Страницата не е намерена | Покривала НЕТ');

  return <>{!hideMain &&
    <div className={`container ${isMobile ? '' : 'my-3'}`}>
      {isMobile ? <div>
        <img src={NotFoundImage} className="w-50 mt-3" />
        <p className="text-wrapper mt-3 mb-0">Страницата, която се опитате да достъпите не съществува</p>
        <Link to="/">
          <Button className="button-back mt-3">Върнете се в началото</Button>
        </Link>
      </div>
        : <div className="d-flex flex-column align-items-center justify-content-center mt-5">
          <img className="w-50" src={NotFoundImage} />
          <h5 className="mt-5 mb-0">Страницата, която се опитате да достъпите не съществува</h5>
          <Link to="/">
            <Button className="button-back mt-5">Върнете се в началото</Button>
          </Link>
        </div>
      }
      <Hr isMobile={isMobile} text="404: Страницата не е намерена" />
    </div>
  }</>

}

export default NotFound;