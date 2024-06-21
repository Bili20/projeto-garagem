import { Injectable } from '@nestjs/common';
import { DadosCartaoDTO } from 'src/pagamento/models/dto/validaDados.dto';
import { KEY } from '../../../utils/constants/constants';
@Injectable()
export class EnviaPagamentoUseCase {
  async execute(param: DadosCartaoDTO) {
    let reqs = await fetch('https://sandbox.api.pagseguro.com/orders', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reference_id: 'ex-00001',
        customer: {
          name: param.nomePessoa,
          email: 'email@test.com',
          tax_id: '12345678909',
          phones: [
            {
              country: '55',
              area: '11',
              number: '999999999',
              type: 'MOBILE',
            },
          ],
        },
        items: [
          {
            reference_id: 'referencia do item',
            name: 'nome do item',
            quantity: 1,
            unit_amount: 500,
          },
        ],
        shipping: {
          address: {
            street: 'Avenida Brigadeiro Faria Lima',
            number: '1384',
            complement: 'apto 12',
            locality: 'Pinheiros',
            city: 'São Paulo',
            region_code: 'SP',
            country: 'BRA',
            postal_code: '01452002',
          },
        },
        notification_urls: ['https://meusite.com/notificacoes'],
        charges: [
          {
            reference_id: 'referencia da cobranca',
            description: 'descricao da cobranca',
            amount: {
              value: 100,
              currency: 'BRL',
            },
            payment_method: {
              type: 'CREDIT_CARD',
              installments: 1,
              capture: true,
              card: {
                number: param.numeroCartao,
                exp_month: param.expMes,
                exp_year: param.expAno,
                security_code: param.codigoSeguranca,
                holder: {
                  name: param.nomePessoa,
                  tax_id: '65544332211',
                },
                store: false,
              },
            },
          },
        ],
      }),
    });
    return await reqs.json();
  }
}
