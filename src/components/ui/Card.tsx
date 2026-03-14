interface CardProps {
  title: string;
  content: string;
  icon: string;
}

const Card = ({ title, content, icon }: CardProps) => {
  return (
    <div className="border-2 rounded border-gray-300 p-5 bg-white  w-full">
      <div className="flex flex-col items-center justify-center">
        <img src={icon} alt="card" className="w-16 h-16 mb-4 " />
        <h2 className=" text-xl font-medium text-gray-900">{title}</h2>
        <p className="text-center text-gray-700">{content}</p>
      </div>
    </div>
  );
};

export default Card;
