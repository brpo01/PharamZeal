export interface Drug {
  id: number;
  drugName: string;
  price: number;
  drug_code: string;
  customer_condition: string;
  id_check: boolean;
  store: string;
  postcode: string;
  available_stock: number;
  expiry_date: string;
  availability: boolean;
  sales: any;
  quantity?: number;
  tax?: number;
}
