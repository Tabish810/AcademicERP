import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-academice',
  templateUrl: './academice.component.html',
  styleUrls: ['./academice.component.scss']
})
export class AcademiceComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
