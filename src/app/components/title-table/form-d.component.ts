import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal,  ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { JobDetails } from 'src/app/models/job-details.model';
import { JobTitles } from 'src/app/models/job-titles.model';
import { JobsService } from 'src/app/service/jobs.service';

@Component({
  selector: 'app-form-d',
  templateUrl: './form-d.component.html',
  styleUrls: ['./form-d.component.css']
})
export class FormDComponent implements OnInit {

  constructor(
    private jobService :  JobsService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private jobsService : JobsService) { }

  ngOnInit(): void {
    this.getTables()
  }

  
  public titles : JobTitles[] = [];
  
  selected_title! : JobTitles;
  title_rowIndex!: number;
  rowIndex! : number;
  closeResult = '';
  isDataUploading = false;
  update_message='';

  getTables(){
    this.jobService.getJobTitles().subscribe((res)=>{
      this.titles = res.data;
    });
  }
  public selectedTitle(selectedRow: number, title : JobTitles){
    this.title_rowIndex = selectedRow;
    this.selected_title = title;
  }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  descriptionForm = this.fb.group({
    sortNu: [0, Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required]
  }) 
  get f(){
    return this.descriptionForm.controls;
  }
  onSubmit(){
    const values = this.descriptionForm.value as unknown as JobDetails;
    values.t_id = this.selected_title.id;
    //this.isDataUploading = true;
    this.jobsService.addJobDetails(values as JobDetails).subscribe((res)=>{
      debugger;
      //this.isDataUploading = false;
      //this.fieldAddEvent.emit();
      this.descriptionForm.reset();
    })
  }
  openDltWindow(content: any,id:number) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(result=="Save click"){this.deleteSelectedTitle(id);}
    }, );
  }
  deleteSelectedTitle(id:number){
    this.jobsService.deleteJobTitle(id).subscribe((res)=>{
      this.getTables();
    });
  }

  openUpdtWndw(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-update'});
  }
  
  //for title update form
  titleForm = this.fb.group({
    sortNu: [0, Validators.required],
    jobSin: ['', Validators.required],
    jobEng: ['', Validators.required]
  })
  get ff(){
    return this.titleForm.controls;
  }
  onUpdate(){
    this.isDataUploading = true;
    this.jobsService.updateJobTitle(this.selected_title).subscribe((res)=>{
      debugger;
      this.isDataUploading = false;
      this.getTables();
      this.update_message="Job field updated succesfully"
    })
  }

}
