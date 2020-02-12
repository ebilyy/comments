import { Injectable } from '@angular/core';
import { IAuthor } from '../interfaces/author.interface';
import { BehaviorSubject, Subject, ReplaySubject } from 'rxjs';

const defaultAuthor = {
  name: 'Sharlock Holms',
  contacts: '221B Baker Street'
}

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  public author$ = new ReplaySubject(1);

  public saveAuthor(author: IAuthor) {
    window.localStorage.setItem('name', author.name);
    window.localStorage.setItem('contacts', author.contacts);
    this.author$.next(author)
  }

  public getAuthor(): IAuthor {
    const name = window.localStorage.getItem('name') ? window.localStorage.getItem('name') : defaultAuthor.name;
    const contacts = window.localStorage.getItem('contacts') ? window.localStorage.getItem('contacts') : defaultAuthor.contacts;
    return { name, contacts }
  }
  public init() {
    this.author$.next(this.getAuthor())
  }

}
