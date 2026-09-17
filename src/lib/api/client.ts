import { ApiResponse } from "../types/api";

export class ApiError extends Error {
  code?: string;
  status: number;

  constructor(message: string, status: number = 500, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return ''; 
  }
  let base = '';
  if (process.env.NEXT_PUBLIC_APP_URL) {
    base = process.env.NEXT_PUBLIC_APP_URL;
  } else if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    base = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  } else if (process.env.VERCEL_URL) {
    base = `https://${process.env.VERCEL_URL}`;
  } else if (process.env.NODE_ENV === 'production') {
    base = 'https://products-analysis-dashboard.vercel.app';
  } else {
    base = 'http://localhost:3000';
  }
  return base.replace(/\/+$/, '');
}

export async function apiClient<T>(
  endpoint: string,
  init?: RequestInit
): Promise<T> {
  const url = `${getBaseUrl()}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const res = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    });

    const json: ApiResponse<T> = await res.json();

    if (json.status === 'error') {
      throw new ApiError(json.message, res.status, json.code);
    }

    return json.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'An unexpected network error occurred'
    );
  }
}
