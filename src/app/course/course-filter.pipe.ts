import { Pipe, PipeTransform } from '@angular/core';
import { HeroModel } from '../hero.model';

@Pipe({
     name:'heroFilter'
})

export class CourseFilterPipe implements PipeTransform{
 transform(heroes:HeroModel[],searchText:string):HeroModel[] {
     if(!heroes || !searchText){
         return heroes;
     }
     
     return heroes.filter(hero=>
        hero.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
 }

// transform(heroes: any, searchText?: any): any {
//     // added code
//     if(searchText === undefined){
//       return heroes;
//      }
//    // added code
  
//      return heroes.filter( (item: { name: string; }) =>
//        item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
//     );
//    }


// transform(heroes:HeroModel[],searchText:string):HeroModel[] {
//     if(heroes !== undefined ){
//         return heroes.sort((a: any, b: any) => {

//             const aValue = a.value;
//             const bValue = b.value;

//             if (aValue < bValue) {
//                 return -1;
//             } else if (aValue > bValue) {
//                 return 1;
//             } else {
//                 return 0;
//             }
//         });
//     }
    
//     return heroes;
// }

} 