//imports
import { NgModule } from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';

//base route
const routes: Routes = [
  {path: '', component: AdminComponent},
];

//further routing
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
