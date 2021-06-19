# Travel Application/Final project

## Project Information
In this project I have built a web tool that allows users to check the weather condition of their next trip and in how many days they will be departing. It will also display a picture of the desired destination. All of this is to demonstrate my capabilities to pull information from multiple API's and also to use some of the information from one API to get information from another API. The API's in question are Geonames, WeatherBit and Pixabay. 

## How to run the Project
First you will need to add your api keys to the env file. Then:

- To install packages run:
<blockquote>
<pre><code>  npm install
</code></pre>
</blockquote>

| To check dependencies for the project see "package.json" file

- To run the development server:
<blockquote>
<pre><code>  npm run build-dev
</code></pre>
</blockquote>

- To build the project:
<blockquote>
<pre><code>  npm run build-prod
</code></pre>
</blockquote>

- To start the server:
<blockquote>
<pre><code>  npm run start (the server is running on localhost:8000)
</code></pre>
</blockquote>

- To test the project with Jest:
<blockquote>
<pre><code>  npm run test
</code></pre>
</blockquote>

## Extend Options
In this project I chose the option to allow the user to delete trips they have searched for. They will stay on the page until the delete button is pressed or the refresh the page.