import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ViewPageComponent } from "./view-page/view-page.component";
import { MainComponent} from "./main/main.component";
import { ItemDetailsComponent} from "./item-details/item-details.component";
import { NewRecordComponent} from "./new-record/new-record.component";
import { ImgRecognitionComponent } from "./img-recognition/img-recognition.component"
import { MlKitRecognitionComponent} from "./ml-kit-recognition/ml-kit-recognition.component";

export const routes: Routes = [
    { path: "", redirectTo: "/main", pathMatch: "full" },
    { path: "main", component: MainComponent},
    { path: "view-page", component: ViewPageComponent },
    { path: "item-details", component: ItemDetailsComponent},
    { path: "new-record", component: NewRecordComponent},
    { path: "img-recognition", component: ImgRecognitionComponent},
    { path: "ml-kit-recognition", component:  MlKitRecognitionComponent},
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
