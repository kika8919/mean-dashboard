import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { map, mergeMap, of } from 'rxjs';
import { DashboardCard, DashboardService } from 'src/app/core';
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

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };
  public lineChartLegend = true;

  // Doughnut

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };

  public pieChartLegend = true;
  public pieChartPlugins = [];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private ref: ChangeDetectorRef,
    private dashboardSvc: DashboardService
  ) {
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
    const observableArray = [];
    for (let card of this.enabledCards) {
      switch (`${card.type}_${card.description}`) {
        case 'bar-chart_abc':
          observableArray.push(
            this.dashboardSvc
              .getBarChartData()
              .pipe(map((data: any) => ({ card, data })))
          );
          break;
        case 'line-chart_test':
          observableArray.push(
            this.dashboardSvc
              .getLineChartData()
              .pipe(map((data: any) => ({ card, data })))
          );
          break;
        case 'doughnut-chart_test2':
          observableArray.push(
            this.dashboardSvc
              .getDoughnutChartData()
              .pipe(map((data: any) => ({ card, data })))
          );
          break;
        case 'pie-chart_test3':
          observableArray.push(
            this.dashboardSvc
              .getPieChartData()
              .pipe(map((data: any) => ({ card, data })))
          );
          break;
        case 'table_element':
          observableArray.push(
            this.dashboardSvc
              .getTableData()
              .pipe(map((data: any) => ({ card, data })))
          );
          break;
      }
    }

    const dashboardCardData$ = of(...observableArray).pipe(
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
                this.dataSource = new MatTableDataSource<any>(data);
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
