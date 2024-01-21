export interface routeConfig {
  layout: object;
  loading: object;
  dispatch: any;
  location: any;
  match?: any;
  history?: any;
  message?: any;
  [propName: string]: any;
}

export interface objectConfig {
  [propName: string]: any;
}
