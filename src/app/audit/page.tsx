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
import { ClipboardCheck, AlertTriangle, CheckCircle2, Clock, Plus, Search } from 'lucide-react';

const audits = [
  {
    id: '1',
    auditId: 'AUD-2025-001',
    division: 'State Lands',
    issue: 'Uncollected ground rent',
    riskLevel: 'high',
    status: 'open',
  },
  {
    id: '2',
    auditId: 'AUD-2025-002',
    division: 'Physical Planning',
    issue: 'Incomplete development conditions',
    riskLevel: 'medium',
    status: 'in_progress',
  },
  {
    id: '3',
    auditId: 'AUD-2025-003',
    division: 'Survey',
    issue: 'Missing survey coordinates',
    riskLevel: 'low',
    status: 'resolved',
  },
  {
    id: '4',
    auditId: 'AUD-2025-004',
    division: 'ILG',
    issue: 'Expired ILG registration',
    riskLevel: 'critical',
    status: 'open',
  },
  {
    id: '5',
    auditId: 'AUD-2025-005',
    division: 'Cases',
    issue: 'Missing court documents',
    riskLevel: 'medium',
    status: 'in_progress',
  },
];

export default function AuditPage() {
  const overviewContent = (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Total Audits"
        value="145"
        icon={ClipboardCheck}
        description="Year to date"
        colorClass="text-blue-600"
      />
      <KpiCard
        title="Critical Issues"
        value="8"
        icon={AlertTriangle}
        description="Require immediate action"
        colorClass="text-red-600"
      />
      <KpiCard
        title="Resolved This Month"
        value="15"
        icon={CheckCircle2}
        description="November 2025"
        trend={{ value: 25.0, isPositive: true }}
        colorClass="text-green-600"
      />
      <KpiCard
        title="In Progress"
        value="28"
        icon={Clock}
        description="Under investigation"
        colorClass="text-yellow-600"
      />
    </div>
  );

  const worklistContent = (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Audit Records</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input placeholder="Search audits..." className="pl-9 w-64" />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Audit
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Audit ID</TableHead>
              <TableHead>Division</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {audits.map((audit) => (
              <TableRow key={audit.id} className="cursor-pointer hover:bg-zinc-50">
                <TableCell className="font-mono text-sm">{audit.auditId}</TableCell>
                <TableCell className="font-medium">{audit.division}</TableCell>
                <TableCell>{audit.issue}</TableCell>
                <TableCell>
                  <StatusBadge status={audit.riskLevel} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={audit.status} />
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
          <CardTitle>Risk Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Critical</span>
              <span className="font-semibold text-red-600">8</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: '15%' }} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">High</span>
              <span className="font-semibold text-orange-600">12</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-orange-600 h-2 rounded-full" style={{ width: '22%' }} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Medium</span>
              <span className="font-semibold text-yellow-600">18</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '33%' }} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Low</span>
              <span className="font-semibold text-green-600">16</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '30%' }} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audit Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Open</span>
              <span className="font-semibold">28</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">In Progress</span>
              <span className="font-semibold text-yellow-600">15</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Resolved</span>
              <span className="font-semibold text-green-600">89</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Closed</span>
              <span className="font-semibold text-zinc-500">13</span>
            </div>
            <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
              <p className="text-xs text-blue-700">67% resolution rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <ModulePage
      title="Land Audit & Compliance"
      description="Audit leases, titles, ILG registrations, and customary land agreements"
      overviewContent={overviewContent}
      worklistContent={worklistContent}
      analyticsContent={analyticsContent}
      legacySystemUrl="https://landauditsystem.netlify.app/dashboard"
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Audit
        </Button>
      }
    />
  );
}
