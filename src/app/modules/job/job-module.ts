
export interface Job{
  id :number,
  title:string,
  description:string,
  company:{name:string},
  location:{name:string}[],
  refs:{landing_page:string}
}

export interface MuseResponse{
  results:Job[],
  page:number,
  page_count:string,
  total:number
}