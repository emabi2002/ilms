'use client';

import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div>
      <PageHeader
        title="Reports Configuration"
        description="Configure and manage system reports"
      />
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-zinc-600" />
            <CardTitle>Report Templates</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-600">
            This page will allow configuration of report templates, scheduled reports,
            and custom report generation for all divisions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
