import { Component } from '@angular/core';
import { AuthorService } from './core/author.service';
import { CommentsService } from './core/comments.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(private authorService: AuthorService, private commentsService: CommentsService) {
    this.authorService.init();
    this.commentsService.init();
  }
}
