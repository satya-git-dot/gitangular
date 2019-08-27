import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-demo';

  months = ["January", "Feburary", "March", "April", "May", 
            "June", "July", "August", "September",
            "October", "November", "December"];

        
    isavailable = true;
    myClickFunction(event) { 
        //just added console.log which will display the event details in browser on click of the button.
        alert("Button is clicked");
        console.log(event);
    }


}
