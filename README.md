# Byarent [![Build Status](https://travis-ci.org/Paul-Owori/byarent.svg?branch=master)](https://travis-ci.org/Paul-Owori/byarent)

Byarent is an online e-commerce platform that connects home-buyers to home owners.

You can see a hosted version of Byarent on [Heroku](https://byarental.herokuapp.com/)

You can also see the User Interface templates used for Byarent on [GH-pages](https://paul-owori.github.io/byarent/)

## Installation

Clone the repository

```bash
$ git clone https://github.com/Paul-Owori/byarent.git
```

Install dependencies in the root folder with

```bash
$ npm install
```

Navigate to the client folder and install dependencies there too ;

```bash
$ cd client
$ npm install
```

## Requirements

A connection to MongoDB, either local or online should be placed in ./server

## Usage

To run the backend only, use;

```bash
$ npm start
```

To run the backend and frontend concurrently, use;

```bash
$ npm run dev
```

To run tests written with mocha and chai use;

```bash
$ npm run test
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Languages and frameworks

Javascript, HTML and CSS + Reactstrap were used, along with the MERN Stack (MongoDB, Express, React, NodeJS)

## License

[MIT](https://choosealicense.com/licenses/mit/)
