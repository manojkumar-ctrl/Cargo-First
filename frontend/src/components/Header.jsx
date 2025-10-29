import { User } from 'lucide-react';

export default function Header() {
  // Get user from localStorage or use default
  const user = JSON.parse(localStorage.getItem('user') || '{"name":"Guest User","email":"guest@example.com"}');

  return (
    <header className="w-full bg-white border-b border-gray-200 px-4 lg:px-6 py-3 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Page Title - Hidden on mobile */}
        <div className="hidden lg:block">
          <h2 className="text-lg font-semibold text-gray-900">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">{user?.email || ''}</p>
        </div>

        {/* Mobile: Just show date */}
        <div className="lg:hidden text-sm text-gray-600">
          {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <div className="text-sm font-medium text-gray-900">{user?.name || 'Guest'}</div>
            <div className="text-xs text-gray-500">{user?.email || ''}</div>
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold text-sm shadow-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>
      </div>
    </header>
  );
}