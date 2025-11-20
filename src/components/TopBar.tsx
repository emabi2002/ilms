'use client';

import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User, Settings } from 'lucide-react';

const moduleNames: Record<string, string> = {
  '/dashboard': 'Executive Dashboard',
  '/physical-planning': 'Physical Planning',
  '/state-lands': 'State Lands',
  '/surveys': 'Survey & Mapping',
  '/audit': 'Land Audit & Compliance',
  '/cases': 'Land Cases & Litigation',
  '/valuation': 'Valuation',
  '/ilg': 'ILG (Incorporated Land Groups)',
  '/customary-lands': 'Customary Lands',
  '/module-a': 'Future Module A',
  '/module-b': 'Future Module B',
  '/module-c': 'Future Module C',
  '/calendar': 'Events Calendar',
  '/admin': 'Administration',
};

export function TopBar() {
  const pathname = usePathname();
  const currentModule = moduleNames[pathname] || 'ILMS';

  // Don't show topbar on auth pages
  if (pathname?.startsWith('/auth')) {
    return null;
  }

  // Mock user data - replace with actual auth
  const user = {
    name: 'John Doe',
    email: 'john.doe@dlpp.gov.pg',
    role: 'Director - Survey',
    initials: 'JD',
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 border-b border-green-700 z-50 shadow-lg">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left: Logo and Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {/* DLPP Logo */}
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1.5">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <g stroke="#9333ea" strokeWidth="3" fill="none">
                  {/* Triangle */}
                  <path d="M 50 10 L 90 80 L 10 80 Z" />
                  {/* Inner design */}
                  <path d="M 35 30 L 35 60" />
                  <path d="M 65 30 L 65 60" />
                  <path d="M 35 60 Q 50 70 65 60" />
                  <path d="M 50 60 L 50 90" />
                  <path d="M 45 85 L 50 90 L 55 85" />
                </g>
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-semibold text-white drop-shadow-md">
                Integrated Lands Management System
              </h1>
              <p className="text-xs text-green-50">
                Department of Lands & Physical Planning
              </p>
            </div>
          </div>
        </div>

        {/* Center: Current Module */}
        <div className="hidden md:block">
          <div className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
            <p className="text-sm font-medium text-white drop-shadow">{currentModule}</p>
          </div>
        </div>

        {/* Right: User Menu */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-white drop-shadow">{user.name}</p>
            <p className="text-xs text-green-50">{user.role}</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="focus:outline-none">
                <Avatar className="h-10 w-10 cursor-pointer ring-2 ring-white/50 hover:ring-white transition">
                  <AvatarFallback className="bg-white text-green-700 font-semibold">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-zinc-500 font-normal">{user.email}</p>
                  <p className="text-xs text-blue-600 font-normal mt-1">{user.role}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
