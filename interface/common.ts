type Params = Record<string, string>
type Queries = Record<string, string>

export type DynamicRouteOptions<
  P extends Params = {},
  Q extends Queries = {}
> = {
  params: P
  query: Q
}
