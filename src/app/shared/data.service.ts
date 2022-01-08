import { Injectable } from '@angular/core';
import {NgxCsvParser, NgxCSVParserError} from "ngx-csv-parser";
import {HttpClient} from "@angular/common/http";
import {Stat} from "./Stat";
import {FaceProperties} from "./FaceProperties";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  jsonData: Array<any> = [];

  data: Stat[] = [];
  dataConverted: FaceProperties[] = [];

  constructor(private ngxCsvParser: NgxCsvParser, private http: HttpClient) {
    this.loadData().subscribe(data => {
      this.data = data;
    });
  }

  loadData() {
    return this.http.get<Stat[]>("http://localhost:4200/assets/TDFStats.json");
  }

  getPreparedData() {
    this.data.forEach(el => {
      let tempDateStart = new Date();
      let dateParts = el.startDate.split('.');
      tempDateStart.setFullYear(Number(dateParts[2]));
      tempDateStart.setUTCDate(Number(dateParts[0]));
      tempDateStart.setMonth(Number(dateParts[1]));

      let tempDateFinish = new Date();
      let dateParts2 = el.endDate.split('.');
      tempDateFinish.setFullYear(Number(dateParts2[2]));
      tempDateFinish.setUTCDate(Number(dateParts2[0]));
      tempDateFinish.setMonth(Number(dateParts2[1]));

      let dStart = new Date(Number(dateParts[2]), Number(dateParts[1]), Number(dateParts[0])).getTime();
      let dEnd = new Date(Number(dateParts2[2]), Number(dateParts2[1]), Number(dateParts2[0])).getTime();
      let milliseconds = dEnd - dStart;
      const seconds = milliseconds / 1000;
      const minutes = seconds / 60;
      const hours = minutes / 60;
      const days = hours / 24;

      this.dataConverted.push({
        faceHeight: Number(el.winnersAvgSpeed.replace(",",".")),
        brewLength: Number(el.numberOfStages.replace(",",".")),
        earCol: 'none',
        eyeCol: 'none',
        faceWidth: Number(el.totalDistance.replace(/\s/g, '').replace(",",".")),
        mouthSmile: days,
        noseHeight: Number(el.finishers.replace(",",".")),
        noseSize: Number(el.entrants.replace(",",".")),
        year: el.year
      });
    });
    return this.dataConverted;
  }
}
