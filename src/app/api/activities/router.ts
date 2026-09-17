import { NextRequest, NextResponse } from 'next/server';
import activitiesData from '@/data/mock/activities.json';
import { ApiResponse } from '@/lib/types/api';
import { SystemActivity } from '@/lib/types/activity';

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<SystemActivity[]>>> {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.max(1, parseInt(searchParams.get('limit') || '10', 10));

    const activities = (activitiesData as SystemActivity[])
      .slice()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);

    return NextResponse.json({
      status: 'success',
      data: activities,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to fetch system activities',
      },
      { status: 500 }
    );
  }
}
