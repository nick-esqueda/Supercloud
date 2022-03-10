## generate User model/migration
npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string,bio:string,location:string,profileImageURL:text,bannerImageURL:text

## generate Song model/migration
npx sequelize model:generate --name Song --attributes userId:integer,songURL:text,artworkURL:text,title:string,genre:string,description:string,duration:string,plays:integer

## generate Like model/migration
npx sequelize model:generate --name Like --attributes userId:integer,songId:integer

## generate Comment model/migration
npx sequelize model:generate --name Comment --attributes userId:integer,songId:integer,content:string


## REBUILD
npx dotenv sequelize db:seed:undo:all && npx dotenv sequelize db:migrate:undo:all && npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all
