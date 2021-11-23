import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  searchText:any;
  searchTag:any;
  searchForm!:FormGroup;
  courseContent:any;
  filterClick:boolean=false;
  tagClick:boolean=false;
  managerClick:boolean=false;
  workflowsClick:boolean=false;
  courseClick:boolean=false;
  showTagClick:boolean=false;
  showCourseClick:boolean=true;
  showManagerClick:boolean=false;
  showWorkflowsClick:boolean=false;
  reverse:boolean=true;
  heroes:any=[
    {
      id: 1,
      name: 'course_discrete_01',
      complete: 'Completed/Enrolled : 0 / 1v',
      manager:'Yserdtfh User',
      course_type : 'Online',
      img: 'https://devadmin.edgelearning.co.in/assets/images/courseicon.jpg'
    },
    {
      id: 2,
      name: 'course_discrete_02',
      complete: 'Completed/Enrolled : 0 / 1v',
      manager:'Yserdtfh User',
      course_type : 'Online',
      img: 'https://devadmin.edgelearning.co.in/assets/images/courseicon.jpg'
    },

    { id: 3,
      name: 'course_discrete_03',
      complete: 'Completed/Enrolled : 0 / 1v',
      manager:'Yserdtfh User',
      course_type : 'Online',
      img: 'https://devadmin.edgelearning.co.in/assets/images/courseicon.jpg' },

    {  id: 4,
      name: 'course_discrete_04',
      complete: 'Completed/Enrolled : 0 / 1v',
      manager:'Yserdtfh User',
      course_type : 'Online',
      img: 'https://devadmin.edgelearning.co.in/assets/images/courseicon.jpg' },

    { id:5,
      name: 'course_discrete_05',
      complete: 'Completed/Enrolled : 0 / 1v',
      manager:'Yserdtfh User',
      course_type : 'Online',
      img: 'https://devadmin.edgelearning.co.in/assets/images/courseicon.jpg' },

    { id: 6,
      name: 'course_discrete_06',
      complete: 'Completed/Enrolled : 0 / 1v',
      manager:'Yserdtfh User',
      course_type : 'Online',
      img: 'https://devadmin.edgelearning.co.in/assets/images/courseicon.jpg' },

    {  id: 7,
      name: 'course_discrete_07',
      complete: 'Completed/Enrolled : 0 / 1v',
      manager:'Yserdtfh User',
      course_type : 'Online',
      img: 'https://devadmin.edgelearning.co.in/assets/images/courseicon.jpg'},

    { id: 8,
      name: 'course_discrete_08',
      complete: 'Completed/Enrolled : 0 / 1v',
      manager:'Yserdtfh User',
      course_type : 'Online',
      img: 'https://devadmin.edgelearning.co.in/assets/images/courseicon.jpg' },

    { id: 9,
      name: 'course_discrete_09',
      complete: 'Completed/Enrolled : 0 / 1v',
      manager:'Yserdtfh User',
      course_type : 'Online',
      img: 'https://devadmin.edgelearning.co.in/assets/images/courseicon.jpg' },

    { id: 10,
      name: 'course_discrete_10',
      complete: 'Completed/Enrolled : 0 / 1v',
      manager:'Yserdtfh User',
      course_type : 'offline',
      img: 'https://devadmin.edgelearning.co.in/assets/images/courseicon.jpg' },

  ];

  tags:any=[
    {tagname:'test'},
    {tagname:'unmeshtest'},
    {tagname:'Test1'},
    {tagname:'Test2'},
    {tagname:'testTags'},
    {tagname:'testcopy'},
    {tagname:'testcopy1'},

  ];
  managers:any=[
    {managername:'kiyara test'},
    {managername:'kiyara test'},
    {managername:'gargii test'},
    {managername:'kiyara test'},
    {managername:'test522 test'},
    {managername:'gargii test'},
    {managername:'test vishakha'},

  ];

  workflows:any=[
    {workflowname:'Ravi'},
    {workflowname:'final test1'},
    {workflowname:'aditya test'},
    {workflowname:'kiyara test'},
    {workflowname:'disable test'},
    {workflowname:'descrete test'},
    {workflowname:'test today'},

  ]


  // heroes:Array<any> = [
  //   {
  //     id: 1,
  //     name: 'course_discrete_01',
  //     complete: 'Completed/Enrolled : 0 / 1v',
  //     manager:'Yserdtfh User',
  //     course_type : 'Online',
  //     img: 'https://devadmin.edgelearning.co.in/assets/images/courseicon.jpg'
  //   },
  //   {
  //     id: 2,
  //     name: 'course_discrete_02',
  //     complete: 'Completed/Enrolled : 0 / 1v',
  //     manager:'Yserdtfh User',
  //     course_type : 'Online',
  //     img: 'https://devadmin.edgelearning.co.in/assets/images/courseicon.jpg'
  //   },

  //   { id: 3,
  //     name: 'course_discrete_03',
  //     complete: 'Completed/Enrolled : 0 / 1v',
  //     manager:'Yserdtfh User',
  //     course_type : 'Online',
  //     img: 'https://devadmin.edgelearning.co.in/assets/images/courseicon.jpg' },

  //   {  id: 4,
  //     name: 'course_discrete_04',
  //     complete: 'Completed/Enrolled : 0 / 1v',
  //     manager:'Yserdtfh User',
  //     course_type : 'Online',
  //     img: 'https://devadmin.edgelearning.co.in/assets/images/courseicon.jpg' },

  //   { id:5,
  //     name: 'course_discrete_05',
  //     complete: 'Completed/Enrolled : 0 / 1v',
  //     manager:'Yserdtfh User',
  //     course_type : 'Online',
  //     img: 'https://devadmin.edgelearning.co.in/assets/images/courseicon.jpg' },

  //   { id: 6,
  //     name: 'course_discrete_06',
  //     complete: 'Completed/Enrolled : 0 / 1v',
  //     manager:'Yserdtfh User',
  //     course_type : 'Online',
  //     img: 'https://devadmin.edgelearning.co.in/assets/images/courseicon.jpg' },

  //   {  id: 7,
  //     name: 'course_discrete_07',
  //     complete: 'Completed/Enrolled : 0 / 1v',
  //     manager:'Yserdtfh User',
  //     course_type : 'Online',
  //     img: 'https://devadmin.edgelearning.co.in/assets/images/courseicon.jpg'},

  //   { id: 8,
  //     name: 'course_discrete_08',
  //     complete: 'Completed/Enrolled : 0 / 1v',
  //     manager:'Yserdtfh User',
  //     course_type : 'Online',
  //     img: 'https://devadmin.edgelearning.co.in/assets/images/courseicon.jpg' },

  //   { id: 9,
  //     name: 'course_discrete_09',
  //     complete: 'Completed/Enrolled : 0 / 1v',
  //     manager:'Yserdtfh User',
  //     course_type : 'Online',
  //     img: 'https://devadmin.edgelearning.co.in/assets/images/courseicon.jpg' },

  //   { id: 10,
  //     name: 'course_discrete_10',
  //     complete: 'Completed/Enrolled : 0 / 1v',
  //     manager:'Yserdtfh User',
  //     course_type : 'offline',
  //     img: 'https://devadmin.edgelearning.co.in/assets/images/courseicon.jpg' },
  // ];
  constructor(private router:Router,private fb:FormBuilder,private route:ActivatedRoute,private auth:AuthService) {

    // console.log("this.router",this.router.getCurrentNavigation().extras.state.formData)
    // if (this.router.getCurrentNavigation().extras.state.formData) {
      
    // }
   }

  ngOnInit(): void {
  this.getCourseCard()

    this.searchForm=this.fb.group({
      searchText:['']
    })
    this.route.queryParams.subscribe((params)=>{
   console.log(params);
   
    })

  }

  onFilterClick(){
    this.filterClick=true
    console.log("filterClick");
    
  }

  clearClick(){
    this.searchTag='';
  }

  onTagClick(){
  this.showTagClick=!this.showTagClick;
  console.log("tagClick");
  }

  onManagerClick(){
    // this.managerClick=true;
  this.showManagerClick=!this.showManagerClick;
    console.log("managerClick");
    
  }

  onWorksClick(){
  this.showWorkflowsClick=!this.showWorkflowsClick;
   
  }

  onCourseClick(){
  this.showCourseClick=!this.showCourseClick;
    this.courseClick=true;
  }

  sortAsc(){
   let newArray=this.courseContent.sort((a:any,b:any)=>b.course_name - a.course_name);
   this.courseContent=newArray;
 console.log("ascending sort");
  // this.reverse=!this.reverse
 

  }

  sortDec(){
      let newArray=this.courseContent.sort((a:any,b:any)=>a.course_name - b.course_name);
      this.courseContent=newArray;
    console.log("descending sort");
      // this.reverse=!this.reverse
   

  }


  getCourseCard(){
    this.auth.getCourse().subscribe((data:any)=>{
      //console.log("dataincoursecard",data);
      this.courseContent=data;
      console.log("courseContent",this.courseContent);
      
    },
    err=>{
      console.log("error",err);
      
    })
  }

  addCourse(){
    this.router.navigateByUrl('/addcourse')
  }

  onEdit(hero:any){
 this.router.navigate(['/editcourse',hero.id]);

     console.log("oneditclick");
     
    }




  

//   onEdit(id:number){
//   // let data:any=[];
//   //  this.heroes.map((ldata:any) => {
//   //     if(ldata.id == id) {
//   //       data.push(ldata)
//   //     }
//   //  })

//   // let params=  new URLSearchParams(data[0]).toString();
   

//   this.router.navigateByUrl('/editcourse')
// this.router.navigate(['/editcourse',id,params]);
//    console.log("oneditclick");
   
//   }
// }

  }
