import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
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

    @Put(':id')
    updateCar(@Param('id',ParseIntPipe) id: number, @Body() body : CreateCar){
        const car = this.carService.getCarById(id);
        if(car){
            car.name = body.name;
            car.model = body.model;
            return car;
        }
    }

    @Delete(':id')
    deleteCar(@Param('id',ParseIntPipe) id: number){
        const carIndex = this.carService.findAllCars().findIndex(car => car.id === id);
        if(carIndex === -1){
            throw new NotFoundException(`Car with id: ${id} doesnt exist`);
        }
        this.carService.findAllCars().splice(carIndex, 1);
        return {message: `Car with id: ${id} has been deleted`};
    }


}




