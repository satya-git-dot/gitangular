import { Component, OnInit } from '@angular/core';
import { PostService } from './../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: any[];
  url = 'http://jsonplaceholder.typicode.com/posts';

  // CRUD using Http and with out seperation of concerns

//   constructor(http: Http)                         
//   {
//       // http.get(this.url)
//       // .subscribe(
//       //   response => {
//       //       this.posts = response.json();
//       //   });      
//  }

// ngOnInit(){
//   this.http.get(this.url)
//   .subscribe(
//     response => {
//         this.posts = response.json();
//     });
// }

// createPost(input: HTMLInputElement)
//     {
//       let post = {title: input.value};
//       input.value='';

//       this.http.post(this.url,JSON.stringify(post))
//       .subscribe(response => {
//           post['id'] = response.json().id;
//           this.posts.splice(0,0, post);            
//       });
//    }

// updatePost(post)
// {
//   this.http.patch(this.url + '/' + post.id ,JSON.stringify({isRead: true}))
//   .subscribe(response => {
//       console.log(response.json());
//   });
// }

// deletePost(post)
// {
//   this.http.delete(this.url + '/' + post.id)
//   .subscribe(response => {
//       let index = this.posts.indexOf(post);
//       this.posts.slice(index,1);
//   });
// }

// CRUD using Http and with seperation of concerns
  constructor(private service: PostService){
           
  }

  ngOnInit(){
      this.service.getPosts()
      .subscribe(
            response => {
                this.posts = response.json();
            },error => {
              alert("An unexpected error occured..");
              console.log(error);
            });
   }
  createPost(input: HTMLInputElement){
        let post = {title: input.value};
        input.value='';
        this.service.createPost(post)
        .subscribe(response => {
                     post['id'] = response.json().id;
                     this.posts.splice(0,0, post);            
        },
        (error: Response) => {
            if (error.status == 400){
              //this.form.setErrors(error.json());
            }
            else{
              alert("An unexpected error occured..");
              console.log(error);
            }
        });
  }
  updatePost(post)
  {
    this.service.updatePost(post)
    .subscribe(response => {
           console.log(response.json());
    });
  }
  deletePost(post)
  {
    this.service.deletePost(post.id)
    .subscribe(response => {
            let index = this.posts.indexOf(post);
            this.posts.slice(index,1);
        },
        (error: Response) => {
            if (error.status == 404)
              alert('the post already has been deleted..');
            else{
              alert("An unexpected error occured..");
              console.log(error);
            }
        });    
  }

}
