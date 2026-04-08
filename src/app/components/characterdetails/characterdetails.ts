import { Component, OnInit, signal } from '@angular/core'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { Character } from '../../models/character'
import { HarrypotterService } from '../../services/harrypotter'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@Component({
  selector: 'app-characterdetails',
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './characterdetails.html',
  styleUrl: './characterdetails.css'
})
export class Characterdetails implements OnInit {
  character = signal<Character | null>(null)
  loading = signal(true)

  constructor(
    private route: ActivatedRoute,
    private harryPotterService: HarrypotterService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')

    if (id) {
      this.harryPotterService.getCharacterById(id).subscribe(data => {
        this.character.set(data[0] || null)
        this.loading.set(false)
      })
    } else {
      this.loading.set(false)
    }
  }
}