import backgroundImage from '../assets/background.png';
import loreal from '../assets/loreal1.jpg';
import freck_beauty from '../assets/freck_beauty1.jpg';

const BrandCard = ({ name, image, color }) => {
  return (
    <div className="card relative w-full h-64 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
      {/* The animated blob background */}
      <div className="blob" style={{ backgroundColor: color }}></div>
      
      {/* The semi-transparent background */}
      <div className="bg"></div>
      
      {/* Card content */}
      <div className="z-10 relative w-full h-full flex flex-col">
        <img 
          src={image} 
          alt={`${name} brand`} 
          className="w-full h-40 object-cover"
        />
        <div className="p-4 flex flex-col justify-between bg-white bg-opacity-80">
          <h3 className="font-bold text-xl text-gray-800">{name}</h3>
          <div className="mt-2">
            <a 
              href="#" 
              className="font-medium flex items-center transition-transform hover:translate-x-1 text-[#fca88a]"
              onClick={(e) => {
                e.preventDefault();
                console.log(`Exploring ${name}`);
              }}
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
    </div>
  );
};

const Home = () => {
  const brands = [
    { name: "L'Oréal Professionnel", image: loreal, color: "#de0f3f" },
    { name: "Freck Beauty", image: freck_beauty, color: "#de0f3f" },
  ];

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* First container - Beauty Space heading and description */}
      <div className="absolute top-36 right-30 bg-[#8B3A3A]/80 p-8 rounded-xl text-[#FBD2C0] max-w-xl ">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#fca88a] mb-10">BEAUTY SPACE</h1>
        <p className="text-md leading-relaxed mb-4 text-[#EACDC4]">
          The Cannes International Film Festival is underway. We start looking
          at the blog of celebrities who came to the festival in Cannes. And
          today under the microscope — Laetitia Casta and her dress.
        </p>
      </div>
      
      {/* Second container - Brand cards */}
      <div className="absolute top-86 right-30 mt-32 p-8 rounded-xl max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {brands.map((brand) => (
            <BrandCard 
              key={brand.name} 
              name={brand.name} 
              image={brand.image} 
              color={brand.color} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;