import { Component, OnInit } from '@angular/core';
import { SQLiteService } from '../sqlite.service';
import { Photo } from "../photo.interface";
import { EventData } from "tns-core-modules/data/observable";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { Router } from '@angular/router';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

@Component({
  selector: 'ns-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.css']
})
export class ViewPageComponent implements OnInit {
  private SQLitephotos: Array<Photo>;
  private firebasephotos: Array<Photo>;
  public listSelect: Array<String> = ["Local storage", "Firebase storage"];
  public isListLocal: boolean = true;

  constructor (private database: SQLiteService, private _router:Router ) {}
  ngOnInit(): void {
    this.closeDrawerOnInit()
    this.SQLitephotos = this.database.getPhotos();
  }

  public deletePhotos() {
    this.database.vacuum();
    this.SQLitephotos = this.database.getPhotos();
  }

  public onSelectedIndexChanged(args: EventData) {
    const picker = <ListPicker>args.object;
    if (picker.selectedIndex == 0){ //change for regular expr
        this.isListLocal = true;
    }else{ this.isListLocal = false; }
}

public navigateToDetail(id, title, description, img, date, time){
  this._router.navigate(['/item-details', {
                    "id": id,
                    "title": title,
                    "description": description,
                    "img": img,
                    "date": date,
                    "time": time
  }]);
}

public exportPhotosToFirebase(){}

onDrawerButtonTap(): void {
  const sideDrawer = <RadSideDrawer>app.getRootView();
  sideDrawer.showDrawer();
}

closeDrawerOnInit(){
  const sideDrawer = <RadSideDrawer>app.getRootView();
  sideDrawer.closeDrawer();
}

}
