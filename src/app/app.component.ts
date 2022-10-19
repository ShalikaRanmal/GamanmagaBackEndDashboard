import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DBHandler';

  field_visible = true;
  title_visible = false;
  detail_visible = false;

  fieldShow(){
    if (this.title_visible==true || this.detail_visible==true){
      this.title_visible=false;
      this.detail_visible=false;
    }
    this.field_visible=true
  }
  titleShow(){
    if (this.field_visible==true || this.detail_visible==true){
      this.field_visible=false;
      this.detail_visible=false;
    }
    this.title_visible=true
  }
  detailShow(){
    if (this.title_visible==true || this.field_visible==true){
      this.title_visible=false;
      this.field_visible=false;
    }
    this.detail_visible=true
  }
}
