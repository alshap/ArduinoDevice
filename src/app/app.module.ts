import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";


import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";


import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ViewPageComponent } from './view-page/view-page.component';
import { ImgRecognitionComponent } from './img-recognition/img-recognition.component';
import { NewRecordComponent } from './new-record/new-record.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { MainComponent } from './main/main.component';
import { MlKitRecognitionComponent } from './ml-kit-recognition/ml-kit-recognition.component';



import { routes } from './app-routing.module';
import { registerElement } from "nativescript-angular/element-registry";
registerElement("MLKitObjectDetection", () => require("nativescript-plugin-firebase/mlkit/objectdetection").MLKitObjectDetection);
registerElement("MLKitCustomModel", () => require("nativescript-plugin-firebase/mlkit/custommodel").MLKitCustomModel);

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptUISideDrawerModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild(routes)
    ],
    declarations: [
        AppComponent,
        ViewPageComponent,
        ImgRecognitionComponent,
        NewRecordComponent,
        ItemDetailsComponent,
        MainComponent,
        MlKitRecognitionComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
