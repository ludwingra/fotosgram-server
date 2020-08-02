import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({

  nombre: {
    type: String,
    required: [true, 'El nombre es necesario']
  },
  avatar: {
    type: String,
    default: 'av-1.png'
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'El correo es necesario']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es necesaria']
  }

});

UserSchema.method('comparePassword', function (password: string = ''): boolean {
  if (bcrypt.compareSync(password, this.password)) {
    return true;
  } else {
    return false;
  }
})

interface Iusuer extends Document {
  nombre: string;
  avatar: string;
  email: string;
  password: string;

  comparePassword(password: string): boolean;
}

export const UserModel = model<Iusuer>('Users', UserSchema);