'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  MapPin,
  Landmark,
  Map,
  ClipboardCheck,
  Scale,
  DollarSign,
  Users,
  TreePine,
  Box,
  Settings,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Physical Planning', href: '/physical-planning', icon: MapPin },
  { name: 'State Lands', href: '/state-lands', icon: Landmark },
  { name: 'Survey & Mapping', href: '/surveys', icon: Map },
  { name: 'Land Audit & Compliance', href: '/audit', icon: ClipboardCheck },
  { name: 'Land Cases & Litigation', href: '/cases', icon: Scale },
  { name: 'Valuation', href: '/valuation', icon: DollarSign },
  { name: 'ILG', href: '/ilg', icon: Users },
  { name: 'Customary Lands', href: '/customary-lands', icon: TreePine },
  { name: 'Future Module A', href: '/module-a', icon: Box },
  { name: 'Future Module B', href: '/module-b', icon: Box },
  { name: 'Future Module C', href: '/module-c', icon: Box },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Administration', href: '/admin', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Don't show sidebar on auth pages
  if (pathname?.startsWith('/auth')) {
    return null;
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-20 z-50 lg:hidden bg-white shadow-md hover:bg-green-50 text-green-700"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 top-16"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 h-[calc(100vh-4rem)] bg-zinc-900 text-zinc-100 transition-all duration-300 z-50 border-r border-zinc-800',
          // Desktop
          'hidden lg:block',
          collapsed ? 'lg:w-16' : 'lg:w-64',
          // Mobile
          mobileOpen && 'block w-64'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Toggle button - desktop only */}
          <div className="hidden lg:flex justify-end p-2 border-b border-zinc-800">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                const Icon = item.icon;

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                          : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                      )}
                      title={collapsed ? item.name : undefined}
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span>{item.name}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          {!collapsed && (
            <div className="p-4 border-t border-zinc-800">
              <p className="text-xs text-zinc-500">
                ILMS v1.0
                <br />
                DLPP © 2025
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
