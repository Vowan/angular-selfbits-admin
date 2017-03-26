import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router'

import 'style-loader!./login.scss';

import {SelfbitsAngular} from 'selfbits-angular2-sdk'

@Component({
    selector: 'login',
    templateUrl: './login.html',
})
export class Login {

    public form: FormGroup;
    public email: AbstractControl;
    public password: AbstractControl;
    public submitted: boolean = false;

    public error: boolean = false;
    public errorMessage: string = '';

    constructor(fb: FormBuilder, private sb: SelfbitsAngular, private router: Router) {
        this.form = fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
        });

        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
    }

    public onSubmit(values: any): void {
        this.submitted = true;
        if (this.form.valid) {
            this.sb.auth.login({email: values.email, password: values.password}).subscribe(res => {
                console.log(res);
                if (res.status === 200) {
                    this.router.navigate(['pages'])
                }
            }, err => {
                //do something with error
                this.error = true;
                this.errorMessage = err.json().message;
            })
        }
    }
}