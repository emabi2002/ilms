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
import { FileText, MapPin, Clock, CheckCircle, Plus, Search } from 'lucide-react';

// Mock data
const applications = [
  {
    id: '1',
    appNo: 'APP-2025-001',
    parcel: 'SEC-123-LOT-456',
    applicant: 'ABC Development Ltd',
    status: 'under_assessment',
    officer: 'Sarah Johnson',
    lastUpdated: '2025-11-20',
  },
  {
    id: '2',
    appNo: 'APP-2025-002',
    parcel: 'SEC-124-LOT-789',
    applicant: 'PNG Construction Co',
    status: 'approved',
    officer: 'Michael Chen',
    lastUpdated: '2025-11-19',
  },
  {
    id: '3',
    appNo: 'APP-2025-003',
    parcel: 'SEC-125-LOT-012',
    applicant: 'Green Valley Estates',
    status: 'received',
    officer: 'David Kila',
    lastUpdated: '2025-11-19',
  },
  {
    id: '4',
    appNo: 'APP-2025-004',
    parcel: 'SEC-126-LOT-345',
    applicant: 'Port Moresby Homes',
    status: 'pending_signature',
    officer: 'Jennifer Wang',
    lastUpdated: '2025-11-18',
  },
  {
    id: '5',
    appNo: 'APP-2025-005',
    parcel: 'SEC-127-LOT-678',
    applicant: 'Highlands Development',
    status: 'rejected',
    officer: 'Sarah Johnson',
    lastUpdated: '2025-11-17',
  },
];

export default function PhysicalPlanningPage() {
  const overviewContent = (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Total Applications"
        value="157"
        icon={FileText}
        description="All time"
        colorClass="text-blue-600"
      />
      <KpiCard
        title="Under Assessment"
        value="45"
        icon={Clock}
        description="Awaiting review"
        colorClass="text-yellow-600"
      />
      <KpiCard
        title="Approved This Month"
        value="23"
        icon={CheckCircle}
        description="November 2025"
        trend={{ value: 15.3, isPositive: true }}
        colorClass="text-green-600"
      />
      <KpiCard
        title="Zones Managed"
        value="12"
        icon={MapPin}
        description="Planning zones"
        colorClass="text-purple-600"
      />
    </div>
  );

  const worklistContent = (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Development Applications</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input placeholder="Search applications..." className="pl-9 w-64" />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Application
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application No</TableHead>
              <TableHead>Parcel</TableHead>
              <TableHead>Applicant</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Officer</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id} className="cursor-pointer hover:bg-zinc-50">
                <TableCell className="font-mono text-sm">{app.appNo}</TableCell>
                <TableCell className="font-medium">{app.parcel}</TableCell>
                <TableCell>{app.applicant}</TableCell>
                <TableCell>
                  <StatusBadge status={app.status} />
                </TableCell>
                <TableCell className="text-sm text-zinc-600">{app.officer}</TableCell>
                <TableCell className="text-sm text-zinc-600">
                  {new Date(app.lastUpdated).toLocaleDateString()}
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
          <CardTitle>Application Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Received</span>
              <span className="font-semibold">35</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '22%' }} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Under Assessment</span>
              <span className="font-semibold">45</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '29%' }} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Approved</span>
              <span className="font-semibold">65</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '41%' }} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Rejected</span>
              <span className="font-semibold">12</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: '8%' }} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Approvals Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">September</span>
              <span className="font-semibold">18 approved</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">October</span>
              <span className="font-semibold">20 approved</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">November</span>
              <span className="font-semibold text-green-600">23 approved ↑</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <ModulePage
      title="Physical Planning"
      description="Manage development applications, zoning, approvals, and conditions"
      overviewContent={overviewContent}
      worklistContent={worklistContent}
      analyticsContent={analyticsContent}
      legacySystemUrl="https://physicalplanning.netlify.app/dashboard"
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Application
        </Button>
      }
    />
  );
}
