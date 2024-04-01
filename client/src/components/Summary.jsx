const ReservationSummary = ({first_name, last_name, phone, zipcode, email, reservation_datetime, reservation_location}) => {
  return (
    <>
      <div className="summary-container">
        <h2>{first_name}</h2>
        <h2>{last_name}</h2>
        <h2>{phone}</h2>
        <h2>{zipcode}</h2>
        <h2>{email}</h2>
        <h2>{reservation_datetime}</h2>
        <h2>{reservation_location}</h2>
      </div>
    </>
  );
};


export default ReservationSummary;
