'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Filter } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const divisions = [
  'All',
  'Physical Planning',
  'State Lands',
  'Survey',
  'Audit',
  'Cases',
  'Valuation',
  'ILG',
  'Customary',
];

const events = [
  {
    id: '1',
    title: 'Court Hearing - CSE-2025-002',
    division: 'Cases',
    date: '2025-11-28',
    time: '10:00 AM',
    reference: 'CSE-2025-002',
    type: 'hearing',
  },
  {
    id: '2',
    title: 'Lease Expiring - LSE-2025-1237',
    division: 'State Lands',
    date: '2025-09-30',
    time: null,
    reference: 'LSE-2025-1237',
    type: 'expiry',
  },
  {
    id: '3',
    title: 'Court Hearing - CSE-2025-001',
    division: 'Cases',
    date: '2025-12-05',
    time: '09:00 AM',
    reference: 'CSE-2025-001',
    type: 'hearing',
  },
  {
    id: '4',
    title: 'Planning Board Meeting',
    division: 'Physical Planning',
    date: '2025-12-01',
    time: '02:00 PM',
    reference: 'BOARD-2025-12',
    type: 'meeting',
  },
  {
    id: '5',
    title: 'Audit Review - State Lands',
    division: 'Audit',
    date: '2025-12-03',
    time: '10:30 AM',
    reference: 'AUD-2025-004',
    type: 'audit',
  },
  {
    id: '6',
    title: 'Survey Inspection',
    division: 'Survey',
    date: '2025-12-07',
    time: '08:00 AM',
    reference: 'PLN-2025-9016',
    type: 'inspection',
  },
  {
    id: '7',
    title: 'Court Hearing - CSE-2025-004',
    division: 'Cases',
    date: '2025-12-10',
    time: '11:00 AM',
    reference: 'CSE-2025-004',
    type: 'hearing',
  },
  {
    id: '8',
    title: 'ILG Annual General Meeting',
    division: 'ILG',
    date: '2025-12-15',
    time: '09:00 AM',
    reference: 'ILG-2025-001',
    type: 'meeting',
  },
  {
    id: '9',
    title: 'Valuation Submission Deadline',
    division: 'Valuation',
    date: '2025-12-20',
    time: null,
    reference: 'VAL-2025-Q4',
    type: 'deadline',
  },
  {
    id: '10',
    title: 'Customary Land Agreement Review',
    division: 'Customary',
    date: '2026-01-05',
    time: '10:00 AM',
    reference: 'CUS-2025-003',
    type: 'review',
  },
];

const divisionColors: Record<string, string> = {
  'Physical Planning': 'bg-blue-100 text-blue-800 border-blue-200',
  'State Lands': 'bg-green-100 text-green-800 border-green-200',
  Survey: 'bg-purple-100 text-purple-800 border-purple-200',
  Audit: 'bg-orange-100 text-orange-800 border-orange-200',
  Cases: 'bg-red-100 text-red-800 border-red-200',
  Valuation: 'bg-teal-100 text-teal-800 border-teal-200',
  ILG: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  Customary: 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

export default function CalendarPage() {
  const [selectedDivision, setSelectedDivision] = useState('All');

  const filteredEvents =
    selectedDivision === 'All'
      ? events
      : events.filter((event) => event.division === selectedDivision);

  const sortedEvents = [...filteredEvents].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div>
      <PageHeader
        title="Integrated Events Calendar"
        description="All upcoming events, deadlines, and hearings across all divisions"
      />

      {/* Division Filter */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-zinc-600" />
            <CardTitle>Filter by Division</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {divisions.map((division) => (
              <Button
                key={division}
                variant={selectedDivision === division ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDivision(division)}
              >
                {division}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-zinc-600" />
            <CardTitle>
              Upcoming Events
              {selectedDivision !== 'All' && (
                <span className="text-sm font-normal text-zinc-500 ml-2">
                  - {selectedDivision}
                </span>
              )}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Division</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Reference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedEvents.length > 0 ? (
                sortedEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </TableCell>
                    <TableCell className="text-sm text-zinc-600">
                      {event.time || '-'}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={divisionColors[event.division]}
                      >
                        {event.division}
                      </Badge>
                    </TableCell>
                    <TableCell>{event.title}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {event.reference}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-zinc-500">
                    No events found for {selectedDivision}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
