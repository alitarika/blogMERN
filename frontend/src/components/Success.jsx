import { useState } from "react";

const Success = ({ message }) => {
  const [show, setShow] = useState(true);

  setTimeout(() => setShow(false), 2000);

  return (
    <div>
      {show && (
        <div className="bg-green-500 text-white p-2 rounded-md mt-6 text-sm mb-4">
          <i className="fa-solid fa-circle-check"></i> {message}
        </div>
      )}
    </div>
  );
};

export default Success;
