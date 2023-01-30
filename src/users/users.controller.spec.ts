import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: UsersService;
  let fakeAuthService: AuthService;

  // fakeUsersService = {
  //   findOne
  // }

  fakeAuthService = {
    signup: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password }),
    signin: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password } as User),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
