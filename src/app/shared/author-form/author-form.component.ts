import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/core/author.service';
import { IAuthor } from '../../interfaces/author.interface'
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.sass']
})
export class AuthorFormComponent implements OnInit {

  constructor(private authorService: AuthorService, private fb: FormBuilder) { }
  public authorForm: FormGroup;

  ngOnInit() {
    this.authorForm = this.fb.group({
      name: ['', Validators.required],
      contacts: ['', Validators.required]
    });
  }

  public saveAuthor() {
    this.authorService.saveAuthor(this.authorForm.value);
  }

}
