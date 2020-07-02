import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../providers/login.service";
import {UserService} from "../../../providers/user.service";
import {NgForm} from "@angular/forms";
import {EditUsersService} from "../../../providers/edit-users.service";

@Component({
    selector: 'app-account',
    templateUrl: './account.page.html',
    styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

    user:any = [];
    userDetails = [];
    pass: any;

    constructor(public loginService: LoginService,
                public userService: UserService,
                public editUsersService: EditUsersService
    ) {}

    ngOnInit() {}

    ionViewDidEnter() {
        this.pass = this.loginService.pass;
        console.log(this.pass);
        this.loginService.getUserById(this.loginService.userId).subscribe(response => {
            this.user = response;
            this.userDetails = response['userSpecifics'];
        });
    }

    userRegister(userForm: NgForm) {
        this.editUsersService.userEdit(userForm.value.userName, userForm.value.password, userForm.value.firstName, userForm.value.lastName, userForm.value.email, this.loginService.userId)
        console.log(userForm.value);
    }
}
