import { Request, Response } from "express";

export type TMeta = {
  page: number;
  totalPages: number;
  itemsCount: number;
};

export type TResponse<T> = {
  code: number;
  message?: string;
  data?: T;
  meta?: TMeta;
};

export type TControllerProps = {
  req: Request & { userId?: string };
  res: Response;
};

export type TPagination = {
  page:number,
  limit:number
}
