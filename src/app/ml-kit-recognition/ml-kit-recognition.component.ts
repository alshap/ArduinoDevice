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

  constructor() {
    super();
   }

   ngOnInit(){

   }

  objs: Array<MLKitObjectDetectionResultItem>;

  onObjectDetectionResult(scanResult: any): void {
    const value: MLKitObjectDetectionResult = scanResult.value;
    this.objs = value.objects;
    value.objects.forEach(o => console.log(">> id: " + o.id + ", category: " + o.category + ", bounds: " + JSON.stringify(o.bounds)));
  }

}
