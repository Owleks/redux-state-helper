export interface IAction<T> {
  type: string;
  payload: Partial<T>;
}

export type TReducerFn<T> = (state: T, action: IAction<T>) => T;