import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import * as bcrypt from "bcryptjs";
import {User} from "@prisma/client";
import {ValidatedUser} from "../auth/interfaces/auth.interfaces";


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {
  }
  
  async findById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: {id},
    });
  }
  
  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {email},
    });
  }
  
  async validateUser(email: string, password: string): Promise<ValidatedUser> {
    const user = await this.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    }
    return null;
  }
}
