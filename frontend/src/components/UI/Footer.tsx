import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="flex justify-center font-lexend font-normal border-b-1 py-15 border-gray-300">
        <div className="basis-1/3 px-20">
          <Link to="/">Logo</Link>
        </div>
        <ul className="flex flex-row flex-wrap basis-2/3 gap-y-5">
          <li className="basis-1/3">
            <Link
              to="/"
              className="rounded-lg px-1.5 py-1.5 hover:bg-gray-100 transition"
            >
              Link1
            </Link>
          </li>
          <li className="basis-1/3">
            <Link
              to="/"
              className="rounded-lg px-1.5 py-1.5 hover:bg-gray-100 transition"
            >
              Link2
            </Link>
          </li>
          <li className="basis-1/3">
            <Link
              to="/"
              className="rounded-lg px-1.5 py-1.5 hover:bg-gray-100 transition"
            >
              Link3
            </Link>
          </li>
          <li className="basis-1/3">
            <Link
              to="/"
              className="rounded-lg px-1.5 py-1.5 hover:bg-gray-100 transition"
            >
              Link4
            </Link>
          </li>
          <li className="basis-1/3">
            <Link
              to="/"
              className="rounded-lg px-1.5 py-1.5 hover:bg-gray-100 transition"
            >
              Link5
            </Link>
          </li>
          <li className="basis-1/3">
            <Link
              to="/"
              className="rounded-lg px-1.5 py-1.5 hover:bg-gray-100 transition"
            >
              Link6
            </Link>
          </li>
        </ul>
      </div>
      <a className="block px-5 py-5 font-lexend font-light">
        Copyright © 2025 Template. All rights reserved.
      </a>
    </>
  );
}

export default Footer;
