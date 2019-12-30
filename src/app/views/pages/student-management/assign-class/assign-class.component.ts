import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../../../services/common/api-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
declare const $: JQueryStatic;

@Component({
  selector: 'kt-assign-class',
  templateUrl: './assign-class.component.html',
  styleUrls: ['./assign-class.component.scss']
})
export class AssignClassComponent implements OnInit {
  isVisible = false;
  assignclassForm: FormGroup;
  allClasses;
  dataTable: any;
  flag = true;
  submitted = false;
  allSection: any;
  section;
  assignClass = {
    ClassID: null,
    SectionID: null,
  }
  constructor(private notification: NzNotificationService, private formBuilder: FormBuilder, private httpClient: HttpClient, private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }

  ngOnInit() {
    this.assignclassForm = this.formBuilder.group({
      ClassID: new FormControl(name, [Validators.required, Validators.minLength(4)]),
      SectionID: new FormControl(name, Validators.required)
    });

    this.getAllSection();
    this.getAllClass();
  }
  getAllClass() {
    this.apiService.classService.getAllClass().subscribe((res: any) => {
      this.allClasses = res;
      console.log("Classes ", this.allClasses)
      console.log("Response ", res)
      // this.DataTablesFunctionCallAfterDataInit();
    })
  }
  getAllSection() {
    this.apiService.sectionService.getAllSection().subscribe((res: any) => {
      this.allSection = res;
      console.log("Section ", this.allSection)
    })

  }
  getSectByID(id) {
    console.log("this.allClasses", this.allClasses)
    console.log("this.allSection", this.allSection)
    console.log("SEC ID ", id)
    if (this.allClasses != undefined && this.allSection != undefined) {
      this.section = this.allSection.find(x => x.SectionID == id).SectionName;
      console.log("SEction ", this.section)
      return this.section;
    }
  }



}
