import { Injectable } from '@angular/core';
import { ClassService } from '../endpoints/class.service';
import { HttpServiceService } from './http-service.service';
import { SectionService } from '../endpoints/section.service';
import { SubjectService } from '../endpoints/subject.service';
import { StudentService } from '../endpoints/student.service';
import { FeesSubmitService } from '../endpoints/fees-submit.service';
import { DiscountService } from '../endpoints/discount.service';
import { PromoteStudentService } from '../endpoints/promote-student.service';
import { ExamService } from '../endpoints/exam.service';
import { GradeService } from '../endpoints/grade.service';
import { InstituteService } from '../endpoints/institute.service';
import { VehicleService } from '../endpoints/vehicle.service';
import { RouteService } from '../endpoints/route.service';
import { AssignVehicleService } from '../endpoints/assign-vehicle.service';
import { CityService } from '../endpoints/city.service';
import { StateService } from '../endpoints/state.service';
import { CountryService } from '../endpoints/country.service';
import { BookEntryService } from '../endpoints/book-entry.service';
import { BookIssueService } from '../endpoints/book-issue.service';
import { BookReturnService } from '../endpoints/book-return.service';
import { DepartmentService } from '../endpoints/department.service';
import { DesignationService } from '../endpoints/designation.service';
import { EmployeeService } from '../endpoints/employee.service';
import { EventService } from '../endpoints/event.service';
import { EventScheduleService } from '../endpoints/event-schedule.service';
import { EventAwardsService } from '../endpoints/event-awards.service';
import { HostelService } from '../endpoints/hostel.service';
import { RoomService } from '../endpoints/room.service';
import { RoomTypeService } from '../endpoints/room-type.service';



@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpServiceService) { }
  classService: ClassService = new ClassService(this.http);
  sectionService: SectionService = new SectionService(this.http);
  subjectService: SubjectService = new SubjectService(this.http);
  studentService: StudentService = new StudentService(this.http);
  feesSubmitService: FeesSubmitService = new FeesSubmitService(this.http);
  fessDiscountService: DiscountService = new DiscountService(this.http);
  promteStudentService: PromoteStudentService = new PromoteStudentService(this.http);
  examService: ExamService = new ExamService(this.http);
  gradeService: GradeService = new GradeService(this.http);
  instituteService: InstituteService = new InstituteService(this.http)
  vehicleService: VehicleService = new VehicleService(this.http);
  routeService: RouteService = new RouteService(this.http);
  assignVehicleService: AssignVehicleService = new AssignVehicleService(this.http);
  cityService: CityService = new CityService(this.http);
  stateService: StateService = new StateService(this.http);
  countryService: CountryService = new CountryService(this.http);
  bookService: BookEntryService = new BookEntryService(this.http);
  bookIssueService: BookIssueService = new BookIssueService(this.http);
  bookReturnService = new BookReturnService(this.http);
  departmentService = new DepartmentService(this.http);
  designationService = new DesignationService(this.http);
  employeeService = new EmployeeService(this.http);
  eventService = new EventService(this.http);
  eventScheduleService = new EventScheduleService(this.http);
  eventAwardsService = new EventAwardsService(this.http);
  hostelService = new HostelService(this.http);
  roomService = new RoomService(this.http);
  roomTypeService = new RoomTypeService(this.http);
}
