import { Injectable, ChangeDetectorRef } from '@angular/core';
import * as Excel from 'exceljs';
import * as fs from 'file-saver';
import { CourseIssueService } from '../../courseissue/services/course-issue.service';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseIssueExcelService {

  constructor(
    private ciService: CourseIssueService,
    private adataservice: AuthdataService,
    public loadService: LoaderService,
    private httpclient: HttpClient,
  ) { }

  async generateExcelForCourseSample() {
    let coursedata = [
      {
        'coursename': 'Bachelor Of Agriculture And Technology - Agronomy - International Students',
        'overview': '',
        'programcode': 'HEPIBAT',
        'courseurl': 'https://www.melbournepolytechnic.edu.au/study/bachelor/agriculture-and-technology/agronomy-international-students/',
        'studymode': 'On campus',
        'entryurl': '',
        'academicurl': '',
        'englishurl': '',
        'intakeurl': 'https://www.melbournepolytechnic.edu.au/students/academic-calendars/',
        'unitparttime': '',
        'durationparttime': '',
        'unitfulltime': '',
        'durationfulltime': '',
        'durationdisplay': '',
        'studylevel': 'Bachelor Degree',
        'unv': [
          {
            'universityname': 'Melbourne Polytechnic',
            'campus': 'Epping-|=070935F=,=Epping-|=070935F=,=Epping-|=070935F=,=Epping-|=070935F=,=Epping-|=070935F=,=Epping-|=070935F=,=Epping-|=070935F=,=Epping-|=070935F=,=Epping-|=070935F=,=Epping-|=070935F=,=Epping-|=070935F=,=Epping-|=070935F',
            'fees': '27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|==,=27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|==,=27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|==,=27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|==,=27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|==,=27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|==,=27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|==,=27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|==,=27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|==,=27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|==,=27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|==,=27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|=',
            'intake': 'February-|=February-|==,=July-|=July-|==,=February-|=February-|==,=July-|=July-|==,=February-|=February-|==,=July-|=July-|==,=February-|=February-|==,=July-|=July-|==,=February-|=February-|==,=July-|=July-|==,=February-|=February-|==,=July-|=July-|=',
            'english': '-|=-|=-|=-|=-|=-|=-|==,=-|=-|=-|=-|=-|=-|=-|==,=-|=-|=-|=-|=-|=-|=-|==,=-|=-|=-|=-|=-|=-|=-|==,=-|=-|=-|=-|=-|=-|=-|==,=-|=-|=-|=-|=-|=-|=-|==,=-|=-|=-|=-|=-|=-|=-|==,=-|=-|=-|=-|=-|=-|=-|==,=-|=-|=-|=-|=-|=-|=-|==,=-|=-|=-|=-|=-|=-|=-|==,=-|=-|=-|=-|=-|=-|=-|==,=-|=-|=-|=-|=-|=-|=-|=',
            'discipline': 'Agriculture, Environmental and Related Studies=,=Agriculture, Environmental and Related Studies=,=Agriculture, Environmental and Related Studies=,=Agriculture, Environmental and Related Studies=,=Agriculture, Environmental and Related Studies=,=Agriculture, Environmental and Related Studies=,=Agriculture, Environmental and Related Studies=,=Agriculture, Environmental and Related Studies=,=Agriculture, Environmental and Related Studies=,=Agriculture, Environmental and Related Studies=,=Agriculture, Environmental and Related Studies=,=Agriculture, Environmental and Related Studies',
            'Outcome': 'Station Manager=,=Station Manager=,=Farm Manager=,=Farm Manager=,=Agronomist=,=Agronomist=,=Farmer=,=Farmer=,=Agribusiness Owner=,=Agribusiness Owner=,=Rural Business Manager=,=Rural Business Manager'
          }
        ],
        'courseid': 'bachelorofagricultureandtechnologyagronomyinternationalstudents'
      },
      {
        'coursename': 'Bachelor Of Agriculture And Technology - Viticulture And Winemaking - International Students',
        'overview': '',
        'programcode': 'HEPIBAT',
        'courseurl': 'https://www.melbournepolytechnic.edu.au/study/bachelor/agriculture-and-technology/viticulture-and-winemaking-international-students/',
        'studymode': 'On campus',
        'entryurl': '',
        'academicurl': '',
        'englishurl': '',
        'intakeurl': 'https://www.melbournepolytechnic.edu.au/students/academic-calendars/',
        'unitparttime': '',
        'durationparttime': '',
        'unitfulltime': '',
        'durationfulltime': '',
        'durationdisplay': '',
        'studylevel': 'Bachelor Degree',
        'unv': [
          {
            'universityname': 'Melbourne Polytechnic',
            'campus': 'Epping-|=070935F=,=Epping-|=070935F=,=Epping-|=070935F=,=Epping-|=070935F=,=Epping-|=070935F=,=Epping-|=070935F=,=Epping-|=070935F=,=Epping-|=070935F=,=Epping-|=070935F=,=Epping-|=070935F=,=Epping-|=070935F=,=Epping-|=070935F=,=Epping-|=070935F=,=Epping-|=070935F=,=Epping-|=070935F=,=Epping-|=070935F',
            'fees': '27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|==,=27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|==,=27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|==,=27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|==,=27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|==,=27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|==,=27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|==,=27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|==,=27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|==,=27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|==,=27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|==,=27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|==,=27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|==,=27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|==,=27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|==,=27620-|=1-|=year-|=AUD-|=$13810 per semester, $27620 per year-|=$27620-|=',
            'intake': 'February-|=February-|==,=July-|=July-|==,=February-|=February-|==,=July-|=July-|==,=February-|=February-|==,=July-|=July-|==,=February-|=February-|==,=July-|=July-|==,=February-|=February-|==,=July-|=July-|==,=February-|=February-|==,=July-|=July-|==,=February-|=February-|==,=July-|=July-|==,=February-|=February-|==,=July-|=July-|=',
            'english': '-|=-|=-|=-|=-|=-|=-|==,=-|=-|=-|=-|=-|=-|=-|==,=-|=-|=-|=-|=-|=-|=-|==,=-|=-|=-|=-|=-|=-|=-|==,=-|=-|=-|=-|=-|=-|=-|==,=-|=-|=-|=-|=-|=-|=-|==,=-|=-|=-|=-|=-|=-|=-|==,=-|=-|=-|=-|=-|=-|=-|==,=-|=-|=-|=-|=-|=-|=-|==,=-|=-|=-|=-|=-|=-|=-|==,=-|=-|=-|=-|=-|=-|=-|==,=-|=-|=-|=-|=-|=-|=-|==,=-|=-|=-|=-|=-|=-|=-|==,=-|=-|=-|=-|=-|=-|=-|==,=-|=-|=-|=-|=-|=-|=-|==,=-|=-|=-|=-|=-|=-|=-|=',
            'discipline': 'Agriculture, Environmental and Related Studies=,=Agriculture, Environmental and Related Studies=,=Agriculture, Environmental and Related Studies=,=Agriculture, Environmental and Related Studies=,=Agriculture, Environmental and Related Studies=,=Agriculture, Environmental and Related Studies=,=Agriculture, Environmental and Related Studies=,=Agriculture, Environmental and Related Studies=,=Agriculture, Environmental and Related Studies=,=Agriculture, Environmental and Related Studies=,=Agriculture, Environmental and Related Studies=,=Agriculture, Environmental and Related Studies=,=Agriculture, Environmental and Related Studies=,=Agriculture, Environmental and Related Studies=,=Agriculture, Environmental and Related Studies=,=Agriculture, Environmental and Related Studies',
            'Outcome': 'Viticulturalist=,=Viticulturalist=,=Oeneologist (Winemaker)=,=Oeneologist (Winemaker)=,=Cellar Hand (Assistant Winemaker)=,=Cellar Hand (Assistant Winemaker)=,=Laboratory Technician=,=Laboratory Technician=,=Cellar Manager=,=Cellar Manager=,=Vineyard Manager=,=Vineyard Manager=,=Wine Exporter=,=Wine Exporter=,=Wine Retailer=,=Wine Retailer'
          }
        ],
        'courseid': 'bachelorofagricultureandtechnologyviticultureandwinemakinginternationalstudents'
      },
      {
        'coursename': 'Bachelor Of Laws Honours( Llb(hons)) In Law; Bachelor Of Laws (Llb) In Law',
        'overview': 'Do you believe that all people should have the right to access education, health, justice and opportunities to succeed? This is a concept known as social justice; it is based on a framework of human rights – and it’s what inspires many of our Law students to get the skills and knowledge they need to go out and stand up for the rights of others. In this degree, you’ll take a hands-on approach to the law and develop strong real-life legal skills through our clinical program with partners such as SCALES Community Legal Centre. In this program, you will work on real cases with real clients and get new insight into the legal system. You will also further develop your reasoning skills in our internationally-recognised mooting program. Mooting is a simulated court proceeding where you will be presented with a legal problem and argue it before a judge in our purpose-built courtroom.',
        'programcode': 'B1321',
        'courseurl': 'https://www.murdoch.edu.au/study/courses/course-details/law-(llb-llb(hons))#',
        'studymode': 'On campus',
        'entryurl': 'https://www.murdoch.edu.au/study/international-students/entry-requirements',
        'academicurl': 'https://www.murdoch.edu.au/study/international-students/entry-requirements',
        'englishurl': 'https://www.murdoch.edu.au/study/international-students/entry-requirements',
        'intakeurl': 'https://our.murdoch.edu.au/Committees/_document/Academic-Council/Academic-calendars/TNE-Calendar-2020.pdf',
        'unitparttime': '',
        'durationparttime': '',
        'unitfulltime': 'years',
        'durationfulltime': '',
        'durationdisplay': '',
        'studylevel': ' Undergraduate',
        'unv': [
          {
            'universityname': 'Murdoch University',
            'campus': 'Perth-|=006942E=,=Perth-|=006942E=,=Perth-|=006942E=,=Perth-|=006942E=,=Perth-|=006942E=,=Perth-|=006942E=,=Perth-|=006942E=,=Perth-|=006942E=,=Perth-|=006942E=,=Perth-|=006942E',
            'fees': '29713-|=1-|=year-|=AUD-|=Total fee 2020 : 118852, First year fee 2019 : 29131, Total fee 2019 : 118270, Welcome scholarship : 8000-|=29713-|==,=29713-|=1-|=year-|=AUD-|=Total fee 2020 : 118852, First year fee 2019 : 29131, Total fee 2019 : 118270, Welcome scholarship : 8000-|=29713-|==,=29713-|=1-|=year-|=AUD-|=Total fee 2020 : 118852, First year fee 2019 : 29131, Total fee 2019 : 118270, Welcome scholarship : 8000-|=29713-|==,=29713-|=1-|=year-|=AUD-|=Total fee 2020 : 118852, First year fee 2019 : 29131, Total fee 2019 : 118270, Welcome scholarship : 8000-|=29713-|==,=29713-|=1-|=year-|=AUD-|=Total fee 2020 : 118852, First year fee 2019 : 29131, Total fee 2019 : 118270, Welcome scholarship : 8000-|=29713-|==,=29713-|=1-|=year-|=AUD-|=Total fee 2020 : 118852, First year fee 2019 : 29131, Total fee 2019 : 118270, Welcome scholarship : 8000-|=29713-|==,=29713-|=1-|=year-|=AUD-|=Total fee 2020 : 118852, First year fee 2019 : 29131, Total fee 2019 : 118270, Welcome scholarship : 8000-|=29713-|==,=29713-|=1-|=year-|=AUD-|=Total fee 2020 : 118852, First year fee 2019 : 29131, Total fee 2019 : 118270, Welcome scholarship : 8000-|=29713-|==,=29713-|=1-|=year-|=AUD-|=Total fee 2020 : 118852, First year fee 2019 : 29131, Total fee 2019 : 118270, Welcome scholarship : 8000-|=29713-|==,=29713-|=1-|=year-|=AUD-|=Total fee 2020 : 118852, First year fee 2019 : 29131, Total fee 2019 : 118270, Welcome scholarship : 8000-|=29713-|=',
            'intake': 'February-|=24 February 2020-|==,=July-|=27 July 2020-|==,=February-|=24 February 2020-|==,=July-|=27 July 2020-|==,=February-|=24 February 2020-|==,=July-|=27 July 2020-|==,=February-|=24 February 2020-|==,=July-|=27 July 2020-|==,=February-|=24 February 2020-|==,=July-|=27 July 2020-|=',
            'english': 'An Academic International English Language Testing System (IELTS) overall score of 6.5 (with no band below 6.5) or equivalent scores for the Pearson Test of English (PTE) Academic, TOEFL iBT or the Occupational English Test (OET). An Academic International English Language Testing System (IELTS) overall score of 6.5 (with no band below 6.5) or equivalent scores for the Pearson Test of English (PTE) Academic, TOEFL iBT or the Occupational English Test (OET).-|=ielts-|=6.5-|=6.5-|=6.5-|=6.5-|=6.5-|==,=An Academic International English Language Testing System (IELTS) overall score of 6.5 (with no band below 6.5) or equivalent scores for the Pearson Test of English (PTE) Academic, TOEFL iBT or the Occupational English Test (OET). An Academic International English Language Testing System (IELTS) overall score of 6.5 (with no band below 6.5) or equivalent scores for the Pearson Test of English (PTE) Academic, TOEFL iBT or the Occupational English Test (OET).-|=ielts-|=6.5-|=6.5-|=6.5-|=6.5-|=6.5-|==,=An Academic International English Language Testing System (IELTS) overall score of 6.5 (with no band below 6.5) or equivalent scores for the Pearson Test of English (PTE) Academic, TOEFL iBT or the Occupational English Test (OET). An Academic International English Language Testing System (IELTS) overall score of 6.5 (with no band below 6.5) or equivalent scores for the Pearson Test of English (PTE) Academic, TOEFL iBT or the Occupational English Test (OET).-|=ielts-|=6.5-|=6.5-|=6.5-|=6.5-|=6.5-|==,=An Academic International English Language Testing System (IELTS) overall score of 6.5 (with no band below 6.5) or equivalent scores for the Pearson Test of English (PTE) Academic, TOEFL iBT or the Occupational English Test (OET). An Academic International English Language Testing System (IELTS) overall score of 6.5 (with no band below 6.5) or equivalent scores for the Pearson Test of English (PTE) Academic, TOEFL iBT or the Occupational English Test (OET).-|=ielts-|=6.5-|=6.5-|=6.5-|=6.5-|=6.5-|==,=An Academic International English Language Testing System (IELTS) overall score of 6.5 (with no band below 6.5) or equivalent scores for the Pearson Test of English (PTE) Academic, TOEFL iBT or the Occupational English Test (OET). An Academic International English Language Testing System (IELTS) overall score of 6.5 (with no band below 6.5) or equivalent scores for the Pearson Test of English (PTE) Academic, TOEFL iBT or the Occupational English Test (OET).-|=ielts-|=6.5-|=6.5-|=6.5-|=6.5-|=6.5-|==,=An Academic International English Language Testing System (IELTS) overall score of 6.5 (with no band below 6.5) or equivalent scores for the Pearson Test of English (PTE) Academic, TOEFL iBT or the Occupational English Test (OET). An Academic International English Language Testing System (IELTS) overall score of 6.5 (with no band below 6.5) or equivalent scores for the Pearson Test of English (PTE) Academic, TOEFL iBT or the Occupational English Test (OET).-|=ielts-|=6.5-|=6.5-|=6.5-|=6.5-|=6.5-|==,=An Academic International English Language Testing System (IELTS) overall score of 6.5 (with no band below 6.5) or equivalent scores for the Pearson Test of English (PTE) Academic, TOEFL iBT or the Occupational English Test (OET). An Academic International English Language Testing System (IELTS) overall score of 6.5 (with no band below 6.5) or equivalent scores for the Pearson Test of English (PTE) Academic, TOEFL iBT or the Occupational English Test (OET).-|=ielts-|=6.5-|=6.5-|=6.5-|=6.5-|=6.5-|==,=An Academic International English Language Testing System (IELTS) overall score of 6.5 (with no band below 6.5) or equivalent scores for the Pearson Test of English (PTE) Academic, TOEFL iBT or the Occupational English Test (OET). An Academic International English Language Testing System (IELTS) overall score of 6.5 (with no band below 6.5) or equivalent scores for the Pearson Test of English (PTE) Academic, TOEFL iBT or the Occupational English Test (OET).-|=ielts-|=6.5-|=6.5-|=6.5-|=6.5-|=6.5-|==,=An Academic International English Language Testing System (IELTS) overall score of 6.5 (with no band below 6.5) or equivalent scores for the Pearson Test of English (PTE) Academic, TOEFL iBT or the Occupational English Test (OET). An Academic International English Language Testing System (IELTS) overall score of 6.5 (with no band below 6.5) or equivalent scores for the Pearson Test of English (PTE) Academic, TOEFL iBT or the Occupational English Test (OET).-|=ielts-|=6.5-|=6.5-|=6.5-|=6.5-|=6.5-|==,=An Academic International English Language Testing System (IELTS) overall score of 6.5 (with no band below 6.5) or equivalent scores for the Pearson Test of English (PTE) Academic, TOEFL iBT or the Occupational English Test (OET). An Academic International English Language Testing System (IELTS) overall score of 6.5 (with no band below 6.5) or equivalent scores for the Pearson Test of English (PTE) Academic, TOEFL iBT or the Occupational English Test (OET).-|=ielts-|=6.5-|=6.5-|=6.5-|=6.5-|=6.5-|=',
            'discipline': 'Business & law=,=Business & law=,=Business & law=,=Business & law=,=Business & law=,=Business & law=,=Business & law=,=Business & law=,=Business & law=,=Business & law',
            'Academic': 'Academic integrity is an adherence to five fundamental values: honesty, trust, fairness, respect and responsibility in all work. Academic integrity is fundamental to the operation of all scholarship, whether it be original research or undergraduate assignments. It ensures that proper credit is given to those who do the work and that their intellectual contribution is acknowledged. It ensures that proper evaluation and feedback of performance can be given, and it buttresses the worth and reputation of academic awards on the basis they have been honestly earned. Murdoch University regards academic integrity as a fundamental value of student learning. It requires all students enrolled in the University to adhere to academic integrity in fulfilling each assessment task.=,=Academic integrity is an adherence to five fundamental values: honesty, trust, fairness, respect and responsibility in all work. Academic integrity is fundamental to the operation of all scholarship, whether it be original research or undergraduate assignments. It ensures that proper credit is given to those who do the work and that their intellectual contribution is acknowledged. It ensures that proper evaluation and feedback of performance can be given, and it buttresses the worth and reputation of academic awards on the basis they have been honestly earned. Murdoch University regards academic integrity as a fundamental value of student learning. It requires all students enrolled in the University to adhere to academic integrity in fulfilling each assessment task.=,=Academic integrity is an adherence to five fundamental values: honesty, trust, fairness, respect and responsibility in all work. Academic integrity is fundamental to the operation of all scholarship, whether it be original research or undergraduate assignments. It ensures that proper credit is given to those who do the work and that their intellectual contribution is acknowledged. It ensures that proper evaluation and feedback of performance can be given, and it buttresses the worth and reputation of academic awards on the basis they have been honestly earned. Murdoch University regards academic integrity as a fundamental value of student learning. It requires all students enrolled in the University to adhere to academic integrity in fulfilling each assessment task.=,=Academic integrity is an adherence to five fundamental values: honesty, trust, fairness, respect and responsibility in all work. Academic integrity is fundamental to the operation of all scholarship, whether it be original research or undergraduate assignments. It ensures that proper credit is given to those who do the work and that their intellectual contribution is acknowledged. It ensures that proper evaluation and feedback of performance can be given, and it buttresses the worth and reputation of academic awards on the basis they have been honestly earned. Murdoch University regards academic integrity as a fundamental value of student learning. It requires all students enrolled in the University to adhere to academic integrity in fulfilling each assessment task.=,=Academic integrity is an adherence to five fundamental values: honesty, trust, fairness, respect and responsibility in all work. Academic integrity is fundamental to the operation of all scholarship, whether it be original research or undergraduate assignments. It ensures that proper credit is given to those who do the work and that their intellectual contribution is acknowledged. It ensures that proper evaluation and feedback of performance can be given, and it buttresses the worth and reputation of academic awards on the basis they have been honestly earned. Murdoch University regards academic integrity as a fundamental value of student learning. It requires all students enrolled in the University to adhere to academic integrity in fulfilling each assessment task.=,=Academic integrity is an adherence to five fundamental values: honesty, trust, fairness, respect and responsibility in all work. Academic integrity is fundamental to the operation of all scholarship, whether it be original research or undergraduate assignments. It ensures that proper credit is given to those who do the work and that their intellectual contribution is acknowledged. It ensures that proper evaluation and feedback of performance can be given, and it buttresses the worth and reputation of academic awards on the basis they have been honestly earned. Murdoch University regards academic integrity as a fundamental value of student learning. It requires all students enrolled in the University to adhere to academic integrity in fulfilling each assessment task.=,=Academic integrity is an adherence to five fundamental values: honesty, trust, fairness, respect and responsibility in all work. Academic integrity is fundamental to the operation of all scholarship, whether it be original research or undergraduate assignments. It ensures that proper credit is given to those who do the work and that their intellectual contribution is acknowledged. It ensures that proper evaluation and feedback of performance can be given, and it buttresses the worth and reputation of academic awards on the basis they have been honestly earned. Murdoch University regards academic integrity as a fundamental value of student learning. It requires all students enrolled in the University to adhere to academic integrity in fulfilling each assessment task.=,=Academic integrity is an adherence to five fundamental values: honesty, trust, fairness, respect and responsibility in all work. Academic integrity is fundamental to the operation of all scholarship, whether it be original research or undergraduate assignments. It ensures that proper credit is given to those who do the work and that their intellectual contribution is acknowledged. It ensures that proper evaluation and feedback of performance can be given, and it buttresses the worth and reputation of academic awards on the basis they have been honestly earned. Murdoch University regards academic integrity as a fundamental value of student learning. It requires all students enrolled in the University to adhere to academic integrity in fulfilling each assessment task.=,=Academic integrity is an adherence to five fundamental values: honesty, trust, fairness, respect and responsibility in all work. Academic integrity is fundamental to the operation of all scholarship, whether it be original research or undergraduate assignments. It ensures that proper credit is given to those who do the work and that their intellectual contribution is acknowledged. It ensures that proper evaluation and feedback of performance can be given, and it buttresses the worth and reputation of academic awards on the basis they have been honestly earned. Murdoch University regards academic integrity as a fundamental value of student learning. It requires all students enrolled in the University to adhere to academic integrity in fulfilling each assessment task.=,=Academic integrity is an adherence to five fundamental values: honesty, trust, fairness, respect and responsibility in all work. Academic integrity is fundamental to the operation of all scholarship, whether it be original research or undergraduate assignments. It ensures that proper credit is given to those who do the work and that their intellectual contribution is acknowledged. It ensures that proper evaluation and feedback of performance can be given, and it buttresses the worth and reputation of academic awards on the basis they have been honestly earned. Murdoch University regards academic integrity as a fundamental value of student learning. It requires all students enrolled in the University to adhere to academic integrity in fulfilling each assessment task.',
            'Outcome': 'Lawyer=,=Lawyer=,=Solicitor or Barrister=,=Solicitor or Barrister=,=roles in federal, state or local government=,=roles in federal, state or local government=,=legal advisor in the corporate sector or a community legal centre=,=legal advisor in the corporate sector or a community legal centre=,=Legal Analyst.=,=Legal Analyst.'
          }
        ],
        'courseid': 'bachelorofagricultureandtechnologyviticultureandwinemaking'
      }
    ];
    this.generateExcelForCoursedetail(coursedata);
  }

  async generateExcelForCourse(universityid, studylevelid, issuetype) {
    let coursedata = [];
    // this.ciService.getCourseforexcel(universityid, studylevelid, issuetype).subscribe(data => {
    //   if (data.flag) {
    //     coursedata = (data.outdatalist[0] !== 'No Data Found') ? JSON.parse(data.outdatalist[0]) : [];
    //     this.generateExcelForCoursedetail(coursedata);
    //   }
    // });
  }
  async generateExcelForCoursedetail(coursedata) {
    const workbook = new Excel.Workbook();
    const coursedetails = workbook.addWorksheet('Course Details');
    const coursecampus = workbook.addWorksheet('Campus');
    const courseinatkes = workbook.addWorksheet('Inatkes');
    const coursefees = workbook.addWorksheet('Fees');
    const courseenglishrequirements = workbook.addWorksheet('English Requirements');
    const coursediscipline = workbook.addWorksheet('Course Discipline');
    const courseacademicreq = workbook.addWorksheet('Academic Requirements');
    const courseoutcome = workbook.addWorksheet('Course Outcome');
    const majorminor = workbook.addWorksheet('Major Minors');

    const coursedetailsheaders = [
      { header: 'RefNo', key: 'refbo', width: 8 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'University Name', key: 'uname', width: 30 },
      { header: 'Program Code', key: 'pcode', width: 15 },
      { header: 'Study Level', key: 'slevel', width: 20 },
      { header: 'Course Url', key: 'curl', width: 30 },
      { header: 'Overview', key: 'overview', width: 50 },
      { header: 'Studymode', key: 'smode', width: 20 },
      { header: 'Duration Discription', key: 'dd', width: 30 },
      { header: 'Duration Parttime', key: 'dp', width: 20 },
      { header: 'Unit Parttime', key: 'up', width: 20 },
      { header: 'Duration Fulltime', key: 'df', width: 20 },
      { header: 'Unit Fulltime', key: 'uf', width: 20 },
      { header: 'Entry Requirement Url', key: 'eru', width: 30 },
      { header: 'Academic Url', key: 'ac', width: 30 },
      { header: 'English Requirement Url', key: 'engru', width: 30 },
      { header: 'Intake Url', key: 'iu', width: 30 },
      { header: 'Major Minor Url', key: 'iu', width: 30 },
      { header: 'Application Fees', key: 'af', width: 30 },
      { header: 'courseid', key: 'af', width: 30 },
    ];
    const coursecampusheaders = [
      { header: 'RefNo', key: 'refbo', width: 15 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Cricos Code', key: 'ccode', width: 30 },
      { header: 'Course RefNo', key: 'crefno', width: 15 },
    ];
    const coursedisciplineheaders = [
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Course RefNo', key: 'crefno', width: 15 },
    ];

    const courseinatkesheaders = [
      { header: 'Date', key: 'data', width: 30 },
      { header: 'Month', key: 'month', width: 30 },
      { header: 'Campus RefNo', key: 'cmprefno', width: 30 },
    ];
    const coursefeesheaders = [
      { header: 'Amount', key: 'amount', width: 20 },
      { header: 'Currency', key: 'currency', width: 15 },
      { header: 'Duration', key: 'duration', width: 15 },
      { header: 'Duration unit', key: 'durationunit', width: 25 },
      { header: 'More Info', key: 'moreinfo', width: 30 },
      { header: 'Description', key: 'description', width: 30 },
      { header: 'Campus RefNo', key: 'cmprefno', width: 25 },
    ];
    const courseenglishrequirementsheaders = [
      { header: 'Description', key: 'description', width: 30 },
      { header: 'Type', key: 'type', width: 20 },
      { header: 'Listening', key: 'listening', width: 15 },
      { header: 'Reading', key: 'reading', width: 15 },
      { header: 'Writing', key: 'writing', width: 25 },
      { header: 'Speaking', key: 'speaking', width: 30 },
      { header: 'Overall', key: 'overall', width: 30 },
      { header: 'Course RefNo', key: 'cmprefno', width: 25 },
    ];

    const courseacademicheaders = [
      { header: 'Description', key: 'description', width: 30 },
      { header: 'Course RefNo', key: 'crefno', width: 15 },
    ];

    const courseoutcomeheaders = [
      { header: 'Description', key: 'description', width: 30 },
      { header: 'Course RefNo', key: 'crefno', width: 15 },
    ];

    const majorminorheaders = [
      { header: 'Type', key: 'type', width: 30 },
      { header: 'Description', key: 'description', width: 30 },
      { header: 'Course RefNo', key: 'crefno', width: 15 },
    ];

    coursedetails.columns = coursedetailsheaders;
    courseinatkes.columns = courseinatkesheaders;
    courseinatkes.getColumn('B').eachCell({ includeEmpty: true }, function (cell, rowNumber) {
      if (rowNumber != 1) {
        cell.dataValidation = {
          type: 'list',
          allowBlank: true,
          formulae: ['"January,February,March,April,May,June,July,August,September,October,November,December"'],
        };
      }
    });
    coursefees.columns = coursefeesheaders;
    courseenglishrequirements.columns = courseenglishrequirementsheaders;
    coursecampus.columns = coursecampusheaders;
    coursediscipline.columns = coursedisciplineheaders;
    courseacademicreq.columns = courseacademicheaders;
    courseoutcome.columns = courseoutcomeheaders;
    majorminor.columns = majorminorheaders;

    coursedata.forEach((cdata, cindex) => {
      const crow = ['C' + (cindex + 1), cdata.coursename, cdata.unv[0].universityname, cdata.programcode, cdata.studylevel, cdata.courseurl, cdata.overview, cdata.studymode,
      cdata.durationdisplay, cdata.durationparttime, cdata.unitparttime, cdata.durationfulltime, cdata.unitfulltime,
      cdata.entryurl, cdata.academicurl, cdata.englishurl, cdata.intakeurl, cdata.majorminorurl, cdata.applicationfees, cdata.courseid];
      coursedetails.addRow(crow);
      // adding campus
      const campus = (cdata.unv[0].campus) ? cdata.unv[0].campus.split('=,=') : [];
      const uniquecampus = campus.filter(function (item, pos) {
        return campus.indexOf(item) == pos;
      });
      uniquecampus.forEach((cmpdata, cmpindex) => {
        const campusdata = cmpdata.split('-|=')
        coursecampus.addRow(['C' + (cindex + 1) + '_CPS' + (cmpindex + 1), campusdata[0], campusdata[1], 'C' + (cindex + 1)]);
        // adding fees
        const fees = (cdata.unv[0].fees) ? cdata.unv[0].fees.split('=,=') : [];
        const uniquefees = fees.filter(function (item, pos) {
          return fees.indexOf(item) == pos;
        });
        uniquefees.forEach((feesdata, cfindex) => {
          feesdata = feesdata.split('-|=');
          coursefees.addRow([feesdata[0], feesdata[3], feesdata[1], feesdata[2], feesdata[4], feesdata[5], 'C' + (cindex + 1) + '_CPS' + (cmpindex + 1)]);
        });

        // adding intakes
        const inakes = (cdata.unv[0].intake) ? cdata.unv[0].intake.split('=,=') : [];
        const uniqueinakes = inakes.filter(function (item, pos) {
          return inakes.indexOf(item) == pos;
        });
        uniqueinakes.forEach((cidata, ciindex) => {
          cidata = cidata.split('-|=');
          courseinatkes.addRow([cidata[1], cidata[0], 'C' + (cindex + 1) + '_CPS' + (cmpindex + 1)]);
        });
      });

      // adding english requirements
      const english = (cdata.unv[0].english) ? cdata.unv[0].english.split('=,=') : [];
      const uniqueenglish = english.filter(function (item, pos) {
        return english.indexOf(item) == pos;
      });
      uniqueenglish.forEach((edata, ceindex) => {
        edata = edata.split('-|=');
        courseenglishrequirements.addRow([edata[0], edata[1], edata[2], edata[5], edata[4], edata[3], edata[6], 'C' + (cindex + 1)]);
      });

      // adding discipline
      const discipline = (cdata.unv[0].discipline) ? cdata.unv[0].discipline.split('=,=') : [];
      const uniquediscipline = discipline.filter(function (item, pos) {
        return discipline.indexOf(item) == pos;
      });
      uniquediscipline.forEach((ddata, cmpindex) => {
        ddata = ddata.split('-|=');
        coursediscipline.addRow([ddata[0], 'C' + (cindex + 1)]);
      });

      // adding outcome
      const Outcome = (cdata.unv[0].Outcome) ? cdata.unv[0].Outcome.split('=,=') : [];
      const uniqueOutcome = Outcome.filter(function (item, pos) {
        return Outcome.indexOf(item) == pos;
      });
      uniqueOutcome.forEach((Outcome, cmpindex) => {
        Outcome = Outcome.split('-|=');
        courseoutcome.addRow([Outcome[0], 'C' + (cindex + 1)]);
      });

      // adding academic

      const Academic = (cdata.unv[0].Academic) ? cdata.unv[0].Academic.split('=,=') : [];
      const uniqueAcademic = Academic.filter(function (item, pos) {
        return Academic.indexOf(item) == pos;
      });
      uniqueAcademic.forEach((Academic, cmpindex) => {
        Academic = Academic.split('-|=');
        courseacademicreq.addRow([Academic[0], 'C' + (cindex + 1)]);
      });

      // adding major and minors
      const mm = (cdata.unv[0].MM) ? cdata.unv[0].MM.split('=,=') : [];
      const uniquemm = mm.filter(function (item, pos) {
        return mm.indexOf(item) == pos;
      });
      uniquemm.forEach((cmpdata, cmpindex) => {
        const campusdata = cmpdata.split('-|=')
        majorminor.addRow([campusdata[1], campusdata[0], 'C' + (cindex + 1)]);
      });
    });
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Coursedetails.xlsx');
    });
  }
  getIdByName(name) {
    return name.replace(/\s/g, '').replace(/[\/]+/g, '_').toLowerCase();
  }
  importExcelForCourse(exceldata): Observable<any> {
    const CourseData = [];
    exceldata['Course Details'].forEach(element => {
      const coursedetails: any = {};
      // adding course details
      coursedetails.univ_id = this.getIdByName(element['University Name']);
      coursedetails.course_title = element['Name'];
      coursedetails.course_id = (element['courseid']) ? element['courseid'] : this.getIdByName(element['Name']);
      //coursedetails.basecourseid = this.getIdByName(element['Name']);
      coursedetails.program_code = element['Program Code'];
      coursedetails.application_fees = element['Application Fees'];
      coursedetails.course_study_mode = element['Studymode'];
      coursedetails.course_study_level = element['Study Level'];
      coursedetails.course_overview = element['Overview'];
      coursedetails.course_url = element['Course Url']
      coursedetails.course_duration = element['Duration Discription'];
      const duration = [
        {
          unit: element['Unit Fulltime'],
          duration: element['Duration Fulltime'],
          display: (element['Duration Fulltime'].toString().length > 0) ? 'Full-Time' : '',
          filterduration: (element['Duration Fulltime'].toString().length > 0) ? parseFloat(element['Duration Fulltime']) : ''
        },
        {
          unit: element['Overview'],
          duration: element['Duration Parttime'],
          display: (element['Duration Parttime'].toString().length > 0) ? 'Part-Time' : '',
          filterduration: (element['Duration Parttime'].toString().length > 0) ? parseFloat(element['Duration Parttime']) : ''
        }
      ];
      coursedetails.course_duration_display = duration;
      coursedetails.isfulltime = element['Duration Fulltime'].toString().length > 0;
      coursedetails.isparttime = element['Duration Parttime'].toString().length > 0;

      // adding campus data
      const cmpdata = exceldata['Campus'].filter(el => el['Course RefNo'] === element['RefNo']);
      // coursedetails.course_campus_location = cmpdata.map(data => {
      //   return { name: data.Name };
      // });
      coursedetails.course_campus_location = cmpdata.map((data: any) => {
        return { name: data.Name, code: data['Cricos Code'] };
      });
      coursedetails.course_career_outcome = exceldata['Course Outcome'].filter(el => el['Course RefNo'] === element['RefNo']).map(data => data.Description);
      coursedetails.course_discipline = exceldata['Course Discipline'].filter(el => el['Course RefNo'] === element['RefNo']).map(data => data.Name);

      // adding admission requirements
      const admission: any = {
        english: exceldata['English Requirements'].filter(el => el['Course RefNo'] === element['RefNo']).map((data) => {
          return {
            name: data.Type,
            description: data.Description,
            R: (data.Reading) ? parseFloat(data.Reading) : '',
            W: (data.Writing) ? parseFloat(data.Writing) : '',
            S: (data.Speaking) ? parseFloat(data.Speaking) : '',
            L: (data.Listening) ? parseFloat(data.Listening) : '',
            O: (data.Overall) ? parseFloat(data.Overall) : '',
            require: (data.Overall) ? parseFloat(data.Overall) : '',
            min: 0,
            max: 0
          }
        }),
        academic: exceldata['Academic Requirements'].filter(el => el['Course RefNo'] === element['RefNo']).map(data => data.Description),
        academic_requirements_url: element['Academic Url'],
        english_requirements_url: element['English Requirement Url'],
        entry_requirements_url: element['Entry Requirement Url']
      };
      coursedetails.course_admission_requirement = admission;

      // adding course outline

      const majors = exceldata['Major Minors'].filter(el => el['Course RefNo'] === element['RefNo'] && el['Type'] === 'major').map((data) => {
        return data.Description;
      });
      const minors = exceldata['Major Minors'].filter(el => el['Course RefNo'] === element['RefNo'] && el['Type'] === 'minor').map((data) => {
        return data.Description;
      });

      coursedetails.course_outline = {
        minors: minors,
        majors: majors,
        more_details: element['Major Minor Url']
      };
      // adding fees
      const fees: any = {
        fees: cmpdata.map((data) => {
          return {
            name: data.Name,
            value: {
              international_student:
                exceldata['Fees'].filter(el => el['Campus RefNo'] === data['RefNo']).map((feesdata) => {
                  return {
                    amount: (feesdata.Amount) ? parseFloat(feesdata.Amount) : 0,
                    duration: (feesdata.Duration) ? parseFloat(feesdata.Duration) : 0,
                    currency: feesdata.Currency,
                    unit: feesdata['Duration unit'],
                    description: feesdata.Description,
                  }
                })[0],
              currency: exceldata['Fees'].filter(el => el['Campus RefNo'] === data['RefNo']).map((feesdata) => {
                return feesdata.Currency
              })[0]
            },
          };
        }),
      };
      coursedetails.course_tuition_fee = fees;

      // adding  course intakes
      const intakes: any = {
        intake: cmpdata.map((data) => {
          return {
            name: data.Name,
            value: exceldata['Inatkes'].filter(el => el['Campus RefNo'] === data['RefNo']).map((inatkedata) => {
              return {
                actualdate: inatkedata.Date,
                month: inatkedata.Month,
              }
            })
          };
        }),
        more_details: element['Intake Url']
      };
      coursedetails.course_country = element['course_country'];
      coursedetails.course_intake = intakes;
      CourseData.push(coursedetails);
    });
    // this.loadService.loadme = true;
    const payload = {
      coursedata: CourseData,
      userid: this.adataservice.getUserId()
    };
    const req = new HttpRequest('POST', `${environment.API_URL}courses/au/v2/saveCourse`, payload, {
      reportProgress: true,
    });
    return this.httpclient.request(req);
    // this.ciService.saveCourse(CourseData, this.adataservice.getUserId()).subscribe(data => {
    //   if (data.flag) {
    //     this.loadService.loadme = false;
    //     this.mservice.generateMessage('SUCCESS', 'Course updated successfully.', 'SUCCESS');
    //   } else {
    //     this.loadService.loadme = false;
    //     this.mservice.generateMessage('ERROR', data.message, 'FAILED');
    //   }
    // });
  }
}
