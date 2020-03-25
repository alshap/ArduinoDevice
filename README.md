# Arduino devices recognition project
## How to run project?

1. Clone this repository

2. Open project folder

3. Add platforms
```
tns platform add android
```
4. Run project(necessary libraries will download automatically)
```
tns run android
```

## How to create MlKit Custommodel and configure it
*Look at this sample project*
https://github.com/alshap/nativescript-ng-MlKitCustomModel-howto

## About project

This project has sidedrawer, sqlite, firebase and mlkit recognition.
**MlKit Sample Track** is a example of standart MlKit object detection. 
**MlKit Devices Rec** is a configured custommodel recognition which recognies models and if they are in sqlite database then shows details about this devices.
## About SideDrawer

SideDrawer is a Drawer created using RadSideDrawer library. More about RadSideDrawer https://docs.nativescript.org/ui/components/SideDrawer/overview
Drawer located in src/app/app.component and can be called by left swiping on each app screen.
It can be added as button on each page. Look at main.component how is it implemented.
## About SQLite
SQLite official documentation https://github.com/NathanaelA/nativescript-sqlite
SQLite is implemented in src/app/sqlite.service.ts as a service.
It can be called on each page as database.
