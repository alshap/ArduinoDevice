import { Component, OnInit } from '@angular/core';
import { MLKitCustomModelResult } from "nativescript-plugin-firebase/mlkit/custommodel";
import { SQLiteService } from '../sqlite.service';
import { Photo } from "../photo.interface";
import { Router } from '@angular/router';


@Component({
  selector: 'ns-img-recognition',
  templateUrl: './img-recognition.component.html',
  styleUrls: ['./img-recognition.component.css']
})

export class ImgRecognitionComponent implements OnInit {

  
  labels: Array<{
    text: string;
    confidence: number;
  }>; 
  foundDevice: string;
  foundDeviceCheck: boolean = false;
  foundDeviceTitle: string;
  private SQLitephotos: Array<Photo>;
  constructor(private database: SQLiteService, private _router:Router) { }

  ngOnInit(): void {
    this.SQLitephotos = this.database.getPhotos();
  }

  

  onCustomModelResult(scanResult: any): void {
    const value: MLKitCustomModelResult = scanResult.value;
    this.labels = value.result;
    //console.log(this.labels);
    this.labels.forEach(device => {
        if (device.confidence > 0.5 && this.foundDeviceCheck == false){
          this.foundDevice = "This is " + device.text + ". Press button to check device details";
          this.foundDeviceTitle = device.text;
          this.foundDeviceCheck = true;
        }else{
          this.foundDevice = "No devices founded";
          this.foundDeviceCheck = false;
        }
    });
  }

  public navigateToDetail(){
    //var photo = this.database.getPhotoByTitle(this.foundDeviceTitle);
    for (var counter: number = 0;counter<this.SQLitephotos.length; counter++){
        if (this.SQLitephotos[counter].title == this.foundDeviceTitle){
          this._router.navigate(['/item-details', {
            "id": this.SQLitephotos[counter]["id"],
            "title": this.SQLitephotos[counter]["title"],
            "description": this.SQLitephotos[counter]["description"],
            "img": this.SQLitephotos[counter]["img"],
            "date": this.SQLitephotos[counter]["date"],
            "time": this.SQLitephotos[counter]["time"]
            }]);
        }
    }
  }

}
