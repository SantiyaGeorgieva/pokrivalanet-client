import './hr.scss';

function Hr({ text }) {
  return (
    <div className="container">
      <hr className="hr-text" data-content={text} />
    </div>
  )
}

export default Hr;