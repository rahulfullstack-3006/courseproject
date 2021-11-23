import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule  } from 'ngx-bootstrap/datepicker';
import { CourseComponent } from './course/course.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CourseFilterPipe } from './course/course-filter.pipe';
import {HttpClientModule} from '@angular/common/http'
import { AuthService } from './auth.service';
import { AddcourseComponent } from './addcourse/addcourse.component';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CourseComponent,
    CourseFilterPipe,
    AddcourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    FormsModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot()

    // AngularFontAwesomeModule
  ],
  // schemas:[NO_ERRORS_SCHEMA], 
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
