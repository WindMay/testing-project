// Intersecttion Types

export  interface Human {
  head: string;
  legs: number;
  arms: string;
}

export interface Wolf {
  head: string;
  fangs: string;
  legs: number;
  tail: string;
}

type NTuple<TItem, TLength extends number> = [TItem, ...TItem[]] & { length: TLength };
export type BooleanWeek = NTuple<boolean , 7> | null;
export type NumberWeek = NTuple<number, 7>;
export type AnyWeek = NTuple<any, 7>;


let diasUser: BooleanWeek = [true, false, true, true, true, true, false];


