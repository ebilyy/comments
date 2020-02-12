import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthorFormComponent } from '../author-form/author-form.component';
import { AuthorService } from 'src/app/core/author.service';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit, OnDestroy {

  public authorData;
  public unsubscriber$ = new Subject();

  constructor(
    public dialog: MatDialog,
    private authorService: AuthorService
  ) { }

  public year = new Date().getFullYear();
  openDialog() {
    const dialogRef = this.dialog.open(AuthorFormComponent);
  }

  ngOnInit() {
    this.authorService.author$
      .pipe(
        takeUntil(this.unsubscriber$),
        tap(author => {
          console.log(author);
          this.authorData = author
        })
      ).subscribe()
  }
  ngOnDestroy(): void {
    this.unsubscriber$.next('unsubscribe')
  }
  public changeAuthor() {

  }
}
