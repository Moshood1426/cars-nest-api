import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException('user with id:' + id + 'cannot be found');
    }

    const user = await this.repo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('user with id:' + id + 'cannot be found');
    }

    return user;
  }

  find(email: string) {
    const users = this.repo.find({ where: { email } });
    return users;
  }

  async update(id: number, attr: Partial<User>) {
    const user = await this.repo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('user with id:' + id + 'cannot be found');
    }
    Object.assign(user, attr);

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.repo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`user with id: ${id} cannot be found`);
    }

    return this.repo.remove(user);
  }
}
