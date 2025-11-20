'use client';

import { ModulePage } from '@/components/ModulePage';
import { KpiCard } from '@/components/KpiCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatusBadge } from '@/components/StatusBadge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Users, CheckCircle2, Clock, AlertTriangle, Plus, Search } from 'lucide-react';

const ilgs = [
  {
    id: '1',
    ilgName: 'Hela Huri ILG',
    ilgCode: 'ILG-2025-001',
    province: 'Hela',
    status: 'registered',
    registrationDate: '2025-01-15',
    members: 450,
  },
  {
    id: '2',
    ilgName: 'Eastern Highlands Development ILG',
    ilgCode: 'ILG-2025-002',
    province: 'Eastern Highlands',
    status: 'registered',
    registrationDate: '2025-03-20',
    members: 320,
  },
  {
    id: '3',
    ilgName: 'West Sepik Resource ILG',
    ilgCode: 'ILG-2025-003',
    province: 'West Sepik',
    status: 'pending',
    registrationDate: '2025-11-10',
    members: 280,
  },
  {
    id: '4',
    ilgName: 'Milne Bay Coastal ILG',
    ilgCode: 'ILG-2024-089',
    province: 'Milne Bay',
    status: 'suspended',
    registrationDate: '2024-08-05',
    members: 195,
  },
  {
    id: '5',
    ilgName: 'Southern Highlands Unity ILG',
    ilgCode: 'ILG-2025-004',
    province: 'Southern Highlands',
    status: 'registered',
    registrationDate: '2025-05-12',
    members: 520,
  },
];

export default function ILGPage() {
  const overviewContent = (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Registered ILGs"
        value="63"
        icon={Users}
        description="Active entities"
        colorClass="text-green-600"
      />
      <KpiCard
        title="Pending Registration"
        value="18"
        icon={Clock}
        description="Under review"
        colorClass="text-yellow-600"
      />
      <KpiCard
        title="Total Members"
        value="24,567"
        icon={CheckCircle2}
        description="Across all ILGs"
        colorClass="text-blue-600"
      />
      <KpiCard
        title="Compliance Issues"
        value="6"
        icon={AlertTriangle}
        description="Require attention"
        colorClass="text-red-600"
      />
    </div>
  );

  const worklistContent = (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Incorporated Land Groups</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input placeholder="Search ILGs..." className="pl-9 w-64" />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Register ILG
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ILG Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Province</TableHead>
              <TableHead className="text-right">Members</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ilgs.map((ilg) => (
              <TableRow key={ilg.id} className="cursor-pointer hover:bg-zinc-50">
                <TableCell className="font-medium">{ilg.ilgName}</TableCell>
                <TableCell className="font-mono text-sm">{ilg.ilgCode}</TableCell>
                <TableCell>{ilg.province}</TableCell>
                <TableCell className="text-right">{ilg.members}</TableCell>
                <TableCell className="text-sm text-zinc-600">
                  {new Date(ilg.registrationDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <StatusBadge status={ilg.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const analyticsContent = (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>ILGs by Province</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Southern Highlands</span>
              <span className="font-semibold">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Eastern Highlands</span>
              <span className="font-semibold">9</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Hela</span>
              <span className="font-semibold">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Western Province</span>
              <span className="font-semibold">7</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Other Provinces</span>
              <span className="font-semibold">27</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Membership Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Large (500+ members)</span>
              <span className="font-semibold">8</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '13%' }} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Medium (200-499)</span>
              <span className="font-semibold">25</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '40%' }} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Small (50-199)</span>
              <span className="font-semibold">30</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '47%' }} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <ModulePage
      title="ILG (Incorporated Land Groups)"
      description="ILG registration, membership, leadership, constitutions, and disputes"
      overviewContent={overviewContent}
      worklistContent={worklistContent}
      analyticsContent={analyticsContent}
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Register ILG
        </Button>
      }
    />
  );
}
