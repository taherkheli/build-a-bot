import Cart from '@/data/Cart';
import Data from '@/data/Data';
import Part from '@/data/Part';

export type State = {
  cart: Cart[];
  data: Data;
}

const heads: Part[] = [];
const arms: Part[] = [];
const torsos: Part[] = [];
const bases: Part[] = [];

export const state: State = {
  cart: [],
  data: {
    heads,
    arms,
    torsos,
    bases,
  },
};
