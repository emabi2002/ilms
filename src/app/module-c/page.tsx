'use client';

import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Box, Wrench } from 'lucide-react';

export default function ModuleCPage() {
  return (
    <div>
      <PageHeader
        title="Future Module C"
        description="This module is reserved for future functionality"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Box className="h-5 w-5 text-zinc-400" />
              <CardTitle>Module Placeholder</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-600 mb-4">
              This module slot is reserved for future DLPP requirements. Potential uses include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-zinc-600">
              <li>Revenue collection and reporting</li>
              <li>Inter-agency coordination</li>
              <li>Public portal for land information</li>
              <li>Mobile field inspection tracking</li>
              <li>Document management and archival</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-zinc-400" />
              <CardTitle>Configuration Required</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-600">
              This module can be configured and activated when specific requirements are defined.
              Contact the ILMS administrator to configure this module for your division's needs.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
