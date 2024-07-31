import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//module
import { ReactiveFormsModule } from '@angular/forms';

//angular material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
/* import { MatMenuModule } from '@angular/material/menu'; // Add this line
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav'; */



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
 /*    MatListModule,
    MatSidenavModule, */
    MatIconModule,
/*     MatToolbarModule,
    MatMenuModule, */
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule
  ],
  exports: [
/*     MatListModule,
    MatSidenavModule, */
    MatIconModule,
/*     MatToolbarModule,
    MatMenuModule, */
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule
  ]
})
export class SharedModule { }
