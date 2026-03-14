const ContactForm = () => {
  return (
    <div className="flex flex-col gap-4 w-full p-8 border-2 border-gray-300 rounded shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        We'd Love to Hear From You
      </h2>
      <form className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-2">
          <label className="text-lg text-gray-800">Full name*</label>
          <input
            type="text"
            placeholder="Enter your name"
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg text-gray-800">Email address*</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="w-full border p-2 rounded"
          />{" "}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg text-gray-800">Message*</label>
          <textarea
            placeholder="Enter your message"
            required
            className="w-full border py-4 px-2 rounded"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded self-start mt-2"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
