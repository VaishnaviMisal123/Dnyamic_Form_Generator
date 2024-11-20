export interface FieldOption {
    value: string;
    label: string;
  }
  
  export interface Field {
    id: string;
    type: 'text' | 'email' | 'textarea' | 'select' | 'radio';
    label: string;
    placeholder?: string;
    required?: boolean;
    options?: FieldOption[];
  }
  
  export interface Schema {
    formTitle: string;
    formDescription?: string;
    fields: Field[];
  }
  