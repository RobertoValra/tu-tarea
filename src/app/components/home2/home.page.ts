import { Component, OnInit } from '@angular/core';
import { LifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage  {
  userType: string[];
  autoManufacturers: string;

  OnInit(): void {
    this.userType = ['Maestro', 'Padre'];
  }
}
