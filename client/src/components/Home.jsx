import { Link } from "react-router-dom";
import Header from "./Header";

const Home = () => {
  return (
    <>
      <div>
        <Header/>
        <h1>Vita/TCE Free Tax Service</h1>
        <Link to={"/intake"}>
          <button>Begin Reservation Process</button>
        </Link>
  
      </div>
    </>
  );
};

export default Home

