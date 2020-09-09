import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  // UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { RbacInterceptor } from 'src/interceptor/rbac.interceptor';
import { CommodityService } from './commodity.service';
import { roleConstants as role } from '../auth/constants';
import { RbacGuard } from 'src/guards/rbac.guard';

@Controller('commodity')
export class CommodityController {
  constructor(private readonly commodityService: CommodityService) {}

  // 查询商品列表
  @UseGuards(new RbacGuard(role.HUMAN))
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(new RbacInterceptor(role.HUMAN))
  @Post('list')
  async queryCommodityList(@Body() body: any) {
    return await this.commodityService.queryCommodityList(body);
  }

  // 新建商品
  @UseGuards(new RbacGuard(role.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(new RbacInterceptor(role.DEVELOPER))
  @Post('create')
  async createCommodity(@Body() body: any, @Request() req: any) {
    return await this.commodityService.createCommodity(body, req.user.username);
  }

  // 修改商品
  @UseGuards(new RbacGuard(role.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(new RbacInterceptor(role.DEVELOPER))
  @Post('update')
  async updateCommodity(@Body() body: any, @Request() req: any) {
    return await this.commodityService.updateCommodity(body, req.user.username);
  }

  // 删除商品
  @UseGuards(new RbacGuard(role.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(new RbacInterceptor(role.ADMIN))
  @Post('delete')
  async deleteCommodity(@Body() body: any) {
    return await this.commodityService.deleteCommodity(body);
  }
}
