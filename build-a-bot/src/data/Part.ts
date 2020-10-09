export default interface Part {
  id: number;
  description: string;
  title: string;
  src: string;
  type: string;
  cost: number;
  onSale?: boolean;
};
