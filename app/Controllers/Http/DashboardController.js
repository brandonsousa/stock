'use strict'

class DashboardController {
    async index({ view }){
        return view.render('dashboard.home')
    }
}

module.exports = DashboardController
