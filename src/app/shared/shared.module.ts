import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MigasPanComponent } from './migas-pan/migas-pan.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';



@NgModule({
  declarations: [
    SideBarComponent,
    FooterComponent,
    HeaderComponent,
    MigasPanComponent,
    SpinnerComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ], 
  exports: [
    SideBarComponent,
    FooterComponent,
    HeaderComponent,
    MigasPanComponent,
    SpinnerComponent

  ]
})
export class SharedModule { }
