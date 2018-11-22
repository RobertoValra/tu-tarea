import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

	userType: string[];
	autoManufacturers: string;

	ngOnInit(): void {
		this.userType = ['Maestro', 'Padre']
	}
} 
