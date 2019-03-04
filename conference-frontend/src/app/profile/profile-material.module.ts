import {
  MatButtonModule, MatCardModule, MatDatepickerModule, MatDividerModule, MatExpansionModule,
  MatFormFieldModule, MatInputModule, MatListModule, MatNativeDateModule, MatSelectModule, MatStepperModule, MatTabsModule, MatToolbarModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatTabsModule,
  ],
})

export class ProfileMaterialModule {}
