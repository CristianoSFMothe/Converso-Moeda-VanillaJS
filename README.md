<p align="center">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/CristianoDaSilvaFerreira/Converso-Moeda-VanillaJS?style=plastic"> <img alt="GitHub" src="https://img.shields.io/github/license/CristianoDaSilvaFerreira/Converso-Moeda-VanillaJS"> <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/CristianoDaSilvaFerreira/Converso-Moeda-VanillaJS"> <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/CristianoDaSilvaFerreira/Converso-Moeda-VanillaJS"> <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/CristianoDaSilvaFerreira/Converso-Moeda-VanillaJS">
</p>

<p align="center">
 <img src="https://img.shields.io/static/v1?label=Deveoper&message=CristianoFerreira&color=7159c1&style=for-the-badge&logo=ghost"/>
</p>


<h1>:moneybag: Converso Moeda VanillaJS</h1>

<p>:rocket: Um converso de moeda usando VanillaJS, sem uso de framework ou libs do JavaScript. Ou seja puro JavaScript.</p>


<p>Esse projeto consiste em uma requisição atráves da <a href="https://www.exchangerate-api.com/" target="_blank">API ExchangeRate-API</a>, na qual depois de criar, poderá será ser feito a requisição dos dados da API. 
  
<h2>Description</h2>
<p>Esse projeto consiste numa aplicação web para uma aplicação de requisição da taxa de câmbio da moedas internacionais, como por exemplo o Dólar atualmente em relação ao Real</p>
<img src="https://user-images.githubusercontent.com/68359459/142724197-c4faa4ba-6324-4974-b2a8-16ffbd40534f.png">

<img src="https://user-images.githubusercontent.com/68359459/142711129-d79b52f7-c46d-4cd5-aa85-b3c261dad558.png">


<p>Com acesso a API podemos obter os dados referente as cotações da moedas, e fazemos a nossa configuração para definir qual a moeda é a de base de referência.</p>
<img src="https://user-images.githubusercontent.com/68359459/129281094-c64baf35-32d9-42e4-89bd-a0d63309353e.png">


## 📥 Instalação e execução
Faça um clone desse repósitorio, e acesse esse diretório
```bash
  $ git clone https://github.com/CristianoDaSilvaFerreira/Converso-Moeda-VanillaJS.git
```

## :muscle: Contribuir

Faça o `fork` e clone o projeto a partir do seu usuário.

```bash
# Clonando projeto
$ git clone https://github.com/SEU-NOME-DE-USUARIO/netflix-clone.git

# Criando um branch
$ git branch minha-alteracao

# Acessando o novo branch
$ git checkout -b minha-alteracao

# Adicionando os arquivos alterados
$ git add .

# Criando commit e a mensagem
$ git commit -m "Corrigindo...."

# Enviando alterações para o brach
$ git push origin minha-alteracao
```
Você deve navegar até o seu repositório onde fez o fork e clicar no botão *New pull request* no lado esquerdo da página.

<h2>🛠 Tecnologias</h3>
As seguintes ferramentas foram utilizadas para construção desse projeto:
<ul>
	<li><a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript">JavaScript</a> </li>
	<li><a href="https://www.w3schools.com/html/">HTML5</a></li>
	<li><a href="https://www.w3schools.com/css/">CSS3</a></li>
	<li><a href="https://getbootstrap.com/">Bootstrap</a></li>
</ul>
 


<p>Aplicando a apredezagem a utulização de IIFE (Immediately Invoked Function Expression), que antigamente era usado fazendo com que uma aplicação tivesse só escopo locais, ou seja somente escopo de funções. Mas agora com as novas versões do JavaScript, com a utilização do ES6, que agora faz com que tenha-se o sistema de modulos. O que no caso dessa aplicação, será aplicado a utilização da IIFE para fazer com a função seja autoexecutável</p>

~~~javascript
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
  })()
~~~

## 📥 Instalação e execução
Faça um clone desse repósitorio, e acesse esse diretório
```bash
  $ git clone https://github.com/CristianoDaSilvaFerreira/Coffee-Shop.git
```

## :muscle: Contribuir

Faça o `fork` e clone o projeto a partir do seu usuário.

```bash
# Clonando projeto
$ git clone https://github.com/SEU-NOME-DE-USUARIO/netflix-clone.git

# Criando um branch
$ git branch minha-alteracao

# Acessando o novo branch
$ git checkout -b minha-alteracao

# Adicionando os arquivos alterados
$ git add .

# Criando commit e a mensagem
$ git commit -m "Corrigindo...."

# Enviando alterações para o brach
$ git push origin minha-alteracao
```
Você deve navegar até o seu repositório onde fez o fork e clicar no botão *New pull request* no lado esquerdo da página.

 
<h3> Autor </h3>

<a>
 <img style="border-radius: 50%;" src="https://user-images.githubusercontent.com/68359459/128278200-0cba229d-615d-410c-8800-ef09d0367c35.jpg" width="100px;" alt=""/>
 <sub><b>Cristiano da Silva Ferreira</b></sub></a>🚀


<p>Feito com ❤️ por Cristiano da Silva Ferreira 👋🏽 Entre em contato!</p>

[![Linkedin Badge](https://img.shields.io/badge/-Cristiano-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/cristiano-da-silva-ferreira/)](https://www.linkedin.com/in/cristiano-da-silva-ferreira/) 
[![Gmail Badge](https://img.shields.io/badge/-cristianodevsystemo@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:cristianodevsysten@gmail.com)](mailto:cristianodevsystem@gmail.com)


<p align="center">
 <a href="#objetivo">Objetivo</a> •
 <a href="#tecnologias">Tecnologias</a> • 
 <a href="#contribuicao">Contribuição</a> • 
 <a href="#licenc-a">Licença</a> • 
 <a href="#autor">Autor</a>
</p>

<h4 align="center">
    <a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript">🔗 JavaScript - Aplimoramento</a>
</h4>


<h4 align="center"> 
	🚧  Finalizado podendo ser acessado atráves do endereço <a href="https://cristianodasilvaferreira.github.io/Converso-Moeda-VanillaJS/">Converso de Moedas</a>  🚧	
</h4>





