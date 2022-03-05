## generate User model/migration
npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string,bio:string,location:string,profileImageURL:text,bannerImageURL:text

## generate Song model/migration
npx sequelize model:generate --name Song --attributes userId:integer,songURL:text,artworkURL:text,title:string,genre:string,description:string,duration:string,plays:integer
