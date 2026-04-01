import Logo from "../../assets/react.svg";

export const Footer = () => {
  return (
    <footer
      className="grid grid-cols-1 md:grid-cols-4 gap-10 px-6 py-10 md:px-16 w-full
      bg-white dark:bg-gray-900
      text-gray-700 dark:text-gray-300
      border-t border-gray-200 dark:border-gray-700
      transition-colors duration-300"
    >
      <div>
        <img src={Logo} alt="logo" className="h-16 w-16" />
        <p className="pt-4 text-sm leading-relaxed">
          This is a test project for learning purpose <br />
          of React and Tailwind CSS in a dashboard project.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Links
        </h2>
        <ul className="flex flex-col gap-2">
          <li className="hover:text-blue-500 cursor-pointer transition">
            Home
          </li>
          <li className="hover:text-blue-500 cursor-pointer transition">
            About
          </li>
          <li className="hover:text-blue-500 cursor-pointer transition">
            Services
          </li>
          <li className="hover:text-blue-500 cursor-pointer transition">
            Blog
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Contact
        </h2>
        <ul className="flex flex-col gap-2 text-sm">
          <li>+91 9876543210</li>
          <li>info@example.com</li>
          <li>123 Main Street, Anytown USA</li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Subscribe
        </h2>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter your email"
            className="flex-1 px-3 py-2 rounded-lg border
              bg-white dark:bg-gray-800
              border-gray-300 dark:border-gray-600
              text-gray-900 dark:text-gray-100
              placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            className="px-4 py-2 rounded-lg
              bg-blue-600 text-white
              hover:bg-blue-700
              transition"
          >
            Subscribe
          </button>
        </div>
      </div>
    </footer>
  );
};
