import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
// import { BsLocaleService, defineLocale } from 'ngx-bootstrap'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// import { ButtonsModule } from 'ngx-bootstrap/buttons';
// import { itLocale } from 'ngx-bootstrap/locale';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import './dashboard.component.css';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
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
 // courseIconUrl: any = 'https://devadmin.edgelearning.co.in/assets/images/courseicon.jpg';

    selectedId:any;
    dataset:any=[];
    courseSet:any;
    items:any=[];
  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef,private router:Router,private route:ActivatedRoute,private auth:AuthService) {}
  @ViewChild('fileInput')
  el!: ElementRef;
  submitted = false;
  userData: any = [];
  data:any=[];
  type:any='edit'
  ngOnInit(): void {
    this.bsConfig = Object.assign({}, { containerClass: 'theme-blue' });
    
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
    //coursePicRef: this.courseIconUrl,
      imageUrl: [''],
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
      // users: this.fb.array([])
      users: this.fb.array([
        this.fb.group({
          select_role: ['', Validators.required],
          select_credit: ['', Validators.required],
          before: ['', Validators.required],
          after: ['', Validators.required],
        })
      ])


    });
    // this.onAddPatch()
    this.route.paramMap.subscribe((params:ParamMap):any=>{
      this.selectedId= params.get('id')
      console.log("id",this.selectedId);
     this.getCourseValue(this.selectedId)
     
 
     })
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

  // onAddPatch(){
    // console.log("onpatchvalue",this.courseSet);
    
    // this.courseSet.users.map((user:any)=>{

    //   this.formData.patch({
    //     select_role:user[0].select_role,
    //     select_credit:user[0].select_credit,
    //     before:user[0].before,
    //     after:user[0].after
    //     })
    // })

  // }

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
 


  getCourseValue(row:number){
    console.log("selected",row)
    this.auth.getCoursePatch(row).subscribe(data=>{
      console.log("getCourse",data);
      this.courseSet=data;
      console.log("this.courseSet",this.courseSet);
      console.log("this.courseSetusers",this.courseSet.users[0].select_role);
     // this.imageUrl=this.courseSet['image'];
      // console.log("imageUrlimageUrl",this.imageUrl);
      // this.items=this.courseSet.users;
      // console.log("this.itemss",this.items);
      
      this.formData.patchValue({
        imageUrl: this.courseSet['imageUrl'],
        course_code: this.courseSet['course_code'],
        course_name: this.courseSet['course_name'],
        selectedItems1: this.courseSet['selectedItems1'],
        selectedItems2: this.courseSet['selectedItems2'],
        selectedItems3: this.courseSet['selectedItems3'],
        selectedItems4: this.courseSet['selectedItems4'],
        visibility: this.courseSet['visibility'],
        summary: this.courseSet['summary'],
        course_level: this.courseSet['course_level'],
        course_completion: this.courseSet['course_completion'],
        course_type: this.courseSet['visibility'],
        flexRadioDefault: this.courseSet['flexRadioDefault'],
        course_validFromDate: this.courseSet['course_validFromDate'],
        course_validToDate: this.courseSet['course_completion'],
        course_url: this.courseSet['course_url'],
        checkwether: this.courseSet['checkwether'],
        file: this.courseSet['file'],
        users:this.courseSet.users,
        // users: this.fb.array(this.courseSet.map((x:any)=>(x))),
        // users: this.users.patchValue([this.courseSet.users]),
        // select_role: this.courseSet.users[0].select_role,
        // before: this.courseSet.users[0].before,
        // after: this.courseSet.users[0].after
      }); 
      // for(let i=0; i < this.courseSet.users.length; i++){
      //   this.users.at(i).patchValue(this.courseSet.users[i]) 
      // }
      console.log("userset",this.formData);
           
    },
    err=>{
      console.log(err);
      
    })
    

  }

  getAllCourseData(){
    this.router.navigateByUrl('/')
  }


  onSubmit(){
    this.submitted=true
    if(this.formData.invalid){
      return;
    }
    let body=this.formData.value
    this.auth.updateCourse(body,this.selectedId).subscribe(data=>{
      console.log("dataaedit",data);   
    },
    err=>{
      console.log(err);   
    })
    this.getAllCourseData()

   //if(this.type == 'edit'){
    //console.log("inside log");

  // let body=this.formData.value

  //    this.auth.updateCourse(body,this.selectedId).subscribe(data=>{
  //      console.log("dataaedit",data);
       
  //    },
  //    err=>{
  //      console.log(err);
       
  //    })
  // }
  //  else{
  //   this.userData=this.formData.value;
  //   console.log("userData",this.userData);
  //   this.auth.postCourse(this.userData).subscribe(data=>{
  //     console.log("data",data);
      
  //   },
  //   err=>{
  //     console.log("Error",err)
  //   })

  //  }
    
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
