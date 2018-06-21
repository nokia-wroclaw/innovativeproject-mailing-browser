# innovativeprojects-mailing-groups-browser

## Table of contents
1. Project overview
2. Functionality
3. Technologies
4. Installation
5. Contributing


# 1. Project overview
Mailing Groups Browser is an application which subscribes to mailing group via e-mail and aggregates received mails to threads. Threads are searchable and filterable in the frontend part of application.
Application is available at http://mailing-groups-browser.herokuapp.com/home/mail


# 2. Functionality
Currently we have finished the following functionalities:

* Fetching mails from mailing group - Mails are fetched and aggregated to threads. They are stored in database.
* Searching, filtering - Threads are searchable using full text search and filterable.
* Sorting - Threads can be sorted in many ways.

# 3. Technologies
* Backend
  * Node.js
  * Express
  * Elasticsearch
* Frontend
  * React
  * Semantic UI


# 4. Installation guide
**The project is available to everyone at http://mailing-groups-browser.herokuapp.com/home/mail**

**If you want to set it up locally:**
**Before setting up the project please equip yourself with elasticsearch client. You can download it for free at https://www.elastic.co/downloads/elasticsearch Install it and launch.**
**Please download the repository by typing commands:**
```
git clone https://github.com/nokia-wroclaw/innovativeproject-mailing-browser.git
```
**Then you need to install all node modules required by the app by running:**
```
cd Frontend/
npm install
cd ..
cd backend/
npm install
```
**Now you have to change lines 6-9 in the backend/mailbox_connect.js this way:**
```
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: [{type: "stdio", levels: ["error"]}]
});
```
**And finally if everything went right you can run the backend by:**
```
cd backend/
npm start
```
**And the frontend part of application:**
```
cd Frontend/
npm start
```
**App should start automatically.**


# 5. Contributing
Students
* Paweł Mordal
* Jakub Woszczyna
* Bartosz Smolnik

Nokia Supervisors
* Mateusz Sikora
* Ewa Kaczmarek
