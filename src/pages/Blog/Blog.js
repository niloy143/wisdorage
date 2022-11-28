import React from 'react';
import useTitle from '../../hooks/useTitle';

const Blog = () => {
    useTitle('Blog');
    return (
        <div className='px-3 my-12 max-w-7xl mx-auto' style={{ minHeight: '90vh' }}>
            <div className='grid md:grid-cols-2 gap-x-5 gap-y-8'>
                <div className='max-w-2xl text-justify'>
                    <h2 className='text-xl font-semibold py-3'>What are the different ways to manage a state in a React application?</h2>
                    <p>There are different ways to manage state in a react application. Some of them are mentioned below:</p>
                    <ul className='flex flex-col gap-3 mt-3'>
                        <li>Using URL to store some data. For example: The id of the current item being viewed, Filter parameters, Pagination offset and limit, Sorting data</li>
                        <li>Storing the state in the browser via web storage. This is useful when we want to persist state between reloads and reboots. Examples include cookies, local storage, and IndexedDB. These are native browser technologies.</li>
                        <li>Using store state locally. It is useful when one component needs the state. Examples include a toggle button, a form, etc.</li>
                        <li>Defining the state in the parent component. Often, the same state is used across multiple components. In those cases, it is useful to lift the state to a common parent. The lifting state is a two‑step process. First, we declare the state in a common parent component, and then we pass the state down to child components via props. This pattern should be considered any time a few related components need to use the same state. The lifting state avoids duplicating states in multiple components. It helps to assure that our components all consistently reflect the same state.</li>
                        <li>Computing the new state based on the available state and we do not need to declare a state at all. If there are existing values that can be composed to give us the information we need, then we can calculate that information on each render instead of storing it. Some examples include calling .length on an array to determine the number of records instead of storing a separate numItems variable in the state or deriving an errorsExist boolean by checking if the errors array is empty.</li>
                    </ul>
                </div>
                <div className='max-w-2xl text-justify'>
                    <h2 className='text-xl font-semibold py-3'>What is a unit test? Why should we write unit tests?</h2>
                    <p>Unit testing is a type of software testing where individual units or software components are tested. Its purpose is to validate that each unit of code performs as expected. A unit can be anything you want it to be — a line of code, a method, or a class. Generally, smaller tests are better as they give a more granular view of your code’s performance. Also, when you test very small units, your tests can run fast, like a thousand tests in a second fast.</p>
                    <ul className='flex flex-col gap-3 mt-3'>
                        <li>Unit tests save time and money. Usually, we tend to test the happy path more than the unhappy path. If you release such an app without thorough testing, you would have to keep fixing issues raised by your potential users. The time to fix these issues could’ve been used to build new features or optimize the existing system. Bear in mind that fixing bugs without running tests could also introduce new bugs into the system.</li>
                        <li>Well-written unit tests act as documentation for your code. Any developer can quickly look at your tests and know the purpose of your functions.</li>
                        <li>It simplifies the debugging process</li>
                        <li>Unit testing is an integral part of extreme programming. Extreme programming is basically a “test-everything-that-can-possibly-break” programming strategy.</li>
                        <li>Unit tests make code reuse easier. If you want to reuse existing code in a new project, you can simply migrate both the code and tests to your new project, then run your tests to make sure you have the desired results.</li>
                        <li>Unit testing improves code coverage. A debatable topic is to have 100% code coverage across your application.</li>
                        <li>In the testing pyramid, unit tests are faster than integration and end-to-end. They are more assertive and return quick feedback. </li>
                    </ul>
                </div>
                <div className='max-w-2xl text-justify'>
                    <h2 className='text-xl font-semibold py-3'>Differences between Angular.js, React.js and Vue.js</h2>
                    <div>
                        <h2 className='text-xl font-semibold pb-3 pt-6'>Architecture</h2>
                        Speaking of architecture, Angular.js is a full-fledged MVC framework that provides you with all the possibilities for out-of-the-box programming: <br /> <br />

                        Templates based on HTML; <br />
                        Dependency injection; <br />
                        Ajax requests; Routing; <br />
                        Encapsulation of CSS components; <br />
                        Components testing utilities; <br />
                        Opportunities to create forms, etc. <br /> <br />
                        React.js, on the other hand, is a library that just offers the view, leaving the developer to decide how to construct the Model and Controller. The following features are provided: <br /> <br />

                        As an add-on to JavaScript, the JSX language, which is similar to XML, is used instead of templates; <br />

                        No introduction of dependencies; <br />

                        Ajax requests;<br /> <br />

                        Vue.js is a library that allows you to create interactive web interfaces. Vue.js is primarily concerned with the ViewModel layer of the MVVM architecture. It uses two-way data bindings to attach the View and the Model. Directives and Filters abstract away the actual DOM operations and output formatting.

                        <h2 className='text-xl font-semibold pb-3 pt-6'>Data Binding</h2>
                        Angular.js uses the two-way binding. The state of the model is changed first, and then the modification of the interface element is reflected. The interface element changes as the model’s state changes, which is why two-way data binding is used.<br /> <br />

                        React.js has one-way binding. First, the state of the model is updated, and then it reflects the change of the interface element. If you change the interface element, the state of the model stays the same.<br /> <br />

                        As on Angular, the data binding on Vue.js is two-way. Vue.js synchronizes the entire model with the DOM mechanically. This implies that all Vue.js templates are fundamentally legal, parsable HTML with a few extra features. Remember this because Vue templates are fundamentally different from string-based templates.

                        <h2 className='text-xl font-semibold pb-3 pt-6'>Mobile solutions</h2>
                        Each one of the three compared web development frameworks offers mobile solutions for apps development.<br /> <br />

                        When it comes to Angular, this is the Ionic framework, which makes use of Angular’s Cordova container. You download the app, which is a web application running within a web browser.<br /> <br />

                        React.js doesn’t have a similar framework. React Native is a platform for creating actual native mobile applications.<br /> <br />

                        Vue has announced its support for the Alibaba Group’s Weex project, which is a cross-platform UI framework. Weex allows you to develop browser components as well as iOS and Android apps using the same Vue syntax.

                        <h2 className='text-xl font-semibold pb-3 pt-6'>Ease of learning</h2>
                        In the case of React.js, you need to learn JSX first, which is not a problem since it’s quite simple. Then you need to go through the routing library (react-router v4, for example) and then the state management libraries (Redux or MobX).<br /> <br />

                        In the case of Angular, there are way more steps to make and information to learn. From basic terms (directives, modules, decorators, components, services, dependency inputs, pipes, and templates), this is followed by topics as change detection, zones, AoT compilation, and Rx.js.<br /> <br />

                        And in the case of Vue.js, the fundamental features may be implemented in the first web applications in the least amount of time. Vue is simpler to understand than Angular or React since it is more adaptable. Furthermore, Vue’s functionality, such as the use of components, overlaps with that of Angular and React. Vue.js’s simplicity and adaptability, on the other hand, have a drawback: it enables poor code that is tough to debug and test.

                        <h2 className='text-xl font-semibold pb-3 pt-6'>Syntax</h2>
                        Angular is written in TypeScript, which means you need some time to learn it to work with this framework.<br /> <br />

                        React uses JSX and native Javascript developers are familiar with it. The training period is easier and does not require that much preparation.<br /> <br />

                        Vue.js makes use of an HTML-based template syntax that allows you to link the displayed DOM to the data of the base element instance declaratively. All Vue.js templates are valid HTML that can be read by HTML analyzers and browsers that follow the standard.

                        <h2 className='text-xl font-semibold pb-3 pt-6'>Integration</h2>
                        Angular provides a basic framework for building web applications and does not require any additional libraries. It is relatively rigid and inflexible as a complete framework. <br /> <br />

                        React.js is usually not enough to build a web app. In most instances, using extra libraries is advised. As a result, it’s more adaptable and simple to integrate into current mobile apps. <br /> <br />

                        Vue.js allows distinct features of an app to be implemented without altering the architecture. When it comes to integrating with other libraries, Vue is a perfect solution. Vue.js may be used to create both single-page apps and more complex online interfaces for apps.

                        <h2 className='text-xl font-semibold pb-3 pt-6'>Performance</h2>
                        To capture all changes to the DOM, Angular.js creates a watcher for each binding. Every time the view updates, the new values compare with the old ones. This can end up in poorer performance in large mobile applications. <br /> <br />

                        Because React uses a virtual DOM, when the view is modified, the new DOM compares it to the virtual DOM and changes accordingly. <br /> <br />

                        Vue.js has better performance thanks to the virtual DOM, which is useful for complicated programs. It may be as little as 20KB while maintaining its speed and versatility, allowing it to achieve considerably better performance than competing frameworks.
                    </div>
                </div>
                <div className='max-w-2xl text-justify'>
                    <h2 className='text-xl font-semibold py-3'>How does prototypical inheritance work?</h2>
                    <p>Everything in Javascript is an object. Even when creating a Class is an Object via an Object Literal or Constructor Function. This is how Javascript does class-based programming as to other traditional Object-Oriented Programming languages where they use the keyword ‘class’ and ‘inheritance’.</p>
                    <p className='mt-3'>So, the core idea of Prototypal Inheritance is that an object can point to another object and inherit all its properties. The main purpose is to allow multiple instances of an object to share common properties, hence, the Singleton Pattern.</p>
                </div>
            </div>
        </div>
    );
};

export default Blog;