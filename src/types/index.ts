export type Inputs = {
  productName: string;
  productPrice: number;
  productQuantity: number;
  expirationDate: string;
};

export type Updates = {
  productName: string;
  productPrice: number;
  productQuantity: number;
  expirationDate?: string;
};

export interface InputFieldProps {
  label: string;
  type?: "text" | "number" | "date";
  placeholder: string;
  register: any;
  error?: string;
}
