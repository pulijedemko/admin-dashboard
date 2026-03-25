import Logo from "../../assets/react.svg";

export const Footer = () => {
  return (
    <div className="grid grid-cols-4 items-center  gap-16 px-4 py-8 md:px-16 bg-slate-800 w-full">
      <div>
        <img src={Logo} alt="logo" className="h-24 w-24" />
        <p className="text-white pt-4">
          This is a test project for learning purpose <br /> of React and
          Tailwind CSS in a dashboard project.
        </p>
      </div>
      <div className="text-white">
        <h2 className="text-xl ">Links</h2>
        <div className="pt-2 flex flex-col gap-2 list-none">
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Blog</li>
        </div>
      </div>
      <div className="text-white">
        <h2 className="text-xl ">Contact</h2>
        <div className="pt-2 flex flex-col gap-2 list-none">
          <li>+91 9876543210</li>
          <li>info@example.com</li>
          <li> 123 Main Street, Anytown USA</li>
        </div>
      </div>
      <div className="text-white">
        <h2 className="text-xl ">Subscribe</h2>
        <div className="pt-2 flex gap-2">
          <input type="text" placeholder="Enter your email address" />
          <button className="bg-white text-black rounded px-2 py-1">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};
