import { Injectable } from '@angular/core';
import * as Excel from 'exceljs';
import * as fs from 'file-saver';
import { CriteriaModule } from '../criteria.module';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(
  ) { }
  async generateExcelForCourseCriteraiSample(){
    const workbook=new Excel.Workbook()
    const header=["universitytypeid","universitytype","universityid","universityname","studylevelid","studylevelname","countryid","countryname"];
    const pg1=["1","Private","54","Box Hill Institute","1","Undergraduate","115",
  "Japan"]
    const selectedcriterais = workbook.addWorksheet('selectedcriterai');
    selectedcriterais.getColumn(1).width = 30
    selectedcriterais.getColumn(2).width = 60
    selectedcriterais.getColumn(3).width = 30
    selectedcriterais.getColumn(4).width = 30
    selectedcriterais.getColumn(5).width = 30
    selectedcriterais.getColumn(6).width = 30
    selectedcriterais.getColumn(7).width = 30
    selectedcriterais.getColumn(8).width = 30
    const headerRow = selectedcriterais.addRow(header);
    const headerRowData=selectedcriterais.addRow(pg1);

    const courses=workbook.addWorksheet('Courses')
    const headers=["id","name","select"]
    courses.getColumn(1).width = 30
    courses.getColumn(2).width = 60
    courses.getColumn(3).width = 30
    
    const course=[["9751","Bachelor Of Commerce (Applied)"],
                  ["9752","Associate Degree In Hospitality Management","yes"],
                  ["9755","Bachelor Of Applied Business In Music Industry","yes"],
                  ["9753","Bachelor Of Applied Music - Audio Production"],
                  ["9756","Associate Degree In Commerce (Applied)"],
                  	
                  
                ]
    const coursesheader=courses.addRow(headers) 
    course.forEach(d=>{
      const row = courses.addRow(d);
    })
    const country=workbook.addWorksheet('countrylist')
    const countryheader=["id","countryname","spouseexcludeimgrationrefusalcountry","excludeimgrationrefusalcountry"]

    const countrylist=[
          ["1","Afghanistan"],
          ["2","Aland Islands"],
          ["3","Albania","yes"],
          ["4","Algeria","yes","yes"],
          ["5","American Samoa"]
    ]
    const countryheaders=country.addRow(countryheader)
    country.getColumn(1).width = 30
    country.getColumn(2).width = 30
    country.getColumn(3).width = 30
    country.getColumn(4).width = 30
    
    //const countryheader=workbook.addRow()
    countrylist.forEach(d=>{
      const row = country.addRow(d);
    })

    const criteraies=workbook.addWorksheet('criterai')
    const criteraiheader=["NameOFtheCriterai","checkornot","Years","Month","spousequalification","spouseIncomebyyear","media","Interviewprocess","remarkcomment"]
    const criteraielist=[
      ["isapplicabletenth","TRUE"],
      ["isapplicabletwelfth","TRUE"],
      ["isapplicablebachelor","TRUE"],
      ["isapplicablediploma","TRUE"],
      ["isgapallow","TRUE",2],
      ["isworkexperienceapplicable","TRUE",3],
      ["ismarriageapplicable","TRUE",2,"","graduatation in commerce",200000],
      ["isimmigrationrefusalallow","TRUE"],
      ["isimmigrationrefusalallowcases","TRUE"],
      ["isimmigrationapplicable","TRUE"],
      ["isspouseimmigrationapplicable","TRUE"],
      ["isimmigrationspouserefusalallow","TRUE"],
      ["isimmigrationspouserefusalallowcases","TRUE"],
      ["isinterviewapplicable","TRUE","","","","","Linkdin","telephonic"],
      ["fundInformation","TRUE","",6],
      ["remark","TRUE","","","","","","","please check before save"]
      
    ]
    const criterais=criteraies.addRow(criteraiheader)

    criteraies.getColumn(1).width = 50
    criteraies.getColumn(2).width = 30
    criteraies.getColumn(2).width = 30
    criteraies.getColumn(3).width = 30
    criteraies.getColumn(4).width = 30
    criteraies.getColumn(5).width = 30
    criteraies.getColumn(6).width = 30
    criteraies.getColumn(7).width = 30
    criteraies.getColumn(8).width = 30
    criteraies.getColumn(9).width = 30
    criteraielist.forEach(d=>{
      const row = criteraies.addRow(d);
    })
    const education=workbook.addWorksheet('EducationRequirement')
    const educationheader=["Bid","Boardname","Requiredmarks","AttempsAllows","Boardtype"]
    const educationlist=[
      [1,"GujaratBoard",85,0,"tenth"],
      [2,"GujaratBoard",80,0,"twelfth"],
      [3,"cbse",85,0,"twelfth"],
      [4,"GujaratUniversity",65,0,"Diploma"],
      [5,"GujaratUniversity",65,0,"Bachelor"]
    ]
    const eduheader=education.addRow(educationheader)
    education.getColumn(1).width = 30
    education.getColumn(2).width = 30
    education.getColumn(3).width = 30
    education.getColumn(4).width = 30
    education.getColumn(5).width = 30

    educationlist.forEach(d=>{
      const row = education.addRow(d);
    })

    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'coursecriterai.xlsx');
    });

  } 

  async generateExcels(coursecriterai) {
    const workbook = new Excel.Workbook()
    const courses = ['id', 'name', 'select']
    const country = ['id', 'countryname', 'spouseexcludeimgrationrefusalcountry', 'excludeimgrationrefusalcountry']
    const selectedcriterai = ['universitytypeid', 'universitytype', 'universityid', 'universityname', 'studylevelid', 'studylevelname', 'countryid', 'countryname']
    const criteraiheader = ['NameOFtheCriterai', 'checkornot', 'Years', 'Month', 'spousequalification', 'spouseIncomebyyear', 'media', 'Interviewprocess', 'remarkcomment']
    const educations = ['Bid', 'Boardname', 'Requiredmarks', 'AttempsAllows', 'Boardtype']
    let arr = []
    let course, countrytbl, selectedcountry, studylevellist, utypelist, universitylist



    arr.push(coursecriterai)
    arr.forEach(element => {
      course = element.courses
      countrytbl = element.countrylist
      selectedcountry = element.countrylists
      studylevellist = element.studylevellist
      utypelist = element.universitytypelist,
        universitylist = element.universitylist

    })
    const selectedcriterais = workbook.addWorksheet('selectedcriterai');
    selectedcriterais.addRow(selectedcriterai);
    if (selectedcountry.length > 0 && studylevellist.length > 0 && utypelist.length > 0 && universitylist.length > 0) {
      // console.log('selectedcountry',selectedcountry[0].id)
      selectedcriterais.addRow([utypelist[0].id, utypelist[0].name, universitylist[0].id, universitylist[0].name, studylevellist[0].id, studylevellist[0].name,
      selectedcountry[0].id, selectedcountry[0].name])
    }
    selectedcriterais.getColumn(1).width = 30
    selectedcriterais.getColumn(2).width = 30
    selectedcriterais.getColumn(3).width = 30
    selectedcriterais.getColumn(4).width = 30
    selectedcriterais.getColumn(5).width = 30
    selectedcriterais.getColumn(6).width = 30
    selectedcriterais.getColumn(7).width = 30
    selectedcriterais.getColumn(8).width = 30
    const worksheet = workbook.addWorksheet('Courses');
    worksheet.addRow(courses);
    if (course.length > 0) {
      for (let i = 0; i < course.length; i++) {
        worksheet.addRow([course[i].id, course[i].name])
      }
    }
    worksheet.getColumn(1).width = 10
    worksheet.getColumn(2).width = 90
    const worksheets = workbook.addWorksheet('countrylist');
    worksheets.addRow(country);
    if (countrytbl.length > 0) {
      for (let i = 0; i < countrytbl.length; i++) {
        worksheets.addRow([countrytbl[i].id, countrytbl[i].name])
      }
    }
    worksheets.getColumn(1).width = 10
    worksheets.getColumn(2).width = 40
    worksheets.getColumn(3).width = 60
    worksheets.getColumn(4).width = 60
    const criterai = workbook.addWorksheet('criterai');
    criterai.addRow(criteraiheader)
    criterai.getColumn(1).values = ['NameOFtheCriterai', 'isapplicabletenth', 'isapplicabletwelfth', 'isapplicablebachelor', 'isapplicablediploma',
      'isgapallow', 'isworkexperienceapplicable', 'ismarriageapplicable', 'isimmigrationrefusalallow', 'isimmigrationrefusalallowcases', 'isimmigrationapplicable', 'isspouseimmigrationapplicable', 'isimmigrationspouserefusalallow',
      'isimmigrationspouserefusalallowcases', 'isinterviewapplicable', 'fundInformation', 'remark'];
    criterai.getColumn(1).width = 30
    criterai.getColumn(2).width = 30
    criterai.getColumn(3).width = 30
    criterai.getColumn(4).width = 30
    criterai.getColumn(5).width = 30
    criterai.getColumn(6).width = 30
    criterai.getColumn(7).width = 30
    criterai.getColumn(8).width = 30
    criterai.getColumn(9).width = 30



    const education = workbook.addWorksheet('EducationRequirement');
    // let titleRow=education.addRow(['*BoardType must be like tenth,twelveth,diploma,bachelor'])
    // education.mergeCells('A1:C1');
    //titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true ,color: { argb: 'FF0000' }}


    education.addRow(educations)
    education.getColumn(1).width = 30
    education.getColumn(2).width = 30
    education.getColumn(3).width = 30
    education.getColumn(4).width = 30
    education.getColumn(5).width = 30

    // let titleRow=education.addRow(['*BoardType must be like tenth,twelveth,diploma,bachelor'])
    //  education.mergeCells('A32:C32');
    // var row = education.getRow(32);
    //row.getCell(1).value = '*BoardType must be like tenth,twelveth,diploma,bachelor';
    // row.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true ,color: { argb: 'FF0000' }}


    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'coursecriterais_new.xlsx');
    });

  }

  async generateExcel(coursecriterai) {

    const title = 'CourseCriteria';
    let arr = []
    let cid, aid, tenthid, twelvethid, blebachelorid, diplomaid, gapduration, isgapallow, isworkexperienceapplicable, workexperience, fundinfo, tenthreq, twelvethreq, diplomareq, bachelorreq, immigrationreq, simmigration;
    let isspouseimmigrationapplicable, isimmigrationspouserefusalallow, spouseexcludeimgrationrefusalcountry, isimmigrationspouserefusalallowcases
    let bid, bname, attempts, require, srequirement, marriageduration, spousequalification, spouseincome, interview, isinterviewapplicable, interviewtype, process, isimmigrationapplicable, isimmigrationrefusalallow, excludeimgrationrefusalcountry, isimmigrationrefusalallowcases;
    arr.push(coursecriterai)
    const header = ['Id', 'CountryID', 'isapplicabletenth', 'isapplicabletwelveth', 'isapplicablebachelor', 'isapplicablediploma'
      , 'isgapallow', 'gapduration', 'isworkexperienceapplicable', 'workexperience', 'fundmonth'
      , 'marriageduration', 'spousequalification', 'spouseincome', 'isinterviewapplicable', 'media', 'process',
      'isimmigrationapplicable', 'isimmigrationrefusalallow', 'isimmigrationrefusalallowcases', 'excludeimgrationrefusalcountry', 'isspouseimmigrationapplicable', 'isimmigrationspouserefusalallow', 'isimmigrationspouserefusalallowcases', 'spouseexcludeimgrationrefusalcountry',
      'BID', 'BoardName', 'Required', 'Gapsallow', 'Twelvethbid', 'Twelvethboardname', 'Twelvethrequired', 'Twelvethgapallow',
      'Diplomaid', 'DiplomaBoardname', 'Diplomarequired', 'Diplomagapallow', 'Bachelorid', 'Bachelorboardname', 'Bachelorrequired', 'Bachelorgapallow'];
    //const headers=['BID','BoardName','Required','Gapsallow'];
    arr.forEach(element => {
      cid = element.countryid
      aid = element.isapplicable
      srequirement = element.spusestudy
      interview = element.interview
      tenthreq = element.tentharray
      twelvethreq = element.twelvetharr
      diplomareq = element.diplomaarr
      bachelorreq = element.bachelorarr
      immigrationreq = element.immigrationhistory
      simmigration = element.simmigration

      aid.forEach(datas => {
        //console.log('datas',datas.Name=='isapplicabletenth')
        if (datas.Name == 'isapplicabletenth') {
          tenthid = datas.value

        } else if (datas.Name == 'isapplicabletwelfth') {
          twelvethid = datas.value
        } else if (datas.Name == 'isapplicablebachelor') {
          blebachelorid = datas.value
        } else if (datas.Name == 'isapplicablediploma') {
          diplomaid = datas.value
        }
        else if (datas.Name == 'isgapallow') {
          isgapallow = true
          gapduration = datas.value.toString()

        }
        else if (datas.Name == 'isworkexperienceapplicable') {
          isworkexperienceapplicable = true,
            workexperience = datas.value.toString()

        }
        else if (datas.Name == 'fundInformation') {
          fundinfo = datas.value.toString()
        }
      })
      if (srequirement.length > 0) {
        srequirement.forEach(data => {
          marriageduration = data.years.toString(),
            spousequalification = data.squalifiction,
            spouseincome = data.sincome.toString()


        })
      }
      if (interview.length > 0) {
        interview.forEach(datas => {
          isinterviewapplicable = true,
            interviewtype = datas.value,
            process = datas.process
        })
      }
      //{isimmigrationrefusalallow: true, isimmigrationapplicable: true, excludeimgrationrefusalcountry: 39}

      if (immigrationreq.length > 0) {
        immigrationreq.forEach(datas => {
          isimmigrationapplicable = datas.isimmigrationapplicable
          isimmigrationrefusalallow = datas.isimmigrationrefusalallow,
            isimmigrationrefusalallowcases = datas.isimmigrationrefusalallowcases,
            excludeimgrationrefusalcountry = datas.excludeimgrationrefusalcountry.toString()
        })
      }

      if (simmigration.length > 0) {
        simmigration.forEach(datas => {
          isspouseimmigrationapplicable = datas.isspouseimmigrationapplicable
          isimmigrationspouserefusalallow = datas.isimmigrationspouserefusalallow,
            isimmigrationspouserefusalallowcases = datas.isimmigrationspouserefusalallowcases,
            spouseexcludeimgrationrefusalcountry = datas.spouseexcludeimgrationrefusalcountry.toString()
        })
      }

    })
    const data = [
      [1, cid, tenthid, twelvethid, diplomaid, blebachelorid, isgapallow, gapduration, isworkexperienceapplicable
        , workexperience, fundinfo, marriageduration, spousequalification, spouseincome, isinterviewapplicable, interviewtype, process,
        isimmigrationapplicable, isimmigrationrefusalallow, isimmigrationrefusalallowcases, excludeimgrationrefusalcountry, isspouseimmigrationapplicable, isimmigrationspouserefusalallow, isimmigrationspouserefusalallowcases, spouseexcludeimgrationrefusalcountry
      ],

    ];




    // Create workbook and worksheet
    const workbook = new Excel.Workbook()
    const worksheet = workbook.addWorksheet('Course_Criteria');
    // Add Header Row
    const headerRow = worksheet.addRow(header);
    //const headerss=worksheet.addRow(headers)

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });

    data.forEach(d => {
      worksheet.addRow(d)

      if (tenthreq.length > 0) {
        for (let i = 0; i < tenthreq.length; i++) {

          if (twelvethreq.length > 0) {
            worksheet.addRow(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', tenthreq[i].Bid, tenthreq[i].Boardname, tenthreq[i].Required, tenthreq[i].gapallow,
              twelvethreq[i].Tbid, twelvethreq[i].Tboardaname, twelvethreq[i].Trequiredmarks, twelvethreq[i].Tgapallow, diplomareq[i].dbid, diplomareq[i].dboardaname,
              diplomareq[i].drequiredmarks, diplomareq[i].dgapallow, bachelorreq[i].Bbid, bachelorreq[i].Bboardaname, bachelorreq[i].Brequiredmarks, bachelorreq[i].Bgapallow
            ]);
          } else if (diplomareq.length > 0) {
            worksheet.addRow(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', tenthreq[i].Bid, tenthreq[i].Boardname, tenthreq[i].Required, tenthreq[i].gapallow,
              '', '', '', '', diplomareq[i].dbid, diplomareq[i].dboardaname,
              diplomareq[i].drequiredmarks, diplomareq[i].dgapallow, bachelorreq[i].Bbid, bachelorreq[i].Bboardaname, bachelorreq[i].Brequiredmarks, bachelorreq[i].Bgapallow
            ]);
          }


        }
      }

    });


    worksheet.getColumn(3).width = 30;
    worksheet.getColumn(2).width = 10;

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'coursecriterai.xlsx');
    });
  }

}
