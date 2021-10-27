import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Currencies } from './currencies.entity';
import { CurrenciesRepository } from './currencies.repository';
import { CurrenciesService } from './currencies.service';

describe('CurrenciesService', () => {
  let service: CurrenciesService;
  let repository: CurrenciesRepository;
  let mockData;

  beforeEach(async () => {
    const currenciesRepositoryMock = {
      getCurrency: jest.fn(),
      createCurrency: jest.fn(),
      updateCurrency: jest.fn(),
      deleteCurrency: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrenciesService,
        {
          provide: CurrenciesRepository,
          useFactory: () => currenciesRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<CurrenciesService>(CurrenciesService);
    repository = module.get<CurrenciesRepository>(CurrenciesRepository);
    mockData = { currency: 'USD', value: 1 } as Currencies;
  });

  it('should be', () => {
    expect(service).toBeDefined();
  });

  describe('getCurrency()', () => {
    it('should be throw if repository throw', async () => {
      (repository.getCurrency as jest.Mock).mockRejectedValue(
        new InternalServerErrorException('Repository not found.'),
      );

      await expect(service.getCurrency('INVALID')).rejects.toThrow(
        new InternalServerErrorException('Repository not found.'),
      );
    });

    it('should be not throw if repository returns', async () => {
      await expect(service.getCurrency('USD')).resolves.not.toThrow();
    });

    it('should be called repository with correct params', async () => {
      await service.getCurrency('USD');
      expect(repository.getCurrency).toBeCalledWith('USD');
    });

    it('should be return when repository return', async () => {
      (repository.getCurrency as jest.Mock).mockReturnValue(mockData);
      expect(await service.getCurrency('USD')).toEqual(mockData);
    });
  });

  describe('createCurrency()', () => {
    it('an exception must be thrown if the repository fails', async () => {
      (repository.createCurrency as jest.Mock).mockRejectedValue(
        new InternalServerErrorException('Repository not found.'),
      );
      mockData.currency = 'INVALID';
      await expect(service.createCurrency(mockData)).rejects.toThrow(
        new InternalServerErrorException('Repository not found.'),
      );
    });

    it('no exception should be thrown if repository ok', async () => {
      await expect(service.createCurrency(mockData)).resolves.not.toThrow();
    });

    it('must be called if the repository with the correct parameters is sent', async () => {
      await expect(service.createCurrency(mockData));
      expect(repository.createCurrency).toBeCalledWith(mockData);
    });

    it('an exception must be thrown if the value <= 0', async () => {
      mockData.value = 0;
      await expect(service.createCurrency(mockData)).rejects.toThrow(
        new BadRequestException('The value must be greater 0.'),
      );
    });

    it('should be return when repository return', async () => {
      (repository.createCurrency as jest.Mock).mockReturnValue(mockData);

      expect(await service.createCurrency(mockData)).toEqual(mockData);
    });
  });

  describe('updateCurrency()', () => {
    it('error should be thrown if the repository returns invalid parameters', async () => {
      (repository.updateCurrency as jest.Mock).mockRejectedValue(
        new InternalServerErrorException('Repository not found.'),
      );
      mockData.currency = 'INVALID';
      await expect(service.updateCurrency(mockData.currency)).rejects.toThrow(
        new InternalServerErrorException('Repository not found.'),
      );
    });

    it('no error should be thrown if the repository returns valid parameters', async () => {
      await expect(service.updateCurrency(mockData)).resolves.not.toThrow();
    });

    it('should be called repository with correct params', async () => {
      await expect(service.updateCurrency(mockData));
      expect(repository.updateCurrency).toBeCalledWith(mockData);
    });

    it('an exception must be thrown if the value <= 0', async () => {
      mockData.value = 0;
      await expect(service.updateCurrency(mockData)).rejects.toThrow(
        new BadRequestException('The value must be greater 0.'),
      );
    });

    it('should be return when repository return', async () => {
      (repository.updateCurrency as jest.Mock).mockReturnValue(mockData);
      expect(await service.updateCurrency(mockData)).toEqual(mockData);
    });
  });

  describe('deleteCurrency()', () => {
    it('error should be thrown if the repository returns invalid parameters', async () => {
      (repository.deleteCurrency as jest.Mock).mockRejectedValue(
        new InternalServerErrorException('Repository not found.'),
      );
      mockData.currency = 'INVALID';
      await expect(service.deleteCurrency(mockData.currency)).rejects.toThrow(
        new InternalServerErrorException('Repository not found.'),
      );
    });

    it('no error should be thrown if the repository returns valid parameters', async () => {
      await expect(service.deleteCurrency('USD')).resolves.not.toThrow();
    });

    it('should be called repository with correct params', async () => {
      await expect(service.deleteCurrency('USD'));
      expect(repository.deleteCurrency).toBeCalledWith('USD');
    });
  });
});
