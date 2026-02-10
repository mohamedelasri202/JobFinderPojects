
export interface Job{
 id: number;
  name: string;     
  contents: string;
  company: { name: string };
  locations: { name: string }[];
  refs: { landing_page: string };
}

export interface MuseResponse{
  results:Job[],
  page:number,
  page_count:string,
  total:number
}