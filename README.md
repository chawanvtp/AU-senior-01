
# AU-senior-01

This project is contributed for Assumption University's course "[CS3200] - Senior Project I" to be used in "AU Running Campaign (Fit4Run)".

##	Primary functions
-	Runner (client) :
	```
		-	Registeration at "registration.html"
		<br/>
		-	Display client's information / running results
	```
-	Adminstartor (admin)	:	
	```
		-	Activate(map) tag to client at "activate.html"
		<br/>
		-	Inactivate(Un-map) tag at "returnTag.html"
		<br/>
		-	Receive (Tag's input) by RFID reader at "forRFIDreader.html"
	```
	
## Getting Started

-	No installation is required
-	Register an account for accessing "Google firebase"
-	Configure your Firebase's config at "Javascript file(s)"

### Prerequisites
-	Firebase account/tools
-	Browser
-	Text / Web editor - (For Developer)
-	Node.js	- (For Developer)

```
Give examples
```

### Installing
```
[1] Let's users(runners) register their account at "registration.html"
<br/>
[2] Admin(agent) map a tag to user at "activate.html"
<br/>
[3] Admin(agent) open "forRFIDreader.html" on the devices that connecting to "RFID readers"
<br/>
	(3.1) click / press TAB on "forRFIDreader.html" to focus on input text box
	<br/>
	(3.2) Now, it's ready for runners to use - "TAG" touch on "RFID reader"
	<br/>
[4] Client(runner) touch the "RFID reader" with their "TAG" before start running and everytime they reached a round
<br/>
*(Optional)
[5] Admin(agent) inactivate/returned "TAG" for Clients at "returnTag.html"

```

## Running the tests
```
[1] Register an account
<br/>
[2] Activate(map) tag to your account
<br/>
[3] Enter your tag code into textbox at "forRFIDreader.html"
<br/>
[4] Enter your tag code into textbox at "returnTag.html"
```
## Deployment

Using "cmd" command at folder directory.
	```
	- firebase deploy
	```

## Built With

* [Visual Studio Code]
* [Node.js]
* [Google Firebase]

## Authors

* **Chawan V. 5737444** - *Initial work* - [Seaweeds](https://github.com/chawanvtp/AU-senior-01)
* **Arthisd ** - *Initial work* - [xxx](https://github.com/chawanvtp/AU-senior-01)
