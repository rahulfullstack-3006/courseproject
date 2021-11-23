import { 
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef, } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import './addcourse.component.css';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent implements OnInit {
  bsConfig!: Partial<BsDatepickerConfig>;
  formData:any= FormGroup;
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  openform = false;
  //userForm: any = FormGroup;
  //event:any;
  editFile: boolean = true;
  removeUpload: boolean = false;
  // submitted:boolean=false;
  users: any = FormArray;
  isValidDate:any;
  error:any={isError:false,errorMessage:''};
  imageUrl: any =
    'https://devadmin.edgelearning.co.in/assets/images/courseicon.jpg';
    selectedId:any;
    dataset:any=[];
    courseSet:any;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef,private router:Router,private route:ActivatedRoute,private auth:AuthService) { }

  @ViewChild('fileInput')
  el!: ElementRef;
  submitted = false;
  userData: any = [];
  data:any=[];
  type:any='edit'
  ngOnInit(): void {
    this.bsConfig = Object.assign({}, { containerClass: 'theme-blue' });
    // this.route.paramMap.subscribe((params:ParamMap):any=>{
    //  this.selectedId= params.get('id')
    //  console.log("id",this.selectedId);

    // })
    this.formData = this.fb.group({
      users: this.fb.array([]),
    });

    this.dropdownList = [
      { id: 1, itemName: 'India' },
      { id: 2, itemName: 'Singapore' },
      { id: 3, itemName: 'Australia' },
      { id: 4, itemName: 'Canada' },
      { id: 5, itemName: 'South Korea' },
      { id: 6, itemName: 'Germany' },
      { id: 7, itemName: 'France' },
      { id: 8, itemName: 'Russia' },
      { id: 9, itemName: 'Italy' },
      { id: 10, itemName: 'Sweden' },
    ];
    this.selectedItems = [
      { id: 2, itemName: 'Singapore' },
      { id: 3, itemName: 'Australia' },
      { id: 4, itemName: 'Canada' },
      { id: 5, itemName: 'South Korea' },
    ];
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Countries',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
    };

    this.formData = this.fb.group({
      image: [''],
      course_code: [''],
      course_name: ['', Validators.required],
      selectedItems1: [[]],
      selectedItems2: [[]],
      selectedItems3: [[]],
      selectedItems4: [[], Validators.required],
      visibility: ['', Validators.required],
      summary: [''],
      course_level: ['', Validators.required],
      course_completion: ['', Validators.required],
      course_type: ['', Validators.required],
      flexRadioDefault: ['', Validators.required],
      course_validFromDate: ['', Validators.required],
      course_validToDate: ['', Validators.required],
      course_url: [''],
      checkwether: [''],
      file: [null],
      users: this.fb.array([])

    });
  }

  get f() {
    return this.formData.controls;
  }
  uploadFile(event: any) {
    // console.log("upload",event);
    // alert('hello image')

    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.formData.patchValue({
          file: reader.result,
        });
        console.log('file selected', this.formData.value.file);
        console.log('this.imageUrl', this.imageUrl);

        this.editFile = false;
        this.removeUpload = true;
      };
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }


  removeImage(){
  // let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'https://devadmin.edgelearning.co.in/assets/images/courseicon.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.formData.patchValue({
      file: [null]
    });
  }

  createUserForm() {
    return this.fb.group({
      select_role: ['', Validators.required],
      select_credit: ['', Validators.required],
      before: ['', Validators.required],
      after: ['', Validators.required],
    });
  }

  onAdd() {
    console.log('add');
    this.users = this.formData.get('users') as FormArray;
    this.users.push(this.createUserForm());
    console.log('onadd users', this.users);
  }

  removeAdd(i: any) {
    let removeArr = this.formData.get('users') as FormArray;
    removeArr.removeAt(i);
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }

getAllCourseData(){
  this.router.navigateByUrl('/')
}

  onSubmit(){
    this.submitted=true
    if(this.formData.invalid){
      return;
    }

    this.userData=this.formData.value;
    console.log("userData",this.userData);
    this.auth.postCourse(this.userData).subscribe(data=>{
      console.log("data",data);
     this.getAllCourseData()
     console.log("usersetforadd",this.formData);
      
    },
    err=>{
      console.log("Error",err)
    })
 
  }

  // onSubmit(){
  //   this.submitted=true
  //   let datas:any=[];
  //   if(this.formData.invalid){
  //     return;
  //   }
  //   this.userData=this.formData.value;
  //   console.log("userData",this.userData);
  //   this.router.navigateByUrl('/')


  // //   datas.push(this.userData)
  // // let params=  new URLSearchParams(datas[0]).toString();
   

  // //this.router.navigateByUrl('/editcourse')
  // //this.router.navigate(['/',params]);
  // //  this.router.navigate(['/'],{state:{formData:this.formData.value}})
    
  // }

  // onSubmit() {
  // console.log("submit click");
  // this.submitted = true;
  // this.isValidDate = this.validateDates(this.formData.value.course_validFromDate, this.formData.course_validToDate);
  // console.log("this.isValidDate",this.isValidDate);
  
  // if(this.submitted == true && this.isValidDate == true ){
  //   console.log("no validate");
    
  //   if (this.formData.invalid) {
  //     return;
  // }
  // this.userData = this.formData.value;
  // console.log('userData', this.userData);

  // }
  // }

  validateDates(sDate: string, eDate: string){
    this.isValidDate = true;
    if((sDate == null || eDate ==null)){
      this.error={isError:true,errorMessage:'Start date and end date are required.'};
      this.isValidDate = false;
    }

    if((sDate != null && eDate !=null) && (eDate) < (sDate)){
      alert('end date is greater than')
      this.error={isError:true,errorMessage:'End date should be grater then start date.'};
      this.isValidDate = false;
    }
    return this.isValidDate;
  }


 
  goBack(){
    this.router.navigateByUrl('/')
  }

}
