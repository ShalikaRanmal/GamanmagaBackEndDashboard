import { JobFields } from "./job-fields.model";

export interface GetJobFieldsResponse{
    message : string;
    data : JobFields[];
}