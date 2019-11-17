import { NgModule } from '@angular/core';
import { ShedulerComponent } from './sheduler.component';
import { TestComponent } from './components/test/test.component';



@NgModule({
  declarations: [ShedulerComponent, TestComponent],
  imports: [
  ],
  exports: [ShedulerComponent]
})
export class ShedulerModule { }
