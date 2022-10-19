import { Component, OnInit } from '@angular/core';
import { JobDetails } from 'src/app/models/job-details.model';
import { JobFields } from 'src/app/models/job-fields.model';
import { JobTitles } from 'src/app/models/job-titles.model';
import { JobRoads } from 'src/app/models/job-road.model';
import { JobsService } from 'src/app/service/jobs.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  constructor(private jobsService : JobsService,
    private fb: FormBuilder,
    private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.getTables();
  }
  rowIndex! : number;
  selectedField! : JobFields;
  show_add_form = false;
  isDataUploading = false;
  update_message='';

  public fields :JobFields[]  =[];
  
  getTables(){
    //this.isLoading = true;
    this.jobsService.getJobFields().subscribe((res)=>{
      this.fields = res.data;
      //this.isLoading = false;
    });
    
    
  }
  public selectField(selectedRow: number, field : JobFields){
    this.rowIndex = selectedRow;
    this.selectedField = field;
  }
  addNewField(){
    this.show_add_form = true;
  }
  hideAddField(){
    this.show_add_form = false;
  }
  updateFieldList(){
    this.getTables();
  }
  titleForm = this.fb.group({
    sortNu: [0, Validators.required],
    jobSin: ['', Validators.required],
    jobEng: ['', Validators.required]
  })
  get f(){
    return this.titleForm.controls;
  }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
  onSubmit(){
    const values = this.titleForm.value as JobTitles;
    values.fieldId = this.selectedField.id;
    this.isDataUploading = true;
    this.jobsService.addJobTitles(values as JobTitles).subscribe((res)=>{
      debugger;
      this.isDataUploading = false;
      this.updateFieldList();
      this.titleForm.reset();
    })
  }

  openUpdtWndw(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-update'});
  }
  fieldForm = this.fb.group({
    sortNu: ['', Validators.required],
    jobSin: ['', Validators.required],
    jobEng: ['', Validators.required]
  })
  get ff(){
    return this.fieldForm.controls;
  }

  
  onUpdate(){
    this.isDataUploading = true;
    this.jobsService.updateJobFeild(this.selectedField).subscribe((res)=>{
      debugger;
      this.isDataUploading = false;
      this.getTables();
      this.update_message="Job field updated succesfully"
    })
  }

  deleteSelectedField(id:number){
    this.jobsService.deleteJobField(id).subscribe((res)=>{
      this.updateFieldList();
    });
  }
  
  openDltWndw(content: any,id:number) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(result=="Save click"){this.deleteSelectedField(id);}
    }, );
  }

  
}
