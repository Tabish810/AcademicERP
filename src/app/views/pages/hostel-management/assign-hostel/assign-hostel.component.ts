import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../../../services/common/api-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router, ActivatedRoute } from '@angular/router';
declare const $: JQueryStatic;

@Component({
  selector: 'kt-assign-hostel',
  templateUrl: './assign-hostel.component.html',
  styleUrls: ['./assign-hostel.component.scss']
})
export class AssignHostelComponent implements OnInit {

  allExamSchedule;
  allRooms;
  allSubjects;
  input: any = {};
  allClasses;
  allSection;
  allTearchers;
  isVisible = false;
  isOnEdit = false;
  dataTable: any;
  flag = true;
  assignHouse: FormGroup;
  submitted = false;
  singleHostel;
  editflag = false;
  DeleteRecord = {
    ExamScheduleID: null
  }
  UpdateRecord = {
    ExamScheduleID: null
  }
  singleClass;
  singleSection;
  constructor(private _route: Router, private route: ActivatedRoute, private notification: NzNotificationService, private formBuilder: FormBuilder, private httpClient: HttpClient, private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }


  ngOnInit() {
    this.getData();
    this.getAllEmployees();
    let edit_id;
    edit_id = this.route.snapshot.queryParams.edit_id;
    let view_id;
    view_id = this.route.snapshot.queryParams.view_id;
    console.log(edit_id);

    if (edit_id) {
      this.editflag = true
    }
    if (view_id) {
      this.editflag = false;
    }
    this.createFormControls()

    if (edit_id) {
      this.editRecord(edit_id)
    }

    if (view_id) {
      this.viewRecord(view_id)
    }
  }
  filteredEmp;
  allEmployees: any = [];
  getAllEmployees() {
    this.apiService.employeeService.getAllEmployee().subscribe((res: any) => {
      this.allEmployees = res;
      console.log("All Employees", this.allEmployees);
    });
  }
  allHostels;
  getAllHostel() {
    this.apiService.hostelService.getAllHostels().subscribe(res => {
      this.allHostels = res;
      console.log("All Hostel", this.allHostels);
    })
  }
  studentsByClass: any = [];
  // getStudentByClass() {
  //   this.studentsByClass = this.allStudent.filter(data => data.AddmitionIn == this.input.ClassNo);
  //   console.log(this.studentsByClass);
  // }
  createFormControls() {
    if (this.editflag) {
      this.assignHouse = this.formBuilder.group({
        AssignHouseCode: '',
        HouseNo: '',
        AssignDate: '',
        AssignBy: '',
        Description: '',
        Detail: this.formBuilder.array([this.updateDetailGroup()]),
        IsActive: true
      });
    } else {
      this.assignHouse = this.formBuilder.group({
        AssignHouseCode: '',
        HouseNo: '',
        AssignDate: '',
        AssignBy: '',
        Description: '',
        Detail: this.formBuilder.array([this.addDetailGroup()]),
        IsActive: true
      });
    }
  }
  allEmployee: any = [];
  getAllEmployee() {
    this.apiService.employeeService.getAllEmployee().subscribe((res: any) => {
      this.allEmployee = res;
      console.log("All employee ", this.allEmployee);
    })
  }
  allStudent;
  getAllStudent() {
    this.apiService.studentService.getAllStudent().subscribe((res: any) => {
      this.allStudent = res;
      console.log("students :", this.allStudent);
    })
  }
  addDetailGroup() {
    return this.formBuilder.group({
      AssignHouseNo: null,
      ClassNo: '',
      StudentNo: '',
      RoomNo: '',
      BedNo: '',
      BedAmount: '',
      Remarks: '',
      IsActive: true,
      Action: ""
    })
  }
  updateDetailGroup() {
    return this.formBuilder.group({
      AssignHouseDtlID: null,
      AssignHouseNo: "",
      ClassNo: "",
      StudentNo: "",
      RoomNo: "",
      BedNo: "",
      BedAmount: "",
      Remarks: "",
      IsActive: true,
      Action: "",
    })
  }

  public get assignHouseArray() {
    return <FormArray>this.assignHouse.get('Detail') as FormArray;
  }
  addRow(index, id, action) {
    console.log("ID", id);
    console.log("index", index);
    console.log("");
    if (this.editflag) {
      this.assignHouseArray.push(this.updateDetailGroup())
      console.log("Get COntrols", this.getControls());
      let DetailControls = this.getControls();
      console.log("Length", DetailControls.length);
      let size = DetailControls.length;
      DetailControls[size - 1].get('Action').setValue('Add');
    } else {
      this.assignHouseArray.push(this.addDetailGroup())

    }
  }

  removeRow(index, id) {
    if (this.editflag) {
      let DetailControls = this.getControls();
      DetailControls[index].get('Action').setValue("Delete")
      // for (let i = 0; i < DetailControls.length; i++) {
      // console.log(DetailControls[i].get('Action').value);
      // }
      console.log("this.assignHouse.value of delete", this.assignHouse.value);
    } else {
      this.assignHouseArray.removeAt(index);
    }

  }

  getControls() {
    return (<FormArray>this.assignHouse.get('Detail')).controls;
  }
  valueChange(id, array) {
    console.log("Before CHange", this.assignHouse.value);
    console.log("valueChange id", id);
    console.log("valueChange Array", array);
    let DetailCOntrol = this.getControls();
    let classNumber = DetailCOntrol[id].get('ClassNo').value;
    console.log(classNumber);
    console.log(this.studentsByClass);
    console.log(this.allStudent);
    this.studentsByClass[id] = this.allStudent.filter(data => data.AddmitionIn == classNumber);
    console.log("after filter", classNumber);
    console.log("after filter", this.studentsByClass[id]);
    console.log("after filter", this.allStudent);
    //   console.log(this.studentsByClass);
    // console.log("DetailCOntrol[id]", DetailCOntrol[id]);
    // let sTime = DetailCOntrol[id].get('StartTime').value;
    // console.log("Start Time Value", sTime);
    // let eTime = DetailCOntrol[id].get('EndTime').value;
    // sTime = new Date(sTime).toLocaleTimeString();
    // console.log("Start Time ", sTime);
    // eTime = new Date(eTime).toLocaleTimeString();
    // console.log("End Time", eTime);
    // console.log("Edit Flag", this.editflag);

    if (this.editflag) {
      // console.log("GET CONTROLS",this.getControls());
      let DetailControls = this.getControls();
      // for(let i=0;i<DetailControls.length;i++){\
      console.log("ACtion value ", DetailControls[id].get('Action').value);

      if (DetailControls[id].get('Action').value != 'Add') {
        DetailControls[id].get('Action').setValue("Update")
      }

      // }
      for (let i = 0; i < DetailControls.length; i++) {

        console.log("check value change", DetailControls[i].get('Action').value);

      }
    }

    console.log("After CHange", this.assignHouse.value);


  }
  editRecord(id) {
    this.isOnEdit = true;
    console.log("Edit ID", id);
    this.UpdateRecord.ExamScheduleID = id;
    console.log("after filter", this.studentsByClass);
    this.apiService.assignHouseService.getAssignHostelById(id).subscribe((res: any) => {
      this.singleHostel = res;
      console.log("Single Time Table Record in", this.singleHostel)
      for (let i = 0; i < res.Detail.length - 1; i++) {
        console.log("all details", res.Detail[i]);
        this.assignHouseArray.push(this.updateDetailGroup())
      }
      this.assignHouse.addControl('AssignHouseID', new FormControl(id));
      this.assignHouse.patchValue(this.singleHostel)
    })
    this.assignHouse.enable();
    console.log("this.assignHouse in edit rrec", this.assignHouse.value);

  }

  viewRecord(id) {
    this.isOnEdit = false;
    this.assignHouse.disable();
    console.log("view ID", id);
    this.apiService.assignHouseService.getAssignHostelById(id).subscribe((res: any) => {
      this.singleHostel = res;
      console.log("Single Time Table Record", this.singleHostel)
      this.assignHouse.addControl('AssignHouseID', new FormControl(id));
      for (let i = 0; i < res.Detail.length - 1; i++) {
        console.log("Array of Detail", res.Detail[i]);
        this.assignHouseArray.push(this.updateDetailGroup())
      }
      this.assignHouse.patchValue(this.singleHostel)
    })
  }

  getData() {
    this.getAllStudent();
    this.getAllClass();
    this.getAllRooms();
    this.getAllHostel();
  }
  getAllRooms() {
    this.apiService.roomService.getAllRooms().subscribe((res: any) => {
      this.allRooms = res;
      console.log("all rooms", this.allRooms);

    })
  }

  getallTimeTable() {
    // this.apiService.examService.getAllExamSchedule().subscribe((res: any) => {
    //   this.allExamSchedule = res;
    //   console.log("All time table", this.allExamSchedule);

    // })
  }

  getAllClass() {
    this.apiService.classService.getAllClass().subscribe((res: any) => {
      this.allClasses = res;
      console.log("Classes ", this.allClasses)
    })
  }
  getAllSubjects() {
    this.apiService.subjectService.getAllSubject().subscribe((res: any) => {
      this.allSubjects = res;
      console.log("All Subjects", this.allSubjects);

    })
  }

  getAllSection() {
    this.apiService.sectionService.getAllSection().subscribe((res: any) => {
      this.allSection = res;
      console.log("Section ", this.allSection)
    })
  }
  onSave() {
    let dfrom = this.assignHouse.get("AssignDate").value;
    dfrom = new Date(dfrom).toISOString().split('T')[0];
    this.assignHouse.controls['AssignDate'].patchValue(dfrom);
    console.log("dfrom", dfrom)
    let DetailControls = this.getControls();

    for (let i = 0; i < DetailControls.length; i++) {
      console.log("Contolr list", DetailControls[i]);
    }
    console.log("payload : ", this.assignHouse.value);
    if (!this.editflag) {
      this.apiService.assignHouseService.createAssignHostel(this.assignHouse.value).subscribe((res: any) => {
        this.isVisible = false;
        this.notification.create("success", "Success", "Hostel Asigned Successfully")
        this.isVisible = false;
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Hostel Asigned Adding Failed")
      })
      console.log("Detail data", this.assignHouse.get("Detail").value);
    } else {
      // console.log("UPDATE");

      // console.log("Form Data in update", this.assignHouse.value)
      // this.apiService.examScheduleService.updateExamSchedule(this.assignHouse.value).subscribe((res: any) => {
      //   this.assignHouse.removeControl('ExamScheduleID');
      //   this.notification.create("success", "Success", "Time Table Updated Successfully")
      // }, (err) => {
      //   this.isVisible = false;
      //   this.notification.create("error", "Failed", "Time Table Updating Failed")
      // })
    }
  }
}
