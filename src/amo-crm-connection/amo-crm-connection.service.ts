import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { QueryDto } from '../Dto/queryDto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AmoCrmConnectionService {
  constructor(
    private readonly http: HttpService,
    private configService: ConfigService,
  ) {}

  async findContact(query: QueryDto) {
    console.log('Amo - Connector Service - Find Contact');

    // const a = await this.http.get('http://quotesondesign.com/wp-json/posts');
    return await lastValueFrom(
      this.http
        .get(
          `https://${this.configService.get(
            'SUBDOMAIN',
          )}.amocrm.ru/api/v4/contacts?query=${query.name}`,
          {
            headers: {
              Authorization: 'Bearer ' + this.configService.get('AUTH_TOKEN'),
            },
          },
        )
        .pipe(map((response) => response.data)),
    ).catch((e) => {
      throw new HttpException(e.message, e.status);
    });

    return '';
  }

  async createContact(query: QueryDto) {
    console.log('Amo - Connector Service - Create Contact');

    const a = await lastValueFrom(
      this.http
        .post(
          `https://${this.configService.get(
            'SUBDOMAIN',
          )}.amocrm.ru/api/v4/contacts`,
          [this.prepairQuery(query)],
          {
            headers: {
              Authorization: 'Bearer ' + this.configService.get('AUTH_TOKEN'),
              'Content-Type': 'application/json',
            },
          },
        )
        .pipe(map((response) => response.data)),
    ).catch((e) => {
      throw new HttpException(e.message, e.status);
    });
  }

  async updateContact(query: QueryDto, contact) {
    console.log('Amo - Connector Service - Update Contact');
    const queryToUpdate = this.prepairQuery(query);
    queryToUpdate['id'] = contact?._embedded?.contacts[0]?.id;
    await lastValueFrom(
      this.http
        .post(
          `https://${this.configService.get(
            'SUBDOMAIN',
          )}.amocrm.ru/api/v4/contacts`,
          [queryToUpdate],
          {
            headers: {
              Authorization: 'Bearer ' + this.configService.get('AUTH_TOKEN'),
              'Content-Type': 'application/json',
            },
          },
        )
        .pipe(map((response) => response.data)),
    ).catch((e) => {
      throw new HttpException(e.message, e.status);
    });
  }
  async createDealing(name: string) {
  await lastValueFrom(
      this.http
        .post(
          `https://${this.configService.get(
            'SUBDOMAIN',
          )}.amocrm.ru/api/v4/leads`,
          [
            {
              name: 'Сделка для примера 2',
              price: 10000,
              _embedded: {
                tags: [
                  {
                    id: 2719,
                  },
                ],
              },
            },
          ],
          {
            headers: {
              Authorization: 'Bearer ' + this.configService.get('AUTH_TOKEN'),
              'Content-Type': 'application/json',
            },
          },
        )
        .pipe(map((response) => response.data)),
    ).catch((e) => {
      throw new HttpException(e.message, e.status);
    });
  }

  isEqual(query: QueryDto, answer) {
    if (answer?._embedded?.contacts[0]?.name != query.name) return false;
    if (
      answer?._embedded?.contacts[0]?.custom_fields_values[0]?.values[0]
        ?.value != query.phone
    )
      return false;

    if (
      answer?._embedded?.contacts[0]?.custom_fields_values[1]?.values[0]
        ?.value != query.email
    )
      return false;

    return true;
  }

  private prepairQuery(query: QueryDto) {
    return {
      name: query.name,
      custom_fields_values: [
        {
          field_name: 'Телефон',
          field_code: 'PHONE',
          values: [
            {
              value: query.phone,
            },
          ],
        },

        {
          field_name: 'Email',
          field_code: 'EMAIL',
          values: [
            {
              value: query.email,
            },
          ],
        },
      ],
    };
  }
}
