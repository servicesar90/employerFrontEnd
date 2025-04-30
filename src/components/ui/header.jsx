import { Menu, HelpCircle, Database } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between px-6 py-3 bg-white shadow-sm">
      {/* Left: Logo and Menu */}
      <div className="flex items-center gap-4">
        <Menu className="w-6 h-6 text-gray-700 cursor-pointer" />
        <h1 className="text-2xl font-semibold text-gray-800">
          apna<span className="text-green-500">Hire</span>
        </h1>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm text-gray-700 font-medium cursor-pointer">
          <Database className="w-5 h-5 text-gray-600" />
          <span>Available Credits</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700 font-medium cursor-pointer">
          <HelpCircle className="w-5 h-5 text-gray-600" />
          <span>Support</span>
        </div>
        {/* Avatar circle */}
        <div className="w-8 h-8 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold text-sm cursor-pointer">
          R
        </div>
      </div>
    </header>
  );
};

export default Header;
