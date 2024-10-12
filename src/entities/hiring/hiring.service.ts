import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHiringDto } from './dto/create-hiring.dto';
import { HiringGateway } from 'src/domain/hiring/hiring.gateway';
import { CustomerService } from '../customer/customer.service';
import { ServicetoproviderService } from '../servicetoprovider/servicetoprovider.service';
import { Hiring } from 'src/domain/hiring/hiring';
@Injectable()
export class HiringService {

  constructor(private readonly hiringGateway: HiringGateway,
    private readonly customerService: CustomerService,
    private readonly serviceTopProviderService: ServicetoproviderService

  ) { }

  async create({ customerId, data_contratacao, serviceTopProviderId, status }: CreateHiringDto) {

    const customerSV = await this.customerService.findOneCustomer(customerId)
    const serviceTopProviderSV = await this.serviceTopProviderService.findOne(serviceTopProviderId);

    if (!customerSV || !serviceTopProviderSV) throw new NotFoundException("Usuario ou servico nao encontrado");

    if (customerSV.user.balance < serviceTopProviderSV.price) {
      throw new ConflictException("Valor insuficiente");
    }

    const hiring = new Hiring({
      customerId,
      data_contratacao,
      status,
      serviceTopProviderId
    }
    );
    await this.hiringGateway.create(hiring);
  }

  findAll() {
    return this.hiringGateway.findAll();
  }

  findOne(id: string) {
    return this.hiringGateway.findById(id);
  }

  remove(id: string) {
    return this.hiringGateway.delete(id);
  }
}
