import { IAction, TReducerFn } from '../index';

export default class OwlStateHelper<T> {
  private reducerName: string;

  private readonly defaultReducerFn: TReducerFn<T> = (state: T): T => state;

  private readonly reducerFunction: TReducerFn<T>;

  private readonly initialState: T;

  constructor(
    reducerName: string,
    initialState: T,
    customReducerFn?: TReducerFn<T>,
  ) {
    this.reducerName = reducerName;
    this.defaultReducerFn = (state: T): T => state;
    this.reducerFunction = customReducerFn || this.defaultReducerFn;
    this.initialState = initialState;
  }

  public getReducer(): TReducerFn<T> {
    return this.buildReducer();
  }

  public createAssignAction = (
    payload: Partial<T>,
    customType?: string,
  ): IAction<T> => ({
    type: customType || `${this.reducerName.toUpperCase()}`,
    payload,
  });

  private buildReducer = (): TReducerFn<T> => (
    state = this.initialState,
    action: IAction<T>,
  ): T => {
    const actionCase = `${this.reducerName.toUpperCase()}`;
    if (action.type === actionCase) {
      return {
        ...state,
        ...action.payload,
      };
    }
    return this.reducerFunction(state, action);
  };
}
