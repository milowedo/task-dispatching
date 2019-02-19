import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-full-ticket',
  templateUrl: './full-ticket.component.html',
})
export class FullTicketComponent implements OnInit {
  id : number;
  constructor( private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
        }
      )
  }

}
