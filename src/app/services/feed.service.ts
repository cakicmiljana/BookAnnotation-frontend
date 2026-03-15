import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FeedItem } from '../models/feed-item';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private url = 'assets/mock-data.json';

  constructor(private http: HttpClient) {}

  getFeed(userId: number): Observable<FeedItem[]> {
    return this.http.get<any>(this.url).pipe(
      map(data => data.feed.filter((f: FeedItem) => f.userId === userId))
    );
  }
}