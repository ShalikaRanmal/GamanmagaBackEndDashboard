import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobDetails } from 'src/app/models/job-details.model';
import { JobRoads } from 'src/app/models/job-road.model';
import { JobsService } from 'src/app/service/jobs.service';

@Component({
  selector: 'app-detail-tbl',
  templateUrl: './detail-tbl.component.html',
  styleUrls: ['./detail-tbl.component.css']
})
export class DetailTblComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private jobsService : JobsService
  ) { }

  ngOnInit(): void {
    this.getDetails()
  }
  
  public details : JobDetails[] = [];
  public roads : JobRoads[] = [];
  rowIndex! : number;
  rowIndexroad! : number;
  selected_detail! : JobDetails;
  selected_road! : JobRoads;
  isDataUploading = false;
  closeResult = '';
  update_message = '';


  getDetails(){
    this.jobsService.getJobDetails().subscribe((res)=>{
      this.details = res.data;
      this.roads = res.road;
    })
  }
  public selectedDetail(selectedRow: number, detail : JobDetails){
    this.rowIndex = selectedRow;
    this.selected_detail = detail;
  }  
  public selectedRoads(selectedRow: number, road : JobRoads){
    this.rowIndexroad = selectedRow;
    this.selected_road = road;
  } 
  roadForm = this.fb.group({
    sortNu: [0, Validators.required],
    road: ['', Validators.required],
    path: ['', Validators.required]
  })
  
  openAddDetail(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }


  get f(){
    return this.roadForm.controls;
  }
  onSubmit(){
    debugger;
    const values = this.roadForm.value as JobRoads;
    values.t_id = this.selected_detail.t_id;
    values.road_id = this.selected_detail.id;
    this.isDataUploading = true;
    this.jobsService.addJobRoads(values as JobRoads).subscribe((res)=>{
      debugger;
      this.getDetails();
      this.isDataUploading = false;
      //this.fieldAddEvent.emit();
      this.roadForm.reset();
    })  
  }
  deleteSelecteDetail(id :number){
    this.jobsService.deleteJobDetail(id).subscribe((res)=>{
    this.getDetails();
    });
  }
  openDtlDltWndw(content: any,id:number) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(result=="Save click"){this.deleteSelecteDetail(id);}
    }, );
  }

  deleteSelectedRoad(id:number){
      this.jobsService.deleteJobRoad(id).subscribe((res)=>{
      this.getDetails();
      });
  }
  openDltWndw(content: any,id:number) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(result=="Save click"){this.deleteSelectedRoad(id);}
    }, );
  }

  openUpdtWndw(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-update'});
  }
  descriptionForm = this.fb.group({
    sortNu: [0, Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required]
  })
  get ff(){
    return this.descriptionForm.controls;
  }
  onUpdate(){
    this.isDataUploading = true;
    this.jobsService.updateJobDetail(this.selected_detail).subscribe((res)=>{
      debugger;
      this.isDataUploading = false;
      this.getDetails();
      this.update_message="Job field updated succesfully"
    })
  }

  openRdUpWndo(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-update'});
  }
  u_roadForm = this.fb.group({
    sortNu: [0, Validators.required],
    road: ['', Validators.required],
    path: ['', Validators.required]
  })
  get fff(){
    return this.u_roadForm.controls;
  }
  onRdUpdate(){
    this.isDataUploading = true;
    this.jobsService.updateJobRoad(this.selected_road).subscribe((res)=>{
      debugger;
      this.isDataUploading = false;
      this.getDetails();
      this.update_message="Job road updated succesfully"
    })
  }
}
