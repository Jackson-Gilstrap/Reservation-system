import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div>
        <h1>Home Page</h1>
        <Link to={"/demographic"}>
          <button>Begin Reservation Process</button>
        </Link>
        <Link to={"/login"}>
          <button>Login</button>
        </Link>
      </div>
    </>
  );
};

export default Home

