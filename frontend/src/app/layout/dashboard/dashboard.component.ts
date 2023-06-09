import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Subscription, map, mergeMap, of } from 'rxjs';
import { DashboardCard, DashboardService } from 'src/app/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
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
  filterSubs!: Subscription;

  constructor(
    private ref: ChangeDetectorRef,
    private dashboardSvc: DashboardService
  ) {
    // this.allCards = cards;
  }

  ngOnInit(): void {
    this.filterSubs = this.dashboardSvc.filterValue.subscribe((data) => {
      this.filterCards(data, false);
    });

    this.dashboardSvc.getAllCards().subscribe({
      next: (data) => {
        this.allCards = data;
        this.filterCards();
        this.loadCards();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  filterCards(filterValue: string = '', loadCards: boolean = true) {
    this.enabledCards = this.allCards
      .filter(({ enabled, type }) => {
        return (
          enabled && type.toLowerCase().includes(filterValue.toLowerCase())
        );
      })
      .map((card) => {
        return {
          ...card,
          isLoading: loadCards,
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
              const barChartCard = this.allCards.find(({ _id }) => {
                return _id == card._id;
              });
              barChartCard && (barChartCard.option = { barChartData: data });
              this.stopCardLoading(card);
              break;
            case 'line-chart_test':
              card.option = { lineChartData: data };
              const lineChartCard = this.allCards.find(({ _id }) => {
                return _id == card._id;
              });
              lineChartCard && (lineChartCard.option = { lineChartData: data });
              this.stopCardLoading(card);
              break;
            case 'doughnut-chart_test2':
              card.option = {
                doughnutChartDatasets: data.datasets,
                doughnutChartLabels: data.labels,
              };
              const doughnutChartCard = this.allCards.find(({ _id }) => {
                return _id == card._id;
              });
              doughnutChartCard &&
                (doughnutChartCard.option = {
                  doughnutChartDatasets: data.datasets,
                  doughnutChartLabels: data.labels,
                });
              this.stopCardLoading(card);
              break;
            case 'pie-chart_test3':
              card.option = {
                pieChartDatasets: data.datasets,
                pieChartLabels: data.labels,
              };
              const pieChartCard = this.allCards.find(({ _id }) => {
                return _id == card._id;
              });
              pieChartCard &&
                (pieChartCard.option = {
                  pieChartDatasets: data.datasets,
                  pieChartLabels: data.labels,
                });
              this.stopCardLoading(card);
              break;
            case 'table_element':
              this.stopCardLoading(card);
              this.dataSource = new MatTableDataSource<any>(data);
              this.ref.detectChanges();
              this.dataSource.paginator = this.paginator;
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
    this.enabledCards.find(({ _id }) => {
      return card._id === _id;
    })!.isLoading = false;
  };

  ngOnDestroy(): void {
    this.filterSubs.unsubscribe();
  }
}
