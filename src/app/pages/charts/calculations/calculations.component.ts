import { Component, OnInit } from '@angular/core';
import {CalculationService} from "../../../shared/calculation.service";
import {DataService} from "../../../shared/data.service";
import {Stat} from "../../../shared/Stat";
import {FaceProperties} from "../../../shared/FaceProperties";

@Component({
  selector: 'app-calculations',
  templateUrl: './calculations.component.html',
  styleUrls: ['./calculations.component.css']
})
export class CalculationsComponent implements OnInit {
  stats: Stat[] | undefined;
  statsConverted: FaceProperties[];
  avg: number = 0;
  variation: number = 0;
  asym: number = 0;
  basicCorellation = 0;

  //Corellation
  avgSpeedDistanceC = 0;
  distanceRivalsC = 0;
  daysStageC = 0;
  avgSpeedStagesC = 0;

  constructor(private calcService: CalculationService, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.loadData().subscribe(dat => {
      this.stats = dat;
      this.avg = this.calcService.calcAvg(this.stats);
      this.variation = this.calcService.calcVariantion(this.stats);
      this.asym = this.calcService.calcAsym(this.variation, this.avg, this.stats);

      // Corellation

      this.statsConverted = this.dataService.getPreparedData();

      let distances = new Array<number>();
      let avgSpeed = new Array<number>();
      let finishers = new Array<number>();
      let days = new Array<number>();
      let stages = new Array<number>();

      this.statsConverted.forEach(stat => {
        distances.push(stat.faceWidth);
        avgSpeed.push(stat.faceHeight);
        finishers.push(stat.noseHeight);
        days.push(stat.mouthSmile);
        stages.push(stat.brewLength);
      });

      this.avgSpeedDistanceC = this.calcService.calcCorelation(avgSpeed, distances);
      this.distanceRivalsC = this.calcService.calcCorelation(distances, finishers);
      this.daysStageC = this.calcService.calcCorelation(days, stages);
      this.avgSpeedStagesC = this.calcService.calcCorelation(avgSpeed, stages);
    });
  }

  selectCorellationCategory(inp: number) {
    let inpAbs = Math.abs(inp);
    if(inpAbs >= 0.9 && inpAbs < 1) return '(korelacja prawie pełna)';
    if(inpAbs >= 0.5 && inpAbs < 0.7) return '(korelacja wysoka/ bardzo wysoka)';
    if(inpAbs >= 0.3 && inpAbs < 0.5) return '(korelacja przeciętna)';
    if(inpAbs >= 0 && inpAbs < 0.3) return '(korelacja nie istnieje/ nikła/ słaba)';
    return '(non)';
  }
}
