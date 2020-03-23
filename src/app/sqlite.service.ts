import { Injectable } from "@angular/core";
import { Photo } from "./photo.interface";
var Sqlite = require("nativescript-sqlite");


  @Injectable({
    providedIn: 'root'
  })
export class SQLiteService {
        private database: any;
        private photos: Array<Photo>;

        public constructor(){
            //if (!Sqlite.exists("photos.db")) {
                /**
                 * works fine only on iPhone
                 * Can be problem with copying db file to android devices on some devices
                 * https://github.com/NathanaelA/nativescript-sqlite/issues/62
                 * not resolved yet
                 */
            //    Sqlite.copyDatabase("photos.db");
            //}
            this.photos = [];
            (new Sqlite("photos.db")).then(db => {
                db.execSQL("CREATE TABLE IF NOT EXISTS photos(id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT, description TEXT, img TEXT, date TEXT, time TEXT)").then(id => {
                    this.database = db;
                    this.fetch();
                }, error => {
                    console.log("CREATE TABLE ERROR: ", error);
                });
            }, error => {
                console.log("OPEN DB ERROR: ", error);
            });
        }

        public insert(title: String, description: String, img: String) {
            let today = new Date();
            let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let data = [title, description, img, date, time];
            this.database.execSQL("INSERT INTO photos (title, description, img, date, time) VALUES (?, ?, ?, ?, ?)", data).then(id => {
                //load again
                this.fetch();
            }, error => {
                console.log("INSERT ERROR: ", error);
            });
        }

        public fetch() {
            this.database.all("SELECT * from photos").then(rows => {
                this.photos = [];
                for(let row in rows) {
                    this.photos.push({
                        "id": rows[row][0],
                        "title": rows[row][1],
                        "description": rows[row][2],
                        "img": rows[row][3],
                        "date": rows[row][4],
                        "time": rows[row][5]
                    });
                }
            }, error => {
                console.log("SELECT ERROR", error);
            }); 
        }

        public getPhoto(id){
            var photo: Photo;
            this.database.get("SELECT * from photos WHERE id = (?)",[id]).then(data => {
                console.log("DATA: ",data);
                photo = {
                    "id": data[0],
                    "title": data[1],
                    "description": data[2],
                    "img": data[3],
                    "date": data[4],
                    "time": data[5]
                };
            });

            
            console.log(photo); //debug
            return photo;
        }

        /**
        public getPhotoByTitle(title){
            var photo: Photo;
            -this.database.get("SELECT * from photos WHERE title = (?) LIMIT 1",[title]).then(data => {
                
                photo = {
                    "id": data[0],
                    "title": data[1],
                    "description": data[2],
                    "img": data[3],
                    "date": data[4],
                    "time": data[5]
                };
                
                -console.log(data);
            });
            return data;
        }
        */

        public vacuum() {
            this.database.execSQL('DELETE FROM photos');
            this.database.execSQL('VACUUM photos');
            this.database.execSQL('UPDATE sqlite_sequence SET seq = 0 WHERE name = "photos"');
            this.fetch();
        }

        public getPhotos() {
            return this.photos;
        }
 }