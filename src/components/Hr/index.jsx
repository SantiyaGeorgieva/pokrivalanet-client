import './hr.scss';

function Hr({ text }) {
  return (
    <div className="container px-0">
      <hr className="hr-text" data-content={text} />
    </div>
  )
}

export default Hr;