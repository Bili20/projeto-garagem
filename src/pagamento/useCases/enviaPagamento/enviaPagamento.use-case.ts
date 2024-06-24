import { Inject, Injectable } from '@nestjs/common';
import { DadosCartaoDTO } from 'src/pagamento/models/dto/dadosCartao.dto';
import { KEY } from '../../../utils/constants/constants';
import { DadosEnderecoDTO } from 'src/pagamento/models/dto/dadosEndereco.dto';
import { BuscaUmEnderecoPessoaUseCase } from 'src/endereco/useCases/buscaUmEnderecoPessoa/buscaUmEnderecoPessoa.use-case';
@Injectable()
export class EnviaPagamentoUseCase {
  async execute(cartao: DadosCartaoDTO, endereco: DadosEnderecoDTO) {
    let reqs = await fetch('https://sandbox.api.pagseguro.com/orders', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reference_id: 'ex-00001',
        customer: {
          name: cartao.nomePessoa,
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
            reference_id: 'item',
            name: 'venda de garagem',
            quantity: 1,
            unit_amount: 500,
          },
        ],
        shipping: {
          address: {
            street: endereco.rua,
            number: endereco.numero,
            complement: endereco.complemento,
            locality: endereco.bairro,
            city: endereco.cidade,
            region_code: endereco.uf,
            country: 'BRA',
            postal_code: endereco.cep,
          },
        },
        notification_urls: ['https://meusite.com/notificacoes'],
        charges: [
          {
            reference_id: 'referencia da cobranca',
            description: 'descricao da cobranca',
            amount: {
              value: 500,
              currency: 'BRL',
            },
            payment_method: {
              type: 'CREDIT_CARD',
              installments: 1,
              capture: true,
              card: {
                number: cartao.numeroCartao,
                exp_month: cartao.expMes,
                exp_year: cartao.expAno,
                security_code: cartao.codigoSeguranca,
                holder: {
                  name: cartao.nomePessoa,
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
