# GeoForum

*A REST API that serves as a backend to the GeoForum Application.*

## Table of Contents

+ [User Guide](#user-guide)

## User Guide

### Set up:

Download [node](https://nodejs.org/en/download/).

Check if node and npm have been installed correctly:

```
node -v
```

```
npm -v
```

Both should return their version.

Download [ModgoDB](https://www.mongodb.com/download-center?jmp=nav#community).

Navigate to your C drive.

```
mkdir data
```

```
cd data
```

```
"C:\Program Files\MongoDB\Server\<your mongo version>\bin\mongod.exe"
```

Finally, clone this repository to your desired location:

```
git clone https://github.com/taraokelly/GeoForum.git
```

Then make sure you are in the root directory of the cloned repository and get npm to install the dependencies:

```
npm install
```

```
npm start
```

### To Run:

Again, you should be in the root directory of the cloned repository.

```
node index
```
## Deployment Guide

This deployment tutorial uses [Heroku](https://www.heroku.com/). A Heroku account (it's free :) ) and the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) is needed.

Checkout this [branch](https://github.com/taraokelly/GeoForum_Backend/tree/HEROKU-deployment):

Then run the following commands:

```
git init

heroku login
  [email]
  [password]

heroku create [name]

heroku addons: create mongolab

git add .

git commit -m "[commit msg]"

git push heroku master
```
