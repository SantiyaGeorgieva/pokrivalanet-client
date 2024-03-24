import { Button, Alert } from "reactstrap";
import { useNavigate } from "react-router";
import PageTitle from "../../components/PageTitle";
import { endpoints, linkUrl } from "../../utils";
import Hr from "../../components/Hr";
import AdminPanelImage from "../../images/admin-panel.png";

import CountdownTimer from "../../components/CountdownTimer";
import ResizableLayout from "../../components/ResizableLayout";

import "./administration.scss";

const Administration = ({ hideMain, isMobile, username, targetDate, message }) => {
  PageTitle("Админ панел | Покривала НЕТ");

  console.log("message", message);

  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await fetch(`${linkUrl()}${endpoints.logout}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      responseType: "json",
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("responseData", responseData);
        // browser.cookies.remove('access_token');
        localStorage.clear();
        navigate("/login");
      })
      .catch((error) => {
        console.log("error", error);
      });

    return response;
  };

  return (
    <>
      {!hideMain && (
        <>
          {message && <Alert fade>{message}</Alert>}
          <div className="jumbotron mt-4 me-4">
            <h1 className="display-6">Здравей, {username}</h1>
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
              targetDate={targetDate}
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
