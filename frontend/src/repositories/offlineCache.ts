import localforage from 'localforage';

// Configure localforage to use IndexedDB as primary, then WebSQL, then LocalStorage
localforage.config({
  name: 'SMS_Offline_Cache',
  storeName: 'api_responses', // Should be alphanumeric, with underscores.
  description: 'Caches API responses for offline access in the School Management System'
});

export const offlineCache = {
  /**
   * Save data to offline cache
   */
  set: async (key: string, data: any): Promise<void> => {
    try {
      await localforage.setItem(key, data);
    } catch (err) {
      console.error(`[OfflineCache] Failed to save key: ${key}`, err);
    }
  },

  /**
   * Retrieve data from offline cache
   */
  get: async <T>(key: string): Promise<T | null> => {
    try {
      return await localforage.getItem<T>(key);
    } catch (err) {
      console.error(`[OfflineCache] Failed to retrieve key: ${key}`, err);
      return null;
    }
  },

  /**
   * Remove specific key from cache
   */
  remove: async (key: string): Promise<void> => {
    try {
      await localforage.removeItem(key);
    } catch (err) {
      console.error(`[OfflineCache] Failed to remove key: ${key}`, err);
    }
  },

  /**
   * Clear the entire offline cache (e.g. on logout)
   */
  clear: async (): Promise<void> => {
    try {
      await localforage.clear();
    } catch (err) {
      console.error('[OfflineCache] Failed to clear cache', err);
    }
  }
};
