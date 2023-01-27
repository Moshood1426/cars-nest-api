import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './users.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;
  beforeEach(async () => {
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password }),
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service class', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('test@gmail.com', '12345');
    expect(user.password).not.toEqual('12345');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('fails when user signs up with existing email', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([
        { id: 1, email: 'harbdoul@gmail.com', password: 'asddsf' } as User,
      ]);

    const user = await service.signup('harbdoul@gmail.com', 'assdsre');
    expect(user).rejects.toThrow(BadRequestException);
  });

  it('throws if signin is called with unused email', async () => {
    const result = await service.signin('asdf@gmail.com', 'sdjkb');

    expect(result).rejects.toThrow(NotFoundException);
  });

  it('throws if password is not correct', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([
        { id: 1, email: 'harbdoul@gmail.com', password: 'asddsf' } as User,
      ]);

    const user = await service.signin("harbdoul@gmail.com", "abcde")

    expect(user).rejects.toThrow(UnauthorizedException)
  });
});
