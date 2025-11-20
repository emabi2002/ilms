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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, FileText, Users, Plus, Search } from 'lucide-react';

const valuations = [
  {
    id: '1',
    valuationNo: 'VAL-2025-001',
    parcel: 'SEC-300-LOT-400',
    value: 850000,
    valuer: 'PNG Valuations Ltd',
    effectiveDate: '2025-11-15',
    type: 'market',
  },
  {
    id: '2',
    valuationNo: 'VAL-2025-002',
    parcel: 'SEC-301-LOT-401',
    value: 1200000,
    valuer: 'Highlands Valuers',
    effectiveDate: '2025-11-18',
    type: 'market',
  },
  {
    id: '3',
    valuationNo: 'VAL-2025-003',
    parcel: 'SEC-302-LOT-402',
    value: 45000,
    valuer: 'Coastal Valuations',
    effectiveDate: '2025-11-10',
    type: 'rental',
  },
  {
    id: '4',
    valuationNo: 'VAL-2025-004',
    parcel: 'SEC-303-LOT-403',
    value: 2500000,
    valuer: 'Island Property Valuers',
    effectiveDate: '2025-11-12',
    type: 'improvement',
  },
];

export default function ValuationPage() {
  const overviewContent = (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Total Valuations"
        value="456"
        icon={FileText}
        description="Year to date"
        colorClass="text-blue-600"
      />
      <KpiCard
        title="This Month"
        value="31"
        icon={DollarSign}
        description="November 2025"
        trend={{ value: 12.3, isPositive: true }}
        colorClass="text-green-600"
      />
      <KpiCard
        title="Total Value (YTD)"
        value="K 456M"
        icon={TrendingUp}
        description="Aggregate valuation"
        colorClass="text-purple-600"
      />
      <KpiCard
        title="Licensed Valuers"
        value="18"
        icon={Users}
        description="Active licenses"
        colorClass="text-teal-600"
      />
    </div>
  );

  const worklistContent = (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Valuations</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input placeholder="Search valuations..." className="pl-9 w-64" />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Valuation
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Valuation No</TableHead>
              <TableHead>Parcel</TableHead>
              <TableHead className="text-right">Value (K)</TableHead>
              <TableHead>Valuer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Effective Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {valuations.map((val) => (
              <TableRow key={val.id} className="cursor-pointer hover:bg-zinc-50">
                <TableCell className="font-mono text-sm">{val.valuationNo}</TableCell>
                <TableCell className="font-medium">{val.parcel}</TableCell>
                <TableCell className="text-right font-semibold">
                  {val.value.toLocaleString()}
                </TableCell>
                <TableCell>{val.valuer}</TableCell>
                <TableCell className="capitalize">{val.type}</TableCell>
                <TableCell className="text-sm text-zinc-600">
                  {new Date(val.effectiveDate).toLocaleDateString()}
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
          <CardTitle>Valuation Type Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Market Valuation</span>
              <span className="font-semibold">285</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '62%' }} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Rental Valuation</span>
              <span className="font-semibold">112</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Improvement Valuation</span>
              <span className="font-semibold">59</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '13%' }} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Average Values</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Residential</span>
              <span className="font-semibold">K 650,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Commercial</span>
              <span className="font-semibold">K 1,250,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Industrial</span>
              <span className="font-semibold">K 2,100,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Agricultural</span>
              <span className="font-semibold">K 120,000</span>
            </div>
            <div className="mt-3 p-2 bg-green-50 rounded border border-green-200">
              <p className="text-xs text-green-700">↑ 8.5% increase from last year</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <ModulePage
      title="Valuation"
      description="Record valuations for parcels and buildings, maintain valuation rolls and rates"
      overviewContent={overviewContent}
      worklistContent={worklistContent}
      analyticsContent={analyticsContent}
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Valuation
        </Button>
      }
    />
  );
}
