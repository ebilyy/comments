import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { take, map, switchMap } from 'rxjs/operators';
import { IComment } from '../interfaces/comment.interface';
import { AuthorService } from './author.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private authorService: AuthorService) { }

  public createComment$(data) {
    const author = this.authorService.getAuthor().name;
    data.author = author;
    return this.http.post(`${environment.apiUrl}/comments`, data);
  }

  public getAllComments$(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/comments`)
  }

  public updateComment$(id, newData) {
    return this.http.put(`${environment.apiUrl}/comments/${id}`, newData);
  }
  public deleteComment$(id) {
    return this.http.delete(`${environment.apiUrl}/comments/${id}`);
  }
  public createSubcomment$(parentId, data) {
    const author = this.authorService.getAuthor().name;
    data.author = author;
    return this.http.post(`${environment.apiUrl}/comments/${parentId}`, data);
  }
  // public createSubcomment$(parentId, data) {
  //   return this.http.post(`${environment}/comments`, data)
  //     .pipe(
  //       take(1),

  //       switchMap((resp: IComment) => {
  //         console.log(resp);
  //         return this.addSubComment$(parentId, resp._id);
  //       }));
  // }


  // // I belive that better way exist!
  // private addSubComment$(id, subcommentId) {
  //   return this.http.post(`${environment.apiUrl}/sub-comments/${id}`, subcommentId);
  // }
}
