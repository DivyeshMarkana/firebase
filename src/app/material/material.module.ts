import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const material = [MatSnackBarModule]

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
