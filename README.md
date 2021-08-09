## Stocksimple 📈

Stocksimple is a web app built for personal use but free for anyone to use at https://stocksimple.netlify.app in order to keep track of your stock portfolio in a hassle-free manner.
*Note that 3rd party cookies must be enabled*

### Technologies
**Frontend**
- React.js was used as the framework for the web app
- [Tradier Developer API](https://developer.tradier.com/) was used to source real-time and historical market data.
- Scss was used for styling
- Dotenv was used for handling secrets and environment variables

**Backend**
- Node.js server
- MongoDB database (Atlas)
- Mongoose was used for object modeling
- Express.js was used for the server framework
- JWT Cookies used for user sessions
- Bcrypt used for passwords

**Deployment**
Frontend on Netlify (CD), backend on Heroku (CD), and database on MongoDB Atlas

### Running locally
To see the code in action on your local development server:
1. Clone the repo
2. Set up account for [Tradier Developer API](https://developer.tradier.com/) and cluster for [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

**Frontend**
1. `cd frontend`
2. Run `npm install` to import the necessary packages
3. Create `.env` with necessary environment variables
4. Run `npm start` to start the development server on `localhost:3000`

**Backend**
1. `cd backend`
2. Run `npm install` to import the necessary packages
3. Create `.env` with necessary environment variables
4. Run `npm run dev` to start the development server on `localhost:${process.env.PORT}`

Have fun!
