export class Criteria {
    id: any = 0;
    countryid: any = '';
    universitytypeid: any = 0;
    universityid: any = '';
    studylevelid: any = '';
    isapplicabletenth = true;
    tenth: any;
    isapplicabletwelfth = false;
    tweth: any;
    isapplicablebachelor = false;
    bachelor: any;
    isapplicablediploma = false;
    diploma: any;
    isgapallow = false;
    gapduration = 0;
    isworkexperienceapplicable = false;
    workexperience = 0;
    ismarriageapplicable = false;
    marriageduration: 0;
    spousequalification: '';
    spouseincome: 0;
    isimmigrationapplicable = false;
    isimmigrationrefusalallow = false;
    isimmigrationrefusalallowcases = false;
    
    excludeimgrationrefusalcountry: any = [];
    isspouseimmigrationapplicable = false;
    isimmigrationspouserefusalallow = false;
    isimmigrationspouserefusalallowcases = false;
    spouseexcludeimgrationrefusalcountry: any = [];
    fundinmonths = 0;
    isinterviewapplicable = false;
    ineterviewmediaid: any = 0;
    interviewprocess = '';
    remarks = '';
}
