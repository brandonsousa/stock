const User = use('App/Models/User')

class UserController{

  async index ({ view }) {
    const users = await User.all()
    return view.render('users.all', { users: users.toJSON()})
  }

/**
 * Render a form to be used for creating a new user.
 * GET user/create
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 * @param {View} ctx.view
 */
async create ({view }) {
  return view.render('users.register')
}

/**
 * Create/save a new sell.
 * POST user
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 */
async store ({ request, response }) {
  const newUser = request.all()

  await User.create(newUser)

  return response.redirect('/users')
}

/**
 * Display a single sell.
 * GET user/:id
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 * @param {View} ctx.view
 */
async show ({ params, request, response, view }) {
}

/**
 * Render a form to update an existing sell.
 * GET user/:id/edit
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 * @param {View} ctx.view
 */
async edit ({ params, request, response, view }) {
}

/**
 * Update sell details.
 * PUT or PATCH user/:id
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 */
async update ({ params, request, response }) {
}

/**
 * Delete a sell with id.
 * DELETE user/:id
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 */
async destroy ({ params, request, response }) {
}
}

module.exports = UserController