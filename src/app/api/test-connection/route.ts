import { createServerClient } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = createServerClient();

    // Test basic connection
    const { data: testData, error: testError } = await supabase
      .from('_test_')
      .select('*')
      .limit(1);

    // Get list of tables (this will work if we have access)
    const { data: tables, error: tablesError } = await supabase
      .rpc('get_tables')
      .select('*');

    return NextResponse.json({
      status: 'connected',
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      testError: testError?.message || null,
      tablesError: tablesError?.message || null,
      message: 'Supabase connection is configured. You can now set up your database schema.',
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
