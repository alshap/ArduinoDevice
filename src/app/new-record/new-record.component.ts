/**
 * Script taken from official example github
 * https://github.com/NativeScript/nativescript-camera/tree/master/demo-angular/app
 */
import { Component, OnInit } from '@angular/core';
import { takePicture, requestPermissions } from 'nativescript-camera';
import { ImageAsset } from 'tns-core-modules/image-asset';
import { SQLiteService } from '../sqlite.service';
import { ImageSource } from "tns-core-modules/image-source";


@Component({
  selector: 'ns-new-record',
  templateUrl: './new-record.component.html',
  styleUrls: ['./new-record.component.css']
})
export class NewRecordComponent implements OnInit {

  public saveToGallery: boolean = false;
  public allowsEditing: boolean = false;
  public keepAspectRatio: boolean = true;
  public width: number = 320;
  public height: number = 240;
  public cameraImage: ImageAsset;
  public actualWidth: number;
  public actualHeight: number;
  public scale: number = 1;
  public labelText: string;
  public img_title: string;
  public img_description: string;
  public imgsrc_base64: string;

  constructor(private database: SQLiteService) {}

  ngOnInit(){}
  public onTakePictureTap(args) {
      requestPermissions().then(
          () => {
              takePicture({ width: this.width, height: this.height, keepAspectRatio: this.keepAspectRatio, saveToGallery: this.saveToGallery, allowsEditing: this.allowsEditing })
                  .then((imageAsset: any) => {
                      this.cameraImage = imageAsset;
                      const source = new ImageSource();
                      source.fromAsset(imageAsset).then(res => {
                        this.imgsrc_base64 = res.toBase64String("jpeg", 100);
                        console.log("base64: ",this.imgsrc_base64); //debug
                      });
                      let that = this;
                      imageAsset.getImageAsync(function (nativeImage, ex) {
                          if (ex instanceof Error) {
                              throw ex;
                          } else if (typeof ex === "string") {
                              throw new Error(ex);
                          }

                          if (imageAsset.android) {
                              // get the current density of the screen (dpi) and divide it by the default one to get the scale
                              that.scale = nativeImage.scale;
                              that.actualWidth = nativeImage.getWidth();
                              that.actualHeight = nativeImage.getHeight();
                          } else {
                              that.scale = nativeImage.scale;
                              that.actualWidth = nativeImage.size.width * that.scale;
                              that.actualHeight = nativeImage.size.height * that.scale;
                          }
                          that.labelText = `Displayed Size: ${that.actualWidth}x${that.actualHeight} with scale ${that.scale}\n` +
                              `Image Size: ${Math.round(that.actualWidth / that.scale)}x${Math.round(that.actualHeight / that.scale)}`;

                          console.log(`${that.labelText}`); //debug
                      });
                  }, (error) => {
                      console.log("Error: " + error); //debug
                  });
          },
          () => alert('permissions rejected')
      );
  }

  public saveImage(){
    if (this.img_title != "" && this.img_description != "" && this.imgsrc_base64 != ""){
      this.database.insert(this.img_title, this.img_description, this.imgsrc_base64);
      console.log("INSERT SUCCESS. T: ",this.img_title," D: ",this.img_description); //debug
    }
    else{
      console.log("INSERT FAILED") //debug
    }
  }

  public onTitleChanged(args){
    this.img_title = args.object["text"];
  }

  public onDescriptionChanged(args){
    this.img_description = args.object["text"];
  }

    

}

