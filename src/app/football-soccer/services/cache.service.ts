import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  get<T>(key: string): Observable<T> | null {
    const cachedData = localStorage.getItem(key);

    if (cachedData) {
      return of(JSON.parse(cachedData));
    }

    return null;
  }

  set<T>(key: string, data: T): void {
    const dataToCache = JSON.stringify(data);
    localStorage.setItem(key, dataToCache);
  }

}
