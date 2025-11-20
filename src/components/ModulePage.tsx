'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface ModulePageProps {
  title: string;
  description: string;
  overviewContent: React.ReactNode;
  worklistContent: React.ReactNode;
  analyticsContent: React.ReactNode;
  legacySystemUrl?: string;
  actions?: React.ReactNode;
}

export function ModulePage({
  title,
  description,
  overviewContent,
  worklistContent,
  analyticsContent,
  legacySystemUrl,
  actions,
}: ModulePageProps) {
  return (
    <div>
      <PageHeader title={title} description={description} actions={actions} />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="worklist">Worklist</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="legacy">Legacy System</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {overviewContent}
        </TabsContent>

        <TabsContent value="worklist" className="space-y-4">
          {worklistContent}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          {analyticsContent}
        </TabsContent>

        <TabsContent value="legacy" className="space-y-4">
          {legacySystemUrl ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-blue-900">Legacy System Access</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Access the existing {title} application running on Netlify
                  </p>
                </div>
                <Button asChild>
                  <a href={legacySystemUrl} target="_blank" rel="noopener noreferrer">
                    Open Legacy System
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>

              {/* Optional: Embed iframe */}
              <div className="border border-zinc-200 rounded-lg overflow-hidden" style={{ height: '600px' }}>
                <iframe
                  src={legacySystemUrl}
                  className="w-full h-full"
                  title={`${title} Legacy System`}
                />
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-zinc-50 border border-zinc-200 rounded-lg">
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                No Legacy System
              </h3>
              <p className="text-sm text-zinc-600">
                ILMS is the primary system for {title}. All operations are managed directly within this interface.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
