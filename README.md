# TextSearchApp

TextSearchApp is an Angular application that allows users to search for text using batch and online modes. The application provides a user-friendly interface to input text, specify search queries, and view highlighted search results.

## Getting Started

These instructions will help you set up and run the TextSearchApp project on your local machine.

### Prerequisites

To run this project, you need to have the following tools installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [Angular CLI](https://angular.io/cli) (v13.3.0 or later)

### Installing

1. Clone the repository to your local machine:

   git clone https://gitlab.com/parthivp7/textsearchapp
   cd TextSearchApp

### Install the project dependencies

npm install

### Running the Development Server

ng serve

The application will be accessible at http://localhost:4200/. The development server will automatically reload if you make changes to the source files.


### Usage
Open your web browser and navigate to http://localhost:4200/.

Input your text in the provided textarea.

Specify search queries in the query input fields.

Choose the search mode (Batch or Online) using the radio buttons.

Click the "Search" button to see the highlighted search results if batch mode is selected and if "Online" mode is selected and if there is/are any matches, it highlights the results automatically.

### Testing

The TextSearchApp project includes unit tests for its components. You can run the tests using the following command:

ng test

This command will execute the tests and provide coverage information.


### Built With
Angular - The web framework used
ngrx/store - State management for Angular applications


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


### Authors

Parthiv
