export interface ApiResponse {
    success: boolean;
    isSuccess: boolean;
    statusCode: boolean;
    message: string;
    data: object;
    recordsEffected: number;
    totalRecords: number;
  }