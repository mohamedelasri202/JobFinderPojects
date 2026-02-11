
export interface Job {
  id: string;
  name: string;
  contents: string;
  publication_date: string;
  locations: { name: string }[];
  categories: { name: string }[];
  levels: { name: string }[];
  company: { name: string };
  refs: { landing_page: string };
}
export interface JobResponse {
  page: number;
  page_count: number;
  items_per_page: number;
  total: number;
  results: Job[];
}