import { IFormInput } from "./Form";

export interface CategoryState {
  categories: {
    original: IFormInput[];
    headers: object;
    exception: string | null;
  } | null;
  status: 'idle' | 'loading' | 'failed';
}

