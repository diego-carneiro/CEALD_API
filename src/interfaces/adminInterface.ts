export interface AdminParams {
  password: string;
}

export interface AdminResult {
  valid: boolean;
}

export interface IAdminRepository {
  admin(params: AdminParams): Promise<AdminResult>;
}

export interface IAdminControllerResponse<T = unknown> {
  statusCode: number;
  body: T;
}

export interface IAdminController {
  handle(): Promise<IAdminControllerResponse>;
}
