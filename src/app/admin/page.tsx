'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Database, Settings, Shield, FileText, ChevronRight } from 'lucide-react';

const adminModules = [
  {
    title: 'User & Role Management',
    description: 'Manage users, roles, permissions, and access control',
    icon: Users,
    href: '/admin/users',
    color: 'text-blue-600',
  },
  {
    title: 'Reference Data Setup',
    description: 'Configure provinces, districts, LLGs, and classification types',
    icon: Database,
    href: '/admin/reference-data',
    color: 'text-green-600',
  },
  {
    title: 'System Configuration',
    description: 'General system settings and preferences',
    icon: Settings,
    href: '/admin/settings',
    color: 'text-purple-600',
  },
  {
    title: 'Security & Audit Logs',
    description: 'View system access logs and security events',
    icon: Shield,
    href: '/admin/security',
    color: 'text-red-600',
  },
  {
    title: 'Reports Configuration',
    description: 'Configure and manage system reports',
    icon: FileText,
    href: '/admin/reports',
    color: 'text-orange-600',
  },
];

export default function AdminPage() {
  return (
    <div>
      <PageHeader
        title="Administration"
        description="System administration and configuration"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {adminModules.map((module) => {
          const Icon = module.icon;
          return (
            <Link key={module.href} href={module.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-zinc-100 ${module.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{module.title}</CardTitle>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-zinc-400" />
                  </div>
                  <CardDescription className="mt-2">
                    {module.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4 mt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-zinc-900">47</div>
            <p className="text-xs text-zinc-500 mt-1">Active Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-zinc-900">12</div>
            <p className="text-xs text-zinc-500 mt-1">User Roles</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-zinc-900">22</div>
            <p className="text-xs text-zinc-500 mt-1">Provinces</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-zinc-900">8</div>
            <p className="text-xs text-zinc-500 mt-1">Divisions</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
