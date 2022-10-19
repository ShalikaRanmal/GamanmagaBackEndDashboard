import { JobDetails } from "./job-details.model";
import { JobRoads } from "./job-road.model";

export interface GetJobDetailsResponse{
    message : string;
    data : JobDetails[];
    road : JobRoads[];
}