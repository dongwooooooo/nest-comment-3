import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ApiOperation, ApiBody } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('user')
export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post('/')
  @ApiOperation({ summary: 'user 더미 생성' })
  @ApiBody({ type: UserDto })
  @HttpCode(201)
  async create(@Body() dto: UserDto) {
    return await this.userRepository.save(
      this.userRepository.create({
        name: dto.name,
      }),
    );
  }
}
