import HeroBanner from "../../components/sections/HeroBanner";
import sitemapIcon from "../../assets/icons/sitemap.svg";
import progressBarIcon from "../../assets/icons/progress-bar.svg";
import dashboardUserIcon from "../../assets/icons/dashboard-user.svg";
import Card from "../../components/ui/Card";
import ContactForm from "../../components/sections/ContactForm";
import Map from "../../components/sections/Map";

const services = [
  {
    title: "Centralized Management",
    content: "Manage users, data, and operations from a single dashboard.",
    icon: progressBarIcon,
  },
  {
    title: "Scalable Architecture",
    content: "Designed to grow with your business and support new features.",
    icon: sitemapIcon,
  },
  {
    title: "Clear Insights",
    content: "Monitor activity and key metrics to make informed decisions.",
    icon: dashboardUserIcon,
  },
];

const intro = () => {
  return (
    <div className="flex flex-col gap-20 ">
      <HeroBanner />
      <div className="bg-slate-800 p-16 w-full">
        <div className="flex justify-center items-center ">
          <h1 className="text-3xl font-bold text-white">
            Manage your business from one place
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16  py-16">
          {services.map((service, index) => (
            <Card
              key={index}
              title={service.title}
              content={service.content}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-16 ">
        <ContactForm />
        <Map />
      </div>
    </div>
  );
};

export default intro;
