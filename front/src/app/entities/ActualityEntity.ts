// User entity interface
interface Utilisateur {
    id: number;
    firstname: string;
    lastname: string;
    age: string;
    address: string;
    tel: string;
    email: string;
    email_verified_at: string | null;
    created_at: string | null;
    updated_at: string | null;
    user_name: string;
    role: string;
  }
  
  // Main entity interface
  export interface ActualityEntity {
    id?: number;
    title: string;
    content: string;
    excerpt: string;
    image: string;
    date_creation: string;
    user_id: number;
    created_at?: string;
    updated_at?: string;
    utilisateur?: Utilisateur;
  }
