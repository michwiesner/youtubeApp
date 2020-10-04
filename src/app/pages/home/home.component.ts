import { Component, HostListener, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { Video } from 'src/app/models/youtube.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videos: Video[] = [];

  @HostListener('window:scroll', ['$event'])
    onScroll() {
      const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 800;
      const max = (document.documentElement.scrollHeight || document.body.scrollHeight);
      if ( pos >= max) {
        if ( this.service.loading) { return; }
        this.getVideos();
      }
    }

  constructor(private service: YoutubeService) { }

  ngOnInit(): void {
    this.getVideos();
  }

  getVideos() {
    this.service.getVideos().subscribe(res => {
      this.videos.push( ...res);
    });
  }

  showVideo( video: Video) {
    Swal.fire({
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      showConfirmButton: false,
      html: `
      <h4> ${ video.title } </h4>
      <iframe width="100%"
              height="315"
              src="https://www.youtube.com/embed/${ video.resourceId.videoId}"
              frameborder="0"
              allow="accelerometer;
              autoplay;
              encrypted-media;
              gyroscope;
              picture-in-picture"
              allowfullscreen>
        </iframe>
      `
    });
  }

}
