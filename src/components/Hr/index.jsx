import { Row, Col } from 'reactstrap';
import './hr.scss';

function Hr({ isMobile, text }) {
  return (
    <div className={`container ${!isMobile ? 'px-0' : ''}`}>
      <Row>
        <Col>
          <hr className="hr-text" data-content={text} />
        </Col>
      </Row>
    </div>
  )
}

export default Hr;