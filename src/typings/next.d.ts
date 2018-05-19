import * as next from 'next';

declare module 'next' {
  interface QueryParams {
    [key: string]:
      | boolean
      | boolean[]
      | number
      | number[]
      | string
      | string[]
  }

  export interface NextContext<Req, Res> {
    pathname: string;
    query: QueryParams;
    asPath: string;
    jsonPageRes: Response;
    req?: Req;
    res?: Res;
    err?: Error;
  }
}
