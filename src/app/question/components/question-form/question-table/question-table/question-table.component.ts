import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Question } from 'src/app/question/core/models/question';
import { QuestionService } from 'src/app/question/core/services/question.service';

@Component({
  selector: 'app-question-table',
  templateUrl: './question-table.component.html',
  styleUrls: ['./question-table.component.scss']
})
export class QuestionTableComponent implements OnInit {

  public questions: Array<Question> = [];
  public confirmation: string = "false";
  constructor(
    private questionService: QuestionService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.questionService.findAll().subscribe((questions: Question[]) => {
      this.questions = questions;
    })
  }


  public onRemove(question: Question): void {
    console.log(`L'utilisateur souhaite supprimer ${question.getText()}`);
    //if (this.confirmation === "true") {
    this.questionService.delete(question).subscribe({
      next: (response: HttpResponse<any>) => { },
      error: (error: any) => { },
      complete: () => {
        this.questions.splice(
          this.questions.findIndex((q: Question) => q.getId() === question.getId()),
          1
        )
      }
    });
    //}
  }

}
