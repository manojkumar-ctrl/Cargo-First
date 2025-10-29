import { useState } from 'react';
import { Menu, X, LogOut, Briefcase, User, BarChart3 } from 'lucide-react';

export default function Sidebar({ current, onSelect, onLogout }) {
  const [open, setOpen] = useState(false);

  const items = [
    { key: "job-posted", label: "Job Posted", icon: <Briefcase size={20} /> },
    { key: "profile", label: "Profile", icon: <User size={20} /> },
    { key: "analysis", label: "Customer Analysis", icon: <BarChart3 size={20} /> },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex justify-between items-center px-4 py-3 bg-white border-b fixed w-full top-0 z-40">
        <div className="text-xl font-semibold text-gray-900">
          Job<span className="text-blue-600">Portal</span>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} className="text-gray-700" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-50 flex flex-col transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} className="text-gray-700" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {items.map((item) => (
            <button
              key={item.key}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                current === item.key
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => {
                onSelect(item.key);
                setOpen(false);
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}
