import { Injectable, NotFoundException } from '@nestjs/common';
import {Car, CreateCar} from 'src/models/car.model'
@Injectable()
export class CarsService {

    private cars :  Car[] = [
    {
        id: 1,
        name: "Toyota",
        model:2025 
    },
      {
        id: 2,
        name: "Tesla",
        model:2025 
    },
      {
        id: 3,
        name: "Mazda",
        model:2025 
    },
    ];
    
    findAllCars(){
        return this.cars;
    }

    getCarById(id : number) : Car{
        const car = this.cars.find(car => car.id === id);
        if(!car)throw  new NotFoundException(`Car with id: ${id} doesnt exist`)
            return car;
    }

    createCar(car: CreateCar): Car{
        const ids = this.cars.map(c => c.id);
        const nextId = Math.max(...ids) + 1;   
        const newCar: Car = {
            id: nextId,
            ...car
        };
        this.cars.push(newCar);
        return newCar;
    }
}