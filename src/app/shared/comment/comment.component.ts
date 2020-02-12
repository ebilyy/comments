import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CommentService } from 'src/app/core/comment.service';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { IComment } from 'src/app/interfaces/comment.interface';
import { CommentsService } from 'src/app/core/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.sass']
})
export class CommentComponent implements OnInit, OnDestroy {

  @Input() data: IComment;
  public unsubscriber$ = new Subject
  constructor(private commentService: CommentService, private commentsService: CommentsService) { }
  public activeCommentID;
  ngOnInit() {
    this.commentService.commentState$
      .pipe(
        takeUntil(this.unsubscriber$),
        tap(state => {
          this.activeCommentID = state.commentId;
        })
      ).subscribe()
  }
  ngOnDestroy() {
    this.unsubscriber$.next('unsubscribe');
  }
  public comment() {
    this.commentService.comment(this.data._id);
  }
  delete() {
    this.commentsService.deleteComment(this.data._id);
  }
}
