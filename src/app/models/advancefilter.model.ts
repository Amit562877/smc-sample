export class AdvanceFilter {
    scountry: number = 0;
    prevedulevel = '';
    etype = '';
    R = '';
    W = '';
    L = '';
    S = '';
    O = '';
    criteria: CriteriaValues[];
    isworkexperienceapplicable: boolean;
    isgapallow: boolean;
    gapduration: number;
    workexperience: number;
    isimmigrationrefusalallow: boolean;
    isimmigrationrefusalallowcases: boolean;
    excludeimgrationrefusalcountry: [];
}

export class Country {
    country: '';
    state: '';
    city: '';
}

export class ExamType {
    etype: '';
    R: '';
    W: '';
    L: '';
    S: '';
    O: '';
}

export class CriteriaValues {
    boardtype: '';
    boardname: '';
    marksobtained: '';
    attemptsmade: '';
}
