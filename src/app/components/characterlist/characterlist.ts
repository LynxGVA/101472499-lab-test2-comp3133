import { Component, OnInit, signal } from '@angular/core'
import { Router } from '@angular/router'
import { Character } from '../../models/character'
import { HarrypotterService } from '../../services/harrypotter'
import { Characterfilter } from '../characterfilter/characterfilter'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatChipsModule } from '@angular/material/chips'

@Component({
  selector: 'app-characterlist',
  imports: [
    Characterfilter,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  templateUrl: './characterlist.html',
  styleUrl: './characterlist.css'
})
export class Characterlist implements OnInit {
  characters = signal<Character[]>([])
  loading = signal(true)
  selectedHouse = signal('All')

  constructor(
    private harryPotterService: HarrypotterService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAllCharacters()
  }

  loadAllCharacters() {
    this.loading.set(true)
    this.harryPotterService.getAllCharacters().subscribe(data => {
      this.characters.set(data.filter(c => c.image && c.name))
      this.loading.set(false)
    })
  }

  filterByHouse(house: string) {
    this.selectedHouse.set(house)
    this.loading.set(true)

    if (house === 'All') {
      this.loadAllCharacters()
      return
    }

    this.harryPotterService.getCharactersByHouse(house).subscribe(data => {
      this.characters.set(data.filter(c => c.image && c.name))
      this.loading.set(false)
    })
  }

  openDetails(id: string) {
    this.router.navigate(['/character', id])
  }
}