import { Link } from "react-router-dom";

const Intake = () => {
    return (
        <>
        <h1>Lets Begin</h1>
        <h2>Please choose an option below</h2>
        <div className="button-container">
        <Link to={"/questionnaire"}><button>New Client</button></Link>
        <Link to={"/demographic"}><button>Returning Client</button></Link>
        </div>
        <Link to={"/"}><button>Go back</button></Link>
        </>
    )
}

export default Intake;