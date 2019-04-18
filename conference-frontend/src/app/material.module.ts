import {
  MatCommonModule,
  MatTabsModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSnackBarModule, MatDialogModule, MatTooltipModule, MatCardModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatSelectModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  exports: [
    MatTabsModule,
    MatCommonModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
})

export class MaterialModule {}
