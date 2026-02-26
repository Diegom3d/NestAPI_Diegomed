import { Body, Controller, Get, Param, ParseIntPipe, Post} from '@nestjs/common';
import { CarsService } from './cars.service';
import { UppercasePipe } from '../pipes/upper-case/upper-case.pipe';
import type { Car, CreateCar } from 'src/models/car.model';
import { CreateContextOptions } from 'vm';



@Controller('cars')
export class CarsController {
 
 constructor(private readonly carService:CarsService){}
 @Get()
 getAllCars(){
    return this.carService.findAllCars;
    }


  //
     @Get(':id')
    getCarsById( @Param('id',ParseIntPipe) id: number){
        const car = this.carService.getCarById(id);
        return car;

    }

    @Post()
    createCar(@Body() body : CreateCar){
        const result = this.carService.createCar(body);
        return result;
    }

    @Get(':id/:model')
    getModelByCarId (@Param('id',ParseIntPipe) id: number,
    @Param('model',UppercasePipe) model :string)
  {
    return model;
    }


}


//PUT Y DELETE