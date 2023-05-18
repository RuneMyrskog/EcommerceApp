import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  userSubscription: any;
  
  constructor(private userService: UserService, auth: AuthService, router: Router) {
    this. userSubscription = auth.user$.subscribe(user => {
      if (!user) return;
     
      userService.save(user);
      
      let returnUrl = localStorage.getItem('returnUrl');
      if(!returnUrl) return;
      
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);

    })
  }

  ngOnDestroy(): void {
      this.userSubscription.unsubscribe();
  }
  
}
