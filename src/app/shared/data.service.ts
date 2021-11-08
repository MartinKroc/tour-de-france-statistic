import { Injectable } from '@angular/core';
import {NgxCsvParser, NgxCSVParserError} from "ngx-csv-parser";
import {HttpClient} from "@angular/common/http";
import {Stat} from "./Stat";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  jsonData: Array<any> = [];

  //header = true;
  //file: File;
  //csvRecords: any[] = [];

  constructor(private ngxCsvParser: NgxCsvParser, private http: HttpClient) {
    //this.file = new File([""], "tdfstats.csv", { type: "text/plain"});

  }

  loadData() {
    return this.http.get<Stat[]>("http://localhost:4200/assets/TDFStats.json");
  }

  parseDataCsv() { // TODO If I will fix problem with result: any[]
    // this.ngxCsvParser.parse(this.file, {header: this.header, delimiter: ';'})
    //   .pipe().subscribe((result: any[]) => {
    //
    //   console.log('Result', result);
    //   //this.csvRecords = result;
    // }, (error: NgxCSVParserError) => {
    //   console.log('Error', error);
    // });
  }
}
