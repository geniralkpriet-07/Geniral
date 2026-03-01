import type { Club, Event, Registration, User, AssociationMember, ExecutiveMember, DashboardStats } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000';

async function fetchJSON<T>(path: string, token?: string): Promise<T> {
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { headers });

  if (res.status === 401 || res.status === 403) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.dispatchEvent(new CustomEvent('authChange'));
      window.location.href = '/login';
    }
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `API error: ${res.status} ${path}`);
  }
  return res.json();
}

// ── Events ──────────────────────────────────────────────────────────────────
export const getEvents = (): Promise<Event[]> =>
  fetchJSON<{ data: Event[] }>('/api/events').then((r) => r.data ?? []);
export const getFeaturedEvents = (): Promise<Event[]> =>
  fetchJSON<{ data: Event[] }>('/api/events').then((r) => r.data ?? []);
export const getEventById = (id: string): Promise<Event> =>
  fetchJSON<{ data: Event }>(`/api/events/${id}`).then((r) => r.data);
export const getMyEvents = (token: string): Promise<Event[]> =>
  fetchJSON<{ data: Event[] }>('/api/events/my-events', token).then((r) => r.data ?? []);
export const getMyRegistrations = (token: string): Promise<Registration[]> =>
  fetchJSON<{ data: Registration[] }>('/api/registrations/my-registrations', token).then((r) => r.data ?? []);

// ── Clubs ────────────────────────────────────────────────────────────────────
export const getClubs = (): Promise<Club[]> =>
  fetchJSON<{ data: Club[] }>('/api/clubs').then((r) => r.data ?? []);
export const getClubById = (id: string): Promise<Club> =>
  fetchJSON<{ data: Club }>(`/api/clubs/${id}`).then((r) => r.data);
export const getClubMembers = (id: string) =>
  fetchJSON<{ data: unknown[] }>(`/api/clubs/${id}/members`).then((r) => r.data ?? []);
export const getClubFaculty = (id: string) =>
  fetchJSON<{ data: unknown[] }>(`/api/clubs/${id}/faculty`).then((r) => r.data ?? []);

// ── Association ──────────────────────────────────────────────────────────────
export const getAssociationMembers = (): Promise<AssociationMember[]> =>
  fetchJSON<{ data: AssociationMember[] }>('/api/association-members').then((r) => r.data ?? []);

// ── Executive ────────────────────────────────────────────────────────────────
export const getExecutiveMembers = (): Promise<ExecutiveMember[]> =>
  fetchJSON<{ data: ExecutiveMember[] }>('/api/executive-members').then((r) => r.data ?? []);

// ── Auth ─────────────────────────────────────────────────────────────────────
export async function signup(name: string, email: string, password: string, department: string, role: string = 'student') {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, department, role }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || data.error || 'Signup failed');
  return data;
}

export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Invalid credentials');
  return data;
}

export async function requestPasswordReset(email: string) {
  const res = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Could not request reset');
  return data;
}

export async function verifyOTP(email: string, code: string) {
  const res = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Invalid OTP');
  return data;
}

export async function resetPassword(email: string, code: string, newPassword: string) {
  const res = await fetch(`${BASE_URL}/api/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code, newPassword }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Reset failed');
  return data;
}

// ── Create Event ─────────────────────────────────────────────────────────────
export async function createEvent(formData: FormData, token: string) {
  const res = await fetch(`${BASE_URL}/api/events`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || data.error || 'Failed to create event');
  return data;
}

// ── Registrations ────────────────────────────────────────────────────────────
export async function registerForEvent(eventId: string, token: string, body: Record<string, unknown> = {}) {
  const res = await fetch(`${BASE_URL}/api/events/${eventId}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || 'Registration failed');
  return data;
}

export async function getRegistrationCount(eventId: string): Promise<{ count: number }> {
  return fetchJSON<{ success: boolean; count: number }>(`/api/events/${eventId}/count`).then(r => ({ count: r.count || 0 }));
}

export async function checkMyRegistration(eventId: string, token: string): Promise<{ registered: boolean }> {
  return fetchJSON<{ success: boolean; registered: boolean }>(`/api/events/${eventId}/check`, token).then(r => ({ registered: !!r.registered }));
}

export async function getAdminRegistrations(token: string): Promise<Registration[]> {
  return fetchJSON<{ success: boolean; data: Registration[] }>('/api/admin/registrations', token).then(r => r.data ?? []);
}

export async function getAdminAllEvents(token: string): Promise<Event[]> {
  return fetchJSON<{ success: boolean; data: Event[] }>('/api/admin/events', token).then(r => r.data ?? []);
}

export async function getAdminEventRegistrations(eventId: string, token: string): Promise<{ event: Event; registrations: Registration[]; stats: any }> {
  return fetchJSON<{ success: boolean; data: any }>(`/api/admin/events/${eventId}/registrations`, token).then(r => r.data);
}

export async function approveEvent(eventId: string, token: string) {
  const res = await fetch(`${BASE_URL}/api/admin/events/${eventId}/approve`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to approve');
  return res.json();
}

export async function rejectEvent(eventId: string, token: string) {
  const res = await fetch(`${BASE_URL}/api/admin/events/${eventId}/reject`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to reject');
  return res.json();
}
// ── Admin Dashboard ───────────────────────────────────────────────────────────
export async function getDashboard(token: string): Promise<DashboardStats> {
  return fetchJSON<{ success: boolean; data: DashboardStats }>('/api/admin/analytics/overview', token).then(r => r.data);
}

export async function getAdminUsers(token: string): Promise<User[]> {
  return fetchJSON<{ success: boolean; data: User[] }>('/api/admin/users', token).then(r => r.data ?? []);
}

export async function getAdminUserReferrals(userId: string, token: string): Promise<Registration[]> {
  return fetchJSON<{ success: boolean; data: Registration[] }>(`/api/admin/users/${userId}/referrals`, token).then(r => r.data ?? []);
}

export async function adminCreateStudent(token: string, studentData: Record<string, string>) {
  const res = await fetch(`${BASE_URL}/api/admin/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(studentData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create student');
  return data;
}
