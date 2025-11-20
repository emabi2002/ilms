'use client';

import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

const provinces = [
  'Central', 'Chimbu', 'Eastern Highlands', 'East New Britain', 'East Sepik',
  'Enga', 'Gulf', 'Hela', 'Jiwaka', 'Madang', 'Manus', 'Milne Bay',
  'Morobe', 'New Ireland', 'Northern', 'NCD', 'Southern Highlands',
  'Western', 'Western Highlands', 'West New Britain', 'West Sepik', 'Bougainville'
];

const landClassifications = [
  'State Lease', 'Customary Land', 'Freehold', 'Alienated Land',
  'ILG Land', 'Protected Area', 'Government Reserve'
];

const caseCategories = [
  'Land Dispute', 'Lease Default', 'Boundary Dispute', 'Title Challenge',
  'Planning Violation', 'Unlawful Occupation', 'Compensation Claim'
];

const zoningTypes = [
  'Residential', 'Commercial', 'Industrial', 'Mixed Use',
  'Agricultural', 'Conservation', 'Public Use', 'Special Purpose'
];

export default function ReferenceDataPage() {
  return (
    <div>
      <PageHeader
        title="Reference Data Setup"
        description="Configure system lookup tables and classification types"
      />

      <Tabs defaultValue="provinces" className="space-y-4">
        <TabsList>
          <TabsTrigger value="provinces">Provinces & Districts</TabsTrigger>
          <TabsTrigger value="classifications">Land Classifications</TabsTrigger>
          <TabsTrigger value="cases">Case Categories</TabsTrigger>
          <TabsTrigger value="zoning">Zoning Types</TabsTrigger>
        </TabsList>

        <TabsContent value="provinces">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Provinces</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <Input placeholder="Search provinces..." className="pl-9 w-64" />
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Province
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Province Name</TableHead>
                    <TableHead>Districts</TableHead>
                    <TableHead>LLGs</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {provinces.slice(0, 10).map((province, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{province}</TableCell>
                      <TableCell className="text-sm text-zinc-600">
                        {Math.floor(Math.random() * 8) + 2}
                      </TableCell>
                      <TableCell className="text-sm text-zinc-600">
                        {Math.floor(Math.random() * 30) + 10}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classifications">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Land Classification Types</CardTitle>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Classification
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Classification</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Usage Count</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {landClassifications.map((classification, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{classification}</TableCell>
                      <TableCell className="text-sm text-zinc-600">
                        {classification === 'State Lease' && 'Land leased from the state'}
                        {classification === 'Customary Land' && 'Traditional customary ownership'}
                        {classification === 'Freehold' && 'Private freehold title'}
                        {classification === 'ILG Land' && 'Incorporated Land Group ownership'}
                      </TableCell>
                      <TableCell className="text-right">
                        {Math.floor(Math.random() * 500) + 50}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cases">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Case Categories</CardTitle>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Active Cases</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {caseCategories.map((category, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{category}</TableCell>
                      <TableCell className="text-sm text-zinc-600">Civil</TableCell>
                      <TableCell className="text-right">
                        {Math.floor(Math.random() * 20) + 1}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zoning">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Planning Zones</CardTitle>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Zone Type
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Zone Type</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead className="text-right">Parcels</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {zoningTypes.map((zone, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{zone}</TableCell>
                      <TableCell className="font-mono text-sm">
                        {zone.substring(0, 3).toUpperCase()}-{index + 1}
                      </TableCell>
                      <TableCell className="text-right">
                        {Math.floor(Math.random() * 300) + 50}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
