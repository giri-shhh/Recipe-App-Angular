import { LoggingService } from './../logging.service';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [LoadingSpinnerComponent, DropdownDirective],
    imports: [CommonModule],
    exports: [LoadingSpinnerComponent, DropdownDirective, CommonModule],
    providers: [LoggingService]
})

export class SharedModule {

}
