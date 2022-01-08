import { Component, OnInit } from '@angular/core';
import {DataService} from "../../shared/data.service";
import {Stat} from "../../shared/Stat";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  options: any;
  stats: Stat[] | undefined;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.loadData().subscribe(data => {
      this.stats = data;

      const xAxisData = [];
      const data1 = [];
      const data2 = [];

      for (let i = 0; i < this.stats.length; i++) {
        xAxisData.push('rok ' + this.stats[i].year);
        data1.push(Number(this.stats[i].entrants.replace(",",".")));
        data2.push(Number(this.stats[i].finishers.replace(",",".")));
      }

      this.options = {
        legend: {
          data: ['Startowało', 'Skończyło'],
          align: 'left',
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          silent: false,
          splitLine: {
            show: false,
          },
        },
        yAxis: {},
        series: [
          {
            name: 'Startowało',
            type: 'bar',
            data: data1,
            animationDelay: (idx: number) => idx * 10,
          },
          {
            name: 'Skończyło',
            type: 'bar',
            data: data2,
            animationDelay: (idx: number) => idx * 10 + 100,
          },
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: (idx: number) => idx * 5,
      };



    });
  }
}
