export interface Match {
  id: number;
  user1: {
    id: number;
    name: string;
    avatar?: string;
  };
  user2: {
    id: number;
    name: string;
    avatar?: string;
  };
  // Добавь другие поля, если нужно
} 