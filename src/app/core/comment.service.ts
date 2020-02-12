import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private defaultState = {
    isCommenting: false,
    commentId: null
  };

  public commentState$ = new BehaviorSubject(this.defaultState);

  public comment(commentId) {
    if (commentId) {
      this.commentState$.next({ isCommenting: true, commentId });
    }
  }
  public cancelCommenting() {
    this.commentState$.next(this.defaultState);
  }
  public showDefultForm() {
    this.commentState$.next({ isCommenting: true, commentId: null });
  }
}
