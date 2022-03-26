# Supercloud

Supercloud is a recreation of the popular music streaming platform "SoundCloud". Users can go to Supercloud to listen and discuss their favorite music, save songs to come back to with likes, and even upload their own music via integrated AWS services.


![image](https://user-images.githubusercontent.com/93935486/158058934-829430a6-1c85-4c90-8e62-71b7b8bd5678.png)


## Supercloud Wiki Links
* MVP: https://github.com/nick-esqueda/supercloud/wiki/MVP-Feature-List
* Database Schema: https://github.com/nick-esqueda/supercloud/wiki/Database-Schema

## Technologies Used
JavaScript | Node.js | Express.js | React.js | Redux | PostgreSQL | Sequelize | HTML | CSS | Git | AWS S3

![image](https://user-images.githubusercontent.com/93935486/158058517-855f11ca-40d8-441d-a232-fc0307e168b6.png)

## Cloning the project? Here are some steps: 
*** DISCLAIMER: you must be able to create an AWS S3 bucket in order to properly store images/audio files that are uploaded to the site. Upload functionality will not work without it

### 1. Clone the repo.
* `git clone git@github.com:nick-esqueda/supercloud.git`
### 2. Install all dependencies inside the root directory.
* `npm install`
### 3. Create a PostgreSQL database user with a PASSWORD and CREATEDB privileges.
* `CREATE USER <name> WITH PASSWORD <'password'> CREATEDB`
### 4. Create a .env file inside the backend directory with the same keys as the .env.example file inside that same directory.
### 5. Envionment Variable Setup:
* Enter your database username and password into the .env, along with a desired database name. 
* Create a secure combination of characters and set it to the JWT_SECRET key, and set a period of time in seconds for the JWT to expire as the value for JWT_EXPIRES_IN (preferably 604800 - 1 week).
* Set the desired PORT number.
In order to use this app, you must have an AWS account in order to create an S3 bucket. This bucket will be used to store files that are uploaded to Supercloud. For instructions on setting up a bucket/generating an access key and secret, check here:
https://youtu.be/yGYeYJpRWPM?t=258
* Once you've generated your S3 access key id and secret key, set these to the appropriate AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY variables in the .env file.
### 6. Now to the frontend directory. Add the following proxy to the frontend directory's package.json at the top level. This will allow the frontend to make secure requests to the backend without any trouble. Replace the number according to the port you've specified in the .env file.
* `"proxy": "http://localhost:5000"`
### 7. Go ahead and create, migrate, and seed your database using the following sequelize-cli commands (make sure to run these commands in the backend directory)
* npx dotenv sequelize db:create
* npx dotenv sequelize db:migrate
* npx dotenv sequelize db:seed:all
### 8. Start the servers! Run `npm start` first in the backend directory, and then again in the front end directory, using a different terminal. The application should open automatically in your default browser, but if it doesn't, please navigate to http://localhost:3000.
### 9. Have Fun!

![image](https://user-images.githubusercontent.com/93935486/158058974-e28b5885-da97-44b9-b230-deb7069cd30b.png)


Thanks for checking out the app. I had an absolute blast creating this thing, and learned some extremely valuable lessons. These lessons were not only in regards to coding, but with respect to the thought processes that one needs to go through in order to have the capacity to work efficiently, and to stay out of one's own way. Learning to work in a pressure cooker is not easy, but the benifits far outweigh the adversities.
