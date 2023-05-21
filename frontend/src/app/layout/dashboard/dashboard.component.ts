import { Component, OnInit } from '@angular/core';
import { map, mergeMap, of } from 'rxjs';
import { DashboardCard } from 'src/app/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  allCards: DashboardCard[] = [];
  enabledCards: DashboardCard[] = [];
  constructor() {
    this.allCards = cards;
  }

  ngOnInit(): void {
    this.filterCards();
    this.loadCards();
  }

  filterCards() {
    this.enabledCards = this.allCards
      .filter(({ enabled }) => enabled)
      .map((card) => {
        return {
          ...card,
          isLoading: true,
        };
      });
  }
  loadCards = () => {
    const fakeObervable = [];
    for (let card of this.enabledCards) {
      switch (`${card.type}_${card.description}`) {
        case 'bar-chart_abc':
          fakeObervable.push(
            of({ type: card.type }).pipe(map((data: any) => ({ card, data })))
          );
          break;
        case 'bar-chart_test':
          fakeObervable.push(
            of({ type: card.type }).pipe(map((data: any) => ({ card, data })))
          );
          break;
        case 'bar-chart_test2':
          fakeObervable.push(
            of({ type: card.type }).pipe(map((data: any) => ({ card, data })))
          );
          break;
        case 'bar-chart_test3':
          fakeObervable.push(
            of({ type: card.type }).pipe(map((data: any) => ({ card, data })))
          );
          break;
        case 'table_element':
          fakeObervable.push(
            of({ type: card.type }).pipe(map((data: any) => ({ card, data })))
          );
          break;
      }
    }

    const dashboardCardData$ = of(...fakeObervable).pipe(
      mergeMap((obs) => obs)
    );
    dashboardCardData$.subscribe({
      next: ({ data, card }) => {
        if (data && card) {
          card.option = { type: data.type };
          switch (`${card.type}_${card.description}`) {
            case 'bar-chart_abc':
              setTimeout(() => {
                this.stopCardLoading(card);
              }, 1000);
              break;
            case 'bar-chart_test':
              setTimeout(() => {
                this.stopCardLoading(card);
              }, 1000);
              break;
            case 'bar-chart_test2':
              setTimeout(() => {
                this.stopCardLoading(card);
              }, 1000);
              break;
            case 'bar-chart_test3':
              setTimeout(() => {
                this.stopCardLoading(card);
              }, 1000);
              break;
            case 'table_element':
              setTimeout(() => {
                this.stopCardLoading(card);
              }, 1000);
              break;
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  stopCardLoading = (card: DashboardCard) => {
    this.enabledCards.find(({ id }) => {
      return card.id === id;
    })!.isLoading = false;
  };
}

export const cards: DashboardCard[] = [
  {
    id: 1,
    type: 'bar-chart',
    description: 'abc',
    cols: 1,
    rows: 1,
    enabled: true,
  },
  {
    id: 2,
    type: 'bar-chart',
    description: 'test',
    cols: 1,
    rows: 1,
    enabled: true,
  },
  {
    id: 3,
    type: 'bar-chart',
    description: 'test2',
    cols: 1,
    rows: 1,
    enabled: true,
  },
  {
    id: 4,
    type: 'bar-chart',
    description: 'test3',
    cols: 1,
    rows: 1,
    enabled: true,
  },
  {
    id: 5,
    type: 'table',
    description: 'element',
    cols: 2,
    rows: 2,
    enabled: true,
  },
];
