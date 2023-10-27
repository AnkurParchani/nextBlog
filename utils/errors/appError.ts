interface AppErrorInterface {
  isOperational: boolean;
  status: string;
  statusCode: number;
  message: string;
}

export default class AppError implements AppErrorInterface {
  public isOperational: boolean;
  public status: string;

  constructor(public statusCode: number, public message: string) {
    this.message = message;
    this.statusCode = statusCode;
    this.isOperational = true;
    this.status = `${this.statusCode}`.startsWith("4") ? "fail" : "error";
  }
}
