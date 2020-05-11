# news_by_zip 
test
Contributors:
Parker - axios & render functions, videos, css
Princeton - html, google api, suggested stories, etc
Robert - axios & render functions, css, icons, email etc 


Goal - use of two or more different apis in to produce content in our news application 

Our API's: By combining these four apis and ZipNews was created!

Ziptastic - data stored about zipcodes,country, city, state 
Newsapi - returned an array titled articles. In this array was an object that included details of a specific article such as title, published date, an image, etc 
Stocks API - return stock price info based on symbol
GeoLocation API- returns a web visitors location based on ip address


What it does/functionality 

1.) Search News BY ZipCode 
	-Behind the scenes an AXIOS get request is then made to our Ziptastic API and a city is retrieved from that zipcode. Then another get request is made to newsapi using by putting that city name(our output from our last get request) into their search endpoint and finally our webpage will load with news articles based on the city  
2.) Search By Button
3.) Custom Search
4.) Suggested Stories based on user's location
5.) Save Stories / Remove Stories from list
6.) Get Local Weather
7.) Stocks Ticker - another api is used for our ticker to keep our site up to date about stocks
8.) Email Contact Form

CSS & Layout

Bootstrap: nav bar, buttons, modal and our responsive layout
Flex Boxes: to align our content properly
I-Frames: to hold our google videos
Ticker: really cool!

Challenges 

Finding useful API's that gave us the data we needed/ accessibility of free API's w/o upgrade.
Dividing Work
Git / Github: being on the right branch when making changes and pushing. merge conflicts.
Communicating: harder to help teammates in remote situation.
Talking on the mute button, lol!

Problem Solving 

Made good use of our instructors- thanks Lachlan, Joe, Wes!
Learning from mistakes 
Console.log()!***
Read the Docs!***
Google!***
Ask for help from a Team Member. 
Take A Break

What we learned

We know more than we thought!
Console.log()!***
Read the Docs!***
Google!***
Git Commands: cherry-pick, git stash/stash pop