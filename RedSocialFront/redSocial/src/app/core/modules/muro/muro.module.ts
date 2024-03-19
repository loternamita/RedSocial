/* eslint-disable @typescript-eslint/consistent-type-imports */
// muro.module.ts
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { MuroComponent } from './components/muro.component'

const routes: Routes = [
  { path: '', component: MuroComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MuroModule { }
