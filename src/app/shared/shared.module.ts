import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { CommentComponent } from './comment/comment.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorFormComponent } from './author-form/author-form.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, MainComponent, CommentFormComponent, CommentComponent, AuthorFormComponent],
  exports: [HeaderComponent, FooterComponent, MainComponent, CommentFormComponent],
  entryComponents: [AuthorFormComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule
  ]
})
export class SharedModule { }
