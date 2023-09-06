import { Injectable } from '@nestjs/common';
import { QueryDto } from './Dto/queryDto';
import { AmoCrmConnectionService } from './amo-crm-connection/amo-crm-connection.service';

@Injectable()
export class AppService {
  constructor(private amoCrm: AmoCrmConnectionService) {}

  async getQuery(query: QueryDto): Promise<string> {
    const contact: QueryDto | '' = await this.amoCrm.findContact(query);
    let message = 'Контакт соответствует сохранённому.';
    if (contact != '') {
      if (!this.amoCrm.isEqual(query, contact)) {
        await this.amoCrm.updateContact(query, contact);
        message = 'Контакт успешно обновлён.';
      }
    } else {
      await this.amoCrm.createContact(query);
      message = 'Контакт успешно создан.';
    }

    await this.amoCrm.createDealing(query.name);

    return `${message} Сделка создана.`;
  }
}
