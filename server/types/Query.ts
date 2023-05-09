import { Decimal } from "@prisma/client/runtime"
import { Transaction } from "./Transaction"
import { Location } from "./Location"
import { Item } from "./Item"
import { Customer } from './Customer'

export interface Query {
  where?: SubQuery,
  select?: SubQuery,
  by?: string,
  _avg?: SubQuery,
  _count?: SubQuery,
  having?: SubQuery,
  _max?: SubQuery,
  _min?: SubQuery,
  data?: SubQuery,
  include?: SubQuery,
  skip?: number,
  take?: number
  orderBy?: SubQuery
}

type SubQuery = Partial<Query>
  | Partial<Transaction>
  | Partial<Location>
  | Partial<Item>
  | Partial<Customer>
  | {
    AND?: [SubQuery],
    OR?: [SubQuery],
    NOT?: [SubQuery],
    startWith?: string,
    connectOrCreate?: [SubQuery],
    increment?: number,
  }