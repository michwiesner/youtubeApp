import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { YoutubeResponse } from '../models/youtube.models';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyAEpHFUBD_tJTGhUvW4UE4tYxcwZG_1HgI';
  private playlist = 'UUw7Bz6EHxlnOoBUBlJZCWCw';
  private nextPageToken = '';
  public loading: boolean;

  constructor(private http: HttpClient) {}

  getVideos() {
    this.loading = true;
    const url = `${this.youtubeUrl}/playlistItems`;
    const params = new HttpParams()
    .set('part', 'snippet')
    .set('maxResults', '8')
    .set('playlistId', this.playlist)
    .set('key', this.apiKey)
    .set('pageToken', this.nextPageToken);
    return this.http.get<YoutubeResponse>(url, { params })
            .pipe(map( res => {
              this.nextPageToken = res.nextPageToken;
              this.loading = false;
              return res.items;
            }), map( items => items.map( video => video.snippet )));
  }
}
