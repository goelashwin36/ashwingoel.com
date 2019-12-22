---
date: "2019-12-02T00:00:00+00:00"
publishdate: "2019-12-02+08:00"
lastmod: "2019-12-02+08:00"
draft: true
title: "A Comprehensive Guide to Creating Your First React App"
tags: ["React", "Javascript"]
categories: ["Buffer Overflow"]
img: "images/blog/react/Ashwin-Goel-0.png"
toc: true
summary: "Buffer Overflow occurs when more data is written to a specific length of memory such that adjacent memory addresses are overwritten."
---


## What is  React

***React*** is a modular Javascript library created by Facebook which helps to make web apps fast and efficient with minimal coding.<br>
In this blog, we will make a simple `React application` that can be used to compare different products.
This is what our final application will look like:

<div style='position:relative; padding-bottom:calc(79.67% + 44px)'><iframe src='https://gfycat.com/ifr/AbleWeepyAmericanriverotter' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0;' allowfullscreen></iframe></div>

## Why React

React comes with a wide range of advantages and some of them are as follows:

**Easy to learn and easy to use**<br>
React comes with a good supply of [documentation](https://reactjs.org/docs/hello-world.html) and [tutorials](https://reactjs.org/tutorial/tutorial.html). Anyone who does JavaScript can easily understand React and start using it in just a few days.

**Reusable components**<br>
React allows a developer to break the app into smaller components that can be reused later hence minimizing the codebase. We will understand more about components in the next section.

**Use of virtual DOM**<br>
DOM manipulation is one of the most expensive tasks for any framework, especially when the application is big. React solves this issue by using a Virtual DOM, which is basically a lightweight copy of the Real DOM. It is only an in-memory representation and is not rendered on the actual screen.<br />
Instead of rendering the whole DOM again, React compares the changes in Virtual DOM and then renders it in the Real DOM accordingly.

**Easy to write JSX**<br>
JSX is just a combination of HTML and Javascript. It makes coding a lot easier and also helps in preventing injection attacks like [XSS](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)).

## Some Basic Concepts

Before diving a little deeper, let’s understand some basic concepts that will be needed to proceed further.

### Component

A `component` is a building block of every React app; therefore, a group of components makes a React app.<br>
In the image below, you can see how a simple web page is made using different components.

<img src="/images/blog/react/Ashwin-Goel-1.png" style=" max-height: 500px;  ">

### Props

`Props` are a way of making components dynamic by passing properties/data down from one component to another. They are immutable, i.e they cannot be changed. It is simply passing some information by the parent component to the child component.

<img src="/images/blog/react/Ashwin-Goel-3.png" style=" max-height: 500px;  ">

### State

`State` is a variable in every `Class Component` which has the capability to store information dynamically. It is similar to a `prop` apart from the fact that it is private and fully controlled by the component.<br>

We’ll discuss about this more in the next section.

<img src="/images/blog/react/Ashwin-Goel-4.png" style=" max-height: 500px;  ">

### JSX

Precisely JSX is an XML/HTML like syntax. It adds XML/HTML syntax to Javascript.

<img src="/images/blog/react/Ashwin-Goel-5.png" style=" max-height: 500px;  ">

### Types of Components

1. **Functional components(Stateless)**<br>
   These components are purely presentational(No Functionality, Only output UI items) and can simply be represented by a function. It doesn't have a state.

   ```jsx
    const Greeting = () => <h1>Hi, I’m a dumb component!</h1>;
   ```

2. **Class Components(Stateful)**<br>
   These components are implemented using a class and have the capability to apply logics, hold state and render accordingly.

   ```jsx
    class Greeting extends React.Component {
        render(){
            return <h1>Hi, I’m a smart component!</h1>;
        }
    }
   ```

## Installation

A `GitHub repository` is already created which has a basic React app and some images which we will require during the making of our first react app.<br>
You can do the installation in two ways: by using the GitHub repository or through a fresh install.

### 1. Using GitHub Repository

You can simply clone the GitHub repo:

```bash
git clone https://github.com/goelashwin36/react-workshop-start.git
```

Open cmd/terminal and move into the cloned GitHub repository.

#### Docker

1. Build the `Dockerfile`

   ```bash
   docker build -t reactapp:v1
   ```

2. Run `Docker Image`

   ```bash
   docker run -v ${PWD}:/app -v /app/node_modules -p 3001:3000 --rm reactapp:v1
   ```

#### Without Docker

1. For this, you need to have `npm` installed. If you have it, skip the first step.<br>
Download and install it from the [official website](https://nodejs.org/en/).

2. Install all the node modules necessary to run the application:

   ```bash
   npm install
   ```

3. Start the React server

   ```bash
   npm start

   ```

### 2. Fresh Install

1. You would need to have `npm` for this step. Download and install it from the [official website](https://nodejs.org/en/).

2. `Create-react-app`: 2. Create-react-app: Create React App is an officially supported way to create single-page React applications. It's one of the NPM packages which generates a basic React app. Configuring a React App manually is a tedious task. If you’re still interested in manual installation, follow these [instructions](https://www.valentinog.com/blog/babel/).

   ```bash
   # Generates a sample react app
   npx create-react-app <app-name>
  
   ```

3. `Reactstrap`: NPM library which is like `Bootstrap` for `React`.     It makes the app look modular and makes it responsive.

   ```bash
   # Installing reactstrap
   # Using cmd/terminal, move into the react app created from the above step.
   npm install --save bootstrap
   npm install --save reactstrap react react-dom
   ```

4. In the `src` directory, create a folder named `assets` and in that create another folder named `images`. Add any five images, named 1.jpg, `2.jpg` ... `5.jpg`.

**Note that** `VS code` is one of the most powerful and lightweight source code editors and is available for Windows, macOS, and Linux. Download it from the [official website](https://code.visualstudio.com/#meet-intellisense).

## Building the Application

The time has come when we’re ready with the basic knowledge and can dive into the implementation.

1. It's always a good practice to add all the `components` in the `components folder` in the `src` directory.
   1. Open the project in VSCode.
   2. Add a folder `components` in the `src` directory.
   3. Create a file `products.js` in the `components` folder.<br>
   The directory should look like this:

   ```bash
   |node_modules
   |public
   |src
     |assets
       |images
         |1.jpg
         ...
         |5.jpg
     |components
       |products.js
     |App.css
     |App.js
     |App.test.js
     |index.css
     |serviceWorker.js  
   |Dockerfile
   |package.json
   |README.md

   ```

2. The basic structure of a class based component looks like this:
   Copy this and paste it into the `products.js` file.<br>

   ```jsx
   // Import statements comes here.
   import React, { Component } from 'react';

   // You need to extend the functionality of `Component` to the class created.
   class className extends Component {
       constructor() {
           super();

   // A state can hold anything dynamically. For example here randomVar is any    variable.
           this.state = {
               randomVar: ""
               }
           }
   // This function renders a component
       render() {

           // Whatever is returned is rendered
           return (
               <div>
                   <p>Hello World!</p>
               </div>
           )
       }
   }

   export default className;
   ```

3. Now we have created a `component` which prints `Hello World!`.<br>
   To make sure this component is rendered, open `app.js` file in `src` directory.<br>
   Copy this code and paste it there after deleting the previous code.

   ```jsx
   import React from 'react';
   import './App.css';
   import Products from './components/products';
   import 'bootstrap/dist/css/bootstrap.min.css';

   function App() {
     return (
       <div className="App">
         <Products />
       </div>
     );
   }

   export default App;
   ```

   Here we are just importing the `Products` as a component from the `products.js` file and rendering it using `<Products />`.<br>
4. Let's test the app.<br>
   In the terminal, navigate to `app` directory and type `yarn start`.
   Open `http://localhost:3000`<br>
5. Let's start editing `products.js` file.<br>
    5.1 In the state variable add this json:

   ```jsx
    this.state = {
            products: [{ "name": "KTM Duke", "img": "1.jpg", "id": 1, "price": "2 lakh", "engine": "299 cc" },
            { "name": "KTM RC", "img": "2.jpg", "id": 2, "price": "2.2 lakh", "engine": "299 cc" },
            { "name": "Ninja", "img": "3.jpg", "id": 3, "price": "3.7 lakh", "engine": "350 cc" },
            { "name": "BMW S", "img": "4.jpg", "id": 4, "price": "6.8 lakh", "engine": "800 cc" },
            { "name": "Hayabusa", "img": "5.jpg", "id": 5, "price": "9.2 lakh", "engine": "1340 cc" },
            ],
            compare: {
              // The arr variable stores the id of selected components
                arr: []
            }
        }
   ```

   1. Let's make a simple `Reactstrap component`.

     1. Add import statement in the starting to import `Reactstrap components`.

       ```jsx
       import { Table, Card, Button, CardTitle, CardText, Row, Col, CardImg } from 'reactstrap';
       ```

     2. Inside the return statement add this:

      ```jsx
      <Row>
           <Col md="2" lg="2">
                <Card body outline engine="primary">
                  <img height="120px" width="240px" src={require("../assets/images/1.jpg")} />
                   <CardTitle>Title</CardTitle>
                    <Button type="button">Button</Button>
                </Card>
           </Col>
      </Row>
      ```

   2. Now, lets fetch the details from the state variable and re build the `Reactstrap component

   To write a `js` code inside `html elements` use `{}` brackets.

   ```jsx
   <Row>
      {this.state.products.map((product, index) => (
          <Col key={product.id}  md="2" lg="2">
              <Card body outline engine="primary">
                  <img height="120px" width="240px" src={require("../assets/images/" + product.img)}/>
                  <CardTitle>{product.name}</CardTitle>
                  <Button type="button" id={product.id} onClick={this.handleClick}>Button</Button>
              </Card>
          </Col>
      ))}

   </Row>

   ```

   1. We need to define the `handleClick` function.
   Before that, We need to `bind` the `handleClick` function to the `class` because we want to access the `state variable` inside this function.

   - To do this add `this.handleClick = this.handleClick.bind(this);` after the state variable is declared.

   - Outside the constructor let's define the function now.

     ```jsx
     // e is the event. For example here the event is `click`. This variable has some information like: name, id etc. of the component which fired it.
     handleClick(e) {
          // Creating a duplicate of arr variable of state
          let temparr = this.state.compare.arr;
          // e.target.id returns the id of the button which fired the event.
          //This helps us in identifying the component
          let id = temparr.indexOf(e.target.id)
          //Checking if the component is already present in the arr variable or not
          if (id != -1) {
            //If present then remove it
              temparr.splice(id, 1)
          }
          else {
            //else push the id to the temparr
              temparr.push(e.target.id)
          }
          //setState function helps in changing the state. It can't be done manually
          this.setState({ compare: { arr: temparr } });
      }
     ```

   1. The last thing left is to make the `compare table`.

      For that we have the `id` of all the items to be compared in the `compare.arr` in the `state`. We need a way to figure out how to render.

   - So, we'll iterate in the `compare.arr` and then create a `new array: temp` which has the objects which we have to compare. It looks similar to `products` array.
  
     ```jsx
     let temparr = this.state.compare.arr

     let temp = []  // Array of objects which we need to compare
     // Iterating in temparr
     for (var i = 0; i < temparr.length; i++) {
       // x is the object from `this.state.products` which has the required id
         let x = this.state.products.find(prod => prod.id == temparr[i]);
         temp.push(x)
         }

     ```

   - Create the final `Table` which takes values from the `temp` variable above and maps it to make a `table` exactly the same way we made the `card`.

     Place the table just after the `Card Component`.

     ```jsx
     <Table>
      <thead>
          <th width="33.33%">Name</th>
          <th width="33.33%">Price</th>
          <th width="33.33%">Engine</th>
      </thead>
      {temp.map((product) => (
          <tbody>
              <tr>
                  <td width="33.33%">{product.name}</td>
                  <td width="33.33%">{product.price}</td>
                  <td width="33.33%">{product.engine}</td>
              </tr>
          </tbody>
      ))}
      </Table>
     ```

And now our app is complete. `Save` and refresh the browser.<br>

The final products.jsfile looks like this:

```jsx
import React, { Component } from 'react';

import { Table, Card, Button, CardTitle, CardText, Row, Col, CardImg } from 'reactstrap';

class Product extends Component {
    constructor() {
        super();

        this.state = {
            products: [{ "name": "KTM Duke", "img": "1.jpg", "id": 1, "price": "2 lakh", "engine": "299 cc" },
            { "name": "KTM RC", "img": "2.jpg", "id": 2, "price": "2.2 lakh", "engine": "299 cc" },
            { "name": "Ninja", "img": "3.jpg", "id": 3, "price": "3.7 lakh", "engine": "350 cc" },
            { "name": "BMW S", "img": "4.jpg", "id": 4, "price": "6.8 lakh", "engine": "800 cc" },
            { "name": "Hayabusa", "img": "5.jpg", "id": 5, "price": "9.2 lakh", "engine": "1340 cc" }
            ],
            compare: {
                arr: []
            }
        }
        this.handleClick = this.handleClick.bind(this);


    }
    handleClick(e) {
        let arrnew = this.state.compare.arr;
        let temp = arrnew.indexOf(e.target.id)
        if (temp != -1) {
            arrnew.splice(temp, 1)
        }
        else {
            arrnew.push(e.target.id)
        }
        // console.log(event)
        this.setState({ compare: { arr: arrnew } });
    }
    render() {

        let temparr = this.state.compare.arr
        let temp = []
        let Compare;
        for (var i = 0; i < temparr.length; i++) {
            let x = this.state.products.find(prod => prod.id == temparr[i]);
            temp.push(x)
        }

        return (
            <div>
                <Row>
                    {this.state.products.map((product, index) => (
                        <Col key={product.id}>
                            <Card body outline engine="primary">
                                <img height="120px" width="240px" src={require("../assets/images/" + product.img)} alt={product.name} />
                                <CardTitle>{product.name}</CardTitle>
                                <Button type="button" id={product.id} onClick={this.handleClick}>{(this.state.compare.arr.indexOf(product.id) < 0) ? "Compare" : "Remove"}</Button>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Table>
                    <thead>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Engine</th>
                    </thead>
                    {temp.map((product) => (
                        <tbody>
                            <tr>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.engine}</td>
                            </tr>

                        </tbody>

                    ))}
                </Table>

            </div >
        )
    }
}

export default Product;

```

Kudos! You just created your first react app.

The final application should look like this: [https://github.com/goelashwin36/react-workshop-final](https://github.com/goelashwin36/react-workshop-final).

## What We Learned

- What React is, and its advantages.
- Some basic concepts of React, including methodology, state, components, props, JSX.
- Type ofcomponentsand it’s usage.
- Usage of state variable.
- How to use JSX and render HTML based on logics implemented using js.
- Using Reactstrap to create modular and responsive components.

## References

1. [https://hackernoon.com/virtual-dom-in-reactjs-43a3fdb1d130](https://hackernoon.com/virtual-dom-in-reactjs-43a3fdb1d130)
1. [https://reactstrap.github.io/](https://reactstrap.github.io/)
1. [https://reactjs.org/docs/hello-world.html](https://reactjs.org/docs/hello-world.html)
1. [https://scrimba.com/g/glearnreact](https://scrimba.com/g/glearnreact)