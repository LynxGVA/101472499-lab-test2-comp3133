import { Component, EventEmitter, Output } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'

@Component({
  selector: 'app-characterfilter',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './characterfilter.html',
  styleUrl: './characterfilter.css'
})
export class Characterfilter {
  @Output() houseSelected = new EventEmitter<string>()

  houses = ['All', 'Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw']
  selectedHouse = 'All'

  onHouseChange() {
    this.houseSelected.emit(this.selectedHouse)
  }
}