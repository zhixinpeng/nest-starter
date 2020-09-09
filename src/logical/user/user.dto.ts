import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterInfoDTO {
  @ApiProperty()
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly accountName: string | number;
  @ApiProperty()
  @IsNotEmpty({ message: '真实姓名不能为空' })
  @IsString({ message: '真实姓名必须是 String 类型' })
  readonly realName: string;
  @ApiProperty()
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
  @ApiProperty()
  @IsNotEmpty({ message: '重复密码不能为空' })
  readonly repassword: string;
  @ApiProperty()
  @IsNotEmpty({ message: '手机号不能为空' })
  @IsNumber()
  readonly mobile: number;
  @ApiPropertyOptional({
    description:
      'role[用户角色]：0 - 超级管理员 | 1 - 管理员 | 2 - 开发&测试&运营 | 3 - 普通用户（只能查看）',
  })
  readonly role?: string | number;
}

export class LoginDTO {
  @ApiProperty({ description: '用户名', example: 'Angus' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string;
  @ApiProperty({ description: '密码', example: 'pangus' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}
