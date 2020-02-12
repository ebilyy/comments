import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/core/api.service';
import { CommentService } from 'src/app/core/comment.service';
import { tap, takeUntil, take, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CommentsService } from 'src/app/core/comments.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.sass']
})
export class CommentFormComponent implements OnInit, OnDestroy {

  private unsubscriber$ = new Subject()
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private commentService: CommentService,
    private commentsService: CommentsService
  ) { }
  public commentForm;
  public state = {
    isCommenting: false,
    commentId: null
  }

  ngOnInit() {
    this.commentForm = this.fb.group({
      text: '',
      parent_id: null,
      author: '',
      time: null
    });
    this.commentService.commentState$
      .pipe(
        takeUntil(this.unsubscriber$),
        tap(state => {
          this.state = state;
        })
      )
      .subscribe()
  }

  ngOnDestroy() {
    this.unsubscriber$.next('unsubscribe')
  }

  sendData() {
    const data = this.commentForm.value;
    data.time = new Date();
    data.parent_id = this.state.commentId;
    if (!this.state.commentId) {
      this.createComment(data)
    } else {
      this.createSubComment(data, this.state.commentId)
    }
  }

  cancel() {
    this.commentService.cancelCommenting();
  }

  private createComment(data) {
    this.apiService.createComment$(data)
      .pipe(
        take(1),
        tap((data) => {
          this.commentsService.getComments();
          this.commentForm.reset()
        }),
        // catchError((err) => {
        //   console.log(err);
        // })
      )
      .subscribe()
  }
  private createSubComment(data, parentId) {
    this.apiService.createSubcomment$(parentId, data)
      .pipe(
        take(1),
        tap((data) => {
          this.commentsService.getComments();
          this.commentForm.reset()
        }),
        // catchError(err => {
        //   console.log(err);
        // })
      )
      .subscribe()
  }
}
