import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddFieldResponse } from '../models/add-field-res.model';
import { GetJobDetailsResponse } from '../models/get-job-details-res.model';
import { GetJobFieldsResponse } from '../models/get-job-fields-res.model';
import { GetJobTitlesResponse } from '../models/get-job-titles-res.mocel';
import { JobDetails } from '../models/job-details.model';
import { JobFields } from '../models/job-fields.model';
import { JobRoads } from '../models/job-road.model';
import { JobTitles } from '../models/job-titles.model';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private baseUrl = 'http://localhost:8000/'
  constructor(private http :HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  getJobFields() : Observable<GetJobFieldsResponse>{
    return this.http.get<GetJobFieldsResponse> (`${this.baseUrl}api/job/fields`);
  }
  getJobTitles() : Observable<GetJobTitlesResponse>{
    return this.http.get<GetJobTitlesResponse> (`${this.baseUrl}api/job/titles`);
  }
  getJobTitlesById(id:any) : Observable<GetJobTitlesResponse>{
    return this.http.get<GetJobTitlesResponse> (`${this.baseUrl}api/job/titles/${id}`);
  }
  getJobDetails() : Observable<GetJobDetailsResponse>{
    return this.http.get<GetJobDetailsResponse> (`${this.baseUrl}api/job/details`);
  }
  getJobDetailsById(id:any) : Observable<GetJobDetailsResponse>{
    return this.http.get<GetJobDetailsResponse> (`${this.baseUrl}api/job/details/${id}`);
  }

  addJobFields(new_field : JobFields) : Observable<AddFieldResponse>{
    return this.http.post<AddFieldResponse> 
    (`${this.baseUrl}api/add/jobs`,
    new_field,
    this.httpOptions
    );
  }
  addJobTitles(new_title : JobTitles) : Observable<AddFieldResponse>{
    return this.http.post<AddFieldResponse> 
    (`${this.baseUrl}api/add/job/titles`,
    new_title,
    this.httpOptions
    );
  }
  addJobDetails(new_detail : JobDetails) : Observable<AddFieldResponse>{
    return this.http.post<AddFieldResponse> 
    (`${this.baseUrl}api/add/job/details`,
    new_detail,
    this.httpOptions
    );
  }
  addJobRoads(new_road : JobRoads) : Observable<AddFieldResponse>{
    debugger;
    return this.http.post<AddFieldResponse> 
    (`${this.baseUrl}api/add/job/roads`,
    new_road,
    this.httpOptions
    );
  }
  
  updateJobFeild(field : JobFields): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'api/edit/jobs', field);
  }
  updateJobTitle(title : JobTitles): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'api/edit/job/titles', title);
  }
  updateJobDetail(detail: JobDetails): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'api/edit/job/details', detail );
  }
  updateJobRoad(road : JobRoads): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'api/edit/job/roads', road);
  }

  deleteJobField(id:any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}api/delete/jobs/${id}`)
  }
  deleteJobTitle(id:any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}api/delete/job/title/${id}`)
  }
  deleteJobDetail(id:any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}api/delete/job/details/${id}`)
  }
  deleteJobRoad(id:any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}api/delete/job/roads/${id}`)
  }
}
