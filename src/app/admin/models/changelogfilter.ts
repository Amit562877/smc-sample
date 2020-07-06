declare const moment: any;
export class ChangeLogFilter {
    status = 1;
    logtype = 0;
    universityid = '';
    isresponsegenerated = -1;
    pageindex = 1;
    pagesize = 10;
    startdate = moment().format('YYYY-MM-DD');
    enddate = moment().format('YYYY-MM-DD');
}
