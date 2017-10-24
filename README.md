# URL Shortner Microservice

A Microservice that can be used to generate short urls corresponding to long tiresom urls.

### API Usage 

* `/new/{your URL goes here}` to shorten the url.
* the output will be a JSON object with long_url and short_urls respectively.

## Example

* https://six-lightning.glitch.me/new/https://reddit.com/r/india request to server.

* response 
 ```JSON
   {
     "short_url":"https://six-lightning.glitch.me/p1AmN",
     "original_url":"https://reddit.com/r/india"
   }
   ```