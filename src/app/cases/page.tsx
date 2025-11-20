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
import { Scale, Gavel, FileText, Clock, Plus, Search } from 'lucide-react';

const cases = [
  {
    id: '1',
    caseNo: 'CSE-2025-001',
    court: 'National Court',
    parties: 'John Doe v PNG State',
    stage: 'Discovery',
    nextHearing: '2025-12-05',
    status: 'open',
  },
  {
    id: '2',
    caseNo: 'CSE-2025-002',
    court: 'District Court',
    parties: 'ABC Ltd v XYZ Properties',
    stage: 'Trial',
    nextHearing: '2025-11-28',
    status: 'pending',
  },
  {
    id: '3',
    caseNo: 'CSE-2024-156',
    court: 'Supreme Court',
    parties: 'Highland Clan v Mining Corp',
    stage: 'Judgment',
    nextHearing: null,
    status: 'closed',
  },
  {
    id: '4',
    caseNo: 'CSE-2025-003',
    court: 'National Court',
    parties: 'Island ILG v State',
    stage: 'Pleadings',
    nextHearing: '2025-12-10',
    status: 'open',
  },
  {
    id: '5',
    caseNo: 'CSE-2025-004',
    court: 'Court of Appeal',
    parties: 'Developer Ltd v DLPP',
    stage: 'Appeal',
    nextHearing: '2026-01-15',
    status: 'appeal',
  },
];

export default function CasesPage() {
  const overviewContent = (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Active Cases"
        value="52"
        icon={Scale}
        description="Currently open"
        colorClass="text-blue-600"
      />
      <KpiCard
        title="Pending Hearings"
        value="19"
        icon={Clock}
        description="Next 30 days"
        colorClass="text-yellow-600"
      />
      <KpiCard
        title="Resolved This Year"
        value="67"
        icon={Gavel}
        description="2025"
        trend={{ value: 18.5, isPositive: true }}
        colorClass="text-green-600"
      />
      <KpiCard
        title="Appeals"
        value="7"
        icon={FileText}
        description="Under appeal"
        colorClass="text-purple-600"
      />
    </div>
  );

  const worklistContent = (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Land Cases</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input placeholder="Search cases..." className="pl-9 w-64" />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              File Case
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case No</TableHead>
              <TableHead>Court</TableHead>
              <TableHead>Parties</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Next Hearing</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases.map((caseItem) => (
              <TableRow key={caseItem.id} className="cursor-pointer hover:bg-zinc-50">
                <TableCell className="font-mono text-sm">{caseItem.caseNo}</TableCell>
                <TableCell className="font-medium">{caseItem.court}</TableCell>
                <TableCell>{caseItem.parties}</TableCell>
                <TableCell className="text-sm text-zinc-600">{caseItem.stage}</TableCell>
                <TableCell className="text-sm">
                  {caseItem.nextHearing
                    ? new Date(caseItem.nextHearing).toLocaleDateString()
                    : '-'
                  }
                </TableCell>
                <TableCell>
                  <StatusBadge status={caseItem.status} />
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
          <CardTitle>Case Type Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Civil</span>
              <span className="font-semibold">28</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '54%' }} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Administrative</span>
              <span className="font-semibold">18</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '35%' }} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Criminal</span>
              <span className="font-semibold">6</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: '11%' }} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Case Outcomes (YTD)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Judgment for DLPP</span>
              <span className="font-semibold text-green-600">42</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Judgment against</span>
              <span className="font-semibold text-red-600">15</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Settled</span>
              <span className="font-semibold text-blue-600">10</span>
            </div>
            <div className="mt-3 p-2 bg-green-50 rounded border border-green-200">
              <p className="text-xs text-green-700">74% success rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <ModulePage
      title="Land Cases & Litigation"
      description="Case intake, classification, tracking of court dates, and outcomes"
      overviewContent={overviewContent}
      worklistContent={worklistContent}
      analyticsContent={analyticsContent}
      legacySystemUrl="https://landcasesystem.netlify.app/dashboard"
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          File Case
        </Button>
      }
    />
  );
}
