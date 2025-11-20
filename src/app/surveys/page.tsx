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
import { Map, FileCheck, Clock, Users, Plus, Search } from 'lucide-react';

const surveyPlans = [
  {
    id: '1',
    planNo: 'PLN-2025-9012',
    surveyor: 'David Kila & Associates',
    parcel: 'SEC-200-LOT-300',
    status: 'approved',
    lodgedDate: '2025-11-01',
  },
  {
    id: '2',
    planNo: 'PLN-2025-9013',
    surveyor: 'PNG Survey Solutions',
    parcel: 'SEC-201-LOT-301',
    status: 'under_review',
    lodgedDate: '2025-11-15',
  },
  {
    id: '3',
    planNo: 'PLN-2025-9014',
    surveyor: 'Highlands Survey Group',
    parcel: 'SEC-202-LOT-302',
    status: 'lodged',
    lodgedDate: '2025-11-18',
  },
  {
    id: '4',
    planNo: 'PLN-2025-9015',
    surveyor: 'Coastal Surveys Ltd',
    parcel: 'SEC-203-LOT-303',
    status: 'approved',
    lodgedDate: '2025-11-10',
  },
  {
    id: '5',
    planNo: 'PLN-2025-9016',
    surveyor: 'Island Survey Partners',
    parcel: 'SEC-204-LOT-304',
    status: 'rejected',
    lodgedDate: '2025-11-12',
  },
];

export default function SurveysPage() {
  const overviewContent = (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Total Plans"
        value="845"
        icon={Map}
        description="All time"
        colorClass="text-blue-600"
      />
      <KpiCard
        title="Awaiting Approval"
        value="42"
        icon={Clock}
        description="Under review"
        colorClass="text-yellow-600"
      />
      <KpiCard
        title="Approved This Month"
        value="28"
        icon={FileCheck}
        description="November 2025"
        trend={{ value: 12.5, isPositive: true }}
        colorClass="text-green-600"
      />
      <KpiCard
        title="Licensed Surveyors"
        value="34"
        icon={Users}
        description="Active licenses"
        colorClass="text-purple-600"
      />
    </div>
  );

  const worklistContent = (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Survey Plans</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input placeholder="Search plans..." className="pl-9 w-64" />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Lodge Plan
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plan No</TableHead>
              <TableHead>Surveyor</TableHead>
              <TableHead>Parcel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Lodged Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {surveyPlans.map((plan) => (
              <TableRow key={plan.id} className="cursor-pointer hover:bg-zinc-50">
                <TableCell className="font-mono text-sm">{plan.planNo}</TableCell>
                <TableCell className="font-medium">{plan.surveyor}</TableCell>
                <TableCell>{plan.parcel}</TableCell>
                <TableCell>
                  <StatusBadge status={plan.status} />
                </TableCell>
                <TableCell className="text-sm text-zinc-600">
                  {new Date(plan.lodgedDate).toLocaleDateString()}
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
          <CardTitle>Plan Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Lodged</span>
              <span className="font-semibold">42</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Under Review</span>
              <span className="font-semibold">38</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '23%' }} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Approved</span>
              <span className="font-semibold">82</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '49%' }} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Rejected</span>
              <span className="font-semibold">5</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: '3%' }} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Processing Time (Average)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Lodgement to Review</span>
              <span className="font-semibold">3.5 days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Review to Approval</span>
              <span className="font-semibold">7.2 days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Total Processing</span>
              <span className="font-semibold text-green-600">10.7 days</span>
            </div>
            <div className="mt-3 p-2 bg-green-50 rounded border border-green-200">
              <p className="text-xs text-green-700">↓ 15% faster than last quarter</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <ModulePage
      title="Survey & Mapping"
      description="Manage survey plans, surveyors, coordinates, beacons, and lot/section data"
      overviewContent={overviewContent}
      worklistContent={worklistContent}
      analyticsContent={analyticsContent}
      legacySystemUrl="https://landsurveysystem.netlify.app/dashboard"
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Lodge Plan
        </Button>
      }
    />
  );
}
