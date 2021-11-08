import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {DataService} from "../../shared/data.service";
import {Stat} from "../../shared/Stat";

@Component({
  selector: 'app-tabular',
  templateUrl: './tabular.component.html',
  styleUrls: ['./tabular.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TabularComponent implements OnInit {
  dataSource: Stat[] = [];
  columnsToDisplay = ['year', 'startingCity', 'winner', 'numberOfStages'];
  expandedElement: Stat | null | undefined;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.loadData().subscribe(data => {
      this.dataSource = data;
    })
  }
}
