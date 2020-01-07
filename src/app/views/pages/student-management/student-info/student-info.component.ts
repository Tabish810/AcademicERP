import {
  Component, OnInit,
  Inject, ChangeDetectorRef,
  AfterViewInit, ElementRef,
  ViewChild
} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../../../services/common/api-service.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {
  addstudentForm: FormGroup
  submitted = false;
  allStudent;
  student;
  error_info = 'A';
  @ViewChild('wizard', { static: true }) el: ElementRef;
  panel1 = false;
  panel2 = false;
  panel3 = false;
  panel4 = false;
  filePath: any = "No Image";
  base64textString;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  dateOfBirth: any;
  admissionDate: any;
  file: any;
  localUrl: any;
  localCompressedURl: any;
  sizeOfOriginalImage: number;
  sizeOFCompressedImage: number;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  getStudent: any;
  isOnEdit = false;
  StudentID;
  students = {
    InstituteNo: null,
    StudentCode: null,
    RegistrationNo: null,
    FirstName: null,
    MiddleName: null,
    Gender: null,
    PicturePath: null,
    DateOfBirth: null,
    Religion: null,
    MotherTongue: null,
    FatherName: null,
    FatherNICNo: null,
    FatherOccupation: null,
    FatherPhoto: null,
    MotherName: null,
    MotherNICNo: null,
    MotherOccupation: null,
    MotherPhoto: null,
    FatherContactNo: null,
    ContactNo2: null,
    AlternativeContactNo: null,
    IsOrphan: null,
    GuardianName: null,
    GuardianRelation: null,
    GuardianPhoneNo: null,
    GuardianOccupation: null,
    GuardianEmail: null,
    AddmitionDate: null,
    AddmitionIn: null,
    EmailAddress: null,
    MailingAddress: null,
    PermanantAddress: null,
    PreviousSchool: null,
    CityNo: null,
    StateNo: null,
    Remarks: null,
    StudentHouseNo: null,
    Weight: null,
    Height: null,
    BloodGroup: null,
    IsActive: null
  }




  constructor(private route: ActivatedRoute, private imageCompress: NgxImageCompressService, private notification: NzNotificationService, private formBuilder: FormBuilder, private httpClient: HttpClient, private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }
  // new Date(this.date).toISOString().split('T')[0]
  //   InstituteNo --M
  // StudentCode  --M
  // RegistrationNo--M
  // FirstName--M
  // FullName--M
  // Gender--M
  // PicturePath--M
  // DateOfBirth--M
  // FatherName--M
  // MotherName--M
  // GuardianName---M
  // GuardianRelation--M
  // GuardianPhoneNo--M
  // AddmitionDate--M
  // AddmitionIn--M
  // PermanantAddress---M
  ngOnInit() {
    this.addstudentForm = this.formBuilder.group({
      InstituteNo: new FormControl(name, Validators.required),
      StudentCode: new FormControl(name, Validators.required),
      RegistrationNo: new FormControl(name, Validators.required),
      FirstName: new FormControl(name, Validators.required),
      MiddleName: new FormControl(name),
      // LastName: new FormControl(name),
      // FullName: new FormControl(name),
      Gender: new FormControl(name, Validators.required),
      PicturePath: new FormControl(name, Validators.required),
      DateOfBirth: new FormControl(name, Validators.required),
      Religion: new FormControl(name),
      MotherTongue: new FormControl(name),
      FatherName: new FormControl(name, Validators.required),
      FatherNICNo: new FormControl(name),
      FatherOccupation: new FormControl(name),
      FatherPhoto: new FormControl(name),
      MotherName: new FormControl(name, Validators.required),
      MotherNICNo: new FormControl(name),
      MotherOccupation: new FormControl(name),
      MotherPhoto: new FormControl(name),
      FatherContactNo: new FormControl(name, Validators.required),
      ContactNo2: new FormControl(name),
      AlternativeContactNo: new FormControl(name),
      IsOrphan: new FormControl(name),
      GuardianName: new FormControl(name, Validators.required),
      GuardianRelation: new FormControl(name, Validators.required),
      GuardianPhoneNo: new FormControl(name, Validators.required),
      GuardianOccupation: new FormControl(name),
      GuardianEmail: new FormControl(name),
      AddmitionDate: new FormControl(name, Validators.required),
      AddmitionIn: new FormControl(name, Validators.required),
      EmailAddress: new FormControl(name),
      MailingAddress: new FormControl(name, Validators.required),
      PermanantAddress: new FormControl(name, Validators.required),
      PreviousSchool: new FormControl(name),
      CityNo: new FormControl(name),
      StateNo: new FormControl(name),
      Remarks: new FormControl(name),
      StudentHouseNo: new FormControl(name),
      Weight: new FormControl(name),
      Height: new FormControl(name),
      BloodGroup: new FormControl(name),
      IsActive: new FormControl(name, Validators.required)
    });




    let edit_id;
    edit_id = this.route.snapshot.queryParams.edit_id;
    let view_id;
    view_id = this.route.snapshot.queryParams.view_id;

    if (edit_id != null || edit_id != undefined) {
      this.editRecodr(edit_id)
    }

    if (view_id != null || view_id != undefined) {
      this.viewRecord(view_id)

    }



  }

  editRecodr(id) {
    this.StudentID = id;
    console.log("Edit ID from parameters", id);
    this.addstudentForm.enable();
    this.panel1 = true;
    this.panel2 = true;
    this.panel3 = true;
    this.panel4 = true;
    this.error_info = "";
    // this.addstudentForm.clearValidators();
    console.log("EditID from parameters", id);
    this.apiService.studentService.getStudentById(id).subscribe((res: any) => {
      this.getStudent = res.Table[0];
      console.log("Student by id", this.getStudent);
      console.log("intstitute no 1", this.getStudent.InstituteNo);
      this.assignForm();
    })

    this.apiService.studentService.getAllStudent().subscribe((res: any) => {
      this.getStudent = res.filter(x => x.StudentID == id)
      console.log("Filtered data ", this.getStudent);
      console.log("intstitute no 2", this.getStudent.InstituteNo);
      this.assignForm()
    })

    this.isOnEdit = true

  }

  viewRecord(id) {
    this.addstudentForm.disable();
    this.panel1 = true;
    this.panel2 = true;
    this.panel3 = true;
    this.panel4 = true;
    this.error_info = "";
    // this.addstudentForm.clearValidators();
    console.log("View ID from parameters", id);
    this.apiService.studentService.getStudentById(id).subscribe((res: any) => {
      this.getStudent = res.Table[0];
      console.log("Student by id", this.getStudent);

      console.log("intstitute no 1", this.getStudent.InstituteNo);
      this.assignForm();
    })

    this.apiService.studentService.getAllStudent().subscribe((res: any) => {
      this.getStudent = res.filter(x => x.StudentID == id)
      console.log("Filtered data ", this.getStudent);
      console.log("intstitute no 2", this.getStudent.InstituteNo);

      this.assignForm()
    })
  }


  assignForm() {
    this.addstudentForm.patchValue({
      InstituteNo: this.getStudent[0].InstituteNo,
      StudentCode: this.getStudent[0].StudentCode,
      RegistrationNo: this.getStudent[0].RegistrationNo,
      FirstName: this.getStudent[0].FirstName,
      MiddleName: this.getStudent[0].MiddleName,
      // LastName: null,
      // FullName: null,
      Gender: this.getStudent[0].Gender,
      DateOfBirth: this.getStudent[0].DateOfBirth,
      Religion: this.getStudent[0].Religion,
      MotherTongue: this.getStudent[0].MotherTongue,
      FatherName: this.getStudent[0].FatherName,
      FatherNICNo: this.getStudent[0].FatherNICNo,
      FatherOccupation: this.getStudent[0].FatherOccupation,
      MotherName: this.getStudent[0].MotherName,
      MotherNICNo: this.getStudent[0].MotherNICNo,
      MotherOccupation: this.getStudent[0].MotherOccupation,
      FatherContactNo: this.getStudent[0].FatherContactNo,
      ContactNo2: this.getStudent[0].ContactNo2,
      AlternativeContactNo: this.getStudent[0].AlternativeContactNo,
      // IsOrphan: this.getStudent[0].IsOrphan,
      GuardianName: this.getStudent[0].GuardianName,
      GuardianRelation: this.getStudent[0].GuardianRelation,
      GuardianPhoneNo: this.getStudent[0].GuardianPhoneNo,
      GuardianOccupation: this.getStudent[0].GuardianOccupation,
      GuardianEmail: this.getStudent[0].GuardianEmail,
      AddmitionDate: this.getStudent[0].AddmitionDate,
      AddmitionIn: this.getStudent[0].AddmitionIn,
      EmailAddress: this.getStudent[0].EmailAddress,
      MailingAddress: this.getStudent[0].MailingAddress,
      PermanantAddress: this.getStudent[0].PermanantAddress,
      PreviousSchool: this.getStudent[0].PreviousSchool,
      CityNo: this.getStudent[0].CityNo,
      StateNo: this.getStudent[0].StateNo,
      Remarks: this.getStudent[0].Remarks,
      StudentHouseNo: this.getStudent[0].StudentHouseNo,
      Weight: this.getStudent[0].Weight,
      Height: this.getStudent[0].Height,
      BloodGroup: this.getStudent[0].BloodGroup
    })
  }



  selectFile(event: any) {
    var fileName: any;
    this.filePath = (event.target.value);
    console.log(event.target.value);
    this.file = event.target.files[0];
    fileName = this.file['name'];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
        this.compressFile(this.localUrl, fileName)
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  compressFile(image, fileName) {
    var orientation = -1;
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
    console.warn('Size in bytes is now:', this.sizeOfOriginalImage);
    this.imageCompress.compressFile(image, orientation, 50, 50).then(
      result => {
        this.imgResultAfterCompress = result;
        this.localCompressedURl = result;

        this.sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024)
        console.warn('Size in bytes after compression:', this.sizeOFCompressedImage);
        // create file from byte
        const imageName = fileName;
        // call method that creates a blob from dataUri
        const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
        //imageFile created below is the new compressed file which can be send to API in form data
        const imageFile = new File([result], imageName, { type: 'image/jpeg' });
        console.log("Image File", imageFile)
        console.log("Image Blbo", imageBlob);
        console.log("Image name ", imageName);
        console.log("result ", result)

      });
  }
  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }
  changeState() {
    this.addstudentForm.controls['IsActive'].patchValue(true);
  }

  onUploadIMAGE(evt: any) {
    const file = evt.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoadedImage.bind(this);
      reader.readAsBinaryString(file);
      console.log("form file", file)
      console.log("base64textString", this.base64textString)
    }
  }
  handleReaderLoadedImage(e) {
    this.base64textString = [];
    this.base64textString.push('data:image/jpg;base64,' + btoa(e.target.result));
    console.log(this.base64textString);
  }
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();

  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    console.log("Reader", reader.readAsDataURL(this.fileData))
    reader.onload = (_event) => {
      this.previewUrl = reader.result;

    }
    const formData = new FormData();
    formData.append('file', this.fileData);
    console.log("forma data", formData)
    console.log("File data", this.fileData)

    console.log("priview url", this.previewUrl)

  }

  onSubmit() {
    this.submitted = true;
    // this.http.post('url/to/your/api', formData)
    //   .subscribe(res => {
    //     console.log(res);
    //     this.uploadedFilePath = res.data.filePath;
    //     alert('SUCCESS !!');
    //   })
  }

  //this.internalRequisitionForm.controls['NonBudgeted'].setValue('NonBudgeted');

  // get f() { return this.addstudentForm.controls; }

  onSave() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addstudentForm.invalid) {
      console.log("invalid")

      alert("B")

      console.log("Form data", this.addstudentForm.value);
    } else {
      this.dateOfBirth = this.addstudentForm.get('DateOfBirth').value;
      this.admissionDate = this.addstudentForm.get('AddmitionDate').value;
      let isActive = this.addstudentForm.get('IsActive').value;
      let regno;
      regno = this.addstudentForm.get('RegistrationNo').value;
      this.dateOfBirth = new Date(this.dateOfBirth).toISOString().split('T')[0]
      this.admissionDate = new Date(this.admissionDate).toISOString().split('T')[0]
      this.addstudentForm.controls['AddmitionDate'].patchValue(this.admissionDate)
      this.addstudentForm.controls['DateOfBirth'].patchValue(this.dateOfBirth)
      this.addstudentForm.controls['RegistrationNo'].patchValue(parseInt(regno))
      this.addstudentForm.controls['IsActive'].patchValue(isActive);

      if (!this.isOnEdit) {
        this.apiService.studentService.createStudent(this.addstudentForm.value).subscribe((res: any) => {
          this.notification.create("success", "Sucess", "Student Added Successfully")

        }, (err) => {
          this.notification.create("error", "Failed", "Student Adding Failed")

        })
      } else {
        this.updateStudent(this.StudentID)

      }
      console.log("Form data", this.addstudentForm.value);
    }
  }

  updateStudent(id) {
    this.addstudentForm.addControl('StudentID', new FormControl(id))
    this.apiService.studentService.updateStudent(this.addstudentForm.value).subscribe((res: any) => {
      this.addstudentForm.removeControl("StudentID")
      this.notification.create("success", "Sucess", "Student Updated Successfully")
    }, (err) => {
      this.addstudentForm.removeControl("StudentID")
      this.notification.create("error", "Failed", "Student Updating Failed")
    }

    )
  }

  // getAllStudent() {
  //   this.apiService.studentService.getAllStudent().subscribe((res: any) => {
  //     this.allStudent = res;
  //     console.log("All students ", this.allStudent);

  //   })
  //   console.log("hey")
  // }






  // WIZARD Starts Here


  ngAfterViewInit(): void {
    // Initialize form wizard
    const wizard = new KTWizard(this.el.nativeElement, {
      startStep: 1
    });

    // Validation before going to next page
    wizard.on('beforeNext', (wizardObj) => {
      // https://angular.io/guide/forms
      // https://angular.io/guide/form-validation

      // validate the form and use below function to stop the wizard's step
      // wizardObj.stop();
    });

    // Change event
    wizard.on('change', (wizard) => {
      setTimeout(() => {
        KTUtil.scrollTop();
      }, 500);
    });
  }

}