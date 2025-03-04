import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Order } from '../../models/order';
import { StateOrder } from '../../enums/state-order';

@Component({
  selector: 'app-form-order',
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './form-order.component.html',
  styleUrl: './form-order.component.scss',
})
export class FormOrderComponent {
  private formBuilder = inject(FormBuilder);
  @Input() initItem!: Order;
  @Input() title!: string;
  @Output() submited: EventEmitter<Order> = new EventEmitter();
  // @Output() submited: EventEmitter<Order> = new EventEmitter();
  public states = Object.values(StateOrder);
  public form!: FormGroup;

  ngOnInit() {
    console.log(this.initItem);
    this.form = this.formBuilder.group({
      unitPrice: [this.initItem.unitPrice],
      nbOfDays: [this.initItem.nbOfDays],
      vat: [this.initItem.vat],
      state: [this.initItem.state],
      type: [this.initItem.type, Validators.required],
      customer: [
        this.initItem.customer,
        [Validators.required, Validators.minLength(2)],
      ],
      comment: [this.initItem.comment],
      id: [this.initItem.id ? this.initItem.id : ''],
    });
  }

  public onSubmit() {
    this.submited.emit(this.form.value);
    // console.log(this.form.value);
  }
}
