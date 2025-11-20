import { supabase } from './supabaseClient';

// Dashboard KPIs
export async function getDashboardKPIs() {
  try {
    const [
      casesResult,
      leasesResult,
      applicationsResult,
      surveyPlansResult,
      auditsResult,
      valuationsResult,
      ilgResult,
      customaryResult,
    ] = await Promise.all([
      supabase.from('cases').select('*', { count: 'exact', head: true }),
      supabase.from('leases').select('*', { count: 'exact', head: true }),
      supabase.from('development_applications').select('*', { count: 'exact', head: true }),
      supabase.from('survey_plans').select('*', { count: 'exact', head: true }).eq('status', 'lodged'),
      supabase.from('audit_records').select('*', { count: 'exact', head: true }).eq('status', 'open'),
      supabase.from('valuations').select('*', { count: 'exact', head: true }),
      supabase.from('ilg').select('*', { count: 'exact', head: true }).eq('status', 'registered'),
      supabase.from('customary_agreements').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    ]);

    return {
      openCases: casesResult.count || 0,
      activeLeases: leasesResult.count || 0,
      pendingApplications: applicationsResult.count || 0,
      surveyPlansAwaiting: surveyPlansResult.count || 0,
      auditFlags: auditsResult.count || 0,
      valuationsCompleted: valuationsResult.count || 0,
      registeredILGs: ilgResult.count || 0,
      customaryAgreements: customaryResult.count || 0,
    };
  } catch (error) {
    console.error('Error fetching dashboard KPIs:', error);
    return null;
  }
}

// Division summary
export async function getDivisionSummary() {
  try {
    const divisions = [
      'Physical Planning',
      'State Lands',
      'Survey',
      'Audit',
      'Cases',
      'Valuation',
      'ILG',
      'Customary Lands',
    ];

    const summaryPromises = divisions.map(async (division) => {
      let tableName = '';
      const statusField = 'status';

      switch (division) {
        case 'Physical Planning':
          tableName = 'development_applications';
          break;
        case 'State Lands':
          tableName = 'leases';
          break;
        case 'Survey':
          tableName = 'survey_plans';
          break;
        case 'Audit':
          tableName = 'audit_records';
          break;
        case 'Cases':
          tableName = 'cases';
          break;
        case 'Valuation':
          tableName = 'valuations';
          break;
        case 'ILG':
          tableName = 'ilg';
          break;
        case 'Customary Lands':
          tableName = 'customary_agreements';
          break;
      }

      const [openResult, pendingResult, approvedResult] = await Promise.all([
        supabase.from(tableName).select('*', { count: 'exact', head: true }).in(statusField, ['open', 'received', 'lodged']),
        supabase.from(tableName).select('*', { count: 'exact', head: true }).in(statusField, ['pending', 'under_assessment', 'under_review']),
        supabase.from(tableName).select('*', { count: 'exact', head: true }).in(statusField, ['approved', 'registered', 'active']),
      ]);

      return {
        division,
        open: openResult.count || 0,
        pending: pendingResult.count || 0,
        approved: approvedResult.count || 0,
      };
    });

    return await Promise.all(summaryPromises);
  } catch (error) {
    console.error('Error fetching division summary:', error);
    return [];
  }
}

// Recent activities
export async function getRecentActivities(limit = 10) {
  try {
    // Get recent records from different tables
    const [leases, applications, plans, cases, audits, valuations, ilgs, customary] = await Promise.all([
      supabase.from('leases').select('*').order('created_at', { ascending: false }).limit(2),
      supabase.from('development_applications').select('*').order('created_at', { ascending: false }).limit(2),
      supabase.from('survey_plans').select('*').order('created_at', { ascending: false }).limit(2),
      supabase.from('cases').select('*').order('created_at', { ascending: false }).limit(1),
      supabase.from('audit_records').select('*').order('created_at', { ascending: false }).limit(1),
      supabase.from('valuations').select('*').order('created_at', { ascending: false }).limit(1),
      supabase.from('ilg').select('*').order('created_at', { ascending: false }).limit(1),
      supabase.from('customary_agreements').select('*').order('created_at', { ascending: false }).limit(1),
    ]);

    const activities = [
      ...(leases.data || []).map(l => ({
        id: l.id,
        date: l.created_at,
        division: 'State Lands',
        action: 'Lease Created',
        reference: l.lease_number,
        user: 'System User',
      })),
      ...(applications.data || []).map(a => ({
        id: a.id,
        date: a.created_at,
        division: 'Physical Planning',
        action: 'Application Received',
        reference: a.application_number,
        user: a.officer_assigned || 'Unassigned',
      })),
      ...(plans.data || []).map(p => ({
        id: p.id,
        date: p.created_at,
        division: 'Survey',
        action: 'Plan Lodged',
        reference: p.plan_number,
        user: p.surveyor_name,
      })),
      ...(cases.data || []).map(c => ({
        id: c.id,
        date: c.created_at,
        division: 'Cases',
        action: 'Case Filed',
        reference: c.case_number,
        user: 'Legal Team',
      })),
      ...(audits.data || []).map(a => ({
        id: a.id,
        date: a.created_at,
        division: 'Audit',
        action: 'Audit Created',
        reference: a.audit_id,
        user: 'Audit Team',
      })),
      ...(valuations.data || []).map(v => ({
        id: v.id,
        date: v.created_at,
        division: 'Valuation',
        action: 'Valuation Submitted',
        reference: v.valuation_number,
        user: v.valuer_name,
      })),
      ...(ilgs.data || []).map(i => ({
        id: i.id,
        date: i.created_at,
        division: 'ILG',
        action: 'ILG Registered',
        reference: i.ilg_code,
        user: 'ILG Officer',
      })),
      ...(customary.data || []).map(c => ({
        id: c.id,
        date: c.created_at,
        division: 'Customary Lands',
        action: 'Agreement Created',
        reference: c.agreement_id,
        user: 'Customary Officer',
      })),
    ];

    // Sort by date and limit
    return activities
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    return [];
  }
}

// Generic data fetching with search and filters
export async function fetchTableData(
  tableName: string,
  options?: {
    search?: string;
    searchFields?: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filters?: Record<string, any>;
    orderBy?: string;
    ascending?: boolean;
    limit?: number;
  }
) {
  try {
    let query = supabase.from(tableName).select('*');

    // Apply filters
    if (options?.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          query = query.eq(key, value);
        }
      });
    }

    // Apply search
    if (options?.search && options?.searchFields && options.searchFields.length > 0) {
      const searchConditions = options.searchFields
        .map(field => `${field}.ilike.%${options.search}%`)
        .join(',');
      query = query.or(searchConditions);
    }

    // Apply ordering
    if (options?.orderBy) {
      query = query.order(options.orderBy, { ascending: options.ascending ?? false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    // Apply limit
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error(`Error fetching ${tableName}:`, error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error(`Error in fetchTableData for ${tableName}:`, error);
    return [];
  }
}
