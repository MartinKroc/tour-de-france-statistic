import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FaceProperties} from "../../../shared/FaceProperties";
import {DataService} from "../../../shared/data.service";
import {Stat} from "../../../shared/Stat";

@Component({
  selector: 'app-chernoff',
  templateUrl: './chernoff.component.html',
  styleUrls: ['./chernoff.component.css']
})
export class ChernoffComponent implements OnInit {
  data: Stat[] = [];
  dataConverted: FaceProperties[] = [];
  stepX: number = 100;
  stepY: number = 120;
  constructor(private ds: DataService) {
  }

  @ViewChild('canvas', {static: true})
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D | null;

  ngOnInit(): void {
    this.ds.loadData().subscribe(data => {
      this.data = data;
      if(this.ctx === null) {
        throw new Error('failed');
      } else {
        this.ctx = this.canvas.nativeElement.getContext('2d');
        this.convertData();
        this.animate();
      }
    });
  }

  animate(): void {
    if(this.ctx !== null) {
      this.dataConverted.forEach(el => {
        if(this.ctx !== null) {
          const face = new Face(this.ctx, el, this.stepX, this.stepY);
          console.log(el);
          face.draw();
          this.stepX += 300;
          if(this.stepX > 1200) {
            this.stepY += 220;
            this.stepX = 120;
          }
        } else {
          console.log('nothing')
        }
      });
    }
  }

  private convertData() {
    function setEarCol(el: Stat) {
      switch (el.winnersNationality) {
        case 'France': return '#FF8C00';
        case 'Luxembourg': return 'blue';
        case 'Belgium': return 'yellow';
        case 'Italy': return 'green';
        case 'Switzerland': return '#808000';
        case 'Spain': return 'silver';
        case 'USA': return 'orange';
        case 'Ireland Irish': return 'azure';
        case 'Denmark': return 'blueviolet';
        case 'Germany': return 'darkred';
        case 'Australia': return 'deeppink';
        case 'United Kingdom': return 'forestgreen';
        default: return 'midnightblue';
      }
    }

    function setEyeCol(el: Stat) {
      switch (el.startingCountry) {
        case 'France': return '#FF8C00';
        case 'Netherlands': return 'blue';
        case 'Belgium': return 'yellow';
        case 'Switzerland': return '#808000';
        case 'Germany': return 'darkred';
        case 'United Kingdom': return 'forestgreen';
        case 'Spain': return 'silver';
        case 'Ireland': return 'azure';
        default: return 'midnightblue';
      }
    }

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
        earCol: setEarCol(el),
        eyeCol: setEyeCol(el),
        faceWidth: Number(el.totalDistance.replace(/\s/g, '').replace(",",".")),
        mouthSmile: days,
        noseHeight: Number(el.finishers.replace(",",".")),
        noseSize: Number(el.entrants.replace(",",".")),
        year: el.year
      });
    });
  }
}

export class Face {
  constructor(private ctx: CanvasRenderingContext2D, private faceProp: FaceProperties, private stX: number, private stY: number) {}

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'white';
    this.ctx.ellipse(this.stX, this.stY, this.faceProp.faceWidth/50, this.faceProp.faceHeight+50, 0, 0, Math.PI*2); // Outer circle
    this.ctx.moveTo(this.stX + this.faceProp.faceWidth/50 + 5, this.stY-10);
    this.ctx.ellipse(this.stX + this.faceProp.faceWidth/50+ 5, this.stY-10, 5, 10, 0, 0,Math.PI*2); //ear right
    this.ctx.moveTo(this.stX - this.faceProp.faceWidth/50- 5, this.stY-10);
    this.ctx.ellipse(this.stX - this.faceProp.faceWidth/50- 5, this.stY-10, 5, 10, 0, 0,Math.PI*2); //ear left
    this.ctx.moveTo(this.stX + this.faceProp.mouthSmile,this.stY+13);
    this.ctx.fillStyle = this.faceProp.earCol;
    this.ctx.fill();
    this.ctx.arc(this.stX,this.stY+13, this.faceProp.mouthSmile,0,Math.PI,false);  // Mouth (clockwise)
    this.ctx.fill();
    let eyePos = -10;
    if(this.faceProp.year > 1951) eyePos = -20;
    if(this.faceProp.year > 1980) eyePos = -50;
    if(this.faceProp.year > 2009) eyePos = -55;
    this.ctx.moveTo(this.stX - 10,this.stY - 10 + eyePos);
    this.ctx.arc(this.stX - 15,this.stY - 10 + eyePos,5,0,Math.PI*2,true);  // Left eye
    this.ctx.moveTo(this.stX + 20,this.stY - 10 + eyePos);
    this.ctx.arc(this.stX + 15,this.stY - 10 + eyePos,5,0,Math.PI*2,true);  // Right eye
    this.ctx.fillStyle = this.faceProp.eyeCol;
    this.ctx.fill();
    //brew left
    this.ctx.moveTo(this.stX - 24, this.stY - 21 + eyePos);
    this.ctx.lineTo(this.stX - 24 + this.faceProp.brewLength, this.stY - 21 + eyePos);
    //brew right
    this.ctx.moveTo(this.stX + 24, this.stY - 21 + eyePos);
    this.ctx.lineTo(this.stX + 24 - this.faceProp.brewLength, this.stY - 21 + eyePos);

    this.ctx.stroke();

    this.ctx.beginPath();
    //nose size ( width )
    let tempW = this.faceProp.noseSize/2;
    this.ctx.moveTo(this.stX - tempW/2, this.stY + 9);
    this.ctx.lineTo(this.stX + tempW/2, this.stY + 9);

    //nose height
    let tempH = this.faceProp.noseHeight/2;

    //rest of nose
    this.ctx.moveTo(this.stX - tempW/2, this.stY + 9);
    this.ctx.lineTo(this.stX, this.stY + 10 - tempH);
    this.ctx.moveTo(this.stX + tempW/2, this.stY + 9);
    this.ctx.lineTo(this.stX, this.stY + 10 - tempH);

    this.ctx.stroke();

    this.ctx.strokeStyle = 'black';
    this.ctx.font = '16px Arial';
    this.ctx.strokeText(this.faceProp.year.toString(), this.stX - 20, this.stY - this.faceProp.faceHeight - 60);
  }
}
