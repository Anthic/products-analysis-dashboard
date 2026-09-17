export type ApiResponse<T> = | {
      status: 'success';
      data: T;
    }
  | {
      status: 'error';
      message: string;
      code?: string;
    };

    export interface PaginatedResponse<T> {
        items: T[]
        total : number
        page : number
        pageSize : number
    }