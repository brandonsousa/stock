class AuthController {
    
    async index({ view }){

        return view.render('auth.login')

    }

    async login({ request,  response, auth }){

        const {email, password} = request.all()
        await auth.attempt(email, password)
        return response.redirect('/dashboard')

    }

    async logout({ response, auth }){
        await auth.logout()
    
        return response.redirect('/')
    }
}

module.exports = AuthController