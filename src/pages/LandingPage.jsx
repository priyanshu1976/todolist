import AnimatedText from "/src/components/AnimatedText";
import reactLogo from "/src/assets/react.svg";
import { useNavigate } from "react-router-dom";
export function LandingPage() {
  const sentences = [
    "YOU CAN ALWAYS CHANGE YOUR PLAN",
    "BUT ONLY IF YOU HAVE ONE!!!",
    "GET . PRODUCTIVE . NOW ;)",
  ];
  const navigate = useNavigate();
  return (
    <div className="bg-emerald-500 h-screen w-screen pt-6 overflow-x-hidden  ">
      <nav className="flex h-12  align-middle justify-between p-2">
        <h2 className="ml-12 font-fas text-white text-3xl">TO-DO list</h2>
        <div>
          <button
            onClick={() => navigate("/createaccount")}
            className=" p-2 px-4  rounded-lg  font-semibold text-center mr-10 bg-emerald-300 text-white hover:bg-emerald-600 transition-all duration-300 ml-[60px] "
          >
            signup
          </button>
        </div>
      </nav>
      <div className="flex items-center justify-center text-1xl sm:text-3xl md:text-4xl lg:text-4xl font-hap text-black mt-28">
        <AnimatedText sentences={sentences} />
      </div>
      <div className="flex items-center justify-center pt-20 ">
        <button
          onClick={() => navigate("/login")}
          className="bg-white p-5 px-10 text-xl font-lex rounded-full hover:bg-black hover:text-white transition-all duration-300"
        >
          Login
        </button>
      </div>
      <div className="flex justify-center align-middle">
        <img
          src={reactLogo}
          alt="/img noloading"
          className="h-[250px] sm:h-[200px] lg:h-[250px] "
        />
      </div>
    </div>
  );
}
