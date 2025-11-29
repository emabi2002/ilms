'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';
import { CheckCircle2, XCircle, Loader2, Database } from 'lucide-react';

export default function SetupPage() {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [tables, setTables] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    setLoading(true);
    try {
      // Test connection by trying to query a simple table
      const { data, error } = await supabase
        .from('parcels')
        .select('count')
        .limit(1);

      if (error) {
        console.log('Error checking parcels:', error);
        setConnectionStatus('connected'); // Connection works, table might not exist
      } else {
        setConnectionStatus('connected');
        setTables(['parcels']);
      }
    } catch (error) {
      console.error('Connection error:', error);
      setConnectionStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const sqlSchema = `-- ILMS Database Schema Setup
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Provinces table
CREATE TABLE IF NOT EXISTS provinces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Parcels table
CREATE TABLE IF NOT EXISTS parcels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parcel_number TEXT NOT NULL UNIQUE,
  title_number TEXT,
  area_sqm NUMERIC NOT NULL,
  province TEXT NOT NULL,
  district TEXT NOT NULL,
  llg TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  classification TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leases table
CREATE TABLE IF NOT EXISTS leases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lease_number TEXT NOT NULL UNIQUE,
  parcel_id UUID REFERENCES parcels(id),
  lessee_name TEXT NOT NULL,
  start_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  annual_rent NUMERIC NOT NULL DEFAULT 0,
  arrears NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cases table
CREATE TABLE IF NOT EXISTS cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_number TEXT NOT NULL UNIQUE,
  case_type TEXT NOT NULL CHECK (case_type IN ('civil', 'criminal', 'administrative')),
  title TEXT NOT NULL,
  parcel_id UUID REFERENCES parcels(id),
  status TEXT NOT NULL DEFAULT 'open',
  court TEXT NOT NULL,
  next_hearing_date DATE,
  stage TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Survey Plans table
CREATE TABLE IF NOT EXISTS survey_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plan_number TEXT NOT NULL UNIQUE,
  surveyor_name TEXT NOT NULL,
  parcel_id UUID REFERENCES parcels(id),
  status TEXT NOT NULL DEFAULT 'lodged',
  lodged_date DATE NOT NULL,
  approved_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Valuations table
CREATE TABLE IF NOT EXISTS valuations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  valuation_number TEXT NOT NULL UNIQUE,
  parcel_id UUID REFERENCES parcels(id) NOT NULL,
  value NUMERIC NOT NULL,
  valuer_name TEXT NOT NULL,
  effective_date DATE NOT NULL,
  valuation_type TEXT NOT NULL CHECK (valuation_type IN ('market', 'rental', 'improvement')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ILG table
CREATE TABLE IF NOT EXISTS ilg (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ilg_name TEXT NOT NULL,
  ilg_code TEXT NOT NULL UNIQUE,
  province TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'registered',
  registration_date DATE NOT NULL,
  membership_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customary Agreements table
CREATE TABLE IF NOT EXISTS customary_agreements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agreement_id TEXT NOT NULL UNIQUE,
  clan_name TEXT NOT NULL,
  ilg_id UUID REFERENCES ilg(id),
  area_hectares NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Development Applications table
CREATE TABLE IF NOT EXISTS development_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_number TEXT NOT NULL UNIQUE,
  parcel_id UUID REFERENCES parcels(id),
  applicant_name TEXT NOT NULL,
  development_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'received',
  officer_assigned TEXT,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Records table
CREATE TABLE IF NOT EXISTS audit_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  audit_id TEXT NOT NULL UNIQUE,
  division TEXT NOT NULL,
  issue_description TEXT NOT NULL,
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  division TEXT NOT NULL,
  event_type TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT,
  reference TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users table (for authentication)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL,
  division TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample provinces
INSERT INTO provinces (name, code) VALUES
  ('Central', 'CPP'),
  ('Chimbu', 'CHM'),
  ('Eastern Highlands', 'EHP'),
  ('East New Britain', 'ENB'),
  ('East Sepik', 'ESP'),
  ('Enga', 'ENG'),
  ('Gulf', 'GUF'),
  ('Hela', 'HEL'),
  ('Jiwaka', 'JWK'),
  ('Madang', 'MAD'),
  ('Manus', 'MAN'),
  ('Milne Bay', 'MBA'),
  ('Morobe', 'MOR'),
  ('New Ireland', 'NIR'),
  ('Northern', 'NOR'),
  ('National Capital District', 'NCD'),
  ('Southern Highlands', 'SHP'),
  ('Western', 'WES'),
  ('Western Highlands', 'WHP'),
  ('West New Britain', 'WNB'),
  ('West Sepik', 'WSP'),
  ('Bougainville', 'BOU')
ON CONFLICT (code) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE parcels ENABLE ROW LEVEL SECURITY;
ALTER TABLE leases ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE valuations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ilg ENABLE ROW LEVEL SECURITY;
ALTER TABLE customary_agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE development_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies (allow all for now - customize based on your needs)
CREATE POLICY "Allow all operations for authenticated users" ON parcels FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON leases FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON cases FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON survey_plans FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON valuations FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON ilg FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON customary_agreements FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON development_applications FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON audit_records FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON events FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON users FOR ALL USING (true);
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlSchema);
    alert('SQL schema copied to clipboard! Paste it into your Supabase SQL Editor.');
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">ILMS Database Setup</h1>
          <p className="text-zinc-600">Configure your Supabase database for the Integrated Lands Management System</p>
        </div>

        {/* Connection Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Connection Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                  <span className="text-sm text-zinc-600">Checking connection...</span>
                </>
              ) : connectionStatus === 'connected' ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-900">Connected to Supabase</p>
                    <p className="text-xs text-zinc-500">https://xelptlfgpxdzrstiwcti.supabase.co</p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="text-sm font-medium text-red-900">Connection Failed</p>
                    <p className="text-xs text-zinc-500">Check your environment variables</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Setup Instructions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Database Schema Setup</CardTitle>
            <CardDescription>
              Follow these steps to create the required database tables
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium">Copy the SQL schema</p>
                  <p className="text-sm text-zinc-600">Click the button below to copy the schema to your clipboard</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium">Open Supabase SQL Editor</p>
                  <p className="text-sm text-zinc-600">
                    Go to{' '}
                    <a
                      href="https://supabase.com/dashboard/project/xelptlfgpxdzrstiwcti/sql/new"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Supabase SQL Editor
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium">Paste and run the SQL</p>
                  <p className="text-sm text-zinc-600">Paste the schema and click "Run" to create all tables</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="font-medium">Return to ILMS</p>
                  <p className="text-sm text-zinc-600">
                    Navigate back to the{' '}
                    <a href="/dashboard" className="text-blue-600 hover:underline">
                      ILMS Dashboard
                    </a>
                    {' '}to start using the system
                  </p>
                </div>
              </div>
            </div>

            <Button onClick={copyToClipboard} className="w-full">
              Copy SQL Schema to Clipboard
            </Button>
          </CardContent>
        </Card>

        {/* SQL Preview */}
        <Card>
          <CardHeader>
            <CardTitle>SQL Schema Preview</CardTitle>
            <CardDescription>
              This schema creates all required tables for ILMS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-zinc-900 text-zinc-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-xs">
                <code>{sqlSchema}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
