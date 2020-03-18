import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SQLiteService } from '../sqlite.service';
import { Photo } from '../photo.interface';
@Component({
  selector: 'ns-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  id: number;
  photo: Photo;
  private sub: any;
  image: String;

  constructor(private route: ActivatedRoute, private database: SQLiteService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.photo = {"id": params["id"], 
                    "title": params["title"], 
                    "description": params["description"], 
                    "img": params["img"], 
                    "date": params["date"], 
                    "time": params["time"]
                    };
      console.log(this.photo);
    });
    this.image = "data:image/png;base64,"+this.photo["img"]; 
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}