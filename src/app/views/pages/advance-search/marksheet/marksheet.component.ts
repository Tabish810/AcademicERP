import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { ApiServiceService } from '../../../../services/common/api-service.service';

@Component({
  selector: 'kt-marksheet',
  templateUrl: './marksheet.component.html',
  styleUrls: ['./marksheet.component.scss']
})
export class MarksheetComponent implements OnInit {
  allClasses: any;
  allExams: any;
  allSection: any;
  institutes : any;
  input : any = {};
  constructor(private notification: NzNotificationService,
    private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }
  getAllClasses() {
    this.apiService.classService.getAllClass().subscribe((res: any) => {
      this.allClasses = res;
      console.log("Classes ", this.allClasses)
    })
  }
  getAllInstitute() {
    this.apiService.instituteService.getAllInstitute().subscribe((res: any) => {
      this.institutes = res;
      console.log("Institute ", this.institutes)
    })
  }
  getAllExam(){
    this.apiService.examService.getAllExam().subscribe((res)=>{
      this.allExams = res;
      console.log("Exam ", this.allExams)
    })
  }
  getAllSection() {
    this.apiService.sectionService.getAllSection().subscribe((res: any) => {
      this.allSection = res;
      console.log("Section ", this.allSection)
    })
  }
  getData(){
    this.getAllClasses();
    this.getAllSection();
    this.getAllExam();
  }
  ngOnInit() {
    this.getData();
  }

}
