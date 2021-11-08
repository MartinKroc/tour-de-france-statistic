import { Component, OnInit } from '@angular/core';
import {DataService} from "../../shared/data.service";
import {Stat} from "../../shared/Stat";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  stats: Stat[] | undefined;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.loadData().subscribe(data => {
      this.stats = data;
      console.log(this.stats);
    })
  }

}
