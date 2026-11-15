import { KnowledgeEntry, KnowledgeFilterState } from '../types/knowledgeBase';

/**
 * Normalizes a string key for deduplication comparisons.
 */
function normalizeKey(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

/**
 * Deduplicates knowledge entries by id and normalized title so no repeated articles exist.
 */
export function deduplicateKnowledgeEntries(entries: KnowledgeEntry[]): KnowledgeEntry[] {
  const seenIds = new Set<string>();
  const seenTitles = new Set<string>();
  const result: KnowledgeEntry[] = [];

  for (const entry of entries) {
    const normId = normalizeKey(entry.id);
    const normTitle = normalizeKey(entry.title);
    if (!normId || !normTitle) continue;
    if (seenIds.has(normId) || seenTitles.has(normTitle)) continue;

    seenIds.add(normId);
    seenTitles.add(normTitle);
    result.push(entry);
  }

  return result;
}

/**
 * Merges persisted user entries from localStorage with built-in seed entries.
 * - Preserves user-created custom entries (`isCustom: true`) and user edits to existing entries.
 * - Injects any new seed entries that were added in newer app versions.
 * - Guarantees zero duplicates.
 */
export function mergeKnowledgeEntries(
  saved: KnowledgeEntry[],
  seed: KnowledgeEntry[]
): KnowledgeEntry[] {
  const mergedMap = new Map<string, KnowledgeEntry>();

  // First load all built-in seed entries
  for (const item of deduplicateKnowledgeEntries(seed)) {
    mergedMap.set(item.id, item);
  }

  // Overlay saved entries (preserves user edits and appends custom entries)
  for (const savedItem of saved) {
    if (!savedItem || !savedItem.id || !savedItem.title) continue;
    if (savedItem.isCustom) {
      mergedMap.set(savedItem.id, savedItem);
    } else if (mergedMap.has(savedItem.id)) {
      // Keep saved version if updatedAt is newer, otherwise prefer updated seed
      const seedItem = mergedMap.get(savedItem.id)!;
      if (savedItem.updatedAt > seedItem.updatedAt) {
        mergedMap.set(savedItem.id, savedItem);
      }
    }
  }

  // Keep custom entries at the top, followed by built-in seed order
  const customEntries: KnowledgeEntry[] = [];
  const builtinEntries: KnowledgeEntry[] = [];

  for (const entry of mergedMap.values()) {
    if (entry.isCustom) {
      customEntries.push(entry);
    } else {
      builtinEntries.push(entry);
    }
  }

  return deduplicateKnowledgeEntries([...customEntries, ...builtinEntries]);
}

/**
 * Filters knowledge entries by query, section, category, and difficulty level.
 */
export function filterKnowledgeEntries(
  entries: KnowledgeEntry[],
  filters: KnowledgeFilterState
): KnowledgeEntry[] {
  const query = filters.searchQuery.trim().toLowerCase();

  return entries.filter((entry) => {
    const matchesSearch =
      !query ||
      entry.title.toLowerCase().includes(query) ||
      entry.description.toLowerCase().includes(query) ||
      entry.shortSummary.toLowerCase().includes(query) ||
      (entry.practicalUsage && entry.practicalUsage.toLowerCase().includes(query)) ||
      (entry.commandsOrConfig && entry.commandsOrConfig.toLowerCase().includes(query)) ||
      entry.tags.some((t) => t.toLowerCase().includes(query)) ||
      entry.section.toLowerCase().includes(query) ||
      entry.category.toLowerCase().includes(query);

    const matchesSection =
      filters.selectedSection === 'all' || entry.section === filters.selectedSection;

    const matchesCategory =
      filters.selectedCategory === 'all' || entry.category === filters.selectedCategory;

    const matchesLevel =
      filters.selectedLevel === 'all' || entry.level === filters.selectedLevel;

    return matchesSearch && matchesSection && matchesCategory && matchesLevel;
  });
}
