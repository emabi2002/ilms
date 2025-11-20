// Core domain types for ILMS

export interface Parcel {
  id: string;
  parcel_number: string;
  title_number?: string;
  area_sqm: number;
  province: string;
  district: string;
  llg: string;
  status: string;
  classification: string;
  created_at: string;
  updated_at: string;
}

export interface Lease {
  id: string;
  lease_number: string;
  parcel_id: string;
  lessee_name: string;
  start_date: string;
  expiry_date: string;
  annual_rent: number;
  arrears: number;
  status: 'active' | 'expired' | 'pending' | 'terminated';
  created_at: string;
}

export interface Case {
  id: string;
  case_number: string;
  case_type: 'civil' | 'criminal' | 'administrative';
  title: string;
  parcel_id?: string;
  status: 'open' | 'pending' | 'closed' | 'appeal';
  court: string;
  next_hearing_date?: string;
  stage: string;
  created_at: string;
}

export interface SurveyPlan {
  id: string;
  plan_number: string;
  surveyor_name: string;
  parcel_id?: string;
  status: 'lodged' | 'under_review' | 'approved' | 'rejected';
  lodged_date: string;
  approved_date?: string;
  created_at: string;
}

export interface Valuation {
  id: string;
  valuation_number: string;
  parcel_id: string;
  value: number;
  valuer_name: string;
  effective_date: string;
  valuation_type: 'market' | 'rental' | 'improvement';
  created_at: string;
}

export interface ILG {
  id: string;
  ilg_name: string;
  ilg_code: string;
  province: string;
  status: 'registered' | 'pending' | 'suspended' | 'dissolved';
  registration_date: string;
  membership_count: number;
  created_at: string;
}

export interface CustomaryAgreement {
  id: string;
  agreement_id: string;
  clan_name: string;
  ilg_id?: string;
  area_hectares: number;
  status: 'active' | 'pending' | 'converted' | 'disputed';
  created_at: string;
}

export interface DevelopmentApplication {
  id: string;
  application_number: string;
  parcel_id: string;
  applicant_name: string;
  development_type: string;
  status: 'received' | 'under_assessment' | 'approved' | 'rejected' | 'pending_signature';
  officer_assigned?: string;
  last_updated: string;
  created_at: string;
}

export interface AuditRecord {
  id: string;
  audit_id: string;
  division: string;
  issue_description: string;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  division: string;
  event_type: string;
  date: string;
  time?: string;
  reference: string;
  description?: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  division?: string;
  created_at: string;
}

export type UserRole =
  | 'secretary'
  | 'deputy_secretary'
  | 'director_physical_planning'
  | 'director_state_lands'
  | 'director_survey'
  | 'director_audit'
  | 'director_cases'
  | 'director_valuation'
  | 'officer_pp'
  | 'officer_state'
  | 'officer_survey'
  | 'officer_audit'
  | 'officer_cases'
  | 'officer_valuation'
  | 'officer_ilg'
  | 'officer_customary'
  | 'provincial_officer';

export interface Activity {
  id: string;
  date: string;
  division: string;
  action: string;
  reference: string;
  user_name: string;
}
