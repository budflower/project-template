
const Controller = require('egg').Controller
class CommonController extends Controller {
  async list(handler) {
    await this.ctx.handleList(this, this.service.common.index.list)
  }

  async detail() {
    await this.ctx.handleDetail(this, this.service.common.index.list)
  }

  async add() {
    const { ctx, service, config } = this
    try {
      var resourceName = ctx.request.path.split('/')[2]
      var res = await this.service.common.index.add(resourceName, ctx.request.body)
      if(res.errMsg) { // 验证报错
        ctx.body = ctx.fail(-2, res.errMsg)
      } else {
        ctx.body = ctx.success(res)
      }
    }  catch(e) {
      ctx.body = ctx.fail(-1, e)
    }
  }

  async edit() {
    const { ctx, service, config } = this
    try {
      var resourceName = ctx.request.path.split('/')[2]
      var res = await this.service.common.index.edit(resourceName, ctx.request.body)
      if(res.errMsg) { // 验证报错
        ctx.body = ctx.fail(-2, res.errMsg)
      } else {
        ctx.body = ctx.success(res)
      }
    }  catch(e) {
      ctx.body = ctx.fail(-1, e)
    }
  }

  async del() {
    const { ctx, service, config } = this
    try {
      var resourceName = ctx.request.path.split('/')[2]
      var res = await this.service.common.index.del(resourceName, ctx.params.id)
      ctx.body = ctx.success(res)
    }  catch(e) {
      ctx.body = ctx.fail(-1, e)
    }
  }
}



module.exports = CommonController