import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { YoutubeResponse } from '../models/youtube.models';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { ChannelResponse } from '../models/channel.model';
@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = environment.apiKey;
  private playlist = environment.playlist;
  private channelID = environment.channelID;
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

  getChannel() {
    const url = `${this.youtubeUrl}/channels`;
    const params = new HttpParams()
    .set('part', 'snippet')
    .set('id', this.channelID)
    .set('key', this.apiKey );

    return this.http.get<ChannelResponse>(url, {params})
    .pipe(map( res => res.items[0].snippet));
  }

  getSubscriber() {
    const url = `${this.youtubeUrl}/channels`;
    const params = new HttpParams()
    .set('part', 'snippet')
    .set('part', 'statistics')
    .set('id', this.channelID)
    .set('key', this.apiKey );

    return this.http.get(url, {params}).pipe(map((res: any) => res.items[0].statistics));
  }
}
