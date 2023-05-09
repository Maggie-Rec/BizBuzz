import { Customer } from "./Customer";
import { Item } from "./Item";
import { Location } from "./Location";
import { Transaction } from "./Transaction";
import { Prisma } from '@prisma/client';

export type PrismaFindMany =
  Location[]
  | Transaction[]
  | Item[]
  | Customer[];