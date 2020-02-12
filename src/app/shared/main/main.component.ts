import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommentService } from 'src/app/core/comment.service';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { CommentsService } from 'src/app/core/comments.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit, OnDestroy {

  public commentState$ = this.commentService.commentState$;
  public unsubscriber$ = new Subject();
  public isVisible = false;
  public comments$ = new Subject();

  constructor(
    private commentService: CommentService,
    private apiService: ApiService,
    private commentsService: CommentsService
  ) { }
  ngOnInit() {
    this.commentState$
      .pipe(
        takeUntil(this.unsubscriber$),
        tap((state) => {
          this.isVisible = state.commentId === null && state.isCommenting;
        })
      )
      .subscribe()
    this.getComments();
  }
  ngOnDestroy() {

    this.unsubscriber$.next('unsubscribe');
  }
  showForm() {
    this.commentService.showDefultForm();
  }
  getComments() {
    this.commentsService.comments$
      .pipe(
        takeUntil(this.unsubscriber$),
        tap((comments) => {
          this.comments$.next(comments);
        })
      )
      .subscribe()
  }
}
