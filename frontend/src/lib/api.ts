const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export interface User {
  _id: string
  email: string
  name: string
}

export interface Activity {
  _id: string
  title: string
  activityType: 'walk' | 'run' | 'cycling' | 'swimming' | 'strength' | 'other'
  durationMinutes: number
  caloriesBurned?: number
  date: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface ActivityInput {
  title: string
  activityType: Activity['activityType']
  durationMinutes: number
  caloriesBurned?: number
  date: string
  notes?: string
}

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  const token = localStorage.getItem('token')
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { ...getAuthHeaders(), ...options.headers },
  })

  const data = (await response.json().catch(() => null)) as { error?: string } | T | null

  if (!response.ok) {
    throw new Error(
      (data as { error?: string } | null)?.error ||
        'Something went wrong. Please try again.'
    )
  }

  return data as T
}

export const api = {
  login: (email: string, password: string) =>
    request<{ user: User; token: string }>('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name: string, email: string, password: string) =>
    request<{ user: User; token: string }>('/api/users/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  getActivities: () => request<Activity[]>('/api/activities'),

  createActivity: (activity: ActivityInput) =>
    request<Activity>('/api/activities', {
      method: 'POST',
      body: JSON.stringify(activity),
    }),

  deleteActivity: (id: string) =>
    request<{ message: string }>(`/api/activities/${id}`, {
      method: 'DELETE',
    }),
}
