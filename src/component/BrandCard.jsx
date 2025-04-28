import { useContext } from "react";
import { GlobalContext } from "../globalContext/context";
import { useNavigate } from "react-router-dom";

const BrandCard = ({ name, color, image }) => {
  const navigate = useNavigate();
  const {
    state: { data },
    setState: { setBrand },
  } = useContext(GlobalContext);

  const categories = data[name] || [];

  const handleClick = () => {
    setBrand(name);

    navigate("/category");
  };

  return (
    // <div className="flex flex-col gap-2">
    //   <div
    //     onClick={handleClick}
    //     className="p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform text-white font-bold text-xl text-center"
    //     style={{ backgroundColor: color }}
    //   >
    //     {name} Categories
    //   </div>
    // </div>
    <div 
      className="rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
      // style={{ backgroundColor: color }}
      onClick={handleClick}
    >
      <img 
        src={image} 
        alt={`${name} brand`} 
        className="w-full h-58 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2 text-white">{name}</h3>
        <div className="mt-2">
          <a 
            href="#" 
            className="text-white font-medium flex items-center transition-transform hover:translate-x-1 text-[#fca88a]"
          >
            Explore 
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-1" 
              fill="#fca88a" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BrandCard;
