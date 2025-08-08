import { Link, useParams, useLocation } from "react-router-dom";

const SubNav2 = () => {
  const { id } = useParams();
  const location = useLocation();

  const navItems = [
    { name: 'Lineups', href: `/${id}` },
    { name: 'Statistics', href: `/${id}/statistics` },
    { name: 'Standings', href: `/${id}/standings` },
    { name: 'H2H', href: `/${id}/h2h` },
  ];

  return (
    <div className="flex justify-center font-sans mb-5">
      <nav className="w-full">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <div className="flex items-baseline justify-around space-x-4">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                      isActive ? "dark:text-indigo-300 text-indigo-500" : "dark:text-indigo-300 text-indigo-500 opacity-80 hover:opacity-100"
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-400 rounded-full"></span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default SubNav2;