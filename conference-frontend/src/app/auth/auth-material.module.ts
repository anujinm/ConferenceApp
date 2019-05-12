//import button

import {
  MatButtonModule,
  MatFormFieldModule, MatInputModule,
} from '@angular/material';
import {NgModule} from '@angular/core';


//export fields
@NgModule({
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})

export class AuthMaterialModule {}
