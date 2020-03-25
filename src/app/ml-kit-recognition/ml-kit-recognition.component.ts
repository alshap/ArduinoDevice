import { Component, OnInit } from '@angular/core';
import { ImageSource } from "tns-core-modules/image-source";
import { MLKitObjectDetectionResult, MLKitObjectDetectionResultItem } from "nativescript-plugin-firebase/mlkit/objectdetection";
import { AbstractMLKitViewComponent } from "./abstract.mlkitview.component";

@Component({
  selector: 'ns-ml-kit-recognition',
  templateUrl: './ml-kit-recognition.component.html',
  styleUrls: ['./ml-kit-recognition.component.css']
})
export class MlKitRecognitionComponent extends AbstractMLKitViewComponent implements OnInit{

  pickedImage: ImageSource;
  imagePath: ImageSource;
  htmlString: String;
  objectWidth: number;
  objectHeight: number;
  originX: number;
  originY: number;
  labelStyle: String;

  constructor() {
    super();
   }

   ngOnInit(){

   }

  objs: Array<MLKitObjectDetectionResultItem>;

  onObjectDetectionResult(scanResult: any): void {
    const value: MLKitObjectDetectionResult = scanResult.value;
    this.objs = value.objects; 
    value.objects.forEach(o => {
      this.objectWidth = o.bounds.size.width;
      this.objectHeight = o.bounds.size.height;
      this.originX = o.bounds.origin.x;
      this.originY = o.bounds.origin.y;
      console.log(">> id: " + o.id + ", category: " + o.category + ", bounds: " + JSON.stringify(o.bounds))
    });
    //this.htmlString = '<div style="background-color: transparent;width:'+this.objectWidth/10+'px'+';height:'+this.objectHeight/10+'px;border:5px solid;margin-left:'+this.originX+';margin-top:'+this.originY+';"></div>';
    this.labelStyle = 'width:'+this.objectWidth+'px'+';height:'+this.objectHeight+
                      'px;border-width: 8px;border-color: black;border-radius: 30;margin-left:'+
                      (this.originX-this.objectWidth)+'px;margin-top:'+this.originY+'px';
  }

}
