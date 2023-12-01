# Food Explorer API

Projeto de conclusão do curso explorer da RocketSeat.

<h1>Objetivo</h1>

O projeto consiste no desenvolvimento de aplicação de um cardápio online. O Onde deverão ser ocndierados duas personas: 
Usuário Admin, que poderá realizar o cadastro de novos pratos e upload da foto do prato.
usuário Costumar, usuário que poderá visualizar e pesquisar os pratos existentes através do seu ingredientes.

O desafio prevê o desenvolvimento do back-end utilizando os conhecimentos e tecnologias aprendidas durante o treinamento.

<h2> Back-end</h2>
A aplicação foi desenvolvida com as seguintes tecnologias:
<ul>
    <li>Nodejs</li>
    <li>Express</li>
    <li>SqLite</li>
    <li>Knex</li>
    <li>Jwt</li>
    <li>Jest</li>  
</ul>

<h2>Subir a aplicação</h2>
Para executar a aplicação é necessário executar os comandos abaixo:

Instalar os módulos do nodejs:
```bash
npm install
```
Subir o banco através do comando:
```bash
npm run migrate
```
Subir a aplicação
* Produção: 
```bash
npm start
```
* Ambiente de desenvolvimento:
``` bash
npm run dev 
```

## Documentação da API

#### Autenticação
```
POST /sessions
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | E-mail do usuário |
| `password` | `string` | Senha |

#### payload

```
{
	"email": "email@email.com",
	"password": "password"
}
```
#### Resposta


#### Cria um novo registro de prato

```http
  POST /foods
```
```http
{
	"name": "food name",
	"category": "refeição",
	"description": "any text",
	"price": 199.99,
	"ingredients": [
    "ingredient1",
    "ingredient2",
    "ingredientN"]
}
```

#### Retorna lista os pratos de acordo com parâmetros "name" ou "ingredients"

```http
  GET /foods?name=$name&ingredients=$ingredient1,ingredientN
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | Título do prato |
| `ingredients` | `string` | Lista de ingredientes separados por vírgula |

#### Retorna um item

##### Requisição:

```http
  GET /foods/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. ID do item buscado |

##### Resposta:

```http
{
	"id": 1,
	"name": "Salada Ravanello",
	"category": "refeição",
	"description": "Rabanetes, folhas verdes e molho agridoce salpicados com gergelim. O pão naan dá um toque especial.",
	"price": 49.9,
	"image": "4f53ba4631f8b388d579-Mask group.png",
	"user_id": 1,
	"created_at": "2023-11-30 18:53:51",
	"updated_at": "2023-11-30 21:52:54",
	"ingredients": [
		"alface",
		"cebola",
		"pepino",
		"pão naan",
		"rabanete",
		"tomate"
	]
}
```

#### Alterar registro de um prato
```http
  PUT /foods
```
```http
{
	"id": 1,
	"name": "food name",
	"category": "bebida",
	"description": "text description",
	"price": 49.9,
	"image": "4f53ba4631f8b388d579-image.jpg",
    "ingredients": ["ingredient1","ingredient2","ingredientN"]
}
```