import { Component, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styles: [
  ]
})
export class SideBarComponent implements OnInit {
  constructor(private renderer: Renderer2) {}

  ngOnInit() {

   
  }
  onClick(evento: any) {
  document.body.classList.toggle('sidebar-toggled');
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('toggled');
      if (sidebar.classList.contains('toggled')) {
        const sidebarCollapse = document.querySelectorAll('.sidebar .collapse');
        sidebarCollapse.forEach((item: any) => {
          item.classList.remove('show');
        });
      }
    }
  
  }
}
