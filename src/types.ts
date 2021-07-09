/**
' | '* Created by nghinv on Fri Jul 09 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

export type CharType =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z';

export interface DataItemType {
  key: CharType;
  [key: string]: any;
}

export type DataType = Array<DataItemType>;

export type ItemType = {
  index: number;
  item: any;
};
