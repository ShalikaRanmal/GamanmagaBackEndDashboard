import { JobTitles } from "./job-titles.model";

export interface GetJobTitlesResponse{
    message : string;
    data : JobTitles[];
}