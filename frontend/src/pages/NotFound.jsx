import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Link to="/" className=" text-pr-900 hover:text-pr-700">
        <i className="fa-solid fa-hand-point-left"></i>
        &nbsp; Back to homepage
      </Link>
      <i className=" text p-2 mt-8 text-red-500 fa-solid fa-ban text-[100px] text-center block"></i>
      <p className=" text p-2 mt-8 text-red-500  text-[50px] text-center block">
        404 Not Found
      </p>
    </>
  );
};

export default NotFound;
