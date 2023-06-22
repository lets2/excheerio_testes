const fs = require("fs");
const cheerio = require("cheerio");
const { Console } = require("console");
//const $ = cheerio.load('<h2 class="title">Hello world</h2>');

const html = fs.readFileSync("content.html", "utf-8");

const $ = cheerio.load(html);

console.log("ALL CONTENT:");
// console.log($.html());
const Fullname = $(".position-relative > span").text().trim();

const firstname = Fullname.split(" ")[0];

const surname = Fullname.split(" ")[1];

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
console.log("-------------------------------------");
let experiences = [];
$(
    "div#DivExperiencesContainer div.font-md.d-flex.align-items-center > strong"
).each((index, element) => {
    const ex_experience = {
        job: "",
        company: "",
        location: "",
        beginDate: "",
        endDate: "",
        salary: 0,
        salaryTime: "",
        description: "",
    };
    ex_experience.job = $(element).text();
    experiences.push(ex_experience);
});

console.log("-------------------------------------");
console.log("Experiences:");
let companies = [];
let locations = [];
let datesExperience = [];
let salaries = [];
let descriptions = [];
$("div.col-xl-9 > div > div > div:first-child > span").each(
    (index, element) => {
        if (index % 2 === 0) {
            companies.push($(element).text().replace(",", ""));

            // find by salary if exist
            const testIfSalaryExist = $(element)
                .parent()
                .parent()
                .last()
                .text()
                .replace(/\s/g, "");
            const patternSalary = /R\$(.*)/;
            const existsMatch = testIfSalaryExist.match(patternSalary);
            if (existsMatch) {
                const salaryInformation = existsMatch[1].trim();

                const salary = parseInt(
                    salaryInformation.split("/")[0].replace(".", ""),
                    10
                );
                const salaryTime = salaryInformation.split("/")[1];
                salaries.push({ value: salary, time: salaryTime });
            } else {
                salaries.push({ value: "not informed", time: "not informed" });
            }

            //find by description if exists
            const testIfDescriptionExist = $(element)
                .parent()
                .parent()
                .parent()
                .find("p.text-break-word")
                .text()
                .trim()
                .replace(/[\r\n\s]+/g, " ");

            if (testIfDescriptionExist !== "") {
                descriptions.push(testIfDescriptionExist);
            } else {
                descriptions.push("");
            }
        } else {
            locations.push($(element).text().replace(",", ""));
        }
    }
);

$("div#DivExperiencesContainer div.col-xl-3 div.lh-180").each(
    (index, element) => {
        datesExperience.push($(element).text().replace(/\s/g, ""));
    }
);

console.log("-------------------------------------");
experiences.forEach((experience, index) => {
    experience.company = companies[index];
    experience.location = locations[index];
    experience.beginDate = datesExperience[index].split("-")[0];
    experience.endDate = datesExperience[index].split("-")[1];
    experience.salary = salaries[index].value;
    experience.salaryTime = salaries[index].time;
    experience.description = descriptions[index];

    // console.log(experience);
});

// Linguagens
let languages = []
let languageNames = []
let languagelevels = []
$("div#ResumeLanguagesContainer div.chips-languages span").each((index,element)=>{
    if(index%2 === 0){
      languageNames.push($(element).text().trim());
    }
    else{
      languagelevels.push($(element).text().trim());
    }
    
})
languageNames.forEach((name,index)=>{
  languages.push({name: name,level: languagelevels[index]})
})
console.log(languages)

const skillsArray = [];
$('div.chips-skills > div.chip.chip-gray.text-truncate.no-interactive span').each((index, element) => {
  const skill = $(element).text().trim() || "";
  if(skill !== ""){
    skillsArray.push(skill);
  }
});
// const Fulladdress = $(".align-content-center > span").first().text();
// const address = Fulladdress.split(',')[0];

// const cep = Fulladdress.substring(Fulladdress.lastIndexOf(' ') + 1);

// const number1 = $(".align-content-center > div > span").first().text().trim()

// const number2 = $(".ml-30 > a").first().text().trim()

// const email = $(".detail-contact .align-content-center span").last().text().trim();



// // gender
// const GenerStatus = $(".match-personal-data > div > span").eq(0).text().trim();
// // console.log(GenerStatus);

// marital status
const maritalStatus = $(".match-personal-data > div > span").eq(1).text().trim();
// console.log(maritalStatus);

// // age
// const age = $(".match-personal-data > div > span").eq(2).text().trim();
// // console.log(age);

// // birth date
// const birthDate = $(".match-personal-data > div > span").eq(4).text().replace(/\s+/g, ' ').trim();
// // console.log(birthDate);
console.log("----------------------------Meu info-----------------------------------")
let info = {
  maritalStatus: maritalStatus,
  //children: null,
  //sendWhatsApp: true,
  //vehicles: [],
  //licenses: [],
  //socialNetworks: [],
  experiences: experiences,
  languages : languages,
  skills: skillsArray
}
console.log(info)






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
