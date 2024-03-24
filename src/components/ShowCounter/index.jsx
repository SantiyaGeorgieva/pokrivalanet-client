const ShowCounter = ({ minutes, seconds }) => {
  return (
    <div className="show-counter">
      <p className="fw-bold mb-0">{minutes < 10 ? 0 : ''}{minutes}:{seconds < 10 ? 0 : ''}{seconds}</p>
    </div>
  );
};

export default ShowCounter;