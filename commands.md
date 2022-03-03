## generate User model/migration
npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string,bio:string,location:string,profileImageURL:text,bannerImageURL:text
