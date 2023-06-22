const fs = require("fs");
const cheerio = require("cheerio");
//const $ = cheerio.load('<h2 class="title">Hello world</h2>');

const html = fs.readFileSync("content.html", "utf-8");

const $ = cheerio.load(html);

console.log("ALL CONTENT:");
// console.log($.html());
const Fullname = $(".position-relative > span").text().trim()

const firstname = Fullname.split(' ')[0];

const surname = Fullname.split(' ')[1];

// const firstjobdiv = $('div.font-md.d-flex.align-items-center').eq(0);
// const firstjob = firstjobdiv.find('strong').text().trim();

// const secondjobdiv = $('div.font-md.d-flex.align-items-center').eq(1);
// const secondjob = secondjobdiv.find('strong').text().trim();

// const thirdjobdiv = $('div.font-md.d-flex.align-items-center').eq(2);
// const thirdjob = thirdjobdiv.find('strong').text().trim();

// const fourthjobdiv = $('div.font-md.d-flex.align-items-center').eq(3);
// const fourthjob = fourthjobdiv.find('strong').text().trim();
// const ex_experience ={
//   job: "firstjob",
//   description: description1,
//   company: company1,
//   salary: 0,
//   idCategory1: 51,
//   idCategory2: 175,
//   idManagerialLevel: 4,
//   idLocation1: 12,
//   idLocation2: 64,
//   idLocation3: 5211323,
//   beginDate: beginDate1,
//   endDate: null,
// }
console.log("-------------------------------------")
let experiences = []
$('div.font-md.d-flex.align-items-center > strong').each((index,element)=>{
  const ex_experience = {
    job: "",
    company: ""

  }
  ex_experience.job = $(element).text();
  experiences.push(ex_experience)
})
experiences.forEach((experience)=>{
  console.log(experience)
})
console.log("-------------------------------------")
let companies = []

$('div.col-xl-9 > div > div > div:first-child > span').each((index, element) => {
  if(index %2 === 0){
    companies.push($(element).text())
  }
  // experiences[index].job = $(element).text();
  
});

console.log("-------------------------------------")
experiences.forEach((experience,index)=>{
  experience.company = companies[index]
  console.log(experience)
})

const company1 = $('div.col-xl-9:has(span:contains("GRA Assessoria Jurídica")) span').eq(0).text().trim();
const company2 = $('div.col-xl-9:has(span:contains("Minsait company")) span').eq(0).text().trim();
const company3 = $('div.col-xl-9:has(span:contains("Sos eletrônicos")) span').eq(0).text().trim();
const company4 = $('div.col-xl-9:has(span:contains("ALPHAVOX")) span').eq(0).text().trim();

const description1 = $('div.col-xl-9 div.c-md.text-italic p.text-break-word').eq(0).text().replace(/\s+/g, ' ');
const description2 = $('div.col-xl-9 div.c-md.text-italic p.text-break-word').eq(1).text().replace(/\s+/g, ' ');
const description3 = $('div.col-xl-9 div.c-md.text-italic p.text-break-word').eq(2).text().replace(/\s+/g, ' ');
const description4 = $('div.col-xl-9 div.c-md.text-italic p.text-break-word').eq(3).text().replace(/\s+/g, ' ');

const skillsArray = [];
$('div.chips-skills > div.chip.chip-gray.text-truncate.no-interactive span').each((index, element) => {
  const skill = $(element).text().trim() || "";
  if(skill !== ""){
    skillsArray.push(skill);
  }
});
const salario1 = $('div.col-xl-9 > div > div > div:nth-child(2) > span:nth-child(2)').first().text().trim();
const salario2 = $('div.col-xl-9 > div > div > div:nth-child(2) > span:nth-child(2)').eq(1).text().trim();
const salario3 = $('div.col-xl-9 > div > div > div:nth-child(2) > span:nth-child(2)').eq(2).text().trim();

const beginDate1 = $('div.col-xl-3 > div.fw-600 > div').eq(0).text().trim();
const beginDate2 = $('div.col-xl-3 > div.fw-600 > div').eq(2).text().trim();
const beginDate3 = $('div.col-xl-3 > div.fw-600 > div').eq(4).text().trim();
const beginDate4 = $('div.col-xl-3 > div.fw-600 > div').eq(6).text().trim();

const [startDate1, endDate1] = beginDate2.match(/[A-Za-z]{3}\. \d{4}/g);
const [startDate2, endDate2] = beginDate3.match(/[A-Za-z]{3}\. \d{4}/g);
const [startDate3, endDate3] = beginDate4.match(/[A-Za-z]{3}\. \d{4}/g);

const Fulladdress = $(".align-content-center > span").first().text();
const address = Fulladdress.split(',')[0];

const cep = Fulladdress.substring(Fulladdress.lastIndexOf(' ') + 1);

const number1 = $(".align-content-center > div > span").first().text().trim()

const number2 = $(".ml-30 > a").first().text().trim()

const email = $(".detail-contact .align-content-center span").last().text().trim();

// gender
const GenerStatus = $(".match-personal-data > div > span").eq(0).text().trim();
// console.log(GenerStatus);

// marital status
const maritalStatus = $(".match-personal-data > div > span").eq(1).text().trim();
// console.log(maritalStatus);

// age
const age = $(".match-personal-data > div > span").eq(2).text().trim();
// console.log(age);

// birth date
const birthDate = $(".match-personal-data > div > span").eq(4).text().replace(/\s+/g, ' ').trim();
// console.log(birthDate);

// const info = {
//   maritalStatus: maritalStatus,
//   children: null,
//   sendWhatsApp: true,
//   vehicles: [],
//   licenses: [],
//   socialNetworks: [],
//   experiences: [
//     {
//       job: firstjob,
//       description: description1,
//       company: company1,
//       salary: 0,
//       idCategory1: 51,
//       idCategory2: 175,
//       idManagerialLevel: 4,
//       idLocation1: 12,
//       idLocation2: 64,
//       idLocation3: 5211323,
//       beginDate: beginDate1,
//       endDate: null,
//     },
//     {
//       job: secondjob,
//       description:description2,
//       company: company2,
//       salary: salario1,
//       idCategory1: 86,
//       idCategory2: 439,
//       idManagerialLevel: 6,
//       idLocation1: 12,
//       idLocation2: 64,
//       idLocation3: 0,
//       beginDate: startDate1,
//       endDate: endDate1,
//     },
//     {
//       job: thirdjob,
//       description:description3,
//       company: company3,
//       salary: salario2,
//       idCategory1: 59,
//       idCategory2: 479,
//       idManagerialLevel: 2,
//       idLocation1: 12,
//       idLocation2: 64,
//       idLocation3: 5211323,
//       beginDate: startDate2,
//       endDate: endDate2,
//     },
//     {
//       job: fourthjob,
//       description:description4,
//       company: company4,
//       salary: salario3,
//       idCategory1: 86,
//       idCategory2: 734,
//       idManagerialLevel: 2,
//       idLocation1: 12,
//       idLocation2: 64,
//       idLocation3: 0,
//       beginDate: startDate3,
//       endDate: endDate3,
//     },
//   ],
//   languages: [
//     {
//       idLanguage: 37,
//       idLanguageLevel: 1,
//     },
//   ],
//   skills: skillsArray,
//   //pedro ta aqui
//   salaryMin: 1105,
//   salaryMax: 2000,
//   idContractWorkType: 2,
//   idWorkingHour: 1,
//   travel: true,
//   changeResidence: true,
//   hasDeficiency: false,
//   //idGenderIdentity: null,
//   idSexualOrientation: null,
//   idRace: null,
//   idMatch: 151997864,
//   idCandidate: 97043811,
//   idVacancy: 468736,
//   idVacancyFolder: 3096520,
//   cpf: "11000133699",
//   nationality: "Brasileiro(a)",
//   name: firstname,
//   surname: surname,
//   email: email,
//   //phone: number1,
//   //phone2: number2,
//   birthDate: birthDate,
//   idSex: 1,
//   publisher: "Infojobs",
//   latitude: -23.5051556,
//   longitude: -46.6055069,
//   cep: cep,
//   //address: address,
//   addressComplement: "",
//   addressNumber: null,
//   idLocation2: 64,
//   insertDate: "2023-06-04T15:16:44.0413586",
//   idLocation3: 5211323,
//   studies: [
//     {
//       study: "Ciências contábeis",
//       idStudy1: 5,
//       center: "estacio uniradial",
//       idLocation1: 12,
//       idLocation2: 64,
//       idLocation3: 0,
//       beginDate: "01/02/2022 00:00:00",
//       endDate: "01/12/2026 00:00:00",
//       studyStatus: 0,
//     },
//   ],
//   hasBeenSentToERP: false,
//   requests: [],
// };
