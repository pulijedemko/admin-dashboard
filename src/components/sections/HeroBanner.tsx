import mainBanner from "../../assets/mainBanner.png";

const HeroBanner = () => {
  return (
    <div className="flex flex-row px-16 pt-16 items-center justify-center">
      <div className="w-1/2 flex flex-col gap-4 ">
        <h1 className="text-4xl font-bold ">Welcome to Admin Dashboard</h1>
        <p className="text-gray-500 text-base w-[80%]">
          This Admin Dashboard serves as a centralized system for managing
          users, products, and orders, monitoring key metrics, and supporting
          daily administrative operations through a structured and role-based
          interface.
        </p>
        <button className="w-fit bg-blue-500 text-white px-4 py-2 rounded ">
          <a href="/signin" className="text-white no-underline">
            Get Started
          </a>
        </button>
      </div>
      <div className="w-1/2 ">
        <img src={mainBanner} alt="main banner" className="w-full" />
      </div>
    </div>
  );
};

export default HeroBanner;
