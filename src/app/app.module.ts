import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';

import { AppComponent } from './app.component';
import { GraphFormComponent } from './graph-form/graph-form.component';
import { GraphAreaComponent } from './graph-area/graph-area.component';
import { ColumnsListComponent } from './columns-list/columns-list.component';
import { FileSelectorComponent } from './file-selector/file-selector.component';
import { FileSelectorService } from './file-selector/file-selector.service';

@NgModule({
  declarations: [
    AppComponent,
    GraphFormComponent,
    GraphAreaComponent,
    ColumnsListComponent,
    FileSelectorComponent
  ],
  imports: [
    FormsModule,
    DndModule.forRoot(),
    BrowserModule
  ],
  providers: [
    FileSelectorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
