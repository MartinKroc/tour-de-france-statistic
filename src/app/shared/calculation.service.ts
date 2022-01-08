import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import {Stat} from "./Stat";
import {sqrt, variance} from "mathjs";


@Injectable({
  providedIn: 'root'
})
export class CalculationService {
  constructor() {

  }
  calcAvg(data: Stat[]) {
    let sum = 0;
    data.forEach(el => {
      sum+=Number(el.totalDistance.replace(/\s/g, '').replace(",","."));
    });
    return sum / data.length;
  }

  calcVariantion(data: Stat[]) {
    let distances = new Array<number>();
    data.forEach(d => distances.push(Number(d.totalDistance.replace(/\s/g, '').replace(",","."))));
    return sqrt(variance(distances));
  }

  calcAsym(vari: number, avg:number, data: Stat[]) {
    return (avg)/vari;
  }

  calcCorelation(x:Array<number>, y:Array<number>) {
    let sumX = 0,
      sumY = 0,
      sumXY = 0,
      sumX2 = 0,
      sumY2 = 0;
    const minLength = x.length = y.length = Math.min(x.length, y.length),
      reduce = (xi:any, idx:any) => {
        const yi = y[idx];
        sumX += xi;
        sumY += yi;
        sumXY += xi * yi;
        sumX2 += xi * xi;
        sumY2 += yi * yi;
      }
    x.forEach(reduce);
    return (minLength * sumXY - sumX * sumY) / Math.sqrt((minLength * sumX2 - sumX * sumX) * (minLength * sumY2 - sumY * sumY));
  }
}
