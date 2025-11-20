'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { KpiCard } from '@/components/KpiCard';
import { getDashboardKPIs, getDivisionSummary, getRecentActivities } from '@/lib/api';
import {
  Scale,
  Landmark,
  MapPin,
  ClipboardCheck,
  Map,
  DollarSign,
  Users,
  TreePine,
} from 'lucide-react';
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
import { Loader2 } from 'lucide-react';

interface DashboardKPIs {
  openCases: number;
  activeLeases: number;
  pendingApplications: number;
  surveyPlansAwaiting: number;
  auditFlags: number;
  valuationsCompleted: number;
  registeredILGs: number;
  customaryAgreements: number;
}

interface DivisionSummary {
  division: string;
  open: number;
  pending: number;
  approved: number;
}

interface Activity {
  id: string;
  date: string;
  division: string;
  action: string;
  reference: string;
  user: string;
}

export default function DashboardPage() {
  const [kpis, setKpis] = useState<DashboardKPIs | null>(null);
  const [divisionData, setDivisionData] = useState<DivisionSummary[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true);
      try {
        const [kpisData, divisionsData, activitiesData] = await Promise.all([
          getDashboardKPIs(),
          getDivisionSummary(),
          getRecentActivities(10),
        ]);

        setKpis(kpisData);
        setDivisionData(divisionsData);
        setActivities(activitiesData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-sm text-zinc-600">Loading dashboard data...</p>
          <p className="text-xs text-zinc-500 mt-2">
            If this is your first time, visit{' '}
            <a href="/setup" className="text-green-600 hover:underline">
              /setup
            </a>{' '}
            to initialize the database
          </p>
        </div>
      </div>
    );
  }

  // Fallback mock data for recent activities if database is empty
  const displayActivities = activities.length > 0 ? activities : [
  {
    id: '1',
    date: '2025-11-20',
    division: 'State Lands',
    action: 'Lease Approved',
    reference: 'LSE-2025-1234',
    user: 'Sarah Johnson',
  },
  {
    id: '2',
    date: '2025-11-20',
    division: 'Physical Planning',
    action: 'Application Received',
    reference: 'APP-2025-5678',
    user: 'Michael Chen',
  },
  {
    id: '3',
    date: '2025-11-19',
    division: 'Survey',
    action: 'Plan Approved',
    reference: 'PLN-2025-9012',
    user: 'David Kila',
  },
  {
    id: '4',
    date: '2025-11-19',
    division: 'Cases',
    action: 'Case Filed',
    reference: 'CSE-2025-3456',
    user: 'Jennifer Wang',
  },
  {
    id: '5',
    date: '2025-11-19',
    division: 'Audit',
    action: 'Audit Completed',
    reference: 'AUD-2025-7890',
    user: 'Robert Pala',
  },
  {
    id: '6',
    date: '2025-11-18',
    division: 'Valuation',
    action: 'Valuation Submitted',
    reference: 'VAL-2025-2345',
    user: 'Lisa Tore',
  },
  {
    id: '7',
    date: '2025-11-18',
    division: 'ILG',
    action: 'ILG Registered',
    reference: 'ILG-2025-6789',
    user: 'James Morea',
  },
  {
    id: '8',
    date: '2025-11-18',
    division: 'Customary Lands',
    action: 'Agreement Signed',
    reference: 'CUS-2025-1122',
    user: 'Maria Kaupa',
  },
];

  // Fallback mock division data if database is empty
  const displayDivisionData = divisionData.length > 0 ? divisionData : [
    { division: 'Physical Planning', open: 0, pending: 0, approved: 0 },
    { division: 'State Lands', open: 0, pending: 0, approved: 0 },
    { division: 'Survey', open: 0, pending: 0, approved: 0 },
    { division: 'Audit', open: 0, pending: 0, approved: 0 },
    { division: 'Cases', open: 0, pending: 0, approved: 0 },
    { division: 'Valuation', open: 0, pending: 0, approved: 0 },
    { division: 'ILG', open: 0, pending: 0, approved: 0 },
    { division: 'Customary Lands', open: 0, pending: 0, approved: 0 },
  ];

  return (
    <div>
      <PageHeader
        title="Executive Dashboard"
        description="Overview of all land management operations across DLPP"
      />

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <KpiCard
          title="Open Cases"
          value={kpis?.openCases.toLocaleString() || '0'}
          icon={Scale}
          description="Across all divisions"
          colorClass="text-red-600"
        />
        <KpiCard
          title="Active Leases"
          value={kpis?.activeLeases.toLocaleString() || '0'}
          icon={Landmark}
          description="State land leases"
          colorClass="text-green-600"
        />
        <KpiCard
          title="Pending Applications"
          value={kpis?.pendingApplications.toLocaleString() || '0'}
          icon={MapPin}
          description="Planning applications"
          colorClass="text-yellow-600"
        />
        <KpiCard
          title="Survey Plans Awaiting"
          value={kpis?.surveyPlansAwaiting.toLocaleString() || '0'}
          icon={Map}
          description="Approval required"
          colorClass="text-blue-600"
        />
      </div>

      {/* Second row of KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <KpiCard
          title="Audit Flags"
          value={kpis?.auditFlags.toLocaleString() || '0'}
          icon={ClipboardCheck}
          description="Compliance issues"
          colorClass="text-orange-600"
        />
        <KpiCard
          title="Valuations Completed"
          value={kpis?.valuationsCompleted.toLocaleString() || '0'}
          icon={DollarSign}
          description="All time"
          colorClass="text-green-600"
        />
        <KpiCard
          title="Registered ILGs"
          value={kpis?.registeredILGs.toLocaleString() || '0'}
          icon={Users}
          description="Active ILG entities"
          colorClass="text-purple-600"
        />
        <KpiCard
          title="Customary Agreements"
          value={kpis?.customaryAgreements.toLocaleString() || '0'}
          icon={TreePine}
          description="Active agreements"
          colorClass="text-teal-600"
        />
      </div>

      {/* Division Summary Table */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Open Cases by Division</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Division</TableHead>
                <TableHead className="text-right">Open</TableHead>
                <TableHead className="text-right">Pending</TableHead>
                <TableHead className="text-right">Approved (YTD)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayDivisionData.map((item) => (
                <TableRow key={item.division}>
                  <TableCell className="font-medium">{item.division}</TableCell>
                  <TableCell className="text-right">{item.open}</TableCell>
                  <TableCell className="text-right">{item.pending}</TableCell>
                  <TableCell className="text-right">{item.approved}</TableCell>
                  <TableCell>
                    <StatusBadge
                      status={item.pending > 15 ? 'high' : item.pending > 10 ? 'medium' : 'low'}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Division</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>User</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="text-sm text-zinc-600">
                    {new Date(activity.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">{activity.division}</TableCell>
                  <TableCell>{activity.action}</TableCell>
                  <TableCell className="font-mono text-sm">{activity.reference}</TableCell>
                  <TableCell className="text-sm text-zinc-600">{activity.user}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
