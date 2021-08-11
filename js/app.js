/*
  - Construa uma aplicação de conversão de moedas. O HTML e CSS são os que você
    está vendo no browser;
  - Você poderá modificar a marcação e estilos da aplicação depois. No momento, 
    concentre-se em executar o que descreverei abaixo;
    - Quando a página for carregada: 
      - Popule os <select> com tags <option> que contém as moedas que podem ser
        convertidas. "BRL" para real brasileiro, "EUR" para euro, "USD" para 
        dollar dos Estados Unidos, etc.
      - O option selecionado por padrão no 1º <select> deve ser "USD" e o option
        no 2º <select> deve ser "BRL";
      - O parágrafo com data-js="converted-value" deve exibir o resultado da 
        conversão de 1 USD para 1 BRL;
      - Quando um novo número for inserido no input com 
        data-js="currency-one-times", o parágrafo do item acima deve atualizar 
        seu valor;
      - O parágrafo com data-js="conversion-precision" deve conter a conversão 
        apenas x1. Exemplo: 1 USD = 5.0615 BRL;
      - O conteúdo do parágrafo do item acima deve ser atualizado à cada 
        mudança nos selects;
      - O conteúdo do parágrafo data-js="converted-value" deve ser atualizado à
        cada mudança nos selects e/ou no input com data-js="currency-one-times";
      - Para que o valor contido no parágrafo do item acima não tenha mais de 
        dois dígitos após o ponto, você pode usar o método toFixed: 
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
    - Para obter as moedas com os valores já convertidos, use a Exchange rate 
      API: https://www.exchangerate-api.com/;
      - Para obter a key e fazer requests, você terá que fazer login e escolher
        o plano free. Seus dados de cartão de crédito não serão solicitados.
*/

const currencyOneEl = document.querySelector('[data-js="currency-one"]');
const currencyTwoEl = document.querySelector('[data-js="currency-two"]');
const currenciesEl = document.querySelector('[data-js="currencies-container"]');
const convertedValueEl = document.querySelector('[data-js="converted-value"]');
const valuePrecisionEl = document.querySelector('[data-js="conversion-precision"]');
const timesCurrencyOneEl = document.querySelector('[data-js="currency-one-times"]');
// Método de exibição do alert
const showAlert = err => {
  const div = document.createElement('div');
  const button = document.createElement('button');

  div.textContent = err.message;
  div.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show');
  div.setAttribute('role', 'alert');
  button.classList.add('btn-close');
  button.setAttribute('type', 'button');
  button.setAttribute('aria-label', 'Close');

  button.addEventListener('click', () => {
    div.remove();
  });

  div.appendChild(button);
  currenciesEl.insertAdjacentElement('afterend', div);
} // showAlert();

// IIEF == Método de modolização do state
const state = (() => {
  let exchangeRate = {}

  return {
    getExchangeRate: () => exchangeRate,
    setExchangeRate: newExchangeRate => {
      if (!newExchangeRate.conversion_rates) {
        showAlert({ message: 'O objeto precisa ter uma propriedade conversion_rates' });
        return;
      }

      exchangeRate = newExchangeRate
      return exchangeRate
    }
  }
})() // state() == IIFE

// Referenciando a API do ExtancheRate-API
const getUrl = currency => `https://v6.exchangerate-api.com/v6/7c4ac44030380bf495ea9096/latest/${currency}`;

// Método para informa o tipo de erro
const getErrorMessagem = errorType => ({
  'unsupported-code': 'A moeda não existe no nosso banco de dados.',
  'base-code-only-on-pro': 'Informações de moedas que não seja USD ou EUR só podem ser acessadas a partir de contas pro',
  'malformed-request': 'O endpoint do seu request precisar seguir a estrutura à seguir: https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/USD',
  'invalid-key': 'A chave da API não é válida',
  'inactive-account': 'Seu endereço de e-mail não foi confirmado',
  'quota-reached': 'Sua conta alcançou o limite de requests permitio em seu plano atual',
  'not-available-on-plan': 'Seu plano atual não permite esse tipo de request'
})[errorType] || 'Não foi possível obter as informações.'

// Função que buscar a taxa de intercâmbio
const fetchExchangeRate = async url => {
  try {
    // o fetch é utlizado quando se deseja buscar dados de outro lugar, nesse caso a API
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Sua conexão falhou. Não foi possível obter as informações.');
    }

    const exchangeRateDate = await response.json();

    if (exchangeRateDate.result === 'error') {
      throw new Error(getErrorMessagem(exchangeRateDate['error-type']));
    }

    return exchangeRateDate;
  } catch (err) {
    showAlert(err);
  }
} //fetchExchangeRate();

// Exibição da informação da moeda
const showInitialInfo = exchangeRate => {
  const getOptions = selectedCurrency => Object.keys(exchangeRate.conversion_rates)
    .map(currency => `<option ${currency === selectedCurrency ? 'selected' : ''}>${currency}</option>`)
    .join('');

  currencyOneEl.innerHTML = getOptions('USD');
  currencyTwoEl.innerHTML = getOptions('BRL');

  convertedValueEl.textContent = exchangeRate.conversion_rates.BRL
    .toFixed(2);
  valuePrecisionEl.textContent = `1 ${currencyOneEl.value} = ${exchangeRate.conversion_rates.BRL} BRL`;
} // showInitialInfo()

const init = async () => {
  const exchangeRate = state.setExchangeRate(await fetchExchangeRate(getUrl('USD')))
  
  if (exchangeRate && exchangeRate.conversion_rates) {
    showInitialInfo(exchangeRate);
  }
}

// Exibindo a lista de taxa de cambio da moeda atualizada
const showUpdateRates = exchangeRate => {
  convertedValueEl.textContent = (timesCurrencyOneEl.value * exchangeRate
    .conversion_rates[currencyTwoEl.value]).toFixed(2);

  valuePrecisionEl.textContent = `1 ${currencyOneEl.value} = ${1 * exchangeRate
    .conversion_rates[currencyTwoEl.value]} ${currencyTwoEl.value}`
} // showUpdateRates();

// Exibindo as taxas da contação da moeda selecionada para moeda corrente
timesCurrencyOneEl.addEventListener('input', e => {
  const exchangeRate = state.getExchangeRate();
  console.log(exchangeRate)
  convertedValueEl.textContent = (e.target.value * exchangeRate
    .conversion_rates[currencyTwoEl.value])
    .toFixed(2);
}); //timesCurrencyOneEl();

// Exibindo a taxa de contação da moeda selecionada para outra moeda corrente
currencyTwoEl.addEventListener('input', () => {
  const exchangeRate = state.getExchangeRate();
  showUpdateRates(exchangeRate);
}); // currencyTwoEl();

// Mudando a taxa da moeda principal do cambio
currencyOneEl.addEventListener('input', async e => {
  const exchangeRate = state.setExchangeRate(await fetchExchangeRate(getUrl(e.target.value)))
  showUpdateRates(exchangeRate);
}); // currencyOneEl();

init();


