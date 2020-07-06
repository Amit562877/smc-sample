import { Injectable } from '@angular/core';
import { CriteriaValues, ExamType } from '../models/advancefilter.model';

@Injectable({
  providedIn: 'root'
})
export class CourseFiltersService {

  constructor() { }
  pageindex = 1;
  pagesize = 20;
  searchstring = '';
  studylevelid = 0;
  minfees = 0;
  maxfees = 0;
  countryid = 0;
  stateid = 0;
  cityid = 0;
  duration = 0;
  coursetype = '';
  universityid = 0;
  institutetype = 0;
  disciplineid = 0;
  postcode = '';
  criteriaJSON: CriteriaValues[];
  etype = '';
  R = 0;
  W = 0;
  L = 0;
  S = 0;
  O = 0;
  userid = 0;
}


@Injectable({
  providedIn: 'root'
})
export class UniversityFiltersService {

  constructor() { }
  pageindex = 1;
  pagesize = 20;
  searchstring = '';
  countryid = 0;
  stateid = 0;
  cityid = 0;
  universitytype = 0;
}

@Injectable({
  providedIn: 'root'
})
export class CourseAdvancedFiltersService {

  constructor() { }
  pageindex = 1;
  pagesize = 20;
  searchstring = '';
  studylevelid = 0;
  minfees = 0;
  maxfees = 0;
  scountryid = 0;
  dcountryid = 0;
  stateid = 0;
  cityid = 0;
  duration = 0;
  coursetype = '';
  universityid = 0;
  institutetype = 0;
  disciplineid = 0;
}

@Injectable({
  providedIn: 'root'
})
export class ManageAdvanceFilter {
  pageindex = 1;
  pagesize = 20;
  country = '';
  univname = '';
  discipline = '';
  edulevel = '';
  coursetype = '';
  duration: number;
  maxfees = 0;
  criteriaJSON: CriteriaValues[];
  etype: string;
  R: number;
  W: number;
  L: number;
  S: number;
  O: number;
  isgapallow: boolean;
  isimmigrationrefusalallow: boolean;
  isimmigrationrefusalallowcases: boolean;
  excludeimgrationrefusalcountry: string;
  gapduration: number;
  isworkexperienceapplicable: boolean;
  workexperience: number;
}
