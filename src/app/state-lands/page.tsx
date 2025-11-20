'use client';

import { useEffect, useState } from 'react';
import { ModulePage } from '@/components/ModulePage';
import { DataTable, Column } from '@/components/DataTable';
import { fetchTableData } from '@/lib/api';
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
import { Landmark, FileText, AlertTriangle, CheckCircle, Plus } from 'lucide-react';

interface Lease {
  id: string;
  lease_number: string;
  parcel_id: string | null;
  lessee_name: string;
  expiry_date: string;
  arrears: number;
  status: string;
}

export default function StateLandsPage() {
  const [leases, setLeases] = useState<Lease[]>([]);
  const [loading, setLoading] = useState(false);

  const loadLeases = async () => {
    setLoading(true);
    try {
      const data = await fetchTableData('leases', {
        orderBy: 'created_at',
        ascending: false,
      });
      setLeases(data);
    } catch (error) {
      console.error('Error loading leases:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeases();
  }, []);

  // Define table columns
  const columns: Column<Lease>[] = [
    {
      key: 'lease_number',
      title: 'Lease No',
      sortable: true,
      searchable: true,
      render: (lease) => (
        <span className="font-mono text-sm">{lease.lease_number}</span>
      ),
    },
    {
      key: 'lessee_name',
      title: 'Lessee',
      sortable: true,
      searchable: true,
    },
    {
      key: 'expiry_date',
      title: 'Expiry',
      sortable: true,
      render: (lease) => new Date(lease.expiry_date).toLocaleDateString(),
    },
    {
      key: 'arrears',
      title: 'Arrears (K)',
      sortable: true,
      render: (lease) => (
        <span className={`font-medium ${lease.arrears > 0 ? 'text-red-600' : 'text-green-600'}`}>
          {lease.arrears?.toLocaleString() || '0'}
        </span>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (lease) => <StatusBadge status={lease.status} />,
    },
  ];

  // Filter options for status
  const statusFilters = [
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'expired', label: 'Expired' },
    { value: 'terminated', label: 'Terminated' },
  ];

  // Mock leases for fallback
  const mockLeases: Lease[] = [
    {
      id: '1',
      lease_number: 'LSE-2025-1234',
      parcel_id: 'parcel-1',
      lessee_name: 'Pacific Trading Co',
      expiry_date: '2030-12-31',
      arrears: 5000,
      status: 'active',
    },
    {
      id: '2',
      lease_number: 'LSE-2025-1235',
      parcel_id: 'parcel-2',
      lessee_name: 'Moresby Properties Ltd',
      expiry_date: '2026-06-30',
      arrears: 0,
      status: 'active',
    },
    {
      id: '3',
      lease_number: 'LSE-2024-9876',
      parcel_id: 'parcel-3',
      lessee_name: 'Highlands Mining Corp',
      expiry_date: '2024-12-31',
      arrears: 15000,
      status: 'expired',
    },
  ];

  const overviewContent = (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Active Leases"
        value="1,234"
        icon={Landmark}
        description="Currently active"
        trend={{ value: 3.2, isPositive: true }}
        colorClass="text-green-600"
      />
      <KpiCard
        title="Pending Renewals"
        value="67"
        icon={FileText}
        description="Expiring soon"
        colorClass="text-yellow-600"
      />
      <KpiCard
        title="Rent Arrears"
        value="K 450K"
        icon={AlertTriangle}
        description="Outstanding payments"
        colorClass="text-red-600"
      />
      <KpiCard
        title="Renewed This Month"
        value="23"
        icon={CheckCircle}
        description="November 2025"
        colorClass="text-blue-600"
      />
    </div>
  );

  const worklistContent = (
    <DataTable
      data={leases.length > 0 ? leases : mockLeases}
      columns={columns}
      searchPlaceholder="Search by lease number or lessee..."
      filters={[
        {
          field: 'status',
          label: 'Status',
          options: statusFilters,
        },
      ]}
      onRefresh={loadLeases}
      loading={loading}
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Lease
        </Button>
      }
    />
  );

  const analyticsContent = (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Lease Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Active</span>
              <span className="font-semibold">1,234</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Pending</span>
              <span className="font-semibold">67</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '10%' }} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Expired</span>
              <span className="font-semibold">45</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: '5%' }} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Collection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Expected (Annual)</span>
              <span className="font-semibold">K 12.5M</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Collected (YTD)</span>
              <span className="font-semibold text-green-600">K 9.2M</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Outstanding</span>
              <span className="font-semibold text-red-600">K 3.3M</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2 mt-3">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '74%' }} />
            </div>
            <p className="text-xs text-zinc-500 text-center">74% collection rate</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <ModulePage
      title="State Lands"
      description="Manage state land applications, leases, renewals, rentals, and ground rent arrears"
      overviewContent={overviewContent}
      worklistContent={worklistContent}
      analyticsContent={analyticsContent}
      legacySystemUrl="https://statelandsystem.netlify.app/"
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Lease
        </Button>
      }
    />
  );
}
