import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.page.html',
  styleUrls: ['./user-type.page.scss'],
})
export class UserTypePage {

  constructor() { }

  userType: string[];
	autoManufacturers: string;

	OnInit(): void {
		this.userType = ['Maestro', 'Padre']
	}
}
