import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { ApiService } from './api.service';
import { tap, filter, take, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  public comments$ = new ReplaySubject(1);

  constructor(private apiService: ApiService) { }

  public getComments() {
    this.apiService.getAllComments$()
      .pipe(
        tap(comments => {
          // console.log(comments);
          // this.comments$.next(comments)
        }),

        tap(comments => {
          console.log(comments);
          this.comments$.next(comments)
        })
      ).subscribe()
  }
  init() {
    this.getComments()
  }
  public deleteComment(id) {
    this.apiService.deleteComment$(id)
      .pipe(
        take(1),
        tap(data => {
          console.log(data);
          this.getComments()
        })
      )
      .subscribe()
  }
}
