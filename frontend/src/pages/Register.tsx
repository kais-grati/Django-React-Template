import { Link } from "react-router-dom";

function Register() {
  return (
    <>
      <div className="flex flex-col items-start justify-center gap-3 px-4 py-4">
          <h1 className="px-2 py-2">Register Page</h1>
          <Link to="/" className="px-2 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-500 transition">Back Home</Link>
      </div>
    </>
  );
}
export default Register;
