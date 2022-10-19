import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { JobFields } from 'src/app/models/job-fields.model';
import { JobsService } from 'src/app/service/jobs.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private jobsService :JobsService) { }

  ngOnInit(): void {
  }

  isDataUploading = false;
  @Output() fieldAddEvent : EventEmitter<void> = new EventEmitter;
  @Output() closeAddEvent : EventEmitter<void> = new EventEmitter;

  fieldForm = this.fb.group({
    sortNu: [0, Validators.required],
    jobSin: ['', Validators.required],
    jobEng: ['', Validators.required]
  })
  get f(){
    return this.fieldForm.controls;
  }

  
  onSubmit(){
    const values = this.fieldForm.value as unknown as JobFields;
    this.isDataUploading = true;
    this.jobsService.addJobFields(values as JobFields).subscribe((res)=>{
      debugger;
      this.isDataUploading = false;
      this.fieldAddEvent.emit();
      this.fieldForm.reset();
    })
  }
  cancel(){
      this.closeAddEvent.emit()
  }

}
