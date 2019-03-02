import {
  MatButtonModule,
  MatFormFieldModule, MatInputModule,
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})

export class AuthMaterialModule {}
