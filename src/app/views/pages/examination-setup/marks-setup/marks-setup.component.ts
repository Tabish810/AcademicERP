
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { ApiServiceService } from '../../../../services/common/api-service.service';

@Component({
  selector: 'kt-marks-setup',
  templateUrl: './marks-setup.component.html',
  styleUrls: ['./marks-setup.component.scss']
})
export class MarksSetupComponent implements OnInit {

  allClasses: any;
  allExams: any;
  allSection: any;
  institutes: any;
  input: any = {};
  allStudent;
  marksDetails = [
    {
      id: 1,
      subject: "subject1",
      TotalMarks: null,
      PassingMarks: null,
      ObtainMarks: null,
      GradeNo: null,
      Result: null
    },
    {
      id: 2,
      subject: "subject2",
      TotalMarks: null,
      PassingMarks: null,
      ObtainMarks: null,
      GradeNo: null,
      Result: null
    },
    {
      id: 3,
      subject: "subject3",
      TotalMarks: null,
      PassingMarks: null,
      ObtainMarks: null,
      GradeNo: null,
      Result: null
    },
  ]
  constructor(private notification: NzNotificationService,
    private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }



  addRow(row) {
    console.log(row);

  }
  deleteRow(row) {
    console.log(row);
  }
  subjects;
  getSubjects() {
    this.subjects = this.marksDetails.filter(data => data.subject);
    console.log(this.subjects);

  }
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
  getAllExam() {
    this.apiService.examService.getAllExam().subscribe((res) => {
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
  allSubject;
  getallSubject() {
    this.apiService.subjectService.getAllSubject().subscribe((res: any) => {
      this.allSubject = res;
      console.log("Subjectss ", this.allSubject)
    })
  }
  checkAllSelected() {
    let notSelected = false;
    this.subjects.some(el => {
      if (!el.result) {
        notSelected = true;
        return true;
      }
    });
    return notSelected;
  }
  totalmarks;
  totalObtainmarks;
  percentage;
  onSave() {
    this.totalmarks = 0;
    this.input.Details = this.marksDetails;
    this.input.Details.map(data=>{
      this.totalmarks = data.TotalMarks;
      this.totalObtainmarks = data.ObtainMarks;
    })
    this.input.TotalMark = this.totalmarks;
    this.input.TotalObtainMark = this.totalObtainmarks;
    this.input.Percentage = (this.input.TotalObtainMark/this.input.TotalMark)*100;
    console.log(this.input);
  }
  getAllStudent() {
    this.apiService.studentService.getAllStudent().subscribe((res: any) => {
      this.allStudent = res;
      console.log("students :", this.allStudent);
    })
  }
  studentsByClass;
  classSubjects;
  getStudentByClass() {
    this.studentsByClass = this.allStudent.filter(data => data.AddmitionIn == this.input.ClassNo);
    console.log(this.studentsByClass);
    this.classSubjects = this.allSubject.filter(data => data.ClassNo == this.input.ClassNo);
    console.log(this.classSubjects);
  }
  getData() {
    this.getAllClasses();
    this.getAllSection();
    this.getAllExam();
    this.getSubjects();
    this.getAllStudent();
    this.getallSubject();
  }
  ngOnInit() {
    this.getData();
  }
}
