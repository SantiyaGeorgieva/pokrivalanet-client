import underConstruction from '../../images/underconstruction.jpg';

function UnderConstruction({ hideMain, isMobile }) {
  return <>
    {!hideMain &&
      <div>
        <img className={`${isMobile ? 'w-100' : ''}`} src={underConstruction} alt="under construction image" />
      </div>
    }
  </>;
}

export default UnderConstruction;