import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChaptersController {
  public async index(ctx: HttpContextContract) {
    console.log(ctx)
    return {
      coucou: 'salut',
    }
  }
}
