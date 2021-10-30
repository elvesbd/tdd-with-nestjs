import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesRepository } from './currencies.repository';

describe('CurrenciesRepository', () => {
  let repository;
  let mockData;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrenciesRepository],
    }).compile();

    repository = module.get<CurrenciesRepository>(CurrenciesRepository);
    mockData = { currency: 'USD', value: 1 };
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('getCurrency()', () => {
    it('should be called findOne with correct params', async () => {
      repository.findOne = jest.fn().mockReturnValue({});
      await repository.getCurrency('USD');
      expect(repository.findOne).toBeCalledWith({ currency: 'USD' });
    });

    it('should be throw findOne return empty', async () => {
      repository.findOne = jest.fn().mockReturnValue(undefined);
      await expect(repository.getCurrency('USD')).rejects.toThrow(
        new NotFoundException('Resource not Found'),
      );
    });

    it('should be throw findOne return entity', async () => {
      repository.findOne = jest.fn().mockReturnValue(mockData);
      expect(await repository.getCurrency('USD')).toEqual(mockData);
    });
  });

  describe('createCurrency()', () => {
    // essa funcionalidade dentro do teste garante que a chamada será feita para o
    // nosso repositório mock e não para o repositório real.
    beforeEach(() => {
      repository.save = jest.fn();
    });

    it('should be called save with correct params', async () => {
      repository.save = jest.fn().mockReturnValue(mockData);
      await repository.createCurrency(mockData);
      expect(repository.save).toBeCalledWith(mockData);
    });

    it('should be throw when save fails', async () => {
      repository.save = jest.fn().mockRejectedValue(new Error());
      await expect(repository.createCurrency(mockData)).rejects.toThrow();
    });

    it('should be throw if called with invalid params', async () => {
      mockData.currency = 'INVALID';
      await expect(repository.createCurrency(mockData)).rejects.toThrow();

      mockData.currency = 'USD';
      mockData.value = 'INVALID';
      await expect(repository.createCurrency(mockData)).rejects.toThrow();
    });

    it('should be return created data', async () => {
      expect(await repository.createCurrency(mockData)).toEqual(mockData);
    });
  });

  describe('updateCurrency()', () => {
    it('should be called findOne with correct params', async () => {
      repository.findOne = jest.fn().mockReturnValue({});
      await repository.updateCurrency(mockData);
      expect(repository.findOne).toBeCalledWith({ currency: 'USD' });
    });

    it('should be throw findOne return empty', async () => {
      repository.findOne = jest.fn().mockReturnValue(undefined);
      await expect(repository.updateCurrency(mockData)).rejects.toThrow(
        new NotFoundException(`The currency ${mockData.currency} not foundFound`),
      );
    });
  });
});
