import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetailDTO } from 'src/app/models/carDetailDTO';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  carDetails: CarDetailDTO[] = [];
  carImages: CarImage[] = [];
  imageUrl: string = 'https://localhost:44307/';

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetails(params['carId']);
        this.getImagesByCarId(params['carId']);
      } else {
      }
    });
  }
  getImagesByCarId(carId: number) {
    this.carImageService.getByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }
  getCarDetails(carId: number) {
    this.carService.getCarDetails(carId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }
}
