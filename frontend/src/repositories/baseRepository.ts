import { apiClient } from '../api/apiClient';
import { offlineCache } from './offlineCache';

export interface RepositoryOptions {
  bypassCache?: boolean;
}

export class BaseRepository {
  protected resource: string;

  constructor(resource: string) {
    this.resource = resource;
  }

  protected getCacheKey(endpoint: string): string {
    return `req_cache_${endpoint}`;
  }

  /**
   * Fetch data from network, fallback to cache if network fails.
   */
  async get<T>(endpoint: string = this.resource, _options?: RepositoryOptions): Promise<T> {
    const cacheKey = this.getCacheKey(endpoint);

    try {
      // 1. Try to fetch from network
      const data = await apiClient.get<T>(endpoint);
      
      // 2. Save to offline cache for future fallback
      await offlineCache.set(cacheKey, data);
      
      return data;
    } catch (err: any) {
      // 3. Network failed, try offline cache
      console.warn(`[Repository] Network fetch failed for ${endpoint}. Attempting offline cache.`);
      const cachedData = await offlineCache.get<T>(cacheKey);
      
      if (cachedData) {
        console.info(`[Repository] Loaded ${endpoint} from offline cache.`);
        return cachedData;
      }

      // 4. Cache miss, throw original error
      throw new Error(`Failed to fetch ${endpoint} and no offline cache available.`);
    }
  }

  /**
   * Post data to network. If offline, it would technically be queued (to be implemented later).
   */
  async post<T>(data: any, endpoint: string = this.resource): Promise<T> {
    return await apiClient.post<T>(endpoint, data);
  }

  /**
   * Put/Update data on network.
   */
  async put<T>(id: string | number, data: any, endpoint: string = this.resource): Promise<T> {
    return await apiClient.put<T>(`${endpoint}/${id}`, data);
  }

  /**
   * Delete data from network.
   */
  async delete<T>(id: string | number, endpoint: string = this.resource): Promise<T> {
    return await apiClient.delete<T>(`${endpoint}/${id}`);
  }
}
