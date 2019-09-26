import { createServiceFactory, SpectatorService, SpyObject } from '@ngneat/spectator';
import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';
import { TestBed } from '@angular/core/testing';

describe ('CalculatorService', () => {
    let calculator: CalculatorService;
    let loggerSpy: any;

    beforeEach(function() {
        loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);

        TestBed.configureTestingModule({
            providers: [
                CalculatorService,
                { provide: LoggerService, useValue: loggerSpy }
            ]
        });
        calculator = TestBed.get(CalculatorService);
    });

    it('should add two numbers', () => {
        const result = calculator.add(2, 2);

        expect(result).toBe(4);
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });

    it('should subtract two numbers', () => {
        const result = calculator.subtract(2, 2);

        expect(result).toBe(0, 'unexpected subtraction result');
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });

});

describe ('CalculatorService using Spectator', () => {
    let spectator: SpectatorService<CalculatorService>;
    let loggerService: SpyObject<LoggerService>;

    const createService = createServiceFactory({
        service: CalculatorService,
        mocks: [LoggerService]
    });

    beforeEach(() => {
        spectator = createService();
        loggerService = TestBed.get(LoggerService);
    });

    it('should add two numbers', () => {
      expect(spectator.service.add(2, 2)).toBe(4);
      expect(loggerService.log).toHaveBeenCalledTimes(1);
    });

    it('should subtract two numbers', () => {
        expect(spectator.service.subtract(2, 2)).toBe(0, 'unexpected subtraction result');
        expect(loggerService.log).toHaveBeenCalledTimes(1);
    });
});
