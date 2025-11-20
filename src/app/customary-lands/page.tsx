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
import { TreePine, FileText, RefreshCw, AlertCircle, Plus, Search } from 'lucide-react';

const customaryAgreements = [
  {
    id: '1',
    agreementId: 'CUS-2025-001',
    clanName: 'Kewa Clan',
    ilgId: 'ILG-2025-001',
    area: 1250,
    status: 'active',
  },
  {
    id: '2',
    agreementId: 'CUS-2025-002',
    clanName: 'Huli Traditional Group',
    ilgId: 'ILG-2025-002',
    area: 850,
    status: 'active',
  },
  {
    id: '3',
    agreementId: 'CUS-2025-003',
    clanName: 'Sepik River Communities',
    ilgId: null,
    area: 2100,
    status: 'pending',
  },
  {
    id: '4',
    agreementId: 'CUS-2024-156',
    clanName: 'Highland Unity Clans',
    ilgId: 'ILG-2024-089',
    area: 1680,
    status: 'converted',
  },
  {
    id: '5',
    agreementId: 'CUS-2025-004',
    clanName: 'Coastal Traditional Owners',
    ilgId: null,
    area: 920,
    status: 'disputed',
  },
];

export default function CustomaryLandsPage() {
  const overviewContent = (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Active Agreements"
        value="71"
        icon={TreePine}
        description="Customary agreements"
        colorClass="text-green-600"
      />
      <KpiCard
        title="Pending Review"
        value="22"
        icon={FileText}
        description="Under assessment"
        colorClass="text-yellow-600"
      />
      <KpiCard
        title="Converted to Lease"
        value="38"
        icon={RefreshCw}
        description="This year"
        trend={{ value: 22.5, isPositive: true }}
        colorClass="text-blue-600"
      />
      <KpiCard
        title="Disputes"
        value="11"
        icon={AlertCircle}
        description="Under mediation"
        colorClass="text-red-600"
      />
    </div>
  );

  const worklistContent = (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Customary Land Agreements</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input placeholder="Search agreements..." className="pl-9 w-64" />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Agreement
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agreement ID</TableHead>
              <TableHead>Clan/ILG</TableHead>
              <TableHead>Linked ILG</TableHead>
              <TableHead className="text-right">Area (ha)</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customaryAgreements.map((agreement) => (
              <TableRow key={agreement.id} className="cursor-pointer hover:bg-zinc-50">
                <TableCell className="font-mono text-sm">{agreement.agreementId}</TableCell>
                <TableCell className="font-medium">{agreement.clanName}</TableCell>
                <TableCell className="text-sm text-zinc-600">
                  {agreement.ilgId || '-'}
                </TableCell>
                <TableCell className="text-right">{agreement.area.toLocaleString()}</TableCell>
                <TableCell>
                  <StatusBadge status={agreement.status} />
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
          <CardTitle>Agreement Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Active</span>
              <span className="font-semibold">71</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '50%' }} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Converted</span>
              <span className="font-semibold">38</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '27%' }} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Pending</span>
              <span className="font-semibold">22</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '15%' }} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Disputed</span>
              <span className="font-semibold">11</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: '8%' }} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Land Area</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Under Agreement</span>
              <span className="font-semibold">89,500 ha</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Converted to Lease</span>
              <span className="font-semibold text-blue-600">32,100 ha</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Pending Conversion</span>
              <span className="font-semibold text-yellow-600">18,200 ha</span>
            </div>
            <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
              <p className="text-xs text-blue-700">36% conversion rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <ModulePage
      title="Customary Lands"
      description="Record customary land groups, boundaries, agreements, and conversions to state lease"
      overviewContent={overviewContent}
      worklistContent={worklistContent}
      analyticsContent={analyticsContent}
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Agreement
        </Button>
      }
    />
  );
}
