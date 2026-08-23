import { circle } from "../09-modules-organization/exercises/ex02";

type Circle = { kind: 'circle'; radius: number; };
type Square = { kind: 'square'; size: number; };
export type Shape = Circle | Square;

export type Shapes = Circle & Square;

const tried: Shapes = {
  // type never
  // conflict at "kind" property 
};

export type Kind = 'circle' | 'square';
export type Shape2 = {
  kind: Kind;
  area: number;
};
export type Circle2 = {
  radius: number;
} & Shape2;

const circle: Circle2 = {
  radius: 5,
  kind: 'circle',
  area: 123
};