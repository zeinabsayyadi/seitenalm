import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  form: FormGroup;
  formError: boolean = false;
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 },
  ];
  years: number[] = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );
  countries: string[] = ['Country 1', 'Country 2', 'Country 3'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
      adults: ['', Validators.required],
      children: this.fb.array([this.createChildFormGroup()]),
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      postcode: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      phone: [''],
      requests: [''],
    });
  }

  ngOnInit() {}

  createChildFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      day: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
    });
  }

  get children(): FormArray {
    return this.form.get('children') as FormArray;
  }

  addChild() {
    this.children.push(this.createChildFormGroup());
  }

  removeChild(index: number) {
    this.children.removeAt(index);
  }

  isFieldInvalid(field: string): boolean {
    const control = this.form.get(field);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);
      this.formError = false;
    } else {
      this.formError = true;
      this.markAllAsTouched();
    }
  }

  private markAllAsTouched() {
    this.form.markAllAsTouched();
    this.children.controls.forEach((control) => control.markAsTouched());
  }
}
