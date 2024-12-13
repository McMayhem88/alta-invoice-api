import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import * as bcrypt from "bcryptjs";
import {User} from "@prisma/client";
import {ValidatedUser} from "../auth/interfaces/auth.interfaces";

/**
 * Service for managing user records
 */
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {
  }
  
  /**
   * Returns a single user from the database using the provided `id`
   * @param id The unique `id` of the user to pull
   */
  async findById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: {id},
    });
  }
  
  /**
   * Returns a single user from the database that matches the provided `email`
   * @param email The `email` of the user to pull
   */
  async findByEmail(email: string): Promise<User> {
    //@@ The `email` field has a unique constraint in the database, which makes this possible
    return this.prisma.user.findUnique({
      where: {email},
    });
  }
  
  /**
   * Validates a single user by checking if they exist in the database and then checking that the passwords match
   * @param email The user's email address
   * @param password The non-hashed password of the user
   */
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
