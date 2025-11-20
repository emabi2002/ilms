'use client';

import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, Shield } from 'lucide-react';

const users = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@dlpp.gov.pg',
    role: 'director_physical_planning',
    division: 'Physical Planning',
    status: 'active',
    lastLogin: '2025-11-20',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@dlpp.gov.pg',
    role: 'officer_pp',
    division: 'Physical Planning',
    status: 'active',
    lastLogin: '2025-11-20',
  },
  {
    id: '3',
    name: 'David Kila',
    email: 'david.kila@dlpp.gov.pg',
    role: 'director_survey',
    division: 'Survey & Mapping',
    status: 'active',
    lastLogin: '2025-11-19',
  },
  {
    id: '4',
    name: 'Jennifer Wang',
    email: 'jennifer.wang@dlpp.gov.pg',
    role: 'officer_cases',
    division: 'Cases & Litigation',
    status: 'active',
    lastLogin: '2025-11-19',
  },
  {
    id: '5',
    name: 'Robert Pala',
    email: 'robert.pala@dlpp.gov.pg',
    role: 'director_audit',
    division: 'Audit & Compliance',
    status: 'active',
    lastLogin: '2025-11-18',
  },
  {
    id: '6',
    name: 'Lisa Tore',
    email: 'lisa.tore@dlpp.gov.pg',
    role: 'officer_valuation',
    division: 'Valuation',
    status: 'inactive',
    lastLogin: '2025-10-15',
  },
];

const roles = [
  { name: 'Secretary', count: 1 },
  { name: 'Deputy Secretary', count: 2 },
  { name: 'Director (Division)', count: 8 },
  { name: 'Officer (Division)', count: 28 },
  { name: 'Provincial Officer', count: 8 },
];

export default function UsersPage() {
  return (
    <div>
      <PageHeader
        title="User & Role Management"
        description="Manage system users, roles, and permissions"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>System Users</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input placeholder="Search users..." className="pl-9 w-64" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Division</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-sm text-zinc-600">{user.email}</TableCell>
                    <TableCell className="text-sm">{user.division}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.status === 'active'
                            ? 'bg-green-100 text-green-800 border-green-200'
                            : 'bg-zinc-100 text-zinc-800 border-zinc-200'
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-zinc-600">
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-zinc-600" />
                <CardTitle>Roles Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {roles.map((role, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-zinc-600">{role.name}</span>
                    <Badge variant="secondary">{role.count}</Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Manage Roles
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Create New Role
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="mr-2 h-4 w-4" />
                Configure Permissions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
