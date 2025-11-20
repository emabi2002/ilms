'use client';

import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div>
      <PageHeader
        title="Security & Audit Logs"
        description="View system access logs and security events"
      />
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-zinc-600" />
            <CardTitle>Audit Logs</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-600">
            This page will display system access logs, user activity tracking, failed login attempts,
            and other security-related events.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
