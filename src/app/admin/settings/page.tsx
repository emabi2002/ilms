'use client';

import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        title="System Configuration"
        description="General system settings and preferences"
      />
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-zinc-600" />
            <CardTitle>Configuration Settings</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-600">
            This page will contain system-wide configuration options including email settings,
            notification preferences, default values, and system parameters.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
