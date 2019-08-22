# Launching MyAppShell from Package.json
## NOTE: Article did not work when doing Launching, follow commands below => https://blog.angular-university.io/angular-service-worker/
- "prestart": "npm run build:ssr"
- "start": "node dist/server"

> npm start // will execute prestart and the start

# MyAppShell

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.4.
Step 1 - Scaffolding an Angular PWA Application with the Angular CLI
Step 2 - Checking the index.html before including an App Shell
Step 3 - Profiling Application Startup Before an App Shell
Step 4 - Scaffolding an Angular Universal Application
Step 5 - Adding the App Shell using the Angular CLI
Step 6 - Generating the App Shell in Production Mode
Step 7 - Measuring the App Shell performance improvements

# UNIVERSAL APP
> ng new my-app-shell --routing --style=scss
> ng generate app-shell my-loading-shell --universal-project=ngu-app-shell --route=app-shell-path --client-project=my-app-shell

## Install Dependencies
> npm install --save @nguniversal/express-engine
> npm install --save @nguniversal/common @nguniversal/module-map-ngfactory-loader
> npm install --save-dev webpack-cli
> npm install --save-dev ts-loader
> npm install --save-dev reflect-metadata
> npm install --save-dev ts-node
> npm install --save express

## Update to Angular 8 version => checklist: https://update.angular.io/#6.1:8.0
Update to version 8 of the core framework and CLI by running the command below in your terminal:
> ng update @angular/cli @angular/core

# Problems with Universal/App-Shell
- There are few problems with server side rendering. Since application first bootstraps on Node.js, any code that depends on browser context and browser API won’t work. So any code accessing window and document object will throw error. Also since DOM is not available in node, any DOM operation will return into error as well. Any browser specific APIs like localStorage, IndexedDB will also throw error while bootstrapping the application on the server.
- This will get frustrating quickly when your code is fully compatible for server side rendering but a third party module is not. If a third party module rely on browser API or browser context, then this will prevent your entire application from being rendered on the server.
- If you need to use browser APIs, then first check if platform which is trying to bootstrap the application is browser of server. You can do that by checking if window object exists in global scope or by using isPlatformBrowser.
```
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
export class FeatureComponent implements OnInit{
    constructor(@Inject(PLATFORM_ID) private platform: any) { }
    ngOnInit() {
        if (isPlatformBrowser(this.platform)) {
            // use localStorage API
        }
    }
}
```

- There are many concepts to server side rendering than what we discussed here, like lazy loading and DOM manipulation on the server. But since this was a simple demo, I recommend you to visit some good articles on those concepts which are available here on Medium.
- There is a headless chrome browser project on GitHub created by Google team with the name rendertron, which provides chromium browser environment. This way, our express server can utilize rendertron’s APIs to construct HTML from an angular application which directly or indirectly depends on browser APIs. You should definitely check this project and see if you can integrate it with current setup.
- I have made an example GitHub repository with all codes implemented in this article, check link below.
https://github.com/thatisuday/node-ng-ssr-example?source=post_page-----34cf53224f32----------------------

https://blog.angular-university.io/angular-universal/

## Handling Server-side window/creating-structural-directives, etc
@Directive({
    selector: '[appShellRender]'
})
export class AppShellRenderDirective implements OnInit {

    constructor(
        private viewContainer: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        @Inject(PLATFORM_ID) private platformId) {}
          
    ngOnInit() {
        // VERY IMPORTANT TO CHECK PLATFORMID
        if (isPlatformServer(this.platformId)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else {
            this.viewContainer.clear();
        }
    }
}

# PrimeNgApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.4.

## Installation of packages
- Prime NG
npm install primeng --save
npm install primeicons --save

- Angular CLI Integration (DO NOT NEED THIS PART. THIS WAS INTRODUCED IN PRIMENG NPM SITE HERE => https://www.npmjs.com/package/primeng)
"dependencies": {
  //...
  "primeng": "^7.0.0",
  "primeicons": "^1.0.0"
},

- configure required styles at the styles section, example below uses the Nova Light theme.
"styles": [
  "node_modules/primeng/resources/themes/nova-light/theme.css",
  "node_modules/primeng/resources/primeng.min.css",
  "node_modules/primeicons/primeicons.css",
  //...
],
That is all!!!

## Immutable JS Documentation
https://devdocs.io/immutable/

## What is Web Component ? => https://medium.com/@IMM9O/web-components-with-angular-d0205c9db08f
Web Components is a suite of different technologies allowing you to create reusable custom elements — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps.
### @webcomponents/custom-elements

### What are Angular Elements?
Imagine that you’ve developed an awesome Angular component. However, in real life, not all the web applications are Angular-based or even single-page application. You wish to use your amazing component as part of any web application, website or any CMS like wordpress.
Angular Team provide to us a new way to extract this component to use it outside our angular project and that we call it Angular Elements.

## Application Shell Model => https://developers.google.com/web/fundamentals/architecture/app-shell
An application shell (or app shell) architecture is one way to build a progressive web app that reliably and instantly loads on your users' screens, similar to what you see in native applications.

### Definition of PWA 
Progressive — The word progressive means it works for every user, regardless of browser choice because they're built with progressive enhancement as a core tenet. Responsive — Automatically adjustable to any form: desktop, mobile, tablet etc. Load Time — Progressive Web Apps (PWA) are instantly available.

### What makes a web app, a Progressive Web App?
Progressive Web Apps provide an installable, app-like experience on desktop and mobile that are built and delivered directly via the web. They're web apps that are fast and reliable. And most importantly, they're web apps that work in any browser. If you're building a web app today, you're already on the path towards building a Progressive Web App.

## What is the relation between the App Shell and Angular Universal?
We are going to pre-render the main component at build time using Angular Universal, and use the pre-rendering output in our index.html.

But in place of the router outlet, we probably want to put something lighter than the full content of the / home route, because that might include too much HTML and CSS.

Instead, in place of the router outlet, we probably only want to show a loading indicator or a simplified version of the page instead of the whole home route.

The simplest way to do that is to create an auxiliary route in our application, for example in the path /app-shell-path. Then we need to pre-render the complete content of that route and include it in our index.html, and we have our App Shell!

In order to do pre-rendering in Angular, we will need Angular Universal. Let's then scaffold an Angular Universal application, that contains the same components as our client-side single page application.

### Angular App Shell - Boosting Application Startup Performance => https://blog.angular-university.io/angular-app-shell/
Last Updated: 26 APRIL 2019 local_offer PWA
One of the things that most impacts User Experience (especially on mobile) is the application startup experience, and perceived performance. In fact, studies have shown that 53% of mobile users abandon sites that take longer than 3 seconds to load!

And this is true for all applications in general, not only mobile applications. Any application can benefit from a much better startup experience, especially if we can get that working out of the box.

One of the things that we can do to improve the user experience is to show something to the user as quickly as possible, reducing the time to first paint.

And the best way to get that much-improved user experience and show something quickly to the user is to use an App Shell!

### What is an App Shell?
To boost perceived startup performance, we want to show to the user the above the fold content as quickly as possible, and this usually means showing a menu navigation bar, the overall skeleton of the page, a loading indicator and other page-specific elements.

To do that, we will include the HTML and CSS for those elements directly in the initial HTTP response that we get back from the server when we are loading the index.html of our Single Page Application.

That combination of a limited number of above the fold plain HTML and styles which is displayed to the user as fast as possible is known as the Application Shell.

And in this post, we will learn all about how to add an App Shell to an Angular Application, using the Angular CLI!

#### Note: The App Shell functionality is available independently of the use of a Service Worker, and we don't need to use a server-side rendered Angular Universal application in production to benefit from the App Shell

### REFERENCES
- Angular App Shell => https://blog.angular-university.io/angular-app-shell/
- Service Workers => https://blog.angular-university.io/service-workers/
- Angular Service Worker => https://blog.angular-university.io/angular-service-worker/
- Angular Push Notifications => https://blog.angular-university.io/angular-push-notifications/

# NON-ANGULAR SERVICE WORKER

## What is a service worker
A service worker is a script that your browser runs in the background, separate from a web page, opening the door to features that don't need a web page or user interaction. Today, they already include features like push notifications and background sync. In the future, service workers might support other things like periodic sync or geofencing. The core feature discussed in this tutorial is the ability to intercept and handle network requests, including programmatically managing a cache of responses.

The reason this is such an exciting API is that it allows you to support offline experiences, giving developers complete control over the experience.

Before service worker, there was one other API that gave users an offline experience on the web called AppCache. There are a number of issues with the AppCache API that service workers were designed to avoid.

### Things to note about a service worker:

It's a JavaScript Worker, so it can't access the DOM directly. Instead, a service worker can communicate with the pages it controls by responding to messages sent via the postMessage interface, and those pages can manipulate the DOM if needed.
Service worker is a programmable network proxy, allowing you to control how network requests from your page are handled.
It's terminated when not in use, and restarted when it's next needed, so you cannot rely on global state within a service worker's onfetch and onmessage handlers. If there is information that you need to persist and reuse across restarts, service workers do have access to the IndexedDB API.
Service workers make extensive use of promises, so if you're new to promises, then you should stop reading this and check out Promises, an introduction.
The service worker life cycle
A service worker has a lifecycle that is completely separate from your web page.

To install a service worker for your site, you need to register it, which you do in your page's JavaScript. Registering a service worker will cause the browser to start the service worker install step in the background.

Typically during the install step, you'll want to cache some static assets. If all the files are cached successfully, then the service worker becomes installed. If any of the files fail to download and cache, then the install step will fail and the service worker won't activate (i.e. won't be installed). If that happens, don't worry, it'll try again next time. But that means if it does install, you know you've got those static assets in the cache.

When installed, the activation step will follow and this is a great opportunity for handling any management of old caches, which we'll cover during the service worker update section.

After the activation step, the service worker will control all pages that fall under its scope, though the page that registered the service worker for the first time won't be controlled until it's loaded again. Once a service worker is in control, it will be in one of two states: either the service worker will be terminated to save memory, or it will handle fetch and message events that occur when a network request or message is made from your page.

## Service Workers - Practical Guided Introduction (several examples)
In this post, we are going to do a practical guided Tour of Service Workers, by focusing on one of its most important use cases: Application Download and Installation (including application versioning).

As a learning exercise, I invite you to code along, and turn your application into a PWA by making it downloadable and installable! We will be doing the same to a sample application, available in this repository.

If you have tried to learn Service Workers before, you might have noticed that many of the features of Service Workers and the Service Worker Lifecycle can, at first sight, seem a bit surprising.
Why would we need a separate daemon instance to intercept the HTTP requests of our own application, where we can't really do long-running calculations or access the DOM?

And yet Service workers are the cornerstone of a Progressive Web App, they are the key component that binds all other PWA APIs together and enable the support of native-like capabilities such as:
•	Offline Support
•	Application Download, Installation, and Versioning
•	Background Sync
•	Notifications
•	Physical device interaction (Web Bluetooth)
•	Payments (via the Payment Request API)

### Are PWAs really taking off?
With all these native-like capabilities, PWAs are here to stay! Here are some reasons why now is the best time to learn them:
•	We already have Chrome PWA support, meaning over 50% of browser share, mobile included
•	Apple has agreed to implement Service Workers in Safari
•	Microsoft is working on allowing the installation of a PWA directly to a Windows 10 desktop and to run each PWA in a native window

### Table of Contents
In this post we will cover the following topics:
•	What is a Service Worker?
•	Application Download, Installation and Versioning in a Nutshell
•	Step 1 - Service Worker Registration
•	Step 2 - Service Worker Hello World Install Phase
o	The Cache Storage API
o	Background Application Download
o	The Service Worker Lifecycle (Consistency by Default)
•	Step 3 - Service Worker Activation Phase
•	Step 4 - Intercepting HTTP Requests
•	Step 5 - Purging Previous Application versions
•	Step 6 - Serving the Application From Cache Using a Cache Then Network Strategy
•	Customizing the Service Worker Lifecycle
o	Taking over the current page with clients.claim()
o	Skipping the Wait Phase (and potential issues it might cause)
o	Updating a Service Worker Manually
•	Built-in Browser protection against broken Service Workers
•	Precautions with the use of the Browser Cache and Service Workers
•	Conclusions

### What is a Service Worker? => https://blog.angular-university.io/service-workers/
A Service Worker is like background daemon process that sits between our web application and the network, intercepting all HTTP requests made by the application.

The Service Worker does not have access direct access to the DOM. Actually, the same Service Worker instance is shared across multiple tabs of the same application and can intercept the requests from all those tabs.

Note that for security reasons the Service Worker cannot see requests made by other web applications running in the same browser, and only works over HTTPS (except on localhost, for development purposes).

In summary: a Service Worker is a network proxy, running inside the browser itself!

## Service Workers Overview
The code for the Service Worker is periodically downloaded from our website and there is a whole lifecycle management process in place.

Its the browser that at any time will decide if the Service Worker should be running, this is so to spare resources, especially on mobile.

So if we are not doing any HTTP requests for a while or not getting any notifications, it's possible that the browser will shut down the Service Worker.

If we do trigger an HTTP request that should be handled by the Service Worker, the browser will activate it again, in case it was not yet running. So seeing the Service Worker stopped in the Dev Tools does not necessarily mean that something is broken.

The Service Worker can intercept HTTP requests made by all the browser tabs that we have opened for a given domain and Url path (that path is called the Service Worker scope).

On the other hand, it cannot access the DOM of any of those browser tabs, but it can access browser APIs such as for example the Cache Storage API.

## Download and Installation Design Breakdown
Here is a summary of the design that we are about to implement:

- we are going to download the Service Worker script from the server
- we are going to make sure that the browser installs and activates the service worker in the background as late as possible in the application bootstrap time, in order not to disrupt the initial user experience
- on the background, the service worker is going to download the whole web application (meaning the HTML, CSS and Javascript), version it and keep it for later
- only the next time the user comes to the site, the service worker is going to kick in (more on this later)
this second time the user visits the site, the application will NOT be downloading the HTML, CSS and Javascript from the network - the Service Worker will serve the cached files that it had kept for later
- This second time, the application startup will be much faster
- The user will at least have a working application, even if the network is down
- And this is how having a network proxy in the browser allows us to have installable web applications! This is all 100% compatible with the back and refresh buttons.

===========================================================================================

## Angular Service Worker - Step-By-Step Guide for turning your Application into a PWA
- With the Angular Service Worker and the Angular CLI built-in PWA support, it's now simpler than ever to make our web application downloadable and installable, just like a native mobile application.

- In this post, we will cover how we can configure the Angular CLI build pipeline to generate applications that in production mode are downloadable and installable, just like native apps.

- We will also add an App Manifest to our PWA, and make the application one-click installable.

- I invite you to code along, as we will scaffold an application from scratch using the Angular CLI and we will configure it step-by-step to enable this feature that so far has been exclusive to native apps.

- We will also see in detail what the CLI is doing so that you can also add the Service Worker to an already existing application if needed.

- Along the way, we will learn about the Angular Service Worker design and how it works under the hood, and see how it works in a way that is quite different than other build-time generated service workers.

### Steps
In this post, we will cover the following topics:
Step 1 - Scaffolding an Angular PWA Application using the Angular CLI
Step 2 - Understanding How To Add Angular PWA Support Manually
Step 3 - Understanding the Angular Service Worker runtime caching mechanism
Step 4 - Running and Understanding the PWA Production Build
Step 5 - Launching an Angular PWA in Production Mode
Step 6 - Deploying a new Application Version, Understanding Version Management
Step 7 - One-Click Install with the App Manifest


## STEP 1 - Scaffolding an Angular PWSA Application using the Angular CLI
### And with this in place, we can now scaffold an Angular application and add it Angular Service Worker support:
- ng new angular-pwa-app --service-worker

### We can also add the Angular Service Worker to an existing application using the following command:
## THIS WORKS WHEN YOU ARE ADDING SERVICE WORKER TO AN EXISTING PROJECT
- ng add @angular/pwa --project <name of project as in angular.json>

### What does the serviceWorker flag do?
This flag will cause the production build to include a couple of extra files in the output dist folder:
- The Angular Service Worker file ngsw-worker.js
- The runtime configuration of the Angular Service Worker ngsw.json
Note that ngsw stands for Angular Service Worker

### What does the ServiceWorkerModule do?
The CLI has also included in our application root module the Service Worker module:


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

view raw04.ts hosted with ❤ by GitHub

This module provides a couple of injectable services:
- SwUpdate for managing application version updates
- SwPush for doing server Web Push notifications

More than that, this module registers the Angular Service Worker in the browser (if Service Worker support is available), by loading the ngsw-worker.js script in the user's browser via a call to navigator.serviceWorker.register().

The call to register() causes the ngsw-worker.js file to be loaded in a separate HTTP request. And with this in place, there is only one thing missing to turn our Angular application into a PWA.

### Understanding the Angular Service Worker runtime caching mechanism
The Angular Service Worker can cache all sorts of content in the browser Cache Storage.

This is a Javascript-based key/value caching mechanism that is not related to the standard browser Cache-Control mechanism, and the two mechanisms can be used separately.

The goal of the assetGroups section of the configuration file is to configure exactly what HTTP requests get cached in Cache Storage by the Angular Service Worker, and there are two cache configuration entries:

one entry named app, for all single page application files (all the application index.html, CSS and Javascript bundles plus the favicon)

another entry named assets, for any other assets that are also shipped in the dist folder, such as for example images, but that are not necessarily necessary to run every page

### Caching static files that are the application itself
The files under the app section are the application: a single page is made of the combination of its index.html plus its CSS and Js bundles. These files are needed for every single page of the application and cannot be lazy loaded.

In the case of these files, we want to cache them as early and permanently as possible, and this is what the app caching configuration does.

The app files are going to be proactively downloaded and installed in the background by the Service Worker, and that is what the install mode prefetch means.

The Service worker will not wait for these files to be requested by the application, instead, it will download them ahead of time and cache them so that it can serve them the next time that they are requested.

This is a good strategy to adopt for the files that together make the application itself (the index.html, CSS and Javascript bundles) because we already know that we will need them all the time.

### Caching other auxiliary static assets
On the other hand, the assets files are cached only if they are requested (meaning the install mode is lazy), but if they were ever requested once, and if a new version is available then they will be downloaded ahead of time (which is what update mode prefetch means).

Again this is a great strategy for any assets that get downloaded in a separate HTTP request such as images because they might not always be needed depending on the pages the user visits.

But if they were needed once then its likely that we will need the updated version as well, so we might as well download the new version ahead of time.

Again these are the defaults, but we can adapt this to suit our own application. In the specific case of the app files though, it's unlikely that we would like to use another strategy.

After all, the app caching configuration is the download and installation feature itself that we are looking for. Maybe we use other files, outside the bundles produced by the CLI? In that case, we would want to adapt our configuration.

It's important to keep in mind that with these defaults, we already have a downloadable and installable application ready to go, so let's try it out!

### Launching an Angular PWA in Production Mode
Let's then start the application in production mode, and in order to do that, we are going to need a small web server. A great choice is http-server, so let's install it:

#### npm install -g http-server
Let's then go into the dist folder, and start the application in production mode:

cd dist
http-server -c-1 .
The -c-1 option will disable server caching, and a server will normally be running on port 8080, serving the production version of the application.

Note that if you had port 8080 blocked, the application might be running on 8081, 8082, etc., the port used is logged in the console at startup time.

If you have a REST API running locally on another server for example in port 9000, you can also proxy any REST API calls to it with the following command:

http-server -c-1 --proxy http://localhost:9000 . 

# Handling Errors
- An unhandled exception occurred: Could not find the implementation for builder @angular-devkit/build-ng-packagr:build
- SOLN:
> npm uninstall @angular-devkit/build-ng-packagr and npm uninstall @angular-devkit/build-angular
> npm install --save-dev @angular-devkit/build-ng-packagr@latest and npm install --save-dev @angular-devkit/build-angular@latest
> ng update --all

