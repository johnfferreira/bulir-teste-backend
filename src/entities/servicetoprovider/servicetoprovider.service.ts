import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicetoproviderDto } from './dto/create-servicetoprovider.dto';
import { ServiceToproviderGateway } from 'src/domain/servicetoprovider/servicetoprovider.gateway';
import { ServiceToprovider } from 'src/domain/servicetoprovider/servicetoprovider';
import { ProviderService } from '../provider/provider.service';
import { ListServicetoproviderDto } from './dto/list-servicetoprovider.dto';
import { UserNotFoundException } from '../user/exception/usernoutfoundexception';

@Injectable()
export class ServicetoproviderService {

  constructor(private readonly servicetoprovider: ServiceToproviderGateway,
    private readonly providerService: ProviderService ){}

 async create({description, price, providerId, title,}: CreateServicetoproviderDto)
 {
    const provider = await this.providerService.findOneProvider(providerId);

    if (!provider) new UserNotFoundException("Provider nao encontrado");
    const serviceToProvider = new ServiceToprovider({
      description,
      price,
      title,
      providerId 
    });
    await this.servicetoprovider.create(serviceToProvider);
  }

  async findAll() {

   let serviceToProvider = await this.servicetoprovider.findAll();

    return serviceToProvider.map((sv) => new ListServicetoproviderDto({
      description:sv.description,
      id:sv.publicId,
      price: sv.price,
      providerId:sv.providerId,
      title:sv.title
    }))
  }

  async findOne(id: string) {
    return await this.servicetoprovider.findById(id);
  }
  
  async remove(id: string) {
 
     await this.servicetoprovider.delete(id);;
  }
}
