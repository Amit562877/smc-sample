export class CourseFilter {
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
}

export class Course {
    SRNO: number;
    id: string;
    coursename: string;
    courseurl: string;
    feeduration;
    feeamount;
    feeunit: string;
    durationfulltime: string;
    durationparttime: string;
    unitfulltime: string;
    unitparttime: string;
    campusname: string;
    logourl: string;
    universityname: string;
    studymode: string;
    filterdate: Date;
    currency: string;
    universityid: string;
    ischecked: boolean;
    universitynameid: string;
    coursenameid: string;
    courseoverview: string;
    programcode: string;
    intakedate: string;
    campusid: number;
    newId: string;
    overallcount: any;
}
export class Educationlevel {
    id: number;
    name: string;
}
export class Institutetype {
    id: number;
    univtype: string;
}
export class Intake {
    id: number;
    name: string;
}
export class Universitrylist {
    id: number;
    name: string;
}
export class Country {
    id: number;
    name: string;
}
export class State {
    id: number;
    name: string;
    countryid;
}
export class City {
    id: number;
    name: string;
    stateid;
}
export class Discipline {
    id: number;
    name: string;
}
export class Coursedetails {
    coursedata: Course[];
    educationleveldata: Educationlevel[];
    intakelist: Intake[];
    universitylist: Universitrylist[];
    countrylist: Country[];
    statelist: State[];
    citylist: City[];
    originalstatelist: State[];
    originalcitylist: City[];
    institutetypelist: Institutetype[];
    disciplinelist: Discipline[];
    postcodelist: any;
    coursecount: number;
}
export class AdvCoursedetails {
    coursedata: Course[];
    educationleveldata: Educationlevel[];
    intakelist: Intake[];
    universitylist: Universitrylist[];
    countrylist: Country[];
    statelist: State[];
    citylist: City[];
    originalstatelist: State[];
    originalcitylist: City[];
    institutetypelist: Institutetype[];
    disciplinelist: Discipline[];
    examtype: ExamType[];
    coursecount: number;
    criteriacountry: any;
    criteriaboardlist: any;
}
export class ExamType {
    type: '';
    R: '';
    W: '';
    L: '';
    S: '';
    O: '';
}

export class Searchhints {
    coursehint: any = [];
    coursehintcount = 0;
    universityhint: any = [];
    universityhintcount = 0;
    pageindex = 1;
    pagesize = 50;
    ismorepage = false;
}


