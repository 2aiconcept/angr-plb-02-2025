import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-edit-order',
  imports: [],
  templateUrl: './page-edit-order.component.html',
  styleUrl: './page-edit-order.component.scss',
})
export class PageEditOrderComponent {
  private route = inject(ActivatedRoute);
  ngOnInit() {
    this.route.data.subscribe((data) => console.log(data));
  }
}
