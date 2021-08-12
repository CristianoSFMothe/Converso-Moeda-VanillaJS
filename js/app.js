const currencyOneEl = document.querySelector('[data-js="currency-one"]');
const currencyTwoEl = document.querySelector('[data-js="currency-two"]');
const currenciesEl = document.querySelector('[data-js="currencies-container"]');
const convertedValueEl = document.querySelector('[data-js="converted-value"]');
const valuePrecisionEl = document
  .querySelector('[data-js="conversion-precision"]');
const timesCurrencyOneEl = document
  .querySelector('[data-js="currency-one-times"]');
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

  const removeAlert = () => div.remove();
  button.addEventListener('click', removeAlert);

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
        showAlert({ 
          message: 'O objeto precisa ter uma propriedade conversion_rates' 
        });
        return;
      }

      exchangeRate = newExchangeRate
      return exchangeRate
    }
  }
})() // state() == IIFE

// Referenciando a API do ExtancheRate-API
const APIkey = '7c4ac44030380bf495ea9096';
const getUrl = currency => 
  `https://v6.exchangerate-api.com/v6/${APIkey}/latest/${currency}`;

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
      const errorMessage = getErrorMessagem(exchangeRateDate['error-type']);
      throw new Error(errorMessage);
    }

    return state.setExchangeRate(exchangeRateDate);
  } catch (err) {
    showAlert(err);
  }
} //fetchExchangeRate();

// Metodo de exibir as opções
const getOptions = (selectedCurrency, conversion_rates) => {
  const setSelectedAttribute = currency => 
    currency === selectedCurrency ? 'selected' : '';
  const getOptionsArray = currency => 
    `<option ${setSelectedAttribute(currency)}>${currency}</option>`    
    
  return Object.keys(conversion_rates)
  .map(getOptionsArray)
  .join('');
} // getOptions();

// Método de mutiplicação da taxa de cambio
const getMultipliedExchangeRate = conversion_rates => {
  const currencyTwo = conversion_rates[currencyTwoEl.value];
  return (timesCurrencyOneEl.value * currencyTwo).toFixed(2);
} // getMultipliedExchangeRate();

// Método para retornar o valor não aredondado
const getNotRoundedExchangeRates = conversion_rates => {
  const currencyTwo = conversion_rates[currencyTwoEl.value];
  return `1 ${currencyOneEl.value} = ${1 * currencyTwo} ${currencyTwoEl.value}`
} // getNotRoundedExchangeRates();

// Exibindo a lista de taxa de cambio da moeda atualizada
const showUpdateRates = ({ conversion_rates }) => {
  convertedValueEl.textContent = getMultipliedExchangeRate(conversion_rates);
  valuePrecisionEl.textContent = getNotRoundedExchangeRates(conversion_rates);
} // showUpdateRates();

// Exibição da informação da moeda
const showInitialInfo = ({ conversion_rates }) => {

  currencyOneEl.innerHTML = getOptions('USD', conversion_rates);
  currencyTwoEl.innerHTML = getOptions('BRL', conversion_rates);

  showUpdateRates({ conversion_rates })
} // showInitialInfo();

// Método de inicialização da API
const init = async () => {
  const url = getUrl('USD');
  const exchangeRate = await fetchExchangeRate(url);
  
  if (exchangeRate && exchangeRate.conversion_rates) {
    showInitialInfo(exchangeRate);
  }
} // init();

const handleTimesCurrencyOneElInput = () => {
  const { conversion_rates } = state.getExchangeRate();
  convertedValueEl.textContent = getMultipliedExchangeRate(conversion_rates);
};

const handleCurrencyTwoElInput = () => {
  const exchangeRate = state.getExchangeRate();
  showUpdateRates(exchangeRate);
}

const handleCurrencyOneElInput = async e => {
  const url = getUrl(e.target.value);
  const exchangeRate = await fetchExchangeRate(url);

  showUpdateRates(exchangeRate);
}

// Exibindo as taxas da contação da moeda selecionada para moeda corrente
timesCurrencyOneEl.addEventListener('input', handleTimesCurrencyOneElInput) 
// Exibindo a taxa de contação da moeda selecionada para outra moeda corrente
currencyTwoEl.addEventListener('input', handleCurrencyTwoElInput); 
// Mudando a taxa da moeda principal do cambio
currencyOneEl.addEventListener('input', handleCurrencyOneElInput);

init();


