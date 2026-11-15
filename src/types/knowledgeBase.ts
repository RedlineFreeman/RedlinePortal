export type KnowledgeLevel = 'Junior' | 'Middle' | 'Senior';

export interface KnowledgeEntry {
  id: string;
  section: string;          // e.g., 'Сети'
  category: string;         // e.g., 'Протоколы'
  title: string;            // e.g., 'SCTP'
  shortSummary: string;     // Краткое определение
  description: string;      // Полное описание
  practicalUsage?: string;  // Практическое применение в продакшене
  commandsOrConfig?: string;// Примеры команд, конфигов или синтаксиса
  level: KnowledgeLevel;    // Уровень сложности
  tags: string[];           // Теги для быстрого поиска
  isCustom?: boolean;       // Добавлено ли пользователем
  createdAt: string;        // Дата добавления
  updatedAt: string;        // Дата последнего обновления
}

export interface KnowledgeFilterState {
  searchQuery: string;
  selectedSection: string | 'all';
  selectedCategory: string | 'all';
  selectedLevel: KnowledgeLevel | 'all';
}
