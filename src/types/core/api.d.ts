export type HttpMethods = "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";

export type HttpHeaders = Headers & {};

export type HttpBody = BodyInit & {};

export type HttpParams = string[][] | Record<string, string> | string | URLSearchParams;

export type HttpRequestInit = RequestInit & { headers?: HttpHeaders };
