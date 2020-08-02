import Server from "./classes/server";
import userRoutes from "./routes/user.routes";
import mongoose from "mongoose";

const server = new Server();

//Rutas de mi app
server.app.use('/users', userRoutes)

// Conectar DB
mongoose.connect('mongodb://localhost:27017/fotosgram', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) throw { code: 0, message: err };
  console.log('Base de datos ONLINE');
})


// Levantar express
server.start(() => {
  console.log(`Servidor corriendo en puerto ${server.port}`);
});