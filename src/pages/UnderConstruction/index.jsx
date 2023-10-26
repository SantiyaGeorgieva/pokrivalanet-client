import { Spinner } from 'reactstrap';
import underConstruction from '../../images/underconstruction.jpg';

function UnderConstruction({ hideMain, isMobile }) {
  return <>
    {!hideMain &&
      <div>
        {underConstruction ? <img className={`${isMobile ? 'w-100' : ''}`} src={underConstruction} alt="under construction image" /> :
          <Spinner className="m-5" color="primary" />}
      </div>
    }
  </>;
}

export default UnderConstruction;