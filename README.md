# Food Explorer API

Projeto de conclusão do curso explorer da RocketSeat.

<h1>Objetivo</h1>

O projeto consiste no desenvolvimento de aplicação de um cardápio online. O Onde deverão ser ocndierados duas personas: 
Usuário Admin: que poderá realizar o cadastro de novos pratos e upload da foto do prato.
Usuário Costumer: usuário que poderá visualizar e pesquisar os pratos existentes através do seu ingredientes e incluir/remover um prato como favorito.

O desafio prevê o desenvolvimento do back-end utilizando os conhecimentos e tecnologias aprendidas durante o treinamento.

### URL Deploy
```Link
https://myfoodexplorer-api.onrender.com
```
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

### Instalação

Para começar, clone o repositório para o seu ambiente local:

```bash
git clone https://github.com/joaovvs/foodexplorer-api.git
cd foodexplorer-api
```

### Configuração

Antes de iniciar a aplicação configure as chaves AUTH_SECRET e PORT no arquivo ".env" conforme arquivo de exemplo".env.example"

## Executar a aplicação
Para executar a aplicação é necessário executar os comandos abaixo:

Instalar os módulos do nodejs:
```bash
npm install
```
Criar o banco através do comando:
```bash
npm run migrate
```
Iniciar a aplicação
* Produção: 
```bash
npm start
```
* Ambiente de desenvolvimento:
``` bash
npm run dev 
```

# Documentação da API

## Criação de usuário

#### End-point
```http
POST /users
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. Nome do usuário |
| `email` | `string` | **Obrigatório**. E-mail do usuário |
| `password` | `string` | **Obrigatório**. Senha |
  
  ###### Body
```JSON
{
	"name": "User name",
	"email": "email@email.com",
	"password": "9876543210"
}
```

## Resposta

  ### Sucesso
  ###### Status code
```
 201 Created
```
###### JSON
```JSON
{
	"id": 1,
	"name": "user name",
	"email": "email@email.com"
}
```

### Falha
```
400 Bad Request
```


# Autenticação

##### Para realizar a autenticação na aplicação é necessário criar uma sessão enviando os dados deemail e senha do usuário. Em caso de sucesso a aplicação retornará um cookie com o token do usuário e um JSON com o user id e role do usuário.

#### End-point
```http
POST /sessions
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | E-mail do usuário |
| `password` | `string` | Senha |

## Requisição

  ###### Body
```JSON
{
	"email": "email@email.com",
	"password": "password"
}
```
## Resposta

  ### Sucesso
  ###### Status code
```
 201 Created
```

```
  ###### Cookie
  ```Cookie
  "token=TOKEN; Expires=Sat, XX Dec XXX XX:XX:XX GMT; Max-Age=86400; Path=/; Secure; HttpOnly; Domain=XXXXXX
  ```

###### JSON
```JSON
{
	"user": {
		"id": 1,
		"name": "User name",
		"email": "email@email",
		"role": "admin",
		"created_at": "2099-12-31 00:00:00",
		"updated_at": "2099-12-31 00:00:00"
	}
}
```
 ### Falha
###### Status Code
```
 401 Unauthorized
```

###### JSON
```JSON
{
	"status": "error",
	"message": "E-mail e/ou senha incorreta"
}
```

# Criar um novo registro de prato


###### End-point
```http
POST /foods
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. Nome do prato |
| `category`      | `string` | **Obrigatório**. Categoria do prato |
| `description`      | `string` | **Obrigatório**. Descrição do prato |
| `price`      | `string` | **Obrigatório**. Preço do prato |
| `ingredients`      | `string` | Lista de ingredientes do prato |

## Requisição

###### Body
```JSON
{
	"name": "food name",
	"category": "refeição",
	"description": "any text",
	"price": 199.99,
	"ingredients": ["ingredient1","ingredient2","ingredientN"]
}
```
## Reposta

### Sucesso
###### Status Code
```
200 OK
```
###### JSON
```JSON
{
  "id": 1,
	"name": "food name",
	"category": "refeição",
	"description": "any text",
	"price": 199.99,
	"ingredients": ["ingredient1","ingredient2","ingredientN"]
}
```

### Falha
###### Status Code
```
400 Bad Request
```
###### JSON
```JSON
{
	"status": "error",
	"message": "Preencha todos os campos para realizar o cadastro!"
}
```


# Consultar Pratos
#### Retorna lista os pratos de acordo com parâmetros "name" ou "ingredients"

##### Requisição
```http
GET /foods?name=$name&ingredients=$ingredient1,ingredientN
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | Título do prato |
| `ingredients` | `string` | Lista de ingredientes separados por vírgula |

# Consultar um prato por nome eou lista de ingredientes

##### Requisição

```http
GET /foods/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. ID do item buscado |

## Resposta

### Sucesso

#### Status code
```
200 OK
```
#### JSON
```JSON
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
### Falha

#### Status code
```
400 Bad Request
```
#### JSON
```JSON
{
	"status": "error",
	"message": "Registro não encontrado!"
}
```

# Alterar registro de um prato

##### Requisição

```http
PUT /foods
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. ID do item alterado |
| `name`      | `string` | Nome do prato |
| `category`      | `string` | Categoria do prato |
| `description`      | `string` | Descrição do prato |
| `price`      | `string` | Preço do prato |
| `ingredients`      | `string` | Lista de ingredientes do prato |


#### Body
```JSON
{
	"id": 1,
	"name": "food name",
	"category": "bebida",
	"description": "text description",
	"price": 49.9,
    "ingredients": ["ingredient1","ingredient2","ingredientN"]
}
```
### Sucesso

#### Status code
```
200 OK
```

#### Body
```JSON
{
	"id": 1,
	"name": "food name",
	"category": "bebida",
	"description": "text description",
	"price": 49.9,
	"image": "4f53ba4631f8b388d579-Mask group.png",
	"user_id": 1,
	"created_at": "2099-12-31 00:00:00",
	"updated_at": "2099-12-31 00:02:00",
	"ingredients": ["ingredient1","ingredient2","ingredientN"]
}
```

### Falha
#### Status code
```
400 Bad Request
```
# Deletar registro de um prato

##### Requisição
```http
DELETE /foods/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. ID do item para ser excluído |

### Sucesso

#### Status code
```
200 OK
```
### Falha
```
400 Bad Request
```
###### JSON
```JSON
{
	"status": "error",
	"message": "Não foi possível deletar!"
}
```

# Incluir prato como favorito

##### Requisição
```http
POST /favorites/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. ID do item para incluir como favorito |

### Sucesso

#### Status code
```
200 OK
```

# Connsultar favoritos 

##### Requisição
```http
GET /favorites/
```


### Sucesso

#### Status code
```
200 OK
```

#### JSON
```JSON
{
[
	{
		"id": 1,
		"food_id": 1,
		"user_id": 1
	},
	{
		"id": 2,
		"food_id": 2,
		"user_id": 1
	}
]
}
```


# Remover prato dos favorito

##### Requisição
```http
DELETE /favorites/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. ID do item para remover dos favorito |

### Sucesso

#### Status code
```
200 OK
```


## To do list

User Shopping Cart


