import Part from '@/data/Part';

export default interface Data{
  heads: Part[];
  arms: Part[];
  torsos: Part[];
  bases: Part[];
  [partType: string]: Part[];
}
