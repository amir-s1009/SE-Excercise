// Must be a module
export {};

import 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
