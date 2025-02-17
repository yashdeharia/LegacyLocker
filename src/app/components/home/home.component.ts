import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  name: string = '';
  doc: string = '';
  // num: number | null = null;

  submitForm(){
    alert("Name: " + this.name + "documet: " + this.doc );
  }


  
}
