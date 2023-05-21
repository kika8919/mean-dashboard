import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { map, mergeMap, of } from 'rxjs';
import { DashboardCard } from 'src/app/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  allCards: DashboardCard[] = [];
  enabledCards: DashboardCard[] = [];
  title = 'ng2-charts-demo';

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
    ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };
  public lineChartLegend = true;

  // Doughnut
  public doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [
      { data: [350, 450, 100], label: 'Series A' },
      { data: [50, 150, 120], label: 'Series B' },
      { data: [250, 130, 70], label: 'Series C' },
    ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [
    'Download Sales',
    'In-Store Sales',
    'Mail-order-Sales',
  ];
  public pieChartDatasets = [
    {
      data: [300, 500, 100],
    },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ref: ChangeDetectorRef) {
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
            of(this.barChartData).pipe(map((data: any) => ({ card, data })))
          );
          break;
        case 'line-chart_test':
          fakeObervable.push(
            of(this.lineChartData).pipe(map((data: any) => ({ card, data })))
          );
          break;
        case 'doughnut-chart_test2':
          fakeObervable.push(
            of({
              datasets: this.doughnutChartDatasets,
              labels: this.doughnutChartLabels,
            }).pipe(map((data: any) => ({ card, data })))
          );
          break;
        case 'pie-chart_test3':
          fakeObervable.push(
            of({
              datasets: this.pieChartDatasets,
              labels: this.pieChartLabels,
            }).pipe(map((data: any) => ({ card, data })))
          );
          break;
        case 'table_element':
          fakeObervable.push(
            of(ELEMENT_DATA).pipe(map((data: any) => ({ card, data })))
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
          switch (`${card.type}_${card.description}`) {
            case 'bar-chart_abc':
              card.option = { barChartData: data };
              setTimeout(() => {
                this.stopCardLoading(card);
              }, 1000);
              break;
            case 'line-chart_test':
              card.option = { lineChartData: data };
              setTimeout(() => {
                this.stopCardLoading(card);
              }, 1000);
              break;
            case 'doughnut-chart_test2':
              card.option = {
                doughnutChartDatasets: data.datasets,
                doughnutChartLabels: data.labels,
              };
              setTimeout(() => {
                this.stopCardLoading(card);
              }, 1000);
              break;
            case 'pie-chart_test3':
              card.option = {
                pieChartDatasets: data.datasets,
                pieChartLabels: data.labels,
              };
              setTimeout(() => {
                this.stopCardLoading(card);
              }, 1000);
              break;
            case 'table_element':
              setTimeout(() => {
                this.stopCardLoading(card);
                this.dataSource = new MatTableDataSource<PeriodicElement>(data);
                this.ref.detectChanges();

                this.dataSource.paginator = this.paginator;
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
    type: 'line-chart',
    description: 'test',
    cols: 1,
    rows: 1,
    enabled: true,
  },
  {
    id: 3,
    type: 'doughnut-chart',
    description: 'test2',
    cols: 1,
    rows: 1,
    enabled: true,
  },
  {
    id: 4,
    type: 'pie-chart',
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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];
