
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
  // marksDetails = [
  //   {
  //     id: 1,
  //     subject: "subject1",
  //     TotalMarks: null,
  //     PassingMarks: null,
  //     ObtainMarks: null,
  //     GradeNo: null,
  //     Result: null
  //   },
  //   {
  //     id: 2,
  //     subject: "subject2",
  //     TotalMarks: null,
  //     PassingMarks: null,
  //     ObtainMarks: null,
  //     GradeNo: null,
  //     Result: null
  //   },
  //   {
  //     id: 3,
  //     subject: "subject3",
  //     TotalMarks: null,
  //     PassingMarks: null,
  //     ObtainMarks: null,
  //     GradeNo: null,
  //     Result: null
  //   },
  // ]
  constructor(private notification: NzNotificationService,
    private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }



  subjects;

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
    this.Details.some(el => {
      if (!el.Result) {
        notSelected = true;
        return true;
      }
    });
    return notSelected;
  }
  totalmarks: Number = 0;
  totalObtainmarks: Number = 0;
  percentage: Number = 0;
  details : any = {};
  onSave() {
    this.input.Date = new Date(this.input.Date).toISOString().split('T')[0];
    console.log(this.input.Date);
    this.totalmarks = 0;
    this.totalObtainmarks = 0;
    this.percentage = 0;
    let status: any = "fail";
    this.input.Details = this.Details;

    this.input.Details.map(data => {
      this.totalmarks += data.TotalMarks;
      this.totalObtainmarks += data.ObtainMarks;
      delete data.SubjectName;
      if (data.Result.toLowerCase() == status.toLowerCase()) {
        // this.input.Result = status.toUpperCase();
      } else {
        // this.input.Result = "PASS"
      }
    })
    this.details.TotalMark = this.totalmarks;
    this.details.TotalObtainMark = this.totalObtainmarks;
    this.details.Percentage = (this.details.TotalObtainMark / this.details.TotalMark) * 100;
    if (this.details.Percentage >= 80 && this.details.Percentage < 100) {
      this.details.ObtainGrade = "A1";
    } else {
      if (this.details.Percentage >= 70 && this.details.Percentage < 80) {
        this.details.ObtainGrade = "A";
      }
      if (this.details.Percentage >= 60 && this.details.Percentage < 70) {
        this.details.ObtainGrade = "B";
      }
      if (this.details.Percentage >= 50 && this.details.Percentage < 60) {
        this.details.ObtainGrade = "C";
      }
      if (this.details.Percentage >= 40 && this.details.Percentage < 50) {
        this.details.ObtainGrade = "D";
      }
      if (this.details.Percentage >= 33 && this.details.Percentage < 40) {
        this.details.ObtainGrade = "E";
      }
      if (this.details.Percentage < 33) {
        this.details.ObtainGrade = "F";
      }
    }
    delete this.input.ClassNo;
    delete this.input.SectionNo;
    console.log("Final data",this.input);
    this.apiService.examService.insertMarksheet(this.input).subscribe(data => {
      console.log(data);
    })
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
  Details: any = [];
  getStudentByClass() {
    this.Details = [];
    this.studentsByClass = this.allStudent.filter(data => data.AddmitionIn == this.input.ClassNo);
    console.log(this.studentsByClass);
    this.classSubjects = this.allSubject.filter(data => data.ClassNo == this.input.ClassNo);
    console.log(this.classSubjects);
    this.classSubjects.map(data => {
      this.Details.push({
        SubjectName: data.SubjectName,
        SubjectNo: data.SubjectCode,
        TotalMarks: null,
        PassingMarks: null,
        ObtainMarks: null,
        GradeNo: null,
        Result: null,
        Action : ""
      });
    })
  }
  getData() {
    this.getAllClasses();
    this.getAllSection();
    this.getAllExam();
    this.getallSubject();
    this.getAllStudent();
  }
  ngOnInit() {
    this.getData();
  }
}
