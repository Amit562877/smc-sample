import { Injectable } from '@angular/core';
import * as Excel from 'exceljs';
import * as fs from 'file-saver';
import { McampuslocationService } from './mcampuslocation.service';
import { Observable } from 'rxjs';
import { HttpRequest, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class McampuslocationExcelService {
  constructor(
    private mcampusloc: McampuslocationService,
    private httpclient: HttpClient,
  ) { }
  async generateExcelForUnivSample() {
    let univdata = [
      {
        "id": 108,
        "universitydata": "{\r\n  \"univ_id\": \"humber\",\r\n  \"univ_url\": \"https://humber.ca/\",\r\n  \"univ_name\": \"Humber Collage\",\r\n  \"univ_country\": \"Canada\",\r\n  \"univ_about\": \"The Office of the Registrar supports and celebrates your success. For ease of access, most of our services are available online, including information on admissions, fees, financial aid, course registration, academic progress and official documents like transcripts. We maintain the accuracy and integrity of your academic information. Using our in-depth knowledge of policies and procedures we provide you with relevant information about Humber’s academic requirements and regulations to assist in your success.\",\r\n  \"univ_logo\": \"univ_hum/univ_logo.png\",\r\n  \"univ_accomodation\": {\r\n    \"applicant\": 10000,\r\n    \"currency\": \"CAD\",\r\n    \"more_details\": \"https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/student-direct-stream.html\",\r\n    \"more_details_univ_website\": \"https://international.humber.ca/student-services/housing.html\"\r\n  },\r\n  \"university_type\": \"Private\",\r\n  \"univ_rankings\": {\r\n    \"rankings\": []\r\n  },\r\n  \"apply_url\": \"https://international.humber.ca/study-at-humber/application-process.html\",\r\n  \"placement_url\": \"\",\r\n  \"brochure_path\": [\r\n    {\r\n      \"name\": \"univ_hum/hum_1.pdf\",\r\n      \"text\": \"Brochure for humber Guide\"\r\n    }\r\n  ],\r\n  \"application_fee\": \"75\",\r\n  \"facebook_page_name\": \"Humber\",\r\n  \"twitter_page_name\": \"HumberGlobal\",\r\n  \"abbreviation\": \"\",\r\n  \"youtube_page_name\": \"HumberInternational\",\r\n  \"googlerating\": 4.3,\r\n  \"contactInformation\": [\r\n    {\r\n      \"address\": \"205 Humber College Blvd., Toronto, Ontario, Canada M9W 5L7\",\r\n      \"inquiry_no\": [],\r\n      \"place_id\": \"ChIJ4TdCBK07K4gR4CCHMx1V8Tc\",\r\n      \"contact_info\": [\r\n        {\r\n          \"name\": \"\",\r\n          \"phone_no\": \"14166753111\",\r\n          \"fax\": \"\",\r\n          \"email_address\": \"\",\r\n          \"description\": \"\"\r\n        }\r\n      ],\r\n      \"city\": \"Toronto Division\",\r\n      \"state\": \"Ontario\",\r\n      \"country\": \"Canada\",\r\n      \"overview\": \"\",\r\n      \"name\": \"Humber Collage\",\r\n      \"type\": \"University\",\r\n      \"latlong\": {\r\n        \"lat\": 43.7288425,\r\n        \"lng\": -79.6067281\r\n      }\r\n    },\r\n    {\r\n      \"name\": \"Lakeshore Campus\",\r\n      \"overview\": \"Located just west of Toronto on the shore of Lake Ontario, the Lakeshore campus offers beautiful historic architecture, modern conveniences and lots of ways to connect with nature.\",\r\n      \"additional_info\": \"\",\r\n      \"address\": \"2 Colonel Samuel Smith Park Drive, Toronto, Ontario, Canada M8V 4B6\",\r\n      \"inquiry_no\": [],\r\n      \"place_id\": \"ChIJeYa55jVIK4gRT4x8CQvxpFw\",\r\n      \"contact_info\": [],\r\n      \"city\": \"Toronto Division\",\r\n      \"state\": \"Ontario\",\r\n      \"country\": \"Canada\",\r\n      \"type\": \"Campus\",\r\n      \"latlong\": {\r\n        \"lat\": 43.5964977,\r\n        \"lng\": -79.5205953\r\n      }\r\n    },\r\n    {\r\n      \"name\": \"Orangeville Campus\",\r\n      \"overview\": \"Located 45 minutes north of Toronto, the Orangeville campus is home to a close-knit, thriving community. Students have access to a number of in-demand programs and services.\",\r\n      \"additional_info\": \"\",\r\n      \"address\": \"275 Alder Street, Alder Street Recreation Complex, Orangeville, Ontario, Canada L9W 5A9\",\r\n      \"inquiry_no\": [],\r\n      \"place_id\": \"ChIJmWTZViOqK4gRrD9CmpFx5GA\",\r\n      \"contact_info\": [],\r\n      \"city\": \"Dufferin County\",\r\n      \"state\": \"Ontario\",\r\n      \"country\": \"Canada\",\r\n      \"type\": \"Campus\",\r\n      \"latlong\": {\r\n        \"lat\": 43.905973400000008,\r\n        \"lng\": -80.12540349999999\r\n      }\r\n    }\r\n  ]\r\n}",
        "uc": []
      },
      {
        "id": 109,
        "universitydata": "{\r\n  \"univ_id\": \"federationuniversityaustralia\",\r\n  \"univ_name\": \"Federation University Australia\",\r\n  \"univ_country\": \"Australia\",\r\n  \"univ_url\": \"https://federation.edu.au/\",\r\n  \"university_type\": \"Government\",\r\n  \"univ_about\": \"As a young university, we have the energy and optimism of youth combined with the knowledge and experience that comes from our history as one of the oldest universities in Australia, dating back to 1870. We are a diverse community with over 24,000 domestic and international students and 110,000 alumni across Australia and the world. We are creating a Federation of independent thinkers, of like-minded individuals who are determined to make their mark.\",\r\n  \"facebook_page_name\": \"FedUniAustralia\",\r\n  \"twitter_page_name\": \"feduniaustralia\",\r\n  \"youtube_page_name\": \"FedUniAustralia\",\r\n  \"abbreviation\": \"fed uni\",\r\n  \"application_fee\": \"Students who apply through the Online Application Centre will attract a $25 application fee. Students who submit a paper-based application (pdf, 372kb) will attract a $50 application fee.\",\r\n  \"placement_url\": \"https://federation.edu.au/international/education-partnerships/current-partners\",\r\n  \"apply_url\": \"https://federation.edu.au/international/study-at-feduni/apply/submit-your-application/apply-directly-to-feduni\",\r\n  \"googlerating\": 3.6,\r\n  \"univ_accomodation\": {\r\n    \"more_details\": \"https://www.studyinaustralia.gov.au/english/live-in-australia/living-costs\",\r\n    \"more_details_univ_website\": \"https://federation.edu.au/about-us/facilities-and-services/campus-life/accommodation/accommodation-options/halls-of-residence-list\",\r\n    \"applicant\": 20290,\r\n    \"partner\": 7100,\r\n    \"child\": 3040\r\n  },\r\n  \"univ_rankings\": {\r\n    \"rankings\": [\r\n      {\r\n        \"name\": \"Ranking Web of Universities\",\r\n        \"level\": [\r\n          {\r\n            \"name\": \"World\",\r\n            \"value\": \"1126\"\r\n          },\r\n          {\r\n            \"name\": \"Australia\",\r\n            \"value\": \"37\"\r\n          }\r\n        ]\r\n      }\r\n    ]\r\n  },\r\n  \"contactInformation\": [\r\n    {\r\n      \"name\": \"Federation University Australia\",\r\n      \"overview\": \"\",\r\n      \"address\": \"University Dr, Mount Helen VIC 3350, Australia\",\r\n      \"place_id\": \"ChIJh_Zqsb9a0WoRIMP9bxDgJsk\",\r\n      \"contact_info\": [\r\n        {\r\n          \"name\": \"\",\r\n          \"phone_no\": \"+611800333864\",\r\n          \"fax\": \"\",\r\n          \"email_address\": \"info@federation.edu.au\",\r\n          \"description\": \"\"\r\n        }\r\n      ],\r\n      \"inquiry_no\": [\r\n        \"+611800333864\"\r\n      ],\r\n      \"country\": \"Australia\",\r\n      \"city\": \"Ballarat\",\r\n      \"state\": \"Victoria\",\r\n      \"type\": \"University\"\r\n    },\r\n    {\r\n      \"name\": \"SMB Campus\",\r\n      \"overview\": \"Located in the heart of Ballarat, the SMB Campus (formerly known as School of Mines Ballarat) provides modern teaching facilities within an attractive, historic environment dating back to 1870. The traditional custodians for this area are the Wadawurrung peoples.Technical education for years 11 and 12 students is provided at this campus.\",\r\n      \"additional_info\": \"\",\r\n      \"address\": \"107 Lydiard St S, Ballarat Central VIC 3350, Australia\",\r\n      \"place_id\": \"ChIJc8osEvpE0WoRUBVDFKV5BQ8\",\r\n      \"contact_info\": [],\r\n      \"inquiry_no\": [\r\n        \"1800333864\"\r\n      ],\r\n      \"country\": \"Australia\",\r\n      \"city\": \"Ballarat\",\r\n      \"state\": \"Victoria\",\r\n      \"type\": \"Campus\"\r\n    },\r\n    {\r\n      \"name\": \"Camp Street\",\r\n      \"overview\": \"Both new and historic buildings have been cleverly integrated to create a dynamic and vibrant arts and cultural environment of international significance and a central precinct for the University's visual and performing arts. The traditional custodians for this area are the Wadawurrung peoples.\",\r\n      \"additional_info\": \"\",\r\n      \"address\": \"7 Camp St, Ballarat Central VIC 3350, Australia\",\r\n      \"place_id\": \"ChIJ_yxLffhE0WoRhx-mwEACoVc\",\r\n      \"contact_info\": [],\r\n      \"inquiry_no\": [\r\n        \"1800333864\"\r\n      ],\r\n      \"country\": \"Australia\",\r\n      \"city\": \"Ballarat\",\r\n      \"state\": \"Victoria\",\r\n      \"type\": \"Campus\"\r\n    },\r\n    {\r\n      \"name\": \"Gippsland(Churchill)\",\r\n      \"overview\": \"The Gippsland Campus is located in the township of Churchill in the foothills of the Strzelecki Ranges. It is within easy driving distance of Victoria's Mt Baw Baw ski resort, white water rivers and coastal parks, including Wilson's Promontory and Gippsland Lakes. Nearby is the Tarra Bulga National Park, a spectacular temperate rainforest that is home to giant mountain ash trees and lyrebirds. The traditional custodians for this area are the Gunai Kurnai peoples.\",\r\n      \"additional_info\": \"\",\r\n      \"address\": \"Northways Rd, Churchill VIC 3842, Australia\",\r\n      \"place_id\": \"ChIJc2tYcSkTKWsREBRDFKV5BQ8\",\r\n      \"contact_info\": [],\r\n      \"inquiry_no\": [\r\n        \"1800333864\"\r\n      ],\r\n      \"country\": \"Australia\",\r\n      \"city\": \"Latrobe\",\r\n      \"state\": \"Victoria\",\r\n      \"type\": \"Campus\"\r\n    },\r\n    {\r\n      \"name\": \"Wimmera\",\r\n      \"overview\": \"From our Wimmera Campus we deliver education and training throughout Horsham and surrounding regions. The Wimmera Campus delivers TAFE programs and bachelor courses in social sciences, business as well as masters programs and PhD research.\",\r\n      \"additional_info\": \"\",\r\n      \"address\": \"289 Baillie St, Horsham VIC 3400, Australia\",\r\n      \"place_id\": \"ChIJGzjzDrZazmoRQKDymJkd8Rg\",\r\n      \"contact_info\": [],\r\n      \"inquiry_no\": [\r\n        \"1800333864\"\r\n      ],\r\n      \"country\": \"Australia\",\r\n      \"city\": \"Horsham\",\r\n      \"state\": \"Victoria\",\r\n      \"type\": \"Campus\"\r\n    },\r\n    {\r\n      \"name\": \"Berwick\",\r\n      \"overview\": \"The Berwick Campus is located 40km south east of the Melbourne city centre and accessible via an excellent rail network. The traditional custodians for this area are the Boon Wurrung and Wurundjeri peoples. The multi-level complex of modern architecturally-designed buildings is surrounded by spacious grounds with landscaped gardens and internal courtyards. It is also close to many facilities available at the attractive Berwick Village Centre\",\r\n      \"additional_info\": \"\",\r\n      \"address\": \"100 Clyde Rd, Berwick VIC 3806, Australia\",\r\n      \"place_id\": \"ChIJr5awjkAa1moRqbyZjG0wnr8\",\r\n      \"contact_info\": [],\r\n      \"inquiry_no\": [\r\n        \"1800333864\"\r\n      ],\r\n      \"country\": \"Australia\",\r\n      \"city\": \"Casey\",\r\n      \"state\": \"Victoria\",\r\n      \"type\": \"Campus\"\r\n    },\r\n    {\r\n      \"name\": \"Brisbane\",\r\n      \"overview\": \"Brisbane ranks among the top lifestyle cities in the world - making it the perfect place to live, study and work. The traditional custodians for this area are the Turrbal and Jagera peoples. With an enviable subtropical climate, the city enjoys year-round outdoor activities. International students will feel at home whilst studying abroad in Brisbane.\",\r\n      \"additional_info\": \"\",\r\n      \"address\": \"Level 5-7, 333 Ann Street Brisbane QLD 4000\",\r\n      \"place_id\": \"ChIJ7afXZR1akWsRbRuHVL_K8dY\",\r\n      \"contact_info\": [\r\n        {\r\n          \"name\": \"\",\r\n          \"phone_no\": \"+61737273300\",\r\n          \"fax\": \"+61353279017\",\r\n          \"email_address\": \"info.brisbane@federation.edu.au\",\r\n          \"description\": \"\"\r\n        }\r\n      ],\r\n      \"inquiry_no\": [\r\n        \"1800333864\"\r\n      ],\r\n      \"country\": \"Australia\",\r\n      \"city\": \"Brisbane\",\r\n      \"state\": \"Queensland\",\r\n      \"type\": \"Campus\"\r\n    }\r\n  ]\r\n}",
        "uc": []
      },
      {
        "id": 110,
        "universitydata": "{\r\n  \"univ_id\": \"universityoftechnology,sydney\",\r\n  \"univ_name\": \"University of Technology, Sydney\",\r\n  \"univ_country\": \"Australia\",\r\n  \"univ_url\": \"https://www.uts.edu.au/\",\r\n  \"university_type\": \"Government\",\r\n  \"univ_about\": \"UTS is a public university of technology defined by our support for the economic, social and cultural prosperity of our communities. We are measured by the success of our students, staff and partners and committed to research, innovation and the dissemination of knowledge of public value. We are, and always will be, an inclusive university.\",\r\n  \"facebook_page_name\": \"UTSEngage\",\r\n  \"twitter_page_name\": \"utsengage\",\r\n  \"youtube_page_name\": \"utschannel\",\r\n  \"abbreviation\": \"uts\",\r\n  \"application_fee\": \"100\",\r\n  \"placement_url\": \"https://www.uts.edu.au/current-students/opportunities/work-opportunities/job-board/international-student-jobs\",\r\n  \"apply_url\": \"https://www.uts.edu.au/future-students/international/essential-information/applying-study-uts\",\r\n  \"googlerating\": 4.1999999999999993,\r\n  \"univ_accomodation\": {\r\n    \"more_details\": \"https://www.uts.edu.au/current-students/support/uts-housing-service/campus-accommodation/our-residences\",\r\n    \"more_details_univ_website\": \"https://www.studyinaustralia.gov.au/english/live-in-australia/living-costs\",\r\n    \"applicant\": 20290,\r\n    \"partner\": 7100,\r\n    \"child\": 3040\r\n  },\r\n  \"univ_rankings\": {\r\n    \"rankings\": [\r\n      {\r\n        \"name\": \"QS World University Rankings\",\r\n        \"level\": [\r\n          {\r\n            \"name\": \"World\",\r\n            \"value\": \"140\"\r\n          },\r\n          {\r\n            \"name\": \"Australia\",\r\n            \"value\": \"9\"\r\n          }\r\n        ]\r\n      },\r\n      {\r\n        \"name\": \"Times Higher Education World University Rankings\",\r\n        \"level\": [\r\n          {\r\n            \"name\": \"World\",\r\n            \"value\": \"194\"\r\n          },\r\n          {\r\n            \"name\": \"Australia\",\r\n            \"value\": \"11\"\r\n          }\r\n        ]\r\n      }\r\n    ]\r\n  },\r\n  \"contactInformation\": [\r\n    {\r\n      \"name\": \"University of Technology, Sydney\",\r\n      \"overview\": \"\",\r\n      \"address\": \"Broadway, Ultimo NSW, Australia\",\r\n      \"place_id\": \"ChIJQ6G0WyauEmsRV6mPvbIk4hY\",\r\n      \"contact_info\": [\r\n        {\r\n          \"name\": \"\",\r\n          \"phone_no\": \"1800774816\",\r\n          \"fax\": \"+61295141530\",\r\n          \"email_address\": \"international@uts.edu.au\",\r\n          \"description\": \"Calling from Australia\"\r\n        },\r\n        {\r\n          \"name\": \"\",\r\n          \"phone_no\": \"+61396274816\",\r\n          \"fax\": \"\",\r\n          \"email_address\": \"\",\r\n          \"description\": \"Calling from overseas\"\r\n        }\r\n      ],\r\n      \"inquiry_no\": [],\r\n      \"country\": \"Australia\",\r\n      \"city\": \"Sydney\",\r\n      \"state\": \"New South Wales\",\r\n      \"type\": \"University\"\r\n    },\r\n    {\r\n      \"name\": \"Blackfriars\",\r\n      \"overview\": \"Blackfriars Children's Centre is located on the historic Blackfriars campus, just off Broadway at Chippendale. It is tucked away in a secluded, leafy and quiet setting, 500m from the main Broadway campus of UTS.\",\r\n      \"additional_info\": \"\",\r\n      \"address\": \"Blackfriars Campus, Chippendale NSW, Australia\",\r\n      \"place_id\": \"ChIJaSOcEiiuEmsRCF3C-QmLCBo\",\r\n      \"contact_info\": [\r\n        {\r\n          \"name\": \"\",\r\n          \"phone_no\": \"95142959\",\r\n          \"fax\": \"95142961\",\r\n          \"email_address\": \"blackfriars.childcare@uts.edu.au\",\r\n          \"description\": \"\"\r\n        }\r\n      ],\r\n      \"inquiry_no\": [],\r\n      \"country\": \"Australia\",\r\n      \"city\": \"Sydney\",\r\n      \"state\": \"New South Wales\",\r\n      \"type\": \"Campus\"\r\n    },\r\n    {\r\n      \"name\": \"City and Moore Park campus\",\r\n      \"overview\": \"As a physiotherapist-in-training at UTS you’re part of an Australian-first – immersing your learning in a state-of-the-art educational facility completely embedded within an elite sporting precinct.\",\r\n      \"additional_info\": \"\",\r\n      \"address\": \"Broadway, Ultimo NSW, Australia\",\r\n      \"place_id\": \"ChIJWSyIcSiuEmsRj_NWNFvj-k8\",\r\n      \"contact_info\": [\r\n        {\r\n          \"name\": \"\",\r\n          \"phone_no\": \"+61396274816\",\r\n          \"fax\": \"\",\r\n          \"email_address\": \"gsh.future@uts.edu.au\",\r\n          \"description\": \"\"\r\n        }\r\n      ],\r\n      \"inquiry_no\": [],\r\n      \"country\": \"Australia\",\r\n      \"city\": \"Sydney\",\r\n      \"state\": \"New South Wales\",\r\n      \"type\": \"Campus\"\r\n    }\r\n  ]\r\n}",
        "uc": []
      }
    ]
    this.generateExcelForCampusdetail(univdata);
  }

  async generateExcelForCampusdetail(univdata) {
    const workbook = new Excel.Workbook();
    const univDetail = workbook.addWorksheet('University Detail');
    const univRating = workbook.addWorksheet('University Ratings');
    const univCampusDetail = workbook.addWorksheet('University Campus');
    const univCampusContact = workbook.addWorksheet('University Campus Contact');
    const univEnquiryNo = workbook.addWorksheet('University Enquiry Number');

    const univDetailHeaders = [
      { header: 'RefNo', key: 'refno', width: 8 },
      { header: 'University Name', key: 'uname', width: 30 },
      { header: 'University Url', key: 'url', width: 30 },
      { header: 'University Type', key: 'universitytype', width: 10 },
      { header: 'Country', key: 'country', width: 20 },
      { header: 'About', key: 'about', width: 30 },
      { header: 'FBpage', key: 'fbpage', width: 15 },
      { header: 'Twitterpage', key: 'twitterpage', width: 15 },
      { header: 'Youtubepage', key: 'youtubepage', width: 15 },
      { header: 'Abbreviation', key: 'abbreviation', width: 10 },
      { header: 'Application Fee', key: 'applicationfee', width: 10 },
      { header: 'Placement Url', key: 'placementurl', width: 30 },
      { header: 'Application Url', key: 'applicationurl', width: 30 },
      { header: 'Currency', key: 'currency', width: 30 },
      { header: 'Overall Rating', key: 'overallrating', width: 8 },
      { header: 'Accomodation Govt Url', key: 'accomodationgovturl', width: 30 },
      { header: 'Accomodation Univ Url', key: 'accomodationunivurl', width: 30 },
    ];

    const univRatingHeader = [
      { header: 'Rank Name', key: 'rankname', width: 40 },
      { header: 'WorldRank', key: 'worldrank', width: 20 },
      { header: 'CountryRank', key: 'countryrank', width: 10 },
      { header: 'University', key: 'universityid', width: 10 }
    ];

    const univCampusDetailHeaders = [
      { header: 'RefNo', key: 'refno', width: 8 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'University', key: 'universityid', width: 30 },
      { header: 'Campustype', key: 'campustype', width: 30 },
      { header: 'Overview', key: 'overview', width: 30 },
      { header: 'Additional Info', key: 'addinfo', width: 30 },
      { header: 'Address', key: 'address', width: 30 },
      { header: 'PlaceId', key: 'placeid', width: 30 },
      { header: 'VirtualTourUrl', key: 'vtoururl', width: 30 },
      { header: 'Postcode', key: 'postcode', width: 15 },
      { header: 'CricosProviderCode', key: 'cricospcode', width: 15 },
      { header: 'City', key: 'city', width: 15 },
      { header: 'State', key: 'state', width: 15 },
      { header: 'Country', key: 'country', width: 15 },
    ];

    const univCampusContactHeaders = [
      { header: 'Contact Name', key: 'name', width: 30 },
      { header: 'Phone Number', key: 'phno', width: 12 },
      { header: 'Fax', key: 'fax', width: 12 },
      { header: 'Email Address', key: 'email', width: 30 },
      { header: 'Description', key: 'description', width: 30 },
      { header: 'Campus RefNo', key: 'campusid', width: 10 },
    ];

    const univEnquiryNoHeaders = [
      { header: 'Enquiry Number', key: 'enquiryno', width: 30 },
      { header: 'Campus RefNo', key: 'campusid', width: 30 },
    ];

    univDetail.columns = univDetailHeaders;
    univRating.columns = univRatingHeader;
    univCampusDetail.columns = univCampusDetailHeaders;
    univCampusContact.columns = univCampusContactHeaders;
    univEnquiryNo.columns = univEnquiryNoHeaders;
    let tmpIndex = 0;
    univdata.forEach((udata, uindex) => {
      udata.universitydata = JSON.parse(udata.universitydata);
      const parsedData = udata.universitydata;
      const urow = ['U' + (uindex + 1), parsedData.univ_name, parsedData.univ_url, parsedData.university_type, parsedData.univ_country, parsedData.univ_about, parsedData.facebook_page_name, parsedData.twitter_page_name, parsedData.youtube_page_name, parsedData.abbreviation, parsedData.application_fee, parsedData.placement_url, parsedData.apply_url, parsedData.univ_accomodation.currency, parsedData.googlerating, parsedData.univ_accomodation.more_details, parsedData.univ_accomodation.more_details_univ_website];

      univDetail.addRow(urow);

      //Add Ratings
      parsedData.univ_rankings.rankings.forEach((rdata, rindex) => {
        let worldrank = '', countryrank = '';
        rdata.level.forEach((levelname) => {
          if (levelname.name.toLowerCase() === 'world') {
            worldrank = levelname.value;
          }
          if (levelname.name.toLowerCase() !== 'world') {
            countryrank = levelname.value;
          }
        });
        const rank = [rdata.name, worldrank, countryrank, 'U' + (uindex + 1)];
        univRating.addRow(rank);
      });

      parsedData.contactInformation.forEach((ucdata, cindex) => {
        const cdata = udata.uc.filter(u => u.name === ucdata.name);
        const crow = ['C' + (tmpIndex + 1), ucdata.name, 'U' + (uindex + 1), ucdata.type, ucdata.overview, ucdata.additional_info, ucdata.address, ucdata.place_id, (ucdata.vtour_url) ? ucdata.vtour_url : '', (ucdata.postcode) ? ucdata.postcode : '', (ucdata.cricos_provider_code) ? ucdata.cricos_provider_code : '', (cdata.length > 0) ? cdata[0].city : '', (cdata.length > 0) ? cdata[0].state : '',
        (cdata.length > 0) ? cdata[0].country : ''];
        univCampusDetail.addRow(crow);

        // adding contactinfo
        const contactinfo = (ucdata.contact_info) ? ucdata.contact_info : [];
        contactinfo.forEach((cinfodata, cinfoindex) => {
          univCampusContact.addRow([cinfodata.name, cinfodata.phone_no, cinfodata.fax, cinfodata.email_address, cinfodata.description, 'C' + (tmpIndex + 1)]);
        });
        // Add EnquiryNo
        const enquiryno = (ucdata.inquiry_no) ? ucdata.inquiry_no : [];
        enquiryno.forEach((cinfodata, cinfoindex) => {
          univEnquiryNo.addRow([cinfodata, 'C' + (tmpIndex + 1)]);
        });
        tmpIndex++;
      });
    });

    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'CityStateCountry.xlsx');
    });
  }
  generateExcelForCampus(countryid, universitytypeid, universityid) {
    let univdata = [];
    this.mcampusloc.getCampusDetailsforexcel(countryid, universitytypeid, universityid).subscribe(data => {
      if (data.flag) {
        univdata = (data.outdatalist[0] !== 'No Data Found') ? JSON.parse(data.outdatalist[0]) : [];
        this.generateExcelForCampusdetail(univdata);
      }
    });
  }
  getIdByName(name) {
    return name.replace(/\s/g, '').replace(/[\/]+/g, '_').toLowerCase();
  }
  importExcelForCampus(exceldata): Observable<any> {
    let univdata = [];

    exceldata['University Detail'].forEach(element => {
      let univdetail: any = {};
      univdetail.univ_id = this.getIdByName(element['University Name']);
      univdetail.univ_name = element['University Name'];
      univdetail.univ_country = (element['Country']) ? element['Country'] : '';
      univdetail.univ_url = (element['University Url']) ? element['University Url'] : '';
      univdetail.university_type = (element['University Type']) ? element['University Type'] : '';
      univdetail.univ_about = (element['About']) ? element['About'] : '';
      univdetail.facebook_page_name = (element['FBpage']) ? element['FBpage'] : '';
      univdetail.twitter_page_name = (element['Twitterpage']) ? element['Twitterpage'] : '';
      univdetail.youtube_page_name = (element['Youtubepage']) ? element['Youtubepage'] : '';
      univdetail.abbreviation = (element['Abbreviation']) ? element['Abbreviation'] : '';
      univdetail.application_fee = (element['Application Fee']) ? element['Application Fee'] : '';
      univdetail.placement_url = (element['Placement Url']) ? element['Placement Url'] : '';
      univdetail.apply_url = (element['Application Url']) ? element['Application Url'] : '';
      univdetail.googlerating = (element['Overall Rating']) ? element['Overall Rating'] : '';
      univdetail.univ_accomodation = {};
      univdetail.univ_accomodation.more_details = (element['Accomodation Govt Url']) ? element['Accomodation Govt Url'] : '';
      univdetail.univ_accomodation.more_details_univ_website = (element['Accomodation Univ Url']) ? element['Accomodation Univ Url'] : '';
      univdetail.univ_accomodation.currency = (element['Currency']) ? element['Currency'] : '';
      univdetail.univ_accomodation.applicant = 20290;
      univdetail.univ_accomodation.partner = 7100;
      univdetail.univ_accomodation.child = 3040;
      univdetail.univ_rankings = {};
      univdetail.univ_rankings.rankings = [];
      let filteredRankings = exceldata['University Ratings'].filter(val => {
        return val.University === element.RefNo;
      });
      filteredRankings.forEach(val => {
        const rankname = val['Rank Name'];
        const worldrank = (val['WorldRank'] && String(val['WorldRank']).length > 0) ? String(val['WorldRank']) : '';
        const countryrank = (val['CountryRank'] && String(val['CountryRank']).length > 0) ? String(val['CountryRank']) : '';
        let tmpRank = [];
        if (worldrank.length > 0) {
          tmpRank.push({ name: 'World', value: worldrank });
        }
        if (countryrank.length > 0) {
          tmpRank.push({ name: element['Country'], value: countryrank });
        }
        univdetail.univ_rankings.rankings.push({ name: rankname, level: tmpRank });
      });

      let filteredUnivCampus = exceldata['University Campus'].filter(val => {
        return val.University === element.RefNo;
      });
      univdetail.contactInformation = [];
      filteredUnivCampus.forEach(mainEle => {
        let totalCampus = {
          name: '',
          overview: '',
          additional_info: '',
          address: '',
          place_id: '',
          vtour_url: '',
          postcode: '',
          cricos_provider_code: '',
          contact_info: {},
          inquiry_no: {},
          country: '',
          city: '',
          state: '',
          type: '',
          latlong: {
            lat: '',
            lng: ''
          }
        };
        let contactInfoArray = exceldata['University Campus Contact'].filter(val => {
          return val['Campus RefNo'] === mainEle.RefNo;
        });
        let newcontactInfoArray = [];
        contactInfoArray.forEach(cval => {
          let jsonObject = {
            name: '',
            phone_no: '',
            fax: '',
            email_address: '',
            description: ''
          };
          jsonObject.name = (cval['Contact Name']) ? cval['Contact Name'] : '';
          jsonObject.phone_no = (cval['Phone Number']) ? cval['Phone Number'] : '';
          jsonObject.fax = (cval['Fax']) ? cval['Fax'] : '';
          jsonObject.email_address = (cval['Email Address']) ? cval['Email Address'] : '';
          jsonObject.description = (cval['Description']) ? cval['Description'] : '';
          newcontactInfoArray.push(jsonObject);
        });
        let inquiryInfoArray = exceldata['University Enquiry Number'].filter(val => {
          return val['Campus RefNo'] === mainEle.RefNo;
        });

        let newinquiryInfoArray = [];
        inquiryInfoArray.forEach(ival => {
          newinquiryInfoArray.push(ival['Enquiry Number']);
        });
        totalCampus.name = (mainEle.Name) ? mainEle.Name : '';
        totalCampus.overview = (mainEle.Overview) ? mainEle.Overview : '';
        totalCampus.address = (mainEle.Address) ? mainEle.Address : '';
        if (mainEle.Campustype.toLowerCase() === 'campus') {
          totalCampus.additional_info = (mainEle['Additional Info']) ? mainEle['Additional Info'] : '';
        } else {
          delete totalCampus.additional_info;
        }

        totalCampus.place_id = (mainEle.PlaceId) ? mainEle.PlaceId : '';
        totalCampus.vtour_url = (mainEle.VirtualTourUrl) ? mainEle.VirtualTourUrl : '';
        totalCampus.postcode = (mainEle.Postcode) ? mainEle.Postcode : '';
        totalCampus.cricos_provider_code = (mainEle.CricosProviderCode) ? mainEle.CricosProviderCode : '';
        totalCampus.contact_info = newcontactInfoArray;
        totalCampus.inquiry_no = newinquiryInfoArray;
        totalCampus.type = (mainEle.Campustype) ? mainEle.Campustype : '';
        totalCampus.city = (mainEle.City) ? mainEle.City : '';
        totalCampus.state = (mainEle.State) ? mainEle.State : '';
        totalCampus.country = (mainEle.Country) ? mainEle.Country : '';
        totalCampus.latlong.lat = '';
        totalCampus.latlong.lng = '';
        univdetail.contactInformation.push(totalCampus);
      });
      univdata.push(univdetail);
    });
    const req = new HttpRequest('POST', `${environment.API_URL}university/au/v1/saveUniversity`, univdata, {
      reportProgress: true,
    });
    return this.httpclient.request(req);
  }
}
