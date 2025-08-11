import { Link } from "react-router-dom";

function HookBody() {
  return (
    <div className="flex flex-col items-center text-center justify-center py-40">
      <h1 className="text-7xl font-semibold font-lexend">
        Django React <span className="text-blue-600">template</span><br></br>
        for <span className="text-blue-600">fast</span> web dev
      </h1>
      <h2 className="text-xl font-light py-10 font-lexend">
        Well suited for SAASs and E-Commerce web apps. <br></br>
        We provide the core features you focus on the main ones.
      </h2>
      <Link to="/" className="px-4 py-3 text-3xl font-lexend rounded-full bg-black text-white hover:bg-blue-950">
        Get Started now
      </Link>
    </div>
  );
}

export default HookBody;
