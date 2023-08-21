export class Response<T> {
  data!: T;
  error: boolean | undefined;
  mensaje: string | undefined;
}
