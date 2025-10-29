// ==================== Profile.jsx ====================
import { LogOut, User as UserIcon, Mail, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Profile Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <UserIcon size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Profile</h3>
              <p className="text-sm text-gray-600">Manage your account information</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-3">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <h4 className="text-xl font-semibold text-gray-900">{user?.name || "Guest User"}</h4>
            <p className="text-sm text-gray-500">{user?.email || "No email provided"}</p>
          </div>

          {/* Profile Details */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <UserIcon size={18} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Full Name</label>
                <p className="text-sm font-medium text-gray-900 mt-1">{user?.name || "-"}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-green-600" />
              </div>
              <div className="flex-1">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email Address</label>
                <p className="text-sm font-medium text-gray-900 mt-1">{user?.email || "-"}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Shield size={18} className="text-purple-600" />
              </div>
              <div className="flex-1">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Role</label>
                <p className="text-sm font-medium text-gray-900 mt-1">{user?.role || "Job Poster"}</p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
