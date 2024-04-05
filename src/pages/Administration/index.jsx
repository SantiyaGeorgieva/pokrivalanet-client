import { Button } from "reactstrap";
import { useSelector } from "react-redux";
import { authService } from "../../services/authService";
import PageTitle from "../../components/PageTitle";
import Hr from "../../components/Hr";
import AdminPanelImage from "../../images/admin-panel.png";
import ResizableLayout from "../../components/ResizableLayout";
import CountdownTimer from "../../components/CountdownTimer";
import Message from "../../components/Message";

import "./administration.scss";

const Administration = ({ hideMain, isMobile, message, setMessage, setError, visible }) => {
  PageTitle("Админ панел | Покривала НЕТ");
  
  let { user } = useSelector((state) => state.auth);
  user = user ?? ({ username: localStorage.getItem("username"), expirationTime: localStorage.getItem("expirationTime")});

  const handleLogout = async () => {
    authService.logout(setMessage);
    setError(false);
  };

  return (
    <>
      {!hideMain && (
        <>
          {visible ? <Message text={message} isVisible={visible} /> : null}
          <div className="jumbotron mt-4 me-4">
            <h1 className="display-6">Здравей, {user?.username}</h1>
            <p className="fs-6 mb-0">
              Добре дошъл в администраторския панел на pokrivala.net.
            </p>
            <p className="fs-6 mb-0">
              Избери желаната секция вляво, която желаеш да промениш и
              попълни промените в дясната секция.
            </p>
            <div className="d-flex align-items-center justify-content-end">
              <hr className="w-96 my-4" />
            </div>
            <CountdownTimer
              targetDate={user?.expirationTime}
              handleLogout={handleLogout}
            />
            <p className="fs-12 mb-0">
              Преди да изтече сесията, имаш около 15 мин.
            </p>
            <p className="fs-12">за да направиш промените си.</p>
            <Button
              type="submit"
              className={`bc-dark-blue ${isMobile ? "fw-bold btn-sm" : ""}`}
              onClick={handleLogout}
            >
              Изход
            </Button>
          </div>
          <div className={`${isMobile ? "container text-wrapper" : ""}`}>
            <ResizableLayout isMobile={isMobile} />
          </div>
        </>
      )}
      <img src={AdminPanelImage} alt="Admin panel image" />
      <Hr isMobile={isMobile} text="Админ панел" />
    </>
  );
}

export default Administration;
